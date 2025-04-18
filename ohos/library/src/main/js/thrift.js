/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import http from '@ohos.net.http';
import webSocket from '@ohos.net.webSocket';
import {Binary} from './binary';
import {Int64} from './Int64';
import {Int64utils} from './int64utils'
import Log from './log.js';

var Thrift = {

  /**
   * Thrift JavaScript library version.
   * @readonly
   * @const {string} Version
   * @memberof Thrift
   */

  Version: '0.16.0',

  /**
   * Thrift IDL type string to Id mapping.
   * @readonly
   * @property {number}  STOP   - End of a set of fields.
   * @property {number}  VOID   - No value (only legal for return types).
   * @property {number}  BOOL   - True/False integer.
   * @property {number}  BYTE   - Signed 8 bit integer.
   * @property {number}  I08    - Signed 8 bit integer.
   * @property {number}  DOUBLE - 64 bit IEEE 854 floating point.
   * @property {number}  I16    - Signed 16 bit integer.
   * @property {number}  I32    - Signed 32 bit integer.
   * @property {number}  I64    - Signed 64 bit integer.
   * @property {number}  STRING - Array of bytes representing a string of characters.
   * @property {number}  UTF7   - Array of bytes representing a string of UTF7 encoded characters.
   * @property {number}  STRUCT - A multifield type.
   * @property {number}  MAP    - A collection type (map/associative-array/dictionary).
   * @property {number}  SET    - A collection type (unordered and without repeated values).
   * @property {number}  LIST   - A collection type (unordered).
   * @property {number}  UTF8   - Array of bytes representing a string of UTF8 encoded characters.
   * @property {number}  UTF16  - Array of bytes representing a string of UTF16 encoded characters.
   */

  Type: {
    STOP: 0,
    VOID: 1,
    BOOL: 2,
    BYTE: 3,
    I08: 3,
    DOUBLE: 4,
    I16: 6,
    I32: 8,
    I64: 10,
    STRING: 11,
    UTF7: 11,
    STRUCT: 12,
    MAP: 13,
    SET: 14,
    LIST: 15,
    UTF8: 16,
    UTF16: 17
  },

  /**
   * Thrift RPC message type string to Id mapping.
   * @readonly
   * @property {number}  CALL      - RPC call sent from client to server.
   * @property {number}  REPLY     - RPC call normal response from server to client.
   * @property {number}  EXCEPTION - RPC call exception response from server to client.
   * @property {number}  ONEWAY    - Oneway RPC call from client to server with no response.
   */

  MessageType: {
    CALL: 1,
    REPLY: 2,
    EXCEPTION: 3,
    ONEWAY: 4
  },

  /**
   * Utility function returning the count of an object's own properties.
   * @param {object} obj - Object to test.
   * @returns {number} number of object's own properties
   */

  objectLength: function (obj) {
    var length = 0;
    for (var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        length++;
      }
    }
    return length;
  },

  inherits: function (constructor, superConstructor, name) {
    function F() {
    }

    F.prototype = superConstructor.prototype;
    constructor.prototype = new F();
    constructor.prototype.name = name || '';
  }
};

Thrift.TException = function (message) {
  this.message = message;
};
Thrift.inherits(Thrift.TException, Error, 'TException');

/**
 * Returns the message set on the exception.
 * @readonly
 * @returns {string} exception message
 */

Thrift.TException.prototype.getMessage = function () {
  return this.message;
};

/**
 * Thrift Application Exception type string to Id mapping.
 * @readonly
 * @property {number}  UNKNOWN                 - Unknown/undefined.
 * @property {number}  UNKNOWN_METHOD          - Client attempted to call a method unknown to the server.
 * @property {number}  INVALID_MESSAGE_TYPE    - Client passed an unknown/unsupported MessageType.
 * @property {number}  WRONG_METHOD_NAME       - Unused.
 * @property {number}  BAD_SEQUENCE_ID         - Unused in Thrift RPC, used to flag proprietary sequence number errors.
 * @property {number}  MISSING_RESULT          - Raised by a server processor if a handler fails to supply
 *                                               the required return result.
 * @property {number}  INTERNAL_ERROR          - Something bad happened.
 * @property {number}  PROTOCOL_ERROR          - The protocol layer failed to serialize or deserialize data.
 * @property {number}  INVALID_TRANSFORM       - Unused.
 * @property {number}  INVALID_PROTOCOL        - The protocol (or version) is not supported.
 * @property {number}  UNSUPPORTED_CLIENT_TYPE - Unused.
 */

Thrift.TApplicationExceptionType = {
  UNKNOWN: 0,
  UNKNOWN_METHOD: 1,
  INVALID_MESSAGE_TYPE: 2,
  WRONG_METHOD_NAME: 3,
  BAD_SEQUENCE_ID: 4,
  MISSING_RESULT: 5,
  INTERNAL_ERROR: 6,
  PROTOCOL_ERROR: 7,
  INVALID_TRANSFORM: 8,
  INVALID_PROTOCOL: 9,
  UNSUPPORTED_CLIENT_TYPE: 10
};

Thrift.TApplicationException = function (message, code) {
  this.message = message;
  this.code = typeof code === 'number' ? code : 0;
};
Thrift.inherits(Thrift.TApplicationException, Thrift.TException, 'TApplicationException');

/**
 * Read a TApplicationException from the supplied protocol.
 * @param {object} input - The input protocol to read from.
 */

