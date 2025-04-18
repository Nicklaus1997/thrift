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
import {WorkI32, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';

@Entry
@Component
struct I32 {
  @State i32add: string = 'I32 ADD:'
  @State i32subtract: string = 'I32 SUBTRACK:'
  @State i32multiply: string = 'I32 MULTIPLY:'
  @State i32divide: string = 'I32 DIVIDE:'

  build() {
    Row() {
      Column() {
        Text(this.i32add)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)

        Text(this.i32subtract)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.i32multiply)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.i32divide)
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

    let workI32Add: WorkI32 = new WorkI32()
    workI32Add.num1 = 100;
    workI32Add.num2 = 150;
    workI32Add.op = Operation.ADD;
    client.calculateI32(1, workI32Add, (result: ESObject) => {
      if (result) {
        that.i32add = 'I32 ADD:'+result;
      }
    });

    let workI32Subtract: WorkI32 = new WorkI32()
    workI32Subtract.num1 = 250;
    workI32Subtract.num2 = 150;
    workI32Subtract.op = Operation.SUBTRACT;
    client.calculateI32(1, workI32Subtract, (result: ESObject) => {
      if (result) {
        that.i32subtract = 'I32 SUBTRACK:'+result;
      }
    });

    let workI32Multiply: WorkI32 = new WorkI32()
    workI32Multiply.num1 = 15;
    workI32Multiply.num2 = 15;
    workI32Multiply.op = Operation.MULTIPLY;
    client.calculateI32(1, workI32Multiply, (result: ESObject) => {
      if (result) {
        that.i32multiply = 'I32 MULTIPLY:'+result;
      }
    });

    let workI32Divide: WorkI32 = new WorkI32()
    workI32Divide.num1 = 300;
    workI32Divide.num2 = 150;
    workI32Divide.op = Operation.DIVIDE;
    client.calculateI32(1, workI32Divide, (result: ESObject) => {
      if (result) {
        that.i32divide = 'I32 DIVIDE:'+result;
      }
    });
  }
}