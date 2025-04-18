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
 
/**
 * Constructor accepts any of the following argument types:
 *
 * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
 * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
 * new Int64(string)             - Hex string (throws if n is outside Int64 range)
 * new Int64(number)             - Number (throws if n is outside Int64 range)
 * new Int64(hi, lo)             - Raw bits as two 32-bit values
 */
export function Int64(a1: any, a2: any, ...args: any[]): void;
export class Int64 {
    /**
     * Constructor accepts any of the following argument types:
     *
     * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
     * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
     * new Int64(string)             - Hex string (throws if n is outside Int64 range)
     * new Int64(number)             - Number (throws if n is outside Int64 range)
     * new Int64(hi, lo)             - Raw bits as two 32-bit values
     */
    constructor(a1: any, a2: any, ...args: any[]);
    buffer: ArrayBuffer;
    offset: any;
    MAX_INT: number;
    MIN_INT: number;
    /**
       * Do in-place 2's compliment.  See
       * http://en.wikipedia.org/wiki/Two's_complement
    */
    _2scomp(): void;
    /**
       * Set the value. Takes any of the following arguments:
       *
       * setValue(string) - A hexadecimal string
       * setValue(number) - Number (throws if n is outside Int64 range)
       * setValue(hi, lo) - Raw bits as two 32-bit values
       */
    setValue(hi: any, lo: any, ...args: any[]): void;
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
    toNumber(allowImprecise: any): number;
    /**
      * Convert to a JS Number. Returns +/-Infinity for values that can't be
      * represented to integer precision.
      */
    valueOf(): number;
    /**
      * Return string value
      * param radix Just like Number#toString()'s radix
      */
    toString(radix: any): string;
    /**
      * Return a string showing the buffer octets, with MSB on the left.
      * param sep separator string. default is '' (empty string)
      */
    toOctetString(sep: any): string;
    /**
      * Returns the Int64's 8 bytes in a buffer.
      *
      * param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
      *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
      */
    toBuffer(rawBuffer: any): ArrayBuffer;
    /**
      * Copy 8 bytes of Int64 into target buffer at target offset.
      * param {Buffer} targetBuffer       Buffer to copy into.
      * param {number} [targetOffset=0]   Offset into target buffer.
      */
    copy(targetBuffer: any, targetOffset: any): void;
    /**
      * Returns a number indicating whether this comes before or after or is the
      * same as the other in sort order.
      *
      * @param {Int64} other  Other Int64 to compare.
      */
    compare(other: Int64): number;
    /**
      * Returns a boolean indicating if this integer is equal to other.
      *
      * @param {Int64} other  Other Int64 to compare.
      */
    equals(other: Int64): boolean;
    /**
      * Pretty output in console.log
      */
    inspect(): string;
}
