/**
 * Autogenerated by Thrift Compiler (0.15.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 */

import {Thrift} from '@ohos/thrift'

var SharedStruct = {};

SharedStruct.SharedStructI8 = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructI8.prototype = {};
SharedStruct.SharedStructI8.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.BYTE) {
            this.key = input.readByte().value;
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructI8.prototype.write = function (output) {
  output.writeStructBegin('SharedStructI8');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.BYTE, 1);
    output.writeByte(this.key);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructI16 = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructI16.prototype = {};
SharedStruct.SharedStructI16.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.I16) {
            this.key = input.readI16().value;
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructI16.prototype.write = function (output) {
  output.writeStructBegin('SharedStructI16');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.I16, 1);
    output.writeI16(this.key);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructI32 = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructI32.prototype = {};
SharedStruct.SharedStructI32.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.I32) {
            this.key = input.readI32().value;
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructI32.prototype.write = function (output) {
  output.writeStructBegin('SharedStructI32');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.I32, 1);
    output.writeI32(this.key);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructI64 = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructI64.prototype = {};
SharedStruct.SharedStructI64.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.I64) {
            this.key = input.readI64().value;
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructI64.prototype.write = function (output) {
  output.writeStructBegin('SharedStructI64');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.I64, 1);
    output.writeI64(this.key);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructDouble = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructDouble.prototype = {};
SharedStruct.SharedStructDouble.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.DOUBLE) {
            this.key = input.readDouble().value;
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructDouble.prototype.write = function (output) {
  output.writeStructBegin('SharedStructDouble');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.DOUBLE, 1);
    output.writeDouble(this.key);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructBool = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructBool.prototype = {};
SharedStruct.SharedStructBool.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.BOOL) {
            this.key = input.readBool().value;
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructBool.prototype.write = function (output) {
  output.writeStructBegin('SharedStructBool');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.BOOL, 1);
    output.writeBool(this.key);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructString = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructString.prototype = {};
SharedStruct.SharedStructString.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.STRING) {
            this.key = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructString.prototype.write = function (output) {
  output.writeStructBegin('SharedStructString');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.STRING, 1);
    output.writeString(this.key);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructBinary = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructBinary.prototype = {};
SharedStruct.SharedStructBinary.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.STRING) {
            this.key = input.readBinary().value;
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructBinary.prototype.write = function (output) {
  output.writeStructBegin('SharedStructBinary');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.STRING, 1);
    output.writeBinary(this.key);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructList = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = Thrift.copyList(args.key, [null]);
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructList.prototype = {};
SharedStruct.SharedStructList.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.LIST) {
            this.key = [];
            var _rtmp31 = input.readListBegin();
            var _size0 = _rtmp31.size || 0;
            for (var _i2 = 0; _i2 < _size0; ++_i2) {
              var elem3 = null;
              elem3 = input.readString().value;
              this.key.push(elem3);
            }
            input.readListEnd();
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructList.prototype.write = function (output) {
  output.writeStructBegin('SharedStructList');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.STRING, this.key.length);
    for (var iter4 in this.key) {
      if (Object.prototype.hasOwnProperty.call(this.key, iter4)) {
        iter4 = this.key[iter4];
        output.writeString(iter4);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructSet = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = Thrift.copyMap(args.key, [null]);
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructSet.prototype = {};
SharedStruct.SharedStructSet.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.MAP) {
            this.key = {};
            var _rtmp36 = input.readMapBegin();
            var _size5 = _rtmp36.size || 0;
            for (var _i7 = 0; _i7 < _size5; ++_i7) {
              if ((_i7 > 0) && (input.rstack.length > input.rpos[input.rpos.length -1] + 1)) {
                input.rstack.pop();
              }
              var key8 = null;
              var val9 = null;
              key8 = input.readString().value;
              val9 = input.readString().value;
              this.key[key8] = val9;
            }
            input.readMapEnd();
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructSet.prototype.write = function (output) {
  output.writeStructBegin('SharedStructSet');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.MAP, 1);
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRING, Thrift.objectLength(this.key));
    for (var kiter10 in this.key) {
      if (Object.prototype.hasOwnProperty.call(this.key, kiter10)) {
        var viter11 = this.key[kiter10];
        output.writeString(kiter10);
        output.writeString(viter11);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

SharedStruct.SharedStructMap = function (args) {
  this.key = null;
  this.value = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = Thrift.copyList(args.key, [null]);
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
SharedStruct.SharedStructMap.prototype = {};
SharedStruct.SharedStructMap.prototype.read = function (input) {
  input.readStructBegin();
  let end = false;
  while (!end) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      end = true;
    } else {
      switch (fid) {
        case 1:
          if (ftype == Thrift.Type.SET) {
            this.key = [];
            var _rtmp313 = input.readSetBegin();
            var _size12 = _rtmp313.size || 0;
            for (var _i14 = 0; _i14 < _size12; ++_i14) {
              var elem15 = null;
              elem15 = input.readString().value;
              this.key.push(elem15);
            }
            input.readSetEnd();
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype == Thrift.Type.STRING) {
            this.value = input.readString().value;
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
  }
  input.readStructEnd();
};

SharedStruct.SharedStructMap.prototype.write = function (output) {
  output.writeStructBegin('SharedStructMap');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.SET, 1);
    output.writeSetBegin(Thrift.Type.STRING, this.key.length);
    for (var iter16 in this.key) {
      if (Object.prototype.hasOwnProperty.call(this.key, iter16)) {
        iter16 = this.key[iter16];
        output.writeString(iter16);
      }
    }
    output.writeSetEnd();
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
};

export default SharedStruct;
