import { observable } from 'mobx';
// import user from './user';
import { BACKEND_URL } from '../config';

const courses = observable({ list: [] });

export const fetchCourses = () => {
  courses.list = [];

  return fetch(
    `${BACKEND_URL}/courses`,
    {
      method: 'GET',
      // header: { Authorization: user.token },
    }
  ).then(ret => ret.json())
  .then(json => courses.list = json);
};

export default courses;
