//controller for profile route and exported it for global uses
module.exports.profile=function(req,res){
    
    return res.render('user_profile',{title:"user profile"});
}