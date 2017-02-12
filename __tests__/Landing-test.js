import React from 'react';
import renderer from 'react-test-renderer';
import Landing from '../src/components/Login';

test('jest Landing snapshot test', () => {
  const tree = renderer.create(<Landing />).toJSON();

  expect(tree).toMatchSnapshot();
});
