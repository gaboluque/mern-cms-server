import {
  FREE_ROLE,
  roleList,
  BASIC_ROLE,
  ESP1_ROLE,
  ESP2_ROLE,
} from '../../../src/utils/userUtils/subscriptionUtils';

describe('subscription utils', () => {
  it('should export roles correctly', async () => {
    expect(roleList).toStrictEqual([
      FREE_ROLE,
      BASIC_ROLE,
      ESP1_ROLE,
      ESP2_ROLE,
    ]);
  });
});
