const request = require('request');


class GroupReportTransporter {
   constructor(message) {
      this.message = message;
   }

   sendMessageToGroupReports() {
      request({
         'method': 'POST',
         'url': 'https://postb.in/1597652984981-7005411118734?message=' + JSON.stringify(this.message),
         'headers': {}
      }, function (error, response) {
         if (error) throw new Error(error);
         console.log(response.body);
      });

   }
}

module.exports = GroupReportTransporter;