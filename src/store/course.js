import { observable } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import 'whatwg-fetch';

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
  navbar.loading = true;

  return Promise.all([
    fetch(
      `${BACKEND_URL}/users`,
      {
        method: 'GET',
        // header: { Authorization: user.token },
      }
    ).then(ret => ret.json())
    .then(json => course.users = json),

    fetch(
      `${BACKEND_URL}/courses/${params.id}`,
      {
        method: 'GET',
      }
    ).then(ret => ret.json())
    .then(json => {
      const { name, title, id } = json;

      navbar.subtitle = name;
      course.name = name;
      course.title = title;
      course.id = id;

      return json;
    }),
  ]).then(() => navbar.loading = false);
};

export default course;
