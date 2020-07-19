import userCreator from '../../../../../src/business/services/authServices/userCreator';
import BusinessValidationError from '../../../../../src/complements/exceptions/BusinessValidationError';
import User from '../../../../../src/db/models/userModel';
import { FREE_ROLE } from '../../../../../src/utils/userUtils/subscriptionUtils';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import { validUserDTO } from '../../../../utils/userTestUtils';

describe('userCreator service', () => {
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

  it('should return valid user object', async () => {
    const user = await userCreator(validUserDTO);
    expect(Object.keys(user)).toEqual(
      expect.arrayContaining([
        '_id',
        'admin',
        'birthDate',
        'city',
        'country',
        'createdAt',
        'email',
        'lastName',
        'name',
        'subscription',
      ])
    );
  });

  it('should save a new user given valid userDTO', async () => {
    await userCreator(validUserDTO);
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
    await userCreator(validUserDTO);
    await expect(userCreator(validUserDTO)).rejects.toThrow(
      BusinessValidationError
    );
  });
});
