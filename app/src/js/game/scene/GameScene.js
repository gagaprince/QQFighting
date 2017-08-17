

var res = require('../resource.js').res;
var EventLayer = require('../layer/EventLayer.js');
var GameMainLayer = require('../layer/GameMainLayer.js');

var EventMagager = require('../event/EventManager.js');
var em = EventMagager.em;
var Event = em.GEvent;

var GameLayer = qc.Layer.extend({
    gameMainLayer:null,
    eventLayer:null,


    init:function(){
        this.winSize = qc.director.getWinSize();
        this.initGameMainLayer();
        this.initEventLayer();
    },
    initGameMainLayer:function(){
        this.gameMainLayer = GameMainLayer.create();
        this.addChild(this.gameMainLayer);
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