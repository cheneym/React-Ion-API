const mocha = require('mocha');
const expect = require('chai').expect;
const User = require('../../db/models/userModel.js');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('User Model', () => {
  const username = 'gold';
  const password = 'hahaha';
  const salt = 'somethingRandom';
  const newUser = { username, password, salt };

  beforeEach((done) => {
    User.remove(username, (err) => {
      if (err) { console.error(err); }
      done();
    });
  });

  after((done) => {
    User.remove(username, (err) => {
      if (err) { console.error(err); }
      done();
    });
  });

  describe('User creation: ', () => {
    it('Does not add invalid users to database', (done) => {
      User.create({ username: '123' }, (err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('Adds valid users to database', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.get((err, users) => {
          expect(err).to.not.exist;
          expect(users.length).equal(1);
          expect(users[0].username).to.equal('gold');
          done();
        });
      });
    });
  });

  describe('User Update: ', () => {
    it('Does not add or remove users from database', (done) => {
      done();
    });

    it('Updates existing users from database', (done) => {
      done();
    });
  });

  // describe('User creation: ', () => {
  //   it('Does not add invalid users to database', (done) => {
  //     done();
  //   });

  //   it('Adds valid users to database', (done) => {
  //     done();
  //   });
  // });
});
