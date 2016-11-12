const mysql = require('mysql');
const config = require('./config');

<<<<<<< 06e3d609fc124c1e985affb624aa9e64887b73f4
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hakuryu',
  database: 'reaction',
});
=======
const connection = mysql.createConnection(config);
>>>>>>> (feat) Add test template for users and move database info to config

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;
