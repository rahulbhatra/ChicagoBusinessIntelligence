module.exports = app => {
    const covidCCVI = require("../controllers/covid_ccvi.controller.js");

    var router = require("express").Router();    

    // View all COVID CCVI details in database
    router.get("/", covidCCVI.findAll);

    app.use('/api/covidCCVI', router);
}