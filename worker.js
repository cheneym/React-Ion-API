const ejs = require('ejs');
const fs = require('fs.extra');
const path = require('path');
const gulp = require('gulp');
require('./gulpfile');

module.exports = (tree, cb) => {
  const user = 1;
  //gulp.start('clear-user');
  const componentTotal = tree.total;
  var counter = 0;

  //Paths
  const componentPath = path.join(__dirname, 'user/' + user + '/src/components/');
  const userPath = path.join(__dirname, 'user/' + user);
  const structurePath = path.join(__dirname, 'server/structure');

  const generateFile = (treeData) => {
    ejs.renderFile(path.join(__dirname, 'server/views/staticComponent.ejs'), treeData, (err, html) => {
      fs.writeFile(componentPath + treeData.name + '.jsx', html, (err2) => {
        if (err2) {
          console.error(err2);
        }
        counter += 1;
        console.log(counter);
        if (treeData.children.length !== 0) {
          treeData.children.forEach((component) => {
            generateFile(component);
          });
        } else {
          if (counter === componentTotal) {
            console.log('Yes!!!!');
            cb();
          }
        }
      });
    });
  };

  fs.rmrf(userPath, (err) => {
    if (err) {
      console.error(err);
    }

    fs.copyRecursive(structurePath, userPath, (err2) => {
      if (err2) {
        throw err2;
      }
      generateFile(tree);
      console.log("Copied './foo' to './bar'");
    });
  });
};

