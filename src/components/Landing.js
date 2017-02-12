// @flow
import React from 'react';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';

export default class Landing extends React.Component {
  render() {
    return (
      <div className='container'>
        <Link to='cas'>
          <RaisedButton className='login-button' primary={true}>
            Login
          </RaisedButton>
        </Link>
      </div>
    );
  }
}

Landing.propTypes = {
};
