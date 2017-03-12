// @flow

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { syncHistoryWithStore } from 'mobx-react-router';
import routingStore from './store/router';
const history = syncHistoryWithStore(hashHistory, routingStore);

import App from '~/components/App';
import Landing from '~/components/Landing';
import Login from './components/Login';
import CoursesPage from '~/components/CoursesPage';
import CoursePage from '~/components/CoursePage';
import Signup from '~/components/Signup';
import Context from '~/components/Context';
import CreateCourseForm from '~/components/CreateCourseForm';
import MyCoursesPage from '~/components/MyCoursesPage';
import navbarStore from '~/store/navbar';
import courses from '~/store/courses';
import course from '~/store/course';
import myCourses from '~/store/myCourses';

const enterCourses = ({ nextProps }: { nextProps: Object }): Void => {
  navbarStore.subtitle = 'Course Listing';
  navbarStore.loading.state = 'loading';

  courses.fetch(nextProps);
};

const enterCourse = (nextProps: Object): Void => {
  navbarStore.subtitle = 'Loading';
  navbarStore.loading.state = 'loading';

  course.id = nextProps.params.id;
  course.fetch(nextProps);
};

const enterCourseForm = (): Void => {
  navbarStore.subtitle = 'Create a Course';
  navbarStore.loading.state = 'loaded';
};

const enterMyCourses = (): Void => {
  navbarStore.subtitle = 'Loading your courses';
  navbarStore.loading.state = 'loading';

  myCourses.fetch();
};

const stopLoading =
  ({ loading }: { loading: Loading }): Function =>
    (): boolean => loading.state = 'loaded';

render(
  <Context>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Landing} />
        <Route path='login' component={Login} />
        <Route path='signup' component={Signup} />
        <Route path='courses'>
          <IndexRoute
            onLeave={stopLoading(navbarStore)}
            onEnter={enterCourses}
            component={CoursesPage} />
          <Route path='me'
            component={MyCoursesPage}
            onEnter={enterMyCourses} />
          <Route path=':id'
            onEnter={enterCourse}
            onLeave={stopLoading(navbarStore)}
            component={CoursePage} />
        </Route>
        <Route path='create-course'
          onEnter={enterCourseForm}
          component={CreateCourseForm} />
      </Route>
    </Router>
  </Context>,
  document.getElementById('app')
);
