import React from 'react';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import { TextField, RaisedButton } from 'material-ui';
import { Link } from 'react-router';

export default class signup extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12} >
          <TextField floatingLabelText='Purdue Username' />
        </Col>

        <Col xs={12} >
          <TextField floatingLabelText='Password' />
        </Col>
        <Col xs={12} >
          <TextField floatingLabelText='Confirm Password' />
        </Col>
        <Col xs={12}>
          <Link to='login'>
            <RaisedButton primary={true}>Sign Up</RaisedButton>
          </Link>
        </Col>
      </Row>
    );
  }
}
