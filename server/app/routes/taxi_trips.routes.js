module.exports = app => {
    const taxiTrips = require("../controllers/taxi_trips.controller.js");

    var router = require("express").Router();    

    // View all taxi trip details in database
    router.get("/", taxiTrips.findAll);

    app.use('/api/taxiTrips', router);
}