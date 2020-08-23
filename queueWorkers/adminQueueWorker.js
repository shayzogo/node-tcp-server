const Queue = require('bull');
const AdminTransporter = require('./../classes/AdminTransporter');

const adminQueue = new Queue('adminQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});
adminQueue.process(async (work) => {
   const adminTransporter = new AdminTransporter(work.data);
   adminTransporter.sendToAdmins();
   adminQueue.clean(5000, 'completed');
});