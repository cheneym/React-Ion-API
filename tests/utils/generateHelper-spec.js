
/* eslint-disable no-unused-expressions */
// uses usernames 'gold', 'silver', 'copper';

const mocha = require('mocha');
const expect = require('chai').expect;
const Helper = require('../../server/utils/generateHelper.js');
const filePath = require('../../server/utils/filePaths');
const fs = require('fs.extra');
const path = require('path');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('Generate Helper', () => {
  const userId = 100000;
  const treeData = {
    total: 5,
    router: 1,
    routes: [
      {
        name: 'Index',
        componentType: 'Block',
        props: {
          backgroundColor: '#4ccbf1 ',
          flex: 1,
          height: [1300, 'px'],
          width: [20, '%'],
          flexDirection: 'column',
        },
        children: [
          {
            name: 'Body',
            componentType: 'Block',
            props: {
              backgroundColor: '#4ccbf1 ',
              flex: 1,
              height: [1300, 'px'],
              width: [20, '%'],
              flexDirection: 'column',
            },
            children: [
              {
                name: 'Username',
                componentType: 'Text',
                props: {
                  backgroundColor: '#4ccbf1 ',
                  flex: 1,
                  height: [1300, 'px'],
                  width: [20, '%'],
                  flexDirection: 'column',
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'Login',
        componentType: 'Block',
        props: {
          backgroundColor: '#4ccbf1 ',
          flex: 1,
          height: [1300, 'px'],
          width: [20, '%'],
          flexDirection: 'column',
        },
        children: [
          {
            name: 'Body2',
            componentType: 'Block',
            props: {
              backgroundColor: '#4ccbf1 ',
              flex: 1,
              height: [1300, 'px'],
              width: [20, '%'],
              flexDirection: 'column',
            },
            children: [],
          },
        ],
      },
    ],
  };

  beforeEach((done) => {
    const folderPath = filePath.getUserPath(userId);
    const userPath = filePath.getUserPath(userId);
    const structurePath = filePath.STRUCTURE_TEMPLATE_PATH;

    fs.rmrf(folderPath, (err) => {
      if (err) {
        console.log(err);
      }
      fs.copyRecursive(structurePath, userPath, (err2) => {
        if (err2) {
          throw err2;
        }
        done();
      });
    });
  });

  after((done) => {
    const folderPath = filePath.getUserPath(userId);
    fs.rmrf(folderPath, (err) => {
      if (err) {
        console.log(err);
      }
      done();
    });
  });

  describe('React Router creation: ', () => {
    it('Should create server file', (done) => {
      Helper.serverSetup(treeData, userId, () => {
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/server/server.js`))).to.be.true;
        done();
      });
    });

    it('Should create webpack file', (done) => {
      Helper.webpackSetup(treeData, userId, () => {
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/webpack.config.js`))).to.be.true;
        done();
      });
    });

    it('Should create router file', (done) => {
      Helper.routerSetup(treeData, userId, () => {
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/src/js/App.jsx`))).to.be.true;
        done();
      });
    });
  });


  beforeEach((done) => {
    const folderPath = filePath.getUserPath(userId);
    const userPath = filePath.getUserPath(userId);
    const structurePath = filePath.STRUCTURE_TEMPLATE_PATH;

    treeData.router = 0;
    fs.rmrf(folderPath, (err) => {
      if (err) {
        console.log(err);
      }
      fs.copyRecursive(structurePath, userPath, (err2) => {
        if (err2) {
          throw err2;
        }
        done();
      });
    });
  });

  describe('No React Router creation: ', () => {
    it('Should create server file', (done) => {
      Helper.serverSetup(treeData, userId, () => {
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/server/server.js`))).to.be.true;
        done();
      });
    });

    it('Should create webpack file', (done) => {
      Helper.webpackSetup(treeData, userId, () => {
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/webpack.config.js`))).to.be.true;
        done();
      });
    });

    it('Should create Index and Login Page', (done) => {
      Helper.htmlSetup(treeData, userId, () => {
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/src/Index.html`))).to.be.true;
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/src/Login.html`))).to.be.true;
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/page.json`))).to.be.true;
        done();
      });
    });


    it('Should create css file', (done) => {
      const nestedTree = {
        total: 3,
        router: 1,
        routes: [
          {
            name: 'Index',
            componentType: 'Block',
            props: {
              backgroundColor: '#4ccbf1 ',
              flex: 1,
              height: [1300, 'px'],
              width: [20, '%'],
              flexDirection: 'column',
            },
            children: [
              {
                name: 'Username',
                componentType: 'Text',
                props: {
                  backgroundColor: '#4ccbf1 ',
                  flex: 1,
                  height: [1300, 'px'],
                  width: [20, '%'],
                  flexDirection: 'column',
                },
                children: [],
              },
            ],
          },
        ],
      };
      const arrayObj = Helper.combineCss(nestedTree.routes[0]);
      Helper.cssSetup(arrayObj, userId, () => {
        expect(fs.existsSync(path.join(__dirname, `../../user/${userId}/src/css/Index.css`))).to.be.true;
        done();
      });
    });
  });

  describe('Css helper: ', () => {
    it('Create css object', (done) => {
      const cssObj = Helper.createCss(treeData.routes[0]);
      const expectedValue = {
        flex: 1,
        'background-color': '#4ccbf1 ',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        height: '1300px',
        width: '20%',
        padding: '20px',
        margin: '20px',
        position: 'relative',
        'flex-wrap': 'wrap',
        'box-sizing': 'border-box',
      };
      expect(cssObj).to.eql(expectedValue);
      done();
    });

    it('Create an array of Css objects for single component', (done) => {
      const nestedTree = {
        total: 3,
        router: 1,
        routes: [
          {
            name: 'Index',
            componentType: 'Block',
            props: {
              backgroundColor: '#4ccbf1 ',
              flex: 1,
              height: [1300, 'px'],
              width: [20, '%'],
              flexDirection: 'column',
            },
            children: [
              {
                name: 'Username',
                componentType: 'Text',
                props: {
                  backgroundColor: '#4ccbf1 ',
                  flex: 1,
                  height: [1300, 'px'],
                  width: [20, '%'],
                  flexDirection: 'column',
                },
                children: [],
              },
            ],
          },
        ],
      };
      const arrayObj = Helper.combineCss(nestedTree.routes[0]);
      expect(arrayObj.cssResults.length).to.equal(2);
      expect(arrayObj.cssResults[0].name).to.equal('Index');
      expect(arrayObj.cssResults[1].name).to.equal('Username');
      done();
    });
  });
});
