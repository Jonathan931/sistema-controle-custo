import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { Icon } from 'antd';

// import { MdShoppingBasket } from 'react-icons/md';
import { Container } from './styles';
import logo from '../../assets/images/logo.svg';

export default function Header() {
  const [menu, setMenu] = useState(false);
  const isLogado = useSelector(state => state.login.data.isLogged);

  const closeAllMenusOnEsc = e => {
    e = e || window.event;
    if (e.key === 'Escape' || e.keyCode === 27) {
      setMenu(false);
    }
  };

  function handleSignOut() {
    closeMenu();
    // this.props.signOut();
  }

  function closeMenu() {
    setMenu(false);
  }

  // function isMenuOpen(state) {
  //   return state.isOpen;
  // }

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
            <img src={logo} alt="logo" style={{ width: 50, height: 50 }} />
            <h3>GERFIN</h3>
          </div>

          <Link className="menu-item" to="/dashboard" onClick={closeMenu}>
            <Icon type="dashboard" />
            {'   '}
            Dashboard
          </Link>
          <Link className="menu-item" to="/" onClick={closeMenu}>
            <Icon type="rise" />
            {'   '}
            Receitas
          </Link>
          <Link className="menu-item" to="/departamento" onClick={closeMenu}>
            <Icon type="rise" />
            {'   '}
            Departamento
          </Link>
          <Link className="menu-item" to="/despesas" onClick={closeMenu}>
            <Icon type="fall" />
            {'   '}
            Despesas
          </Link>
          <Link className="menu-item" to="/" onClick={handleSignOut}>
            <Icon type="logout" />
            {'   '}
            Sair
          </Link>
        </Menu>
      )}
    </Container>
  );
}
