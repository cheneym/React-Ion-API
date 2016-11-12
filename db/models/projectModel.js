const db = require('../../server/config/connection');

module.exports.get = ({ projectId }, cb) => {
  if (projectId) {
    const queryString = 'select * from projects where projectId=?';
    db.query(queryString, projectId, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'select * from projects';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};

module.exports.getUserProjects = (userId, cb) => {
  const queryString = `select p.id p.projectname p.tree from users u
                       left outer join user_project up on (u.id=up.user_id)
                       left outer join projects projects p on (up.project_id=p.id)
                       where u.id=?`;
  db.query(queryString, userId, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

module.exports.create = (projectProps, cb) => {
  const params = [projectProps.projectname, projectProps.tree];
  const queryString = `insert into projects(projectname, tree)
                       value (?, ?)`;
  db.query(queryString, params, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

module.exports.update = (projectProps, cb) => {
  const params = [projectProps.projectname, projectProps.tree, projectProps.projectId];
  const queryString = `update projects set projectname=?, tree=?
                       where id=?`;
  db.query(queryString, params, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

module.exports.remove = ({ projectId }, cb) => {
  if (projectId) {
    const queryString = 'delete from projects where id=?';
    db.query(queryString, projectId, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'delete from projects';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};
