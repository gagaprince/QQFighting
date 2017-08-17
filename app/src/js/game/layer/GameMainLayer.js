

var res = require('../resource.js').res;
var EventLayer = require('../layer/EventLayer.js');
var RiceLayer = require('../layer/RiceLayer.js');
var PlayerLayer = require('../layer/PlayerLayer.js');
var SpineSprite = require('../sprite/SpineSprite.js');
var InitData = require('../mock/InitData.js');

var PlayerSprite = require('../sprite/PlayerSprite.js');
var ClientManager = require('../util/ClientManager.js');
var ClientMsgFactory = require('../util/ClientMsgFactory.js');

var EventMagager = require('../event/EventManager.js');
var em = EventMagager.em;
var Event = em.GEvent;

var GameMainLayer = qc.Layer.extend({
    bgSprit:null,
    bigData:null,

    winSize:null,
    riceLayer:null,
    playerLayer:null,
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
            _this.beginCrashCheck();
        });
        this.beginCoordinateListen();
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
    beginCrashCheck:function(){
        var _this = this;
        this._crashCheckInterval = setInterval(function(){
            _this._crashCheck();
        },10);
    },
    _crashCheck:function(){
        this.playerLayer.crashCheckWithRice(this.riceLayer);
        this.playerLayer.crashCheckWithPlayer();
    },
    beginCoordinateListen:function(){
        var _this = this;
        em.addEventListener(Event.EventName.COORDINATE_EVENT,function(e){
            var data = e.getData();
            _this.transformCoordinate(data);
        });
    },
    transformCoordinate:function(coordinateData){
        var pos = coordinateData.pos;
        var winSize = this.winSize;
        var scale = coordinateData.scale;
        this.setScale(scale);
        this.setPosition(winSize.width/2-pos.x,winSize.height/2-pos.y);
    }
});

GameMainLayer.create = function(){
    var layer = new GameMainLayer();
    layer.init();
    return layer;
}

module.exports = GameMainLayer;