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
    _moving:null,
    mapW:0,

    init:function(color,title,weight,map){
        this.mapW = map.w;
        this.weight = weight;
        this.playerDraw = PlayerDrawSprite.create(color,title,common.transformWeightToR(weight));
        this.initSprite();
    },
    initSprite:function(){
        this.addChild(this.playerDraw);
    },
    execute: function (order) {
        var type = order.type;
        switch (type){
            case "move":
                this.beginMove(order);
                break;
        }
    },
    beginMove:function(order){
        var _this = this;
        if(this._moving){
            this.stopMove();
        }
        this._moving = setInterval(function(){
            _this.move(order);
        },10);
    },
    stopMove:function(){
        clearInterval(this._moving);
        this._moving = null;
    },
    getNowSpeed:function(){
        var weight = this.weight;
        this.speed = 10000/this.weight;
        return this.speed;
    },
    move:function(order){
        var speedBL = order.speed;
        var rotation = order.rotation;
        var maxSpeed = this.getNowSpeed();
        var speed = maxSpeed*speedBL;
        var speedX = speed*Math.cos(rotation);
        var speedY = speed*Math.sin(rotation);

        var currentPos = this.getPosition();
        var newX = currentPos.x+speedX;
        var newY = currentPos.y+speedY;
        if(newX>this.mapW){
            newX = this.mapW;
        }
        if(newY>this.mapW){
            newY = this.mapW;
        }
        if(newX<0){
            newX = 0;
        }
        if(newY<0){
            newY = 0;
        }
        this.setPosition(newX,newY);
    },
    _giveMeTheRect:function(){
        var pos = this.getPosition();
        var R = this.playerDraw.r;
        var l = Math.floor(pos.x-R);
        var r = Math.floor(pos.x+R);
        var b = Math.floor(pos.y-R);
        var u = Math.floor(pos.y+R);
        return {
            l:l,
            r:r,
            b:b,
            u:u
        }
    },
    addWeight:function(weight){
        console.log(weight);
        this.weight+=weight;
        this.playerDraw.changeR(common.transformWeightToR(this.weight));
    },
    crashCheckWithRice:function(riceLayer){
        var rect = this._giveMeTheRect();
        var r = this.playerDraw.r;
        var pos = this.getPosition();
        for(var i=rect.l;i<=rect.r;i++){
            for(var j=rect.b;j<=rect.u;j++){
                var riceArray = riceLayer.getRiceArrayByXY(i,j);
                for(var n=0;n<riceArray.length;n++){
                    var rice = riceArray[n];
                    var dis = common.distanse(rice.getPosition(),pos);
                    if(dis<=r){
                        //碰撞 被吃掉
                        //加体重
                        this.addWeight(rice.weight);
                        riceLayer.removeFromRiceMap(rice);
                        n--;
                    }
                }
            }
        }
    },
    getR:function(){
        return this.playerDraw.r;
    }
});
PlayerSprite.create = function(color,title,weight,map){
    var sprite = new PlayerSprite();
    sprite.init(color,title,weight,map);
    return sprite;
}
module.exports = PlayerSprite;