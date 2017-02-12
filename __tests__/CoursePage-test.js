import React from 'react';
import renderer from 'react-test-renderer';
import CoursePage from '../src/components/CoursePage';

test('jest CoursePage snapshot test', () => {
  const tree = renderer.create(<CoursePage params={{ id: 1 }} />).toJSON();

  expect(tree).toMatchSnapshot();
});
