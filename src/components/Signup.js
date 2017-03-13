import React from 'react';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import { inject, observer } from 'mobx-react';
import { TextField, RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import signup from '~/store/signupForm';

export const handleSubmit = () =>
  signup.submit().then(({ id }) => router.push(`/courses/${id}`)); 

class Signup extends React.Component {
  props: { router: Object };
  render() {
    return (
      <Row>
        <Col xs={12} >
          <TextField
            floatingLabelText='First Name'
            onChange={(ev, value) => signup.firstName = value}
          />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Last Name'
            onChange={(ev, value) => signup.lastName = value}
          />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Username'
            onChange={(ev, value) => signup.username = value}
          />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Password'
            type='password'
            onChange={(ev, value) => signup.password = value}
          />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Confirm Password'
            type='password'
            onChange={(ev, value) => signup.confirmPassword = value}
          />
        </Col>
        <Col xs={12}>
          <Link to='login'>
            <RaisedButton
              primary={true}
              label='Sign Up'
              onClick={this.handleSubmit}
            />
          </Link>
        </Col>
      </Row>
    );
  }
}

export default inject('router')(observer(Signup));
