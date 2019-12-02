import { all } from 'redux-saga/effects';
import login from './login/sagas';
import departamento from './departamento/sagas';
import funcionario from './funcionario/sagas';
import movimentacao from './movimentacao/sagas';

export default function* rootSaga() {
  yield all([login, departamento, funcionario, movimentacao]);
}
