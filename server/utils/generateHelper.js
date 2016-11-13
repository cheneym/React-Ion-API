const ejs = require('ejs');
const fs = require('fs.extra');
const path = require('path');

module.exports.webpackSetup = (tree, userId, cb) => {
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

module.exports.serverSetup = (tree, userId, callback) => {
  const serverTemplatePath = path.join(__dirname, '../templates/serverTemplate.ejs');
  const serverPath = path.join(__dirname, `../../user/${userId}/server`);

  ejs.renderFile(serverTemplatePath, tree, (err, html) => {
    fs.writeFile(`${serverPath}/server.js`, html, (err2) => {
      if (err2) {
        console.log(err2);
      }
      callback();
    });
  });
};

module.exports.routerSetup = (tree, userId, callback) => {
  const routerTemplatePath = path.join(__dirname, '../templates/components/reactRouteTemplate.ejs');
  const routerAppPath = path.join(__dirname, `../../user/${userId}/src/js`);

  ejs.renderFile(routerTemplatePath, tree, (err, html) => {
    fs.writeFile(`${routerAppPath}/App.jsx`, html, (err2) => {
      if (err2) {
        console.log(err2);
      }
      callback();
    });
  });
};


module.exports.htmlSetup = (tree, userId, callback) => {
  const htmlTemplatePath = path.join(__dirname, '../templates/htmlTemplate.ejs');
  const htmlPath = path.join(__dirname, `../../user/${userId}/src`);
  const pageTemplatePath = path.join(__dirname, '../templates/pageTemplate.ejs');
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