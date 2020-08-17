<?php

class Pusher {

   private $logString;
   private $logType;
   private $site;
   private $timestamp;

   public function __construct($logOptions) {
      $this->setLogString($logOptions->logString);
      $this->setLogType($logOptions->logType);
      $this->setSite($logOptions->site);
      $this->setTimestamp(new DateTime());
   }

   /**
    * This method is building the final message array.
    * It will connect the tcp server at port 7070 and push the log into it.
    * The message will be sent as json structure of the data
    */
   public function pushLogToServer($i) {
      $finalLogBuild = [
         'type' => $this->getLogType(),
         'message' => $this->getLogString(),
         'timestamp' => $this->getTimestamp(),
         'site' => $this->getSite(),
         'counter' => $i
      ];
      $fp = fsockopen("localhost", 7070, $errno, $errstr, 30);
      if (!$fp) {
         echo "$errstr ($errno)<br />\n";
      } else {
         fwrite($fp, json_encode($finalLogBuild));
         fclose($fp);
      }
   }

   public function getLogString() {
      return $this->logString;
   }

   private function setLogString($logString) {
      $this->logString = $logString;
   }

   public function getLogType() {
      return $this->logType;
   }

   private function setLogType($logType) {
      $this->logType = $logType;
   }

   public function getSite() {
      return $this->site;
   }

   private function setSite($site) {
      $this->site = $site;
   }

   public function getTimestamp() {
      return $this->timestamp;
   }

   public function setTimestamp($timestamp) {
      $this->timestamp = $timestamp;
   }
}