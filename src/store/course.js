import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';
import { testUser } from '~/config';

class Course {
  @observable name = 'Loading';
  @observable title = 'Loading';
  @observable users = [];
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
  fetch({ params }) {
    this.loading.state = 'loading';
    this.loading.waitingFor = `Course ${params.id}`;

    return Promise.all([
      fetch(
        `${BACKEND_URL}/courses/${this.id}/users`,
        {
          method: 'GET',
          headers: { Authorization: testUser.token },
        }
      ).then(screenResponse)
      .then(ret => ret.json())
      .then(json => this.users = json),

      fetch(
        `${BACKEND_URL}/courses/${params.id}`,
        {
          method: 'GET',
        }
      ).then(screenResponse)
      .then(ret => ret.json())
      .then(json => {
        const { name, title, id } = json;

        this.navbar.subtitle = name;
        this.name = name;
        this.title = title;
        this.id = id;

        return json;
      }),
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
