/**
 * Created by yuanlong.qyl on 14-3-28.
 */

var sio = require('socket.io');
var service = require('../service/message_service').getMessageService();

function connector(){
    this.clients = [];
};

connector.create = function(){
    return new connector();
};

connector.prototype.initialize = function(httpServer){
    console.log('system initialize ... ');
    var io = sio.listen(httpServer);
    httpServer.listen(3000);

    io.sockets.on('connection',function(socket){

        socket.on('cheniuMessage',function(data){
            console.log(data);
            service.messageHandler(socket,data);
        });

        socket.on('disconnect',function(data){
            console.log('disconnect');
        });

    });

};

module.exports = connector;