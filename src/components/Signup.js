import React, { PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import { inject, observer } from 'mobx-react';
import { TextField, RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import { signupUser } from '../store/user';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        match: false,
        other: false,
      },
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  onSignup(e) {
    e.preventDefault();
    if (this.passwordsMatch(this.state.password, this.state.confirmPassword)) {
      this.setState(prevState => prevState.errors.match = false);
      signupUser({ params: { body: this.state } })
        .then(newUser => {
          this.props.router.push(`/courses/${newUser.id}`);
        })
        .catch(() => this.setState(prevState => prevState.errors.other = true));
    } else
      this.setState(prevState => prevState.errors.match = true);
  }

  onInputChange(name): void {
    return event => {
      event.preventDefault();
      const change = {};

      change[name] = event.target.value;
      this.setState(change);
    };
  }

  passwordsMatch(password: String, confirmPassword: String): Boolean {
    return password && password === confirmPassword;
  }

  render() {
    return (
      <Row>
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Username'
            onChange={this.onInputChange('username')} />
        </Col>

        <Col xs={12} >
          <TextField
            floatingLabelText='Password'
            type='password'
            onChange={this.onInputChange('password')} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Confirm Password'
            type='password'
            onChange={this.onInputChange('confirmPassword')} />
        </Col>
        <Col xs={12}>
          <Link to='login'>
            <RaisedButton
              primary={true}
              label='Sign Up'
              onClick={this.onSignup.bind(this)} />
          </Link>
        </Col>
      </Row>
    );
  }
}

Signup.propTypes = {
  router: PropTypes.object,
};

export default inject('router')(observer(Signup));
