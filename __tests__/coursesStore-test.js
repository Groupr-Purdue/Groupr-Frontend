import courses, { fetchCourses } from '../src/store/courses';

const mockJSON = ret => new Promise(res1 => ({
  json: () => res1(new Promise(res2 => res2(ret))),
}));

global.fetch = url => {
  if (url.indexOf('courses') !== -1) return mockJSON([{ name: 'CS 352' }]);
  return Promise(resolve => resolve({}));
};

describe('courses store', function(){
  beforeEach(done => {
    fetchCourses().then(done);
  });
  
  it('check to see if list of courses has length', () => {
    expect(courses.list.length).toBeGreaterThan(0);
  });

  it('updates the courses info', () => {
    expect(courses.list[0].name).toBe('CS 352');
  })
});
