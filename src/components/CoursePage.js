// @flow

import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Paper,
  List, ListItem,
  LinearProgress,
  CircularProgress,
  Subheader,
  Divider,
} from 'material-ui';
import course from '../store/course';
import { Grid, Row, Col } from 'react-flexbox-grid';

const handleClick =
  (router: Object): Function =>
  (): Void =>
  router.push(`/users/${course.id}`);

const CoursesPage = ({ router }: { router: object }): React$Element =>
  <div>
    <Paper>
      <Grid>
        <Row center='xs'>
          <Col xs={10} style={{ padding: '20px 0 20px 0' }}>
            {
              course.name === 'Loading' ? <CircularProgress /> : <div>
                <h1> {course.name} </h1>
                <h2> {course.title} </h2>
              </div>
            }
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
                        onClick={handleClick(router)} />);

                else <LinearProgress mode='indeterminate' />;
              } }
            </List>
          </Col>
        </Row>
      </Grid>
    </Paper>
  </div>;

export default inject('router')(observer(CoursesPage));
