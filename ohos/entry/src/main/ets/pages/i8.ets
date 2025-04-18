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
import {WorkI8, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';

@Entry
@Component
struct I8 {
  @State i8add: string = 'I8 ADD:'
  @State i8subtract: string = 'I8 SUBTRACK:'
  @State i8multiply: string = 'I8 MULTIPLY:'
  @State i8divide: string = 'I8 DIVIDE:'

  build() {
    Row() {
      Column() {
        Text(this.i8add)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)

        Text(this.i8subtract)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.i8multiply)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.i8divide)
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

    let workI8Add: WorkI8 = new WorkI8()
    workI8Add.num1 = 1;
    workI8Add.num2 = 15;
    workI8Add.op = Operation.ADD;
    client.calculateI8(1, workI8Add, (result: ESObject) => {
      if (result) {
        that.i8add = 'I8 ADD:'+result;
      }
    });

    let workI8Subtract: WorkI8 = new WorkI8()
    workI8Subtract.num1 = 25;
    workI8Subtract.num2 = 15;
    workI8Subtract.op = Operation.SUBTRACT;
    client.calculateI8(1, workI8Subtract, (result: ESObject) => {
      if (result) {
        that.i8subtract = 'I8 SUBTRACK:'+result;
      }
    });

    let workI8Multiply: WorkI8 = new WorkI8()
    workI8Multiply.num1 = 1;
    workI8Multiply.num2 = 15;
    workI8Multiply.op = Operation.MULTIPLY;
    client.calculateI8(1, workI8Multiply, (result: ESObject) => {
      if (result) {
        that.i8multiply = 'I8 MULTIPLY:'+result;
      }
    });

    let workI8Divide: WorkI8 = new WorkI8()
    workI8Divide.num1 = 15;
    workI8Divide.num2 = 15;
    workI8Divide.op = Operation.DIVIDE;
    client.calculateI8(1, workI8Divide, (result: ESObject) => {
      if (result) {
        that.i8divide = 'I8 DIVIDE:'+result;
      }
    });
  }
}