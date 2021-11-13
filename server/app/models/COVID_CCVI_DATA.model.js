const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('covid_ccvi_data', {
    geography_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    ccvi_score: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    ccvi_category: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'covid_ccvi_data',    
    timestamps: false,
    indexes: [
      {
        name: "covid_ccvi_data_pkey",
        unique: true,
        fields: [
          { name: "geography_type" },
          { name: "code" },
        ]
      },
    ]
  });
};