Thrift.TApplicationException.prototype.read = function (input) {
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();

    if (ret.ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      var fid = ret.fid;
      switch (fid) {
        case 1:
          if (ret.ftype == Thrift.Type.STRING) {
            ret = input.readString();
            this.message = ret.value;
          } else {
            ret = input.skip(ret.ftype);
          }
          break;
        case 2:
          if (ret.ftype == Thrift.Type.I32) {
            ret = input.readI32();
            this.code = ret.value;
          } else {
            ret = input.skip(ret.ftype);
          }
          break;
        default:
          ret = input.skip(ret.ftype);
          break;
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

/**
 * Write a TApplicationException to the supplied protocol.
 * @param {object} output - The output protocol to write to.
 */

Thrift.TApplicationException.prototype.write = function (output) {
  output.writeStructBegin('TApplicationException');

  if (this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1);
    output.writeString(this.getMessage());
    output.writeFieldEnd();
  }

  if (this.code) {
    output.writeFieldBegin('type', Thrift.Type.I32, 2);
    output.writeI32(this.code);
    output.writeFieldEnd();
  }

  output.writeFieldStop();
  output.writeStructEnd();
};

/**
 * Returns the application exception code set on the exception.
 * @readonly
 * @returns {Thrift.TApplicationExceptionType} exception code
 */

Thrift.TApplicationException.prototype.getCode = function () {
  return this.code;
};

Thrift.TProtocolExceptionType = {
  UNKNOWN: 0,
  INVALID_DATA: 1,
  NEGATIVE_SIZE: 2,
  SIZE_LIMIT: 3,
  BAD_VERSION: 4,
  NOT_IMPLEMENTED: 5,
  DEPTH_LIMIT: 6
};

Thrift.TProtocolException = function TProtocolException(type, message) {
  Error.call(this);
  if (Error.captureStackTrace !== undefined) {
    Error.captureStackTrace(this, this.constructor);
  }
  this.name = this.constructor.name;
  this.type = type;
  this.message = message;
};
Thrift.inherits(Thrift.TProtocolException, Thrift.TException, 'TProtocolException');

Thrift.Transport = Thrift.THTTPTransport = function (url, options) {
  this.url = url;
  this.wpos = 0;
  this.rpos = 0;
  this.useCORS = (options && options.useCORS);
  this.customHeaders = options ? (options.customHeaders ? options.customHeaders : {}) : {};
  this.sendBuf = '';
  this.recvBuf = '';
}

Thrift.THTTPTransport.prototype = {

  /**
   * Gets the specific HttpRequest Object.
   * @returns {object} the httpRequest interface object
   */

  getHttpRequestObject: function () {
  },

  /**
   * Sends the current XRH request if the transport was created with a URL
   * and the async parameter is false. If the transport was not created with
   * a URL, or the async parameter is True and no callback is provided, or
   * the URL is an empty string, the current send buffer is returned.
   * @param {object} async - If true the current send buffer is returned.
   * @param {object} callback - Optional async completion callback
   * @returns {undefined|string} Nothing or the current send buffer.
   * @throws {string} If THTTPTransport fails.
   */

    flush: function (async, callback) {
        var self = this;
        if ((async && !callback) || this.url === undefined || this.url === '') {
            throw new Thrift.TException(" Exception:No connection url");
        }
        var headers = {};
        Object.keys(self.customHeaders).forEach(function (prop) {
            headers[prop] = self.customHeaders[prop];
        });
        headers['Accept'] = 'application/vnd.apache.thrift.json; charset=utf-8';
        headers['Content-Type'] = 'application/vnd.apache.thrift.json; charset=utf-8';

        var options = {
            method: 'POST',
            header: headers,
            extraData: this.sendBuf
        };
        var clientCallback = callback;
        var httpCarrier = http.createHttp();
        httpCarrier.request(this.url, options, (err, data) => {
            if (err == null) {
                this.recvBuf = data.result;
                this.recvBufSz = data.result.length;
                this.wpos = data.result.length;
                this.rpos = 0;
                if (clientCallback) {
                    clientCallback();
                }
            } else {
                throw new Thrift.TException(" Exception:Encountered a unknown request status");
            }
        });
    },

  /**
   * Sets the buffer to provide the protocol when deserializing.
   * @param {string} buf - The buffer to supply the protocol.
   */

  setRecvBuffer: function (buf) {
    this.recvBuf = buf;
    this.recvBufSz = this.recvBuf.length;
    this.wpos = this.recvBuf.length;
    this.rpos = 0;
  },

  /**
   * Returns true if the transport is open, HTTP always returns true.
   * @readonly
   * @returns {boolean} Always True.
   */

  isOpen: function () {
    return true;
  },

  /**
   * Opens the transport connection, with HTTP this is a nop.
   */

  open: function () {
  },

  /**
   * Closes the transport connection, with HTTP this is a nop.
   */

  close: function () {
  },

  /**
   * Returns the specified number of characters from the response
   * buffer.
   * @param {number} len - The number of characters to return.
   * @returns {string} Characters sent by the server.
   */

  read: function (len) {
    var avail = this.wpos - this.rpos;

    if (avail === 0) {
      return '';
    }

    var give = len;

    if (avail < len) {
      give = avail;
    }

    var ret = this.readBuf.substr(this.rpos, give);
    this.rpos += give;

    // clear buf when complete?
    return ret;
  },

  /**
   * Returns the entire response buffer.
   * @returns {string} Characters sent by the server.
   */

  readAll: function () {
    return this.recvBuf;
  },

  /**
   * Sets the send buffer to buf.
   * @param {string} buf - The buffer to send.
   */

  write: function (buf) {
    this.sendBuf = buf;
  },

  /**
   * Returns the send buffer.
   * @readonly
   * @returns {string} The send buffer.
   */

  getSendBuffer: function () {
    return this.sendBuf;
  },

  /**
   * Sets the seqId. (Custom Function)
   * @param seqId: seqId to be set
   */

  setCurrSeqId: function (seqId) {
  }

};


/**
 * Constructor Function for the WebSocket transport.
 * @constructor
 * @param {string} [url] - The URL to connect to.
 * @classdesc The Apache Thrift Transport layer performs byte level I/O
 * between RPC clients and servers. The JavaScript TWebSocketTransport object
 * uses the WebSocket protocol. Target servers must implement WebSocket.
 * (see: node.js example server_http.js).
 * @example
 *   var transport = new Thrift.TWebSocketTransport("http://localhost:8585");
 */

Thrift.TWebSocketTransport = function (url) {
  this.__reset(url);
};

Thrift.TWebSocketTransport.prototype = {
  __reset: function (url) {
    this.url = url; // Where to connect
    this.ws = null; // The web socket
    this.callbacks = []; // Pending callbacks
    this.sendPending = []; // Buffers/Callback pairs waiting to be sent
    this.sendBuf = ''; // Outbound data, immutable until sent
    this.recvBuf = ''; // Inbound data
    this.rbWpos = 0; // Network write position in receive buffer
    this.rbRpos = 0; // Client read position in receive buffer
    this.wsOpen = false;
  },

  flush: function (async, callback) {
    var self = this;
    if (this.isOpen()) {
      // Send data and register a callback to invoke the client callback
      this.ws.send(this.sendBuf);
      this.callbacks.push((function(){
        var clientCallback = callback;
        return function (msg) {
          self.setRecvBuffer(msg);
          if (clientCallback) {
            clientCallback();
          }
        };
      }()));
    } else {
      // Queue the send to go out __onOpen
      this.sendPending.push({
        buf: this.sendBuf,
        cb: callback
      });
    }
  },

  __onOpen: function () {
    var self = this;
    this.wsOpen = true;
    if (this.sendPending.length > 0) {
      // If the user made calls before the connection was fully open, send them now
      this.sendPending.forEach(function (elem) {
        self.socket.send(elem.buf);
        self.callbacks.push((function(){
          var clientCallback = elem.cb;
          return function (msg) {
            self.setRecvBuffer(msg);
            clientCallback();
          };
        }()));
      });
      this.sendPending = [];
    }
  },

  __onClose: function (evt) {
    this.__reset(this.url);
  },

  __onMessage: function (evt) {
    if (this.callbacks.length) {
      this.callbacks.shift()(evt);
    }
  },

  __onError: function (evt) {
    Log.showInfo('Thrift WebSocket Error: ' + evt.toString());
    this.ws.close();
  },

  /**
   * Sets the buffer to use when receiving server responses.
   * @param {string} buf - The buffer to receive server responses.
   */

  setRecvBuffer: function (buf) {
    this.recvBuf = buf;
    this.recvBufSz = this.recvBuf.length;
    this.wpos = this.recvBuf.length;
    this.rpos = 0;
  },

  /**
   * Returns true if the transport is open
   * @readonly
   * @returns {boolean}
   */

  isOpen: function () {
    if (this.wsOpen) {
      return true;
    } else {
      this.open();
    }
  },

  /**
   * Opens the transport connection
   */

  open: function () {

    /**
     * // If OPEN/CONNECTING/CLOSING ignore additional opens
     * // if (this.socket && this.socket.readyState != this.socket.CLOSED) {
     * //  return;
     * // }
     */

    this.ws = webSocket.createWebSocket();
    this.ws.on('open', (err, value) => {
      this.__onOpen();
    });
    this.ws.on('message', (err, value) => {
      this.__onMessage(value);
    });
    this.ws.on('close', (err, value) => {
      this.__onClose();
    });
    this.ws.on('error', (err) => {
      this.__onError(err);
    });
    this.ws.connect(this.url, (err, value) => {
      if (!err) {
        Log.showInfo('connect success');
      } else {
        Log.showInfo('connect fail, err:' + JSON.stringify(err));
      }
    });
  },

  /**
   * Closes the transport connection
   */

  close: function () {
    this.ws.close();
  },

  /**
   * Returns the specified number of characters from the response
   * buffer.
   * @param {number} len - The number of characters to return.
   * @returns {string} Characters sent by the server.
   */

  read: function (len) {
    var avail = this.wpos - this.rpos;

    if (avail === 0) {
      return '';
    }

    var give = len;

    if (avail < len) {
      give = avail;
    }

    var ret = this.readBuf.substr(this.rpos, give);
    this.rpos += give;

    // clear buf when complete?
    return ret;
  },

  /**
   * Returns the entire response buffer.
   * @returns {string} Characters sent by the server.
   */

  readAll: function () {
    return this.recvBuf;
  },

  /**
   * Sets the send buffer to buf.
   * @param {string} buf - The buffer to send.
   */

  write: function (buf) {
    this.sendBuf = buf;
  },

  /**
   * Returns the send buffer.
   * @readonly
   * @returns {string} The send buffer.
   */

  getSendBuffer: function () {
    return this.sendBuf;
  }

};

/**
 * Initializes a Thrift JSON protocol instance.
 * @constructor
 * @param {Thrift.Transport} transport - The transport to serialize to/from.
 * @classdesc Apache Thrift Protocols perform serialization which enables cross
 * language RPC. The Protocol type is the JavaScript implementation
 * of the Apache Thrift TJSONProtocol.
 * @example
 *     var protocol  = new Thrift.Protocol(transport);
 */

Thrift.TJSONProtocol = Thrift.Protocol = function (transport) {
  this.tstack = [];
  this.tpos = [];
  this.transport = transport;
};

/**
 * Thrift IDL type Id to string mapping.
 * @readonly
 * @see {Thrift.Type}
 */

Thrift.Protocol.Type = {};
Thrift.Protocol.Type[Thrift.Type.BOOL] = '"tf"';
Thrift.Protocol.Type[Thrift.Type.BYTE] = '"i8"';
Thrift.Protocol.Type[Thrift.Type.I16] = '"i16"';
Thrift.Protocol.Type[Thrift.Type.I32] = '"i32"';
Thrift.Protocol.Type[Thrift.Type.I64] = '"i64"';
Thrift.Protocol.Type[Thrift.Type.DOUBLE] = '"dbl"';
Thrift.Protocol.Type[Thrift.Type.STRUCT] = '"rec"';
Thrift.Protocol.Type[Thrift.Type.STRING] = '"str"';
Thrift.Protocol.Type[Thrift.Type.MAP] = '"map"';
Thrift.Protocol.Type[Thrift.Type.LIST] = '"lst"';
Thrift.Protocol.Type[Thrift.Type.SET] = '"set"';

/**
 * Thrift IDL type string to Id mapping.
 * @readonly
 * @see {Thrift.Type}
 */

Thrift.Protocol.RType = {};
Thrift.Protocol.RType.tf = Thrift.Type.BOOL;
Thrift.Protocol.RType.i8 = Thrift.Type.BYTE;
Thrift.Protocol.RType.i16 = Thrift.Type.I16;
Thrift.Protocol.RType.i32 = Thrift.Type.I32;
Thrift.Protocol.RType.i64 = Thrift.Type.I64;
Thrift.Protocol.RType.dbl = Thrift.Type.DOUBLE;
Thrift.Protocol.RType.rec = Thrift.Type.STRUCT;
Thrift.Protocol.RType.str = Thrift.Type.STRING;
Thrift.Protocol.RType.map = Thrift.Type.MAP;
Thrift.Protocol.RType.lst = Thrift.Type.LIST;
Thrift.Protocol.RType.set = Thrift.Type.SET;

/**
 * The TJSONProtocol version number.
 * @readonly
 * @const {number} Version
 * @memberof Thrift.Protocol
 */

Thrift.Protocol.Version = 1;

Thrift.Protocol.prototype = {

  /**
   * Returns the underlying transport.
   * @readonly
   * @returns {Thrift.Transport} The underlying transport.
   */

  getTransport: function () {
    return this.transport;
  },

  /**
   * Serializes the beginning of a Thrift RPC message.
   * @param {string} name - The service method to call.
   * @param messageType - The type of method call.
   * @param {number} seqid - The sequence number of this call (always 0 in Apache Thrift).
   */

  writeMessageBegin: function (name, messageType, seqid) {
    this.tstack = [];
    this.tpos = [];

    this.tstack.push([Thrift.Protocol.Version, '"' +
                                               name + '"', messageType, seqid]);
  },

  /**
   * Serializes the end of a Thrift RPC message.
   */

  writeMessageEnd: function () {
    var obj = this.tstack.pop();

    this.wobj = this.tstack.pop();
    this.wobj.push(obj);

    this.wbuf = '[' + this.wobj.join(',') + ']';

    this.transport.write(this.wbuf);
  },


  /**
     * Serializes the beginning of a struct.
     * @param {string} name - The name of the struct.
     */

  writeStructBegin: function (name) {
    this.tpos.push(this.tstack.length);
    this.tstack.push({});
  },

  /**
   * Serializes the end of a struct.
   */

  writeStructEnd: function () {

    var p = this.tpos.pop();
    var struct = this.tstack[p];
    var str = '{';
    var first = true;
    for (var key in struct) {
      if (first) {
        first = false;
      } else {
        str += ',';
      }

      str += key + ':' + struct[key];
    }

    str += '}';
    this.tstack[p] = str;
  },

  /**
   * Serializes the beginning of a struct field.
   * @param {string} name - The name of the field.
   * @param {Thrift.Protocol.Type} fieldType - The data type of the field.
   * @param {number} fieldId - The field's unique identifier.
   */

  writeFieldBegin: function (name, fieldType, fieldId) {
    this.tpos.push(this.tstack.length);
    this.tstack.push({ 'fieldId': '"' +
    fieldId + '"', 'fieldType': Thrift.Protocol.Type[fieldType]
    });

  },

  /**
   * Serializes the end of a field.
   */

  writeFieldEnd: function () {
    var value = this.tstack.pop();
    var fieldInfo = this.tstack.pop();

    this.tstack[this.tstack.length - 1][fieldInfo.fieldId] = '{' +
    fieldInfo.fieldType + ':' + value + '}';
    this.tpos.pop();
  },

  /**
   * Serializes the end of the set of fields for a struct.
   */

  writeFieldStop: function () {
    // na
  },

  /**
   * Serializes the beginning of a map collection.
   * @param keyType - The data type of the key.
   * @param valType - The data type of the value.
   * @param {number} [size] - The number of elements in the map (ignored).
   */

  writeMapBegin: function (keyType, valType, size) {
    this.tpos.push(this.tstack.length);
    this.tstack.push([Thrift.Protocol.Type[keyType],
    Thrift.Protocol.Type[valType], 0]);
  },

  /**
   * Serializes the end of a map.
   */

  writeMapEnd: function () {
    var p = this.tpos.pop();

    if (p == this.tstack.length) {
      return;
    }

    if ((this.tstack.length - p - 1) % 2 !== 0) {
      this.tstack.push('');
    }

    var size = (this.tstack.length - p - 1) / 2;

    this.tstack[p][this.tstack[p].length - 1] = size;

    var map = '}';
    var first = true;
    while (this.tstack.length > p + 1) {
      var v = this.tstack.pop();
      var k = this.tstack.pop();
      if (first) {
        first = false;
      } else {
        map = ',' + map;
      }

      if (!isNaN(k)) {
        k = '"' + k + '"';
      } // json "keys" need to be strings
      map = k + ':' + v + map;
    }
    map = '{' + map;

    this.tstack[p].push(map);
    this.tstack[p] = '[' + this.tstack[p].join(',') + ']';
  },

  /**
   * Serializes the beginning of a list collection.
   * @param elemType - The data type of the elements.
   * @param {number} size - The number of elements in the list.
   */

  writeListBegin: function (elemType, size) {
    this.tpos.push(this.tstack.length);
    this.tstack.push([Thrift.Protocol.Type[elemType], size]);
  },

  /**
   * Serializes the end of a list.
   */

  writeListEnd: function () {
    var p = this.tpos.pop();

    while (this.tstack.length > p + 1) {
      var tmpVal = this.tstack[p + 1];
      this.tstack.splice(p + 1, 1);
      this.tstack[p].push(tmpVal);
    }

    this.tstack[p] = '[' + this.tstack[p].join(',') + ']';
  },

  /**
   * Serializes the beginning of a set collection.
   * @param elemType - The data type of the elements.
   * @param {number} size - The number of elements in the list.
   */

  writeSetBegin: function (elemType, size) {
    this.tpos.push(this.tstack.length);
    this.tstack.push([Thrift.Protocol.Type[elemType], size]);
  },

  /**
   * Serializes the end of a set.
   */

  writeSetEnd: function () {
    var p = this.tpos.pop();

    while (this.tstack.length > p + 1) {
      var tmpVal = this.tstack[p + 1];
      this.tstack.splice(p + 1, 1);
      this.tstack[p].push(tmpVal);
    }

    this.tstack[p] = '[' + this.tstack[p].join(',') + ']';
  },

  /**
   * Serializes a boolean
   * */

  writeBool: function (value) {
    this.tstack.push(value ? 1 : 0);
  },

  /**
   * Serializes a number
   * */

  writeByte: function (i8) {
    this.tstack.push(i8);
  },

  /**
   * Serializes a number
   * */

  writeI16: function (i16) {
    this.tstack.push(i16);
  },

  /**
   * Serializes a number
   * */

  writeI32: function (i32) {
    this.tstack.push(i32);
  },

  /**
   * Serializes a number
   * */

  writeI64: function (i64) {
    if (typeof i64 === 'number') {
      this.tstack.push(i64);
    } else {
      this.tstack.push(new Int64utils().toDecimalString(i64));
    }
  },

  /**
   * Serializes a number
   * */

  writeDouble: function (dbl) {
    this.tstack.push(dbl);
  },

  /**
   * Serializes a string
   * */

  writeString: function (str) {
    // We do not encode uri components for wire transfer:
    if (str === null) {
      this.tstack.push(null);
    } else {
      // concat may be slower than building a byte buffer
      var escapedString = '';
      for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i);
        if (ch === '"') {
          escapedString += '"';
        } else if (ch === '\\') {
          escapedString += '\\\\';
        } else if (ch === '\b') {
          escapedString += '\\b';
        } else if (ch === '\f') {
          escapedString += '\\f';
        } else if (ch === '\n') {
          escapedString += '\\n';
        } else if (ch === '\r') {
          escapedString += '\\r';
        } else if (ch === '\t') {
          escapedString += '\\t';
        } else {
          escapedString += ch;
        }
      }
      this.tstack.push('"' + escapedString + '"');
    }
  },

  /**
   * Serializes a string
   * */

  writeBinary: function (binary) {
    var str = '';
    if (typeof binary == 'string') {
      str = binary;
    } else if (binary instanceof Uint8Array) {
      var arr = binary;
      for (var i = 0; i < arr.length; ++i) {
        str += String.fromCharCode(arr[i]);
      }
    } else {
      throw new TypeError('writeBinary only accepts String or Uint8Array.');
    }
    this.tstack.push('"' + Base64.decode(str) + '"');
  },

  readMessageBegin: function () {
    this.rstack = [];
    this.rpos = [];

    var received = this.transport.readAll();
    this.robj = JSON.parse(received);

    var r = {};
    var version = this.robj.shift();

    if (version != Thrift.Protocol.Version) {
      throw 'Wrong thrift protocol version: ' + version;
    }

    r.fname = this.robj.shift();
    r.mtype = this.robj.shift();
    r.rseqid = this.robj.shift();


    // get to the main obj
    this.rstack.push(this.robj.shift());

    return r;
  },

  /**
   * Deserializes the end of a message.
   * */

  readMessageEnd: function () {
  },

  /**
   * Deserializes the beginning of a struct.
   * @param {string} [name] - The name of the struct (ignored)
   * @returns {object} - An object with an empty string fname property
   */
  readStructBegin: function () {
    var r = {};
    r.fname = '';

    // in case this is an array of structs
    if (this.rstack[this.rstack.length - 1] instanceof Array) {
      this.rstack.push(this.rstack[this.rstack.length - 1].shift());
    }

    return r;
  },

  /**
   * Deserializes the end of a struct.
   * */

  readStructEnd: function () {
    if (this.rstack[this.rstack.length - 2] instanceof Array) {
      this.rstack.pop();
    }
  },

  /**
   *
   * @class
   * @name AnonReadFieldBeginReturn
   * @property {string} fname - The name of the field (always '').
   * @property {Thrift.Type} ftype - The data type of the field.
   * @property {number} fid - The unique identifier of the field.
   */

  /**
   * Deserializes the beginning of a field.
   * @returns
   */

  readFieldBegin: function () {
    var r = {};

    var fid = -1;
    var ftype = Thrift.Type.STOP;

    // get a fieldId
    for (var f in (this.rstack[this.rstack.length - 1])) {
      if (f !== null) {
        fid = parseInt(f, 10);
        this.rpos.push(this.rstack.length);

        var field = this.rstack[this.rstack.length - 1][fid];

        // remove so we don't see it again
        delete this.rstack[this.rstack.length - 1][fid];

        this.rstack.push(field);

        break;
      }
    }

    if (fid != -1) {

      // should only be 1 of these but this is the only way to match a key
      for (var i in (this.rstack[this.rstack.length - 1])) {
        if (Thrift.Protocol.RType[i] !== null) {
          ftype = Thrift.Protocol.RType[i];
          this.rstack[this.rstack.length - 1] =
          this.rstack[this.rstack.length - 1][i];
        }
      }
    }

    r.fname = '';
    r.ftype = ftype;
    r.fid = fid;

    return r;
  },

  /**
   * Deserializes the end of a field.
   * */

  readFieldEnd: function () {
    var pos = this.rpos.pop();

    // get back to the right place in the stack
    while (this.rstack.length > pos) {
      this.rstack.pop();
    }

  },

  /**
   *   @class
   *   @name AnonReadMapBeginReturn
   *   @property {Thrift.Type} ktype - The data type of the key.
   *   @property {Thrift.Type} vtype - The data type of the value.
   *   @property {number} size - The number of elements in the map.
   */

  /**
   * Deserializes the beginning of a map.
   * @returns
   */

  readMapBegin: function () {
    var map = this.rstack.pop();
    var first = map.shift();
    if (first instanceof Array) {
      this.rstack.push(map);
      map = first;
      first = map.shift();
    }

    var r = {};
    r.ktype = Thrift.Protocol.RType[first];
    r.vtype = Thrift.Protocol.RType[map.shift()];
    r.size = map.shift();

    this.rpos.push(this.rstack.length);
    this.rstack.push(map.shift());

    return r;
  },

  /**
   * Deserializes the end of a map.
   * */

  readMapEnd: function () {
    this.readFieldEnd();
  },

  /**
   *   @class
   *   @name AnonReadColBeginReturn
   *   @property {Thrift.Type} etype - The data type of the element.
   *   @property {number} size - The number of elements in the collection.
   */

  /**
   * Deserializes the beginning of a list.
   * @returns
   */

  readListBegin: function () {
    var list = this.rstack[this.rstack.length - 1];

    var r = {};
    r.etype = Thrift.Protocol.RType[list.shift()];
    r.size = list.shift();

    this.rpos.push(this.rstack.length);
    this.rstack.push(list.shift());

    return r;
  },

  /**
   * Deserializes the end of a list.
   * */

  readListEnd: function () {
    var pos = this.rpos.pop() - 2;
    var st = this.rstack;
    st.pop();
    if (st instanceof Array && st.length > pos && st[pos].length > 0) {
      st.push(st[pos].shift());
    }
  },

  /**
   * Deserializes the beginning of a set.
   */
  readSetBegin: function (elemType, size) {
  },

  /**
   * Deserializes the end of a set.
   * */

  readSetEnd: function () {
    return this.readListEnd();
  },

  /** Returns an object with a value property set to
   * False unless the next number in the protocol buffer
   *  is 1, in which case the value property is True
   */

  readBool: function () {
    var r = this.readI32();

    if (r !== null && r.value == '1') {
      r.value = true;
    } else {
      r.value = false;
    }

    return r;
  },

  /** Returns the an object with a value property set to the
   * next value found in the protocol buffer
   */

  readByte: function () {
    return this.readI32();
  },

  /** Returns the an object with a value property set to the
   * next value found in the protocol buffer
   */

  readI16: function () {
    return this.readI32();
  },

  /** Returns the an object with a value property set to the
   * next value found in the protocol buffer
   */

  readI32: function (f) {
    if (f === undefined) {
      f = this.rstack[this.rstack.length - 1];
    }

    var r = {};

    if (f instanceof Array) {
      if (f.length === 0) {
        r.value = undefined;
      } else {
        if (!f.isReversed) {
          f.reverse();
          f.isReversed = true;
        }
        r.value = f.pop();
      }
    } else if (f instanceof Object) {
      for (var i in f) {
        if (i !== null) {
          this.rstack.push(f[i]);
          delete f[i];

          r.value = i;
          break;
        }
      }
    } else {
      r.value = f;
      this.rstack.pop();
    }

    return r;
  },

  /** Returns the an object with a value property set to the
   * next value found in the protocol buffer
   */

  readI64: function (f) {
    if (f === undefined) {
      f = this.rstack[this.rstack.length - 1];
    }

    var r = {};

    if (f instanceof Array) {
      if (f.length === 0) {
        r.value = undefined;
      } else {
        if (!f.isReversed) {
          f.reverse();
          f.isReversed = true;
        }
        r.value = f.pop();
      }
    } else if (f instanceof Object) {
      var int64Object = true;
      var objectKeys = Object.keys(f).sort();
      var int64Keys = ['buffer', 'offset'];
      if (objectKeys.length !== int64Keys.length) {
        int64Object = false;
      }
      for (var it = 0; int64Object && it < objectKeys.length; ++it) {
        if (objectKeys[it] !== int64Keys[it]) {
          int64Object = false;
        }
      }
      if (int64Object) {
        r.value = f;
      } else {
        for (var i in f) {
          if (i !== null) {
            this.rstack.push(f[i]);
            delete f[i];

            r.value = i;
            break;
          }
        }
      }
    } else {
      r.value = f;
      this.rstack.pop();
    }
    return r;
  },

  /** Returns the an object with a value property set to the
   * next value found in the protocol buffer
   */

  readDouble: function () {
    return this.readI32();
  },

  /** Returns the an object with a value property set to the
   * next value found in the protocol buffer
   */

  readString: function () {
    var r = this.readI32();
    return r;
  },

  /** Returns the an object with a value property set to the
   * next value found in the protocol buffer
   */

  readBinary: function () {
    var r = this.readI32();
    r.value = Base64.decode(r.value);
    return r;
  },

  /**
   * Method to arbitrarily skip over data
   */

  skip: function (type) {
    var ret, i;
    switch (type) {
      case Thrift.Type.BOOL:
        return this.readBool();

      case Thrift.Type.BYTE:
        return this.readByte();

      case Thrift.Type.I16:
        return this.readI16();

      case Thrift.Type.I32:
        return this.readI32();

      case Thrift.Type.I64:
        return this.readI64();

      case Thrift.Type.DOUBLE:
        return this.readDouble();

      case Thrift.Type.STRING:
        return this.readString();

      case Thrift.Type.STRUCT:
        this.performStructOperation();

      case Thrift.Type.MAP:
        this.performMapOperation(ret);

      case Thrift.Type.SET:
        this.performSetOperation(ret);

      case Thrift.Type.LIST:
        this.performListOperation(ret);

      default:
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA);
    }
  },

  performStructOperation: function (ret) {
    this.readStructBegin();
    let end = false;
    while (!end) {
      var tret = this.readFieldBegin();
      if (tret.ftype == Thrift.Type.STOP) {
        end = true;
      } else {
        this.skip(tret.ftype);
        this.readFieldEnd();
      }
    }
    this.readStructEnd();
    return null;
  },

  performMapOperation: function (ret) {
    var tret = this.readMapBegin();
    for (var i = 0; i < tret.size; i++) {
      if (i > 0) {
        if (this.rstack.length > this.rpos[this.rpos.length - 1] + 1) {
          this.rstack.pop();
        }
      }
      this.skip(tret.ktype);
      this.skip(tret.vtype);
    }
    this.readMapEnd();
    return null;
  },

  performSetOperation: function (ret) {
    var tret = this.readSetBegin();
    for (var i = 0; i < tret.size; i++) {
      this.skip(tret.etype);
    }
    this.readSetEnd();
    return null;
  },

  performListOperation: function (ret) {
    var tret = this.readListBegin();
    for (var i = 0; i < tret.size; i++) {
      this.skip(tret.etype);
    }
    this.readListEnd();
    return null;
  }
};

