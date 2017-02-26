var backendGRPC = require('./BackendGRPCService')
var progressBar = require('./ProgressBar');

var backend = null;
var gpuBar = null;
var memBar = null;

function CLI(host, port) {
    // dell server at UTA: '10.157.26.8'
    backend = new backendGRPC(host, port, 500)
    gpuBar = new progressBar('GPU', 'red');
    memBar = new progressBar('MEM', 'blue');
}

CLI.prototype.start = function () {
    var success = backend.startStream(this.newData, this.endData);
    console.log('Connecting to benchend...');
}

CLI.prototype.stop = function () {
	backend.stopStream();
	console.log('\n Stream ended.');
}
 
CLI.prototype.newData = function(metricData) {
    gpuBar.update(metricData.gpuUtil / 100);
    memBar.update(metricData.memUtil / 100);
}
 
CLI.prototype.endData = function(metricData) {
    console.log('Okay, we got metric stream end!');
}

host = process.argv[2]
port = process.argv[3]
var cli = new CLI(host, port);
cli.start()

process.on('SIGINT', function () {
	cli.stop();
	process.exit();
});
