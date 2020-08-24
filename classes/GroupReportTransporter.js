class GroupReportTransporter {
   constructor(message) {
      this.message = message;
   }

   sendMessageToGroupReports() {
      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(this.message);
      const requestOptions = {
         method: 'POST',
         headers: requestHeaders,
         body: raw,
         redirect: 'follow'
      };
      // https://www.groupreport.bet/api/logs/
      fetch("https://postb.in/1598251083469-8029313110746", requestOptions)
         .then(response => response.text())
         .then(result => console.log(result))
         .catch(error => console.log('error', error));
   }
}

module.exports = GroupReportTransporter;