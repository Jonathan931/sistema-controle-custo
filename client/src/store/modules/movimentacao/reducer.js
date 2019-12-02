import * as ACTIONS from '../actionTypes';

const initialState = {
  loading: false,
  data: [],
  entidade: null,
  error: null,
};

export default function movimentacao(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.MOVIMENTACAO_GET_REQUEST:
    case ACTIONS.MOVIMENTACAO_SALVAR_REQUEST:
    case ACTIONS.MOVIMENTACAO_EDITAR_REQUEST:
    case ACTIONS.MOVIMENTACAO_DELETE_REQUEST:
    case ACTIONS.MOVIMENTACAO_LIST_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.MOVIMENTACAO_SALVAR_SUCCESS:
    case ACTIONS.MOVIMENTACAO_EDITAR_SUCCESS:
    case ACTIONS.MOVIMENTACAO_GET_SUCCESS:
      return { ...state, loading: false, entidade: action.data };
    case ACTIONS.MOVIMENTACAO_DELETE_SUCCESS:
      return { ...state, loading: false };
    case ACTIONS.MOVIMENTACAO_LIST_SUCCESS:
      return { ...state, loading: false, data: action.data };
    case ACTIONS.MOVIMENTACAO_ERROR:
      return { ...initialState, error: action.error };

    default:
      return state;
  }
}
