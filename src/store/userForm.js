import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';

// stores
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import user from '~/store/user';

// utils
import screenResponse from '~/util/screenResponse';

class UserForm {
  @observable firstName = user.first_name;
  @observable lastName = user.last_name;
  @observable email = user.email;
  @observable error = {};
  loading: Loading;
  navbar;

  constructor(navbarStore) {
    this.navbar = navbarStore;
    this.loading = new Loading({
      waitingFor: 'server response',
      state: 'loaded',
      recoverable: true,
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
  hasFirstName() {
    if (this.firstName) return true;

    this.error.firstName = 'First name is required';
    return false;
  }

  @action.bound
  hasLastName() {
    if (this.lastName) return true;

    this.error.lastName = 'Last name is required';
    return false;
  }

  @action.bound
  hasEmail() {
    if (this.email) return true;

    this.error.email = 'Email is required';
    return false;
  }

  @action.bound
  isValid() {
    return this.hasFirstName() && this.hasLastName() && this.hasEmail();
  }

  @action.bound
  submit() {
    this.startLoading();

    const payload = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
    };

    return fetch(`${BACKEND_URL}/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
    })
      .then(screenResponse)
      .then(res => res.json());
  }
}

export default new UserForm(navbar);
