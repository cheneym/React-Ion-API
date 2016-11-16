const Project = require('../models/projectModel');

module.exports.getProjects = (req, res) => {
  if (req.user) {
    return Project.findUserProjects(req.user.id, (err, projects) => {
      if (err) { return res.status(404).send('Unable to retrieve projects'); }
      return res.send(projects);
    });
  }

  return res.status(404).send('Not signed in');
};
