const validUserDTO = {
  email: 'johndoe@gmail.com',
  password: '1234567',
  name: 'John',
  lastName: 'Doe',
  birthDate: '1995-03-03',
  country: 'CO',
  city: 'Bogotá',
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

export { validUserDTO, invalidUserDTO, validLogIn, invalidLogIn };
