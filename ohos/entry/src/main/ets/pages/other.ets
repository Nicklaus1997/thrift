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

import {Thrift} from '@ohos/thrift'
import CalculatorClient from '../common/calculator/Calculator';
import {WorkBool, WorkBinary, WorkString, Operation
} from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';

@Entry
@Component
struct Other {
  @State stringAppend: string = 'STRING APPEND:'
  @State boolReverse: string = 'BOOL REVERSE:'
  @State binaryOperation: string = 'BINARY OPERATION:'

  build() {
    Row() {
      Column() {
        Text(this.stringAppend)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)

        Text(this.boolReverse)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.binaryOperation)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })




        Button('send request')
          .width("100%")
          .height(100)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .margin({
            top: 10
          })
          .onClick((event) => {
            this.onButtonClick()
          })

      }
      .width('100%')
    }
    .height('100%')
  }

  onButtonClick() {
    let transport: ESObject = new Thrift.Transport("http://" + GlobalContext.getContext().getValue("ipAddress").toString());
    let protocol: ESObject = new Thrift.Protocol(transport);
    let client: CalculatorClient = new CalculatorClient(protocol);

    let that: ESObject = this;

    let workString: WorkString = new WorkString()
    workString.value1 = 'Thrift';
    workString.value2 = '_OHOS';
    workString.op = Operation.APPEND;
    client.performAppendString(1, workString, (result: ESObject) => {
      if (result) {
        that.stringAppend = 'STRING APPEND:'+result;
      }
    });

    let workBool: WorkBool = new WorkBool()
    workBool.value = false;
    workBool.op = Operation.REVERSE_BOOLEAN;
    client.performReverseBoolean(1, workBool, (result: ESObject) => {
        that.boolReverse = 'BOOL REVERSE:'+result;
    });

    let workBinary: WorkBinary = new WorkBinary();
    workBinary.value = 'aGk='; // encode base 64 value
    workBinary.op = Operation.BINARY_SIZE;
    client.performByteArraySize(1, workBinary, (result: ESObject) => {
      if (result) {
        that.binaryOperation = 'BINARY OPERATION:'+result;
      }
    });
  }
}