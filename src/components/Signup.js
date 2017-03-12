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
      firstName: '',
      lastName: '',
      careerId: '',
      password: '',
      confirmPassword: '',
    };
    this.onSignup = this.onSignup.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  props: { router: Object };

  onSignup(e) {
    e.preventDefault();
    if (this.passwordsMatch(this.state.password, this.state.confirmPassword)) {
      this.setState(prevState => prevState.errors.match = false);
      const params = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        career_account: this.state.username,
        password: this.state.password,
      };

      signupUser({ params: { body: params } })
        .then(newUser => {
          console.log(newUser);
          this.props.router.push(`/courses/${newUser.id}`);
        })
        .catch((err) => console.log(err));
    } else
      this.setState(prevState => prevState.errors.match = true);
  }

  onInputChange(e): void {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  passwordsMatch(password: String, confirmPassword: String): Boolean {
    return password && password === confirmPassword;
  }

  render() {
    return (
      <Row>
        <Col xs={12} >
          <TextField
            floatingLabelText='First Name'
<<<<<<< HEAD
            name='firstName'
            onChange={this.onInputChange} />
=======
            onChange={this.onInputChange('firstName')} />
>>>>>>> 78f34da9adb81676166869cebaa12810fe0c9602
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Last Name'
<<<<<<< HEAD
            name='lastName'
            onChange={this.onInputChange} />
=======
            onChange={this.onInputChange('lastName')} />
>>>>>>> 78f34da9adb81676166869cebaa12810fe0c9602
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Username'
            name='username'
            onChange={this.onInputChange} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Career Id'
            name='careerId'
            onChange={this.onInputChange} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Purdue Career Id'
            onChange={this.onInputChange('careerId')} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Password'
            name='password'
            type='password'
            onChange={this.onInputChange} />
        </Col>
        <Col xs={12} >
          <TextField
            floatingLabelText='Confirm Password'
            name='confirmPassword'
            type='password'
            onChange={this.onInputChange} />
        </Col>
        <Col xs={12}>
          <Link to='login'>
            <RaisedButton
              primary={true}
              label='Sign Up'
              onClick={this.onSignup} />
          </Link>
        </Col>
      </Row>
    );
  }
}

export default inject('router')(observer(Signup));
