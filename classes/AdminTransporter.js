const nodemailer = require('nodemailer');

class AdminTransporter {
   emailAdmins = ['admin1@email.com', 'admin2@email.com', 'admin3@email.com'];

   constructor(message) {
      this.message = message;
   }

   sendToAdmins() {
      const adminEmails = this.emailAdmins;
      adminEmails.forEach(email => { // change settings to real smtp email account
         // const transport = nodemailer.createTransport({
         //    host: "smtp.mailtrap.io",
         //    port: 2525,
         //    auth: {
         //       user: "1a2b3c4d5e6f7g",
         //       pass: "1a2b3c4d5e6f7g"
         //    },
         //    debug: true,
         //    logger: true
         // });

         const options = {
            from: 'log manager',
            to: email,
            subject: 'Sending log entry to admin email',
            text: this.message
         };

         // transport.sendMail(options, function (error, info) {
         //    if (error) {
         //       console.log(error);
         //    } else {
         //       console.log('Email sent: ' + info.response);
         //    }
         // });
      });
   }
}

module.exports = AdminTransporter;