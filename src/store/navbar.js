import { observable, computed } from 'mobx';

class Navbar {
  @observable subtitle;
  @observable maintitle;
  @observable loading;

  constructor() {
    this.subtitle = '';
    this.maintitle = 'Groupr';
    this.loading = false;
  }

  @computed
  get title() {
    if (this.subtitle === '') return this.maintitle;

    return `${this.maintitle} - ${this.subtitle}`;
  }

}

export default new Navbar();