var VERSION_MASK = -65536; // 0xffff0000
var VERSION_1 = -2147418112; // 0x80010000
var TYPE_MASK = 0x000000ff;
var Type = Thrift.Type;
var binaryObj;

/**
 * Initializes a Thrift Binary protocol instance.
 * @constructor
 * @param {Thrift.Transport} trans - The transport to serialize to/from.
 * @param strictRead
 * @param strictWrite
 * @classdesc Apache Thrift Protocols perform serialization which enables cross
 * language RPC. The Protocol type is the JavaScript implementation
 * of the Apache Thrift TBinaryProtocol.
 *
 */

Thrift.TBinaryProtocol = function (trans, strictRead, strictWrite) {
  this.trans = trans;
  this.strictRead = (strictRead !== undefined ? strictRead : false);
  this.strictWrite = (strictWrite !== undefined ? strictWrite : true);
  this._seqid = null;
  binaryObj = new Binary();
};
Thrift.TBinaryProtocol.VERSION_MASK = VERSION_MASK;
Thrift.TBinaryProtocol.VERSION_1 = VERSION_1;
Thrift.TBinaryProtocol.TYPE_MASK = TYPE_MASK;
Thrift.TBinaryProtocol.prototype = {
  getTransport: function () {
    return this.trans;
  },
  flush: function () {
    return this.trans.flush();
  },
  writeMessageBegin: function (name, type, seqid) {
    if (this.strictWrite) {
      this.writeI32(VERSION_1 | type);
      this.writeString(name);
      this.writeI32(seqid);
    } else {
      this.writeString(name);
      this.writeByte(type);
      this.writeI32(seqid);
    }
    // Record client seqid to find callback again
    if (this._seqid !== null) {
      Log.showWarn('SeqId already set', { 'name': name });
    } else {
      this._seqid = seqid;
      this.trans.setCurrSeqId(seqid);
    }
  },
  writeMessageEnd: function () {
    if (this._seqid !== null) {
      this._seqid = null;
    } else {
      Log.showWarn('No seqid to unset');
    }
  },
  writeStructBegin: function (name) {
  },
  writeStructEnd: function () {
  },
  writeFieldBegin: function (name, type, id) {
    this.writeByte(type);
    this.writeI16(id);
  },
  writeFieldEnd: function () {
  },
  writeFieldStop: function () {
    this.writeByte(Type.STOP);
  },
  writeMapBegin: function (ktype, vtype, size) {
    this.writeByte(ktype);
    this.writeByte(vtype);
    this.writeI32(size);
  },
  writeMapEnd: function () {
  },
  writeListBegin: function (etype, size) {
    this.writeByte(etype);
    this.writeI32(size);
  },
  writeListEnd: function () {
  },
  writeSetBegin: function (etype, size) {
    this.writeByte(etype);
    this.writeI32(size);
  },
  writeSetEnd: function () {
  },
  writeBool: function (bool) {
    if (bool) {
      this.writeByte(1);
    } else {
      this.writeByte(0);
    }
  },
  writeByte: function (b) {
    this.trans.write(new ArrayBuffer([b]));
  },
  writeI16: function (i16) {
    this.trans.write(binaryObj.writeI16(new ArrayBuffer(2), i16));
  },
  writeI32: function (i32) {
    this.trans.write(binaryObj.writeI32(new ArrayBuffer(4), i32));
  },
  writeI64: function (i64) {
    if (i64.buffer) {
      this.trans.write(i64.buffer);
    } else {
      this.trans.write(new Int64(i64).buffer);
    }
  },
  writeDouble: function (dub) {
    this.trans.write(binaryObj.writeDouble(new ArrayBuffer(8), dub));
  },
  writeStringOrBinary: function (name, encoding, arg) {
    if (typeof (arg) === 'string') {
      this.writeI32(new ArrayBuffer().byteLength);
      this.trans.write(new ArrayBuffer(arg.length));
    } else if ((arg instanceof ArrayBuffer) ||
    (Object.prototype.toString.call(arg) == '[object Uint8Array]')) {

      /**
       * Buffers in Node.js under Browserify may extend UInt8Array instead of
       * defining a new object. We detect them here so we can write them correctly
       */

      this.writeI32(arg.length);
      this.trans.write(arg);
    } else {
      throw new Error(name + ' called without a string/Buffer argument: ' + arg);
    }
  },
  writeString: function (arg) {
    this.writeStringOrBinary('writeString', 'utf8', arg);
  },
  writeBinary: function (arg) {
    this.writeStringOrBinary('writeBinary', 'binary', arg);
  },
  readMessageBegin: function () {
    var sz = this.readI32();
    var type, name, seqid;
    if (sz < 0) {
      var version = sz & VERSION_MASK;
      if (version != VERSION_1) {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.BAD_VERSION,
          'Bad version in readMessageBegin: ' + sz);
      }
      type = sz & TYPE_MASK;
      name = this.readString();
      seqid = this.readI32();
    } else {
      if (this.strictRead) {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.BAD_VERSION,
          'No protocol version header');
      }
      name = this.trans.read(sz);
      type = this.readByte();
      seqid = this.readI32();
    }
    return { fname: name, mtype: type, rseqid: seqid };
  },
  readMessageEnd: function () {
  },
  readStructBegin: function () {
    return { fname: '' };
  },
  readStructEnd: function () {
  },
  readFieldBegin: function () {
    var type = this.readByte();
    if (type == Type.STOP) {
      return { fname: null, ftype: type, fid: 0 };
    }
    var id = this.readI16();
    return { fname: null, ftype: type, fid: id };
  },
  readFieldEnd: function () {
  },
  readMapBegin: function () {
    var ktype = this.readByte();
    var vtype = this.readByte();
    var size = this.readI32();
    return { ktype: ktype, vtype: vtype, size: size };
  },
  readMapEnd: function () {
  },
  readListBegin: function () {
    var etype = this.readByte();
    var size = this.readI32();
    return { etype: etype, size: size };
  },
  readListEnd: function () {
  },
  readSetBegin: function () {
    var etype = this.readByte();
    var size = this.readI32();
    return { etype: etype, size: size };
  },
  readSetEnd: function () {
  },
  readBool: function () {
    var b = this.readByte();
    if (b === 0) {
      return false;
    }
    return true;
  },
  readByte: function () {
    return this.trans.readByte();
  },
  readI16: function () {
    return this.trans.readI16();
  },
  readI32: function () {
    return this.trans.readI32();
  },
  readI64: function () {
    var buff = this.trans.read(8);
    return new Int64(buff);
  },
  readDouble: function () {
    return this.trans.readDouble();
  },
  readBinary: function () {
    var len = this.readI32();
    if (len === 0) {
      return new ArrayBuffer(0);
    }
    if (len < 0) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, 'Negative binary size');
    }
    return this.trans.read(len);
  },
  readString: function () {
    var len = this.readI32();
    if (len === 0) {
      return '';
    }
    if (len < 0) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, 'Negative string size');
    }
    return this.trans.readString(len);
  }
};
var POW_8 = Math.pow(2, 8);
var POW_24 = Math.pow(2, 24);
var POW_32 = Math.pow(2, 32);
var POW_40 = Math.pow(2, 40);
var POW_48 = Math.pow(2, 48);
var POW_52 = Math.pow(2, 52);
var POW_1022 = Math.pow(2, 1022);

