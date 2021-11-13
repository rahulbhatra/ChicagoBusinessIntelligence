const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('covid_weekly_data', {
    zip_code: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    week_number: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    week_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    week_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cases_per_week: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    cases_cumulative: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    percent_positive: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    percent_positive_accum: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'covid_weekly_data',    
    timestamps: false,
    indexes: [
      {
        name: "covid_weekly_data_pkey",
        unique: true,
        fields: [
          { name: "zip_code" },
          { name: "week_number" },
          { name: "week_start_date" },
        ]
      },
    ]
  });
};
