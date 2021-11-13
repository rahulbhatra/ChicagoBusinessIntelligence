const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	logging: console.log
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.options.logging = true;

db.userDetails = require("./USER_DETAILS.model.js")(sequelize, Sequelize);
db.taxiTrips = require("./TAXI_TRIPS_DATA.model.js")(sequelize, Sequelize);
db.covidCCVI = require("./COVID_CCVI_DATA.model.js")(sequelize, Sequelize);
db.covidWeekly = require("./COVID_WEEKLY_DATA.model.js")(sequelize, Sequelize);
db.covidDaily = require("./COVID_DAILY_DATA.model.js")(sequelize, Sequelize);
db.unemploymentPoverty = require("./UNEMPLOYMENT_POVERTY_DATA.model.js")(sequelize, Sequelize);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;