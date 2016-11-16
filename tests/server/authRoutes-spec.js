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
      User.create({
        username: 'Cheney',
        password: 'notsafe',
      }, (err2) => {
        expect(err2).to.not.exist;
        done();
      });
    });
  });

  after((done) => {
    User.remove({}, (err) => {
      expect(err).to.not.exist;
      done();
    });
  });

  describe('POST /login ', () => {
    const requestWithSession = request.defaults({ jar: true });
    it('Logs user in and creates session', (done) => {
      const options = {
        method: 'POST',
        followAllRedirects: true,
        uri: `${host}/login`,
        json: {
          username: 'Cheney',
          password: 'wrong',
        },
      };

      requestWithSession(options, (err2, res, body) => {
        expect(body).to.equal('Unauthorized');
        done();
      });
    });

    it('Logs user in and creates session', (done) => {
      const options = {
        method: 'POST',
        followAllRedirects: true,
        uri: `${host}/login`,
        json: {
          username: 'Cheney',
          password: 'notsafe',
        },
      };

      requestWithSession(options, (err2, res, body) => {
        expect(err2).to.not.exist;
        console.log(body);
        expect(body).to.not.equal('Failed to authenticate user');
        done();
      });
    });
  });

  describe('POST /signup ', () => {
    it('Signs user up and creates session', (done) => {
      done();
    });
  });

  describe('GET /logout ', () => {
    it('Signs user out and destroys session', (done) => {
      const options = {
        method: 'GET',
        uri: `${host}/api/project/logout`,
      };
      User.remove({}, (err) => {
        expect(err).to.not.exist;
        request(options, (err2) => {
          expect(err2).to.not.exist;
          done();
        });
      });
    });
  });
});
