// @flow

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { syncHistoryWithStore } from 'mobx-react-router';
import routingStore from './store/router';
const history = syncHistoryWithStore(hashHistory, routingStore);

import pipe from '~/util/passthrough';

// components
import App from '~/components/App';
import Landing from '~/components/Landing';
import Login from './components/Login';
import CoursesPage from '~/components/CoursesPage';
import CoursePage from '~/components/CoursePage';
import Signup from '~/components/Signup';
import Context from '~/components/Context';
import CreateCourseForm from '~/components/CreateCourseForm';
import CreateGroupForm from '~/components/CreateGroupForm';
import MyCoursesPage from '~/components/MyCoursesPage';
import AppSnackbar from '~/components/AppSnackbar';
import UserPage from '~/components/UserPage';
import UpdateUserForm from '~/components/UpdateUserForm';

// stores
import navbarStore from '~/store/navbar';
import courses from '~/store/courses';
import course from '~/store/course';
import myCourses from '~/store/myCourses';
import groupForm from '~/store/groupForm';
import menubar from '~/store/menubar';
import { loading as userPageLoading, fetchUser } from '~/store/userPage';

const handleRouteChange = (pState: Object, nState: Object) => {
  menubar.value = nState.location.pathname;
};

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

const enterUpdateUserForm = (): Void => {
  navbarStore.subtitle = 'User Info Update';
  navbarStore.loading.state = 'loaded';
};

const enterGroupForm = (nextProps: Object): Void => {
  navbarStore.subtitle = 'Create a Group';
  navbarStore.loading.state = 'loaded';
  groupForm.courseId = nextProps.id;
};

const enterMyCourses = (): Void => {
  navbarStore.subtitle = 'Loading your courses';
  navbarStore.loading.state = 'loading';

  myCourses.fetch();
};

const enterUserPage = (nextProps: Object): Void => {
  userPageLoading.state = 'loading';

  fetchUser(nextProps.params.id)
  .then(pipe((): string => userPageLoading.state = 'loaded'))
  .catch(pipe((): string => userPageLoading.state = 'failed'));
};

const stopLoading =
  ({ loading }: { loading: Loading }): Function =>
    (): boolean => loading.state = 'loaded';

render(
  <Context>
    <div>
      <Router history={history}>
        <Route path='/' component={App} onChange={handleRouteChange}>
          <IndexRoute component={Landing} />
          <Route path='login' component={Login} />
          <Route path='signup' component={Signup} />
          <Route
            path='users/:id'
            component={UserPage}
            onEnter={enterUserPage} />
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
          <Route path='update-user'
            onEnter={enterUpdateUserForm}
            component={UpdateUserForm} />
          <Route path='create-group/:id'
            onEnter={enterGroupForm}
            component={CreateGroupForm} />
        </Route>
      </Router>
      <AppSnackbar />
    </div>
  </Context>,
  document.getElementById('app')
);
