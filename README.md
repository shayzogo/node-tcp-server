# Nodejs TCP Server
> There is no need to run npm install

This project based on 3 files
1. server.js - a tcp server based on nodejs, will listen on port 7070
2. client.php - will play as the document that needs to use the pusher
3. Pusher.php - a class for pushing log messages to tcp server on port 7070

## Pusher
Pusher is a dummy pipe to get log string and pass it to the TCP server without doing<br>
Any manipulation to the data. 
The data is sent with a parameter to tell TCP where to send the logs, you can send them to admin emails, DB or proxy.

## Added load test and artillery for testing tcp server
In loadtest you can run <br>
`loadtest -n 1000 -c 100 --rps 200 localhost:7070?message=test`<br>
It will make 1000 request from 100 connection and will send 200 requests per second<Br>

In artillry  you can run<br>
`artillery quick --count 10 -n 20 http://localhost:7070?message=test`<Br>
It will make a quick test liken 10 users and every user send 20 requests