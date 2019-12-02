import { all } from 'redux-saga/effects';
import login from './login/sagas';
import departamento from './departamento/sagas';

export default function* rootSaga() {
  yield all([login, departamento]);
}
