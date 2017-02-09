import { observable, asMap } from 'mobx';
// import user from './user';
// import BACKEND_URL from '../config';

const courses = observable(asMap({ list: [] }));

export const fetchCourses = async () => {
  courses.list = [];

  courses.list = [
    {
      name: 'course 1',
      id: 'course1id',
    },
    {
      name: 'course 2',
      id: 'course2id',
    },
    {
      name: 'course 3',
      id: 'course3id',
    },
  ];

  // courses.listing = await fetch(
  //   `${BACKEND_URL}/course/${user.id}`,
  //   {
  //     method: 'GET',
  //     header: { Authorization: user.token },
  //   }
  // ).then(ret => ret.json());
};

export default courses;
