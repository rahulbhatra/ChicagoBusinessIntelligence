const router = require('express').Router();
const axios = require('axios');
const { TaxiTrip } = require('../models');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:root@localhost:5432/chicago_business_intelligence');
const {QueryTypes } = require('sequelize');

router.get('/airportTaxi', async(req, res) => {

    try {        
        await sequelize.query(`select "pickUpZip","dropOffZip",count(*) as total_trips,covid_weekly.week_number,"week_start_date","week_end_date","cases_per_week" from taxi_trip trip, covid_weekly_data covid_weekly
        where "dropOffZip" = "zipCode"::varchar
        and "tripStartTime" between week_start_date and week_end_date
        and "pickUpZip" in ('60666','60638')
        group by "pickUpZip","dropOffZip",week_number,"week_start_date","week_end_date","cases_per_week"
        order by "cases_per_week" desc`
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

router.get('/covidTaxi', async (req, res) => {
    try {
        await sequelize.query(`select trip."pickUpZip",trip."dropOffZip", count(*) as "totalTrips",covid_weekly."weekNum",covid_weekly."weekStartDate"
        ,covid_weekly."weekEndDate",covid_weekly."casesPerWeek" 
        from taxi_trip trip, covid_weekly
        where "dropOffZip" = "zipCode"::varchar
        and "tripStartTime" between covid_weekly."weekStartDate" and covid_weekly."weekEndDate"
        group by trip."pickUpZip",trip."dropOffZip",covid_weekly."weekNum",covid_weekly."weekStartDate",covid_weekly."weekEndDate",covid_weekly."casesPerWeek"
        order by "casesPerWeek" desc`
        , { type: QueryTypes.SELECT })        
        .then(result => {
            console.log(result);
            var taxitripArray = result;
            var dataArray = Array(taxitripArray.length);
            for(var i = 0; i < taxitripArray.length; i++) {
            dataArray[i] = {
                id: i + 1,                                              
                pickUpZip: taxitripArray[i].pickUpZip,
                dropOffZip: taxitripArray[i].dropOffZip,
                totalTrips: taxitripArray[i].totalTrips,
                weekNumber: taxitripArray[i].weekNum,
                weekStartDate: taxitripArray[i].weekStartDate,
                weekEndDate: taxitripArray[i].weekEndDate,
                casesPerWeek: taxitripArray[i].casesPerWeek
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
