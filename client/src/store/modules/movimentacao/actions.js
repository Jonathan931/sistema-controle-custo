import * as ACTIONS from '../actionTypes';

export function listRequest(params) {
  return {
    type: ACTIONS.MOVIMENTACAO_LIST_REQUEST,
    params,
  };
}

export function listSuccess(data) {
  return {
    type: ACTIONS.MOVIMENTACAO_LIST_SUCCESS,
    data,
  };
}

export function salvarRequest(movimentacao) {
  return {
    type: ACTIONS.MOVIMENTACAO_SALVAR_REQUEST,
    movimentacao,
  };
}

export function salvarSuccess(data) {
  return {
    type: ACTIONS.MOVIMENTACAO_SALVAR_SUCCESS,
    data,
  };
}

export function editarRequest(movimentacao) {
  return {
    type: ACTIONS.MOVIMENTACAO_EDITAR_REQUEST,
    movimentacao,
  };
}

export function editarSuccess(data) {
  return {
    type: ACTIONS.MOVIMENTACAO_EDITAR_SUCCESS,
    data,
  };
}

export function deleteRequest(id) {
  return {
    type: ACTIONS.MOVIMENTACAO_DELETE_REQUEST,
    id,
  };
}

export function deleteSuccess() {
  return {
    type: ACTIONS.MOVIMENTACAO_DELETE_SUCCESS,
  };
}

export function getRequest(id) {
  return {
    type: ACTIONS.MOVIMENTACAO_GET_REQUEST,
    id,
  };
}

export function getSuccess(data) {
  return {
    type: ACTIONS.MOVIMENTACAO_GET_SUCCESS,
    data,
  };
}

export function error(message) {
  return {
    type: ACTIONS.MOVIMENTACAO_ERROR,
    error: message,
  };
}
