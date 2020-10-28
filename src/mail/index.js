const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const mailConfig = require('../config/mail.json');

const transport =  nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass
  }
});

transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/mail/templates/')
  },
  viewPath: path.resolve('./src/mail/templates/'),
  extName: '.html'
}))

module.exports = transport;