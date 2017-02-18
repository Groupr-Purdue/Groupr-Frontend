// @flow
import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { Link } from 'react-router';
import { Row, Col } from 'react-flexbox-grid-aphrodite';

export default class Login extends React.Component {
  render(): Element {
    return (
      <Row >
        <Col xs={12} >
          <TextField floatingLabelText='Purdue Username' />
        </Col>
        <Col xs={12} >
          <TextField floatingLabelText='Password' />
        </Col>
        <Col xs={12}>
          <Link to='courses'>
            <RaisedButton primary={true}>Sign-In</RaisedButton>
          </Link>
        </Col>
      </Row>
    );
  }
}
