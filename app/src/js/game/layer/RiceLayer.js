/***
 * 食物图层
 * @type {void|*}
 */

var RiceSprite = require('../sprite/RiceSprite.js');
var RiceLayer = qc.Layer.extend({
    layerWidth:0,
    layerHeight:0,
    riceMap:null,//将riceMap分片，碰撞检测时每个球只需要检测它覆盖片区的rice，不需要整个地图遍历
    init:function(w){
        this.layerHeight = w;
        this.layerWidth = w;
        this.riceMap = {};
        this.initRices();
    },
    initRices:function(){
        var width = this.layerWidth;
        var height = this.layerHeight;
        var num = 300;
        for(var i=0;i<num;i++){
            var x = Math.random()*width;
            var y = Math.random()*height;
            var pos = qc.p(x,y);
            this._initRice(pos);
        }
    },
    getArrayFromRiceMap:function(rice){
        var pos = rice.getPosition();
        var x = Math.floor(pos.x);
        var y = Math.floor(pos.y);
        var array = this.riceMap[x+"_"+y];
        if(!array){
            array = [];
            this.riceMap[x+"_"+y] = array;
        }
        return array;
    },
    addToRiceMap:function(rice){
        var array = this.getArrayFromRiceMap(rice);
        array.push(rice);
    },
    removeFromRiceMap:function(rice){
        var array = this.getArrayFromRiceMap(rice);
        for(var i=0;i<array.length;i++){
            if(array[i]==rice){
                array.splice(i,1);
                break;
            }
        }
        rice.removeFromParent();
    },
    getRiceArrayByXY:function(x,y){
        var riceMap = this.riceMap;
        return riceMap[x+"_"+y]||[];
    },
    _initRice:function(pos){
        var rice = RiceSprite.create();
        rice.setPosition(pos);
        this.addToRiceMap(rice);
        this.addChild(rice);
    },
});
RiceLayer.create = function(w){
    var layer = new RiceLayer();
    layer.init(w);
    return layer;
}
module.exports = RiceLayer;

