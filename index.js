const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const kue = require('kue');
const port = 8000;

const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore = require("connect-mongo");

//sassMiddleware to coovert sass code to css 
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat seerver to be used with socket.io









const chatServer = require('http').Server(app);

// Call the chatSockets function and pass the chatServer object
const { chatSockets } = require('./config/chat_sockets');
chatSockets(chatServer);

chatServer.listen(5000);
console.log('Chat server is listening on port 5000');
app.use(
  sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',
    prefix: '/css'
  })
);




app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
//make the uploads paths to the browser
app.use('/uploads',express.static(__dirname+'/uploads'))

const sessionStore = new MongoStore({
  mongoUrl: "mongodb://127.0.0.1:27017/codeial_development",
  mongooseConnection: mongoose.connection,
  autoRemove: "disabled",
});

app.use(
  session({
    name: "codial",
    secret: "somethingBlah",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 1000,
    },
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
const expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", require("./routes"));
kue.app.listen(3000);
console.log(`Kue dashboard is running on port ${port}`);
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in listening ${err}`);
  }
  console.log(`Server is started on port ${port}`);
});
