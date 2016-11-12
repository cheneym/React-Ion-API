const ejs = require('ejs');
const fs = require('fs.extra');
const path = require('path');


const webpackSetup = (tree, userId, cb) => {
  const webpackTemplatePath = path.join(__dirname, '../templates/webpackConfigTemplate.ejs');
  const webpackConfigPath = path.join(__dirname, `../../user/${userId}`);

  ejs.renderFile(webpackTemplatePath, tree, (err, html) => {
    fs.writeFile(`${webpackConfigPath}/webpack.config.js`, html, (err2) => {
      if (err2) {
        console.log(err2);
      }
      cb();
    });
  });
};

const htmlSetup = (tree, userId, callback) => {
  const htmlTemplatePath = path.join(__dirname, '../templates/htmlTemplate.ejs');
  const htmlPath = path.join(__dirname, `../../user/${userId}/src`);
  const pageTemplatePath = path.join(__dirname, '../templates/page.ejs');
  const pageJsonPath = path.join(__dirname, `../../user/${userId}`);

  const page = tree.routes;
  const pageObj = { pageData: [] };
  const pageLength = tree.routes.length;
  let counter = 0;

  const generatePageJson = (cb) => {
    page.forEach((single) => {
      pageObj.pageData.push({
        name: single.name,
        path: `./src/js/${single.name}.jsx`,
      });
    });
    ejs.renderFile(pageTemplatePath, pageObj, (err3, html) => {
      fs.writeFile(`${pageJsonPath}/page.json`, html, (err4) => {
        if (err4) {
          console.log(err3);
        }
        cb();
      });
    });
  };

  const generateHtml = (treeData) => {
    ejs.renderFile(htmlTemplatePath, treeData, (err, html) => {
      fs.writeFile(`${htmlPath}/${treeData.name}.html`, html, (err2) => {
        if (err2) {
          console.log(err2);
        }
        counter += 1;
        if (counter !== pageLength) {
          generateHtml(page[counter]);
        } else {
          callback();
        }
      });
    });
  };

  generatePageJson(() => {
    generateHtml(page[counter]);
  });
};


module.exports = (tree, cb) => {
  const user = 1;
  const componentTotal = tree.total;
  let counter = 0;

  // Paths
  const componentPath = path.join(__dirname, `../../user/${user}/src/components`);
  const mainJsPath = path.join(__dirname, `../../user/${user}/src/js`);
  const userPath = path.join(__dirname, `../../user/${user}`);
  const structurePath = path.join(__dirname, '../../server/structure');

  const generateFile = (treeData, inital) => {
    const tempTreeData = treeData;
    if (inital) {
      tempTreeData.initial = true;
    } else {
      tempTreeData.initial = false;
    }

    ejs.renderFile(path.join(__dirname, '../templates/components/staticComponent.ejs'), tempTreeData, (err, html) => {
      const jsPath = inital ? mainJsPath : componentPath;

      fs.writeFile(`${jsPath}/${tempTreeData.name}.jsx`, html, (err2) => {
        if (err2) {
          console.error(err2);
        }
        counter += 1;
        if (tempTreeData.children.length !== 0) {
          tempTreeData.children.forEach((component) => {
            generateFile(component);
          });
        } else if (counter === componentTotal) {
          cb();
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
      console.log("Copied 'structure' to 'user'");
      htmlSetup(tree, user, () => {
        webpackSetup(tree, user, () => {
          for (let i = 0; i < tree.routes.length; i += 1) {
            generateFile(tree.routes[i], true);
          }
        });
      });
    });
  });
};
