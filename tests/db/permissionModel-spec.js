/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const Permission = require('../../db/models/permissionModel.js');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('Permission Model', () => {
  const newPermission = { id: 1, name: 'admin' };
  const newPermission3 = { id: 2, name: 'normal' };
  const newPermission4 = { id: 3, name: 'special' };

  beforeEach((done) => {
    Permission.remove({ id: 1 }, (err) => {
      if (err) { console.error(err); }
      Permission.remove({ id: 2, name: 'normal' }, (err2) => {
        if (err2) { console.error(err2); }
        Permission.remove({ id: 3, name: 'special' }, (err3) => {
          if (err3) { console.error(err3); }
          done();
        });
      });
    });
  });

  after((done) => {
    Permission.remove({ id: 1 }, (err) => {
      if (err) { console.error(err); }
      Permission.remove({ id: 2 }, (err2) => {
        if (err2) { console.error(err2); }
        Permission.remove({ id: 3 }, (err3) => {
          if (err3) { console.error(err3); }
          Permission.create({ id: 1, name: 'admin' }, (err4) => {
            if (err4) { console.error(err); }
            Permission.create({ id: 2, name: 'normal' }, (err5) => {
              if (err5) { console.error(err2); }
              Permission.create({ id: 3, name: 'special' }, (err6) => {
                if (err6) { console.error(err3); }
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('Permission creation: ', () => {
    it('Does not add invalid permissions to database', (done) => {
      Permission.create({ random: 'nothing' }, (err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('Adds valid permissions to database', (done) => {
      Permission.create(newPermission, (err) => {
        expect(err).to.not.exist;
        Permission.get({}, (err2, permissions) => {
          expect(err2).to.not.exist;
          expect(permissions.length).to.not.equal(0);
          expect(permissions[0].id).to.equal(1);
          done();
        });
      });
    });
  });

  describe('Permission Update: ', () => {
    it('Does not add or remove permissions from database', (done) => {
      Permission.create(newPermission, (err) => {
        expect(err).to.not.exist;

        Permission.update(newPermission, (err2) => {
          expect(err2).to.not.exist;
          Permission.get({}, (err3, permissions) => {
            expect(err3).to.not.exist;
            expect(permissions.length).to.not.equal(0);
            done();
          });
        });
      });
    });

    it('Updates existing permissions from database', (done) => {
      Permission.create(newPermission, (err) => {
        expect(err).to.not.exist;
        Permission.update({ id: 1, name: 'admin1' }, (err2) => {
          expect(err2).to.not.exist;
          Permission.get({}, (err3, permissions) => {
            expect(err3).to.not.exist;
            expect(permissions[0].name).to.equal('admin1');
            done();
          });
        });
      });
    });
  });

  describe('Permission get: ', () => {
    it('Gets all permissions if passed empty object', (done) => {
      Permission.create(newPermission, (err) => {
        expect(err).to.not.exist;
        Permission.create(newPermission3, (err2) => {
          expect(err2).to.not.exist;
          Permission.create(newPermission4, (err3) => {
            expect(err3).to.not.exist;
            Permission.get({}, (err4, permissions) => {
              expect(err4).to.not.exist;
              expect(permissions.length).to.be.above(2);
              done();
            });
          });
        });
      });
    });

    it('Uses object as search query when passed object with properties', (done) => {
      Permission.create(newPermission, (err) => {
        expect(err).to.not.exist;
        Permission.create(newPermission3, (err2) => {
          expect(err2).to.not.exist;
          Permission.create(newPermission4, (err3) => {
            expect(err3).to.not.exist;
            Permission.get({ id: 2 }, (err4, permissions) => {
              expect(err4).to.not.exist;
              expect(permissions.length).to.equal(1);
              expect(permissions[0].id).to.equal(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('Permission remove: ', () => {
    it('Removes permission based on search query when passed object with properties', (done) => {
      Permission.create(newPermission, (err) => {
        expect(err).to.not.exist;
        Permission.create(newPermission3, (err2) => {
          expect(err2).to.not.exist;
          Permission.remove({ id: 1 }, (err3) => {
            expect(err3).to.not.exist;
            Permission.get({}, (err4, permissions) => {
              expect(err4).to.not.exist;
              expect(permissions.length).to.equal(1);
              expect(permissions[0].id).to.equal(2);
              done();
            });
          });
        });
      });
    });
  });
});
