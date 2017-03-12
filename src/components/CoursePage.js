// @flow

import React from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  List,
  ListItem,
  Subheader,
  Divider,
} from 'material-ui';
import course from '~/store/course';
import router from '~/store/router';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import loadingWrapper from '~/util/loadingWrapper';

const handleClick =
  (): Void => router.push(`/users/${course.id}`);

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
          <List>
            <Subheader> {course.name} Students </Subheader>
            { do {
              if (course.users.length)
                course.users.map(
                  (user: Object, idx: number): Element =>
                    <ListItem
                      key={idx}
                      primaryText={`${user.first_name} ${user.last_name}`}
                      secondaryText={user.career_account}
                      onClick={handleClick} />);

              else <ListItem primaryText='No studuents in this course.' />;
            } }
          </List>
        </Paper>
      </Col>
    </Row>
  </div>;

export default loadingWrapper(observer(CoursePage), course.loading);
