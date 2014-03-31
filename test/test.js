/**
 * Created by yuanlong.qyl on 14-3-28.
 */

var io = require('socket.io');
io.connect('localhost:3000');
io.on('connect',function(data){
    console.log(data);
});