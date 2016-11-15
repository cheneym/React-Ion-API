/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('request');

const User = require('../../db/models/userModel.js');
const Project = require('../../db/models/projectModel.js');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('Project Routes', () => {
  beforeEach((done) => {
    done();
  });

  after((done) => {
    done();
  });

  describe('Project creation: ', () => {
    it('Does not add invalid users to database', (done) => {
      done();
    });

    it('Adds valid users to database and returns user', (done) => {
      done();
    });
  });
});
