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

import navbarStore from './store/navbar';

const stores = {
  routing: routingStore,
  navbar: navbarStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

import App from './components/App';
import Landing from './components/Landing';
import MockCAS from './components/MockCAS';
import CoursesPage from './components/CoursesPage';
import CoursePage from './components/CoursePage';

import { fetchCourses } from './store/courses';
import { fetchCourse } from './store/course';

const enterCourses = ({ nextProps }) => {
  navbarStore.subtitle = 'Course Listing';
  fetchCourses(nextProps);
};


const enterCourse = nextProps => {
  navbarStore.subtitle = 'Loading';
  fetchCourse(nextProps);
};

render(
  <MuiThemeProvider>
    <Provider {...stores}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Login} />
          <IndexRoute component={Landing} />
          <Route path="courses" onEnter={enterCourses} component={CoursesPage} />
          <Route path="courses/:id" onEnter={enterCourse} component={CoursePage} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
