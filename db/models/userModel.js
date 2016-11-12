const db = require('../../server/config/connection');

module.exports.get = ({ username }, cb) => {
  if (username) {
    const queryString = 'select * from users where username=?';
    db.query(queryString, username, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'select * from users';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};

module.exports.create = (userProps, cb) => {
  const params = [userProps.username, userProps.password, userProps.salt];
  const queryString = `insert into users(username, password, salt)
                       value (?, ?, ?)`;
  db.query(queryString, params, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

module.exports.update = (userProps, cb) => {
  const params = [userProps.password, userProps.salt, userProps.username];
  const queryString = `update users set password=?, salt=?
                       where username=?`;
  db.query(queryString, params, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

module.exports.remove = ({ username }, cb) => {
  if (username) {
    const queryString = 'delete from users where username=?';
    db.query(queryString, username, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'delete from users';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};
