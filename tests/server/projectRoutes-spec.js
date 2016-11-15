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
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('Project Routes', () => {
  let userId;
  let projectId;
  const permissionId = 1;
  before((done) => {
    const newUser = {
      username: 'Cheney',
      password: 'secret',
      salt: 'notasalt',
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
            done();
          });
        });
      });
    });
  });

  after((done) => {
    Project.remove({ project_tree: '123' }, (err) => {
      if (err) { console.error(err); }
      User.remove({ salt: 'notasalt' }, (err2) => {
        if (err2) { console.error(err2); }
        done();
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
      request(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.length).to.be.above(2);
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
          projectSettings: { userId, permissionId },
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };
      request(options, (error, res, body) => {
        expect(error).to.not.exist;
        expect(body.name).to.equal('gundam');
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
      request(options, (error, res, body) => {
        expect(body.name).to.equal('monalisa');
        done();
      });
    });
    it('Returns null if invalid id', (done) => {
      const options = {
        method: 'GET',
        uri: `${host}/api/project/154894845/`,
        json: {},
      };
      request(options, (error, res, body) => {
        expect(body).to.not.exist;
        done();
      });
    });
  });
});
