const Project = require('../models/projectModel');

module.exports.getProjects = (req, res) => {
  if (req.user) {
    Project.findUserProjects(req.user.id, (err, projects) => {
      if (err) { return res.status(404).end('Unable to retrieve projects'); }
      return res.json(projects);
    });
  }

  return res.status(404).end('Not signed in');
};
