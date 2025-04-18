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
 
export namespace Type {
    const STOP: number;
    const VOID: number;
    const BOOL: number;
    const BYTE: number;
    const I08: number;
    const DOUBLE: number;
    const I16: number;
    const I32: number;
    const I64: number;
    const STRING: number;
    const UTF7: number;
    const STRUCT: number;
    const MAP: number;
    const SET: number;
    const LIST: number;
    const UTF8: number;
    const UTF16: number;
}
export namespace MessageType {
    const CALL: number;
    const REPLY: number;
    const EXCEPTION: number;
    const ONEWAY: number;
}

/**
 * Utility function returning the count of an object's own properties.
 * @param {object} obj - Object to test.
 * @returns {number} number of object's own properties
 * @devices phone, tablet
 */
export function objectLength(obj: any): number;
/**
 * Inherits prototype and create new object
 * @devices phone, tablet
 */
export function inherits(constructor: any, superConstructor: any, name: string): void;

/**
 * Thrift Exception class
 * @devices phone, tablet
 */
export function TException(message: any): void;
export class TException {
    constructor(message: any);
    message: any;
    getMessage(): any;
}

/**
 * Thrift Application Exception type string to Id mapping.
 * @readonly
 * @property {number}  UNKNOWN                 - Unknown/undefined.
 * @property {number}  UNKNOWN_METHOD          - Client attempted to call a method unknown to the server.
 * @property {number}  INVALID_MESSAGE_TYPE    - Client passed an unknown/unsupported MessageType.
 * @property {number}  WRONG_METHOD_NAME       - Unused.
 * @property {number}  BAD_SEQUENCE_ID         - Unused in Thrift RPC, used to flag proprietary sequence number errors.
 * @property {number}  MISSING_RESULT          - Raised by a server processor if a handler fails to supply the required return result.
 * @property {number}  INTERNAL_ERROR          - Something bad happened.
 * @property {number}  PROTOCOL_ERROR          - The protocol layer failed to serialize or deserialize data.
 * @property {number}  INVALID_TRANSFORM       - Unused.
 * @property {number}  INVALID_PROTOCOL        - The protocol (or version) is not supported.
 * @property {number}  UNSUPPORTED_CLIENT_TYPE - Unused.
 * @devices phone, tablet
 */
export namespace TApplicationExceptionType {
    const UNKNOWN: number;
    const UNKNOWN_METHOD: number;
    const INVALID_MESSAGE_TYPE: number;
    const WRONG_METHOD_NAME: number;
    const BAD_SEQUENCE_ID: number;
    const MISSING_RESULT: number;
    const INTERNAL_ERROR: number;
    const PROTOCOL_ERROR: number;
    const INVALID_TRANSFORM: number;
    const INVALID_PROTOCOL: number;
    const UNSUPPORTED_CLIENT_TYPE: number;
}

/**
 * Thrift Application Exception
 * @param {message, code} Exception with message and code
 * @devices phone, tablet
 */
export function TApplicationException(message: any, code: any): void;
export class TApplicationException {
    constructor(type: any, message: any);
    message: any;
    code: any;
    /**
    * Read a TApplicationException from the supplied protocol.
    * @param {object} input - The input protocol to read from.
    * @devices phone, tablet
     */
    read(input: any): void;
    /**
     * Write a TApplicationException to the supplied protocol.
    * @param {object} output - The output protocol to write to.
    * @devices phone, tablet
    */
    write(output: any): void;
    /**
    * Returns the application exception code set on the exception.
    * @readonly
    * @returns {Thrift.TApplicationExceptionType} exception code
    */
    getCode(): any;
}
/**
 * Thrift Protocol Exception types
 * @devices phone, tablet
 */
export namespace TProtocolExceptionType {
    const UNKNOWN_1: number;
    export { UNKNOWN_1 as UNKNOWN };
    export const INVALID_DATA: number;
    export const NEGATIVE_SIZE: number;
    export const SIZE_LIMIT: number;
    export const BAD_VERSION: number;
    export const NOT_IMPLEMENTED: number;
    export const DEPTH_LIMIT: number;
}
/**
 * Thrift Protocol Exception
 * @devices phone, tablet
 */
