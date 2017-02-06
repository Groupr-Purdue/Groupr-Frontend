// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, browserHistory } from 'react-router';

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

render(
  <MuiThemeProvider>
    <Provider {...stores}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="test" component={() => <h1> content </h1>} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
