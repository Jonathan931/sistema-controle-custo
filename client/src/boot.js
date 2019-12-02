import store from './store/index';

import * as ACOES from './store/modules/login/actions';
import api from './services/api';

export const boot = () => {
  const userString = localStorage.getItem('user');

  const token = localStorage.getItem('token');

  if (userString && token) {
    const user = JSON.parse(userString);
    api.setAuth({ accessToken: token, user });
    store.dispatch(
      ACOES.loginSuccess({ isLogged: true, user: { ...user, token } }),
    );
  }
};
