const Project = require('../models/projectModel');

module.exports.getProjects = (req, res) =>
  Project.findUserProjects(req.user.id, (err, projects) => {
    if (err) {
      return res.status(400).json({
        errorCode: 400,
        errorMessage: 'Unable to retrieve projects',
      });
    }
    return res.json({ data: projects });
  });

module.exports.getInfo = (req, res) => {
  res.json({
    data: {
      userId: req.user.id,
      username: req.user.username,
    },
  });
};
