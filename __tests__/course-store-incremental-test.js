import React from 'react';
import { NakedCoursesPage as CoursePage } from '~/components/CoursesPage';
import course, { fetchCourse } from '~/store/course';

test('jest CoursesPages incremental snapshot test', () => {
  expect(<CoursePage />).toMatchSnapshot();
});

describe('CoursePage after loading course 1', () => {
  beforeEach(done => {
    fetchCourse({ params: { id: '1' } }).then(done);
  });

  it('should have the course name.', () => {
    expect(course.name).toEqual('CS 407');
  });

  it('should have the course title.', () => {
    expect(course.title).toEqual('Senior Project');
  });

  it('should have no students.', () => {
    expect(course.users.length).toEqual(0);
  });
});
