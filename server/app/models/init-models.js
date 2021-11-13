var DataTypes = require("sequelize").DataTypes;
var _covid_ccvi_data = require("./COVID_CCVI_DATA");
var _covid_daily_data = require("./COVID_DAILY_DATA");
var _covid_weekly_data = require("./COVID_WEEKLY_DATA");
var _taxi_trips_data = require("./TAXI_TRIPS_DATA");
var _unemployment_poverty_data = require("./UNEMPLOYMENT_POVERTY_DATA");
var _user_details = require("./USER_DETAILS");

function initModels(sequelize) {
  var covid_ccvi_data = _covid_ccvi_data(sequelize, DataTypes);
  var covid_daily_data = _covid_daily_data(sequelize, DataTypes);
  var covid_weekly_data = _covid_weekly_data(sequelize, DataTypes);
  var taxi_trips_data = _taxi_trips_data(sequelize, DataTypes);
  var unemployment_poverty_data = _unemployment_poverty_data(sequelize, DataTypes);
  var user_details = _user_details(sequelize, DataTypes);

  return {
    covid_ccvi_data,
    covid_daily_data,
    covid_weekly_data,
    taxi_trips_data,
    unemployment_poverty_data,
    user_details,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
