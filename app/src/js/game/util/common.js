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
}
}
module.exports = common;