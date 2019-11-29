import Sequelize, { Model } from 'sequelize';

class FuncionarioDepartamento extends Model {
  static init(sequelize) {
    super.init(
      {
        funcionarioId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        departamentoId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default FuncionarioDepartamento;
