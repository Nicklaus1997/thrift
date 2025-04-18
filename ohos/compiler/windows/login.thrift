namespace js cn.cen.thrift

struct MyRequest{
    1: string username;
    2: string psw;
}

exception MyRequestException{
    1: required i32 code;
    2: optional string reason;
}

//服务名
service MyLoginService{
    string doLogin(1: MyRequest myRequest) throws (1:MyRequestException mrqe);//可能抛出异常
}