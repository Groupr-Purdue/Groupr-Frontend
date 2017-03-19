import { observable, computed, action } from 'mobx';
import navbar from '~/store/navbar';

class User {
  @observable firstName = '';
  @observable lastName = '';
  @observable careerAccount = '';
  @observable token = '';
  @observable loggedIn = false;
  navbar;

  constructor(navbarStore: navbar) {
    this.navbar = navbarStore;
  }

  @computed
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @action.bound
  storeUser(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.careerAccount = user.careerAccount;
    this.token = user.token;
    this.navbar.subtitle = user.fullName;
    this.loggedIn = true;
  }
}

export default new User(navbar);
