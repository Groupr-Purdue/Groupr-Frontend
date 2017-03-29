// @flow

import React from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  List,
  ListItem,
  Divider,
} from 'material-ui';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import loadingWrapper from '~/util/loadingWrapper';
import userPage, { loading } from '~/store/userPage';
import { Link } from 'react-router';

// const handleClick =
//   (u: Object): Function =>
//     async (): Void => {
//       await courses.register(u.id);
//       router.push(`/courses/${u.id}`);
//     };

const UserPage = (): Object =>
  <Row center='xs'>
    <Col xs={12} sm={6} md={6} lg={6}>
      <Paper>
        <List>
          <Row center='xs'><h3> User Info </h3></Row>
          <Divider style={{ marginBottom: '10px' }} />
          <ListItem
            primaryText={userPage.first_name}
            secondaryText={'First Name'} />
          <ListItem
            primaryText={userPage.last_name}
            secondaryText={'Last Name'} />
          <ListItem
            primaryText={userPage.career_account}
            secondaryText={'Career Account'} />
          <a
            href={`mailto:${userPage.career_account}@purdue.edu`}
            target='_blank'>
            <ListItem
              primaryText={`${userPage.career_account}@purdue.edu`}
              secondaryText={'Email Address'} />
          </a>
        </List>
      </Paper>
    </Col>
  </Row>;

export default loadingWrapper(observer(UserPage), loading);
