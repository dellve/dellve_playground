var grpc = require('grpc');
var typesProto = grpc.load(__dirname + 
    '/dellve_proto/dellve_types.proto');
var benchendProto = grpc.load(__dirname + 
    '/dellve_proto/dellve_benchend.proto');

function BackendGRPCService(host, port, sampleIntervalInMs) {
    this.benchendClient = new benchendProto.Benchend(
        host + ':' + port,
        grpc.credentials.createInsecure()
    );

    this.metricStreamInfo = {
        sampleIntervalInMs: sampleIntervalInMs
    };
}

BackendGRPCService.prototype.startStream = function (onDataFunction, onEndFunction) {
    var startCall = this.benchendClient.startMetricStream(this.metricStreamInfo);

    startCall.on('error', function(err) {
        console.log('Could not connect to benchend.');
        return false;
    });
    startCall.on('data', onDataFunction);
    startCall.on('end', onEndFunction);
};


BackendGRPCService.prototype.stopStream = function () {
    this.benchendClient.stopMetricStream(this.metricStreamInfo, 
        function(err, status) {
            if (err) {
                console.log('Error closing metric stream :(');
                console.log(err);
            } else {
                console.log('Requested metric stream end!');
            }
        });
}

module.exports = BackendGRPCService
