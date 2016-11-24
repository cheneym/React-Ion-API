const fs = require('fs');
const path = require('path');

module.exports = {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, '/mysql-ca.crt')),
  },
};
