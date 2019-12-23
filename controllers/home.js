/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.user) {
    return res.redirect('/account');
  }
  res.render('home', {
    title: 'Home'
  });
};
