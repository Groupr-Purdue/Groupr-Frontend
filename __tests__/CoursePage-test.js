import React from 'react';
import { CoursePage } from '../src/components/CoursePage';
import Context from '../src/components/Context';
import { shallow } from 'enzyme';

test('jest CoursesPages snapshot test', () => {
  expect(shallow(<Context><CoursePage /></Context>)).toMatchSnapshot();
});
