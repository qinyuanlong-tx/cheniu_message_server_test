/**
 * Created by yuanlong.qyl on 14-3-31.
 */

var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = 'wa963iichB9ScRct88LBoYvepgtsyOnriMZ_gaHG';
qiniu.conf.SECRET_KEY = 'aNdlWchNBA1k70hFzBddPoJ32s5_irwDhPbbCEzh';

var token = uptoken('cheniu-test');
uploadFile('e:/123.jpg','img/mytest.jgp',token);

function uptoken(bucketname) {
    var putPolicy = new qiniu.rs.PutPolicy(bucketname);
    //putPolicy.callbackUrl = callbackUrl;
    //putPolicy.callbackBody = callbackBody;
    //putPolicy.returnUrl = returnUrl;
    //putPolicy.returnBody = returnBody;
    //putpolicy.persistentOps = persistentops;
    //putPolicy.persistentNotifyUrl = persistentNotifyUrl;
    //putPolicy.expires = expires;

    return putPolicy.token();
}

function uploadFile(localFile, key, uptoken) {
    var extra = new qiniu.io.PutExtra();
    //extra.params = params;
    //extra.mimeType = mimeType;
    //extra.crc32 = crc32;
    //extra.checkCrc = checkCrc;

    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log('key and hash');
            console.log(ret.key, ret.hash);
            // ret.key & ret.hash
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
            // http://docs.qiniu.com/api/put.html#error-code
        }
    });
}