'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CovidWeeklies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      zipCode: {
        type: Sequelize.STRING
      },
      weekNum: {
        type: Sequelize.BIGINT
      },
      weekStartDate: {
        type: Sequelize.DATE
      },
      weekEndDate: {
        type: Sequelize.DATE
      },
      casesPerWeek: {
        type: Sequelize.BIGINT
      },
      casesCumulative: {
        type: Sequelize.BIGINT
      },
      percentPositivePerWeek: {
        type: Sequelize.DOUBLE
      },
      percentPositiveCumulative: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CovidWeeklies');
  }
};