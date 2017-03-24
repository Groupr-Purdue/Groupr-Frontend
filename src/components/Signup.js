import React from 'react';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import { observer } from 'mobx-react';
import { TextField, RaisedButton } from 'material-ui';
import { Link } from 'react-router';
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
            onChange={(ev, value) => signup.firstName = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Last Name'
            onChange={(ev, value) => signup.lastName = value} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Username'
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

export default observer(Signup);
