module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcionario_departamentos', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      funcionarioId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'funcionarios',
          key: 'id',
        },
      },
      departamentoId: {
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
