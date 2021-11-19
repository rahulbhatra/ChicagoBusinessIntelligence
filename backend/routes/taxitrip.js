const router = require('express').Router();
const axios = require('axios');
const { TaxiTrip } = require('../models');

router.get('/data', async (req, res) => {
    try {
        
        var taxitripArray = await TaxiTrip.findAll();
        var dataArray = Array(taxitripArray.length);
        for(var i = 0; i < taxitripArray.length; i++) {
            dataArray[i] = {
                id: taxitripArray[i].id,
                tripId: taxitripArray[i].tripId,
                tripStartTime: taxitripArray[i].tripStartTime,
                tripEndTime: taxitripArray[i].tripEndTime,
                pickUpLat: taxitripArray[i].pickUpLat,                
                pickUpLon: taxitripArray[i].pickUpLon,
                dropOffLat: taxitripArray[i].dropOffLat,
                dropOffLon: taxitripArray[i].dropOffLon,
                pickUpZip: taxitripArray[i].pickUpZip,
                dropOffZip: taxitripArray[i].dropOffZip
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
