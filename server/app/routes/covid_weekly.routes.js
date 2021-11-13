module.exports = app => {
    const covidWeekly = require("../controllers/covid_weekly.controller.js");

    var router = require("express").Router();    

    // View all weekly COVID details in database
    router.get("/", covidWeekly.findAll);

    app.use('/api/covidWeekly', router);
}