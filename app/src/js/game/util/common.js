var midu = 10;
var common = {
    transformWeightToR:function(weight){
        var c = weight/midu;
        var r = Math.sqrt(c/Math.PI);
        return r;
    },
    giveMeRandomNick:function(){
        return "吃货火柴棍";
    },
    giveMeRandomColor:function(){
        var colors = [
        '#f144d2',
        '#f42b39',
        '#cbfa59',
        '#fd623e',
        '#18f607',
        '#5af8e7',
        '#b2f8a4',
        '7','8','9','a','b','c','d','e','f'];
        var num = Math.floor(Math.random()*7);
        return colors[num];
    },
    distanse:function(p1,p2){
        var dx = p1.x-p2.x;
        var dy = p1.y-p2.y;
        return Math.sqrt(dx*dx+dy*dy);
    }
}
module.exports = common;