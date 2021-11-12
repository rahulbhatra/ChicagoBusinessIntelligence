const router = require('express').Router();
const { CovidDaily } = require('../models');

// router.get('/covid_daily_data', async (req, res) => {
//     url = 'https://data.cityofchicago.org/resource/naz8-j4nc.json'
//     await axios({
//         method: 'GET',
//         url: url,
//         responseType: 'application/json'
//     })
//     .then((response) => {
        
//         json = response.data;
//         var dataArray = Array(json.length);
//         var columns = ['id', 'lab_report_date', 'cases_total', 'death_total'];

//         for(var i = 0; i < json.length; i++) {
//             console.log("here i am");
//             dataArray[i] = {
//               id: i + 1,
//               lab_report_date: json[i].lab_report_date,
//               cases_total: json[i].cases_total,
//               death_total: json[i].deaths_total
//             }
//         }

//         console.log(dataArray.length);

//         res.status(200).json({
//             message: 'success',
//             data: dataArray,
//             columns: columns
//         })
//     })
//     .catch((error) => {
//         console.log(error);
//         res.status(500).json();
//     })
// })

router.get('/table_data', async (req, res) => {
    try {
        
        var columns = ['id', 'lab_report_date', 'cases_total', 'death_total'];
        var CovidDailyArray = await CovidDaily.findAll();
        var dataArray = Array(CovidDailyArray.length);
        for(var i = 0; i < CovidDailyArray.length; i++) {
            dataArray[i] = {
                id: i + 1,
                lab_report_date: CovidDailyArray[i].labReportDate,
                cases_total: CovidDailyArray[i].totalCases,
                death_total: CovidDailyArray[i].totalDeaths
            }
        }
    
        console.log(dataArray.length);
    
        res.status(200).json({
            message: 'success',
            data: dataArray,
            columns: columns
        })
    } catch(error) {
        res.status(500).json({
            message: 'Server Error.',
            error: error
        })
    }
   
})


router.get('/linear_chart', async (req, res) => {
    try {
        
        const columns = [
            { value: 'cases_total', name: 'Cases Total' },
            { value: 'death_total', name: 'Dealth Total' }
        ];

        const argumentField = "lab_report_date";

        var CovidDailyArray = await CovidDaily.findAll();
        var dataArray = Array(CovidDailyArray.length);
        for(var i = 0; i < CovidDailyArray.length; i++) {
            dataArray[i] = {
                id: i + 1,
                lab_report_date: CovidDailyArray[i].labReportDate,
                cases_total: CovidDailyArray[i].totalCases,
                death_total: CovidDailyArray[i].totalDeaths
            }
        }
    
        console.log(dataArray.length);
    
        res.status(200).json({
            message: 'success',
            rows: dataArray,
            columns: columns,
            argumentField: argumentField
        })
    } catch(error) {
        res.status(500).json({
            message: 'Server Error.',
            error: error
        })
    }
   
})

module.exports = router;