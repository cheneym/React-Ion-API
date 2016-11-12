const Zip = require('node-zip');
var ejs = require('ejs');
const path = require('path');
const worker = require('../../worker');

module.exports.getOutline = (req, res) => {
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
