import * as ACTIONS from '../actionTypes';

export function listRequest() {
  return {
    type: ACTIONS.FUNCIONARIO_LIST_REQUEST,
  };
}

export function listSuccess(data) {
  return {
    type: ACTIONS.FUNCIONARIO_LIST_SUCCESS,
    data,
  };
}

export function salvarRequest(funcionario) {
  return {
    type: ACTIONS.FUNCIONARIO_SALVAR_REQUEST,
    funcionario,
  };
}

export function salvarSuccess(data) {
  return {
    type: ACTIONS.FUNCIONARIO_SALVAR_SUCCESS,
    data,
  };
}

export function editarRequest(funcionario) {
  return {
    type: ACTIONS.FUNCIONARIO_EDITAR_REQUEST,
    funcionario,
  };
}

export function editarSuccess(data) {
  return {
    type: ACTIONS.FUNCIONARIO_EDITAR_SUCCESS,
    data,
  };
}

export function deleteRequest(id) {
  return {
    type: ACTIONS.FUNCIONARIO_DELETE_REQUEST,
    id,
  };
}

export function deleteSuccess() {
  return {
    type: ACTIONS.FUNCIONARIO_DELETE_SUCCESS,
  };
}

export function error(message) {
  return {
    type: ACTIONS.FUNCIONARIO_ERROR,
    error: message,
  };
}
