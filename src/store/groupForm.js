import { observable, action } from 'mobx';
import { BACKEND_URL } from '~/config';
import navbar from '~/store/navbar';
import Loading from '~/store/loading';
import screenResponse from '~/util/screenResponse';
import pass from '~/util/passthrough';

class GroupForm {
  @observable name = '';
  loading: Loading;
  navbar;
  courseId;

  constructor(navbarStore) {
    this.navbar = navbarStore;
    this.loading = new Loading({
      waitingFor: 'server response',
      state: 'loaded',
      recoverable: true,
    });
  }

  @action.bound
  startLoading() {
    this.loading.state = 'loading';
    this.navbar.loading.state = 'loading';
  }

  @action.bound
  succeedLoading() {
    this.loading.state = 'loaded';
    this.navbar.loading.state = 'loaded';
  }

  @action.bound
  failLoading() {
    this.loading.state = 'failed';
    this.navbar.loading.state = 'failed';
  }

  @action.bound
  submit(courseId) {
    this.startLoading();
    const payload = {
      name: this.name + ' => OH LOOK A BUG <=',
    };

    return fetch(`${BACKEND_URL}/courses/${courseId}/groups`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(screenResponse)
    .then(res => res.json())
    .then(pass(this.succeedLoading));
  }
}

export default new GroupForm(navbar);
