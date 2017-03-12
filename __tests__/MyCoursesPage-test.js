import React from 'react';
import CoursesPage from '../src/components/MyCoursesPage';
import { shallow } from 'enzyme';

test('jest MyCoursesPages snapshot test', () => {
  expect(shallow(<CoursesPage />)).toMatchSnapshot();
});
