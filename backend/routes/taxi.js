const router = require('express').Router();
const axios = require('axios');

router.get('/table_data', async (req, res) => {
    url = "https://data.cityofchicago.org/resource/wrvz-psew.json";
    
    axios({
        method: 'GET',
        url: url,
        responseType: 'application/json'
    })
    .then((response => {
        json = response.data;
        var dataArray = Array(json.length);
        var columns = ['id', 'pickup_lat', 'pickup_lon', 'drop_lat', 'drop_lon'];

        for(var i = 0; i < json.length; i++) {
            console.log("here i am");
            dataArray[i] = {
              id: i + 1,
              pickup_lat: json[i].lab_report_date,
              pickup_lon: json[i].cases_total,
              death_total: json[i].deaths_total
            }
        }

        res.status(200).json({
            message: 'success',
            data: dataArray,
            columns: columns
        });
    }))
    .catch((error => {
        res.status(500).json();
    }));
})


module.exports = router;
