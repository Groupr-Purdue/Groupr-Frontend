import React from 'react';
import {
  Card,
  CardHeader,
  CardText,
  FlatButton,
} from 'material-ui';
import UserList from '~/components/UserList';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import course from '~/store/course';
import user from '~/store/user';
import snackbar from '~/store/snackbar';
import { observer } from 'mobx-react';

type propType = { group: Object, style: Object };

const handleJoinGroup =
  id =>
    () =>
      course.joinGroup(id).then(snackbar.open);

const handleLeaveGroup =
  id =>
    () =>
      course.leaveGroup(id);

const GroupCard = ({ group, style = {} }: propType): Element =>
  <Card style={style}>
    <CardHeader
      title={group.name}
      actAsExpander={true}
      showExpandableButton={true} />
    <CardText expandable={true}>
      <UserList users={group.members} />
      { do {
        if (user.loggedIn && !group.members.find(member => member.id === user.id))
          <FlatButton
            primary={true}
            label='Join Group'
            icon={<ContentAdd />}
            onClick={handleJoinGroup(group.id)} />;
        else if (user.loggedIn)
          <FlatButton
            secondary={true}
            label='Leave Group'
            icon={<ContentRemove />}
            onClick={handleLeaveGroup(group.id)} />;
      } }
    </CardText>
  </Card>;

export default observer(GroupCard);
