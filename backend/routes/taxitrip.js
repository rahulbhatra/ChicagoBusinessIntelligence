const router = require('express').Router();
const axios = require('axios');
const { TaxiTrip } = require('../models');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:root@localhost:5432/chicago_business_intelligence');
const {QueryTypes } = require('sequelize');

router.get('/airportTaxi', async(req, res) => {

    try {        
        await sequelize.query(`select "pickUpZip","dropOffZip",count(*) as total_trips,"weekNum","weekStartDate","weekEndDate","casesPerWeek"
        from taxi_trip trip, covid_weekly covid_weekly
        where "dropOffZip" = "zipCode"::varchar
        and "tripStartTime" between "weekStartDate" and "weekEndDate"
        and "pickUpZip" in ('60666','60638')
        group by "pickUpZip","dropOffZip","weekNum","weekStartDate","weekEndDate","casesPerWeek"
        order by "casesPerWeek" desc`
        , { type: QueryTypes.SELECT })        
        .then(result => {
            console.log(result);
            var taxitripArray = result;
            var dataArray = Array(taxitripArray.length);
            for(var i = 0; i < taxitripArray.length; i++) {
            dataArray[i] = {            
                id: 0,                                    
                pickUpZip: taxitripArray[i].pickUpZip,
                dropOffZip: taxitripArray[i].dropOffZip,
                totalTrips: taxitripArray[i].total_trips,
                weekNumber: taxitripArray[i].week_number,
                weekStartDate: taxitripArray[i].week_start_date,
                weekEndDate: taxitripArray[i].week_end_date,
                casesPerWeek: taxitripArray[i].cases_per_week
             }
            }

            res.send({
                message: 'success',
                rows: dataArray,
                status: '200'
            });                
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
})

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
