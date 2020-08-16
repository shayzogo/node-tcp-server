// This module will write the received messages into redis.
const redis = require('redis');

const DBTransportModule = (messageData) => {
   const client = redis.createClient({
      port: 6379,
      host: '127.0.0.1'
   });
   console.log(messageData);
   // client.set('some-key', '42', function (err) {
   //    if (err) {
   //       throw err; /* in production, handle errors more gracefully */
   //    } else {
   //       client.get('some-key', function (err, value) {
   //             if (err) {
   //                throw err;
   //             } else {
   //                console.log(value);
   //             }
   //          }
   //       );
   //    }
   // });
}

exports.DBTransportModules = DBTransportModule;