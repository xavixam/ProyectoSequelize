'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Product1',
        price: 1
      },
      {
        name: 'Product2',
        price: 2
      },
      {
        name: 'Product3',
        price: 3
      },
      {
        name: 'Product4',
        price: 4
      },
      {
        name: 'Product5',
        price: 5
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
