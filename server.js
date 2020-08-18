const net = require('net');
const server = net.createServer();
const host = '127.0.0.1';
const port = 7070;

/**
 * Making instances of the bull queue objects to use inside the server when needed,
 * It looks like its not in use but it is with `eval(transporterName).add({msg: data + ''})`;
 * @type {Queue}
 */
const Queue = require('bull');
const dbQueue = new Queue('dbQueue');
const adminQueue = new Queue('adminQueue');
const groupReportQueue = new Queue('groupReportQueue');

/**
 * There are currently only 3 gateways, inside this json you can map any log type to any gateway
 * please make changes only to this file and dont do any bypasses
 * @type {{types: {affiliate: array[string], deposit: array[string], game: array[string]}}}
 */
const typesMapper = require('./logTypeMapper.json');

/**
 * Open listener on host+port
 */
server.listen(port, host, () => {
   console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];
server.on('connection', function (sock) { // connection event
   console.log('TCP listening on: ' + sock.remoteAddress + ':' + sock.remotePort);
   sockets.push(sock);
   sock.on('data', function (data) { // listen for incoming data
      const messageData = JSON.parse(`${data}`); // The data is buffered so we need to string it and parse
      const transporters = typesMapper.types[messageData.type];
      transporters.forEach(transporter => {
         const transporterName = transporter + 'Queue'; // Build the bull queue name for this transporter
         try {
            eval(transporterName).add({msg: data + ''}); // use to push the message to bull queue
         } catch (e) {
            console.log(e);
         }
      });
   });

   sock.on('close', function (data) { // on close connection event
      let index = sockets.findIndex(function (o) {
         return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
      })
      if (index !== -1) sockets.splice(index, 1);
      console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
   });
});