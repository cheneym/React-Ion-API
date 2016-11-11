const Zip = require('node-zip');

module.exports.getOutline = (req, res) => {
  const data = {
    name: 'Lol',
    body: '<h1>Hello World<h1>',
  };

  res.render('dynamicComponent', data, (err, html) => {
    if (err) { res.sendStatus(500); }
    res.end(JSON.stringify(html));
  });
};

module.exports.makeOutline = (req, res) => {
  const data = {
    name: 'Lol',
    body: '<h1>Hello World<h1>',
  };

  res.render('dynamicComponent', data, (err, html) => {
    if (err) { res.sendStatus(500); }
    res.end(JSON.stringify(html));
  });
};
