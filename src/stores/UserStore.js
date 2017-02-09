// @flow

import { observable, computed } from 'mobx';

export default class UserStore {
  @observable user: { firstName: string, lastName: string, classes: Array<string>} = {
    firstName: '',
    lastName: '',
    classes: [],
  };
  @computed get fullName() : string {
    const { firstName, lastName } = this.user;

    return `${firstName} ${lastName}`;
  }
}
