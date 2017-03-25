import React from 'react';
import {
  Tab,
  Tabs,
} from 'material-ui';
import router from '~/store/router';

const Menubar =
(): Element =>
  <Tabs>
    <Tab label='All Courses' onActive={() => router.push('/courses')} />
    <Tab label='My Courses' onActive={() => router.push('/courses/me')} />
    <Tab label='Create Course' onActive={() => router.push('/create-course')} />
  </Tabs>;

export default Menubar;
