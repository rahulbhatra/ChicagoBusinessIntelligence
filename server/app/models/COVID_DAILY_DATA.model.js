const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('covid_daily_data', {
    lab_report_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    total_cases: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    total_deaths: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'covid_daily_data',    
    timestamps: false,
    indexes: [
      {
        name: "covid_daily_data_pkey",
        unique: true,
        fields: [
          { name: "lab_report_date" },
        ]
      },
    ]
  });
};
