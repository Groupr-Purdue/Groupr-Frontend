import React from 'react';
import { observer } from 'mobx-react';
import {
  Tab,
  Tabs,
} from 'material-ui';
import router from '~/store/router';
import user from '~/store/user';
import menubar from '~/store/menubar';

const handleChange = (value) => {
  router.push(value);
};

const Menubar =
(): Element =>
  <Tabs style={{ marginTop: 10 }} value={menubar.value} onChange={handleChange}>
    <Tab label='All Courses' value='/courses' />
    {
      user.loggedIn ?
        <Tab
          label='My Courses'
          value='/courses/me' /> : null
    }
    {
      user.loggedIn ?
        <Tab
          label='Create Course'
          value='/create-course' /> : null
    }
  </Tabs>;

export default observer(Menubar);
