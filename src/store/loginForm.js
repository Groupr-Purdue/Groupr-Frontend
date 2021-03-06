import { observable, action } from 'mobx';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import { loginUser } from '~/store/user';

class LoginForm {
  @observable careerAccount: string = '';
  @observable password: string = '';
  @observable errors: Object = {};
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
  isCareerAccountValid() {
    if (this.careerAccount.length) return true;

    this.errors.account = 'Career Account is required';
    return false;
  }

  @action.bound
  isPasswordValid() {
    if (this.password.length) return true;

    this.errors.password = 'Password is required';
    return false;
  }

  @action.bound
  isValid() {
    this.errors = {};
    return this.isCareerAccountValid() && this.isPasswordValid();
  }

  @action.bound
  submit() {
    this.startLoading();

    const payload = {
      career_account: this.careerAccount,
      password: this.password,
    };

    return loginUser(payload);
  }
}

export default new LoginForm(navbar);
