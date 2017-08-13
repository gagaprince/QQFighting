/***
 * 尖刺精灵 绘图版
 * @type {void|*}
 */
var SpineDrawSprite = qc.Sprite.extend({
    r:0,
    init:function(r){
        this.r = r;
        this.initSprite();
    },
    draw : function (ctx) {
        var _t = this;
        var context = ctx || qc._renderContext;
        //this.drawCircle(context,this.r);
        this.drawArrow(context,this.r);
    },
    drawCircle:function(context,r){
        context.save();
        context.fillStyle="#86d23e";
        context.beginPath();
        context.arc(0, 0, this.r, 0, 2*Math.PI);
        context.fill();
        context.restore();
    },
    drawArrow:function(context,r){
        var num = 80;
        var ds = Math.PI*2/num;
        var R = r*1.2;
        context.save();
        context.fillStyle="#86d23e";
        context.beginPath();
        context.moveTo(0,r);
        for(var i=0;i<num;i++){
            //偶数的时候内圈找点 奇数时外圈找点
            var x= 0,y= 0,d=i*ds;
            var dr = R;
            if(i%2==0){
                dr = r;
            }
            x = dr*Math.sin(d);
            y = dr*Math.cos(d);
            context.lineTo(x,y);
        }
        context.closePath();
        context.fill();
        context.restore();
    },
    initSprite:function(r){

    }
});
SpineDrawSprite.create = function(r){
    var sprite = new SpineDrawSprite();
    sprite.init(r);
    return sprite;
}
module.exports = SpineDrawSprite;