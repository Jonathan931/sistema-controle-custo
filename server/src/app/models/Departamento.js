import Sequelize, { Model } from 'sequelize';

class Departamento extends Model {
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
}
export default Departamento;
