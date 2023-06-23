const express = require('express');
const router = express.Router();
// require controllers/user_controller and use it 
const userController = require('../controllers/user_controller');
//when accessing localhost:8000/user/profile goes below route
router.get('/profile', userController.profile);
//when accessing localhost:8000/user/sign-up goes below route
router.get('/sign-up',userController.signup);
//when accessing localhost:8000/user/signin goes below route
router.get('/sign-in',userController.signin);
router.post('/create',userController.create);
//export the router
module.exports = router;
