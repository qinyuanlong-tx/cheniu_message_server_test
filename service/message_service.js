/**
 * Created by yuanlong.qyl on 14-3-28.
 */

var qiniuService = require('./qiniu_service');
var noticeService = require('./notice_service');
var messageVo = require('/message_vo');

function service(){
    this.clients = {};
};

var serviceInstance = new service();

service.getMessageService = function(){
    return serviceInstance;
};

//消息处理入口
service.prototype.messageHandler = function(socket,data){
    var messageType = data.messageType;
    console.log(data);
    this.confirm(data);
    switch(messageType){
        case 'identity':
            this.identity(socket,data);
            break;
        case 'get_token':
            this.getToken(socket,'cheniu-test',data.sender,data.type);
            break;
        case 'chat':
            this.chat(data);
            break;
//        case 'getUnreadMessage':
//            break;
        default :
//            this.chat(data);
            break;
    }
};

//身份id关联
service.prototype.identity = function(socket,data){
    this.clients['user_' + data.sender] = socket;
    socket.emit('cheniu_message',messageVo.createCommOK(data.messageType,data.sender,data.timestamp));
};

//获取七牛token
service.prototype.getToken = function(socket,data){
    var tokenRst = qiniuService.requestToken('cheniu-test',data.sender,data.messageType);
    var rst = messageVo.createCommOK(data.messageType,data.sender,data.timestamp);
    rst.content = tokenRst;
    socket.emit('cheniu_message',rst);
};

//聊天消息处理
service.prototype.chat = function(data){
    var receivers = data.receiver.split(',');
    for(var i = 0 ; i < receivers.length ; i++){
        var chatTo = this.clients['user_' + receivers[i]];
        if(chatTo == 'undefined'){
            //直接写入数据库
        }else{
            chatTo.emit('cheniu_message',data);
        }
    }
};

//确认消息处理
service.prototype.confirm = function(socket,data){
    var rst = messageVo.createConfirm();
    rst.sender = data.sender;
    rst.timestamp = data.timestamp;
    socket.emit('confirm_msg',rst);
};

//TODO:广播发车消息
//TODO:消息推送

module.exports = service;