import myCourses from '../src/store/myCourses';

describe('myCourse.fetch', () => {
  fetch.get(/^.*\/courses$/, JSON.stringify([{ name: 'CS 352' }]));

  beforeEach(done => {
    myCourses.ftech().then(done);
  });

  it('has more than one course for the test user', () => {
    expect(myCourses.list.length).toBeGreaterThan(0);
  });

  it('has a first class with name CS 352 for the test user', () => {
    expect(myCourses.list[0].name).toBe('CS 352');
  });
});
