const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
    console.log(process.env);
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        let info = await transporter.sendMail({
            from: "agrimchopra90@gmail.com",
            to: to,
            subject: "Your SafeSpace OTP",
            text: "Your secret OTP is " + otp,
        });
        console.log(`Message sent: ${info.messageId}`);
        return `Message sent: ${info.messageId}`;
    } catch (error) {
        console.error(error);
        return;
    }
};

module.exports = sendEmail;
