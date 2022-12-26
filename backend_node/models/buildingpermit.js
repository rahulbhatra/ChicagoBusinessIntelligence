'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuildingPermit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BuildingPermit.init({
    buildingPermitId: DataTypes.BIGINT,
    permitId: DataTypes.BIGINT,
    permitType: DataTypes.STRING,
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    tableName: 'building_permit',
    modelName: 'BuildingPermit',
  });
  return BuildingPermit;
};