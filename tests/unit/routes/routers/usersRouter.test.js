import usersRouter from '../../../../src/routes/routers/usersRouter';

const paths = ['/me/basic-data'];

describe('auth router', () => {
  it('should implement paths correctly', async () => {
    usersRouter.stack.forEach(({ route }) => {
      expect(paths).toContainEqual(route.path);
    });
  });
});
