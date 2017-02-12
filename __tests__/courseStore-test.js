import course, { fetchCourse } from '../src/store/course';

const mockJSON = ret => new Promise(res1 => ({
  json: () => res1(new Promise(res2 => res2(ret))),
}));

global.fetch = url => {
  if (url.indexOf('courses') !== -1) return mockJSON({ name: 'CS 352' });
  if (url.indexOf('users') !== -1) return mockJSON({ users: [1, 2, 3] });
  return Promise(resolve => resolve({}));
};

describe('course store', function(){
  beforeEach(done => {
    fetchCourse({ params: { id: 1 } }).then(done);
  });

  it('updates the course info', () => {
    expect(course.name).toBe('CS 352');
  })

  it('updates the users', () => {
    expect(course.users.length).toBeGreaterThan(0);
  });
});
