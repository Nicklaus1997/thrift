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
 * Integer converters
 * @name int64utils
 * @since 1.0.0
 * @sysCap AAFwk
 * @devices phone, tablet
 */
import {Int64} from "./int64";
export function int64utils(): void;
export class int64utils {
    /**
    * Integer to Decimal string
    * @devices phone, tablet
    */
    toDecimalString(i64: any): any;
    
    /**
    * Decimal string to Integer
    * @devices phone, tablet
    */
    fromDecimalString(text: any): Int64;

    /**
    * string to decimal number
    * @devices phone, tablet
    */
    toDecimalfromString(text: any, ...args: any[]): any;
}

