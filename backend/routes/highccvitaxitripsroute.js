const router = require('express').Router();
const { CovidCCVI, TaxiTrip } = require('../models');

router.get('/data', async(req, res) => {
    try {
        var covidCCVIArray = await CovidCCVI.findAll({
            where: {
                ccviCategory: 'HIGH'
            }
        });
        var taxiTripArray = await TaxiTrip.findAll({});

        var pickUpZipCodeTaxiIndexMap = {};
        var dropOffZipCodeTaxiIndexMap = {};
        for(var i = 0; i < taxiTripArray.length; i ++ ) {
            
            taxiTripArray[i].dropOffLat = taxiTripArray[i].dropOffLat.toFixed(2);
            taxiTripArray[i].dropOffLon = taxiTripArray[i].dropOffLon.toFixed(2);
            taxiTripArray[i].pickUpLat = taxiTripArray[i].pickUpLat.toFixed(2);
            taxiTripArray[i].pickUpLon = taxiTripArray[i].pickUpLon.toFixed(2);
            // taxiTripArray[i].tripStartTime = (new DatetaxiTripArray[i].tripStartTime.toLocaleTimeString();
            // taxiTripArray[i].tripEndTime = (new Date(taxiTripArray[i].tripEndTime)).toLocaleTimeString();


            var pickUpZipCode = taxiTripArray[i].pickUpZip;
            var dropOffZipCode = taxiTripArray[i].dropOffZip;

            console.log("Pick Up ZipCode " + pickUpZipCode + " " + dropOffZipCode)

            pickUpZipCodeTaxiIndexMap[pickUpZipCode] = i;
            dropOffZipCodeTaxiIndexMap[dropOffZipCode] = i;
        }

        console.log(pickUpZipCodeTaxiIndexMap);


        var dataArray = Array();
        for(var i = 0; i < covidCCVIArray.length; i ++) {
            var covidZipCode = covidCCVIArray[i].communityAreaOrZipCode;
            console.log(covidZipCode);
            if(pickUpZipCodeTaxiIndexMap[covidZipCode] != null) {
                var index = pickUpZipCodeTaxiIndexMap[covidZipCode];
                var taxiTrip = taxiTripArray[index];
                dataArray.push(taxiTrip);
                continue;
            }

            if(dropOffZipCodeTaxiIndexMap[covidZipCode] != null) {
                var index = dropOffZipCodeTaxiIndexMap[covidZipCode];
                var taxiTrip = taxiTripArray[index];
                dataArray.push(taxiTrip);
            }
        }

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
});

module.exports = router;