/**
 * Constructor Function for the Compact Protocol.
 * @constructor
 * @param {object} [trans] - The underlying transport to read/write.
 * @classdesc The Apache Thrift Protocol layer performs serialization
 *     of base types, the compact protocol serializes data in binary
 *     form with minimal space used for scalar values.
 */

Thrift.TCompactProtocol = function (trans) {
  this.trans = trans;
  this.lastField_ = [];
  this.lastFieldId_ = 0;
  this.stringLimit_ = 0;
  this.stringBuf_ = null;
  this.stringBufSize_ = 0;
  this.containerLimit_ = 0;
  this.booleanField_ = {
    name: null,
    hasBoolValue: false
  };
  this.boolValue_ = {
    hasBoolValue: false,
    boolValue: false
  };
};

/**
 * Compact Protocol Constants
 *
 * Compact Protocol ID number.
 * @readonly
 * @const {number} PROTOCOL_ID
 */

Thrift.TCompactProtocol.PROTOCOL_ID = -126; //1000 0010

/**
 * Compact Protocol version number.
 * @readonly
 * @const {number} VERSION_N
 */

Thrift.TCompactProtocol.VERSION_N = 1;

/**
 * Compact Protocol version mask for combining protocol version and message type in one byte.
 * @readonly
 * @const {number} VERSION_MASK
 */

