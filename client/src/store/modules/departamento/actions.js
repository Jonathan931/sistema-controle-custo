import * as ACTIONS from '../actionTypes';

export function listRequest(page) {
  return {
    type: ACTIONS.DEPARTAMENTO_LIST_REQUEST,
    page,
  };
}

export function listSuccess(data) {
  return {
    type: ACTIONS.DEPARTAMENTO_LIST_SUCCESS,
    data,
  };
}

export function salvarRequest(departamento) {
  return {
    type: ACTIONS.DEPARTAMENTO_SALVAR_REQUEST,
    departamento,
  };
}

export function salvarSuccess(data) {
  return {
    type: ACTIONS.DEPARTAMENTO_SALVAR_SUCCESS,
    data,
  };
}

export function editarRequest(departamento) {
  return {
    type: ACTIONS.DEPARTAMENTO_EDITAR_REQUEST,
    departamento,
  };
}

export function editarSuccess(data) {
  return {
    type: ACTIONS.DEPARTAMENTO_EDITAR_SUCCESS,
    data,
  };
}

export function deleteRequest(id) {
  return {
    type: ACTIONS.DEPARTAMENTO_DELETE_REQUEST,
    id,
  };
}

export function deleteSuccess() {
  return {
    type: ACTIONS.DEPARTAMENTO_DELETE_SUCCESS,
  };
}

export function error(message) {
  return {
    type: ACTIONS.DEPARTAMENTO_ERROR,
    error: message,
  };
}
