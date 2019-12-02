module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movimentacoes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      funcionario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'funcionarios',
          key: 'id',
        },
      },
      descricao: {
        type: Sequelize.STRING(500),
        allowNull: true,
        unique: true,
      },
      valor: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movimentacoes');
  },
};
