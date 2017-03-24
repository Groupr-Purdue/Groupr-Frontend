import React from 'react';
import {
  Card,
  CardHeader,
  CardText,
  FlatButton,
} from 'material-ui';
import UserList from '~/components/UserList';
import ContentAdd from 'material-ui/svg-icons/content/add';
import course from '~/store/course';

type propType = { group: Object, style: Object };

const handleJoinGroup =
  id =>
    () =>
      course.joinGroup(id)
      .then(console.log);

const GroupCard = ({ group, style = {} }: propType): Element =>
  <Card style={style}>
    <CardHeader
      title={group.name}
      actAsExpander={true}
      showExpandableButton={true} />
    <CardText expandable={true}>
      <UserList users={group.members} />
      <FlatButton
        primary={true}
        label='Join Group'
        icon={<ContentAdd />}
        onClick={handleJoinGroup(group.id)} />
    </CardText>
  </Card>;

export default GroupCard;
