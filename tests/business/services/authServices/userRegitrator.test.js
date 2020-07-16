import userRegistrator from '../../../../src/business/services/authServices/userRegistrator';

const userDTO = {
  email: 'johndoe@gmail.com',
  password: '1234567',
  name: 'John',
  lastName: 'Doe',
  phone: '31111111111',
  location: 'Bogotá, Colombia',
  gender: 'male',
  birthDate: '01/01/1995',
  country: 'CO',
  city: 'Bogotá',
};

describe('userRegistrator service', () => {
  it('return hola', async () => {
    const data = await userRegistrator(userDTO);
    expect(data).toBe(userDTO);
  });
});
