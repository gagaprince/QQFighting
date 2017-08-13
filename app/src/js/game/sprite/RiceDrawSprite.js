/***
 * 米粒精灵 绘图版
 * @type {void|*}
 */
var RiceDrawSprite = qc.Sprite.extend({
    color:0,
    num:0,
    init:function(color,num){
        this.color = color;
        this.num = num;
        this.initSprite();
    },
    draw : function (ctx) {
        var _t = this;
        var context = ctx || qc._renderContext;
        this.drawPolygon(context,this.color,this.num);
    },
    drawPolygon:function(context,color,num){
        var r = 6;
        var ds = Math.PI*2/num;
        context.save();
        context.fillStyle=color;
        context.beginPath();
        context.moveTo(0,r);
        for(var i=0;i<num;i++){
            //偶数的时候内圈找点 奇数时外圈找点
            var x= 0,y= 0,d=i*ds;
            x = r*Math.sin(d);
            y = r*Math.cos(d);
            context.lineTo(x,y);
        }
        context.closePath();
        context.fill();
        context.restore();
    },
    initSprite:function(r){

    }
});
RiceDrawSprite.create = function(color,num){
    var sprite = new RiceDrawSprite();
    sprite.init(color,num);
    return sprite;
}
module.exports = RiceDrawSprite;