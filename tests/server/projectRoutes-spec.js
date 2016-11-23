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

describe('Project Routes', () => {
  let userId;
  let projectId;
  const permissionId = 1;
  const requestWithSession = request.defaults({ jar: true });

  before((done) => {
    const newUser = {
      username: 'Cheney',
      password: 'secret',
    };
    const p1 = {
      name: 'monalisa',
      project_tree: '123',
    };
    const p2 = {
      name: 'starrynight',
      project_tree: '123',
    };
    const p3 = {
      name: 'wavecollage',
      project_tree: '123',
    };
    User.create(newUser, (err, user) => {
      if (err) { console.error(err); }
      userId = user.id;
      const settings = { userId, permissionId };
      Project.create(settings, p1, (err2, project) => {
        projectId = project.id;
        if (err2) { console.error(err2); }
        Project.create(settings, p2, (err3) => {
          if (err3) { console.error(err3); }
          Project.create(settings, p3, (err4) => {
            if (err4) { console.error(err4); }
            const options = {
              method: 'POST',
              followAllRedirects: true,
              uri: `${host}/login`,
              json: {
                username: 'Cheney',
                password: 'secret',
              },
            };

            requestWithSession(options, (err5) => {
              expect(err5).to.not.exist;
              done();
            });
          });
        });
      });
    });
  });

  after((done) => {
    Project.remove({ project_tree: '123' }, (err) => {
      if (err) { console.error(err); }
      User.remove({ username: 'Cheney' }, (err2) => {
        if (err2) { console.error(err2); }
        const options = {
          method: 'GET',
          uri: `${host}/logout`,
        };
        requestWithSession(options, (err3) => {
          expect(err3).to.not.exist;
          done();
        });
      });
    });
  });

  describe('GET /api/project/ ', () => {
    it('Gets all projects from database', (done) => {
      const options = {
        method: 'GET',
        uri: `${host}/api/project`,
        json: {},
      };
      requestWithSession(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.data.length).to.be.above(2);
        done();
      });
    });
  });

  describe('POST /api/project/ ', () => {
    it('Adds project to database and returns new object', (done) => {
      const options = {
        method: 'POST',
        uri: `${host}/api/project`,
        json: {
          projectProps: {
            name: 'gundam',
            project_tree: '123',
          },
          permissionId,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };
      requestWithSession(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.data.name).to.equal('gundam');
        Project.find({ project_tree: '123' }, (err, projects) => {
          expect(err).to.not.exist;
          expect(projects.length).to.equal(4);
          done();
        });
      });
    });
  });

  describe('GET /api/project/:projectId ', () => {
    it('Gets one project from database', (done) => {
      const options = {
        method: 'GET',
        uri: `${host}/api/project/${projectId}/`,
        json: {},
      };
      requestWithSession(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.data.name).to.equal('monalisa');
        done();
      });
    });
    it('Returns null if invalid id', (done) => {
      const options = {
        method: 'GET',
        uri: `${host}/api/project/154894845/`,
        json: {},
      };
      requestWithSession(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.data).to.not.exist;
        done();
      });
    });
  });

  describe('PUT /api/project/:projectId ', () => {
    it('Updates a project from database', (done) => {
      const options = {
        method: 'PUT',
        uri: `${host}/api/project/${projectId}/`,
        json: {
          name: 'heaven',
        },
      };
      requestWithSession(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.data[0].name).to.equal('heaven');
        done();
      });
    });
    it('Returns empty array if invalid id', (done) => {
      const options = {
        method: 'PUT',
        uri: `${host}/api/project/154894845/`,
        json: {},
      };
      requestWithSession(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.data.length).to.equal(0);
        done();
      });
    });
  });

  describe('DELETE /api/project/:projectId ', () => {
    it('Removes one project from database', (done) => {
      const options = {
        method: 'DELETE',
        uri: `${host}/api/project/${projectId}/`,
        json: {},
      };
      requestWithSession(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.data[0].name).to.equal('heaven');
        const options2 = {
          method: 'GET',
          uri: `${host}/api/project/${projectId}/`,
          json: {},
        };
        requestWithSession(options2, (error2, res2, body2) => {
          expect(error2).to.not.exist;
          expect(body2.data).to.not.exist;
          done();
        });
      });
    });
    it('Returns empty array if invalid id', (done) => {
      const options = {
        method: 'DELETE',
        uri: `${host}/api/project/154894845/`,
        json: {},
      };
      requestWithSession(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.data.length).to.equal(0);
        done();
      });
    });
  });
});
