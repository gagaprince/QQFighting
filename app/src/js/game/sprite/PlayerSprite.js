/***
 * 玩家单个精灵 动画版
 * @type {void|*}
 */

var common = require('../util/common.js');
var PlayerDrawSprite = require('./PlayerDrawSprite.js');
var PlayerSprite = qc.Sprite.extend({
    playerDraw:null,
    speed:0,
    weight:0,

    init:function(color,title,weight){
        this.weight = weight;
        this.playerDraw = PlayerDrawSprite.create(color,title,common.transformWeightToR(weight));
        this.initSprite();
    },
    initSprite:function(){
        this.addChild(this.playerDraw);
    }
});
PlayerSprite.create = function(color,title,weight){
    var sprite = new PlayerSprite();
    sprite.init(color,title,weight);
    return sprite;
}
module.exports = PlayerSprite;