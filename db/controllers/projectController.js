const Project = require('../models/projectModel');
const Worker = require('../../server/utils/worker');
const Zip = require('../../server/utils/zip');
const qs = require('query-string');

module.exports.getProjects = (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) {
      res.status(404).end('Unable to retrieve projects');
    } else {
      res.json(projects);
    }
  });
};

module.exports.getProject = (req, res) => {
  const projectId = +req.params.projectId;
  Project.findById(projectId, (err, project) => {
    if (err) {
      res.status(404).end('Unable to retrieve project');
    } else {
      res.json(project);
    }
  });
};

module.exports.createProject = (req, res) => {
  const projectSettings = req.body.projectSettings;
  const projectProps = req.body.projectProps;
  Project.create(projectSettings, projectProps, (err, project) => {
    if (err) {
      res.status(404).end('Unable to create project');
    } else {
      res.json(project);
    }
  });
};

module.exports.updateProject = (req, res) => {
  const projectId = +req.params.projectId;
  const projectProps = req.body;
  Project.update({ id: projectId }, projectProps, (err, projects) => {
    if (err) {
      res.status(404).end('Unable to update project');
    } else {
      res.json(projects);
    }
  });
};

module.exports.removeProject = (req, res) => {
  const projectId = +req.params.projectId;
  Project.remove({ id: projectId }, (err, projects) => {
    if (err) {
      res.status(404).end('Unable to remove project');
    } else {
      res.json(projects);
    }
  });
};

module.exports.generateProject = (req, res) => {
  // console.log('reqquery', req);
  console.log('rrrrqqq', req.query.tree);
  console.log('rrrrqqqparse', JSON.parse(req.query.tree));
  const tree = JSON.parse(req.query.tree);
  const userId = 1;

  Worker(tree, userId, () => {
    Zip(res, userId);
  });
  // res.end();
};
