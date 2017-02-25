
var grpc = require('grpc');
var typesProto = grpc.load(__dirname + 
	'/dellve_proto/dellve_types.proto');
var benchendProto = grpc.load(__dirname + 
	'/dellve_proto/dellve_benchend.proto');

var benchendClient = new benchendProto.Benchend(
	'localhost:5555',
	grpc.credentials.createInsecure()
);

var metricStreamInfo = {
	sampleIntervalInMs: 500
};

var startCall = benchendClient.startMetricStream(metricStreamInfo);

var maxMessageCount = 10;
var messageCount = 0;

startCall.on('data', function(metricData) {
	messageCount = messageCount + 1;
    console.log(metricData.gpuUtil);

    if (messageCount == maxMessageCount) {
    	benchendClient.stopMetricStream(metricStreamInfo, 
    		function(err, status) {
    			if (err) {
    				console.log('Error closing metric stream:(');
				} else {
					console.log('Requested metric stream end!');
				}
			});
    }
});
  
startCall.on('end', function() {
	console.log('Okay, we got metric stream end!');
});

console.log('Yo!');
