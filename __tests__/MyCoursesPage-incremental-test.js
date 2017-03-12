import React from 'react';
import CoursesPage from '~/components/MyCoursesPage';
import myCourses from '~/store/myCourses';
import { render, shallow } from 'enzyme';

test('jest MyCoursesPages incremental snapshot test', () => {
  expect(shallow(<CoursesPage />)).toMatchSnapshot();
});

describe('MyCoursesPage after loading course 1 with test user', () => {
  beforeEach(done => {
    myCourses.fetch().then(done);
  });

  it('should have the correct course 1 name and title.', () => {
    expect(
      render(<CoursesPage />).find('#course_0').text()
    ).toMatchSnapshot();
  });
});