Thrift.TCompactProtocol.VERSION_MASK = 0x1f; // 0001 1111

/**
 * Compact Protocol message type mask for combining protocol version and message type in one byte.
 * @readonly
 * @const {number} TYPE_MASK
 */

Thrift.TCompactProtocol.TYPE_MASK = -32; // 1110 0000

/**
 * Compact Protocol message type bits for ensuring message type bit size.
 * @readonly
 * @const {number} TYPE_BITS
 */

Thrift.TCompactProtocol.TYPE_BITS = 7; // 0000 0111

/**
 * Compact Protocol message type shift amount for combining protocol version and message type in one byte.
 * @readonly
 * @const {number} TYPE_SHIFT_AMOUNT
 */

Thrift.TCompactProtocol.TYPE_SHIFT_AMOUNT = 5;

/**
 * Compact Protocol type IDs used to keep type data within one nibble.
 * @readonly
 * @property {number}  CT_STOP          - End of a set of fields.
 * @property {number}  CT_BOOLEAN_TRUE  - Flag for Boolean field with true value (packed field and value).
 * @property {number}  CT_BOOLEAN_FALSE - Flag for Boolean field with false value (packed field and value).
 * @property {number}  CT_BYTE          - Signed 8 bit integer.
 * @property {number}  CT_I16           - Signed 16 bit integer.
 * @property {number}  CT_I32           - Signed 32 bit integer.
 * @property {number}  CT_I64           - Signed 64 bit integer (2^53 max in JavaScript).
 * @property {number}  CT_DOUBLE        - 64 bit IEEE 854 floating point.
 * @property {number}  CT_BINARY        - Array of bytes (used for strings also).
 * @property {number}  CT_LIST          - A collection type (unordered).
 * @property {number}  CT_SET           - A collection type (unordered and without repeated values).
 * @property {number}  CT_MAP           - A collection type (map/associative-array/dictionary).
 * @property {number}  CT_STRUCT        - A multifield type.
 */

