// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// required by material-ui at entry
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// required by react-grid-layout
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);


import App from './components/App';
import Login from './components/Login';
import MockCAS from './components/MockCAS';

render(
  <MuiThemeProvider>
    <Provider {...stores}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Login} />
          <Route path="test" component={() => <h1> content </h1>} />
          <Route path="cas" component={MockCAS} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
