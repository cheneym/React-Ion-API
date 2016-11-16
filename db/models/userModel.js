const Model = require('./model');
const bcrypt = require('bcrypt-nodejs');

const encryptPassword = (password, cb) => {
  const saltRounds = 10;
  return bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { return cb(err, null, null); }
    return bcrypt.hash(password, salt, null, (err2, encryptpw) => {
      if (err2) { return cb(err2, null, null); }
      return cb(null, salt, encryptpw);
    });
  });
};

const copyObj = (o) => {
  const copy = {};
  Object.assign(copy, o);
  return copy;
};

class User extends Model {
  create(userProps, cb) {
    const username = userProps.username;
    const password = userProps.password;
    if (!password) { return cb(new Error('Invalid Password'), null); }
    return encryptPassword(password, (err, salt, encryptpw) => {
      if (err) { return cb(err, null); }
      return super.create({ username, password: encryptpw, salt }, cb);
    });
  }

  update(query, userProps, cb) {
    if (userProps.password) {
      return encryptPassword(userProps.password, (err, encryptpw) => {
        if (err) { return cb(err, null); }
        const encryptUser = copyObj(userProps);
        encryptUser.password = encryptpw;
        return super.update(query, encryptUser, cb);
      });
    }
    return super.update(query, userProps, cb);
  }
}

module.exports = new User('users');
