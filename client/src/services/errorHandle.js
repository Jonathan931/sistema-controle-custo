import api from './api';

const httpErrorHandlers = {
  401: error => {
    api.logout({ redirectTimeout: 3000 });
  },
};

export const httpErrorHandler = error => {
  if (error.response) {
    const { status } = error.response;
    const handler = httpErrorHandlers[`${status}`];

    handler && handler(error);
  }
};
