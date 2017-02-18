// @flow

import { observable, computed } from 'mobx';

type UserType = {
  firstName: string,
  lastName: string,
  classes: Array<string>
};

export default class UserStore {
  @observable user: UserType = {
    firstName: '',
    lastName: '',
    classes: [],
  };

  @computed get fullName(): string {
    const { firstName, lastName } = this.user;

    return `${firstName} ${lastName}`;
  }
}
