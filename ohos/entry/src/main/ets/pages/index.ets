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

import UrlConfig from '../UrlConfig'
import router from '@ohos.router';
import { GlobalContext } from '../GlobalContext';
import prompt from '@system.prompt';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World';
  @State ipAddress: string = '';
  private arrIndex: number[] = UrlConfig.pageIndexArr
  private arrStr: string[] = UrlConfig.pageNameArr

  build() {
    Row() {
      Column() {
          TextInput({ placeholder: 'Please input server ip address' })
            .height(50)
            .placeholderFont({ size: 20, weight: 2 })
            .fontSize(20)
            .onChange((value: string) => {
              this.ipAddress = value;
              GlobalContext.getContext().setValue("ipAddress", this.ipAddress);;
            })
          List({ space: 20, initialIndex: 0 }) {
            ForEach(this.arrIndex, (item: ESObject) => {
              ListItem() {
                Text(this.arrStr[item])
                  .width('100%')
                  .height(100)
                  .fontSize(16)
                  .textAlign(TextAlign.Center)
                  .borderRadius(10)
                  .backgroundColor(0xFFFFFF)
              }.onClick((event) => {
                if (this.ipAddress == '') {
                  prompt.showToast({ message: "Please input server ip address", duration: 3000 });
                  return
                } else {
                  routePage(item as number)
                }
              })
            }, (item: ESObject) => item)
          }.listDirection(Axis.Vertical)
          .divider({ strokeWidth: 2, color: 0xFFFFFF, startMargin: 20, endMargin: 20 })
          .edgeEffect(EdgeEffect.None)
          .chainAnimation(false)
          .width('90%')
      }
      .width('100%')
    }
    .height('100%')
  }

  onPageShow(){
  }
  onPageHide(){
  }
}

async function routePage(index:number){
  try{
    let jumpUrl = UrlConfig.getJumpUrl(index)
    let options :router.RouterOptions= {
      url :jumpUrl
    }
    await router.push(options)
  }catch(err){
  }
}
