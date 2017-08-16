

var res = require('../resource.js').res;
var EventLayer = require('../layer/EventLayer.js');
var RiceLayer = require('../layer/RiceLayer.js');
var PlayerLayer = require('../layer/PlayerLayer.js');
var SpineSprite = require('../sprite/SpineSprite.js');
var InitData = require('../mock/InitData.js');

var PlayerSprite = require('../sprite/PlayerSprite.js');
var ClientManager = require('../util/ClientManager.js');
var ClientMsgFactory = require('../util/ClientMsgFactory.js');
var GameLayer = qc.Layer.extend({
    bgSprit:null,
    bigData:null,

    winSize:null,
    riceLayer:null,
    playerLayer:null,
    eventLayer:null,
    _crashCheckInterval:null,

    init:function(){
        this.winSize = qc.director.getWinSize();
        var _this = this;
        ClientManager.beginGame();
        ClientManager.addStrategy("login",function(data){
            console.log("login success");
            console.log(data);
            _this.bigData = data;
            _this.initRiceLayer();
            _this.initPlayerLayer();
            //this.initSpine();
            //this.initPlayer();
            _this.initEventLayer();
            _this.beginCrashCheck();
        });

    },
    initRiceLayer:function() {
        var bigData = this.bigData;
        var w = bigData.map.w;
        this.riceLayer = RiceLayer.create(w);
        this.addChild(this.riceLayer);
    },
    initPlayerLayer:function(){
        var bigData = this.bigData;
        this.playerLayer = PlayerLayer.create(bigData,ClientMsgFactory.createPlayerInfo().title);
        this.addChild(this.playerLayer);
    },
    initSpine:function(){
        var spine = SpineSprite.create(50);
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
    },
    beginCrashCheck:function(){
        var _this = this;
        this._crashCheckInterval = setInterval(function(){
            _this._crashCheck();
        },10);
    },
    _crashCheck:function(){
        this.playerLayer.crashCheckWithRice(this.riceLayer);
        this.playerLayer.crashCheckWithPlayer();
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