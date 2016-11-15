const db = require('../../server/config/connection');

module.exports.get = (params, cb) => {
  const keys = Object.keys(params);
  const vals = Object.values(params).map(a => a.toString());
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
