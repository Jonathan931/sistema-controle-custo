import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from './pages/Dashboard';
import Departamento from './pages/Departamento';
import { WrappedNormalLoginForm } from './pages/Login';

export default function Routes() {
  const isLogado = useSelector(state => state.login.data.isLogged);

  return (
    <Switch>
      <Route path="/login" component={WrappedNormalLoginForm} />
      {isLogado && <Route path="/dashboard" component={Dashboard} />}
      {isLogado && <Route path="/departamento" component={Departamento} />}

      <Redirect to="/login/" />
    </Switch>
  );
}
