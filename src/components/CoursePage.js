import React from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  Divider,
  RaisedButton,
  Card,
  CardText,
  CardHeader,
} from 'material-ui';
import course from '~/store/course';
import router from '~/store/router';
import user from '~/store/user';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import loadingWrapper from '~/util/loadingWrapper';
import GroupCard from '~/components/GroupCard';
import UserList from '~/components/UserList';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

const handleLeaveCourse =
  () => course.leaveCourse().then(router.push('/courses'));

const handleJoinCourse = null;

const CoursePage = (): Element =>
  <div>
    <Row center='xs'>
      <RaisedButton
        primary={true}
        style={{ margin: '15px 0 15px 0' }}
        label='Create New Group!'
        onClick={(): void => router.push(`/create-group/${course.id}`)} />
      { do {
        if (user.loggedIn && !course.users.find(u => u.id === user.id))
          <RaisedButton
            style={{ margin: '15px 0 15px 0' }}
            primary={true}
            label='Join Course'
            icon={<ContentAdd />}
            onClick={handleJoinCourse} />;
        else if (user.loggedIn)
          <RaisedButton
            style={{ margin: '15px 0 15px 0' }}
            secondary={true}
            label='Leave Course'
            icon={<ContentRemove />}
            onClick={handleLeaveCourse} />;
      } }
    </Row>
    <Row around='xs'>
      {
        course.groups.map(
          (group: Object, idx: number): Element =>
            <Col xs={12} sm={6} md={4} lg={4} key={idx} >
              <GroupCard group={group} style={{ margin: '10px 0 10px 0' }} />
            </Col>
        )
      }
    </Row>
    <Divider style={{ margin: '30px 0 15px 0' }} />
    <Row center='xs'>
      <Col xs={12} sm={10} md={10} lg={10}>
        <Card>
          <CardHeader
            title={course.name}
            actAsExpander={true}
            showExpandableButton={true} />
          <CardText expandable={true}>
            <UserList users={course.users} />
            { do {
              if (user.loggedIn && !course.users.find(u => u.id === user.id))
                <FlatButton
                  primary={true}
                  label='Join Course'
                  icon={<ContentAdd />}
                  onClick={handleJoinCourse} />;
              else if (user.loggedIn)
                <FlatButton
                  secondary={true}
                  label='Leave Course'
                  icon={<ContentRemove />}
                  onClick={handleLeaveCourse} />;
            } }
          </CardText>
        </Card>
      </Col>
    </Row>
  </div>;

export default loadingWrapper(observer(CoursePage), course.loading);
