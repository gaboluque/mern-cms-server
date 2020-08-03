import moment from 'moment';
import userCreator from '../../../../../src/business/services/authServices/userCreator';
import userUpdater from '../../../../../src/business/services/userServices/userUpdater';
import NotFoundError from '../../../../../src/complements/exceptions/NotFoundError';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import { validUpdateUser, validUserDTO } from '../../../../utils/userTestUtils';
import { mongoId } from '../../../../../src/utils/commonUtils';

describe('userUpdater service', () => {
  let baseUser;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    baseUser = await userCreator(validUserDTO);
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should return valid user object', async () => {
    const user = await userUpdater(validUpdateUser, baseUser._id);
    expect(user.birthDate).toEqual(
      moment(validUpdateUser.birthDate, moment.ISO_8601).format('DD/MM/YYYY')
    );
    expect(user.city).toEqual(validUpdateUser.city);
    expect(user.country).toEqual(validUpdateUser.country);
    expect(user.email).toEqual(validUpdateUser.email);
    expect(user.name).toEqual(validUpdateUser.name);
    expect(user.lastName).toEqual(validUpdateUser.lastName);
  });

  it('should throw wxception on no user found', async () => {
    await expect(userUpdater(validUpdateUser, mongoId())).rejects.toThrow(
      NotFoundError
    );
  });
});
