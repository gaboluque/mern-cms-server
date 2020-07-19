import authRouter from '../../../../src/routes/routers/authRouter';

const paths = ['/auth/sign-up', '/auth/log-in'];

describe('auth router', () => {
  it('should implement paths correctly', async () => {
    authRouter.stack.forEach(({ route }) => {
      expect(paths).toContainEqual(route.path);
    });
  });
});
