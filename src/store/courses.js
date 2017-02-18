// @flow

import { observable } from 'mobx';
// import user from './user';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
// import 'whatwg-fetch';

const courses = observable({ list: [] });

export const fetchCourses = (): Promise => {
  courses.list = [];
  navbar.loading = true;

  return fetch(
    `${BACKEND_URL}/courses`,
    {
      method: 'GET',
      // header: { Authorization: user.token },
    }
  ).then((ret: Object): Promise => ret.json())
  .then((json: Object): Array<Object> => {
    navbar.loading = false;
    return courses.list = json;
  });
};

export default courses;
