const net = require('net');
const brodcastWrapper = require('./modules/BroadcastingWrapper');
const port = 7070;
const host = '127.0.0.1';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function (sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    sock.on('data', function (data) {
        let messageData = 'data' + data;
        messageData = messageData.replace('dataPOST /pushlog?message=', '').replace('HTTP/1.1', '').trim();


        brodcastWrapper.BroadcastingWrapper(['email'], messageData);


        // Write the data back to all the connected, the client will receive it as data from the server
        // sockets.forEach(function (sock, index, array) {
        //     sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        // });
    });

    sock.on('close', function (data) {
        let index = sockets.findIndex(function (o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});