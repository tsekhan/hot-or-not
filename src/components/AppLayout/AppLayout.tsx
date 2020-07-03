import React, { FunctionComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import 'antd/dist/antd.css';
import './AppLayout.scss';

const { Header, Content, Footer } = Layout;

const PATH = {
  HOME: '/',
  GAME: '/game',
  SETTINGS: '/settings',
};

enum PAGE {
  HOME = 'HOME',
  GAME = 'GAME',
  SETTINGS = 'SETTINGS',
}

/**
 * App skeleton
 * @param children
 * @constructor
 */
const AppLayout: FunctionComponent = ({ children }) => {
  let menuKey: string;

  switch (document.location.pathname) {
    case PATH.HOME:
      menuKey = PAGE.HOME;
      break;
    case PATH.GAME:
      menuKey = PAGE.GAME;
      break;
    case PATH.SETTINGS:
      menuKey = PAGE.SETTINGS;
      break;
    default:
      menuKey = '';
  }

  return (
    <Layout className="AppLayout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[menuKey]}>
          <Menu.Item key={PAGE.HOME}>
            <Link to={PATH.HOME}>Home</Link>
          </Menu.Item>
          <Menu.Item key={PAGE.GAME}>
            <Link to={PATH.GAME}>Game</Link>
          </Menu.Item>
          <Menu.Item key={PAGE.SETTINGS}>
            <Link to={PATH.SETTINGS}>Settings</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="AppLayout__content">{children}</Content>
      <Footer>Created by Mickalaj Tsekhan</Footer>
    </Layout>
  );
};

export default withRouter(AppLayout);
