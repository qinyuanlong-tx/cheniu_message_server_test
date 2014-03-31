## Message Server设计 ##


### 概览 ###

+ **Connector layer :** 负责hold住websocket连接，维护所有连接的状态

+ **Service layer :** 
	* message servivce 处理聊天消息，调用db层写入数据库。若写入失败则写到redis中，提供从redis中恢复数据到cassandra的功能。
	* notice service 负责订阅消息、发布新车通知所有好友、消息推送等功能

+ **DB layer :** 通过helenus访问cassandra
### 通讯机制 ###
+ 客户端发送一条消息，收到server的确认消息才算发送完成，没收到确认消息要在超时后提示
+ server向客户端发送消息，客户端也要回复确认收到消息
+ 不在线用户，推送消息，用户阅读后客户端发送确认消息

### notice设计 ###
+ 好友发车、订阅车型等消息的推送通过redis发布
+ 需要推送的消息必须在notice service中进行注册