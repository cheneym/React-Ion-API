const zip = require('../../server/utils/zip');
const worker = require('../../server/utils/worker');

module.exports.getProject = (req, res) => {
  //zip(res);
    const data = {
    total: 3,
    router: 1,
    routes: [
    {
      name: 'Index',
      children: [
        {
          name: 'Header',
          children: []
        },
        {
          name: 'Footer',
          children: []
        }
      ]
    },
    {
      name: 'Login',
      children: [
        {
          name: 'Header',
          children: []
        },
        {
          name: 'Footer',
          children: []
        },
        {
          name: 'Body',
          children: [
            {
              name: 'Banner',
              children: []
            }
          ]
        }
      ]
    }
    ]
  }

  //var html = ejs({url: 'dynamicComponent'}).render(data);
  //console.log(html);

  //};
  worker(data, function() {
    zip(res, 1);
  });
};

module.exports.createProject = (req, res) => {
  const data = {
    total: 3,
    router: 0,
    name: 'Lol',
    children: [
      {
        name: 'test',
        children: []
      },
      {
        name: 'test2',
        children: []
      }
    ]
  }

  //var html = ejs({url: 'dynamicComponent'}).render(data);
  //console.log(html);

  //};
  worker(data, function() {
    //zip(res, 1);
  });

  // res.render('dynamicComponent', data, (err, html) => {
  //   if (err) { res.sendStatus(500); }
  //   res.end(JSON.stringify(html));
  // });
};
