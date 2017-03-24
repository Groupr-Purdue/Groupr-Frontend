import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';
import user from '~/store/user';
import mapOn from '~/util/mapOn';
import pipe from '~/util/passthrough';

class Course {
  @observable name = 'Loading';
  @observable title = 'Loading';
  @observable users = [];
  @observable groups;
  @observable id;
  loading: Loading;
  navbar;

  constructor(navbarStore) {
    this.navbar = navbarStore;
    this.loading = new Loading({
      waitingFor: 'A course',
      state: 'loading',
    });
  }

  @action.bound
  joinGroup(groupId) {
    return fetch(
      `${BACKEND_URL}/groups/${groupId}/users`,
      {
        method: 'POST',
        headers: { Authorization: user.token },
      }
    )
    .then(screenResponse)
    .then(res => res.json())
    .then(pipe(
      () => this.groups.find(
        group => group.id === groupId
      ).members.push({
        career_account: user.career_account,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
      })
    ));
  }

  @action.bound
  leaveGroup(groupId) {
    const group = this.groups.find(
      g => g.id === groupId
    );

    return fetch(
      `${BACKEND_URL}/groups/${groupId}/users`,
      {
        method: 'DELETE',
        headers: { Authorization: user.token },
      }
    )
    .then(screenResponse)
    .then(res => res.json())
    .then(pipe(
      () =>
        group.members.splice(
          group.members.findIndex(member => member.id === user.id),
          1,
        )
    ));
  }

  @action.bound
  leaveCourse() {
    this.loading.waitingFor = 'Leaving a Course';

    return fetch(
      `${BACKEND_URL}/courses/${this.id}/users`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      }
    )
    .then(screenResponse)
    .then((res: Object): Promise => res.json())
    .catch(this.failLoading);
  }

  @action.bound
  fetch({ params }) {
    this.loading.state = 'loading';
    this.loading.waitingFor = `Course ${params.id}`;

    return Promise.all([
      fetch(
        `${BACKEND_URL}/courses/${this.id}/users`,
        {
          method: 'GET',
          headers: { Authorization: user.token },
        }
      ).then(screenResponse)
      .then(ret => ret.json())
      .then(json => json.error ? do { throw json; } : json)
      .then(json => this.users = json),

      fetch(
        `${BACKEND_URL}/courses/${params.id}`,
        {
          method: 'GET',
        }
      ).then(screenResponse)
      .then(ret => ret.json())
      .then(json => {
        this.navbar.subtitle = json.name;

        [
          'name',
          'title',
          'id',
        ].forEach(mapOn(this)(json));

        return json;
      }),

      fetch(
        `${BACKEND_URL}/courses/${this.id}/groups`,
        {
          method: 'GET',
          headers: { Authorization: user.token },
        }
      ).then(screenResponse)
      .then(ret => ret.json())
      .then(json => this.groups = json),
    ]).then(() => {
      this.loading.state = 'loaded';
      navbar.loading.state = 'loaded';
    }).catch(() => {
      this.loading.state = 'failed';
      navbar.loading.state = 'failed';
    });
  }
}

export default new Course(navbar);
