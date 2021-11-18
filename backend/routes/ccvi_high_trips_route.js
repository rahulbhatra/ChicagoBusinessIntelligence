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
            var pickUpZipCode = taxiTripArray.pickUpZipCode;
            var dropOffZipCode = taxiTripArray.dropOffZipCode;
            pickUpZipCodeTaxiIndexMap[pickUpZipCode] = i;
            dropOffZipCodeTaxiIndexMap[dropOffZipCode] = i;
        }


        var dataArray = Array();
        for(var i = 0; i < covidCCVIArray.length; i ++) {
            var covidZipCode = covidCCVIArray.communityAreaOrZipCode;
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
    } catch(eror) {
        res.status(500).json({
            message: 'Server Error.',
            error: error
        })
    }
});