const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'salvador.krajcik59@ethereal.email',
        pass: 'wDJpvJwAmjJtqKkgaM'
    }
};

module.exports = nodemailer.createTransport(mailConfig);