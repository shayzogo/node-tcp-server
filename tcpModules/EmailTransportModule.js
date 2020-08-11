const nodemailer = require('nodemailer');

const EmailTransportModule = (message) => {
    console.log(message);
    // const transport = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //         user: "1a2b3c4d5e6f7g",
    //         pass: "1a2b3c4d5e6f7g"
    //     }
    // });

    // const mailOptions = {
    //     from: 'log manager',
    //     to: 'ziv@email.com',
    //     subject: 'Sending log entry to admin email',
    //     text: message
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
}

exports.EmailTransportModule = EmailTransportModule;
