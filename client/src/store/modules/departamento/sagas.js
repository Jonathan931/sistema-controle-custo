import {
 call, put, all, takeLatest 
} from 'redux-saga/effects';
//  import { toast } from 'react-toastify';
import { toast } from 'react-toastify';
import * as ACTIONS from '../actionTypes';

import {
  listSuccess,
  salvarSuccess,
  editarSuccess,
  listRequest,
  deleteSuccess,
  error,
} from './actions';
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
    toast.success('Registro salvo com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

function* editar({ departamento }) {
  try {
    const data = yield call(serviceDepartamento.update, departamento);
    yield put(editarSuccess(data));
    toast.success('Registro editado com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

function* excluir({ id }) {
  try {
    const data = yield call(serviceDepartamento.delete, id);
    yield put(deleteSuccess(data));
    toast.success('Registro deletado com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

export default all([
  takeLatest(ACTIONS.DEPARTAMENTO_LIST_REQUEST, list),
  takeLatest(ACTIONS.DEPARTAMENTO_SALVAR_REQUEST, salvar),
  takeLatest(ACTIONS.DEPARTAMENTO_EDITAR_REQUEST, editar),
  takeLatest(ACTIONS.DEPARTAMENTO_DELETE_REQUEST, excluir),
]);
