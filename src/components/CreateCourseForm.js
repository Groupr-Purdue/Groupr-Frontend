import React from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  Divider,
  TextField,
  FloatingActionButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import router from '~/store/router';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import course from '~/store/courseForm';
import loadingWrapper from '~/util/loadingWrapper';

const handleSubmit = () => {
  course.submit().then(({ id }) => router.push(`/courses/${id}`));
};

const CreateCourseForm = (): Element =>
  <div>
    <Row center='xs'>
      <Col xs={12} sm={6} md={6} lg={6} >
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
                  floatingLabelText='Course Title'
                  hintText='Intro to Smoke Testing'
                  onChange={(ev, value) => course.title = value} />
              </Row>
              <Row>
                <TextField fullWidth={true}
                  floatingLabelText='Course Name'
                  hintText='CS 420'
                  onChange={(ev, value) => course.name = value} />
              </Row>
              <Row start='xs'>
                <TextField fullWidth={true}
                  floatingLabelText='White List'
                  hintText='jshmoe, morecareeraccounts...'
                  multiLine={true}
                  onChange={(ev, value) => course.users = value} />
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

export default loadingWrapper(CreateCourseForm, course.loading);
