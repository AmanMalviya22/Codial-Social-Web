const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587, // 'post' should be 'port'
    secure: false,
    auth: {
        user: 'amanaman26802@gmail.com',
        pass: 'huwfumwnqvlrblbt'
    }
});

let renderTemplate = (data, relative) => {
    let mailHTML;
    ejs.renderFile(
      path.join(__dirname, "../views/mailers", relative),
      data,
      function (err, template) {
        if (err) {
          console.log("Error in rendering template", err);
          return;
        }
  
        mailHTML = template;
      }
    );
  
    return mailHTML;
  };

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate // corrected the function name
};
