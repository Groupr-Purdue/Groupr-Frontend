import React from 'react';
import renderer from 'react-test-renderer';
import CoursesPages from '../src/components/CoursesPage';

test('jest CoursePages snapshot test', () => {
  const tree = renderer.create(<CoursesPage />).toJSON();

  expect(tree).toMatchSnapshot();
});
