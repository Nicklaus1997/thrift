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
import {WorkSet, WorkMap, WorkList, Operation
} from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';

@Entry
@Component
struct Collections {
  @State mapSize: string = 'MAP SIZE:'
  @State listSize: string = 'LIST SIZE:'
  @State setSize: string = 'SET SIZE:'

  build() {
    Row() {
      Column() {
        Text(this.mapSize)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)

        Text(this.listSize)
          .width('100%')
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .backgroundColor(0xFFFFFF)
          .margin({
            top: 10
          })

        Text(this.setSize)
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
          .onClick((event)=>{
              this.onButtonClick()
          })

      }
      .width('100%')
    }
    .height('100%')
  }
  onBackPress(){
  }
  async onButtonClick(){
    let transport: ESObject = new Thrift.Transport("http://" + GlobalContext.getContext().getValue("ipAddress").toString());
    let protocol: ESObject = new Thrift.Protocol(transport);
    let client: CalculatorClient = new CalculatorClient(protocol,null);
    let that: ESObject = this;

    let workMap: WorkMap = new WorkMap()
    workMap.mapValue = {
      'hello': 'world', 'OpenHarmony': 'thrift'
    };
    workMap.op = Operation.MAP_SIZE;
    client.getMapSize(1, workMap, (result: ESObject) => {
      if (result) {
        that.mapSize = 'MAP SIZE:'+result;
      }
    });
    let workSet: WorkSet = new WorkSet()
    workSet.setValue = ['hello', 'world'];
    workSet.op = Operation.SET_SIZE;
    client.getSetSize(1, workSet, (result: ESObject) => {
      if (result) {
        that.setSize = 'LIST SIZE:'+result;
      }
    });
    let workList: WorkList = new WorkList()
    workList.listValue = ['hello', 'world'];
    workList.op = Operation.LIST_SIZE;
    client.getListSize(1, workList, (result: ESObject) => {
      if (result) {
        that.listSize = 'SET SIZE:'+result;
      }
    });
  }
}
