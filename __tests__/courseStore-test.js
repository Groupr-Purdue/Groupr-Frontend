import course, { fetchCourse } from '../src/store/course';


describe('course store', () => {
  fetch
  .get('glob:*/courses/*', JSON.stringify({ name: 'CS 352' }))
  .get('glob:*/users', JSON.stringify([{ id: '1' }]));

  beforeEach(done => {
    fetchCourse({ params: { id: 1 } }).then(done);
  });

  it('updates the course info', () => {
    expect(course.name).toBe('CS 352');
  });

  it('updates the users', () => {
    expect(course.users.length).toBeGreaterThan(0);
  });
});
