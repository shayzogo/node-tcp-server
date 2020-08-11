const net = require('net');
const port = 7070;
const host = '127.0.0.1';
const server = net.createServer();
const emailTransporter = require('./tcpModules/EmailTransportModule');
const adminTransporter = require('./tcpModules/AdminTransportModule');
const dbTransporter = require('./tcpModules/DBTransportModule');
const proxyTransporter = require('./tcpModules/ProxyTransportModule');

server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function (sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    sock.on('data', function (data) {
        let messageData = JSON.parse(`${data}`);
        const drivers = JSON.parse(messageData.drivers);
        drivers.forEach(driver => {
            switch (driver) {
                case 'admin': // email of admins
                    adminTransporter.AdminTransporterModule(messageData);
                    break;
                case 'db': // database server
                    dbTransporter.DBTransportModules(messageData);
                    break;
                case 'proxy': // well, proxy
                    proxyTransporter.ProxyTransportModule(messageData);
                    break
                case 'email': // list of pre configured emails
                    emailTransporter.EmailTransportModule(messageData);
                    break;
            }
        });
        // console.log(messageData);
    });

    sock.on('close', function (data) {
        let index = sockets.findIndex(function (o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});