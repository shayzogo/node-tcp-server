const Queue = require('bull');

const groupReportQueue = new Queue('dbQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});
groupReportQueue.process(async (work) => {
   console.log(work.data);
}, 100);