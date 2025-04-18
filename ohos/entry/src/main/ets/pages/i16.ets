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
import {WorkI16, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';

@Entry
@Component
struct I16 {
  @State i16add: string = 'I16 ADD:'
  @State i16subtract: string = 'I16 SUBTRACK:'
  @State i16multiply: string = 'I16 MULTIPLY:'
  @State i16divide: string = 'I16 DIVIDE:'

  build() {
    Row() {
      Column() {
        Text(this.i16add)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)

        Text(this.i16subtract)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.i16multiply)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.i16divide)
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

    let workI16Add: WorkI16 = new WorkI16()
    workI16Add.num1 = 10;
    workI16Add.num2 = 15;
    workI16Add.op = Operation.ADD;
    client.calculateI16(1, workI16Add, (result: ESObject) => {
      if (result) {
        that.i16add = 'I16 ADD:' + result;
      }
    });

    let workI16Subtract: WorkI16 = new WorkI16()
    workI16Subtract.num1 = 10;
    workI16Subtract.num2 = 15;
    workI16Subtract.op = Operation.SUBTRACT;
    client.calculateI16(1, workI16Subtract, (result: ESObject) => {
      if (result) {
        that.i16subtract = 'I16 SUBTRACK:' + result;
      }
    });

    let workI16Multiply: WorkI16 = new WorkI16()
    workI16Multiply.num1 = 15;
    workI16Multiply.num2 = 15;
    workI16Multiply.op = Operation.MULTIPLY;
    client.calculateI16(1, workI16Multiply, (result: ESObject) => {
      if (result) {
        that.i16multiply = 'I16 MULTIPLY:' + result;
      }
    });

    let workI16Divide: WorkI16 = new WorkI16()
    workI16Divide.num1 = 15;
    workI16Divide.num2 = 15;
    workI16Divide.op = Operation.DIVIDE;
    client.calculateI16(1, workI16Divide, (result: ESObject) => {
      if (result) {
        that.i16divide = 'I16 DIVIDE:' + result;
      }
    });
  }
}