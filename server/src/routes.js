import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import DepartamentoController from './app/controllers/DepartamentoController';
import FuncionarioController from './app/controllers/FuncionarioController';
import MovimentacoesController from './app/controllers/MovimentacoesController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/departamentos', DepartamentoController.index);
routes.post('/departamentos', DepartamentoController.store);
routes.put('/departamentos', DepartamentoController.update);
routes.delete('/departamentos/:id', DepartamentoController.delete);

routes.get('/funcionarios', FuncionarioController.index);
routes.post('/funcionarios', FuncionarioController.store);

routes.post('/movimentacoes', MovimentacoesController.store);

export default routes;
