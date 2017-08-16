/**
 * 单个玩家的球球
 * @type {void|*}
 */

var PlayerSprite = require('./PlayerSprite.js');
var EventMagager = require('../event/EventManager.js');
var em = EventMagager.em;
var Event = em.GEvent;
var PlayerGroupSprite = qc.Sprite.extend({
    playerMsg:null,
    players:null,
    color:null,
    title:"",
    weight:1000,
    init:function(playerMsg){
        this.playerMsg = playerMsg;
        this.color = playerMsg.color;
        this.title = playerMsg.title;
        this.weight = playerMsg.weight;
        this.reSetPlayer(playerMsg.items);
    },
    listenEventMsg:function(){
        var _this = this;
        em.addEventListener(Event.EventName.PLAYER_EVENT,function(event){
            var data = event.getData();
            //这个地方可以向服务器端发送事件

            //暂时先直接处理事件
            _this.execute(data);
        });
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
            var playerInit = PlayerSprite.create(this.color,this.title,weight);
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
    },
    refreshWeight:function(){
        //更新总重量
    }
});

PlayerGroupSprite.create = function(playerMsg){
    var sprite = new PlayerGroupSprite();
    sprite.init(playerMsg);
    return sprite;
}

module.exports = PlayerGroupSprite;