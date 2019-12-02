import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from './pages/Dashboard';
import Departamento from './pages/Departamento';
import Funcionario from './pages/Funcionario';
import Movimentacao from './pages/Movimentacao';
import { MovimentacaoForm } from './pages/Movimentacao/Form';
import { WrappedNormalLoginForm } from './pages/Login';

export default function Routes() {
  const isLogado = useSelector(state => state.login.data.isLogged);

  return (
    <Switch>
      <Route path="/login" component={WrappedNormalLoginForm} />
      {isLogado && <Route path="/dashboard" component={Dashboard} />}
      {isLogado && <Route path="/departamento" component={Departamento} />}
      {isLogado && <Route path="/funcionario" component={Funcionario} />}
      {isLogado && (
        <Route path="/movimentacao" component={Movimentacao} exact />
      )}
      {isLogado && (
        <Route path="/movimentacao/form" exact component={MovimentacaoForm} />
      )}
      {isLogado && (
        <Route
          path="/movimentacao/form/:id"
          exact
          component={MovimentacaoForm}
        />
      )}
      <Redirect to="/login/" />
    </Switch>
  );
}
