import React from 'react';
import { observer } from 'mobx-react';
import { RaisedButton, TextField } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import login from '~/store/loginForm';
import router from '~/store/router';

export const handleSubmit = () => {
  if (login.isValid()) login.submit().then(() => router.push('/courses/me'));
};

class Login extends React.Component {
  render(): Element {
    return (
      <Row >
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Username'
            errorText={login.errors.account}
            onChange={(ev, value) => login.careerAccount = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Password'
            errorText={login.errors.password}
            type='password'
            onChange={(ev, value) => login.password = value} />
        </Col>
        <Col xs={12}>
          <RaisedButton
            primary={true}
            label='Sign-In'
            onClick={handleSubmit} />
        </Col>
      </Row>
    );
  }
}

export default observer(Login);
