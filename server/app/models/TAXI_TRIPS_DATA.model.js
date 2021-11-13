const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('taxi_trips_data', {
    trip_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    trip_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trip_end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pickup_lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    pickup_long: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    dropoff_lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    dropoff_long: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    pickup_zip: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    dropoff_zip: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'taxi_trips_data',    
    timestamps: false,
    indexes: [
      {
        name: "taxi_trips_data_pkey",
        unique: true,
        fields: [
          { name: "trip_id" },
        ]
      },
    ]
  });
};
