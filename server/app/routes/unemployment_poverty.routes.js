module.exports = app => {
    const unemploymentPoverty = require("../controllers/unemployment_poverty.controller.js");

    var router = require("express").Router();    

    // View all unemployment and poverty details in database
    router.get("/", unemploymentPoverty.findAll);

    app.use('/api/unemploymentPoverty', router);
}