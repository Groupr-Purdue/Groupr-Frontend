// @flow

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { syncHistoryWithStore } from 'mobx-react-router';
import routingStore from './store/router';
const history = syncHistoryWithStore(hashHistory, routingStore);

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

const enterCourses = ({ nextProps }: { nextProps: Object }): Void => {
  navbarStore.subtitle = 'Course Listing';
  fetchCourses(nextProps);
};

const enterCourse = (nextProps: Object): Void => {
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
