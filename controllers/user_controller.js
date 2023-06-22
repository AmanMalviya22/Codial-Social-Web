//controller for profile route and exported it for global uses
module.exports.profile=function(req,res){
    
    return res.render('user_profile',{title:"user profile"});
}


//controller for user signup
module.exports.signup=function(req,res){
    
    return res.render('user_sign_up',{title:"sign up"});
}

//controller for user signin
module.exports.signin=function(req,res){
    
    return res.render('user_sign_in',{title:"sign in"});
}

// sign up controller
module.exports.create=function(req,res){
    //later
}


// sign in controller
module.exports.createSession=function(req,res){
    // later
}

