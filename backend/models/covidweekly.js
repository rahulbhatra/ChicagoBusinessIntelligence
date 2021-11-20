'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CovidWeekly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CovidWeekly.init({
    zipCode: DataTypes.STRING,
    weekNum: DataTypes.BIGINT,
    weekStartDate: DataTypes.DATE,
    weekEndDate: DataTypes.DATE,
    casesPerWeek: DataTypes.BIGINT,
    casesCumulative: DataTypes.BIGINT,
    percentPositivePerWeek: DataTypes.DOUBLE,
    percentPositiveCumulative: DataTypes.DOUBLE
  }, {
    sequelize,
    tableName: 'covid_weekly',
    modelName: 'CovidWeekly',
  });
  return CovidWeekly;
};