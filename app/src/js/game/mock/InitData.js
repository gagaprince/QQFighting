var InitData = {
    players:[
        {
            title:"吃货火柴棍",
            color:"#ffe123",
            weight:100000,
            items:[
                {
                    weight:12000,
                    pos:{
                        x:335,//位置是相对整个大舞台的 坐标需要转换
                        y:133
                    }
                },
                {
                    weight:88000,
                    pos:{
                        x:135,
                        y:50
                    }
                }
            ]
        },
        {
            title:"求合作",
            color:"#1fe123",
            weight:100000,
            items:[
                {
                    weight:12000,
                    pos:{
                        x:235,//位置是相对整个大舞台的 坐标需要转换
                        y:133
                    }
                },
                {
                    weight:48000,
                    pos:{
                        x:100,
                        y:150
                    }
                },
                {
                    weight:40000,
                    pos:{
                        x:150,
                        y:150
                    }
                }
            ]
        }
    ],//球球数据
    spines:[
        {
            weight:12000,
            pos:{
                x:111,
                y:111
            }
        },
        {
            weight:13000,
            pos:{
                x:335,
                y:111
            }
        }
    ],//尖刺数据
    bills:[
        {
            color:"#ffe123",
            weight:10,
            pos:{
                x:111,
                y:333
            }
        }
    ]//发射子弹数据
}

module.exports = InitData;