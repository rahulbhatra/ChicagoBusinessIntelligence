# databricks-sdk-golang

This is a Golang SDK for [DataBricks REST API 2.0](https://docs.databricks.com/api/latest/index.html#) and [Azure DataBricks REST API 2.0](https://docs.azuredatabricks.net/api/latest/index.html).

**WARNING: The SDK is unstable and under development. More testing needed!**

## Usage

```go
import (
  databricks "github.com/polar-rams/databricks-sdk-golang"
  dbAzure "github.com/polar-rams/databricks-sdk-golang/azure"
  // dbAws "github.com/polar-rams/databricks-sdk-golang/aws"
)

opt := databricks.NewDBClientOption("", "", os.Getenv("DATABRICKS_HOST"), os.Getenv("DATABRICKS_TOKEN"))
c := dbAzure.NewDBClient(opt)

jobs, err := c.Jobs().List()
```

## Implementation Progress

| API  | AWS | Azure |
| :--- | :---: | :---: |
| Account API | ✗ | N/A |
| Clusters API | ✔ (Outdated) | ✔ |
| Cluster Policies API | ✗ | ✗ |
| DBFS API | ✔ (Outdated) | ✔ |
| Global Init Scripts API | ✗ | ✗ |
| Groups API | ✔ (Outdated) | ✔ |
| Instance Pools API | ✗ | ✔ |
| Instance Profiles API | ✔ (Outdated) | N/A |
| IP Access List API | ✗ | ✗ |
| Jobs API | ✔ (Outdated) | ✔ |
| Libraries API | ✔ (Outdated) | ✔ |
| MLflow** API | ✗ | ✗ |
| Permissions API | ✗ | ✗ |
| SCIM** API | ✗ | ✗ |
| Secrets API | ✔ (Outdated) | ✔ |
| Token API | ✔ (Outdated) | ✔ |
| Token Management API | ✗ | ✗ |
| Workspace API | ✔ (Outdated) | ✔ |

** SCIM and MLflow are separate systems that are planned differently.
