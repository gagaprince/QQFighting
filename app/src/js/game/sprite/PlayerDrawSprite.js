/***
 * 玩家精灵 绘图版
 * @type {void|*}
 */
var PlayerDrawSprite = qc.Sprite.extend({
    color:0,
    title:"",
    r:0,
    init:function(color,title,r){
        this.color = color;
        this.title = title;
        this.r = r;
        this.initSprite();
        console.log(color);
    },
    changeR:function(r){
        this.r = r;
    },
    draw : function (ctx) {
        var _t = this;
        var context = ctx || qc._renderContext;
        this.drawPlayer(context,this.color,this.r);
        this.drawTitle(context,this.title,this.r);
    },
    drawPlayer:function(context,color,r){
        context.save();
        context.fillStyle=color;
        context.beginPath();
        context.arc(0,0,r,0,2*Math.PI);
        context.fill();
        context.restore();
    },
    drawTitle:function(context,title,r){
        var fontSize = r/2;
        context.save();
        context.textAlign = "center";
        context.font = fontSize+"px Courier New";
        context.fillStyle="#ffffff";
        context.fillText(title,0,0);
        context.restore();
    },
    initSprite:function(r){

    }
});
PlayerDrawSprite.create = function(color,title,r){
    var sprite = new PlayerDrawSprite();
    sprite.init(color,title,r);
    return sprite;
}
module.exports = PlayerDrawSprite;