import * as ACTIONS from '../actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function departamento(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.DEPARTAMENTO_SALVAR_REQUEST:
    case ACTIONS.DEPARTAMENTO_EDITAR_REQUEST:
    case ACTIONS.DEPARTAMENTO_DELETE_REQUEST:
    case ACTIONS.DEPARTAMENTO_LIST_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.DEPARTAMENTO_SALVAR_SUCCESS:
    case ACTIONS.DEPARTAMENTO_EDITAR_SUCCESS:
    case ACTIONS.DEPARTAMENTO_DELETE_SUCCESS:
      return { ...state, loading: false };
    case ACTIONS.DEPARTAMENTO_LIST_SUCCESS:
      return { ...state, loading: false, data: action.data };
    case ACTIONS.DEPARTAMENTO_ERROR:
      return { ...initialState, error: action.error };
    default:
      return state;
  }
}
