const ejs = require('ejs');
const fs = require('fs.extra');
const helper = require('./generateHelper');
const filePath = require('./filePaths');
const componentHelper = require('./componentHelper');
const utils = require('./utility');

module.exports = (tree, userId, cb) => {
  const componentTotal = tree.total;
  let counter = 0;

  // Paths
  const componentPath = filePath.getComponentPath(userId);
  const mainJsPath = filePath.getMainJsPath(userId);

  const generateFile = (treeData, inital) => {
    utils.consoleLog(`Generate Files for: ${treeData.name}`);
    let tempTreeData = treeData;
    if (inital && tree.router === 0) {
      tempTreeData.initial = true;
    } else {
      tempTreeData.initial = false;
    }

    tempTreeData = helper.componentBodySetup(tempTreeData);

    helper.cssSetup(helper.combineCss(tempTreeData), userId, () => {
      ejs.renderFile(componentHelper.getComponent(tempTreeData), tempTreeData, (err, html) => {
        const jsPath = inital ? mainJsPath : componentPath;

        fs.writeFile(`${jsPath}/${tempTreeData.name}.jsx`, html, (err2) => {
          if (err2) {
            console.error(err2);
          }
          counter += 1;
          if (tempTreeData.children.length !== 0) {
            tempTreeData.children.forEach((component) => {
              if (component.componentType !== 'Text') {
                generateFile(component);
              } else {
                counter += 1;
              }
            });
          } else if (counter === componentTotal) {
            cb();
          }
        });
      });
    });
  };

  utils.consoleLog('Ready to remove');
  helper.initialize(tree, userId, () => {
    for (let i = 0; i < tree.routes.length; i += 1) {
      generateFile(tree.routes[i], true);
    }
  });
};
