import course from '~/store/course';

describe('post new course', () => {
  beforeEach(done => {
    course.name = 'ksjdfls';
    course.title = 'kdjflsdf';
    course.users = ['sf', 'sdkfjsdf', 'slffds'];

    course.submit().then(done);
  });

  it('will fail.', () => {
    expect(course.loading.state).toEqual('failed');
  });
});
