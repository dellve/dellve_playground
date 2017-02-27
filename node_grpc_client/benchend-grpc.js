var grpc = require('grpc');
var typesProto = grpc.load(__dirname +
    '/dellve_proto/dellve_types.proto');
var benchendProto = grpc.load(__dirname +
    '/dellve_proto/dellve_benchend.proto');

function BenchendGRPCService(host, port, sampleIntervalInMs) {
    this.benchendStub = new benchendProto.Benchend(
        host + ':' + port,
        grpc.credentials.createInsecure()
    );

    this.metricStreamInfo = {
        sampleIntervalInMs: sampleIntervalInMs
    };
}

BenchendGRPCService.prototype.startStream = function (onDataFunction, onEndFunction) {
    var startCall = this.benchendStub.startMetricStream(this.metricStreamInfo);

    startCall.on('error', function(err) {
        console.log('Could not connect to benchend.');
        return false;
    });
    startCall.on('data', onDataFunction);
    startCall.on('end', onEndFunction);
};


BenchendGRPCService.prototype.stopStream = function () {
    this.benchendStub.stopMetricStream(this.metricStreamInfo,
        function(err, status) {
            if (err) {
                console.log('Error closing metric stream :(');
                console.log(err);
            } else {
                console.log('Requested metric stream end!');
            }
        });
}

module.exports = BenchendGRPCService
