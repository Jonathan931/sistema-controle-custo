import * as ACTIONS from '../actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function functionario(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FUNCIONARIO_SALVAR_REQUEST:
    case ACTIONS.FUNCIONARIO_EDITAR_REQUEST:
    case ACTIONS.FUNCIONARIO_DELETE_REQUEST:
    case ACTIONS.FUNCIONARIO_LIST_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.FUNCIONARIO_SALVAR_SUCCESS:
    case ACTIONS.FUNCIONARIO_EDITAR_SUCCESS:
    case ACTIONS.FUNCIONARIO_DELETE_SUCCESS:
      return { ...state, loading: false };
    case ACTIONS.FUNCIONARIO_LIST_SUCCESS:
      return { ...state, loading: false, data: action.data };
    case ACTIONS.FUNCIONARIO_ERROR:
      return { ...initialState, error: action.error };
    default:
      return state;
  }
}
