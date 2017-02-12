import React, { PropTypes } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { RaisedButton } from 'material-ui';

export default class Login extends React.Component {
  render() {
    return (
      <Row center='xs'>
        <Col>
          <Row>
            <RaisedButton primary={true}>
              Sign-Up
            </RaisedButton>
          </Row>
          <Row>
            <RaisedButton primary={true}>
              Sign-in
            </RaisedButton>
          </Row>
        </Col>
      </Row>

    );
  }
}

Login.propTypes = {
  routing: PropTypes.object,
};
