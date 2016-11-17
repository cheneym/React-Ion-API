const mysql = require('mysql');
const config = process.env.NODE_ENV === 'development' ? require('./config-local') : require('./config');

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
