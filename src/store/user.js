import { observable } from 'mobx';
import { BACKEND_URL } from '~/config';
import mapOn from '~/util/mapOn';
import pass from '~/util/passthrough';

const user = observable({
  email: '',
  career_account: '',
  first_name: '',
  last_name: '',
  id: null,
  name: '',
  username: '',
  token: '',
  loggedIn: false,
});

export const logout =
  () => {
    user.email = '';
    user.career_account = '';
    user.first_name = '';
    user.last_name = '';
    user.id = null;
    user.name = '';
    user.username = '';
    user.token = '';
    user.loggedIn = false;
  };

export const loginUser = payload =>
  new Promise((resolve, reject) => {
    const cleanPayload = {};

    [
      'career_account',
      'password',
    ].forEach(mapOn(cleanPayload)(payload));

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
          'career_account',
          'last_name',
          'first_name',
          'email',
        ].forEach(mapOn(user)(json))))
      .then(pass(() => user.loggedIn = true))
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

    cleanPayload.first_name = cleanPayload.last_name;

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
