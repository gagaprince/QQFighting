/**
 * 单个玩家的球球
 * @type {void|*}
 */

var PlayerSprite = require('./PlayerSprite.js');
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

    }
});

PlayerGroupSprite.create = function(playerMsg){
    var sprite = new PlayerGroupSprite();
    sprite.init(playerMsg);
    return sprite;
}

module.exports = PlayerGroupSprite;