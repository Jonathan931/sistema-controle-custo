import { combineReducers } from 'redux';

import login from './login/reducer';
import departamento from './departamento/reducer';
import funcionario from './funcionario/reducer';
import movimentacao from './movimentacao/reducer';

export default combineReducers({
  login,
  departamento,
  funcionario,
  movimentacao,
});
