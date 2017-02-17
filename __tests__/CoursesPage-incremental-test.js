import React from 'react';
import { NakedCoursesPage as CoursesPage } from '../src/components/CoursesPage';
import Context from '../src/components/Context';
import { shallow } from 'enzyme';

test('jest CoursesPages snapshot test', () => {
  expect(shallow(<CoursesPage />)).toMatchSnapshot();
});
