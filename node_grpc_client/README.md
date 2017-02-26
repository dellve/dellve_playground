
Node.js GRPC client

Client receives metricData from the benchend and outputs the information on the commandline (if running CLI). 

Getting Started
---------------

Install necessary packages.

```
	npm install
```

Run the benchend service. This is found at [dellve_py repository](https://github.com/dellve/dellve_py/tree/master/dellve_benchend).

```
	python service.py
```


Run the client.

```
	node BackendCLI.js <host> <port>
    node BackendCLI.js localhost 5555 // benchend on local machine
    node BackendCLI.js 10.157.26.8 5555 // benchend on UTA server
```
