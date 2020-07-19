import sessionCreator from '../../../../../src/business/services/authServices/sessionCreator';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import {
  validUserDTO,
  validLogIn,
  invalidLogIn,
} from '../../../../utils/userTestUtils';
import userCreator from '../../../../../src/business/services/authServices/userCreator';
import BusinessValidationError from '../../../../../src/complements/exceptions/BusinessValidationError';

describe('sessionCreator service', () => {
  beforeAll(async () => {
    await dbConnect();
    await userCreator(validUserDTO);
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should return valid session object', async () => {
    const session = await sessionCreator(validLogIn);
    expect(Object.keys(session)).toEqual(
      expect.arrayContaining([
        'token',
        'name',
        'lastName',
        'subscription',
        'admin',
      ])
    );
  });

  it('should reject invalid log in data', async () => {
    await expect(sessionCreator(invalidLogIn)).rejects.toThrow(
      BusinessValidationError
    );
  });

  it('should validate bad password', async () => {
    await expect(
      sessionCreator({ ...validLogIn, password: '1' })
    ).rejects.toThrow(BusinessValidationError);
  });
});
