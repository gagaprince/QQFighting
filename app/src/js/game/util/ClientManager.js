var EventMagager = require('../event/EventManager.js');
var em = EventMagager.em;
var Event = em.GEvent;
var ClientMsgFactory = require('./ClientMsgFactory.js');
var ClientManager = {
    strategys:{},
    beginGame:function(){
        //与服务器建立连接
        var playerInfo = ClientMsgFactory.createPlayerInfo();
        playerInfo.type = "login";
        this.sendMsg(playerInfo);
    },
    receiveMsg:function(){
        //接收客户机的消息 并做处理转发
        var _this = this;
        em.addEventListener(Event.EventName.EVENT_FROM_SERVER,function(e){
            //模拟异步
            setTimeout(function(){
                var data = e.getData();
                _this.dispatch();
            });

        });
    },
    sendMsg:function(data){
        var event = new Event();
        event.setData(data);
        //给所有player发送消息
        //此处只需要调用em将消息广播出去就行
        event.setName(em.GEvent.EventName.EVENT_FROM_CLIENT);
        em.postMsg(event);
    },
    addStrategy:function(type,callback){
        this.strategys[type] = callback;
    },
    dispatch:function(data){
        var type = data.type;
        var strategy = this.strategys[type];
        strategy(data);
    }
}
module.exports = ClientManager;