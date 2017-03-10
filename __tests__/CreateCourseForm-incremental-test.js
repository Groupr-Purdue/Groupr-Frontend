import React from 'react';
import CreateCourseForm, { handleClick } from '~/components/CreateCourseForm';
import { shallow } from 'enzyme';
import course from '~/store/createForm';

let routeChanged = false;

jest.mock('~/store/router', { push: () => routeChanged = true });

test('jest CreateCourseForm incremental snapshot test', () => {
  expect(shallow(<CreateCourseForm />)).toMatchSnapshot();
});

describe('CreateCourseForm submitting form', () => {
  beforeEach(done => {
    course.name = 'ksjdfls';
    course.title = 'kdjflsdf';
    course.users = ['sf', 'sdkfjsdf', 'slffds'];
    handleClick.then(done);
  });

  it('should try to go to cousre route.', () => {
    expect(routeChanged).toEqual(true);
  });
});
