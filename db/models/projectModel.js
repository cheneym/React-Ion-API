const db = require('../../server/config/connection');
const Model = require('./model');

class Project extends Model {
  findUserProjects(userId, cb) {
    const queryString = `select p.id, p.name, p.project_tree from users u
                         left outer join user_project up on (u.id=up.user_id)
                         left outer join ${this.model} p on (up.project_id=p.id)
                         where u.id=?`;
    db.query(queryString, userId, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }

  create(projectSettings, projectProps, cb) {
    const userId = projectSettings.userId;
    const permissionId = projectSettings.permissionId;

    super.create(projectProps, (err, status) => {
      if (err) { cb(err, null); }
      const projectId = status.insertId;
      const params2 = [userId, projectId, permissionId];
      const queryString2 = `insert into user_project (user_id, project_id, permission_id)
                            value (?, ?, ?)`;
      db.query(queryString2, params2, (err2) => {
        if (err2) { cb(err2, null); }
        if (cb) { cb(err, status); }
      });
    });
  }
}

module.exports = new Project('projects');
