import axios from 'axios';
import { path } from 'ramda';
import { httpErrorHandler } from './errorHandle';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.setAuth = async ({ accessToken, user }) => {
  // attach authorization data to sebsequent requests
  await localStorage.setItem('token', accessToken);
  await localStorage.setItem('user', JSON.stringify(user));
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

// interceptors
api.interceptors.request.use(
  // update config before request
  config => config,
  // handle request error
  error => handleError(error),
);

api.interceptors.response.use(
  // do something with response
  response => mapResponseToUsefulData(response),
  // handle response error
  error => handleError(error),
);

api.unsetAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  api.defaults.headers.common.Authorization = undefined;
};

api.logout = ({ redirectTimeout } = {}) => {
  api.unsetAuth();
  // redirectToLogin({ timeout: redirectTimeout });
};

// utility

const handleError = error => {
  // log
  console.error(error);
  // handle http erros
  httpErrorHandler(error);
  // extract in useful error format
  const usefulError = mapToUsefulError(error);
  // important:
  // message isn't string. It's object, with: { message: '...', error: {} }
  // publish error event
  // publish('error', usefulError);
  // return as promise rejected
  return Promise.reject(usefulError);
};

const mapResponseToUsefulData = response => {
  // const { data } = (response.data || {});
  const { data } = response;
  return data;
};

const mapToUsefulError = error => {
  // try get from body
  const messageFromBody = path(['response', 'data', 'message'], error);
  // const messageFromBody = path(['response', 'data'], error);
  if (messageFromBody) return { message: messageFromBody, error };
  // try get exception
  const messageFromError = error && error.message;
  if (messageFromError) return { message: messageFromError, error };
  // otherwise, return error
  return { message: error, error };
};

export default api;
