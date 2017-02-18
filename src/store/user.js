import { observable } from 'mobx';
import { BACKEND_URL } from '../config';

const user = observable({
  careerAccount: 'Loading',
  id: null,
  token: null,
});


export const loginUser = ({ params }) =>
  fetch(
    `${BACKEND_URL}/auth`,
    {
      method: 'POST',
      body: params.body,
    })
    .then(res => res.json())
    .then(json => {
      const { name, id, token } = json;

      user.name = name;
      user.id = id;
      user.token = token;
      return json;
    });

export const signupUser = ({ params }) =>
  new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_URL}/users`,
      {
        method: 'POST',
        body: params.body,
      })
      .then(res => res.json())
      .then(json => {
        const { name, id, token } = json;

        user.name = name;
        user.id = id;
        user.token = token;
        resolve(json);
      })
      .catch(err => reject(err));
  });

export default user;
