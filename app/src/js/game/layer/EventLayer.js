/**
 * 事件图层
 * @type {void|*}
 */

var res = require('../resource.js').res;
var EventMagager = require('../event/EventManager.js');
var em = EventMagager.em;
var Event = em.GEvent;

var EventLayer = qc.Layer.extend({
    penSprite:null,
    fenSprite:null,
    winSize:null,
    init:function(){
        this.winSize = qc.director.getWinSize();
        this.initBtn();
        this.initListener();
    },
    initBtn:function(){
        this.penSprite = qc.Sprite.create(res.pen);
        this.fenSprite = qc.Sprite.create(res.fen);

        var w = this.winSize.width;
        var h = this.winSize.height;


        this.penSprite.setPosition(w-130,60);
        this.fenSprite.setPosition(w-50,60);
        this.penSprite.setScale(1.5);
        this.fenSprite.setScale(1.5);

        this.addChild(this.penSprite);
        this.addChild(this.fenSprite);
    },
    initListener:function(){
        var _t = this;
        qc.EventManager.addListener({
            event: qc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(_t),
            onTouchMoved: this.onTouchMoved.bind(_t),
            onTouchEnded: this.onTouchEnded.bind(_t)
        },this);
        this.testKeyEvent();
    },
    testKeyEvent:function(){
        console.log("testKeyEvent");
        var _this = this;
        document.onkeydown = function(event){
            var msg = {};
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e){
                switch (e.keyCode){
                    case 87:
                        msg["type"]="move";
                        msg["rotation"]=Math.PI/2;
                        break;
                    case 83:
                        msg["type"]="move";
                        msg["rotation"]=-Math.PI/2;
                        break;
                    case 65:
                        msg["type"]="move";
                        msg["rotation"]=-Math.PI;
                        break;
                    case 68:
                        msg["type"]="move";
                        msg["rotation"]=0;
                        break;
                }
            }
            msg["speed"]=1;
            _this.sendMsg(msg);
        }
    },
    sendMsg:function(msg){
        if(msg.type){
            var event = new Event(Event.EventName.PLAYER_EVENT);
            event.setData(msg);
            em.postMsg(event);
        }
    },
    //如果需要阻止冒泡 则 使用stopPropagation
    onTouchBegan:function(touch,event){
        var touchLocation = touch.getLocation();
        console.log(touchLocation);
    },
    onTouchMoved:function(touch,event){

    },
    onTouchEnded:function(touch,event){

    }
});


EventLayer.create = function(){
    var layer = new EventLayer();
    layer.init();
    return layer;
}
module.exports = EventLayer;