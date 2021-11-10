const router = require('express').Router();
const axios = require('axios');

router.get('/covid_daily_data', async (req, res) => {
    url = 'https://data.cityofchicago.org/resource/naz8-j4nc.json'
    await axios({
        method: 'GET',
        url: url,
        responseType: 'application/json'
    })
    .then((response) => {
        
        json = response.data;
        var dataArray = Array(json.length);
        var columns = ['id', 'lab_report_date', 'cases_total', 'death_total'];

        for(var i = 0; i < json.length; i++) {
            console.log("here i am");
            dataArray[i] = {
              id: i + 1,
              lab_report_date: json[i].lab_report_date,
              cases_total: json[i].cases_total,
              death_total: json[i].deaths_total
            }
        }

        console.log(dataArray.length);

        res.status(200).json({
            message: 'success',
            data: dataArray,
            columns: columns
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json();
    })
})

router.get('/table_data', async (req, res) => {
    url = 'https://data.cityofchicago.org/resource/naz8-j4nc.json'
    await axios({
        method: 'GET',
        url: url,
        responseType: 'application/json'
    })
    .then((response) => {
        
        json = response.data;
        var dataArray = Array(json.length);
        var columns = ['id', 'lab_report_date', 'cases_total', 'death_total'];

        for(var i = 0; i < json.length; i++) {
            console.log("here i am");
            dataArray[i] = {
              id: i + 1,
              lab_report_date: json[i].lab_report_date,
              cases_total: json[i].cases_total,
              death_total: json[i].deaths_total
            }
        }

        console.log(dataArray.length);

        res.status(200).json({
            message: 'success',
            data: dataArray,
            columns: columns
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json();
    })
})


 getData = async () => {
    await fetch('https://data.cityofchicago.org/resource/naz8-j4nc.json'
        ,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        }
    )
    .then((res) => {
      return res.json()
    })
    .then(
    (json) => {
      console.log(json);
      setData(json);
      // setRows(data);
      setRows(getRows(json));
    },
    (error) => {
    console.log(error);
    });


}

module.exports = router;