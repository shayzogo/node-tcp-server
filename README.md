# Nodejs TCP Server
> Please do not forget to read the "Before Deploying" section

![node-current](https://img.shields.io/node/v/bull)

This project based on 3 files
1. server.js - a tcp server based on nodejs, will listen on port 7070
2. client.php - will play as the document that needs to use the pusher
3. Pusher.php - a class for pushing log messages to tcp server on port 7070

> Do not forget to run `npm install` for dependancies installations

## Pusher
Pusher is a dummy pipe to get log string and pass it to the TCP server without doing<br>
Any manipulation to the data. 
The data is sent with a parameter to tell TCP where to send the logs, you can send them to admin emails, DB or proxy.

## You can make apache benchmark
1. ```shell script
   php -S localhost:8080 -t .
    ``` 
    will start php development server
2. ```shell script 
   ab -n 10000 -c 10 http://localhost:8080/client.php
   ```
    use the development sever to invoke client.php

## redis-commander
Redis commander is a web ui to manage redis.<br>
Be aware, it will manage the redis of the localhost include websites and pm.<br>
The branch of this project is `bull`.<br>
To run redis commander just write `redis-commander` in the project root (installed locally)

## About the file test-client.sh
This is a bash command for looping 10000 iterations of client.php.<br>
This file, unlike the apache benchmark, will be slower and make every iteration one call (will not send multiple requests concurrently)<br>
Try not to use this file.

## Before Deploying
Before deploying the server to production, dont forget to change the redis connection credentials and settings
```javascript
const dbQueue = new Queue('dbQueue', {redis: {port: 6379, host: '127.0.0.1', password: ''}});
```

Please make sure you are using the needed dependencies
```json
  "dependencies": {
    "bull": "^3.18.0",
    "nodemailer": "^6.4.11",
    "request": "^2.88.2"
  },
  "devDependencies": {
    "redis-commander": "^0.7.0"
  }
```

## about the workers
In tge classes directory you will find the clients that will connect to the bull queues in redis.<br>
Those files needs to run as process and they will listen to changes.<br>
When running, they will also clear the DB from completed at least 5 seconds ago.