#!/bin/local/node

var express = require('express');
var httpServer = require('http').createServer(express());
var socketIOServer = require('socket.io')(httpServer);
var backendGRPC = require('./benchend-grpc');
var open = require("open");

function DELLveGUI(host, port, sampleRate) {
  benchend = new backendGRPC(host, port, sampleRate || 250);
}

DELLveGUI.prototype.start = function () {
  socketIOServer.on('connection', function(client) {
    console.log('Connected to web browser!');
    console.log('Starting metric stream...')
    benchend.startStream(
      // On-new-data callback
      function(metricData) {
        client.emit('data', JSON.stringify({
          gpuUtil: metricData.gpuUtil,
          memUtil: metricData.memUtil
        }));
      },
      // On-end-of-data callback
      function(metricDataEnd) {
        console.log("Metric stream ended. Shutting down...");
        process.exit();
      }
    );
  });

  open('index.html');
};

DELLveGUI.prototype.stop = function () {
  benchend.stopStream();
};

httpServer.listen(8888);

host = process.argv[2]
port = process.argv[3]
var dellveGUI = new DELLveGUI(host, port);
dellveGUI.start()
process.on('SIGINT', function () {
  console.log("Stopping metric stream...");
  dellveGUI.stop();
  process.exit();
});
