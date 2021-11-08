package models

type ClusterCloudProviderNodeInfo struct {
	Status             []ClusterCloudProviderNodeStatus `json:"status,omitempty" url:"status,omitempty"`
	AvailableCoreQuota float32                          `json:"available_core_quota,omitempty" url:"available_core_quota,omitempty"`
	TotalCoreQuota     float32                          `json:"total_core_quota,omitempty" url:"total_core_quota,omitempty"`
}
