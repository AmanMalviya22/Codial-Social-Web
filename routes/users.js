const express = require("express");
const router = express.Router();
const passport = require("passport");
// require controllers/user_controller and use it
const userController = require("../controllers/user_controller");
//when accessing localhost:8000/user/profile goes below route
router.get("/profile",passport.checkAuthentication, userController.profile);
//when accessing localhost:8000/user/sign-up goes below route
router.get("/sign-up", userController.signup);
//when accessing localhost:8000/user/signin goes below route
router.get("/sign-in", userController.signin);
router.post("/create", userController.create);
//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
//export the router
module.exports = router;