Thrift.TCompactProtocol.Types = {
  CT_STOP: 0x00,
  CT_BOOLEAN_TRUE: 0x01,
  CT_BOOLEAN_FALSE: 0x02,
  CT_BYTE: 0x03,
  CT_I16: 0x04,
  CT_I32: 0x05,
  CT_I64: 0x06,
  CT_DOUBLE: 0x07,
  CT_BINARY: 0x08,
  CT_LIST: 0x09,
  CT_SET: 0x0A,
  CT_MAP: 0x0B,
  CT_STRUCT: 0x0C
};

/**
 * Array mapping Compact type IDs to standard Thrift type IDs.
 * @readonly
 */

Thrift.TCompactProtocol.TTypeToCType = [
  Thrift.TCompactProtocol.Types.CT_STOP, // T_STOP
  0, // unused
  Thrift.TCompactProtocol.Types.CT_BOOLEAN_TRUE, // T_BOOL
  Thrift.TCompactProtocol.Types.CT_BYTE, // T_BYTE
  Thrift.TCompactProtocol.Types.CT_DOUBLE, // T_DOUBLE
  0, // unused
  Thrift.TCompactProtocol.Types.CT_I16, // T_I16
  0, // unused
  Thrift.TCompactProtocol.Types.CT_I32, // T_I32
  0, // unused
  Thrift.TCompactProtocol.Types.CT_I64, // T_I64
  Thrift.TCompactProtocol.Types.CT_BINARY, // T_STRING
  Thrift.TCompactProtocol.Types.CT_STRUCT, // T_STRUCT
  Thrift.TCompactProtocol.Types.CT_MAP, // T_MAP
  Thrift.TCompactProtocol.Types.CT_SET, // T_SET
  Thrift.TCompactProtocol.Types.CT_LIST, // T_LIST
];

