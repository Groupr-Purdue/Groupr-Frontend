// @flow
import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import login from '~/store/loginForm';
import userStore from '~/store/user';
import router from '~/store/router';
import navbar from '~/store/navbar';

export const handleSubmit = (): void =>
  login.submit().then((user: Object): Object => {
    console.log(user); // eslint-disable-line no-console
    const currentUser = {
      firstName: user.first_name,
      lastName: user.last_name,
      careerAccount: user.career_account,
      token: user.token,
      loggedIn: true,
    }
    userStore.storeUser(currentUser);
    router.push(`/courses/${user.id}`);
  });

export default class Login extends React.Component {
  render(): Element {
    return (
      <Row >
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Career Account'
            onChange={(ev: Object, value: string): void => login.careerAccount = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Password'
            type='password'
            onChange={(ev: Object, value: string): void => login.password = value} />
        </Col>
        <Col xs={12}>
          <RaisedButton
            primary={true}
            onClick={handleSubmit} >
            Sign-In
            </RaisedButton>
        </Col>
      </Row>
    );
  }
}
