//模拟server行为
var EventMagager = require('../event/EventManager.js');
var em = EventMagager.em;
var Event = em.GEvent;
var serverManager = {
    bigData:null,
    map:{
        w:900,
        h:500
    },
    strategys:{},
    addStrategy:function(type , callback){
        this.strategys[type]=callback;
    },
    beginGame:function(){
        //初始化游戏数据
        //主要初始化尖刺
        var bigData = this.bigData = {
            map:this.map,
            players:[],
            spines:[],
            bills:[]
        };
        this.receiveMsg();
    },
    addPlayer:function(playerInfo){
        //加入玩家
        var bigData = this.bigData;
        var players = bigData["players"];
        players.push({
            title:playerInfo.title,
            color:playerInfo.color,
            weight:playerInfo.weight||10000,
            items:[
                {
                    weight:playerInfo.weight||10000,
                    pos:this._randomPos()
                }
            ]
        });
    },
    checkPlayerIn: function (title) {
        var bigData = this.bigData;
        var players = bigData["players"];
        for(var i=0;i<players.length;i++){
            var player = players[i];
            if(player["title"]==title){
                return true;
            }
        }
        return false;
    },
    receiveMsg:function(){
        //接收客户机的消息 并做处理转发
        var _this = this;
        em.addEventListener(em.GEvent.EventName.EVENT_FROM_CLIENT,function(e){
            setTimeout(function(){
                _this.dispatch(e);
            });
        });
    },
    sendMsg:function(event){
        //给所有player发送消息
        //此处只需要调用em将消息广播出去就行
        em.postMsg(event);
    },
    dispatch:function(e){
        var data = e.getData();
        console.log("serverManager dispatch");
        var type = data.type;
        var callback = this.strategys[type];
        if(callback){
            callback(data);
        }else{
            e.setName(em.GEvent.EventName.EVENT_FROM_SERVER);
            this.sendMsg(e);
        }

    },
    _randomPos:function(){
        var w = this.map.w;
        var h = this.map.h;
        var x = Math.floor(Math.random()*w);
        var y = Math.floor(Math.random()*h);
        return {x:x,y:y};
    }
};

serverManager.addStrategy("login",function(data){
    //登录操作
    var title = data["title"];
    if(!serverManager.checkPlayerIn(title)){
        serverManager.addPlayer(data);
    }
    var data = {
        type:"login",
        bigData:serverManager.bigData
    }
    var event = new Event(Event.EventName.EVENT_FROM_SERVER);
    event.setData(data);
    serverManager.sendMsg(event);
});

module.exports = serverManager;