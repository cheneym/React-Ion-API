/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const User = require('../../db/models/userModel.js');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('User Model', () => {
  const id = 1;
  const newUser = { id };

  beforeEach((done) => {
    User.remove({ id: 1 }, (err) => {
      if (err) { console.error(err); }
      User.remove({ id: 2 }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ id: 3 }, (err3) => {
          if (err3) { console.error(err3); }
          done();
        });
      });
    });
  });

  after((done) => {
    User.remove({ id: 1 }, (err) => {
      if (err) { console.error(err); }
      User.remove({ id: 2 }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ id: 3 }, (err3) => {
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
          expect(users[0].id).to.equal(1);
          done();
        });
      });
    });
  });

  // describe('User Update: ', () => {
  //   it('Does not add or remove users from database', (done) => {
  //     User.create(newUser, (err) => {
  //       expect(err).to.not.exist;

  //       User.update(newUser, (err2) => {
  //         expect(err2).to.not.exist;
  //         User.get({}, (err3, users) => {
  //           expect(err3).to.not.exist;
  //           expect(users.length).to.not.equal(0);
  //           done();
  //         });
  //       });
  //     });
  //   });

  //   it('Updates existing users from database', (done) => {
  //     User.create(newUser, (err) => {
  //       expect(err).to.not.exist;
  //       User.update(newUser, (err2) => {
  //         expect(err2).to.not.exist;
  //         User.get({}, (err3, users) => {
  //           expect(err3).to.not.exist;
  //           expect(users[0].password).to.equal('notRandom');
  //           done();
  //         });
  //       });
  //     });
  //   });
  // });

  describe('User get: ', () => {
    const newUser3 = { id: 2 };
    const newUser4 = { id: 3 };

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
            User.get({ id: 2 }, (err4, users) => {
              expect(err4).to.not.exist;
              expect(users.length).to.equal(1);
              expect(users[0].id).to.equal(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('User remove: ', () => {
    const newUser3 = { id: 2 };

    it('Removes user based on search query when passed object with properties', (done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.create(newUser3, (err2) => {
          expect(err2).to.not.exist;
          User.remove({ id: 1 }, (err3) => {
            expect(err3).to.not.exist;
            User.get({}, (err4, users) => {
              expect(err4).to.not.exist;
              expect(users.length).to.equal(1);
              expect(users[0].id).to.equal(2);
              done();
            });
          });
        });
      });
    });
  });
});
