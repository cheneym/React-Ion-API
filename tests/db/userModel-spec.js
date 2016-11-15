/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const User = require('../../db/models/userModel.js');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('User Model', () => {
  const newUser = {
    username: 'neverused',
    password: 'watever',
    salt: 'notasalt',
  };
  const newUser2 = {
    username: 'neverused',
    password: 'watever2',
    salt: 'notasalt',
  };
  const newUser3 = {
    username: 'hahahaha',
    password: 'watever3',
    salt: 'notasalt',
  };
  const newUser4 = {
    username: 'plsdontuse',
    password: 'watever4',
    salt: 'notasalt',
  };

  beforeEach((done) => {
    User.remove({ username: 'neverused' }, (err) => {
      if (err) { console.error(err); }
      User.remove({ username: 'hahahaha' }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ username: 'plsdontuse' }, (err3) => {
          if (err3) { console.error(err3); }
          done();
        });
      });
    });
  });

  after((done) => {
    User.remove({ username: 'neverused' }, (err) => {
      if (err) { console.error(err); }
      User.remove({ username: 'hahahaha' }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ username: 'plsdontuse' }, (err3) => {
          if (err3) { console.error(err3); }
          done();
        });
      });
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
        User.get(newUser, (err2, users) => {
          expect(err2).to.not.exist;
          expect(users.length).to.not.equal(0);
          expect(users[0].username).to.equal('neverused');
          done();
        });
      });
    });
  });

  describe('User Update: ', () => {
    it('Does not add or remove users from database', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.update(newUser2, (err2) => {
          expect(err2).to.not.exist;
          User.get({ username: 'neverused' }, (err3, users) => {
            expect(err3).to.not.exist;
            expect(users.length).to.not.equal(0);
            done();
          });
        });
      });
    });

    it('Updates existing users from database', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.update(newUser2, (err2) => {
          expect(err2).to.not.exist;
          User.get({ username: 'neverused' }, (err3, users) => {
            expect(err3).to.not.exist;
            expect(users[0].password).to.equal('watever2');
            done();
          });
        });
      });
    });
  });

  describe('User get: ', () => {
    it('Gets all users if passed empty object', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.create(newUser3, (err2) => {
          expect(err2).to.not.exist;
          User.create(newUser4, (err3) => {
            expect(err3).to.not.exist;
            User.get({}, (err4, users) => {
              expect(err4).to.not.exist;
              expect(users.length).to.be.above(2);
              done();
            });
          });
        });
      });
    });

    it('Uses object as search query when passed object with properties', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.create(newUser3, (err2) => {
          expect(err2).to.not.exist;
          User.create(newUser4, (err3) => {
            expect(err3).to.not.exist;
            User.get({ username: 'hahahaha' }, (err4, users) => {
              expect(err4).to.not.exist;
              expect(users.length).to.equal(1);
              expect(users[0].password).to.equal('watever3');
              done();
            });
          });
        });
      });
    });
  });

  describe('User remove: ', () => {
    it('Removes user based on search query when passed object with properties', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.create(newUser3, (err2) => {
          expect(err2).to.not.exist;
          User.remove({ username: 'neverused' }, (err3) => {
            expect(err3).to.not.exist;
            User.get({ username: 'neverused' }, (err4, users) => {
              expect(err4).to.not.exist;
              expect(users.length).to.equal(0);
              done();
            });
          });
        });
      });
    });
  });
});
