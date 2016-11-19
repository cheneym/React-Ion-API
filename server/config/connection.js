const mysql = require('mysql');
let config = process.env.NODE_ENV === 'production' ? require('./config-prod') : require('./config-test');
config = process.env.NODE_ENV === 'test' ? config : require('./config-dev');

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
  connection.query('SET sql_mode = STRICT_ALL_TABLES');
});

module.exports = connection;
