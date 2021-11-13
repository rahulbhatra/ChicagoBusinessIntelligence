module.exports = app => {
    const covidDaily = require("../controllers/covid_daily.controller.js");

    var router = require("express").Router();    

    // View all daily COVID details in database
    router.get("/", covidDaily.findAll);

    app.use('/api/covidDaily', router);
}