export function TProtocolException(type: any, message: any): void;
export class TProtocolException {
    constructor(type: any, message: any);
    name: any;
    type: any;
    message: any;
}
export = THTTPTransport;
declare function THTTPTransport(url: any, options: any): void;
declare class THTTPTransport {
    constructor(url: any, options: any);
    url: any;
    wpos: number;
    rpos: number;
    useCORS: any;
    customHeaders: any;
    send_buf: string;
    recv_buf: string;
    /**
         * Gets the specific HttpRequest Object.
         * @returns {object} the httpRequest interface object
         */
    getHttpRequestObject(): object;
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
    flush(async: object, callback: object): undefined | string;
    recv_buf_sz: any;
    /**
     * Sets the buffer to provide the protocol when deserializing.
     * @param {string} buf - The buffer to supply the protocol.
     */
    setRecvBuffer(buf: string): void;
    /**
     * Returns true if the transport is open, HTTP always returns true.
     * @readonly
     * @returns {boolean} Always True.
     */
    readonly isOpen(): boolean;
    /**
     * Opens the transport connection, with HTTP this is a nop.
     */
    open(): void;
    /**
     * Closes the transport connection, with HTTP this is a nop.
     */
    close(): void;
    /**
     * Returns the specified number of characters from the response
     * buffer.
     * @param {number} len - The number of characters to return.
     * @returns {string} Characters sent by the server.
     */
    read(len: number): string;
    /**
     * Returns the entire response buffer.
     * @returns {string} Characters sent by the server.
     */
    readAll(): string;
    /**
     * Sets the send buffer to buf.
     * @param {string} buf - The buffer to send.
     */
    write(buf: string): void;
    /**
     * Returns the send buffer.
     * @readonly
     * @returns {string} The send buffer.
     */
    readonly getSendBuffer(): string;
    /**
     * Sets the seqId. (Custom Function)
     * @param seqId: seqId to be set
     */
    setCurrSeqId(seqId: any): void;
}

export = TJSONProtocol;
/**
 * Initializes a Thrift JSON protocol instance.
 * @constructor
 * @param {Thrift.Transport} trans - The transport to serialize to/from.
 * @classdesc Apache Thrift Protocols perform serialization which enables cross
 * language RPC. The Protocol type is the JavaScript browser implementation
 * of the Apache Thrift TJSONProtocol.
 * @example
 *     var protocol  = new Thrift.Protocol(transport);
 */
declare function TJSONProtocol(trans: Thrift.Transport): void;
declare class TJSONProtocol {
    /**
     * Initializes a Thrift JSON protocol instance.
     * @constructor
     * @param {Thrift.Transport} trans - The transport to serialize to/from.
     * @classdesc Apache Thrift Protocols perform serialization which enables cross
     * language RPC. The Protocol type is the JavaScript browser implementation
     * of the Apache Thrift TJSONProtocol.
     * @example
     *     var protocol  = new Thrift.Protocol(transport);
     */
    constructor(trans: Thrift.Transport);
    /**
     * Returns the underlying transport.
     * @readonly
     * @returns {Thrift.Transport} The underlying transport.
     */
    readonly getTransport(): Thrift.Transport;
    /**
     * Serializes the beginning of a Thrift RPC message.
     * @param {string} name - The service method to call.
     * @param {Thrift.MessageType} messageType - The type of method call.
     * @param {number} seqid - The sequence number of this call (always 0 in Apache Thrift).
     */
    writeMessageBegin(name: string, messageType: {
        CALL: number;
        REPLY: number;
        EXCEPTION: number;
        ONEWAY: number;
    }, seqid: number): void;

