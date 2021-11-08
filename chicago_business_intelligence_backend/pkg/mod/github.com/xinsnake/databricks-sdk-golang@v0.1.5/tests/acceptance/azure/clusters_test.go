package azure_test

import (
	"fmt"
	"testing"
	"time"

	"github.com/polar-rams/databricks-sdk-golang/azure/clusters/httpmodels"
	"github.com/polar-rams/databricks-sdk-golang/azure/clusters/models"
	"github.com/stretchr/testify/assert"
)

var clusterName = "acceptance_test_cluster_" + randSeq(5)
var clusterId = ""

func TestAzureClustersCreate(t *testing.T) {

	sparkConf := map[string]string{
		"spark.speculation": "true",
	}

	req := httpmodels.CreateReq{
		ClusterName:  clusterName,
		SparkVersion: "7.3.x-scala2.12",
		NodeTypeID:   "Standard_D3_v2",
		SparkConf:    sparkConf,
		NumWorkers:   1,
	}

	resp, e := c.Clusters().Create(req)

	assert.Nilf(t, e, "TestAzureClustersCreate: could not create cluster. error:%s", e)

	clusterId = resp.ClusterID

	respAfter, eAfter := WaitUntilStateIsNot(models.ClusterStatePending, clusterId)

	assert.Nilf(t, eAfter, "TestAzureClustersAfterCreation: could not get cluster state. error:%s", eAfter)
	assert.Equalf(t, string(respAfter.State), models.ClusterStateRunning, "TestAzureClustersCreate: cluster is not running. State:%s", respAfter.State)
}

func TestAzureClustersGet(t *testing.T) {

	req := httpmodels.GetReq{
		ClusterID: clusterId,
	}

	_, e := c.Clusters().Get(req)

	assert.Nilf(t, e, "TestAzureClustersGet: could not get cluster. error:%s", e)
}

func TestAzureClustersEvents(t *testing.T) {

	req := httpmodels.EventsReq{
		ClusterID: clusterId,
	}

	resp, e := c.Clusters().Events(req)

	assert.Nilf(t, e, "TestAzureClustersEvents: could not get events. error:%s", e)
	assert.GreaterOrEqual(t, len(resp.Events), 0, "TestAzureClustersEvents: should get at least one event.")
}

func TestAzureClustersList(t *testing.T) {

	resp, e := c.Clusters().List()

	assert.Nilf(t, e, "TestAzureClustersList: could not list clusters. error:%s", e)
	assert.GreaterOrEqual(t, len(resp.Clusters), 0, "TestAzureClustersList: should list at least one cluster.")
}

func TestAzureClustersListNodeTypes(t *testing.T) {

	resp, e := c.Clusters().ListNodeTypes()

	assert.Nilf(t, e, "TestAzureClustersListNodeTypes: could not list node types. error:%s", e)
	assert.GreaterOrEqual(t, len(resp.NodeTypes), 0, "TestAzureClustersListNodeTypes: should list at least one node type.")
}

func TestAzureClustersRuntimeVersions(t *testing.T) {

	resp, e := c.Clusters().RuntimeVersions()

	assert.Nilf(t, e, "TestAzureClustersRuntimeVersions: could not get runtime versions. error:%s", e)
	assert.GreaterOrEqual(t, len(resp.Versions), 0, "TestAzureClustersRuntimeVersions: should support at least one version.")
}

func TestAzureClustersPin(t *testing.T) {

	req := httpmodels.PinReq{
		ClusterID: clusterId,
	}

	e := c.Clusters().Pin(req)

	assert.Nilf(t, e, "TestAzureClustersPin: could not pin cluster. error:%s", e)
}

func TestAzureClustersUnpin(t *testing.T) {

	req := httpmodels.UnpinReq{
		ClusterID: clusterId,
	}

	e := c.Clusters().Unpin(req)

	assert.Nilf(t, e, "TestAzureClustersUnpin: could not unpin cluster. error:%s", e)
}

