import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../src/components/Login';

test('jest Login snapshot test', () => {
  const tree = renderer.create(<Login />).toJSON();

  expect(tree).toMatchSnapshot();
});
