const mocha = require('mocha');
const expect = require('chai').expect;
const User = require('../../db/models/userModel.js');

const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
const after = mocha.after;

describe('User Model', () => {
  const username = 'gold';
  const password = 'hahaha';
  const salt = 'somethingRandom';
  const user = { username, password, salt };

  after((done) => {
    User.remove({ username }, (err) => {
      if (err) { console.err(err); }
      done();
    });
  });

  describe('User creation: ', () => {
    it('Invalidates invalid users', (done) => {
    });

    it('Validates valid users', (done) => {
    });
  });
});
