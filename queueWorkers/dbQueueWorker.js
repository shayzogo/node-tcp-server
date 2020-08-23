const Queue = require('bull');

const dbQueue = new Queue('dbQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});
dbQueue.process(async (work) => {
   console.log(work.data);
}, 125);