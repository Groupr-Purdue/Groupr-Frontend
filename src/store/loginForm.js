// @flow
/* eslint camelcase: "off" */
import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';
import pass from '~/util/passthrough';

class LoginForm {
  @observable careerAccount: string = '';
  @observable password: string = '';
  @observable errors: Array<string> = [];
  loading: Loading;
  navbar;

  constructor(navbarStore: navbar) {
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
  submit(): Promise {
    this.startLoading();

    const payload = {
      career_account: this.careerAccount,
      password: this.password,
    };

    return fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(screenResponse)
      .then((res: Object): Object => res.json())
      .then(pass(console.log)) // eslint-disable-line no-console
      .then(pass(this.succeedLoading))
      .catch(pass(this.failLoading));
  }
}

export default new LoginForm(navbar);
