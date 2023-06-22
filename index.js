const express = require('express');
const app = express();
const port = 8000;
//require layout for implementing layouts
const expressLayouts=require('express-ejs-layouts');
// Use express router
app.use(expressLayouts);
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
