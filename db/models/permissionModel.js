const db = require('../../server/config/connection');

module.exports.get = (params, cb) => {
  const keys = Object.keys(params);
  const vals = Object.values(params);
  if (keys.length > 0) {
    let queryString = `select * from permissions where ${keys[0]}=?`;
    for (let i = 1; i < keys.length; i++) {
      queryString += `and ${keys[i]}=?`;
    }
    db.query(queryString, vals, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'select * from permissions';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};

module.exports.create = (permissionProps, cb) => {
  if (permissionProps.id) {
    const params = [permissionProps.id, permissionProps.name];
    const queryString = `insert into permissions(id, name)
                         value (?, ?)`;
    db.query(queryString, params, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const params = [permissionProps.name];
    const queryString = `insert into permissions(name)
                         value (?)`;
    db.query(queryString, params, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};

module.exports.update = (permissionProps, cb) => {
  const params = [permissionProps.name, permissionProps.id];
  const queryString = `update permissions set name=?
                       where id=?`;
  db.query(queryString, params, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

module.exports.remove = (params, cb) => {
  const keys = Object.keys(params);
  const vals = Object.values(params);
  if (keys.length > 0) {
    let queryString = `delete from permissions where ${keys[0]}=?`;
    for (let i = 1; i < keys.length; i++) {
      queryString += `and ${keys[i]}=?`;
    }
    db.query(queryString, vals, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'delete from permissions';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};
