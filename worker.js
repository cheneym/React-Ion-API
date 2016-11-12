const ejs = require('ejs');
const fs = require('fs.extra');
const path = require('path');

module.exports = (tree, cb) => {
  const user = 1;

  const componentTotal = tree.total;
  var counter = 0;

  //Paths
  const componentPath = path.join(__dirname, 'user/' + user + '/src/components/');
  const mainJsPath = path.join(__dirname, 'user/' + user + '/src/js/');
  const userPath = path.join(__dirname, 'user/' + user);
  const structurePath = path.join(__dirname, 'server/structure');

  //var componentList = [];

  const generateFile = (treeData, inital) => {
    //var alreadyGenerated = false;
    if (inital) {
      treeData.initial = true;
    } else {
      treeData.initial = false;
      // if (componentList.includes(treeData.name)) {
      //   alreadyGenerated = true;
      // } else {
      //   componentList.push(treeData.name);
      // }
    }

    ejs.renderFile(path.join(__dirname, 'server/views/staticComponent.ejs'), treeData, (err, html) => {
      var jsPath = inital ? mainJsPath : componentPath;

      fs.writeFile(jsPath + treeData.name + '.jsx', html, (err2) => {
        if (err2) {
          console.error(err2);
        }
        counter += 1;
        if (treeData.children.length !== 0) {
          treeData.children.forEach((component) => {
            generateFile(component);
          });
        } else {
          if (counter === componentTotal) {
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
      console.log("Copied './foo' to './bar'");
      for (var i = 0; i < tree.routes.length; i++) {
        generateFile(tree.routes[i], true);
      }
      
    });
  });
};

