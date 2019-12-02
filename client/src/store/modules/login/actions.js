import * as ACTIONS from '../actionTypes';

export function loginRequest(user) {
  return {
    type: ACTIONS.LOGAR_REQUEST,
    user,
  };
}

export function loginSuccess(data) {
  return {
    type: ACTIONS.LOGAR_SUCCESS,
    data,
  };
}

export function error(error) {
  return {
    type: ACTIONS.ERROR,
    error,
  };
}
