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
        this.players = [];
        this.initPlayer();
    },
    initPlayer:function(){
        var playerInit = PlayerSprite.create(this.color,this.title,this.weight);
        this.players.push(playerInit);
        this.addChild(playerInit);
    }
});

PlayerGroupSprite.create = function(playerMsg){
    var sprite = new PlayerGroupSprite();
    sprite.init(playerMsg);
    return sprite;
}

module.exports = PlayerGroupSprite;