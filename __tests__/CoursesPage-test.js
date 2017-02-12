import React from 'react';
import renderer from 'react-test-renderer';
import CoursesPage from '../src/components/CoursesPage';

test('jest CoursesPages snapshot test', () => {
  const tree = renderer.create(<CoursesPage />).toJSON();

  expect(tree).toMatchSnapshot();
});
