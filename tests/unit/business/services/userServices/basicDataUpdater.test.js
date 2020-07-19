import userCreator from '../../../../../src/business/services/authServices/userCreator';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import { validUserDTO } from '../../../../utils/userTestUtils';
import basicDataUpdater from '../../../../../src/business/services/userServices/basicDataUpdater';

describe('basicDataUpdater service', () => {
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

  it('should return valid user object', async () => {
    const user = await basicDataUpdater({});
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
});
