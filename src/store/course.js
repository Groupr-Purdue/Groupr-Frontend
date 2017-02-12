import { observable } from 'mobx';
import { BACKEND_URL } from '../config';
import navbar from './navbar';

const course = observable({
  name: 'Loading',
  title: 'Loading',
  users: [],
  id: null,
});


export const fetchCourse = ({ params }) => {
  course.name = 'Loading';
  course.title = 'Loading';
  course.users = [];
  course.id = params.id;

  fetch(
    `${BACKEND_URL}/users`,
    {
      method: 'GET',
      // header: { Authorization: user.token },
    }
  ).then(async ret => course.users = await ret.json());

  fetch(
    `${BACKEND_URL}/courses/${params.id}`,
    {
      method: 'GET',
    }
  ).then(async ret => {
    const { name, title, id } = await ret.json();

    navbar.subtitle = name;
    course.name = name;
    course.title = title;
    course.id = id;
  });
};

export default course;
