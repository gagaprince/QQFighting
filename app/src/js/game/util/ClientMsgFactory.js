var nickNameKey = "QQ_Fight_Nick";
var colorKey = "QQ_Fight_Color";
var common = require('./common.js');
var ClientMsgFactory = {
    createMoveMsg:function(playerGroup){
        //根据当前玩家的playerGroup生成一个movemsg
        //包含每个player的基本信息和运行角度
    },
    createBillMsg:function(playerGroup){
        //包含发射bill的player和发射方向
    },
    createFenMsg:function(playerGroup){
        //分球的player和方向
    },
    createPlayerInfo:function(){
        var nickName = window.localStorage.getItem(nickNameKey);
        var color = window.localStorage.getItem(colorKey);
        if(!nickName){
            nickName = common.giveMeRandomNick();
        }
        if(!color){
            color = common.giveMeRandomColor();
        }
        return {
            title:nickName,
            color:color
        }
    }
};
module.exports = ClientMsgFactory;