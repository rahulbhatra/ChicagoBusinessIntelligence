package models

type TerminationParameter string

const (
	TerminationParameterUsername               = "username"
	TerminationParameterDatabricksErrorMessage = "databricks_error_message"
	TerminationParameterInactivityDurationMin  = "inactivity_duration_min"
	TerminationParameterInstanceID             = "instance_id"
	TerminationParameterAzureErrorCode         = "azure_error_code"
	TerminationParameterAzureErrorMessage      = "azure_error_message"
	TerminationParameterInstancePoolID         = "instance_pool_id"
	TerminationParameterInstancePoolErrorCode  = "instance_pool_error_code"
)
