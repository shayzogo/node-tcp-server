const request = require('postman-request');

class GroupReportTransporter {
   constructor(message) {
      this.message = message;
   }

   sendMessageToGroupReports() {
      request({
         'method': 'POST',
         'url': 'https://www.groupreport.bet/api/logs/',
         'headers': {},
         'body': this.message
      }, function (error, response) {
         if (error) throw new Error(error);
      });

   }
}

module.exports = GroupReportTransporter;