'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CovidCCVI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CovidCCVI.init({
    geographyType: DataTypes.STRING,
    communityAreaOrZipCode: DataTypes.BIGINT,
    ccviScore: DataTypes.DOUBLE,
    ccviCategory: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'covid_ccvi',
    modelName: 'covid',
  });
  return CovidCCVI;
};