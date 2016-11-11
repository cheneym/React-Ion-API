module.exports.getOutline = (req, res) => {
  res.render('reactComponent', { body: 'The index page!' }, (err, html) => {
    if (err) { res.sendStatus(500); }
    res.end(JSON.stringify(html));
  });
};
