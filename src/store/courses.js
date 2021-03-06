// @flow

import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import user from '~/store/user';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';

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
  register(id: number): Promise {
    this.loading.waitingFor = 'Class to register';

    return fetch(
      `${BACKEND_URL}/courses/${id}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      }
    )
    .then(screenResponse)
    .then((ret: Object): Promise => ret.json())
    .catch(this.failLoading);
  }

  @action.bound
  fetch(): Promise {
    this.loading.waitingFor = 'A class';

    return fetch(
      `${BACKEND_URL}/courses`,
      {
        method: 'GET',
      }
    ).then(screenResponse)
    .then((ret: Object): Promise => ret.json())
    .then((json: Object): Array<Object> => {
      this.succeedLoading();
      return this.list = json;
    })
    .catch(this.failLoading);
  }
}

export default new Courses();
