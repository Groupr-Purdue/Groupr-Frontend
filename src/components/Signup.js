import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { TextField, RaisedButton } from 'material-ui';

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
          <RaisedButton primary={true}>Sign Up</RaisedButton>
        </Col>
      </Row>
    );
  }
}