func TestAzureClustersEdit(t *testing.T) {

	req := httpmodels.EditReq{
		ClusterID:    clusterId,
		ClusterName:  clusterName + "_edited",
		SparkVersion: "7.3.x-scala2.12",
		NodeTypeID:   "Standard_D3_v2",
		NumWorkers:   1,
	}

	e := c.Clusters().Edit(req)

	assert.Nilf(t, e, "TestAzureClustersEdit: could not edit cluster. error:%s", e)

	respAfter, eAfter := WaitUntilStateIsNot(models.ClusterStateRestarting, clusterId)

	assert.Nilf(t, eAfter, "TestAzureClustersAfterEdition: could not get cluster state. error:%s", eAfter)
	assert.Equalf(t, string(respAfter.State), models.ClusterStateRunning, "TestAzureClustersAfterEdition: cluster is not running. State:%s", respAfter.State)
}

func TestAzureClustersResize(t *testing.T) {

	req := httpmodels.ResizeReq{
		ClusterID:  clusterId,
		NumWorkers: 2,
	}

	e := c.Clusters().Resize(req)

	assert.Nilf(t, e, "TestAzureClustersResize: could not resize cluster. error:%s", e)

	respAfter, eAfter := WaitUntilStateIsNot(models.ClusterStateResizing, clusterId)

	assert.Nilf(t, eAfter, "TestAzureClustersAfterResizing: could not get cluster state. error:%s", eAfter)
	assert.Equalf(t, string(respAfter.State), models.ClusterStateRunning, "TestAzureClustersAfterResizing: cluster is not running. State:%s", respAfter.State)
	assert.Equalf(t, respAfter.NumWorkers, int32(2), "TestAzureClustersAfterResizing: cluster should have 2 workers. Current:%s", respAfter.NumWorkers)
}

func TestAzureClustersRestart(t *testing.T) {

	req := httpmodels.RestartReq{
		ClusterID: clusterId,
	}

	e := c.Clusters().Restart(req)

	assert.Nilf(t, e, "TestAzureClustersRestart: could not restart cluster. error:%s", e)

	respAfter, eAfter := WaitUntilStateIsNot(models.ClusterStateRestarting, clusterId)

	assert.Nilf(t, eAfter, "TestAzureClustersAfterRestarting: could not get cluster state. error:%s", eAfter)
	assert.Equalf(t, string(respAfter.State), models.ClusterStateRunning, "TestAzureClustersAfterRestarting: cluster is not running. State:%s", respAfter.State)
}

func TestAzureClustersDelete(t *testing.T) {
	req := httpmodels.DeleteReq{
		ClusterID: clusterId,
	}

	e := c.Clusters().Delete(req)

	assert.Nilf(t, e, "TestAzureClustersDelete: could not delete cluster. error:%s", e)

	respAfter, eAfter := WaitUntilStateIsNot(models.ClusterStateTerminating, clusterId)

	assert.Nilf(t, eAfter, "TestAzureClustersAfterDeletion: could not get cluster state. error:%s", eAfter)
	assert.Equalf(t, string(respAfter.State), models.ClusterStateTERMINATED, "TestAzureClustersAfterDeletion: cluster is not terminated. State:%s", respAfter.State)
}

func TestAzureClustersStart(t *testing.T) {
	req := httpmodels.StartReq{
		ClusterID: clusterId,
	}

	e := c.Clusters().Start(req)

	assert.Nilf(t, e, "TestAzureClustersStart: could not start cluster. error:%s", e)

	respAfter, eAfter := WaitUntilStateIsNot(models.ClusterStatePending, clusterId)

	assert.Nilf(t, eAfter, "TestAzureClustersAfterStarting: could not get cluster state. error:%s", eAfter)
	assert.Equalf(t, string(respAfter.State), models.ClusterStateRunning, "TestAzureClustersAfterStarting: cluster is not running. State:%s", respAfter.State)
}

func TestAzureClustersPermanentDelete(t *testing.T) {
	req := httpmodels.PermanentDeleteReq{
		ClusterID: clusterId,
	}

	e := c.Clusters().PermanentDelete(req)

	assert.Nil(t, e, fmt.Sprintf("TestAzureClustersPermanentDelete: could not permanently delete cluster. error:%s", e))
}

func WaitUntilStateIsNot(state string, id string) (httpmodels.GetResp, error) {

	req := httpmodels.GetReq{
		ClusterID: id,
	}

	resp, e := c.Clusters().Get(req)

	for string(resp.State) == state {
		time.Sleep(5 * time.Second)
		resp, e = c.Clusters().Get(req)
	}

	return resp, e
}
