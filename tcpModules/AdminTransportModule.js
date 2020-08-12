const nodemailer = require('nodemailer');
const emailAdmins = ['admin1@email.com', 'admin2@email.com', 'admin3@email.com'];

const AdminTransporterModule = (messageData) => {
    const message = '';
    const adminEmails = emailAdmins;
    adminEmails.forEach(email => { // This is an example and need to be changed to the real details
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "1a2b3c4d5e6f7g",
                pass: "1a2b3c4d5e6f7g"
            },
            debug: true,
            logger: true
        });

        const options = {
            from: 'log manager',
            to: email,
            subject: 'Sending log entry to admin email',
            text: message
        };

        transport.sendMail(options, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })

}

exports.AdminTransporterModule = AdminTransporterModule;