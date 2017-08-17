/**
 * 单个玩家的球球
 * @type {void|*}
 */

var PlayerSprite = require('./PlayerSprite.js');
var EventMagager = require('../event/EventManager.js');
var em = EventMagager.em;
var Event = em.GEvent;
var PlayerGroupSprite = qc.Sprite.extend({
    map:null,
    playerMsg:null,
    players:null,
    color:null,
    title:"",
    weight:1000,
    isSelf:false,
    init:function(playerMsg,map){
        this.map = map;//地图信息
        this.playerMsg = playerMsg;
        this.color = playerMsg.color;
        this.title = playerMsg.title;
        this.weight = playerMsg.weight;
        this.reSetPlayer(playerMsg.items);
    },
    listenEventMsg:function(){
        var _this = this;
        this.isSelf = true;//是当前玩家对象
        em.addEventListener(Event.EventName.PLAYER_EVENT,function(event){
            var data = event.getData();
            //这个地方可以向服务器端发送事件

            //暂时先直接处理事件
            _this.execute(data);
        });
        this.sendCurrentPosMsg(true);
    },
    execute:function(order){
        var players = this.players;
        for(var i=0;i<players.length;i++){
            var player = players[i];
            player.execute(order);
        }

    },
    getPlayers:function(){
        return this.players;
    },
    reSetPlayer:function(players){
        this.players = [];
        this.removeAllChildren();
        for(var i=0;i<players.length;i++){
            var player = players[i];
            var weight = player.weight;
            var posData = player.pos;
            var pos = qc.p(posData.x,posData.y);
            var playerInit = PlayerSprite.create(this.color,this.title,weight,this.map);
            playerInit.setPosition(pos);
            this.players.push(playerInit);
        }

    },
    crashCheckWithRice:function(riceLayer){
        var players = this.players;
        for(var i=0;i<players.length;i++){
            var player = players[i];
            player.crashCheckWithRice(riceLayer);
        }
        this.refreshWeight();
        if(this.isSelf){
            this.sendCurrentPosMsg();
        }
    },
    sendCurrentPosMsg:function(noAction){
        var pos = this.players[0].getPosition();
        var maxR = 30;
        var nowR = this.players[0].getR();
        var scale = 1;
        if(nowR>maxR){
            scale = maxR/nowR;
        }
        var event = new Event(Event.EventName.COORDINATE_EVENT);
        event.setData({
            pos:pos,
            scale:scale,
            noAction:noAction
        });
        em.postMsg(event);
    },
    refreshWeight:function(){
        //更新总重量
    }
});

PlayerGroupSprite.create = function(playerMsg,map){
    var sprite = new PlayerGroupSprite();
    sprite.init(playerMsg,map);
    return sprite;
}

module.exports = PlayerGroupSprite;