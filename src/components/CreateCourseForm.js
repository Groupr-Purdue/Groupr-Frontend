// @flow

import React from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  Divider,
  TextField,
  FloatingActionButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import course from '~/store/course';
import router from '~/store/router';
import { Grid, Row, Col } from 'react-flexbox-grid-aphrodite';

const CreateCourseForm = (): Element =>
  <div>
    <Row center='xs'>
      <Col xs={6}>
        <Paper>
          <Row center='xs'>
            <Col xs={10} style={{ padding: '20px 0 20px 0' }}>
              <div>
                <h1 id='course_name'> Create Course Form </h1>
              </div>
            </Col>
          </Row>
          <Divider />
          <Row center='xs'>
            <Col xs={10}>
              <Row>
                <TextField fullWidth={true}
                  floatingLabelText='Course Title' />
              </Row>
              <Row>
                <TextField fullWidth={true}
                  floatingLabelText='Course Number' />
              </Row>
              <Row start='xs'>
                <TextField fullWidth={true}
                  floatingLabelText='White List'
                  hintText='jshmoe, morecareeraccounts...'
                  multiLine={true} />
              </Row>
              <Row center='xs'>
                <FloatingActionButton
                  style={{ margin: '0 0 15px 0', transform: 'translate(0, 40px)' }}>
                  <ContentAdd />
                </FloatingActionButton>
              </Row>
            </Col>
          </Row>
        </Paper>
      </Col>
    </Row>
  </div>;

export default CreateCourseForm;
