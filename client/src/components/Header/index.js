import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Icon } from 'antd';

import { Container } from './styles';
import * as ACOES from '../../store/modules/login/actions';

export default function Header() {
  const [menu, setMenu] = useState(false);
  const isLogado = useSelector(state => state.login.data.isLogged);
  const dispatch = useDispatch();

  const closeAllMenusOnEsc = e => {
    e = e || window.event;
    if (e.key === 'Escape' || e.keyCode === 27) {
      setMenu(false);
    }
  };

  function handleSignOut() {
    closeMenu();
    dispatch(ACOES.logout());
  }

  function closeMenu() {
    setMenu(false);
  }

  function handleStateChange(state) {
    setMenu(state.isOpen);
  }
  return (
    <Container>
      {isLogado && (
        <Menu
          burgerButtonClassName="hn-menu-button"
          burgerBarClassName="hn-menu-button-bar"
          customOnKeyDown={closeAllMenusOnEsc}
          pageWrapId="page-wrap"
          isOpen={menu}
          onStateChange={handleStateChange}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3>GERFIN</h3>
          </div>

          <Link className="menu-item" to="/dashboard" onClick={closeMenu}>
            <Icon type="dashboard" />
            {'   '}
            Dashboard
          </Link>
          <Link className="menu-item" to="/departamento" onClick={closeMenu}>
            <Icon type="container" />
            {'   '}
            Cadastro de Departamento
          </Link>
          <Link className="menu-item" to="/funcionario" onClick={closeMenu}>
            <Icon type="usergroup-add" />
            {'   '}
            Cadastro de Funcionarios
          </Link>
          <Link className="menu-item" to="/movimentacao" onClick={closeMenu}>
            <Icon type="fall" />
            {'   '}
            Cadastro de Despesas
          </Link>

          <Link className="menu-item" to="/login" onClick={handleSignOut}>
            <Icon type="logout" />
            {'   '}
            Sair
          </Link>
        </Menu>
      )}
    </Container>
  );
}
