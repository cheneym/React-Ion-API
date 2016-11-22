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

    if (inital) {
      tempTreeData.main = true;
    } else {
      tempTreeData.main = false;
    }

    if (inital && tree.router === 0) {
      tempTreeData.initial = true;
    } else {
      tempTreeData.initial = false;
    }

    if (tempTreeData.aUrl) {
      tempTreeData.tag = 'a';
    } else {
      tempTreeData.tag = 'div';
    }
    
    tempTreeData = helper.componentBodySetup(tempTreeData);
    console.log(tempTreeData);
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
              if (component.componentType !== 'Text' && component.componentType !== 'List') {
                generateFile(component);
              }
            });
          }
          if (counter === componentTotal) {
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
