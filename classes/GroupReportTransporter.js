const request = require('postman-request');

class GroupReportTransporter {
   constructor(message) {
      this.message = message;
   }

   sendMessageToGroupReports() {
      request({
         'method': 'POST',
         'url': 'https://postb.in/1598257948929-4906771949026',
         'headers': {},
         'body': this.message
      }, function (error, response) {
         if (error) throw new Error(error);
      });

   }
}

module.exports = GroupReportTransporter;