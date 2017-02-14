// @flow

import React from 'react';
import { inject, observer } from 'mobx-react';
import { Paper, List, ListItem, LinearProgress, Subheader } from 'material-ui';
import course from '../store/course';

const handleClick =
  (router: Object): Function =>
  (): Void =>
  router.push(`/users/${course.id}`);

const CoursesPage = ({ router }: { router: object }): React$Element =>
  <div>
    <Paper>
      <h1> {course.name} </h1>
      <h2> {course.title} </h2>
    </Paper>

    <Paper>
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
    </Paper>
  </div>;

export default inject('router')(observer(CoursesPage));
