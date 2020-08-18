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

## You can maka apache benchmarking
1. `php -S localhost:8080 -t .` will start php development server
2. `ab -n 10000 -c 10 http://localhost:8080/client.php` use the development sever to invoke client.php

## redis-commander
Redis commander is a web ui to manage redis.<br>
Be aware, it will manage the redis of the localhost include websites and pm.<br>
The branch of this project is `bull`