import React from 'react';
import Signup from '~/components/Signup';
import { render } from 'enzyme';

test('jest Signup incremental snapshot test', () => {
  expect(<Signup />).toMatchSnapshot();
});

// TODO Test signupUser from  user store