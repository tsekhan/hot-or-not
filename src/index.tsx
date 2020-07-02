import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'utils/store';
import GamePage from 'components/GamePage';
import SettingsPage from 'components/SettingsPage';
import AppLayout from './components/AppLayout/AppLayout';
import MainPage from './components/MainPage';
import { Alert } from 'antd';

const { ErrorBoundary } = Alert;

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout>
          <Switch>
            <Route exact={true} path="/" component={MainPage} />
            <Route exact={true} path="/game" component={GamePage} />
            <Route exact={true} path="/settings" component={SettingsPage} />
            <Route>
              <Redirect to="/" />
            </Route>
            <GamePage />
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
