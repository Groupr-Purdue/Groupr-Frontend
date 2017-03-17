// @flow
import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import login from '~/store/loginForm';
import currentUser from '~/store/user';
import router from '~/store/router';

export const handleSubmit = () =>
  login.submit().then((user) => {
    console.log(user);
    currentUser.name = user.name;
    currentUser.username = user.username;
    currentUser.token = user.token;
    currentUser.loggedIn = true;
    router.push(`/courses/${user.id}`); 
  });

export default class Login extends React.Component {
  render(): Element {
    return (
      <Row >
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Username'
            onChange={(ev, value) => login.careerAccount = value}
          />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Password'
            type='password'
            onChange={(ev, value) => login.password = value}
          />
        </Col>
        <Col xs={12}>
          <RaisedButton
            primary={true}
            onClick={handleSubmit}
          >
            Sign-In
            </RaisedButton>
        </Col>
      </Row>
    );
  }
}
