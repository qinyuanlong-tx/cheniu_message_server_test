/**
 * Created by yuanlong.qyl on 14-3-28.
 */

function MessageVo(){
    this.messageId = '';
    this.messageType = ''; //chat,broadcast
    this.receiver = ''; //多人则用逗号隔开
    this.contentType = ''; //text,pic,voice
    this.content = '';
    this.timeStamp = '';
}

MessageVo.create =  function(){
    return new MessageVo();
};