    tstack: any[];
    tpos: any[];
    trans: Thrift.Transport;
    flush(): any;
    writeToTransportIfStackIsFlushable(): void;
    /**
     * Serializes the end of a Thrift RPC message.
     */
    writeMessageEnd(): void;
    wobj: any;
    wbuf: string;
    /**
     * Serializes the beginning of a struct.
     * @param {string} name - The name of the struct.
     */
    writeStructBegin(name: string): void;
    /**
     * Serializes the end of a struct.
     */
    writeStructEnd(): void;
    /**
     * Serializes the beginning of a struct field.
     * @param {string} name - The name of the field.
     * @param {Thrift.Protocol.Type} fieldType - The data type of the field.
     * @param {number} fieldId - The field's unique identifier.
     */
    writeFieldBegin(name: string, fieldType: Thrift.Protocol.Type, fieldId: number): void;
    /**
     * Serializes the end of a field.
     */
    writeFieldEnd(): void;
    /**
     * Serializes the end of the set of fields for a struct.
     */
    writeFieldStop(): void;
    /**
     * Serializes the beginning of a map collection.
     * @param {Thrift.Type} keyType - The data type of the key.
     * @param {Thrift.Type} valType - The data type of the value.
     * @param {number} [size] - The number of elements in the map (ignored).
     */
    writeMapBegin(keyType: {
        STOP: number;
        VOID: number;
        BOOL: number;
        BYTE: number;
        I08: number;
        DOUBLE: number;
        I16: number;
        I32: number;
        I64: number;
        STRING: number;
        UTF7: number;
        STRUCT: number;
        MAP: number;
        SET: number;
        LIST: number;
        UTF8: number;
        UTF16: number;
    }, valType: {
        STOP: number;
        VOID: number;
        BOOL: number;
        BYTE: number;
        I08: number;
        DOUBLE: number;
        I16: number;
        I32: number;
        I64: number;
        STRING: number;
        UTF7: number;
        STRUCT: number;
        MAP: number;
        SET: number;
        LIST: number;
        UTF8: number;
        UTF16: number;
    }, size?: number): void;
    /**
     * Serializes the end of a map.
     */
    writeMapEnd(): void;
    /**
     * Serializes the beginning of a list collection.
     * @param {Thrift.Type} elemType - The data type of the elements.
     * @param {number} size - The number of elements in the list.
     */
    writeListBegin(elemType: {
        STOP: number;
        VOID: number;
        BOOL: number;
        BYTE: number;
        I08: number;
        DOUBLE: number;
        I16: number;
        I32: number;
        I64: number;
        STRING: number;
        UTF7: number;
        STRUCT: number;
        MAP: number;
        SET: number;
        LIST: number;
        UTF8: number;
        UTF16: number;
    }, size: number): void;
    /**
     * Serializes the end of a list.
     */
    writeListEnd(): void;
    /**
     * Serializes the beginning of a set collection.
     * @param {Thrift.Type} elemType - The data type of the elements.
     * @param {number} size - The number of elements in the list.
     */
    writeSetBegin(elemType: {
        STOP: number;
        VOID: number;
        BOOL: number;
        BYTE: number;
        I08: number;
        DOUBLE: number;
        I16: number;
        I32: number;
        I64: number;
        STRING: number;
        UTF7: number;
        STRUCT: number;
        MAP: number;
        SET: number;
        LIST: number;
        UTF8: number;
        UTF16: number;
    }, size: number): void;
    /**
     * Serializes the end of a set.
     */
    writeSetEnd(): void;
    /** Serializes a boolean */
    writeBool(bool: any): void;
    /** Serializes a number */
    writeByte(byte: any): void;
    /** Serializes a number */
    writeI16(i16: any): void;
    /** Serializes a number */
    writeI32(i32: any): void;
    /** Serializes a number */
    writeI64(i64: any): void;
    /** Serializes a number */
    writeDouble(dub: any): void;
    /** Serializes a string */
    writeString(arg: any): void;
    /** Serializes a string */
    writeBinary(arg: any): void;
    /**
     * Deserializes the beginning of a message.
     */
    readMessageBegin(): void;
    rstack: any[];
    rpos: any[];
    robj: any;
    /** Deserializes the end of a message. */
    readMessageEnd(): void;
    /**
     * Deserializes the beginning of a struct.
     * @param {string} [name] - The name of the struct (ignored)
     * @returns {object} - An object with an empty string fname property
     */
    readStructBegin(): object;
    /** Deserializes the end of a struct. */
    readStructEnd(): void;
    /**
     * @class
     * @name AnonReadFieldBeginReturn
     * @property {string} fname - The name of the field (always '').
     * @property {Thrift.Type} ftype - The data type of the field.
     * @property {number} fid - The unique identifier of the field.
     */
    /**
     * Deserializes the beginning of a field.
     * @returns {AnonReadFieldBeginReturn}
     */
    readFieldBegin(): any;
    /** Deserializes the end of a field. */
    readFieldEnd(): void;
    /**
     * @class
     * @name AnonReadMapBeginReturn
     * @property {Thrift.Type} ktype - The data type of the key.
     * @property {Thrift.Type} vtype - The data type of the value.
     * @property {number} size - The number of elements in the map.
     */
    /**
     * Deserializes the beginning of a map.
     * @returns {AnonReadMapBeginReturn}
     */
    readMapBegin(): any;
    /** Deserializes the end of a map. */
    readMapEnd(): void;
    /**
     * @class
     * @name AnonReadColBeginReturn
     * @property {Thrift.Type} etype - The data type of the element.
     * @property {number} size - The number of elements in the collection.
     */
    /**
     * Deserializes the beginning of a list.
     * @returns {AnonReadColBeginReturn}
     */
    readListBegin(): any;
    /** Deserializes the end of a list. */
    readListEnd(): void;
    /**
     * Deserializes the beginning of a set.
     * @returns {AnonReadColBeginReturn}
     */
    readSetBegin(): any;
    /** Deserializes the end of a set. */
    readSetEnd(): void;
    /** Returns an object with a value property set to
     *  False unless the next number in the protocol buffer
     *  is 1, in which case the value property is True */
    readBool(): boolean;
    /** Returns the an object with a value property set to the
        next value found in the protocol buffer */
    readByte(): number;
    /** Returns the an object with a value property set to the
        next value found in the protocol buffer */
    readI16(): number;
    /** Returns the an object with a value property set to the
        next value found in the protocol buffer */
    readI32(f: any): number;
    /** Returns the next value found in the protocol buffer */
    readValue(f: any): any;
    /** Returns the an object with a value property set to the
        next value found in the protocol buffer */
    readI64(): any;
    /** Returns the an object with a value property set to the
        next value found in the protocol buffer */
    readDouble(): number;
    /** Returns the an object with a value property set to the
        next value found in the protocol buffer */
    readBinary(): any;
    /** Returns the an object with a value property set to the
        next value found in the protocol buffer */
    readString(): any;
    /**
     * Method to arbitrarily skip over data
     */
    skip(type: any): void;
}
declare namespace TJSONProtocol {
    const Type: typeof Type;
    namespace RType {
        const tf: number;
        const i8: number;
        const i16: number;
        const i32: number;
        const i64: number;
        const dbl: number;
        const rec: number;
        const str: number;
        const map: number;
        const lst: number;
        const set: number;
    }
    const Version: number;
}

/**
 * Initializes a MutilplexProtocol Implementation as a Wrapper for Thrift.Protocol
 * @constructor
 */
export function MultiplexProtocol(srvName: any, trans: any, strictRead: any, strictWrite: any) : void;
export class MultiplexProtocol {
    constructor(srvName: any, trans: any, strictRead: any, strictWrite: any);
    serviceName: any
    writeMessageBegin(name: any, type: any, seqid:any) 
}

/** Instantiates a multiplexed client for a specific service
 * @constructor
 * @param {String} serviceName - The transport to serialize to/from.
 * @param SCl - The Service Client Class
 * @param {Thrift.Transport} transport - Thrift.Transport instance which provides remote host:port
 * @example
 *    var mp = new Thrift.Multiplexer();
 *    var transport = new Thrift.Transport("http://localhost:9090/foo.thrift");
 *    var protocol = new Thrift.Protocol(transport);
 *    var client = mp.createClient('AuthService', AuthServiceClient, transport);
 * @devices phone, tablet
*/
export function Multiplexer(): void;
export class Multiplexer {
    seqid: number;
    createClient(serviceName: any, ServiceClient: any, connection: any): any;
}
export var copyMap: any;
export var copyList: any;
