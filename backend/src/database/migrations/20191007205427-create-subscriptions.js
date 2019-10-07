module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      meetup_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'meetups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: null,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('subscriptions');
  },
};
