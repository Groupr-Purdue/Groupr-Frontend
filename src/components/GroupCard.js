import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui';
import GroupList from '~/components/GroupList';

type propType = { group: Object, style: Object };

const GroupCard = ({ group, style = {} }: propType): Element =>
  <Card style={style}>
    <CardHeader
      title={group.name}
      actsAsExpander={true}
      showExpandableButton={true} />
    <CardText expandable={true}>
      <GroupList users={group.users} />
    </CardText>
  </Card>;

export default GroupCard;
