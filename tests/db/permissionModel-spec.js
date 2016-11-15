/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const Permission = require('../../db/models/permissionModel.js');

const describe = mocha.describe;
const it = mocha.it;

describe('Permission Model', () => {
  describe('Permission get: ', () => {
    it('Gets all permissions if passed empty object', (done) => {
      Permission.find({}, (err, permissions) => {
        expect(err).to.not.exist;
        expect(permissions.length).to.equal(4);
        done();
      });
    });

    it('Uses object as search query when passed object with properties', (done) => {
      Permission.find({ id: 2 }, (err, permissions) => {
        expect(err).to.not.exist;
        expect(permissions.length).to.equal(1);
        expect(permissions[0].id).to.equal(2);
        expect(permissions[0].name).to.equal('Normal');
        done();
      });
    });
  });
});
