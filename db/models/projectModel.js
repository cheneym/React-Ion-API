const db = require('../../server/config/connection');
const Model = require('./model');

class Project extends Model {
  findUserProjects(userId, cb) {
    const queryString = `select p.id, p.name, p.project_tree from users u
                         inner join user_project up on (u.id=up.user_id)
                         inner join ${this.model} p on (up.project_id=p.id)
                         where u.id=?`;
    db.query(queryString, userId, (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  }

  create(projectSettings, projectProps, cb) {
    const userId = projectSettings.userId;
    const permissionId = projectSettings.permissionId;

    super.create(projectProps, (err, project) => {
      if (err) {
        cb(err, null);
      } else {
        const projectId = project.id;
        const params2 = [userId, projectId, permissionId];
        const queryString2 = `insert into user_project (user_id, project_id, permission_id)
                              value (?, ?, ?)`;
        db.query(queryString2, params2, (err2) => {
          if (err2) {
            cb(err2, null);
          } else {
            cb(err, project);
          }
        });
      }
    });
  }

  findOwner(projectId, cb) {
    console.log('projectId', projectId);
    const queryString = `select u.username from users u
                         inner join user_project up on (u.id=up.user_id)
                         inner join ${this.model} p on (up.project_id=p.id)
                         where p.id=?`;
    db.query(queryString, projectId, (err, results) => {
      if (err) {
        cb(err, null);
      } else if (results[0]) {
        cb(null, results[0].username);
      } else {
        cb(null, null);
      }
    });
  }
}

module.exports = new Project('projects');
