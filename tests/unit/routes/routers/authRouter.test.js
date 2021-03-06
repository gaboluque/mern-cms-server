import authRouter from '../../../../src/routes/routers/authRouter';

const paths = ['/sign-up', '/log-in'];

describe('auth router', () => {
  it('should implement paths correctly', async () => {
    authRouter.stack.forEach(({ route }) => {
      expect(paths).toContainEqual(route.path);
    });
  });
});
