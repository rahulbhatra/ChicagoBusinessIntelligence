const router = require('express').Router();
const { CovidCCVI } = require('../models');
const { getZipCodeCommunityAreaMapping } = require('../services/communityareaservice');


router.get('/data', async (req, res) => {
    try {
        
        var CovidCCVIArray = await CovidCCVI.findAll();
        var zipCodeCommunityDict = await getZipCodeCommunityAreaMapping();
        var dataArray = Array(CovidCCVIArray.length);
        for(var i = 0; i < CovidCCVIArray.length; i++) {
            var zipCode = CovidCCVIArray[i].communityAreaOrZipCode;
            dataArray[i] = {
                id: i + 1,
                zipCode: CovidCCVIArray[i].communityAreaOrZipCode,
                latitude: CovidCCVIArray[i].latitude.toFixed(2),
                longitude: CovidCCVIArray[i].longitude.toFixed(2),
                ccvi_score: CovidCCVIArray[i].ccviScore,
                ccvi_category: CovidCCVIArray[i].ccviCategory,
                communityArea : zipCodeCommunityDict[zipCode]
            }
        }
    
        console.log(dataArray.length);
    
        res.status(200).json({
            message: 'success',
            rows: dataArray,
        })
    } catch(error) {
        res.status(500).json({
            message: 'Server Error.',
            error: error
        })
    }
   
})



module.exports = router;