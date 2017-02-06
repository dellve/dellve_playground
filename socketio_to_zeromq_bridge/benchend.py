import zerorpc

class PrintRPC(object):
    def printMessage(self, message):
        print message
        return "Printed ZeroMQ message '%s' on server under test" % message

s = zerorpc.Server(PrintRPC())
s.bind("tcp://127.0.0.1:5555")
s.run()