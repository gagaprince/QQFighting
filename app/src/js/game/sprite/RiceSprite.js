/***
 * 米粒精灵 生成版
 * @type {void|*}
 */

var RiceDrawSprite = require('./RiceDrawSprite.js');
var common = require('../util/common.js');
var RiceSprite = qc.Sprite.extend({
    color:0,
    num:0,
    weight:1000,
    init:function(color,num){
        this.color = color;
        this.num = num;
        this.initSprite(color,num);
    },
    initSprite:function(color,num){
        var riceDraw = RiceDrawSprite.create(color,num);
        //var randomRad = Math.random()*360;
        this.addChild(riceDraw);
        //this.setRotation(randomRad);
    }
});

RiceSprite.create = function(){
    var sprite = new RiceSprite();
    var color = common.giveMeRandomColor();
    var num = Math.floor(Math.random()*4)+3;
    sprite.init(color,num);
    return sprite;
}
module.exports = RiceSprite;