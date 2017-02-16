// @flow

import React from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  List,
  ListItem,
  Divider,
} from 'material-ui';
import courses from '../store/courses';
import { Grid, Row, Col } from 'react-flexbox-grid';
import router from '../store/router';
import loadingWrapper from '../util/loadingWrapper';

const handleClick =
  (course: Object): Function =>
  (): Void => router.push(`/courses/${course.id}`);

const CoursesPage = (): Object =>
  <Paper>
    <Grid>
      <Row>
        <Col xsOffset={1} xs={10}>
          <List>
            <Row center='xs'><h3> Your Courses </h3></Row>
            <Divider style={{ marginBottom: '10px' }} />
            { do {
              if (courses.list.length)
                courses.list.map((course: Object, idx: number): React$Element =>
                  <ListItem
                    key={idx}
                    primaryText={course.title}
                    secondaryText={course.name}
                    onClick={handleClick(course)} />);

              else
                <Row center='xs'>
                  <h4> No Courses </h4>
                </Row>;
                // <LinearProgress mode='indeterminate'
                //   style={{ marginBottom: 30 }} />;
            } }
          </List>
        </Col>
      </Row>
    </Grid>
  </Paper>;

export { CoursesPage as NakedCoursesPage };

export default loadingWrapper(observer(CoursesPage));
