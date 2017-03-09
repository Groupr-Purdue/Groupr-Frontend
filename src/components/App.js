// @flow

import React from 'react';
import { observer, inject } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import { Row, Col, Grid } from 'react-flexbox-grid-aphrodite';
import GroupWork from 'material-ui/svg-icons/action/group-work';
import IconButton from 'material-ui/IconButton';
import { CubeGrid } from 'better-react-spinkit';

const App =
  (
    { children, routing, navbar }:
    { children: Array<Element>, routing: Object, navbar: Object }
  ): Element =>
    <Grid>
      <Row style={{ marginBottom: '15px' }}>
        <Col xs={12}>
          <AppBar
            key={'AppBar'}
            title={navbar.title}
            onClick={(): Void => routing.push('/create-course')}
            iconElementRight={
              navbar.loading.state === 'loading' ?
                <Row style={{ height: 50, marginRight: 10 }} middle='xs'>
                  <CubeGrid color='white' row={5} col={5} size={30} />
                </Row> : null
              }
            iconElementLeft={
              <IconButton
                tooltip='Team up!'
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


export default inject('routing', 'navbar')(observer(App));
