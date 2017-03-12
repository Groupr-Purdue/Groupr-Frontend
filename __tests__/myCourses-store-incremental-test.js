import courses from '~/store/myCourses';

describe('myCourses store with test user', () => {
  beforeEach(done => {
    courses.fetch().then(done);
  });

  it('should have more than 0 courses.', () => {
    expect(courses.list.length).toBeGreaterThan(0);
  });

  it('should have the correct course name for the first course.', () => {
    expect(courses.list[0].name).toEqual('CS 407');
  });

  it('should have the correct course title.', () => {
    expect(courses.list[0].title).toEqual('Senior Project');
  });
});
