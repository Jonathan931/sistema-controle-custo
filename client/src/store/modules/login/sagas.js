import {
 call, put, all, takeLatest 
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as ACTIONS from '../actionTypes';
import api from '../../../services/api';
import { loginSuccess, error } from './actions';
import { serviceLogin } from '../../../services/serviceLogin';
import history from '../../../services/history';

function* login({ user }) {
  try {
    const data = yield call(serviceLogin.login, user);
    const { token, user: dados } = data;
    yield put(loginSuccess({ isLogged: true, user: { ...dados, token } }));
    api.setAuth({ accessToken: token, user: dados });
    history.push('/dashboard');
  } catch (e) {
    toast.error('Email e/ou senha incorretas');
    yield put(error(e.data));
  }
}

export default all([takeLatest(ACTIONS.LOGAR_REQUEST, login)]);
