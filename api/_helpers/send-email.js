const nodemailer = require('nodemailer');
const config = require('config.json');

module.exports = { sendEmail, sendEmailAttachment } ;

async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    var mailOption = {
        from: from,
        to:  to,
        subject: subject,
        html: html
}
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail( mailOption, function(err,success){
    });
}

async function sendEmailAttachment({ to, subject, html, attach, from = config.emailFrom }) {
    var mailOption = {
        from: from,
        to:  to,
        subject: subject,
        html: html,
        attachments: attach
}
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail( mailOption , function(err,success){
        if(err){
            console.log('err',err);
            return 'error';
        }
        else{
            return true;
        }
    } );
}