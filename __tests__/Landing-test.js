import React from 'react';
import Context from '../src/components/Context';
import Landing from '../src/components/Login';
import { shallow } from 'enzyme';

test('jest Landing snapshot test', () => {
  expect(shallow(<Context><Landing/></Context>)).toMatchSnapshot();
 });
