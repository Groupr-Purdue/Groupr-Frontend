// @flow

import React from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  List,
  ListItem,
  Divider,
} from 'material-ui';
import courses from '~/store/courses';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import router from '~/store/router';
import loadingWrapper from '~/util/loadingWrapper';

const handleClick =
  (course: Object): Function =>
    async (): Void => {
      await courses.register(course.id + 1);
      router.push(`/courses/${course.id + 1}`);
    };

const CoursesPage = (): Object =>
  <Row center='xs'>
    <Col xs={12} sm={6} md={6} lg={6}>
      <Paper>
        <List>
          <Row center='xs'><h3> Your Courses: Select a course to join. </h3></Row>
          <Divider style={{ marginBottom: '10px' }} />
          { do {
            if (courses.list.length)
              courses.list.map((course: Object, idx: number): Element =>
                <ListItem
                  key={idx}
                  id={`course_${idx}`}
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
      </Paper>
    </Col>
  </Row>;

export { CoursesPage as NakedCoursesPage };

export default loadingWrapper(observer(CoursesPage), courses.loading);
