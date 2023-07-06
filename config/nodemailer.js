const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587, // 'post' should be 'port'
    secure: false,
    auth: {
        user: 'amanaman@gmail.com',
        password: 'a#1009998@A'
    }
});

let renderTemplate = (relativePath, data) => { // corrected the arrow function syntax
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log('error in rendering template');
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
