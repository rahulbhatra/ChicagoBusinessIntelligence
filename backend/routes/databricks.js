const router = require('express').Router();
const Databricks = require('databricks-node');
 
const HOST = '12345-abcdef-678.cloud.databricks.com';
const AUTH_TOKEN = '123456789abcdefghi';
 
const databricks = new Databricks(HOST, AUTH_TOKEN);
 


router.get('/', (req, res) => {
    
    (async () => {
        const clusters = await databricks.Clusters.list();
        console.log('cluster bro', clusters);
    })();
    res.send('databricks');
});


module.exports = router;