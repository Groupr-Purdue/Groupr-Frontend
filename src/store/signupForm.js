import { observable, action } from 'mobx';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import { registerUser } from '~/store/user';

class SignupForm {
  @observable firstName: string = '';
  @observable lastName: string = '';
  @observable careerAccount: string = '';
  @observable password: string = '';
  @observable confirmPassword: string = '';
  @observable errorMap: Object = {};
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
  isFirstNameValid() {
    if (this.firstName.length > 0)
      return true;

    this.errorMap.firstName = 'First Name cannot be blank';
    return false;
  }

  @action.bound
  isLastNameValid() {
    if (this.lastName.length > 0)
      return true;

    this.errorMap.lastName = 'Last Name cannot be blank';
    return false;
  }

  @action.bound
  isCareerAccountValid() {
    if (this.careerAccount.length > 0)
      return true;

    this.errorMap.account = 'Career account cannot be blank';
    return false;
  }

  @action.bound
  isPasswordValid() {
    if (!this.passwordsMatch)
      return false;
    else if (this.password.length === 0) {
      this.errorMap.password = 'Password cannot be blank';
      return false;
    }
    return true;
  }

  @action.bound
  isFormValid() {
    this.errorMap = {};
    return this.isFirstNameValid() &&
      this.isLastNameValid() &&
      this.isCareerAccountValid() &&
      this.isPasswordValid();
  }

  @action.bound
  submit() {
    this.errors = [];

    this.startLoading();

    const payload = {
      first_name: this.firstName,
      last_name: this.lastName,
      career_account: this.careerAccount,
      password: this.password,
    };

    return registerUser(payload);
  }
}

export default new SignupForm(navbar);
