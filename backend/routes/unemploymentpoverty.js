const router = require('express').Router();
const axios = require('axios');
const { UnemploymentPovertyData } = require('../models');

router.get('/data', async (req, res) => {
    // try {
        
        var unempPovertyArray = await UnemploymentPovertyData.findAll();
        var dataArray = Array(unempPovertyArray.length);
        for(var i = 0; i < unempPovertyArray.length; i++) {
            dataArray[i] = {
                id: unempPovertyArray[i].id,
                areaCode: unempPovertyArray[i].areaCode,
                areaName: unempPovertyArray[i].areaName,
                percentBelowPoverty: unempPovertyArray[i].percentBelowPoverty,
                percentUnemployed: unempPovertyArray[i].percentUnemployed,
                perCapitaIncome: unempPovertyArray[i].perCapitaIncome
            }
        }
    
        console.log(dataArray.length);
    
        res.status(200).json({
            message: 'success',
            rows: dataArray,
        })
    // } catch(error) {
    //     res.status(500).json({
    //         message: 'Server Error.',
    //         error: error
    //     })
    // }
   
})

module.exports = router;
