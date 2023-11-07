'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John',
        surname: 'Doe',
        type: 'mentor', 
        position: 'Software Engineer',
        password: 'hashedPassword', 
        field: 'Developer', 
        shortDescription: 'Experienced mentor',
        email: 'john.doe@example.com',
        education: 'Computer Science',
        experience: '10+ years',
        about: 'Passionate about mentoring others.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data from the "users" table
    return queryInterface.bulkDelete('users', null, {});
  },
};
