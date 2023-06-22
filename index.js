const express = require('express');
const app = express();
const port = 8000;
const db=require('./config/mongoose');
//require layout for implementing layouts
const expressLayouts=require('express-ejs-layouts');
//tell app to use assets folder
app.use(express.static('./assets'));
// Use express router
app.use(expressLayouts);
// extract style and scripts form sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/', require('./routes/index'));


//set up out view engine
app.set('view engine', 'ejs');
//require views folder and use it
app.set('views','./views');
app.listen(port, function(err) {
  if (err) {
    console.log(`Error in listening ${err}`);
  }
  console.log(`Server is started on port ${port}`);
});
