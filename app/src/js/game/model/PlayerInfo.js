var common = require('../util/common.js');
var PlayerInfo = qc.Class.extend({
    title:"",
    color:"#000000",
    weight:1000,
    ctor:function(title){
        this.title = title;
        this.color = common.giveMeRandomColor();
    }
});
module.exports = PlayerInfo;