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
  let userId;
  before((done) => {
    const newUser = {
      username: 'Cheney',
      password: 'secret',
      salt: 'notasalt',
    };
    User.create(newUser, (err, user) => {
      if (err) { console.error(err); }
      userId = user.id;
      done();
    });
  });

  after((done) => {
    User.remove({ salt: 'notasalt' }, (err) => {
      if (err) { console.error(err); }
      done();
    });
  });

  describe('POST /login ', () => {
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
