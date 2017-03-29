import { observable } from 'mobx';
import { BACKEND_URL } from '~/config';
import user from '~/store/user';
import screen from '~/util/screenResponse';
import pipe from '~/util/passthrough';
import mapOn from '~/util/mapOn';
import Loading from '~/store/loading';

const userPage = observable({
  career_account: '',
  firt_name: '',
  last_name: '',
  id: '',
});

export const loading = new Loading();

export const fetchUser = id =>
  fetch(
    `${BACKEND_URL}/users/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
    }
  )
  .then(screen)
  .then(ret => ret.json())
  .then(pipe(console.log))
  .then(json =>
    [
      'career_account',
      'first_name',
      'last_name',
      'id',
      'email',
    ].forEach(mapOn(userPage)(json))
  );


export default userPage;
