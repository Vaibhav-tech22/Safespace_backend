const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        secure:false,
        auth:{
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: options.to,
        subject: options.subject,
        text: options.message
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;