// @flow

import React from 'react';

import { RaisedButton } from 'material-ui';
import { inject, observer } from 'mobx-react';

@inject('routing')
@observer
export default class MockCAS extends React.Component {
  props: { routing: Object };

  // send to server for auth
  onLogin() {
    fetch('la;sjdf;lasjkdf;')
    .then((user: Object) => {
      // something something userstore
      this.props.routing.push(`/class/${user.toString()}`);
    })
    .catch((error: Object) => {
      if (process.env.environment === 'dev')
        console.log(error); // eslint-disable-line no-console
    });
  }
  render(): Element {
    return (
      <RaisedButton
        primary={true}
        onClick={this.onLogin}>
        Continue
      </RaisedButton>
    );
  }
}
