// @flow

import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';

class Courses {
  @observable list = [];
  loading: Loading = new Loading({ waitingFor: 'A class list' });

  @action.bound
  fetch(): Promise {
    this.loading.waitingFor = 'A class';
    this.loading.state = 'loading';
    navbar.loading.state = 'loading';

    return fetch(
      `${BACKEND_URL}/courses`,
      {
        method: 'GET',
        // header: { Authorization: user.token },
      }
    ).then(screenResponse)
    .then((ret: Object): Promise => ret.json())
    .then((json: Object): Array<Object> => {
      this.loading.state = 'loaded';
      navbar.loading.state = 'loaded';
      return this.list = json;
    });
  }
}

export default new Courses();
