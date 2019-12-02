import { combineReducers } from 'redux';

import login from './login/reducer';
import departamento from './departamento/reducer';

export default combineReducers({
  login,
  departamento,
});
