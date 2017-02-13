// @flow

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// required by material-ui at entry
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// required by react-grid-layout
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { syncHistoryWithStore } from 'mobx-react-router';
import routingStore from './store/router';
const history = syncHistoryWithStore(browserHistory, routingStore);

import App from './components/App';
import Landing from './components/Landing';
import Login from './components/Login';
import CoursesPage from './components/CoursesPage';
import CoursePage from './components/CoursePage';
import Signup from './components/Signup';
import Context from './components/Context';

import navbarStore from './store/navbar';
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
  <Context>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Landing} />
        <Route path='login' component={Login} />
        <Route path='signup' component={Signup} />
        <Route path='courses' onEnter={enterCourses} component={CoursesPage} />
        <Route path='courses/:id' onEnter={enterCourse} component={CoursePage} />
      </Route>
    </Router>
  </Context>,
  document.getElementById('app')
);
