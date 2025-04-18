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
import {WorkI64, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';

@Entry
@Component
struct I64 {
  @State i64add: string = 'I64 ADD:'
  @State i64subtract: string = 'I64 SUBTRACK:'
  @State i64multiply: string = 'I64 MULTIPLY:'
  @State i64divide: string = 'I64 DIVIDE:'

  build() {
    Row() {
      Column() {
        Text(this.i64add)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)

        Text(this.i64subtract)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.i64multiply)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.i64divide)
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

    let workI64Add: WorkI64 = new WorkI64()
    workI64Add.num1 = 1000;
    workI64Add.num2 = 1500;
    workI64Add.op = Operation.ADD;
    client.calculateI64(1, workI64Add, (result: ESObject) => {
      if (result) {
        that.i64add = 'I64 ADD:'+result;
      }
    });

    let workI64Subtract: WorkI64 = new WorkI64()
    workI64Subtract.num1 = 1505;
    workI64Subtract.num2 = 1500;
    workI64Subtract.op = Operation.SUBTRACT;
    client.calculateI64(1, workI64Subtract, (result: ESObject) => {
      if (result) {
        that.i64subtract ='I64 SUBTRACK:'+result;
      }
    });

    let workI64Multiply: WorkI64 = new WorkI64()
    workI64Multiply.num1 = 100;
    workI64Multiply.num2 = 150;
    workI64Multiply.op = Operation.MULTIPLY;
    client.calculateI64(1, workI64Multiply, (result: ESObject) => {
      if (result) {
        that.i64multiply = 'I64 MULTIPLY:'+result;
      }
    });

    let workI64Divide: WorkI64 = new WorkI64()
    workI64Divide.num1 = 1500;
    workI64Divide.num2 = 1500;
    workI64Divide.op = Operation.DIVIDE;
    client.calculateI64(1, workI64Divide, (result: ESObject) => {
      if (result) {
        that.i64divide ='I64 DIVIDE:'+result;
      }
    });
  }
}