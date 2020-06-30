import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import GamePage from 'components/GamePage';
import ResultPage from 'components/ResultPage';
import SettingsPage from 'components/SettingsPage';
import { store } from 'utils/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={GamePage} />
          <Route exact={true} path="/result" component={ResultPage} />
          <Route exact={true} path="/settings" component={SettingsPage} />
          <Route>
            <Redirect to="/" />
          </Route>
          <GamePage />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
