<?php
$message = filter_var($_GET['message'], FILTER_SANITIZE_STRING);
$fp = fsockopen("localhost", 7070, $errno, $errstr, 30);
if (!$fp) {
    echo "$errstr ($errno)<br />\n";
} else {
    fwrite($fp, $message);
    fclose($fp);
}

