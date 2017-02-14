// @flow

import React, { PropTypes } from 'react';

import { RaisedButton } from 'material-ui';
import { inject, observer } from 'mobx-react';

type MockCASPropType = { routing: Object };

@inject('routing')
@observer
export default class MockCAS extends React.Component {
  props = MockCASPropType;

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
  render(): React$Element {
    return (
      <RaisedButton
        primary={true}
        onClick={this.onLogin}>
        Continue
      </RaisedButton>
    );
  }
}

MockCAS.propTypes = {
  routing: PropTypes.object,
};
