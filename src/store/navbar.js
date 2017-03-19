// @flow

import { observable, computed } from 'mobx';
import Loading from '~/store/loading';
import user from '~/store/user';

class Navbar {
  @observable subtitle: string = '';
  @observable maintitle: string = 'Groupr';
  @observable loading: Loading = new Loading();

  @computed
  get title(): string {
    if (this.subtitle === '') return this.maintitle;
    return `${this.maintitle} - ${this.subtitle}`;
  }
}

export default new Navbar();
