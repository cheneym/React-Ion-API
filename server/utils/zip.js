const archiver = require('archiver');
const path = require('path');

module.exports = (res, userId) => {
  const archive = archiver('zip');
  archive.on('err', (err) => { throw err; });
  archive.pipe(res);
  archive.directory(path.join(__dirname, '../../user/' + userId), 'app/');
  archive.finalize();
};
