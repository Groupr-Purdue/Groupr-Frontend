// @flow

import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Paper, List, ListItem, LinearProgress, Subheader } from 'material-ui';
import courses from '../store/courses';

const handleClick = router => course => () => router.push(`/courses/${course.id}`);

const CoursesPage = ({ router }) =>
  <Paper>
    <List>
      <Subheader> Your Courses </Subheader>
      { do {
        if (courses.list.length) courses.list.map((course, idx) =>
          <ListItem
            key={idx}
            primaryText={course.title}
            secondaryText={course.name}
            onClick={handleClick(router)(course)} />);
        else <LinearProgress mode='indeterminate' />;
      } }
    </List>
  </Paper>;

CoursesPage.propTypes = {
  router: PropTypes.object,
};

export { CoursesPage as NakedCoursesPage };

export default inject('router')(observer(CoursesPage));
