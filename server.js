// We need to check
const net = require('net');
const port = 7070;
const host = '127.0.0.1';
const server = net.createServer();


// If using cluster dont forget to run `npm install cluster`
// const cluster = require('cluster'); // for using only for cluster mode -> see commented code example
// const cpus = require('os').cpus().length; // will be use to instances cluster creation if used

server.listen(port, host, () => {
   console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function (sock) { // connection event
   console.log('TCP listening on: ' + sock.remoteAddress + ':' + sock.remotePort);
   sockets.push(sock);
   sock.on('data', function (data) { // listen for incoming data
      const messageData = JSON.parse(`${data}`);
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