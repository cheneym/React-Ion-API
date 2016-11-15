const mocha = require('mocha');
const expect = require('chai').expect;
const worker = require('../../server/utils/worker.js');
const filePath = require('../../server/utils/filePaths');
const fs = require('fs.extra');
const path = require('path');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('Worker Utility', () => {
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
                content: 'Testing',
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

  describe('With React Router', () => {
    it('Should create the necessary files server, webpack, and App.jsx', (done) => {
      worker(treeData, userId, () => {
        done();
      });
    });
  });

  
});
