'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaxiTrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TaxiTrip.init({
    tripId: { type: DataTypes.STRING, unique: true},
    tripStartTime: DataTypes.DATE,
    tripEndTime: DataTypes.DATE,
    pickUpLat: DataTypes.DOUBLE,
    pickUpLon: DataTypes.DOUBLE,
    dropOffLat: DataTypes.DOUBLE,
    dropOffLon: DataTypes.DOUBLE,
    pickUpZip: DataTypes.STRING,
    dropOffZip: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'taxi_trip',
    modelName: 'TaxiTrip',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tripId" },
        ]
      },
    ]
  });
  return TaxiTrip;
};