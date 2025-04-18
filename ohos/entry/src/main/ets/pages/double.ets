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
import {WorkDouble, Operation
} from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';

@Entry
@Component
struct Double {
  @State doubleAdd: string = 'DOUBLE ADD:'
  @State doubleSubtrack: string = 'DOUBLE SUBTRACK:'
  @State doubleMultiply: string = 'DOUBLE MULTIPLY:'
  @State doubleDivide: string = 'DOUBLE DIVIDE:'

  build() {
    Row() {
      Column() {
        Text(this.doubleAdd)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)

        Text(this.doubleSubtrack)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.doubleMultiply)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.doubleDivide)
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

  onBackPress(){
  }

  onButtonClick() {
    let transport: ESObject = new Thrift.Transport("http://" + GlobalContext.getContext().getValue("ipAddress").toString());
    let protocol: ESObject = new Thrift.Protocol(transport);
    let client: CalculatorClient = new CalculatorClient(protocol);

    let that: ESObject = this;

    let workDoubleAdd: WorkDouble = new WorkDouble()
    workDoubleAdd.num1 = 1.07;
    workDoubleAdd.num2 = 5.93;
    workDoubleAdd.op = Operation.ADD;
    client.calculateDouble(1, workDoubleAdd, (result: ESObject) => {
      if (result) {
        that.doubleAdd = 'DOUBLE ADD:'+result;
      }
    });

    let workDoubleSubtract: WorkDouble = new WorkDouble()
    workDoubleSubtract.num1 = 10.07;
    workDoubleSubtract.num2 = 5.93;
    workDoubleSubtract.op = Operation.SUBTRACT;
    client.calculateDouble(1, workDoubleSubtract, (result: ESObject) => {
      if (result) {
        that.doubleSubtrack = 'DOUBLE SUBTRACK:'+result;
      }
    });

    let workDoubleMultiply: WorkDouble = new WorkDouble()
    workDoubleMultiply.num1 = 1.07;
    workDoubleMultiply.num2 = 5.93;
    workDoubleMultiply.op = Operation.MULTIPLY;
    client.calculateDouble(1, workDoubleMultiply, (result: ESObject) => {
      if (result) {
        that.doubleMultiply = 'DOUBLE MULTIPLY:'+result;
      }
    });

    let workDoubleDivide: WorkDouble = new WorkDouble()
    workDoubleDivide.num1 = 5.00;
    workDoubleDivide.num2 = 5.00;
    workDoubleDivide.op = Operation.DIVIDE;
    client.calculateDouble(1, workDoubleDivide, (result: ESObject) => {
      if (result) {
        that.doubleDivide = 'DOUBLE DIVIDE:'+result;
      }
    });
  }
}
