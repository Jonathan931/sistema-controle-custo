import Sequelize, { Model } from 'sequelize';

class FuncionarioDepartamento extends Model {
  static init(sequelize) {
    super.init(
      {
        funcionarioId: Sequelize.INTEGER,
        departamentoId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default FuncionarioDepartamento;
