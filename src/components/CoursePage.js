// @flow

import React from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  List,
  ListItem,
  Subheader,
  Divider,
  RaisedButton,
} from 'material-ui';
import course from '~/store/course';
import router from '~/store/router';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import loadingWrapper from '~/util/loadingWrapper';
import GroupCard from '~/components/GroupCard';
import UserList from '~/components/UserList';
import ContentAdd from 'material-ui/svg-icons/content/add';

const CoursePage = (): Element =>
  <div>
    <Row center='xs'>
      <Col xs={12} sm={6} md={6} lg={6}>
        <Paper>
          <Row center='xs'>
            <h1 id='course_name'> {course.name} </h1>
          </Row>
          <Row center='xs'>
            <h2 id='course_title'> {course.title} </h2>
          </Row>
          <Divider />
          <UserList users={course.users} />
        </Paper>
      </Col>
    </Row>
    <Row center='xs'>
      <RaisedButton
        primary={true}
        style={{ margin: '15px 0 15px 0' }}
        label='Create New Group!'
        onClick={(): void => router.push(`/create-group/${course.id}`)} />
    </Row>
    <Row around='xs'>
      {
        course.groups.map(
          (group: Object, idx: number): Element =>
            <Col xs={12} sm={6} md={4} lg={4} key={idx} >
              <GroupCard group={group} style={{ margin: '10px 0 10px 0' }} />
            </Col>
        )
      }
    </Row>
  </div>;

export default loadingWrapper(observer(CoursePage), course.loading);
