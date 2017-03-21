import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';
import pass from '~/util/passthrough';
import reThrow from '~/util/reThrow';

class SignupForm {
  @observable firstName: string = '';
  @observable lastName: string = '';
  @observable careerAccount: string = '';
  @observable password: string = '';
  @observable confirmPassword: string = '';
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
  passwordsMatch(): bool {
    if (this.password !== this.confirmPassword) {
      this.errors.push('Passwords must match');
      return false;
    } return true;
  }
  @action.bound
  isFirstNameValid() {
    if (this.firstName.length > 0)
      return true;

    this.errors.push('First Name cannot be blank');
    return false;
  }

  @action.bound
  isLastNameValid() {
    if (this.lastName.length > 0)
      return true;

    this.errors.push('Last Name cannot be blank');
    return false;
  }

  @action.bound
  isCareerAccountValid() {
    if (this.careerAccount.length > 0)
      return true;

    this.errors.push('Career account cannot be blank');
    return false;
  }

  @action.bound
  isPasswordValid() {
    if (!this.passwordsMatch)
      return false;
    else if (this.password.length > 0) {
      this.errors.push('Password cannot be blank');
      return false;
    }
    return true;
  }

  @action.bound
  isFormValid() {
    return this.isFirstNameValid() &&
      this.isLastNameValid() &&
      this.isCareerAccountValid() &&
      this.isPasswordValid();
  }

  @action.bound
  submit() {
    this.errors = [];
    if (!this.isFormValid())
      return false;

    this.startLoading();

    const payload = {
      first_name: this.firstName,
      last_name: this.lastName,
      career_account: this.careerAccount,
      password: this.password,
    };

    return fetch(`${BACKEND_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then(screenResponse)
    .then(res => res.json())
    .then(pass(this.succeedLoading))
    .catch(reThrow(this.failLoading));
  }
}

export default new SignupForm(navbar);
