module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcionario_departamentos', {
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      funcionario_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'funcionarios',
          key: 'id',
        },
      },
      departamento_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'departamentos',
          key: 'id',
        },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('funcionario_departamentos');
  },
};
