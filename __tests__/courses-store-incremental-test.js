import courses, { fetchCourses } from '~/store/courses';

describe('CoursePage after loading course 1', () => {
  beforeEach(done => {
    fetchCourses({ params: { id: '1' } }).then(done);
  });

  it('should have no students.', () => {
    expect(courses.list.length).toBeGreaterThan(0);
  });

  it('should have the course name.', () => {
    expect(courses.list[0].name).toEqual('CS 407');
  });

  it('should have the course title.', () => {
    expect(courses.list[0].title).toEqual('Senior Project');
  });
});
