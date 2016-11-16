/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('request');
const User = require('../../db/models/userModel.js');
const Project = require('../../db/models/projectModel.js');

const port = process.env.PORT || 8080;
const host = `http://localhost:${port}`;

const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
const after = mocha.after;

describe('Auth Routes', () => {
  before((done) => {
    const options = {
      method: 'GET',
      uri: `${host}/api/project/logout`,
    };
    request(options, (err) => {
      if (err) { console.error(err); }
      done();
    });
  });

  after((done) => {
    const options = {
      method: 'GET',
      uri: `${host}/api/project/logout`,
    };
    User.remove({ salt: 'notasalt' }, (err) => {
      if (err) { console.error(err); }
      request(options, (err2) => {
        if (err2) { console.error(err2); }
        done();
      });
    });
  });

  describe('POST /login ', () => {
    // const requestWithSession = request.defaults({ jar: true });
    // beforeEach((done) => {
    //   User.create({
    //   });
    // });

    it('Logs user in and creates session', (done) => {
      done();
    });
  });

  describe('POST /signup ', () => {
    it('Signs user up and creates session', (done) => {
      done();
    });
  });

  describe('GET /logout ', () => {
    it('Signs user out and destroys session', (done) => {
      done();
    });
  });
});
