const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unemployment_poverty_data', {
    zip_code: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    area_code: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    area_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    percent_housing_occupied: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    percent_below_poverty: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    percent_unemployed: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'unemployment_poverty_data',    
    timestamps: false,
    indexes: [
      {
        name: "unemployment_poverty_data_pkey",
        unique: true,
        fields: [
          { name: "zip_code" },
          { name: "area_code" },
        ]
      },
    ]
  });
};
