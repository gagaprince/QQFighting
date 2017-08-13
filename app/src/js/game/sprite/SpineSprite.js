/***
 * 尖刺精灵 动画版
 * @type {void|*}
 */

var SpineDrawSprite = require('./SpineDrawSprite.js');
var SpineSprite = qc.Sprite.extend({
    spineDraw:null,
    init:function(r){
        this.spineDraw = SpineDrawSprite.create(r);
        this.spineDraw.setScale(0.7);
        this.initSprite();
    },
    initSprite:function(){
        //动画展开尖刺

        var rotateTo = qc.ScaleTo.create(0.3,1);
        this.spineDraw.runAction(rotateTo);

        this.addChild(this.spineDraw);
    }
});
SpineSprite.create = function(r){
    var sprite = new SpineSprite();
    sprite.init(r);
    return sprite;
}
module.exports = SpineSprite;