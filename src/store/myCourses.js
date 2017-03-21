// @flow

import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';
import { testUser } from '~/config';
import reThrow from '~/util/reThrow';

class Courses {
  @observable list = [];
  loading: Loading = new Loading({ waitingFor: 'A class list' });

  @action.bound
  startLoading() {
    this.loading.state = 'loading';
    navbar.loading.state = 'loading';
  }

  @action.bound
  succeedLoading() {
    this.loading.state = 'loaded';
    navbar.loading.state = 'loaded';
  }

  @action.bound
  failLoading() {
    this.loading.state = 'failed';
    navbar.loading.state = 'failed';
  }

  @action.bound
  fetch(): Promise {
    this.loading.waitingFor = 'A class';
    this.startLoading();

    return fetch(
      `${BACKEND_URL}/users/${testUser.id}/courses`,
      {
        method: 'GET',
        headers: { Authorization: testUser.token },
      }
    )
    .then(screenResponse)
    .then((ret: Object): Promise => ret.json())
    .then((json: Object): Array<Object> => {
      this.succeedLoading();
      return this.list = json;
    })
    .catch(reThrow(this.failLoading));
  }
}

export default new Courses();
