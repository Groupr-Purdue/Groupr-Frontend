import React from 'react';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import { observer } from 'mobx-react';
import { TextField, RaisedButton } from 'material-ui';
import signup from '~/store/signupForm';
import router from '~/store/router';

export const handleSubmit = () => {
  const ret = signup.submit();

  if (ret instanceof Promise) ret.then(() => router.push('courses/me'));
};

class Signup extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12} >
          <TextField
            floatingLabelText='First Name'
            errorText={signup.errorMap.firstName}
            onChange={(ev, value) => signup.firstName = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Last Name'
            errorText={signup.errorMap.lastName}
            onChange={(ev, value) => signup.lastName = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Username'
            errorText={signup.errorMap.account}
            onChange={(ev, value) => signup.careerAccount = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Password'
            type='password'
            errorText={signup.errorMap.password}
            onChange={(ev, value) => signup.password = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Confirm Password'
            type='password'
            errorText={signup.errorMap.confirmPassword}
            onChange={(ev, value) => signup.confirmPassword = value} />
        </Col>
        <Col xs={12}>
          <RaisedButton
            primary={true}
            label='Sign Up'
            onClick={handleSubmit} />
        </Col>
      </Row>
    );
  }
}

export default observer(Signup);
