import React from 'react';
import { Provider } from 'mobx-react';

// required by react-grid-layout
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import navbarStore from '../store/navbar';
import routingStore from '../store/router';

const stores = {
  routing: routingStore,
  navbar: navbarStore,
};

export default (props: { children : Object }) =>
  <MuiThemeProvider>
    <Provider {...stores}>
      { props.children }
    </Provider>
  </MuiThemeProvider>
;
