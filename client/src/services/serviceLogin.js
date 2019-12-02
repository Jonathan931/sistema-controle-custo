import api from './api';

export const serviceLogin = {
  login: user =>
    api.post('sessions', user).then(data => {
      const { token, user: dados } = data;
      api.setAuth({ accessToken: token, user: dados });
      return data;
    }),
};
