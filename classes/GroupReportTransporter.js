const request = require('request');


class GroupReportTransporter {
   constructor(message) {
      this.message = message;
   }

   sendMessageToGroupReports() {
      request({
         'method': 'POST',
         'url': 'https://postb.in/1598180826168-7872465543914?message=' + JSON.stringify(this.message),
         'headers': {}
      }, function (error, response) {
         if (error) throw new Error(error);
         console.log(response.body);
      });

   }
}

module.exports = GroupReportTransporter;