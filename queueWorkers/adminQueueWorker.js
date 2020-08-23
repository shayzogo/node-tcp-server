const Queue = require('bull');

const adminQueue = new Queue('adminQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});
adminQueue.process(async (work) => {
   console.log(work.data);
}, 50);