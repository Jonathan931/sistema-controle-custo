import api from './api';

export const serviceFuncionario = {
  getLista: () => api.get('funcionarios'),
  salvar: funcionario => api.post('funcionarios', { ...funcionario }),
  delete: id => api.delete(`funcionarios/${id}`),
  update: funcionario => api.put('funcionarios', { ...funcionario }),
};
