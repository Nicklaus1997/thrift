import glob
import sys
sys.path.append('gen-py')
#sys.path.insert(0, glob.glob('../../lib/py/build/lib*')[0])

from tutorial import Calculator
from tutorial.ttypes import InvalidOperationI8,InvalidOperationI16,InvalidOperationI32,InvalidOperationI64,InvalidOperationDouble,InvalidOperationMap,InvalidOperationString,InvalidOperationBool,InvalidOperationBinary,Operation

from shared.ttypes import SharedStructI8,SharedStructI16,SharedStructI32,SharedStructI64,SharedStructDouble,SharedStructString,SharedStructBool,SharedStructMap,SharedStructSet,SharedStructList,SharedStructBinary

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
from thrift.protocol import TJSONProtocol
from thrift.server import THttpServer

class CalculatorHandler:
    def __init__(self):
        self.log = {}

    def ping(self):
        print('ping()')

    def add(self, n1, n2):
        return n1 + n2

    def calculateI8(self, logid, work):
        if work.op == Operation.ADD:
            val = work.num1 + work.num2
        elif work.op == Operation.SUBTRACT:
            val = work.num1 - work.num2
        elif work.op == Operation.MULTIPLY:
            val = work.num1 * work.num2
        elif work.op == Operation.DIVIDE:
            if work.num2 == 0:
                raise InvalidOperationI8(work.op, 'Cannot divide by 0')
            val = work.num1 / work.num2
        else:
            raise InvalidOperationI8(work.op, 'Invalid operation')

        log = SharedStructI8()
        log.key = logid
        log.value = '%d' % (val)
        self.log[logid] = log

        return val

    def calculateI16(self, logid, work):
        if work.op == Operation.ADD:
            val = work.num1 + work.num2
        elif work.op == Operation.SUBTRACT:
            val = work.num1 - work.num2
        elif work.op == Operation.MULTIPLY:
            val = work.num1 * work.num2
        elif work.op == Operation.DIVIDE:
            if work.num2 == 0:
                raise InvalidOperationI16(work.op, 'Cannot divide by 0')
            val = work.num1 / work.num2
        else:
            raise InvalidOperationI16(work.op, 'Invalid operation')

        log = SharedStructI16()
        log.key = logid
        log.value = '%d' % (val)
        self.log[logid] = log

        return val

    def calculateI32(self, logid, work):
        if work.op == Operation.ADD:
            val = work.num1 + work.num2
        elif work.op == Operation.SUBTRACT:
            val = work.num1 - work.num2
        elif work.op == Operation.MULTIPLY:
            val = work.num1 * work.num2
        elif work.op == Operation.DIVIDE:
            if work.num2 == 0:
                raise InvalidOperationI32(work.op, 'Cannot divide by 0')
            val = work.num1 / work.num2
        else:
            raise InvalidOperationI32(work.op, 'Invalid operation')

        log = SharedStructI32()
        log.key = logid
        log.value = '%d' % (val)
        self.log[logid] = log

        return val

    def calculateI64(self, logid, work):
        if work.op == Operation.ADD:
            val = work.num1 + work.num2
        elif work.op == Operation.SUBTRACT:
            val = work.num1 - work.num2
        elif work.op == Operation.MULTIPLY:
            val = work.num1 * work.num2
        elif work.op == Operation.DIVIDE:
            if work.num2 == 0:
                raise InvalidOperationI64(work.op, 'Cannot divide by 0')
            val = work.num1 / work.num2
        else:
            raise InvalidOperationI64(work.op, 'Invalid operation')

        log = SharedStructI64()
        log.key = logid
        log.value = '%d' % (val)
        self.log[logid] = log

        return val

    def calculateDouble(self, logid, work):
        if work.op == Operation.ADD:
            val = work.num1 + work.num2
        elif work.op == Operation.SUBTRACT:
            val = work.num1 - work.num2
        elif work.op == Operation.MULTIPLY:
            val = work.num1 * work.num2
        elif work.op == Operation.DIVIDE:
            if work.num2 == 0:
                raise InvalidOperationDouble(work.op, 'Cannot divide by 0')
            val = work.num1 / work.num2
        else:
            raise InvalidOperationDouble(work.op, 'Invalid operation')

        log = SharedStructDouble()
        log.key = logid
        log.value = '%.2f' % (val)
        self.log[logid] = log

        return val

    def performAppendString(self, logid, work):
        if work.op == Operation.APPEND:
            val = work.value1 + work.value2
        else:
            raise InvalidOperationString(work.op, 'Invalid operation')

        log = SharedStructString()
        log.key = logid
        log.value = val
        self.log[logid] = log

        return val

    def performReverseBoolean(self, logid, work):
        if work.op == Operation.REVERSE_BOOLEAN:
            val = not work.value
        else:
            raise InvalidOperationBool(work.op, 'Invalid operation')

        log = SharedStructBool()
        log.key = logid
        log.value = val
        self.log[logid] = log

        return val

    def performByteArraySize(self, logid, work):
        if work.op == Operation.BINARY_SIZE:
            val = len(work.value)
        else:
            raise InvalidOperationBinary(work.op, 'Invalid operation')

        log = SharedStructBinary()
        log.key = logid
        log.value = '%d' % (val)
        self.log[logid] = log

        return val

    def getMapSize(self, logid, work):
        if work.op == Operation.MAP_SIZE:
            val = len(list(work.mapValue))
        else:
            raise InvalidOperationMap(work.op, 'Invalid operation')

        log = SharedStructMap()
        log.key = logid
        log.value = '%d' % (val)
        self.log[logid] = log

        return val

    def getSetSize(self, logid, work):
        if work.op == Operation.SET_SIZE:
            val = len(work.setValue)
        else:
            raise InvalidOperationSet(work.op, 'Invalid operation')

        log = SharedStructSet()
        log.key = logid
        log.value = '%d' % (val)
        self.log[logid] = log

        return val

    def getListSize(self, logid, work):
        if work.op == Operation.LIST_SIZE:
            val = len(work.listValue)
        else:
            raise InvalidOperationList(work.op, 'Invalid operation')

        log = SharedStructList()
        log.key = logid
        log.value = '%d' % (val)
        self.log[logid] = log

        return val

    def getStruct(self, key):
        return self.log[key]

    def zip(self):
        print('zip()')


if __name__ == '__main__':
    handler = CalculatorHandler()
    processor = Calculator.Processor(handler)
    protoFactory = TJSONProtocol.TJSONProtocolFactory()
    port = 5555
    server = THttpServer.THttpServer(processor, ("10.50.40.20", port), protoFactory)
    print("Python server running on port " + str(port))
    server.serve()
    #transport = TSocket.TServerSocket(host='192.168.1.3', port=9090)
    #tfactory = TTransport.TBufferedTransportFactory()
    #pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    #server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    # You could do one of these for a multithreaded server
    # server = TServer.TThreadedServer(
    #     processor, transport, tfactory, pfactory)
    # server = TServer.TThreadPoolServer(
    #     processor, transport, tfactory, pfactory)

    #print('Starting the server...')
    #server.serve()
    #print('done.')