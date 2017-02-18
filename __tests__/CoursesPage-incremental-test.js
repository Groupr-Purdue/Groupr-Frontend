import React from 'react';
import CoursesPage from '~/components/CoursesPage';
import { fetchCourses } from '~/store/courses';
import { render, shallow } from 'enzyme';
import Context from '~/components/Context';

test('jest CoursesPages incremental snapshot test', () => {
  expect(shallow(<CoursesPage />)).toMatchSnapshot();
});

describe('CoursesPage after loading course 1', () => {
  beforeEach(done => {
    fetchCourses().then(done);
  });

  it('should have the correct course 1 name and title.', () => {
    expect(
      render(<Context><CoursesPage /></Context>).find('#course_0').text()
    ).toMatchSnapshot();
  });
});
