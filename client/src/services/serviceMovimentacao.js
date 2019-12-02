import api from './api';

export const serviceMovimentacao = {
  getLista: params => api.get('movimentacoes', { params }),
  salvar: movimentacao => api.post('movimentacoes', { ...movimentacao }),
  delete: id => api.delete(`movimentacoes/${id}`),
  update: movimentacao => api.put('movimentacoes', { ...movimentacao }),
  getId: id => api.get(`movimentacoes/${id}`),
};
