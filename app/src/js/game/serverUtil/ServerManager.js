//模拟server行为
var EventMagager = require('../event/EventManager.js');
var em = EventMagager.em;
var serverManager = {
    bigData:null,
    map:{
        w:1000,
        h:1000
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
    },
    addPlayer:function(playerInfo){
        //加入玩家
        var bigData = this.bigData;
        var players = bigData["players"];
        players.push({
            title:playerInfo.title,
            color:playerInfo.color,
            weight:playerInfo.weight,
            items:[
                {
                    weight:playerInfo.weight,
                    pos:this._randomPos()
                }
            ]
        });
    },
    receiveMsg:function(){
        //接收客户机的消息 并做处理转发
        var _this = this;
        em.addEventListener(em.GEvent.EventName.EVENT_FROM_CLIENT,function(e){
            e.setName(em.GEvent.EventName.EVENT_FROM_SERVER);
            _this.sendMsg(e);
        });
    },
    sendMsg:function(event){
        //给所有player发送消息
        //此处只需要调用em将消息广播出去就行
        em.postMsg(event);
    },
    _randomPos:function(){
        var w = this.map.w;
        var h = this.map.h;
        var x = Math.floor(Math.random()*w);
        var y = Math.floor(Math.random()*h);
        return {x:x,y:y};
    }
};
module.exports = serverManager;