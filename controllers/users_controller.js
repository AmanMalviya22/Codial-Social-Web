const User = require('../models/user');



module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render('user_profile', {
      title: 'User Profile',
      profile_user: user,
      
    });
  } catch (err) {
    console.error('Error finding user:', err);
    return res.redirect('back');
  }
};

module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      // await User.findByIdAndUpdate(req.params.id, req.body);
      // return res.redirect('back');

      let user=await User.findById(req.params.id);
      User.uploadedAvatar(req,res,function(err){
        if(err){console.log('***** Multer Error :',err)}
        // console.log(req.file);
        user.name=req.body.name;
        user.email=req.body.email;
        if(req.file){
          //this is saving the path of the uploaded file into the avatar field in the user
          user.avatar=User.avatarPath+'/'+req.file.filename;
        }
        user.save();
        return res.redirect('back');


      });
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    // console.error('Error updating user:', err);
    req.flash('error', err);
    return res.redirect('back');
  }
};



// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
  if (req.body.password != req.body.confirm_password){
      return res.redirect('back');
  }

  User.findOne({email: req.body.email})
      .then(user => {
          if (!user){
              return User.create(req.body);
          } else {
              return Promise.reject('User already exists');
          }
      })
      .then(user => {
          return res.redirect('/users/sign-in');
      })
      .catch(error => {
          console.log('Error in creating user while signing up:', error);
          return res.redirect('back');
      });
};

    


// sign in and create a session for the user
module.exports.createSession = function(req, res){
  req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
  req.logout(function(err) {
      if (err) {
          console.log('Error while logging out:', err);
          return res.redirect('/');
      }
      req.flash('success', 'Logged out Successfully');
      return res.redirect('/');
  });
};
