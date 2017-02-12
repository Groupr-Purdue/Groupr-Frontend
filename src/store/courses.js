import { observable } from 'mobx';
// import user from './user';
import { BACKEND_URL } from '../config';

const courses = observable({ list: [] });

export const fetchCourses = async () => {
  courses.list = [];

  courses.list = await fetch(
    `${BACKEND_URL}/courses`,
    {
      method: 'GET',
      // header: { Authorization: user.token },
    }
  ).then(async ret => await ret.json());
};

export default courses;
