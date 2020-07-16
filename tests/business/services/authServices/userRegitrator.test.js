import userRegistrator from '../../../../src/business/services/authServices/userRegistrator';
import User from '../../../../src/db/models/userModel';
import { dbConnect, removeAllCollections, dbClose } from '../../../utils';
import { FREE_ROLE } from '../../../../src/utils/userUtils/subscriptionUtils';
import responseFormatter from '../../../../src/complements/helpers/responseFormatter';
import BusinessValidationError from '../../../../src/complements/exceptions/BusinessValidationError';

const validUserDTO = {
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
  beforeAll(async () => {
    await dbConnect();
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should save a new user given valid userDTO', async () => {
    const data = await userRegistrator(validUserDTO);
    expect(data).toStrictEqual(
      responseFormatter(null, 'Usuario craedo correctamente')
    );
    const newUser = await User.findOne({ email: validUserDTO.email });
    expect(newUser.admin).toBe(false);
    expect(newUser.subscription.role).toBe(FREE_ROLE);
    expect(newUser.email).toBe(validUserDTO.email);
    expect(newUser.password.length).toBe(60);
    expect(newUser.name).toBe(validUserDTO.name);
    expect(newUser.lastName).toBe(validUserDTO.lastName);
    expect(newUser.country).toBe(validUserDTO.country);
    expect(newUser.city).toBe(validUserDTO.city);
    const formatDate = new Date(validUserDTO.birthDate);
    expect(newUser.birthDate).toStrictEqual(formatDate);
  });

  it('should throw exception given existing userDTO', async () => {
    await userRegistrator(validUserDTO);
    await expect(userRegistrator(validUserDTO)).rejects.toThrow(
      BusinessValidationError
    );
  });
});
