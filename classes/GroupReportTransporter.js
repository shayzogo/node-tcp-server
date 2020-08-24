const request = require('postman-request');

class GroupReportTransporter {
   constructor(message) {
      this.message = message;
   }

   sendMessageToGroupReports() {
      request({
         'method': 'POST',
         'url': 'https://postb.in/1598255313082-6698292733635?message=' + JSON.stringify(this.message),
         'headers': {}
      }, function (error, response) {
         if (error) throw new Error(error);
         console.log(response.body);
      });

   }
}

module.exports = GroupReportTransporter;