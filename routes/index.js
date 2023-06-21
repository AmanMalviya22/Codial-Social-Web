const express = require('express');
const router = express.Router();
//require controllers/home_controller and use it 
const homeController = require('../controllers/home_controller');
// request with localhost:8000 goes to this route

router.get('/', homeController.home);
// request with localhost:8000/users   goes to this route
router.use('/users',require('./users'));
//exports the router
module.exports = router;
