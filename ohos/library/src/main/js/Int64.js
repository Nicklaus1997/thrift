/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Useful masks and values for bit twiddling
var VAL32 = 0x100000000;

// Map for converting hex octets to strings
var _HEX = [];
for (var i = 0; i < 256; i++) {
  _HEX[i] = (i > 0xF ? '' : '0') + i.toString(16);
}

/**
 * Int64
 *
 * Constructor accepts any of the following argument types:
 *
 * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
 * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
 * new Int64(string)             - Hex string (throws if n is outside Int64 range)
 * new Int64(number)             - Number (throws if n is outside Int64 range)
 * new Int64(hi, lo)             - Raw bits as two 32-bit values
 */
export function Int64(a1, a2) {
  if (a1 instanceof ArrayBuffer) {
    this.buffer = a1;
    this.offset = a2 || 0;
  } else if (Object.prototype.toString.call(a1) == '[object Uint8Array]') {

    /**
     * Under Browserify, Buffers can extend Uint8Arrays rather than an
     * instance of Buffer. We could assume the passed in Uint8Array is actually
     * a buffer but that won't handle the case where a raw Uint8Array is passed
     * in. We construct a new Buffer just in case.
     */

    this.buffer = new ArrayBuffer(a1);
    this.offset = a2 || 0;
  } else {
    this.buffer = this.buffer || new ArrayBuffer(8);
    this.offset = 0;
    this.setValue.apply(this, arguments);
  }
}


// Max integer value that JS can accurately represent
Int64.prototype.MAX_INT = Math.pow(2, 53);

// Min integer value that JS can accurately represent
Int64.prototype.MIN_INT = -Math.pow(2, 53);

/**
 * Do in-place 2's compliment.  See
 * http://en.wikipedia.org/wiki/Two's_complement
 */

Int64.prototype._2scomp = function () {
  var b = this.buffer, o = this.offset, carry = 1;
  for (var i = o + 7; i >= o; i--) {
    var v = (b[i] ^ 0xff) + carry;
    b[i] = v & 0xff;
    carry = v >> 8;
  }
}

/**
 * Set the value. Takes any of the following arguments:
 *
 * setValue(string) - A hexadecimal string
 * setValue(number) - Number (throws if n is outside Int64 range)
 * setValue(hi, lo) - Raw bits as two 32-bit values
 */

Int64.prototype.setValue = function (hi, lo) {
  var negate = false;
  if (arguments.length == 1) {
    if (typeof (hi) == 'number') {
      // Simplify bitfield retrieval by using abs() value.  We restore sign later
      negate = hi < 0;
      hi = Math.abs(hi);
      lo = hi % VAL32;
      hi = hi / VAL32;
      if (hi > VAL32) throw new RangeError(hi + ' is outside Int64 range');
      hi = hi | 0;
    } else if (typeof (hi) == 'string') {
      hi = (hi + '').replace(/^0x/, '');
      lo = hi.substr(-8);
      hi = hi.length > 8 ? hi.substr(0, hi.length - 8) : '';
      hi = parseInt(hi, 16);
      lo = parseInt(lo, 16);
    } else {
      throw new Error(hi + ' must be a Number or String');
    }
  }

  /**
   * Technically we should throw if hi or lo is outside int32 range here, but
   * it's not worth the effort. Anything past the 32'nd bit is ignored.

   * Copy bytes to buffer
   */

  var b = this.buffer, o = this.offset;
  for (var i = 7; i >= 0; i--) {
    b[o+i] = lo & 0xff;
    lo = i == 4 ? hi : lo >>> 8;
  }

  // Restore sign of passed argument
  if (negate) this._2scomp();
}

/**
 * Convert to a native JS number.
 *
 * WARNING: Do not expect this value to be accurate to integer precision for
 * large (positive or negative) numbers!
 *
 * @param allowImprecise If true, no check is performed to verify the
 * returned value is accurate to integer precision.  If false, imprecise
 * numbers (very large positive or negative numbers) will be forced to +/-
 * Infinity.
 */
Int64.prototype.toNumber = function (allowImprecise) {
  var b = this.buffer, o = this.offset;

  // Running sum of octets, doing a 2's complement
  var negate = b[o] & 0x80, x = 0, carry = 1;
  for (var i = 7, m = 1; i >= 0; i--, m *= 256) {
    var v = b[o+i];

    // 2's complement for negative numbers
    if (negate) {
      v = (v ^ 0xff) + carry;
      carry = v >> 8;
      v = v & 0xff;
    }

    x += v * m;
  }

  // Return Infinity if we've lost integer precision
  if (!allowImprecise && x >= Int64.MAX_INT) {
    return negate ? -Infinity : Infinity;
  }

  return negate ? -x : x;
}

/**
 * Convert to a JS Number. Returns +/-Infinity for values that can't be
 * represented to integer precision.
 */

Int64.prototype.valueOf = function () {
  return this.toNumber(false);
}

/**
 * Return string value
 * param radix Just like Number#toString()'s radix
 */

Int64.prototype.toString = function (radix) {
  return this.valueOf().toString(radix || 10);
}

/**
 * Return a string showing the buffer octets, with MSB on the left.
 * param sep separator string. default is '' (empty string)
 */

Int64.prototype.toOctetString = function (sep) {
  var out = new Array(8);
  var b = this.buffer, o = this.offset;
  for (var i = 0; i < 8; i++) {
    out[i] = _HEX[b[o+i]];
  }
  return out.join(sep || '');
}

/**
 * Returns the Int64's 8 bytes in a buffer.
 *
 * param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
 *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
 */

Int64.prototype.toBuffer = function (rawBuffer) {
  if (rawBuffer && this.offset === 0) return this.buffer;

  var out = new ArrayBuffer(8);
  this.buffer.copy(out, 0, this.offset, this.offset + 8);
  return out;
}

/**
 * Copy 8 bytes of Int64 into target buffer at target offset.
 * param {Buffer} targetBuffer       Buffer to copy into.
 * param {number} [targetOffset=0]   Offset into target buffer.
 */

Int64.prototype.copy = function (targetBuffer, targetOffset) {
  this.buffer.copy(targetBuffer, targetOffset || 0, this.offset, this.offset + 8);
}

/**
 * Returns a number indicating whether this comes before or after or is the
 * same as the other in sort order.
 *
 * @param {Int64} other  Other Int64 to compare.
 */

Int64.prototype.compare = function (other) {

  // If sign bits differ ...
  if ((this.buffer[this.offset] & 0x80) != (other.buffer[other.offset] & 0x80)) {
    return other.buffer[other.offset] - this.buffer[this.offset];
  }

  // otherwise, compare bytes lexicographically
  for (var i = 0; i < 8; i++) {
    if (this.buffer[this.offset+i] !== other.buffer[other.offset+i]) {
      return this.buffer[this.offset+i] - other.buffer[other.offset+i];
    }
  }
  return 0;
}

/**
 * Returns a boolean indicating if this integer is equal to other.
 *
 * @param {Int64} other  Other Int64 to compare.
 */

Int64.prototype.equals = function (other) {
  return this.compare(other) === 0;
}

/**
 * Pretty output in console.log
 */

Int64.prototype.inspect = function () {
  return '[Int64 value:' + this + ' octets:' + this.toOctetString(' ') + ']';
}
