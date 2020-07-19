const sessionTemplate = (user, token) => ({
  token,
  env: process.env.NODE_ENV,
  ...user,
});
export default sessionTemplate;
