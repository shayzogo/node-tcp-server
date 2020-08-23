const Queue = require('bull');
const GroupReportTransporter = require('./../classes/GroupReportTransporter');
const groupReportQueue = new Queue('dbQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});

groupReportQueue.process(async (work) => {
   const groupRequestTransporter = new GroupReportTransporter(work.data);
   groupRequestTransporter.sendMessageToGroupReports();
}, 100);