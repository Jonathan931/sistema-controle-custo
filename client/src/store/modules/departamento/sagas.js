import { call, put, all, takeLatest } from 'redux-saga/effects';
//  import { toast } from 'react-toastify';
import * as ACTIONS from '../actionTypes';

import { listSuccess, salvarSuccess, listRequest, error } from './actions';
import { serviceDepartamento } from '../../../services/serviceDepartamento';

function* list() {
  try {
    const data = yield call(serviceDepartamento.getLista);
    yield put(listSuccess(data));
  } catch (e) {
    yield put(error(e.data));
  }
}

function* salvar({ departamento }) {
  try {
    const data = yield call(serviceDepartamento.salvar, departamento);
    yield put(salvarSuccess(data));
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

export default all([
  takeLatest(ACTIONS.DEPARTAMENTO_LIST_REQUEST, list),
  takeLatest(ACTIONS.DEPARTAMENTO_SALVAR_REQUEST, salvar),
]);
