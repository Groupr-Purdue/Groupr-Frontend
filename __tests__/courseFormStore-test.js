import course from '../src/store/courseForm';

describe('create course', () => {
  fetch.post(/^.*\/register$/,
    JSON.stringify(
      {
        enrollment: 1,
        id: 8,
        name: 'CS 408',
        title: 'Testing',
      }
    ));

  beforeEach(done => {
    course.name = 'CS 408';
    course.title = 'Testing';
    course.users = ['sldf'];
    course.submit().then(done);
  });

  it('has more than one course', () => {
    expect(course.loading.state).toEqual('loaded');
  });
});
