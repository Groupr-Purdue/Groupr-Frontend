import { observable } from 'mobx';
import { BACKEND_URL } from '../config';

const user = observable({
  name: '',
  username: '',
  token: '',
  loggedIn: false
});


export const loginUser = ({ params }) =>
  new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_URL}/login`,
      {
        method: 'POST',
        body: params.body,
      })
      .then(res => res.json())
      .then(json => {
        const { career_account, id, token, username, careerId } = json;

        user.careerId = careerId;
        user.name = name;
        user.id = id;
        user.token = token;
        resolve(json);
      })
      .catch(err => reject(err));
  });

export const registerUser = ({ params }) =>
  new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_URL}/register`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(params.body),
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        const { name, id, token, careerId, token } = json;
        user.token = token;
        user.careerId = careerId;
        user.name = name;
        user.id = id;
        resolve(json);
      })
      .catch(err => reject(err));
  });

export default user;
