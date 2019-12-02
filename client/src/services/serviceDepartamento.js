import api from './api';

export const serviceDepartamento = {
  getLista: () => api.get('departamentos'),
  salvar: departamento => api.post('departamentos', { ...departamento }),
  delete: id => api.delete(`departamentos/${id}`),
  update: departamento => api.put('departamentos', { ...departamento }),
};
