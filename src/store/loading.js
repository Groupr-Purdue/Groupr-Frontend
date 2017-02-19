// @flow

import { observable } from 'mobx';

class Loading {
  @observable state = 'loading';
  waitingFor = 'default';

  constructor(
    { state = 'loading', waitingFor = 'Something' }:
    { state: string, waitingFor: string } = {}
  ) {
    this.state = state;
    this.waitingFor = waitingFor;
  }
}

export default Loading;
