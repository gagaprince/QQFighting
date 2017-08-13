var res = require('../resource.js').res;
var SpineSprite = require('../sprite/SpineSprite.js');
var RiceSprite = require('../sprite/RiceSprite.js');
var PlayerSprite = require('../sprite/PlayerSprite.js');
var GameLayer = qc.Layer.extend({
    bgSprit:null,

    winSize:null,

    init:function(){
        this.winSize = qc.director.getWinSize();
        this.initBg();
        this.initSpine();
        this.initRices();
        this.initPlayer();
        this.initListener();
    },
    initBg:function() {
        var winSize = this.winSize;
    },
    initSpine:function(){
        var spine = SpineSprite.create(50);
        console.log(this.winSize);
        spine.setPosition(this.winSize.width/2,this.winSize.height/2);
        this.addChild(spine);
    },
    initRices:function(){
        var width = this.winSize.width;
        var height = this.winSize.height;
        var num = 100;
        for(var i=0;i<num;i++){
            var x = Math.floor(Math.random()*width);
            var y = Math.floor(Math.random()*height);
            var pos = qc.p(x,y);
            this._initRice(pos);
        }
    },
    _initRice:function(pos){
        var rice = RiceSprite.create();
        rice.setPosition(pos);
        this.addChild(rice);
    },
    initPlayer:function(){
        var player = PlayerSprite.create("#f23edd","吃货火柴棍",10000);
        player.setPosition(qc.p(100,100));
        this.addChild(player);

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
    },
    //如果需要阻止冒泡 则 使用stopPropagation
    onTouchBegan:function(touch,event){
        if(this.hasWin)return;
        var touchLocation = touch.getLocation();
        var panLayer = this.panLayer;
        var indexP = panLayer.checkPan(touchLocation);
        if(indexP!=null){
            this.clickNum ++;
            panLayer.clickIndexP(indexP);
        }
        this.checkGame();
    },
    onTouchMoved:function(touch,event){

    },
    onTouchEnded:function(touch,event){

    }
});
var GameScene = qc.Scene.extend({
    onEnter:function(){
        this._super();
        var gameLayer = new GameLayer();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

module.exports = GameScene;