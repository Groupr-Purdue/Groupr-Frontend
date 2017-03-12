// @flow

import { observable } from 'mobx';

class Loading {
  @observable state;
  waitingFor: string;
  recoverable: boolean;

  constructor(
    { state = 'loading', waitingFor = 'Something', recoverable = false }:
    { state: string, waitingFor: string, recoverable: boolean } = {}
  ) {
    this.state = state;
    this.waitingFor = waitingFor;
    this.recoverable = recoverable;
  }
}

export default Loading;
