//controller for home route and exported it
module.exports.home = function(req, res) {
   return res.render('home',{
    title:"Home"
   });
 };
 