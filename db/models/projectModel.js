const db = require('../../server/config/connection');

module.exports.get = (params, cb) => {
  const keys = Object.keys(params);
  const vals = Object.values(params);
  if (keys.length > 0) {
    let queryString = `select * from projects where ${keys[0]}=?`;
    for (let i = 1; i < keys.length; i++) {
      queryString += `and ${keys[i]}=?`;
    }
    db.query(queryString, vals, (err, results) => {
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
  const queryString = `select p.id, p.name, p.project_tree from users u
                       left outer join user_project up on (u.id=up.user_id)
                       left outer join projects p on (up.project_id=p.id)
                       where u.id=?`;
  db.query(queryString, userId, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

module.exports.create = (userId, projectProps, cb) => {
  const params = [projectProps.name, projectProps.project_tree];
  const queryString = `insert into projects(name, project_tree)
                       value (?, ?)`;
  db.query(queryString, params, (err, results) => {
    if (err) { cb(err, null); }
    const projectId = results.insertId;
    const params2 = [userId, projectId, 1];
    const queryString2 = `insert into user_project (user_id, project_id, permission_id)
                          value (?, ?, ?)`;
    db.query(queryString2, params2, (err2) => {
      if (err2) { cb(err2, null); }
      if (cb) { cb(err, results); }
    });
  });
};

module.exports.update = (projectProps, cb) => {
  const params = [projectProps.name, projectProps.project_tree, projectProps.id];
  const queryString = `update projects set name=?, project_tree=?
                       where id=?`;
  db.query(queryString, params, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

module.exports.remove = (params, cb) => {
  const keys = Object.keys(params);
  const vals = Object.values(params);
  if (keys.length > 0) {
    let queryString = `delete from projects where ${keys[0]}=?`;
    for (let i = 1; i < keys.length; i++) {
      queryString += `and ${keys[i]}=?`;
    }
    db.query(queryString, vals, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'delete from projects';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};
