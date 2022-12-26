'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CovidDaily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CovidDaily.init({
    labReportDate: DataTypes.DATE,
    totalCases: DataTypes.BIGINT,
    totalDeaths: DataTypes.BIGINT
  }, {
    sequelize,
    tableName: 'covid_daily',
    modelName: 'CovidDaily',
  });
  return CovidDaily;
};