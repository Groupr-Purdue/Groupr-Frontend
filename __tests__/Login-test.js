import React from 'react';
import Login from '../src/components/Login';
import Context from '../src/components/Context';
import { shallow } from 'enzyme';

test('jest Login snapshot test', () => {
  expect(shallow(<Context><Login /></Context>)).toMatchSnapshot();
});
