const express = require('express');
const router = express.Router();
// require controllers/user_controller and use it 
const userController = require('../controllers/user_controller');
//when accessing localhost:8000/user/profile goes below route
router.get('/profile', userController.profile);

//export the router
module.exports = router;
