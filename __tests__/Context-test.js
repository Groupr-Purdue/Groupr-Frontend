import React from 'react';
import Context from '../src/components/Context';
import { shallow } from 'enzyme';

test('jest CoursesPages snapshot test', () => {
  expect(shallow(<Context />)).toMatchSnapshot();
});
