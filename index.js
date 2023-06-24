const express = require("express");
//require cookie-parse for creating and updating cookie
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");
//tell app to use middleware
app.use(express.urlencoded());
//tell app to use cookie parser
app.use(cookieParser());
//require layout for implementing layouts
const expressLayouts = require("express-ejs-layouts");
//tell app to use assets folder
app.use(express.static("./assets"));

// Use express router
app.use(expressLayouts);
// extract style and scripts form sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up out view engine
app.set("view engine", "ejs");
//require views folder and use it
app.set("views", "./views");

app.use(
  session({
    name: "codial",
    // to do change the secret before deployment in the production mode
    secret: "somethingBlah",
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in listening ${err}`);
  }
  console.log(`Server is started on port ${port}`);
});
