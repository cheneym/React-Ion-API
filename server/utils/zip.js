const archiver = require('archiver');
const path = require('path');

module.exports = (res) => {
  const archive = archiver('zip');
  archive.on('err', (err) => { throw err; });
  archive.pipe(res);
  archive.directory(path.join(__dirname, '../views'), 'views/');
  archive.finalize();
};
