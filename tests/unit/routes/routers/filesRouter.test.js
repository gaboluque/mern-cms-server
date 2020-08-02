import filesRouter from '../../../../src/routes/routers/filesRouter';

const paths = ['/', '/:fileId'];

describe('auth router', () => {
  it('should implement paths correctly', async () => {
    filesRouter.stack.forEach(({ route }) => {
      expect(paths).toContainEqual(route.path);
    });
  });
});
