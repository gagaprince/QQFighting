var res = require('../resource.js').res;
var EventLayer = require('../layer/EventLayer.js');
var RiceLayer = require('../layer/RiceLayer.js');
var PlayerLayer = require('../layer/PlayerLayer.js');
var SpineSprite = require('../sprite/SpineSprite.js');

var PlayerSprite = require('../sprite/PlayerSprite.js');
var GameLayer = qc.Layer.extend({
    bgSprit:null,

    winSize:null,
    riceLayer:null,
    playerLayer:null,
    eventLayer:null,

    init:function(){
        this.winSize = qc.director.getWinSize();
        this.initRiceLayer();
        this.initPlayerLayer();
        this.initSpine();
        this.initPlayer();
        this.initEventLayer();
    },
    initRiceLayer:function() {
        this.riceLayer = RiceLayer.create(2000);
        this.addChild(this.riceLayer);
    },
    initPlayerLayer:function(){
        this.playerLayer = PlayerLayer.create([],"sss");
        this.addChild(PlayerLayer);
    },
    initSpine:function(){
        var spine = SpineSprite.create(50);
        console.log(this.winSize);
        spine.setPosition(this.winSize.width/2,this.winSize.height/2);
        this.addChild(spine);
    },

    initPlayer:function(){
        var player = PlayerSprite.create("#f23edd","吃货火柴棍",10000);
        player.setPosition(qc.p(100,100));
        this.addChild(player);

    },
    initEventLayer:function(){
        this.eventLayer = EventLayer.create();
        this.addChild(this.eventLayer);
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