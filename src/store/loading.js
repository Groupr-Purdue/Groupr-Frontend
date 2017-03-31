// @flow

import { observable } from 'mobx';

class Loading {
  @observable state;

  // used in user feedback
  waitingFor: string;

  // used by wrapper to determine if go back button works
  recoverable: boolean;

  constructor(
    { state = 'loaded', waitingFor = 'Something', recoverable = false }:
    { state: string, waitingFor: string, recoverable: boolean } = {}
  ) {
    this.state = state;
    this.waitingFor = waitingFor;
    this.recoverable = recoverable;
  }
}

export default Loading;
