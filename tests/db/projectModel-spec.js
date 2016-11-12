/* eslint-disable no-unused-expressions */
// uses projectnames 'gold', 'silver', 'copper';

const mocha = require('mocha');
const expect = require('chai').expect;
const Project = require('../../db/models/projectModel.js');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('Project Model', () => {
  const projectname = 'gold';
  const tree = 'hahaha123';
  const newProject = { projectname, tree };

  beforeEach((done) => {
    Project.remove({}, (err) => {
      if (err) { console.error(err); }
      done();
    });
  });

  after((done) => {
    Project.remove({}, (err) => {
      if (err) { console.error(err); }
      done();
    });
  });

  describe('Project creation: ', () => {
    it('Does not add invalid projects to database', (done) => {
      Project.create({ projectname: '123' }, (err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('Adds valid projects to database', (done) => {
      Project.create(newProject, (err) => {
        expect(err).to.not.exist;
        Project.get({}, (err2, projects) => {
          expect(err2).to.not.exist;
          expect(projects.length).to.not.equal(0);
          expect(projects[0].projectname).to.equal('gold');
          done();
        });
      });
    });
  });

  describe('Project Update: ', () => {
    it('Does not add or remove projects from database', (done) => {
      Project.create(newProject, (err, { insertId }) => {
        expect(err).to.not.exist;
        const newProject2 = {};
        Object.assign(newProject2, newProject);
        newProject2.tree = 'captainfalcon';
        newProject2.projectId = insertId;
        Project.update(newProject2, (err2) => {
          expect(err2).to.not.exist;
          Project.get({}, (err3, projects) => {
            expect(err3).to.not.exist;
            expect(projects.length).to.not.equal(0);
            done();
          });
        });
      });
    });

    it('Updates existing projects in database', (done) => {
      Project.create(newProject, (err, { insertId }) => {
        expect(err).to.not.exist;
        const newProject2 = Object.assign(newProject);
        newProject2.tree = 'notRandom';
        newProject2.projectId = insertId;
        Project.update(newProject2, (err2) => {
          expect(err2).to.not.exist;
          Project.get({}, (err3, projects) => {
            expect(err3).to.not.exist;
            expect(projects[0].tree).to.equal('notRandom');
            done();
          });
        });
      });
    });
  });

  describe('Project get: ', () => {
    const newProject3 = {};
    Object.assign(newProject3, newProject);
    newProject3.projectname = 'silver';
    const newProject4 = {};
    Object.assign(newProject4, newProject);
    newProject4.projectname = 'copper';

    it('Gets all projects if passed empty object', (done) => {
      Project.create(newProject, (err) => {
        expect(err).to.not.exist;
        Project.create(newProject3, (err2) => {
          expect(err2).to.not.exist;
          Project.create(newProject4, (err3) => {
            expect(err3).to.not.exist;
            Project.get({}, (err4, projects) => {
              expect(err4).to.not.exist;
              expect(projects.length).to.be.above(2);
              done();
            });
          });
        });
      });
    });

    it('Uses projectId as search query when passed object with projectId property', (done) => {
      Project.create(newProject, (err) => {
        expect(err).to.not.exist;
        Project.create(newProject3, (err2, { insertId }) => {
          expect(err2).to.not.exist;
          Project.create(newProject4, (err3) => {
            expect(err3).to.not.exist;
            Project.get({ projectId: insertId }, (err4, projects) => {
              expect(err4).to.not.exist;
              expect(projects.length).to.equal(1);
              expect(projects[0].projectname).to.equal('silver');
              done();
            });
          });
        });
      });
    });
  });

  describe('Project remove: ', () => {
    const newProject3 = {};
    Object.assign(newProject3, newProject);
    newProject3.projectname = 'silver';

    it('Removes project based on search query when passed object with id property', (done) => {
      Project.create(newProject, (err, { insertId }) => {
        expect(err).to.not.exist;
        Project.create(newProject3, (err2) => {
          expect(err2).to.not.exist;
          Project.remove({ projectId: insertId }, (err3) => {
            expect(err3).to.not.exist;
            Project.get({}, (err4, projects) => {
              expect(err4).to.not.exist;
              expect(projects.length).to.equal(1);
              expect(projects[0].projectname).to.equal('silver');
              done();
            });
          });
        });
      });
    });
  });
});
