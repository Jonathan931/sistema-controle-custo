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
  getSuccess,
  error,
} from './actions';
import { serviceMovimentacao } from '../../../services/serviceMovimentacao';

function* list({ params }) {
  try {
    const data = yield call(serviceMovimentacao.getLista, params);
    yield put(listSuccess(data));
  } catch (e) {
    yield put(error(e.data));
  }
}

function* salvar({ movimentacao }) {
  try {
    const data = yield call(serviceMovimentacao.salvar, movimentacao);
    yield put(salvarSuccess(data));
    toast.success('Registro salvo com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

function* editar({ movimentacao }) {
  try {
    const data = yield call(serviceMovimentacao.update, movimentacao);
    yield put(editarSuccess(data));
    toast.success('Registro editado com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

function* excluir({ id }) {
  try {
    const data = yield call(serviceMovimentacao.delete, id);
    yield put(deleteSuccess(data));
    toast.success('Registro deletado com sucesso!');
    yield put(listRequest());
  } catch (e) {
    yield put(error(e.data));
  }
}

function* getId({ id }) {
  try {
    const data = yield call(serviceMovimentacao.getId, id);
    yield put(getSuccess(data));
  } catch (e) {
    yield put(error(e.data));
  }
}

export default all([
  takeLatest(ACTIONS.MOVIMENTACAO_LIST_REQUEST, list),
  takeLatest(ACTIONS.MOVIMENTACAO_SALVAR_REQUEST, salvar),
  takeLatest(ACTIONS.MOVIMENTACAO_EDITAR_REQUEST, editar),
  takeLatest(ACTIONS.MOVIMENTACAO_DELETE_REQUEST, excluir),
  takeLatest(ACTIONS.MOVIMENTACAO_GET_REQUEST, getId),
]);
