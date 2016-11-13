const Project = require('../models/projectModel');

module.exports.getProjects = (req, res) => {
  const userId = req.params.userId;
  Project.getUserProjects(userId, (err, projects) => {
    if (err) { res.status(404).end('Unable to retrieve projects'); }
    res.json(projects);
  });
};

module.exports.createProject = (req, res) => {
  const userId = req.body.userId;
  const projectProps = req.body;
  Project.create(userId, projectProps, (err, status) => {
    if (err) { res.status(404).end('Unable to create project'); }
    res.json(status.insertId);
  });
};

module.exports.removeProject = (req, res) => {
  const projectId = req.body.id;
  Project.remove({ id: projectId }, (err, status) => {
    if (err) { res.status(404).end('Unable to remove project'); }
    res.json(status);
  });
};

module.exports.updateProject = (req, res) => {
  const projectProps = req.body;
  Project.update(projectProps, (err, status) => {
    if (err) { res.status(404).end('Unable to update project'); }
    res.json(status);
  });
};

module.exports.generateProject = (req, res) => {
  res.end();
};
