import userRegistrator from '../../../../src/business/services/authServices/userRegistrator';
import encryptionGenerator from '../../../../src/business/services/utilServices/encryptionGenerator';

describe('encryptionGenerator service', () => {
  it('should encript password', async () => {
    const encryptedPassword = await encryptionGenerator('1234');
    expect(encryptedPassword.length).toBe(60);
  });
});
