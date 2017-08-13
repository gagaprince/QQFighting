/***
 * 玩家图层
 * @type {void|*}
 */

var PlayerGroupSprite = require('../sprite/RiceSprite.js');
var PlayerLayer = qc.Layer.extend({
    playGroups:null,
    spines:null,
    mySelf:null,
    all:null,//由玩家和尖刺组成的数组 会根据weight排序

    init:function(playerMsgs,title){
        this.playGroups = [];
        this.spines = [];
        this.all = [];
        this.initPlayerGroups(playerMsgs,title);

    },
    initPlayerGroups:function(playerMsgs,title){
        for(var i=0;i<playerMsgs.length;i++){
            var playerMsg = playerMsgs[i];
            var tin = playerMsg.title;
            var playerGroup = this.createPlayerGroup(playerMsg);
            if(tin == title){
                this.initMySelf(playerGroup);
            }
        }
        this.sortAll();
    },
    sortAll:function(){
        this.all = [].concat(this.playGroups).concat(this.spines);
        this.all.sort(function(s1,s2){
            return s1.weight-s2.weight;
        });
        this.resetAllSprite();
    },
    resetAllSprite:function(){
        this.removeAllChildren();
        var all = this.all;
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
PlayerLayer.create = function(playerMsgs,title){
    var layer = new PlayerLayer();
    layer.init(playerMsgs,title);
    return layer;
}
module.exports = PlayerLayer;

