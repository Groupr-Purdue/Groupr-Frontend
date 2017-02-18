import React from 'react';
import { NakedCoursesPage as CoursePage } from '~/components/CoursesPage';
import { fetchCourse } from '~/store/course';
import { render } from 'enzyme';
import Context from '~/components/Context';

test('jest CoursesPages incremental snapshot test', () => {
  expect(<CoursePage />).toMatchSnapshot();
});

describe('CoursePage after loading course 1', () => {
  beforeEach(done => {
    fetchCourse({ params: { id: '1' } }).then(done);
  });

  it('should have the course name.', () => {
    expect(
      render(<Context><CoursePage /></Context>).find('#course_name').text()
    ).toEqual('CS 407');
  });

  it('should have the course title.', () => {
    expect(
      render(<Context><CoursePage /></Context>).find('#course_title').text()
    ).toEqual('Senior Project');
  });
});
