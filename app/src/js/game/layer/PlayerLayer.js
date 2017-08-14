/***
 * 玩家图层
 * @type {void|*}
 */

var PlayerGroupSprite = require('../sprite/PlayerGroupSprite.js');
var SpineSprite = require('../sprite/SpineSprite.js');
var PlayerLayer = qc.Layer.extend({
    playGroups:null,
    spines:null,
    mySelf:null,
    all:null,//由玩家和尖刺组成的数组 会根据weight排序
    init:function(gameData,title){
        this.resetAllByData(gameData,title);
    },
    resetAllByData:function(gameData,title){
        this.playGroups = [];
        this.spines = [];
        this.all = [];
        this.initPlayerGroups(gameData,title);
        this.initSpine(gameData);
        this.sortAll();
    },
    initPlayerGroups:function(gameData,title){
        var playerMsgs = gameData.players;
        for(var i=0;i<playerMsgs.length;i++){
            var playerMsg = playerMsgs[i];
            var tin = playerMsg.title;
            var playerGroup = this.createPlayerGroup(playerMsg);
            if(tin == title){
                this.initMySelf(playerGroup);
            }
        }

    },
    initSpine:function(gameData){
        var spineMsgs = gameData.spines;
        console.log(spineMsgs);
        for(var i=0;i<spineMsgs.length;i++){
            var spineMsg = spineMsgs[i];
            var weight = spineMsg.weight;
            var posMsg = spineMsg.pos;
            var pos = qc.p(posMsg.x,posMsg.y);
            var spine = SpineSprite.createWithWeight(weight);
            spine.setPosition(pos);
            this.spines.push(spine);
        }
    },
    sortAll:function(){
        var playGroups = this.playGroups;
        this.all = [];
        for(var i=0;i<playGroups.length;i++){
            this.all = this.all.concat(this.playGroups[i].getPlayers());
        }
        this.all = this.all.concat(this.spines);
        this.all.sort(function(s1,s2){
            return s1.weight-s2.weight;
        });
        this.resetAllSprite();
    },
    resetAllSprite:function(){
        this.removeAllChildren();
        var all = this.all;
        console.log(all)
        for(var i=0;i<all.length;i++){
            var s = all[i];
            this.addChild(s);
        }
    },
    initMySelf:function(playerGroup){
        //有特殊处理逻辑  要开启控制权
        this.mySelf = playerGroup;
    },
    createPlayerGroup:function(playerMsg){
        var playerGroup = PlayerGroupSprite.create(playerMsg);
        this.playGroups.push(playerGroup);
        return playerGroup;
    }
});
PlayerLayer.create = function(gameData,title){
    var layer = new PlayerLayer();
    layer.init(gameData,title);
    return layer;
}
module.exports = PlayerLayer;

