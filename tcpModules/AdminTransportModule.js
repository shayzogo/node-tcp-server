/**
 * After getting new message from the adminQueue it will send it to the admins,
 * This feature need to be implemented
 */
const nodemailer = require('nodemailer');
const emailAdmins = ['admin1@email.com', 'admin2@email.com', 'admin3@email.com'];

const AdminTransporterModule = (messageData) => {
   const adminEmails = emailAdmins;
   adminEmails.forEach(email => {
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
         from: 'TCP Log Sever',
         to: email,
         subject: 'New Log Entry',
         text: messageData
      };

      transport.sendMail(options, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log('Email sent: ' + info.response);
         }
      });
   });
}

exports.AdminTransporterModule = AdminTransporterModule;