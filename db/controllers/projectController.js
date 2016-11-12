const zip = require('../../server/utils/zip');

module.exports.getProject = (req, res) => {
  zip(res);
};

module.exports.createProject = (req, res) => {
  const data = {
    total: 3,
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
    res.end();
  });
  
  // res.render('dynamicComponent', data, (err, html) => {
  //   if (err) { res.sendStatus(500); }
  //   res.end(JSON.stringify(html));
  // });
};
