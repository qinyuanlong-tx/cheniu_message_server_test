/**
 * Created by yuanlong.qyl on 14-3-28.
 */

var uuid = require('node-uuid');

function MessageVo(){
//    this.messageId = '';
    this.messageType = ''; //identity,get_token,chat,deliver_push,mark_status,confirm
    this.sender = '';
    this.receiver = ''; //多人则用逗号隔开
    this.content = {};
    this.timestamp = '';
}

exports.create =  function(type){
    var msg = new MessageVo;
//    msg.messageId = uuid.v4();
    msg.messageType = type;
    return new MessageVo();
};

exports.createConfirm = function(){
    var msg = MessageVo.create('confirm');
    msg.timestamp =  new Date().getTime();
};

exports.createCommOK = function(type,sender,timestamp){
    var msg = new MessageVo();
    msg.messageType = type;
    msg.sender = sender;
    msg.timestamp = timestamp;
};

