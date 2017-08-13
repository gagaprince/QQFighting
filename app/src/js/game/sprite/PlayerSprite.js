/***
 * 玩家单个精灵 动画版
 * @type {void|*}
 */

var midu = 10;
var PlayerDrawSprite = require('./PlayerDrawSprite.js');
var PlayerSprite = qc.Sprite.extend({
    playerDraw:null,
    speed:0,
    weight:0,

    init:function(color,title,weight){
        this.weight = weight;
        this.playerDraw = PlayerDrawSprite.create(color,title,this.transformWeightToR(weight));
        this.initSprite();
    },
    initSprite:function(){
        this.addChild(this.playerDraw);
    },
    transformWeightToR:function(weight){
        var c = weight/midu;
        var r = Math.sqrt(c/Math.PI);
        return r;
    }
});
PlayerSprite.create = function(color,title,weight){
    var sprite = new PlayerSprite();
    sprite.init(color,title,weight);
    return sprite;
}
module.exports = PlayerSprite;