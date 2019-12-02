import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import store from './store';
import history from './services/history';

function App() {
  const { Header: Menu, Content } = Layout;
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout style={{ minHeight: '100vh' }}>
          <Menu style={{ padding: 0 }}>
            <Header />
          </Menu>
          <Content style={{ padding: '0 50px' }}>
            <br />
            <Routes />
            <GlobalStyle />
          </Content>
        </Layout>
      </Router>
      <ToastContainer autoClose={3000} />
    </Provider>
  );
}

export default App;
