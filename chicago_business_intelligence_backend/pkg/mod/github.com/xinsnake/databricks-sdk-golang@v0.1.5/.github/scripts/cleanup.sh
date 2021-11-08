#!/bin/bash

if [[ -z "$DATABRICKS_HOST" ]]; then
    echo "No [DATABRICKS_HOST] specified."
    exit 1
fi

if [[ -z "$DATABRICKS_TOKEN" ]]; then
    echo "No [DATABRICKS_TOKEN] specified."
    exit 1
fi

echo "Validating if databricks-cli is in the PATH"
if ! hash databricks 2>/dev/null; then
    echo "'databricks' was not found in PATH. Installing ..."
    pip install databricks-cli
fi

echo "Validating if any resource left behind after tests finished"
secret_scopes=$(databricks secrets list-scopes | wc -l)
limit=2

if ((secret_scopes > limit)); then
  echo "Deleting left Secret Scopes"
  for scope in $(databricks secrets list-scopes --output JSON | jq -r ".scopes[].name"); do
    echo "deleting secret scope $scope"
    databricks secrets delete-scope --scope "$scope"
  done
fi

clusters=$(databricks clusters list | wc -c)
limit=1

if ((clusters > limit)); then
  echo "Deleting left clusters"
  for cluster in $(databricks clusters list --output JSON | jq -r ".clusters[].cluster_id"); do
    echo "deleting cluster $cluster"
    databricks clusters permanent-delete --cluster-id "$cluster"
  done
fi

jobs=$(databricks jobs list | wc -l)
limit=1

if ((jobs > limit)); then
  echo "Deleting left jobs"
  for job in $(databricks jobs list --output JSON | jq -r ".jobs[].job_id"); do
    echo "deleting job $job"
    databricks jobs delete --job-id "$job"
  done
fi

echo validation finished