// Compact Protocol Utilities
Thrift.TCompactProtocol.prototype = {

  /**
   * Returns the underlying transport layer.
   * @return {object} The underlying transport layer.
   */

  getTransport: function () {
    return this.trans;
  },

  /**
   * Lookup a Compact Protocol Type value for a given Thrift Type value.
   * N.B. Used only internally.
   * @param {number} ttype - Thrift type value
   * @returns {number} Compact protocol type value
   */

  getCompactType: function (ttype) {
    return Thrift.TCompactProtocol.TTypeToCType[ttype];
  },

  /**
   * Lookup a Thrift Type value for a given Compact Protocol Type value.
   * N.B. Used only internally.
   * @param {number} type - Compact Protocol type value
   * @returns {number} Thrift Type value
   */

  getTType: function (type) {
    switch (type) {
      case Type.STOP:
        return Type.STOP;
      case Thrift.TCompactProtocol.Types.CT_BOOLEAN_FALSE:
      case Thrift.TCompactProtocol.Types.CT_BOOLEAN_TRUE:
        return Type.BOOL;
      case Thrift.TCompactProtocol.Types.CT_BYTE:
        return Type.BYTE;
      case Thrift.TCompactProtocol.Types.CT_I16:
        return Type.I16;
      case Thrift.TCompactProtocol.Types.CT_I32:
        return Type.I32;
      case Thrift.TCompactProtocol.Types.CT_I64:
        return Type.I64;
      case Thrift.TCompactProtocol.Types.CT_DOUBLE:
        return Type.DOUBLE;
      case Thrift.TCompactProtocol.Types.CT_BINARY:
        return Type.STRING;
      case Thrift.TCompactProtocol.Types.CT_LIST:
        return Type.LIST;
      case Thrift.TCompactProtocol.Types.CT_SET:
        return Type.SET;
      case Thrift.TCompactProtocol.Types.CT_MAP:
        return Type.MAP;
      case Thrift.TCompactProtocol.Types.CT_STRUCT:
        return Type.STRUCT;
      default:
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA,
          'Unknown type: ' + type);
    }
  },

  // Compact Protocol write operations

  /**
   * Send any buffered bytes to the end point.
   */

  flush: function () {
    return this.trans.flush();
  },

  /**
   * Writes an RPC message header
   * @param {string} name - The method name for the message.
   * @param {number} type - The type of message (CALL, REPLY, EXCEPTION, ONEWAY).
   * @param {number} seqid - The call sequence number (if any).
   */

  writeMessageBegin: function (name, type, seqid) {
    this.writeByte(Thrift.TCompactProtocol.PROTOCOL_ID);
    this.writeByte((Thrift.TCompactProtocol.VERSION_N & Thrift.TCompactProtocol.VERSION_MASK) |
    ((type << Thrift.TCompactProtocol.TYPE_SHIFT_AMOUNT) & Thrift.TCompactProtocol.TYPE_MASK));
    this.writeVarint32(seqid);
    this.writeString(name);
    // Record client seqid to find callback again
    if (this._seqid) {
      Log.showWarn('SeqId already set', { 'name': name });
    } else {
      this._seqid = seqid;
      this.trans.setCurrSeqId(seqid);
    }
  },
  writeMessageEnd: function () {
  },
  writeStructBegin: function (name) {
    this.lastField_.push(this.lastFieldId_);
    this.lastFieldId_ = 0;
  },
  writeStructEnd: function () {
    this.lastFieldId_ = this.lastField_.pop();
  },

  /**
   * Writes a struct field header
   * @param {string} name - The field name (not written with the compact protocol).
   * @param {number} type - The field data type (a normal Thrift field Type).
   * @param {number} id - The IDL field Id.
   */

  writeFieldBegin: function (name, type, id) {
    if (type != Type.BOOL) {
      return this.writeFieldBeginInternal(name, type, id, -1);
    }
    this.booleanField_.name = name;
    this.booleanField_.fieldType = type;
    this.booleanField_.fieldId = id;
  },
  writeFieldEnd: function () {
  },
  writeFieldStop: function () {
    this.writeByte(Thrift.TCompactProtocol.Types.CT_STOP);
  },

  /**
   * Writes a map collection header
   * @param {number} keyType - The Thrift type of the map keys.
   * @param {number} valType - The Thrift type of the map values.
   * @param {number} size - The number of k/v pairs in the map.
   */

  writeMapBegin: function (keyType, valType, size) {
    if (size === 0) {
      this.writeByte(0);
    } else {
      this.writeVarint32(size);
      this.writeByte(this.getCompactType(keyType) << 4 | this.getCompactType(valType));
    }
  },
  writeMapEnd: function () {
  },

  /**
   * Writes a list collection header
   * @param {number} elemType - The Thrift type of the list elements.
   * @param {number} size - The number of elements in the list.
   */

  writeListBegin: function (elemType, size) {
    this.writeCollectionBegin(elemType, size);
  },
  writeListEnd: function () {
  },

  /**
   * Writes a set collection header
   * @param {number} elemType - The Thrift type of the set elements.
   * @param {number} size - The number of elements in the set.
   */

  writeSetBegin: function (elemType, size) {
    this.writeCollectionBegin(elemType, size);
  },
  writeSetEnd: function () {
  },
  writeBool: function (value) {
    if (this.booleanField_.name !== null) {
      // we haven't written the field header yet
      this.writeFieldBeginInternal(this.booleanField_.name,
        this.booleanField_.fieldType,
        this.booleanField_.fieldId,
        (value ? Thrift.TCompactProtocol.Types.CT_BOOLEAN_TRUE
               : Thrift.TCompactProtocol.Types.CT_BOOLEAN_FALSE));
      this.booleanField_.name = null;
    } else {
      // we're not part of a field, so just write the value
      this.writeByte((value ? Thrift.TCompactProtocol.Types.CT_BOOLEAN_TRUE
                            : Thrift.TCompactProtocol.Types.CT_BOOLEAN_FALSE));
    }
  },
  writeByte: function (b) {
    this.trans.write(new ArrayBuffer([b]));
  },
  writeI16: function (i16) {
    this.writeVarint32(this.i32ToZigzag(i16));
  },
  writeI32: function (i32) {
    this.writeVarint32(this.i32ToZigzag(i32));
  },
  writeI64: function (i64) {
    this.writeVarint64(this.i64ToZigzag(i64));
  },
  // Little-endian, unlike TBinaryProtocol
  writeDouble: function (v) {
    var buff = new ArrayBuffer(8);
    var m, e, c;
    buff[7] = (v < 0 ? 0x80 : 0x00);
    v = Math.abs(v);
    if (v !== v) {
      // NaN, use QNaN IEEE format
      m = 2251799813685248;
      e = 2047;
    } else if (v === Infinity) {
      m = 0;
      e = 2047;
    } else {
      e = Math.floor(Math.log(v) / Math.LN2);
      c = Math.pow(2, -e);
      if (v * c < 1) {
        e--;
        c *= 2;
      }
      if (e + 1023 >= 2047) {
        // Overflow
        m = 0;
        e = 2047;
      }
      else if (e + 1023 >= 1) {
        // Normalized - term order matters, as Math.pow(2, 52-e) and v*Math.pow(2, 52) can overflow
        m = (v * c - 1) * POW_52;
        e += 1023;
      }
      else {
        // Denormalized - also catches the '0' case, somewhat by chance
        m = (v * POW_1022) * POW_52;
        e = 0;
      }
    }
    buff[6] = (e << 4) & 0xf0;
    buff[7] |= (e >> 4) & 0x7f;
    buff[0] = m & 0xff;
    m = Math.floor(m / POW_8);
    buff[1] = m & 0xff;
    m = Math.floor(m / POW_8);
    buff[2] = m & 0xff;
    m = Math.floor(m / POW_8);
    buff[3] = m & 0xff;
    m >>= 8;
    buff[4] = m & 0xff;
    m >>= 8;
    buff[5] = m & 0xff;
    m >>= 8;
    buff[6] |= m & 0x0f;
    this.trans.write(buff);
  },
  writeStringOrBinary: function (name, encoding, arg) {
    if (typeof arg === 'string') {
      this.writeVarint32(ArrayBuffer.prototype.byteLength);
      this.trans.write(new ArrayBuffer(arg.length));
    } else if (arg instanceof ArrayBuffer ||
    Object.prototype.toString.call(arg) == '[object Uint8Array]') {

      /**
       * Buffers in Node.js under Browserify may extend UInt8Array instead of
       * defining a new object. We detect them here so we can write them correctly
       */

      this.writeVarint32(arg.length);
      this.trans.write(arg);
    } else {
      throw new Error(name + ' called without a string/Buffer argument: ' + arg);
    }
  },
  writeString: function (arg) {
    this.writeStringOrBinary('writeString', 'utf8', arg);
  },
  writeBinary: function (arg) {
    this.writeStringOrBinary('writeBinary', 'binary', arg);
  },

  // Compact Protocol internal write methods
  writeFieldBeginInternal: function (name, fieldType, fieldId, typeOverride) {
    // If there's a type override, use that.
    var typeToWrite = (typeOverride == -1 ? this.getCompactType(fieldType) : typeOverride);
    // Check if we can delta encode the field id
    if (fieldId > this.lastFieldId_ && fieldId - this.lastFieldId_ <= 15) {
      // Include the type delta with the field ID
      this.writeByte((fieldId - this.lastFieldId_) << 4 | typeToWrite);
    } else {
      // Write separate type and ID values
      this.writeByte(typeToWrite);
      this.writeI16(fieldId);
    }
    this.lastFieldId_ = fieldId;
  },
  writeCollectionBegin: function (elemType, size) {
    if (size <= 14) {
      // Combine size and type in one byte if possible
      this.writeByte(size << 4 | this.getCompactType(elemType));
    } else {
      this.writeByte(0xf0 | this.getCompactType(elemType));
      this.writeVarint32(size);
    }
  },

  /**
   * Write an i32 as a varint. Results in 1-5 bytes on the wire.
   */

  writeVarint32: function (n) {
    var buf = new ArrayBuffer(5);
    var wsize = 0;
    let end = false;
    while (!end) {
      if ((n & ~0x7F) === 0) {
        buf[wsize++] = n;
        end = true;
      } else {
        buf[wsize++] = ((n & 0x7F) | 0x80);
        n = n >>> 7;
      }
    }
    var wbuf = new ArrayBuffer(wsize);
    wbuf = buf.slice(0);
    this.trans.write(wbuf);
  },

  /**
   * Write an i64 as a varint. Results in 1-10 bytes on the wire.
   * N.B. node-Int64 is always big endian
   */

  writeVarint64: function (n) {
    if (typeof n === 'number') {
      n = new Int64(n);
    }
    if (!(n instanceof Int64)) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA,
        'Expected Int64 or Number, found: ' + n);
    }
    var buf = new ArrayBuffer(10);
    var wsize = 0;
    var hi = n.buffer.readUInt32BE(0, true);
    var lo = n.buffer.readUInt32BE(4, true);
    var mask = 0;
    let end = false;
    while (!end) {
      if (((lo & ~0x7F) === 0) && (hi === 0)) {
        buf[wsize++] = lo;
        end = true;
      } else {
        buf[wsize++] = ((lo & 0x7F) | 0x80);
        mask = hi << 25;
        lo = lo >>> 7;
        hi = hi >>> 7;
        lo = lo | mask;
      }
    }
    var wbuf = new ArrayBuffer(wsize);
    wbuf = buf.slice(0);
    this.trans.write(wbuf);
  },

  /**
   * Convert l into a zigzag long. This allows negative numbers to be
   * represented compactly as a varint.
   */

  i64ToZigzag: function (l) {
    if (typeof l === 'string') {
      l = new Int64(l, 10);
    } else if (typeof l === 'number') {
      l = new Int64(l);
    }
    if (!(l instanceof Int64)) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA,
        'Expected Int64 or Number, found: ' + l);
    }
    var hi = l.buffer.readUInt32BE(0, true);
    var lo = l.buffer.readUInt32BE(4, true);
    var sign = hi >>> 31;
    hi = ((hi << 1) | (lo >>> 31)) ^ (sign ? 0xFFFFFFFF : 0);
    lo = (lo << 1) ^ (sign ? 0xFFFFFFFF : 0);
    return new Int64(parseInt(hi, lo));
  },

  /**
   * Convert n into a zigzag int. This allows negative numbers to be
   * represented compactly as a varint.
   */

  i32ToZigzag: function (n) {
    return (n << 1) ^ ((n & 0x80000000) ? 0xFFFFFFFF : 0);
  },

  // Compact Protocol read operations
  readMessageBegin: function () {
    // Read protocol ID
    var protocolId = this.trans.readByte();
    if (protocolId != Thrift.TCompactProtocol.PROTOCOL_ID) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.BAD_VERSION,
        'Bad protocol identifier ' + protocolId);
    }
    // Read Version and Type
    var versionAndType = this.trans.readByte();
    var version = (versionAndType & Thrift.TCompactProtocol.VERSION_MASK);
    if (version != Thrift.TCompactProtocol.VERSION_N) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.BAD_VERSION,
        'Bad protocol version ' + version);
    }
    var type = ((versionAndType >> Thrift.TCompactProtocol.TYPE_SHIFT_AMOUNT) & Thrift.TCompactProtocol.TYPE_BITS);
    // Read SeqId
    var seqid = this.readVarint32();
    // Read name
    var name = this.readString();
    return { fname: name, mtype: type, rseqid: seqid };
  },
  readMessageEnd: function () {
  },
  readStructBegin: function () {
    this.lastField_.push(this.lastFieldId_);
    this.lastFieldId_ = 0;
    return { fname: '' };
  },
  readStructEnd: function () {
    this.lastFieldId_ = this.lastField_.pop();
  },
  readFieldBegin: function () {
    var fieldId = 0;
    var b = this.trans.readByte(b);
    var type = (b & 0x0f);
    if (type == Thrift.TCompactProtocol.Types.CT_STOP) {
      return { fname: null, ftype: Thrift.Type.STOP, fid: 0 };
    }
    // Mask off the 4 MSB of the type header to check for field id delta.
    var modifier = ((b & 0x000000f0) >>> 4);
    if (modifier === 0) {
      // If not a delta read the field id.
      fieldId = this.readI16();
    } else {
      // Recover the field id from the delta
      fieldId = (this.lastFieldId_ + modifier);
    }
    var fieldType = this.getTType(type);
    // Boolean are encoded with the type
    if (type == Thrift.TCompactProtocol.Types.CT_BOOLEAN_TRUE ||
    type == Thrift.TCompactProtocol.Types.CT_BOOLEAN_FALSE) {
      this.boolValue_.hasBoolValue = true;
      this.boolValue_.boolValue =
      (type == Thrift.TCompactProtocol.Types.CT_BOOLEAN_TRUE ? true : false);
    }
    // Save the new field for the next delta computation.
    this.lastFieldId_ = fieldId;
    return { fname: null, ftype: fieldType, fid: fieldId };
  },
  readFieldEnd: function () {
  },
  readMapBegin: function () {
    var msize = this.readVarint32();
    if (msize < 0) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, 'Negative map size');
    }
    var kvType = 0;
    if (msize !== 0) {
      kvType = this.trans.readByte();
    }
    var keyType = this.getTType((kvType & 0xf0) >>> 4);
    var valType = this.getTType(kvType & 0xf);
    return { ktype: keyType, vtype: valType, size: msize };
  },
  readMapEnd: function () {
  },
  readListBegin: function () {
    var sizeAndType = this.trans.readByte();
    var lsize = (sizeAndType >>> 4) & 0x0000000f;
    if (lsize == 15) {
      lsize = this.readVarint32();
    }
    if (lsize < 0) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, 'Negative list size');
    }
    var elemType = this.getTType(sizeAndType & 0x0000000f);
    return { etype: elemType, size: lsize };
  },
  readListEnd: function () {
  },
  readSetBegin: function () {
    return this.readListBegin();
  },
  readSetEnd: function () {
  },
  readBool: function () {
    var value = false;
    if (this.boolValue_.hasBoolValue === true) {
      value = this.boolValue_.boolValue;
      this.boolValue_.hasBoolValue = false;
    } else {
      var res = this.trans.readByte();
      value = (res.value == Thrift.TCompactProtocol.Types.CT_BOOLEAN_TRUE);
    }
    return value;
  },
  readByte: function () {
    return this.trans.readByte();
  },
  readI16: function () {
    return this.readI32();
  },
  readI32: function () {
    return this.zigzagToI32(this.readVarint32());
  },
  readI64: function () {
    return this.zigzagToI64(this.readVarint64());
  },
  // Little-endian, unlike TBinaryProtocol
  readDouble: function () {
    var buff = this.trans.read(8);
    var off = 0;
    var signed = buff[off + 7] & 0x80;
    var e = (buff[off+6] & 0xF0) >> 4;
    e += (buff[off+7] & 0x7F) << 4;
    var m = buff[off];
    m += buff[off+1] << 8;
    m += buff[off+2] << 16;
    m += buff[off+3] * POW_24;
    m += buff[off+4] * POW_32;
    m += buff[off+5] * POW_40;
    m += (buff[off+6] & 0x0F) * POW_48;
    switch (e) {
      case 0:
        e = -1022;
        break;
      case 2047:
        return m ? NaN : (signed ? -Infinity : Infinity);
      default:
        m += POW_52;
        e -= 1023;
    }
    if (signed) {
      m *= -1;
    }
    return m * Math.pow(2, e - 52);
  },
  readBinary: function () {
    var size = this.readVarint32();
    if (size === 0) {
      return new ArrayBuffer(0);
    }
    if (size < 0) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, 'Negative binary size');
    }
    return this.trans.read(size);
  },
  readString: function () {
    var size = this.readVarint32();
    // Catch empty string case
    if (size === 0) {
      return '';
    }
    // Catch error cases
    if (size < 0) {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, 'Negative string size');
    }
    return this.trans.readString(size);
  },

  // Compact Protocol internal read operations
  /**
   * Read an i32 from the wire as a varint. The MSB of each byte is set
   * if there is another byte to follow. This can read up to 5 bytes.
   */

  readVarint32: function () {
    return this.readVarint64().toNumber();
  },

  /**
   * Read an i64 from the wire as a proper varint. The MSB of each byte is set
   * if there is another byte to follow. This can read up to 10 bytes.
   */

  readVarint64: function () {
    var rsize = 0;
    var lo = 0;
    var hi = 0;
    var shift = 0;
    let end = false;
    while (!end) {
      var b = this.trans.readByte();
      rsize++;
      if (shift <= 25) {
        lo = lo | ((b & 0x7f) << shift);
      } else if (25 < shift && shift < 32) {
        lo = lo | ((b & 0x7f) << shift);
        hi = hi | ((b & 0x7f) >>> (32 - shift));
      } else {
        hi = hi | ((b & 0x7f) << (shift - 32));
      }
      shift += 7;
      if (!(b & 0x80)) {
        end = true;
      } else if (rsize >= 10) {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA,
          'Variable-length int over 10 bytes.');
      }
    }
    return new Int64(hi, lo);
  },

  /**
   * Convert from zigzag int to int.
   */

  zigzagToI32: function (n) {
    return (n >>> 1) ^ (-1 * (n & 1));
  },

  /**
   * Convert from zigzag long to long.
   */

  zigzagToI64: function (n) {
    var hi = n.buffer.readUInt32BE(0, true);
    var lo = n.buffer.readUInt32BE(4, true);
    var neg = new Int64(hi & 0, lo & 1);
    neg._2scomp();
    var hiNeg = neg.buffer.readUInt32BE(0, true);
    var loNeg = neg.buffer.readUInt32BE(4, true);
    var hiLo = (hi << 31);
    hi = (hi >>> 1) ^ (hiNeg);
    lo = ((lo >>> 1) | hiLo) ^ (loNeg);
    return new Int64(hi, lo);
  },
  skip: function (type) {
    switch (type) {
      case Type.BOOL:
        this.readBool();
        break;
      case Type.BYTE:
        this.readByte();
        break;
      case Type.I16:
        this.readI16();
        break;
      case Type.I32:
        this.readI32();
        break;
      case Type.I64:
        this.readI64();
        break;
      case Type.DOUBLE:
        this.readDouble();
        break;
      case Type.STRING:
        this.readString();
        break;
      case Type.STRUCT:
        this.performStructOperation();
        break;
      case Type.MAP:
        this.performMapOperation();
        break;
      case Type.SET:
        this.performSetOperation();
        break;
      case Type.LIST:
        this.performListOperation();
        break;
      default:
        throw new Error('Invalid type: ' + type);
    }
  },

  performStructOperation: function () {
    this.readStructBegin();
    let end = false;
    while (!end) {
      var r = this.readFieldBegin();
      if (r.ftype === Type.STOP) {
        end = true;
      } else {
        this.skip(r.ftype);
        this.readFieldEnd();
      }
    }
    this.readStructEnd();
  },

  performMapOperation: function () {
    var mapBegin = this.readMapBegin();
    for (var i = 0; i < mapBegin.size; ++i) {
      this.skip(mapBegin.ktype);
      this.skip(mapBegin.vtype);
    }
    this.readMapEnd();
  },

  performSetOperation: function () {
    var setBegin = this.readSetBegin();
    for (var i2 = 0; i2 < setBegin.size; ++i2) {
      this.skip(setBegin.etype);
    }
    this.readSetEnd();
  },

  performListOperation: function () {
    var listBegin = this.readListBegin();
    for (var i3 = 0; i3 < listBegin.size; ++i3) {
      this.skip(listBegin.etype);
    }
    this.readListEnd();
  }
};

