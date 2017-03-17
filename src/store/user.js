import { observable, computed } from 'mobx';

class User {
  @observable firstName = '';
  @observable lastName = '';
  @observable username = '';
  @observable token = '';
  @observable loggedIn = false;

  @computed 
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User();
