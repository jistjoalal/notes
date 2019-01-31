import { assert } from 'chai';

import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('users', function() {
    const testUser = email => ({ emails: [ { address: email } ] })

    it ('should accept valid email', function() {
      const user = testUser('asdf@valid.com')
      const res = validateNewUser(user);
      assert(res);
    });

    it('should reject invalid email', function() {
      const user = testUser('invalid.com')
      const validate = () => validateNewUser(user);
      assert.throws(validate);
    });
  });
}
