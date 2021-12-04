const router = require('express').Router();
const { CovidDaily } = require('../models');

router.get('/data', async (req, res) => {
    try {
        var CovidDailyArray = await CovidDaily.findAll();
        var dataArray = Array(CovidDailyArray.length);
        for(var i = 0; i < CovidDailyArray.length; i++) {
            dataArray[i] = {
                id: i + 1,
                lab_report_date: (new Date(CovidDailyArray[i].labReportDate)).toLocaleDateString(),
                cases_total: CovidDailyArray[i].totalCases,
                death_total: CovidDailyArray[i].totalDeaths
            }
        }
    
        console.log(dataArray.length);
    
        res.status(200).json({
            message: 'success',
            rows: dataArray
        })
    } catch(error) {
        res.status(500).json({
            message: 'Server Error.',
            error: error
        })
    }
   
})

module.exports = router;