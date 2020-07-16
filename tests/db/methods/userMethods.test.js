import User from '../../../src/db/models/userModel';

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

describe('user methods', () => {
  let user;

  beforeEach(() => {
    user = new User(userDTO);
  });

  it('toJSON should provide json object', async () => {
    const jsonUser = user.toJSON();
    expect(jsonUser._id).toBeDefined();
    expect(jsonUser.admin).toBe(false);
    expect(jsonUser.email).toBe(userDTO.email);
    expect(jsonUser.name).toBe(userDTO.name);
    expect(jsonUser.lastName).toBe(userDTO.lastName);
    expect(jsonUser.birthDate).toBe(userDTO.birthDate);
    expect(jsonUser.conutry).toBe(userDTO.conutry);
    expect(jsonUser.city).toBe(userDTO.city);
    expect(jsonUser.conutry).toBe(userDTO.conutry);
  });

  it('fullName should provide full name', async () => {
    const fullName = user.fullName();
    expect(fullName).toBe(`${userDTO.name} ${userDTO.lastName}`);
  });
});
