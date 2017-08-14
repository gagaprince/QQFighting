/***
 * 尖刺精灵 动画版
 * @type {void|*}
 */

var SpineDrawSprite = require('./SpineDrawSprite.js');
var common = require('../util/common.js');
var SpineSprite = qc.Sprite.extend({
    spineDraw:null,
    weight:0,
    init:function(r){
        this.spineDraw = SpineDrawSprite.create(r);
        this.spineDraw.setScale(0.7);
        this.initSprite();
    },
    initWithWeight:function(weight){
        this.weight = weight;
        this.init(common.transformWeightToR(weight));
    },
    initSprite:function(){
        //动画展开尖刺

        var rotateTo = qc.ScaleTo.create(0.3,1);
        this.spineDraw.runAction(rotateTo);

        this.addChild(this.spineDraw);
    }
});
SpineSprite.createWithWeight = function(weight){
    var sprite = new SpineSprite();
    sprite.initWithWeight(weight);
    return sprite;
}
SpineSprite.create = function(r){
    var sprite = new SpineSprite();
    sprite.init(r);
    return sprite;
}
module.exports = SpineSprite;