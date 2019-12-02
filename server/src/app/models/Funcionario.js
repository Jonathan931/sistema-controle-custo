import Sequelize, { Model } from 'sequelize';

class Funcionario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Departamento, {
      through: 'FuncionarioDepartamento',
      as: 'departamentos',
      foreignKey: 'funcionario_id',
      otherKey: 'departamento_id',
    });
  }
}
export default Funcionario;
