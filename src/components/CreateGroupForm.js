import React from 'react';
import {
  Paper,
  Divider,
  TextField,
  FloatingActionButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import router from '~/store/router';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import groupForm from '~/store/groupForm';
import loadingWrapper from '~/util/loadingWrapper';

export const handleSubmit =
  id =>
    () =>
      groupForm.submit(id)
      .then(() => router.push(`/courses/${id}`))
      .catch(() => groupForm.failLoading());

const CreateGroupForm = (props: Array<Object>): Element =>
  <div>
    <Row center='xs'>
      <Col xs={12} sm={6} md={6} lg={6} >
        <Paper>
          <Row center='xs'>
            <Col xs={10} style={{ padding: '20px 0 20px 0' }}>
              <div>
                <h1> Group Course Form </h1>
              </div>
            </Col>
          </Row>
          <Divider />
          <Row center='xs'>
            <Col xs={10}>
              <Row>
                <TextField fullWidth={true}
                  floatingLabelText='Group Name'
                  hintText='The Super Stars'
                  onChange={(ev, value) => groupForm.name = value} />
              </Row>
              <Row center='xs'>
                <FloatingActionButton
                  style={{ margin: '0 0 15px 0', transform: 'translate(0, 40px)' }}
                  onClick={handleSubmit(props[0].params.id)}>
                  <ContentAdd />
                </FloatingActionButton>
              </Row>
            </Col>
          </Row>
        </Paper>
      </Col>
    </Row>
  </div>;

export default loadingWrapper(CreateGroupForm, groupForm.loading);
