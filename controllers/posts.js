const path = require('path');

exports.getPostsIndex = (req, res, next) => {
  res.render('index', { path: '/' });
};
