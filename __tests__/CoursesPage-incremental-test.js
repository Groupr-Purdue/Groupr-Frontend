import React from 'react';
import { NakedCoursesPage as CoursesPage } from '../src/components/CoursesPage';

test('jest CoursesPages snapshot test', () => {
  expect(<CoursesPage />).toMatchSnapshot();
});
