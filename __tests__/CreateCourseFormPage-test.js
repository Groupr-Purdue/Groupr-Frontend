import React from 'react';
import CreateCourseForm from '../src/components/CreateCourseForm';
import Context from '../src/components/Context';
import { shallow } from 'enzyme';

test('jest CreateCourseForm snapshot test', () => {
  expect(shallow(<Context><CreateCourseForm /></Context>)).toMatchSnapshot();
});
