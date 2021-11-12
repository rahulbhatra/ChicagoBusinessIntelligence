const router = require('express').Router();
const axios = require('axios');
const { CovidCCVI } = require('../models');

router.get('/table_data', async (req, res) => {
    try {
        
        var columns = ['id', 'community_area', 'ccvi_score', 'ccvi_category'];
        var CovidCCVIArray = await CovidCCVI.findAll();
        var dataArray = Array(CovidCCVIArray.length);
        for(var i = 0; i < CovidCCVIArray.length; i++) {
            dataArray[i] = {
                id: i + 1,
                community_area: CovidCCVIArray[i].communityAreaOrZipCode,
                ccvi_score: CovidCCVIArray[i].ccviScore,
                ccvi_category: CovidCCVIArray[i].ccviCategory
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

const getCategory = (category) => {
    if(category === 'HIGH') {
        return 2;
    } else if (category == 'MEDIUM') {
        return 1;
    } else {
        return 0;
    }
}

router.get('/linear_chart', async (req, res) => {
    try {
        
        const columns = [
            { value: 'ccvi_score', name: 'CCVI Score' },
            { value: 'ccvi_category', name: 'CCVI Category' }
        ];

        const argumentField = "community_area";

        var CovidCCVIArray = await CovidCCVI.findAll();
        var dataArray = Array(CovidCCVIArray.length);
        for(var i = 0; i < CovidCCVIArray.length; i++) {
            dataArray[i] = {
                id: i + 1,
                community_area: CovidCCVIArray[i].communityAreaOrZipCode,
                ccvi_score: CovidCCVIArray[i].ccviScore,
                ccvi_category: getCategory(CovidCCVIArray[i].ccviCategory)
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