import {
 call, put, all, takeLatest 
} from 'redux-saga/effects';
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
import { serviceFuncionario } from '../../../services/serviceFuncionario';

function* list() {
  try {
    const data = yield call(serviceFuncionario.getLista);
    yield put(listSuccess(data));
  } catch (e) {
    yield put(error(e.data));
  }
}

function* salvar({ funcionario }) {
  try {
    const data = yield call(serviceFuncionario.salvar, funcionario);
    yield put(salvarSuccess(data));
    toast.success('Registro salvo com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

function* editar({ funcionario }) {
  try {
    const data = yield call(serviceFuncionario.update, funcionario);
    yield put(editarSuccess(data));
    toast.success('Registro editado com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

function* excluir({ id }) {
  try {
    const data = yield call(serviceFuncionario.delete, id);
    yield put(deleteSuccess(data));
    toast.success('Registro deletado com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

export default all([
  takeLatest(ACTIONS.FUNCIONARIO_LIST_REQUEST, list),
  takeLatest(ACTIONS.FUNCIONARIO_SALVAR_REQUEST, salvar),
  takeLatest(ACTIONS.FUNCIONARIO_EDITAR_REQUEST, editar),
  takeLatest(ACTIONS.FUNCIONARIO_DELETE_REQUEST, excluir),
]);
