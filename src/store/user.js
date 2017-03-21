import { observable } from 'mobx';
import { BACKEND_URL } from '../config';
import mapOn from 'util/mapOn';
import pass from 'util/passthrough';

const user = observable({
  name: '',
  username: '',
  token: '',
  loggedIn: false,
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
      .then(pass(json =>
        [
          'career_account',
          'id',
          'token',
          'username',
          'careerId',
        ].forEach(mapOn(user)(json))))
      .then(resolve)
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
      .then(pass(json =>
        [
          'careerId',
          'id',
          'token',
          'name',
        ].forEach(mapOn(user)(json))))
      .then(resolve)
      .catch(err => reject(err));
  });

export default user;
