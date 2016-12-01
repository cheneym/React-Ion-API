/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('request');
const User = require('../../db/models/userModel.js');
const Project = require('../../db/models/projectModel.js');

const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;

const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
const after = mocha.after;

describe('User Routes', () => {
  let userId1;
  let userId2;
  const requestWithSession = request.defaults({ jar: true });

  describe('Get all projects', () => {
    before((done) => {
      User.remove({}, (err) => {
        expect(err).to.not.exist;
        User.create({
          username: 'Cheney',
          password: 'notsafe',
        }, (err3, user1) => {
          expect(err3).to.not.exist;
          userId1 = user1.id;
          User.create({
            username: 'Cheney1',
            password: 'notsafe',
          }, (err4, user2) => {
            userId2 = user2.id;
            expect(err4).to.not.exist;
            const projectSettings1 = {
              userId: userId1,
              permissionId: 1,
            };
            const projectSettings2 = {
              userId: userId2,
              permissionId: 1,
            };
            const projectProps1 = {
              name: 'monalisa',
              project_tree: 'somethingRandom',
            };
            const projectProps2 = {
              name: 'starrynight',
              project_tree: 'somethingRandom',
            };
            const projectProps3 = {
              name: 'tidalwave',
              project_tree: 'somethingRandom',
            };
            const projectProps4 = {
              name: 'starryday',
              project_tree: 'somethingRandom',
            };
            Project.create(projectSettings1, projectProps1, (err5) => {
              expect(err5).to.not.exist;
              Project.create(projectSettings1, projectProps2, (err6) => {
                expect(err6).to.not.exist;
                Project.create(projectSettings1, projectProps3, (err7) => {
                  expect(err7).to.not.exist;
                  Project.create(projectSettings2, projectProps4, (err8) => {
                    expect(err8).to.not.exist;
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    after((done) => {
      User.remove({}, (err2) => {
        expect(err2).to.not.exist;
        Project.remove({ project_tree: 'somethingRandom' }, (err3) => {
          expect(err3).to.not.exist;
          done();
        });
      });
    });

    it('Gets nothing if user is not authenticated', (done) => {
      const options = {
        method: 'GET',
        followAllRedirects: true,
        uri: `${host}/api/user/projects`,
        json: {},
      };
      request(options, (err, res, body) => {
        expect(err).to.not.exist;
        expect(res.statusCode).to.equal(401);
        expect(body.errorMessage).to.equal('No authorization token was found');
        done();
      });
    });

    it('Should get all projects of a user', (done) => {
      const options = {
        method: 'POST',
        followAllRedirects: true,
        uri: `${host}/login`,
        json: {
          username: 'Cheney',
          password: 'notsafe',
        },
      };
      requestWithSession(options, (err2) => {
        expect(err2).to.not.exist;
        const options2 = {
          method: 'GET',
          followAllRedirects: true,
          uri: `${host}/api/user/projects`,
          json: {},
        };
        requestWithSession(options2, (err3, res2, body2) => {
          expect(err3).to.not.exist;
          expect(body2.data.length).to.equal(3);
          done();
        });
      });
    });
  });
});
