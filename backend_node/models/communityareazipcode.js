'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommunityAreaZipCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CommunityAreaZipCode.init({
    communityAreaNumber: DataTypes.BIGINT,
    communityAreaName: DataTypes.STRING,
    communityAreaZipCode: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'community_area_zipcode',
    modelName: 'CommunityAreaZipCode',
  });
  return CommunityAreaZipCode;
};