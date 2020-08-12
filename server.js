const net = require('net');
const port = 7070;
const host = '127.0.0.1';
const server = net.createServer();
const adminTransporter = require('./tcpModules/AdminTransportModule');
const dbTransporter = require('./tcpModules/DBTransportModule');
const proxyTransporter = require('./tcpModules/ProxyTransportModule');

server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function (sock) { // connection event
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    sock.on('data', function (data) { // when receiving data
        let messageData = JSON.parse(`${data}`); // we master make it a string so we want get buffer
        const drivers = JSON.parse(messageData.drivers);
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
    });

    sock.on('close', function (data) {
        let index = sockets.findIndex(function (o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});