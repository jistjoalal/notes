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


// const add = (a, b) => {
//   if (typeof b !== 'number') return a + a;
//   return a + b;
// }

// const square = n => n * n;

// describe('add', function() {
//   it('should add two numbers', function() {
//     const res = add(2,3);
//     assert.equal(res, 5);
//   });

//   it('should double single number', function() {
//     const res = add(3);
//     assert.equal(res, 6);
//   });
// });

// describe('square', function() {
//   it('should square number', function() {
//     const res = square(4);
//     assert.equal(res, 16);
//   });
// });
