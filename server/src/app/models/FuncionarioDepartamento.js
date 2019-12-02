import Sequelize, { Model } from 'sequelize';

class FuncionarioDepartamento extends Model {
  static init(sequelize) {
    super.init(
      {
        funcionario_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        departamento_id: {
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
