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
 * Binary read and write
 * @name binary
 * @since 1.0.0
 * @sysCap AAFwk
 * @devices phone, tablet
 */
export function Binary(): void;

export class Binary {
    /**
    * read Byte from binary
    * @devices phone, tablet
    */
    readByte(b: any): any;

    /**
    * read 16bit Integer from buffer
    * @devices phone, tablet
    */    
    readI16(buff: any, off: any): any;
    
    /**
    * read 32bit Integer from buffer
    * @devices phone, tablet
    */
    readI32(buff: any, off: any): any;

    /**
    * write 16bit Integer to buffer
    * @devices phone, tablet
    */    
    writeI16(buff: any, v: any): any;

    /**
    * write 32bit Integer to buffer
    * @devices phone, tablet
    */    
    writeI32(buff: any, v: any): any;
    
    /**
    * read double from buffer
    * @devices phone, tablet
    */    
    readDouble(buff: any, off: any): number;
    
    /**
    * write double from buffer
    * @devices phone, tablet
    */
    writeDouble(buff: any, v: any): any;
}
