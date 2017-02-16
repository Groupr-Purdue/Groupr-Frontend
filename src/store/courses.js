import { observable } from 'mobx';
// import user from './user';
import { BACKEND_URL } from '../config';
import navbar from './navbar';

const courses = observable({ list: [] });

export const fetchCourses = () => {
  courses.list = [];
  navbar.loading = true;

  return fetch(
    `${BACKEND_URL}/courses`,
    {
      method: 'GET',
      // header: { Authorization: user.token },
    }
  ).then(ret => ret.json())
  .then(json => {
    navbar.loading = false;
    return courses.list = json;
  });
};

export default courses;
