const Project = require('../models/projectModel');
const Worker = require('../../server/utils/worker');
const Zip = require('../../server/utils/zip');

module.exports.getProjects = (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) {
      res.status(400).json({
        errorCode: 400,
        errorMessage: 'Unable to retrieve projects',
      });
    } else {
      res.json({ data: projects });
    }
  });
};

module.exports.getProject = (req, res) => {
  const projectId = +req.params.projectId;
  Project.findById(projectId, (err, project) => {
    if (err) {
      res.status(400).json({
        errorCode: 400,
        errorMessage: 'Unable to retrieve projects',
      });
    } else {
      res.json({ data: project });
    }
  });
};

module.exports.createProject = (req, res) => {
  const userId = req.user.id;
  const permissionId = req.body.permissionId;
  const projectSettings = { userId, permissionId };
  const projectProps = req.body.projectProps;
  Project.create(projectSettings, projectProps, (err, project) => {
    if (err) {
      res.status(400).json({
        errorCode: 400,
        errorMessage: 'Unable to create project',
      });
    } else {
      res.json({ data: project });
    }
  });
};

module.exports.updateProject = (req, res) => {
  const projectId = +req.params.projectId;
  const projectProps = req.body;
  Project.update({ id: projectId }, projectProps, (err, projects) => {
    if (err) {
      res.status(400).json({
        errorCode: 400,
        errorMessage: 'Unable to update project',
      });
    } else {
      res.json({ data: projects });
    }
  });
};

module.exports.removeProject = (req, res) => {
  const projectId = +req.params.projectId;
  Project.remove({ id: projectId }, (err, projects) => {
    if (err) {
      res.status(400).json({
        errorCode: 400,
        errorMessage: 'Unable to remove project',
      });
    } else {
      res.json({ data: projects });
    }
  });
};

module.exports.generateProject = (req, res) => {
  const tree = JSON.parse(req.query.tree);
  const userId = 1;
  Worker(tree, userId, () => {
    Zip(res, userId);
  });
};

module.exports.findOwner = (req, res) => {
  const projectId = +req.params.projectId;
  Project.findOwner(projectId, (err, ownerInfo) => {
    if (err) {
      res.status(400).json({
        errorCode: 400,
        errorMessage: 'Unable to find project owner',
      });
    } else {
      res.json({ data: ownerInfo });
    }
  });
};
