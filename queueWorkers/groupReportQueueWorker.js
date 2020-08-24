const Queue = require('bull');
const GroupReportTransporter = require('./../classes/GroupReportTransporter');
const groupReportQueue = new Queue('groupReportQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});

groupReportQueue.process(async (work) => {
   const groupRequestTransporter = new GroupReportTransporter(work.data);
   groupRequestTransporter.sendMessageToGroupReports();
   groupReportQueue.clean(1000, 'completed');
});