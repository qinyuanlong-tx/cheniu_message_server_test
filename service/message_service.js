/**
 * Created by yuanlong.qyl on 14-3-28.
 */

function service(){
    this.clients = {};
};

var serviceInstance = new service();

service.getMessageService = function(){
    return serviceInstance;
};

//消息处理入口
service.prototype.messageHandler = function(socket,data){
    var messageName = data.messageName;
    if(messageName == 'identity'){
        this.clients['user' + data.uid] = socket;
    }
    console.log(data);
    switch(data.messageName){
        case 'identity':
            this.identity(socket,data);
            break;
        case 'chat':
            this.chat(data);
            break;
        case 'getUnreadMessage':
            break;
        default :
            break;
    }
};

//身份id关联
service.prototype.identity = function(socket,data){
    this.clients['user_' + data.uid] = socket;
    socket.on('chat',this.chat);
};

//聊天消息处理
service.prototype.chat = function(data){
    var chatTo = this.clients['user_' + data.uid];
    if(chatTo == 'undefined'){
        //直接写入数据库
    }else{
        chatTo.emit('onChat',data);
    }
};

//TODO:授权给客户端上传图片
//TODO:图片消息怎么传 messagetype
//TODO:确认消息收到 ack?
//TODO:确认消息已读
//TODO:广播发车消息
//TODO:消息推送

module.exports = service;