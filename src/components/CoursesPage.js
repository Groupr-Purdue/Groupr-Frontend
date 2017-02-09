// @flow

import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Paper, List, ListItem } from 'material-ui';
import Spinner from './Spinner';
import courses from '../store/courses';

const handleClick = router => course => () => router.push(`/course/${course.id}`);

const CoursesPage = ({ router }) =>
  <Paper>
    <List>
      { do {
        if (courses.length) Spinner;

        else courses.list.map((course, idx) =>
          <ListItem
            key={idx}
            primaryText={course.name}
            onClick={handleClick(router)(course)} />);
      } }
    </List>
  </Paper>;

CoursesPage.propTypes = {
  router: PropTypes.object,
};

export default inject('router')(observer(CoursesPage));
