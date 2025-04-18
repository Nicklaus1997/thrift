# thrift

## 简介
 Thrift是一个轻量级的、独立于语言的软件栈，用于点到点RPC实现。Thrift为数据传输、数据序列化和应用程序级处理提供了清晰的抽象和实现。代码生成系统使用一种简单的定义语言作为输入并生成跨编程语言的代码，这些代码使用抽象堆栈来构建可互操作的RPC客户端和服务器。 

### 下载安装

```shell
ohpm install @ohos/thrift
```

OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

# 使用说明

Thrift 使用“.thrift” 模式文本文件来生成OpenHarmony 模型类。自定义工具用于生成OpenHarmony 的thrift文件的模型类。工具生成的文件要复制到客户端和服务器路径。生成的模型类用于开发客户端和服务器应用程序以进行gRPC调用 。客户端根据支持的协议和传输层配置请求以进行gRPC调用。

```

import {Thrift} from '@ohos/thrift';
import {CalculatorClient} from '../../common/calculator/Calculator';
import {Work, Operation} from '../../common/calculator/tutorial_types';

try {
    //Example with url and without
    let transport: ESObject = new Thrift.Transport("http://106.15.92.248:5555");
    //let transport = new Thrift.Transport();
    let protocol: ESObject = new Thrift.Protocol(transport);
    let client: CalculatorClient = new CalculatorClient(protocol);

    let that: ESObject = this;
    
    let workI8Add = new WorkI8()  //Generated Class Work can be any based on user requirement.
    workI8Add.num1 = 1;
    workI8Add.num2 = 15;
    workI8Add.op = Operation.ADD; //Operation can be any based on user requirement
    client.calculateI8(1, workI8Add, function (result) {
        if (result) {
            that.i8add = 'I8 ADD:'+result;
        }
    });
 } catch (error) {
   console.info("Thrift" + error.getMessage())
 }

```
## Thrift 编译器 

[如何安装Thrift 的详细信息，请点击此处](http://thrift.apache.org/docs/install/)

创建 .thrift 文件后，可以运行Thrift ，以便以目标语言生成代码。Thrift 命令的用法为：

```
thrift [options] file
thrift -r --gen language[java/js/py etc] filename.thrift
```

1.对于在示例应用程序中使用thrift，可以在compiler文件夹中找到编译器和工具。

2.生成的warpper工具用于在windows(powershell)和linux平台生成OpenHarmony  JS文件对应的 .thrift 文件。

### Linux 环境使用方法 

1.获取二进制文件  
方式1:找到最新的编译通过的pr，评论区中会有门禁报告链接；  
方式2:自己提一个pr，触发门禁，编译成功后的门禁报告链接；  
2.点进门禁报告，可以看到tpc_component编译通过，点击通过后，选择日志详情，展开version，下面就有一个压缩包，
这个压缩包中就有所需二进制文件**thrift.sh**；  
3.将 compiler和thrift.sh放在同一个文件夹中；  
4.使用input .thrift 文件执行thrift.sh；  
5.在JS 和OpenHarmony文件夹找到对应生成的文件。 

```
./thrift.sh  tutorial.thrift
```

### Windows环境使用方法

1.打开powershell；
2.打开PowerShell ISE ( 在 powershell提示符中执行PowerShell ISE)；
3.从下方的命令行转到 thrift.ps1和thrift compiler.exe所在的文件夹；
4.使用 input.thrift 文件运行工具；
5.在JS 和OpenHarmony文件夹找到对应生成的文件。 

```
.\thrift.ps1 eg.thrift
```

## 接口说明

**new Thrift.Transport(/* Pass Server URL */)**  // 创建传输对象

**new Thrift.TJSONProtocol(/* Pass Transport object */)** // 创建协议对象。注意TJSON协议和协议相同。

**new Thrift.TException().getMessage();** // 如果URL不存在，则获取在捕获块中跑出的错误信息。

## 关于混淆
- 代码混淆，请查看[代码混淆简介](https://docs.openharmony.cn/pages/v5.0/zh-cn/application-dev/arkts-utils/source-obfuscation.md)
- 如果希望thrift库在代码混淆过程中不会被混淆，需要在混淆规则配置文件obfuscation-rules.txt中添加相应的排除规则：
```
-keep
./oh_modules/@ohos/thrift
```

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317), OpenHarmony SDK:API11 (4.1.0.36)
- DevEco Studio: NEXT Beta1-5.0.3.806, SDK: API12 Release (5.0.0.66)

## 目录结构
````
|---- Thrift
|     |---- compiler #  Windows和Linux操作系统使用的编译器和工具
|     |---- entry # 示例代码文件夹
|     |---- server # 用于执行thrift操作的服务器代码
|     |-- library # thrift库文件夹
|     |-- README.md # 安装使用方法
|     |-- README_zh.md # 安装使用方法
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/thrift/issues)  给组件，当然，也非常欢迎发 [PR](https://gitee.com/openharmony-tpc/thrift/pulls)共建 。

## 开源协议

本项目基于  [Apache License 2.0](https://gitee.com/openharmony-tpc/thrift/blob/master/LICENSE) 协议，请自由地享受和参与开源。

