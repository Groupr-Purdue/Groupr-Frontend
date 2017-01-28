import React from 'react';
import renderer from 'react-test-renderer';
test('jest snapshot test', () => {
  let tree = renderer.create(<div> goodbye </div>).toJSON();
  expect(tree).toMatchSnapshot();
});
