import { BASIC_ROLE } from '../../src/utils/userUtils/subscriptionUtils';

const validUserDTO = {
  email: 'johndoe@gmail.com',
  password: '1234567',
  name: 'John',
  lastName: 'Doe',
  birthDate: '1995-03-03',
  country: 'CO',
  city: 'Bogotá',
};

const validAdminDTO = {
  email: 'admin@cms.com',
  password: '1234567',
  name: 'Admin',
  lastName: 'CMS',
  birthDate: '1995-03-03',
  country: 'CO',
  city: 'Bogotá',
  admin: true,
};

const invalidUserDTO = {
  email: 'j',
  password: '1',
  name: 'J',
  lastName: 'D',
  birthDate: '03-03-1995',
  country: 'COLOMBIA',
  city: 'B',
};

const validLogIn = {
  email: 'johndoe@gmail.com',
  password: '1234567',
};

const invalidLogIn = {
  email: 'j',
  password: '123',
};

const validUpdateUser = {
  birthDate: '1994-03-05',
  city: 'Medellín',
  password: '7654321',
  country: 'US',
  email: 'newuser@gmail.com',
  name: 'newName',
  lastName: 'newLastName',
};

const validUpdateData = {
  subscription: {
    role: BASIC_ROLE,
  },
  password: '7654321',
};

export {
  validUserDTO,
  invalidUserDTO,
  validLogIn,
  invalidLogIn,
  validUpdateUser,
  validAdminDTO,
  validUpdateData,
};
