'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnemploymentPovertyData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UnemploymentPovertyData.init({
    areaCode: { type: DataTypes.STRING, unique: true},
    areaName: DataTypes.STRING,
    percentBelowPoverty: DataTypes.DOUBLE,
    percentUnemployed: DataTypes.DOUBLE,
    perCapitaIncome: DataTypes.DOUBLE
  }, {
    sequelize,
    tableName: 'unemployment_poverty_data',
    modelName: 'UnemploymentPovertyData'    
  });
  return UnemploymentPovertyData;
};
