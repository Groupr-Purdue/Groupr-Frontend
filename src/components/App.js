// @flow

import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import { Row, Col, Grid } from 'react-flexbox-grid';
import GroupWork from 'material-ui/svg-icons/action/group-work';
import IconButton from 'material-ui/IconButton';

const App =
  (
    { children, routing, navbar }:
    { children: Array<React$Element>, routing: Object, navbar: Object }
  ): React$Element =>
    <Grid>
      <Row style={{ marginBottom: '15px' }}>
        <Col xs={12}>
          <AppBar
            key={'AppBar'}
            title={navbar.title}
            onClick={(): Void => routing.push('/courses')}
            iconElementLeft={
              <IconButton
                style={{ padding: 0 }}
                iconStyle={{ height: 42, width: 42 }}>

                <GroupWork />
              </IconButton>
            } />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {children}
        </Col>
      </Row>
    </Grid>;

App.propTypes = {
  children: PropTypes.element,
  routing: PropTypes.object,
  navbar: PropTypes.object,
};

export default inject('routing', 'navbar')(observer(App));
