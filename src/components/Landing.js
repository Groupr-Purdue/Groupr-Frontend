import React, { PropTypes } from 'react';
import { Col, Row } from 'react-flexbox-grid-aphrodite';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';

export default class Landing extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Link to='signup'>
            <RaisedButton primary={true}>
              Sign-Up
            </RaisedButton>
          </Link>
        </Col>
        <Col xs={12}>
          <Link to='login'>
            <RaisedButton primary={true}>
              Sign-in
            </RaisedButton>
          </Link>
        </Col>
      </Row>

    );
  }
}

Landing.propTypes = {
  routing: PropTypes.object,
};
