/* eslint-disable no-unused-expressions */
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
        User.get((err2, users) => {
          expect(err2).to.not.exist;
          expect(users.length).to.equal(1);
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
        const newUser2 = Object.assign(newUser);
        newUser2.password = 'notRandom';
        User.update(newUser2, (err2) => {
          expect(err2).to.not.exist;
          User.get((err3, users) => {
            expect(err3).to.not.exist;
            expect(users.length).to.equal(1);
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
          User.get((err3, users) => {
            expect(err3).to.not.exist;
            expect(users[0].password).to.equal('notRandom');
            done();
          });
        });
      });
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
