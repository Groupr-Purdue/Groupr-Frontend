import React from 'react';
import { List, ListItem } from 'material-ui';
import router from '~/store/router';
import { observer } from 'mobx-react';

const UserList = ({ users }: { users: Array<Object>}): Element =>
  <List>
    { do {
      if (users.length)
        users.map(
          (user: Object, idx: number): Element =>
            <ListItem
              key={idx}
              primaryText={`${user.first_name} ${user.last_name}`}
              secondaryText={user.career_account}
              onClick={() => router.push(`/users/${user.id}`)} />
        );

      else <ListItem primaryText='No members' />;
    } }
  </List>;

export default observer(UserList);
