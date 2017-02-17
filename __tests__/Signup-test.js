import React from 'react';
import Signup from '../src/components/Signup';
import Context from '../src/components/Context';
import { shallow } from 'enzyme';

test('jest Signup snapshot test', () => {
  expect(shallow(<Context><Signup /></Context>)).toMatchSnapshot();
});
