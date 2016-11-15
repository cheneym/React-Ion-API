const Project = require('../models/projectModel');

module.exports.getProjects = (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) { res.status(404).end('Unable to retrieve projects'); }
    res.json(projects);
  });
};

module.exports.getProject = (req, res) => {
  const projectId = req.params.projectId;
  Project.findById(projectId, (err, project) => {
    if (err) { res.status(404).end('Unable to retrieve project'); }
    res.json(project);
  });
};

module.exports.createProject = (req, res) => {
  const projectSettings = req.body.projectSettings;
  const projectProps = req.body.projectProps;
  Project.create(projectSettings, projectProps, (err, project) => {
    if (err) { res.status(404).end('Unable to create project'); }
    res.json(project);
  });
};

module.exports.updateProject = (req, res) => {
  const projectId = req.params.projectId;
  const projectProps = req.body.projectProps;
  Project.update({ id: projectId }, projectProps, (err, projects) => {
    if (err) { res.status(404).end('Unable to update project'); }
    res.json(projects);
  });
};

module.exports.removeProject = (req, res) => {
  const projectId = req.params.projectId;
  Project.remove({ id: projectId }, (err, projects) => {
    if (err) { res.status(404).end('Unable to remove project'); }
    res.json(projects);
  });
};

module.exports.generateProject = (req, res) => {
  res.end();
};
