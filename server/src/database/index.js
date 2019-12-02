import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User';
import Departamento from '../app/models/Departamento';
import Funcionario from '../app/models/Funcionario';
import FuncionarioDepartamento from '../app/models/FuncionarioDepartamento';
import Movimentacoes from '../app/models/Movimentacoes';

const models = [
  User,
  Departamento,
  Funcionario,
  FuncionarioDepartamento,
  Movimentacoes,
];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
