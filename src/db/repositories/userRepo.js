const { default: User } = require('../models/userModel');

const findUser = async (filter, projection, options) => {
  const user = await User.findOne(filter, projection, options);
  return user;
};

export default {
  findUser,
};
