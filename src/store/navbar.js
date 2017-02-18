// @flow

import { observable, computed } from 'mobx';

class Navbar {
  @observable subtitle: string = '';
  @observable maintitle: string = 'Groupr';
  @observable loading: boolean = true;

  @computed
  get title(): string {
    if (this.subtitle === '') return this.maintitle;

    return `${this.maintitle} - ${this.subtitle}`;
  }

}

export default new Navbar();
