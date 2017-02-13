import courses, { fetchCourses } from '../src/store/courses';

describe('courses store', function(){
  fetch.mock('*', JSON.stringify([{ name: 'CS 352' }]));

  beforeEach(done => {
    fetchCourses().then(done).catch(err => console.log(err));
  });

  it('has more than one course', () => {
    expect(courses.list.length).toBeGreaterThan(0);
  });

  it('has a first class with name CS 352', () => {
    expect(courses.list[0].name).toBe('CS 352');
  });
});
