const net = require('net');
const port = 7070;
const host = '127.0.0.1';
const server = net.createServer();
const Queue = require('bull');
const affiliateQueue = new Queue('affiliateQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});
const depositQueue = new Queue('depositQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});
const gameQueue = new Queue('gameQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});
const typesMapper = require('./logTypeMapper.json');
// const AdminTrans = require('./classes/AdminTransporter');
// const GroupTrans = require('./classes/GroupReportTransporter');

server.listen(port, host, () => {
   console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function (sock) { // connection event
   console.log('TCP listening on: ' + sock.remoteAddress + ':' + sock.remotePort);
   sockets.push(sock);
   sock.on('data', function (data) { // listen for incoming data
      const messageData = JSON.parse(`${data}`);
      const transporters = typesMapper.types[messageData.type];
      console.log(transporters);
      // if (messageData.type === 'affiliate') {
      //    const adminTransporter = new AdminTrans(messageData);
      //    adminTransporter.sendToAdmins();
      // }
      //
      // const groupTransporter = new GroupTrans(messageData);
      // groupTransporter.sendMessageToGroupReports();
   });

   sock.on('close', function (data) {
      let index = sockets.findIndex(function (o) {
         return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
      })
      if (index !== -1) sockets.splice(index, 1);
      console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
   });
});

/*
if (cluster.isMaster) {
   for (var i = 0; i < cpus; i++) {
      cluster.fork();
   }
} else {
   server.listen(port, host, () => {
      console.log('TCP Server is running on port ' + port + '.');
   });

   let sockets = [];

   server.on('connection', function (sock) { // connection event
      console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
      sockets.push(sock);
      sock.on('data', function (data) { // when receiving data

         let messageData = data + '';
         try {
            const parsedMessage = JSON.parse(messageData);
            const drivers = JSON.parse(parsedMessage.drivers);
            drivers.forEach(driver => {
               switch (driver) {
                  case 'admin':
                     adminTransporter.AdminTransporterModule(messageData);
                     break;
                  case 'db':
                     dbTransporter.DBTransportModules(messageData);
                     break;
                  case 'proxy':
                     proxyTransporter.ProxyTransportModule(messageData);
                     break;
               }
            });
         } catch (e) {
            console.log(e);
         }
      });

      sock.on('close', function (data) {
         let index = sockets.findIndex(function (o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
         })
         if (index !== -1) sockets.splice(index, 1);
         console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
      });
   });
}
*/