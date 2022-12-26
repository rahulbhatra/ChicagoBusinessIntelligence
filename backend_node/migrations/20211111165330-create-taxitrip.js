'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('taxitrips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripId: {
        type: Sequelize.STRING
      },
      tripStartTime: {
        type: Sequelize.DATE
      },
      tripEndTime: {
        type: Sequelize.DATE
      },
      pickUpLat: {
        type: Sequelize.DOUBLE
      },
      pickUpLon: {
        type: Sequelize.DOUBLE
      },
      dropOffLat: {
        type: Sequelize.DOUBLE
      },
      dropOffLon: {
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
    await queryInterface.dropTable('taxitrips');
  }
};