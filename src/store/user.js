import { observable } from 'mobx';
import { BACKEND_URL } from '~/config';
import mapOn from '~/util/mapOn';
import pass from '~/util/passthrough';

const user = observable({
  name: '',
  username: '',
  token: '',
  loggedIn: false,
});


export const loginUser = payload =>
  new Promise((resolve, reject) => {
    const cleanPayload = {};

    [
      'career_account',
      'password',
    ].forEach(mapOn(cleanPayload)(payload));

    console.log(cleanPayload);

    fetch(
      `${BACKEND_URL}/login`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(cleanPayload),
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

export const registerUser = payload =>
  new Promise((resolve, reject) => {
    const cleanPayload = {};

    [
      'first_name',
      'last_name',
      'career_account',
      'password',
    ].forEach(mapOn(cleanPayload)(payload));

    fetch(
      `${BACKEND_URL}/register`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(cleanPayload),
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
