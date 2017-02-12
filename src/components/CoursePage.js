// @flow

import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Paper, List, ListItem, LinearProgress, Subheader } from 'material-ui';
import course from '../store/course';

const handleClick = router => () => router.push(`/users/${course.id}`);

const CoursesPage = ({ router }) =>
  <div>
    <Paper>
      <h1> {course.name} </h1>
      <h2> {course.title} </h2>
    </Paper>

    <Paper>
      <List>
        <Subheader> {course.name} Students </Subheader>
        { do {
          if (course.users.length) course.users.map((user, idx) =>
            <ListItem
              key={idx}
              primaryText={`${user.first_name} ${user.last_name}`}
              secondaryText={user.career_account}
              onClick={handleClick(router)} />);

          else <LinearProgress mode='indeterminate' />;
        } }
      </List>
    </Paper>
  </div>;

CoursesPage.propTypes = {
  router: PropTypes.object,
};

export default inject('router')(observer(CoursesPage));
