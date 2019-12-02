import * as ACTIONS from '../actionTypes';

const initialState = {
  loading: false,
  data: { isLogged: false, user: null },
  error: null,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOGAR_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.LOGAR_SUCCESS:
      return { ...state, loading: false, data: action.data };
    case ACTIONS.ERROR:
      return { ...initialState, error: action.error };
    default:
      return state;
  }
}
