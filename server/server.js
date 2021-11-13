const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

global.__basedir = __dirname;

var corsOptions = {
	origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Simple route
app.get("/", (req, res) => {
	res.json({message: "Welcome to Chicago City Portal"});
});

// Added routes for all entities
require('./app/routes/auth.routes')(app);
require("./app/routes/user_details.routes")(app);
require("./app/routes/taxi_trips.routes")(app);
require("./app/routes/covid_ccvi.routes")(app);
require("./app/routes/covid_weekly.routes")(app);
require("./app/routes/covid_daily.routes")(app);
require("./app/routes/unemployment_poverty.routes")(app);

// Set Port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});