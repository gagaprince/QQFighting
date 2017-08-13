/***
 * 食物图层
 * @type {void|*}
 */

var RiceSprite = require('../sprite/RiceSprite.js');
var RiceLayer = qc.Layer.extend({
    layerWidth:0,
    layerHeight:0,
    init:function(w){
        this.layerHeight = w;
        this.layerWidth = w;
        this.initRices();
    },
    initRices:function(){
        var width = this.layerWidth;
        var height = this.layerHeight;
        var num = 300;
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
});
RiceLayer.create = function(w){
    var layer = new RiceLayer();
    layer.init(w);
    return layer;
}
module.exports = RiceLayer;

