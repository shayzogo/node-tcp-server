<?php
require_once 'Pusher.php';
$options = new stdClass();
$options->logString = 'This is a test message';
$options->logType = 'deposit';
$options->site = 'ares';
$options->pushDrivers = ['admin', 'db', 'socket'];
$pusher = new Pusher($options);
$pusher->pushLogToServer();

