const archiver = require('archiver');
const path = require('path');
const helper = require('./generateHelper');

module.exports = (res, userId) => {
  const archive = archiver('zip');
  console.log('zipping');

  archive.on('err', (err) => { throw err; });

  archive.on('end', () => {
    console.log('Archive wrote %d bytes', archive.pointer());
    //helper.removeUserFolder(userId, () => {});
  });

  res.attachment('project.zip');

  archive.pipe(res);
  archive.directory(path.join(__dirname, `../../user/${userId}`), 'app/');
  archive.finalize();
};
