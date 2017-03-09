import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';
import isCareerAccount from '~/util/isCareerAccount';

class CourseForm {
  @observable name = '';
  @observable title = '';
  @observable users = '';
  loading: Loading;
  navbar;

  constructor(navbarStore) {
    this.navbar = navbarStore;
    this.loading = new Loading({
      waitingFor: 'server response',
      state: 'loaded',
    });
  }

  @action.bound
  startLoading() {
    this.loading.state = 'loading';
    this.navbar.loading.state = 'loading';
  }

  @action.bound
  succeedLoading() {
    this.loading.state = 'loaded';
    this.navbar.loading.state = 'loaded';
  }

  @action.bound
  failLoading() {
    this.loading.state = 'failed';
    this.navbar.loading.state = 'failed';
  }

  @action.bound
  submit() {
    this.startLoading();

    const usersList = this.users
      .replace(/\s/g, '')
      .split(',')
      .filter(isCareerAccount);

    const payload = {
      title: this.title,
      name: this.name,
      users: usersList,
      enrollment: usersList.length,
    };

    return fetch(`${BACKEND_URL}/courses`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(screenResponse)
      .then(res => res.json())
      .then(console.log)
      .then(this.succeedLoading)
      .catch(this.failLoading);
  }
}

export default new CourseForm(navbar);
