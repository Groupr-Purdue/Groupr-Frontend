import React from 'react';
import { observer } from 'mobx-react';

import {
  Paper,
  Divider,
  TextField,
  FloatingActionButton,
} from 'material-ui';

import router from '~/store/router';
import userForm from '~/store/userForm';
import user from '~/store/user';

import ContentAdd from 'material-ui/svg-icons/content/add';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import loadingWrapper from '~/util/loadingWrapper';

export const handleSubmit = () => {
  userForm.error = {};

  if (userForm.isValid())
    userForm.submit()
    .then(() => router.push(`/users/${user.id}`))
    .then(userForm.succeedLoading)
    .catch(userForm.failLoading);
};

const UpdateUserForm = (): Element =>
  <div>
    <Row center='xs'>
      <Col xs={12} sm={6} md={6} lg={6} >
        <Paper>
          <Row center='xs'>
            <Col xs={10} style={{ padding: '20px 0 20px 0' }}>
              <div>
                <h1 id='course_name'> Update User Form </h1>
              </div>
            </Col>
          </Row>
          <Divider />
          <Row center='xs'>
            <Col xs={10}>
              <Row>
                <TextField fullWidth={true}
                  floatingLabelText='First Name'
                  hintText='Billy'
                  errorText={userForm.error.firstName}
                  defaultValue={user.first_name + ' + other string'}
                  onChange={(ev, value) => userForm.firstName = value} />
              </Row>
              <Row>
                <TextField fullWidth={true}
                  floatingLabelText='Last Name'
                  hintText='Bob-Joe'
                  defaultValue={user.last_name}
                  errorText={userForm.error.lastName}
                  onChange={(ev, value) => userForm.lastName = value} />
              </Row>
              <Row start='xs'>
                <TextField fullWidth={true}
                  floatingLabelText='Career Account'
                  hintText='bjoe'
                  defaultValue={user.career_account}
                  errorText={userForm.error.careerAccount}
                  multiLine={true}
                  onChange={(ev, value) => userForm.careerAccount = value} />
              </Row>
              <Row center='xs'>
                <FloatingActionButton
                  style={{ margin: '0 0 15px 0', transform: 'translate(0, 40px)' }}
                  onClick={handleSubmit}>
                  <ContentAdd />
                </FloatingActionButton>
              </Row>
            </Col>
          </Row>
        </Paper>
      </Col>
    </Row>
  </div>;

export default observer(loadingWrapper(UpdateUserForm, userForm.loading));
