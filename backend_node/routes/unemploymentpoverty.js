const router = require('express').Router();
const axios = require('axios');
const { UnemploymentPovertyData } = require('../models');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:root@localhost:5432/chicago_business_intelligence');
const {QueryTypes } = require('sequelize');

router.get('/data', async (req, res) => {

    try {        
        await sequelize.query(`select Id, "areaCode", "areaName", "percentBelowPoverty", "percentUnemployed", "perCapitaIncome" from unemployment_poverty_data order by "percentBelowPoverty" desc limit 5;`
        , { type: QueryTypes.SELECT })        
        .then(result => {
            console.log(result);
            var unempPovertyArray = result;
            var dataArray = Array(unempPovertyArray.length);
            for(var i = 0; i < unempPovertyArray.length; i++) {
            dataArray[i] = {
                id: unempPovertyArray[i].id,
                areaCode: unempPovertyArray[i].areaCode,
                areaName: unempPovertyArray[i].areaName,
                percentBelowPoverty: unempPovertyArray[i].percentBelowPoverty,
                percentUnemployed: unempPovertyArray[i].percentUnemployed,
                perCapitaIncome : unempPovertyArray[i].perCapitaIncome,
                buildingFeeWaived: 0
            }
        }
    
        console.log(dataArray.length);
    
        res.status(200).json({
            message: 'success',
            rows: dataArray,
        })              
        })
        .catch(err =>{
            console.log(err);
        });        
    } catch(error) {
        console.log("ERROR = " , error);
        res.status(500).json({            
            message: 'Server Error.',
            error: error
        })
    }  


    // // try {
        
    //     var unempPovertyArray = await UnemploymentPovertyData.findAll();
    //     var dataArray = Array(unempPovertyArray.length);
    //     for(var i = 0; i < unempPovertyArray.length; i++) {
    //         dataArray[i] = {
    //             id: unempPovertyArray[i].id,
    //             areaCode: unempPovertyArray[i].areaCode,
    //             areaName: unempPovertyArray[i].areaName,
    //             percentBelowPoverty: unempPovertyArray[i].percentBelowPoverty,
    //             percentUnemployed: unempPovertyArray[i].percentUnemployed,
    //             perCapitaIncome: unempPovertyArray[i].perCapitaIncome
    //         }
    //     }
    
    //     console.log(dataArray.length);
    
    //     res.status(200).json({
    //         message: 'success',
    //         rows: dataArray,
    //     })
    // // } catch(error) {
    // //     res.status(500).json({
    // //         message: 'Server Error.',
    // //         error: error
    // //     })
    // // }
   
})

module.exports = router;
