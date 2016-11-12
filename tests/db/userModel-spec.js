/* eslint-disable no-unused-expressions */
// uses usernames 'gold', 'silver', 'copper';

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
    User.remove({ username: 'gold' }, (err) => {
      if (err) { console.error(err); }
      User.remove({ username: 'silver' }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ username: 'copper' }, (err3) => {
          if (err3) { console.error(err3); }
          done();
        });
      });
    });
  });

  after((done) => {
    User.remove({ username: 'gold' }, (err) => {
      if (err) { console.error(err); }
      User.remove({ username: 'silver' }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ username: 'copper' }, (err3) => {
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
        User.get({}, (err2, users) => {
          expect(err2).to.not.exist;
          expect(users.length).to.not.equal(0);
          console.log(users[0].username);
          expect(users[0].username).to.equal('gold');
          done();
        });
      });
    });
  });

  describe('User Update: ', () => {
    it('Does not add or remove users from database', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        const newUser2 = {};
        Object.assign(newUser2, newUser);
        newUser2.password = 'notRandom';
        User.update(newUser2, (err2) => {
          expect(err2).to.not.exist;
          User.get({}, (err3, users) => {
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
        const newUser2 = Object.assign(newUser);
        newUser2.password = 'notRandom';
        User.update(newUser2, (err2) => {
          expect(err2).to.not.exist;
          User.get({}, (err3, users) => {
            expect(err3).to.not.exist;
            expect(users[0].password).to.equal('notRandom');
            done();
          });
        });
      });
    });
  });

  describe('User get: ', () => {
    const newUser3 = {};
    Object.assign(newUser3, newUser);
    newUser3.username = 'silver';
    const newUser4 = {};
    Object.assign(newUser4, newUser);
    newUser4.username = 'copper';

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
            User.get({ username: 'silver' }, (err4, users) => {
              expect(err4).to.not.exist;
              expect(users.length).to.equal(1);
              expect(users[0].username).to.equal('silver');
              done();
            });
          });
        });
      });
    });
  });

  describe('User remove: ', () => {
    const newUser3 = {};
    Object.assign(newUser3, newUser);
    newUser3.username = 'silver';

    it('Removes user based on search query when passed object with properties', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.create(newUser3, (err2) => {
          expect(err2).to.not.exist;
          User.remove({ username: 'gold' }, (err3) => {
            expect(err3).to.not.exist;
            User.get({}, (err4, users) => {
              expect(err4).to.not.exist;
              expect(users.length).to.equal(1);
              expect(users[0].username).to.equal('silver');
              done();
            });
          });
        });
      });
    });
  });
});
