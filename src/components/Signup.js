// @flow
import React from 'react';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import { inject, observer } from 'mobx-react';
import { TextField, RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import signup from '~/store/signupForm';
import currentUser from '~/store/user';
import router from '~/store/router';
import navbar from '~/store/navbar';

export const handleSubmit = () =>
  signup.submit().then(user => {
    console.log(user);
    currentUser.firstName = user.first_name;
    currentUser.lastName = user.last_name;
    currentUser.careerAccount = user.career_account;
    currentUser.token = user.token;
    currentUser.loggedIn = true;
    navbar.subtitle = currentUser.name; 
    router.push(`/courses/${user.id}`);
  })
    .catch((err) => console.error(err));

class Signup extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12} >
          <TextField
            floatingLabelText='First Name'
            onChange={(ev, value) => signup.firstName = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Last Name'
            onChange={(ev, value) => signup.lastName = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Career Account'
            onChange={(ev, value) => signup.careerAccount = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Password'
            type='password'
            onChange={(ev, value) => signup.password = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Confirm Password'
            type='password'
            onChange={(ev, value) => signup.confirmPassword = value} />
        </Col>
        <Col xs={12}>
          <Link to='login'>
            <RaisedButton
              primary={true}
              label='Sign Up'
              onClick={handleSubmit} />
          </Link>
        </Col>
      </Row>
    );
  }
}

export default inject('router')(observer(Signup));
