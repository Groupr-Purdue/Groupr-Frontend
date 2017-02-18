// @flow

import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Paper,
  List,
  ListItem,
  Subheader,
  Divider,
} from 'material-ui';
import course from '~/store/course';
import router from '~/store/router';
import { Grid, Row, Col } from 'react-flexbox-grid-aphrodite';
import loadingWrapper from '~/util/loadingWrapper';

const handleClick =
  (): Void => router.push(`/users/${course.id}`);

const CoursePage = (): Element =>
  <div>
    <Paper>
      <Grid>
        <Row center='xs'>
          <Col xs={10} style={{ padding: '20px 0 20px 0' }}>
            <div>
              <h1 id='course_name'> {course.name} </h1>
              <h2 id='course_title'> {course.title} </h2>
            </div>
          </Col>
        </Row>

      </Grid>
      <Divider />
      <Grid>
        <Row>
          <Col xsOffset={1} xs={10}>
            <List>
              <Subheader> {course.name} Students </Subheader>
              { do {
                if (course.users.length)
                  course.users.map(
                    (user: Object, idx: number): React$Element =>
                      <ListItem
                        key={idx}
                        primaryText={`${user.first_name} ${user.last_name}`}
                        secondaryText={user.career_account}
                        onClick={handleClick} />);

                else <ListItem primaryText='No studuents in this course.' />;
              } }
            </List>
          </Col>
        </Row>
      </Grid>
    </Paper>
  </div>;

export default loadingWrapper(observer(CoursePage));
