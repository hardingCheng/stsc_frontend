let bianpaidata = {
    lineList:[
        {
            from: "11",
            to: "13"
        },
        {
            from: "12",
            to: "13"
        },
        {
            from: "13",
            to: "14"
        },
        {
            from: "14",
            to: "15"
        },
        {
            from: "15",
            to: "16"
        }
    ],
    nodeList:[
        {
            id: "11",
           name: "美白祛斑产品包装",
            type: "timer",
            left: "50px",
            top: "80px",
            ico: "el-icon-document",
            viewOnly:true
        },
        {
            id: "12",
           name: "小核酸美白祛斑产品认证",
            type: "task",
            left: "45px",
            top: "145px",
            ico: "el-icon-document",
            viewOnly:true
        },
        {
            id: "13",
            name: "小核酸美白祛斑产品融资",
            type: "task1",
            left: "280px",
            top: "110px",
            ico: "el-icon-document",
            viewOnly:true
        },
        {
            id: "14",
            name: "小核酸美白祛斑产品检验检测",
            type: "task2",
            left: "505px",
            top: "110px",
            ico: "el-icon-document",
            viewOnly:true
        },
        {
            id: "15",
            name: "小核酸美白祛斑项目专家",
            type: "task3",
            left: "730px",
            top: "110px",
            ico: "el-icon-document",
            viewOnly:true
        },
        {
            id: "16",
           name: "小核酸美白祛斑项目技术难题",
            type: "task4",
            left: "971px",
            top: "110px",
            ico: "el-icon-document",
            viewOnly:true
        }
    ]
}
export function getData () {
    return bianpaidata
}
