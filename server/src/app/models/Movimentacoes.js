import Sequelize, { Model } from 'sequelize';

class Movimentacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        funcionario_id: Sequelize.INTEGER,
        descricao: Sequelize.STRING(500),
        valor: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Funcionario, {
      as: 'funcionario',
      foreignKey: 'funcionario_id',
    });
  }
}
export default Movimentacoes;
