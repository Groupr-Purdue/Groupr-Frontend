import React from 'react';
import Login from '~/components/Login';
import { render } from 'enzyme';

test('jest Login incremental snapshot test', () => {
  expect(<Login />).toMatchSnapshot();
});


// TODO Test loginUser from  user store