/**
 * Initializes a MutilplexProtocol Implementation as a Wrapper for Thrift.Protocol
 * @constructor
 */

Thrift.MultiplexProtocol = function (srvName, trans, strictRead, strictWrite) {
  Thrift.Protocol.call(this, trans, strictRead, strictWrite);
  this.serviceName = srvName;
};
Thrift.inherits(Thrift.MultiplexProtocol, Thrift.Protocol, 'multiplexProtocol');

/**
 * Override writeMessageBegin method of prototype
 * */

Thrift.MultiplexProtocol.prototype.writeMessageBegin = function (name, type, seqid) {

  if (type === Thrift.MessageType.CALL || type === Thrift.MessageType.ONEWAY) {
    Thrift.Protocol.prototype.writeMessageBegin.call(this, this.serviceName + ':' + name, type, seqid);
  } else {
    Thrift.Protocol.prototype.writeMessageBegin.call(this, name, type, seqid);
  }
};

Thrift.Multiplexer = function () {
  this.seqid = 0;
};

/**
 * Instantiates a multiplexed client for a specific service
 * @constructor
 * @param {String} serviceName - The transport to serialize to/from.
 * @param SCl - The Service Client Class
 * @param {Thrift.Transport} transport - Thrift.Transport instance which provides remote host:port
 * @example
 *    var mp = new Thrift.Multiplexer();
 *    var transport = new Thrift.Transport("http://localhost:9090/foo.thrift");
 *    var protocol = new Thrift.Protocol(transport);
 *    var client = mp.createClient('AuthService', AuthServiceClient, transport);
 */

Thrift.Multiplexer.prototype.createClient = function (serviceName, SCl, transport) {
  if (SCl.Client) {
    SCl = SCl.Client;
  }
  var self = this;
  SCl.prototype.newSeqid = function () {
    self.seqid += 1;
    return self.seqid;
  };
  var client = new SCl(new Thrift.MultiplexProtocol(serviceName, transport));

  return client;
};


var copyList, copyMap;

copyList = function (lst, types) {

  if (!lst) {
    return lst;
  }

  var type;

  if (types.shift === undefined) {
    type = types;
  }
  else {
    type = types[0];
  }
  var Type = type;

  var len = lst.length, result = [], i, val;
  for (i = 0; i < len; i++) {
    val = lst[i];
    if (type === null) {
      result.push(val);
    }
    else if (type === copyMap || type === copyList) {
      result.push(type(val, types.slice(1)));
    }
    else {
      result.push(new Type(val));
    }
  }
  return result;
};

copyMap = function (obj, types) {

  if (!obj) {
    return obj;
  }

  var type;

  if (types.shift === undefined) {
    type = types;
  }
  else {
    type = types[0];
  }
  var Type = type;

  var result = {}, val;
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      val = obj[prop];
      if (type === null) {
        result[prop] = val;
      }
      else if (type === copyMap || type === copyList) {
        result[prop] = type(val, types.slice(1));
      }
      else {
        result[prop] = new Type(val);
      }
    }
  }
  return result;
};

Thrift.copyMap = copyMap;
Thrift.copyList = copyList;

var Base64 = {

  // private property
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  // public method for encoding
  encode: function (input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8Encode(input);

    while (i < input.length) {

      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
  },

  // public method for decoding
  decode: function (input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9+/=]/g, '');

    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8Decode(output);

    return output;
  },

  // private method for UTF-8 encoding
  _utf8Encode: function (string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8Decode: function (utftext) {
    var string = '';
    var i = 0;
    var c = 0;
    var c2 = 0;
    var c3 = 0;

    while (i < utftext.length) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}

export default Thrift;
