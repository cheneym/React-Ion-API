/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('request');
const User = require('../../db/models/userModel.js');
// const Project = require('../../db/models/projectModel.js');

const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;

const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
const after = mocha.after;

describe('Auth Routes', () => {
  before((done) => {
    User.remove({}, (err) => {
      expect(err).to.not.exist;
      User.create({
        username: 'Cheney',
        password: 'notsafe',
      }, (err3) => {
        expect(err3).to.not.exist;
        done();
      });
      // const options = {
      //   method: 'GET',
      //   uri: `${host}/api/project/logout`,
      // };
      // request(options, (err2) => {
      //   if (err2) { console.error(err2); }
      // });
    });
  });

  after((done) => {
    User.remove({}, (err) => {
      expect(err).to.not.exist;
      done();
    });
  });

  const requestWithSession = request.defaults({ jar: true });
  describe('POST /login ', () => {
    it('Rejects user with wrong password', (done) => {
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
        expect(err2).to.not.exist;
        expect(body.errorMessage).to.equal('Unauthorized');
        expect(res.statusCode).to.equal(401);
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
        expect(res.statusCode).to.equal(200);
        expect(body.data.username).to.equal('Cheney');
        done();
      });
    });
  });

  describe('POST /signup ', () => {
    it('Signs new user up and creates session', (done) => {
      const options = {
        method: 'POST',
        followAllRedirects: true,
        uri: `${host}/signup`,
        json: {
          username: 'Cheney1',
          password: 'notsafe',
        },
      };
      requestWithSession(options, (err2, res, body) => {
        expect(err2).to.not.exist;
        expect(res.statusCode).to.equal(200);
        expect(body.data.username).to.equal('Cheney1');
        done();
      });
    });

    it('Returns 400 when user already exists', (done) => {
      const options = {
        method: 'POST',
        followAllRedirects: true,
        uri: `${host}/signup`,
        json: {
          username: 'Cheney1',
          password: 'asd',
        },
      };
      requestWithSession(options, (err2, res) => {
        expect(err2).to.not.exist;
        expect(res.statusCode).to.equal(400);
        done();
      });
    });
  });

  // describe('GET /logout ', () => {
  //   it('Signs user out and destroys session', (done) => {
  //     const options = {
  //       method: 'GET',
  //       uri: `${host}/logout`,
  //       json: {},
  //     };
  //     requestWithSession(options, (err, res, body) => {
  //       expect(err).to.not.exist;
  //       expect(res.statusCode).to.equal(200);
  //       expect(body.data).to.exist;
  //       done();
  //     });
  //   });
  // });

  describe('GET /authenticate ', () => {
    it('returns 200 if user is authenticated', (done) => {
      const options = {
        method: 'POST',
        followAllRedirects: true,
        uri: `${host}/login`,
        json: {
          username: 'Cheney',
          password: 'notsafe',
        },
      };
      requestWithSession(options, (err, res, body) => {
        const token = body.data.token;
        expect(err).to.not.exist;
        const options2 = {
          method: 'GET',
          uri: `${host}/authenticate`,
          json: {},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        requestWithSession(options2, (err2, res2, body2) => {
          expect(err2).to.not.exist;
          expect(res2.statusCode).to.equal(200);
          expect(body2.data).to.exist;
          done();
        });
      });
    });

    it('returns 401 if user is not authenticated', (done) => {
      const options = {
        method: 'GET',
        uri: `${host}/authenticate`,
        json: {},
      };
      requestWithSession(options, (err, res, body) => {
        expect(err).to.not.exist;
        expect(res.statusCode).to.equal(401);
        expect(body.errorCode).to.equal(401);
        done();
      });
    });
  });
});
