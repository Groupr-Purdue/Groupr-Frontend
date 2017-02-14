// @flow

import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Paper,
  List,
  ListItem,
  LinearProgress,
  Subheader,
  Divider,
} from 'material-ui';
import courses from '../store/courses';
import { Grid, Row, Col } from 'react-flexbox-grid';

const handleClick =
  (router: Object): Function =>
  (course: Object): Function =>
  (): Void => router.push(`/courses/${course.id}`);

const CoursesPage = ({ router }: { router: Object }): React$Element =>
  <Paper>
    <Grid>
      <Row>
        <Col xsOffset={1} xs={10}>
          <List>
            <Row center='xs'><Subheader> Your Courses </Subheader></Row>
            <Divider style={{ marginBottom: '10px' }} />
            { do {
              if (courses.list.length)
                courses.list.map((course: Object, idx: number): React$Element =>
                  <ListItem
                    key={idx}
                    primaryText={course.title}
                    secondaryText={course.name}
                    onClick={handleClick(router)(course)} />);

              else <LinearProgress mode='indeterminate' />;
            } }
          </List>
        </Col>
      </Row>
    </Grid>
  </Paper>;

export { CoursesPage as NakedCoursesPage };

export default inject('router')(observer(CoursesPage));
