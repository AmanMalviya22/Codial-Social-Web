module.exports.home = function(req, res) {
  // Printing cookie on console
  console.log(req.cookies);

  // Setting cookie
  res.cookie('c1', 10);

  return res.render('home', {
    title: "Home"
  });
};
