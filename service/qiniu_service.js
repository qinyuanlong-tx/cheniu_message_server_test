/**
 * Created by yuanlong.qyl on 14-3-31.
 */

var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = 'wa963iichB9ScRct88LBoYvepgtsyOnriMZ_gaHG';
qiniu.conf.SECRET_KEY = 'aNdlWchNBA1k70hFzBddPoJ32s5_irwDhPbbCEzh';

function uptoken(bucketname,usrId,type) {
    var putPolicy = new qiniu.rs.PutPolicy(bucketname);
    //putPolicy.callbackUrl = callbackUrl;
    //putPolicy.callbackBody = callbackBody;
    //putPolicy.returnUrl = returnUrl;
    //putPolicy.returnBody = returnBody;
    //putpolicy.persistentOps = persistentops;
    //putPolicy.persistentNotifyUrl = persistentNotifyUrl;
    //putPolicy.expires = expires;

    var token = putPolicy.token();
    var key = usrId + '_' + type + '_' + new Date().getTime();
    var retValue = {};
    retValue.token = token;
    retValue.file = key;
    return retValue;
}

exports.requestToken = uptoken;