import React from 'react';
import renderer from 'react-test-renderer';
import Signup from '../src/components/Signup';

test('jest Signup snapshot test', () => {
  const tree = renderer.create(<Signup />).toJSON();

  expect(tree).toMatchSnapshot();
});
