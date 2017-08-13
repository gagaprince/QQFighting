/***
 * 米粒精灵 生成版
 * @type {void|*}
 */

var RiceDrawSprite = require('./RiceDrawSprite.js');
var RiceSprite = qc.Sprite.extend({
    color:0,
    num:0,
    init:function(color,num){
        this.color = color;
        this.num = num;
        this.initSprite(color,num);
    },
    initSprite:function(color,num){
        var riceDraw = RiceDrawSprite.create(color,num);
        var randomRad = Math.random()*360;
        this.addChild(riceDraw);
        this.setRotation(randomRad);
    }
});
function giveMeRandomColor(){
    var colors = [
        '#f144d2',
        '#f42b39',
        '#cbfa59',
        '#fd623e',
        '#18f607',
        '#5af8e7',
        '#b2f8a4',
        '7','8','9','a','b','c','d','e','f'];
    var num = Math.floor(Math.random()*7);
    return colors[num];
}
RiceSprite.create = function(){
    var sprite = new RiceSprite();
    var color = giveMeRandomColor();
    var num = Math.floor(Math.random()*4)+3;
    sprite.init(color,num);
    return sprite;
}
module.exports = RiceSprite;