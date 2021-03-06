var xml;
$.ajax({
    url: 'policy.xml',
    type: 'get',
    async: false,
    dataType: 'xml',
    data: {param1: 'value1'},
})
    .done(function (data) {
        console.log("success");
        xml = data
        console.log(xml);
    })
    .fail(function () {
        console.log("error");
    })

var jso;
$.ajax({
    url: 'policy.json',
    type: 'get',
    async: false,
    dataType: 'json',
})
    .done(function (data) {
        console.log("success");
        jso = data
        console.log(jso);
    })
    .fail(function () {
        console.log("error");
    })
console.log("屏幕可用宽：" + document.body.clientWidth)
$("#echarts1").css('width', document.body.clientWidth);
//画力关系图
var dom = document.getElementById("echarts1");
var myChart = echarts.init(dom);
var app = {};
var option = null;
var graph = echarts.dataTool.gexf.parse(xml);
var categories = [];
categories[0] = {
    name: ''
};
categories[1] = {
    name: ''
};
categories[2] = {
    name: ''
};
categories[3] = {
    name: ''
};
categories[4] = {
    name: ''
};
categories[5] = {
    name: ''
};
categories[6] = {
    name: ''
};
categories[7] = {
    name: ''
};
categories[8] = {
    name: ''
};
categories[9] = {
    name: ''
};
categories[10] = {
    name: ''
};
categories[11] = {
    name: ''
};
categories[12] = {
    name: ''
};
categories[13] = {
    name: ''
};
categories[14] = {
    name: ''
};
categories[15] = {
    name: ''
};
categories[16] = {
    name: ''
};
categories[17] = {
    name: ''
};
categories[18] = {
    name: ''
};
categories[19] = {
    name: ''
};
categories[20] = {
    name: ''
};
categories[21] = {
    name: ''
};


graph.nodes.forEach(function (node) {
    node.itemStyle = null;
    node.value = node.symbolSize;
    node.label = {
        normal: {
            show: node.symbolSize > 1000
        }
    };
    node.category = node.attributes.modularity_class;
});

option = {
    //整幅图的title
    //提示框组件
    tooltip: [{
        show: true,
        showContent: true,
        // triggerOn: 'click',
        hideDelay: 100,
        enterable: true,
        formatter: function (node) {
            if (node.name.length < 4)
                return;
            for (var i = 0; i < jso.nodes.length; i++) {
                var s1 = $.trim(node.name) + "";
                var s2 = $.trim(jso.nodes[i].identifier) + "";
                if (s1 == s2)
                    var newname = node.name;
                if (node.name.indexOf("- IEEE") > 0) {
                    newname = "IEEE" + node.name.split("- IEEE")[1]
                }
                return "<a style='color:yellow' target='_blank' href=" + jso.nodes[i].url + ">" + newname + "</a>" + "<br/>";
            }
            return node.name + "<br/>";
        }
    }],
    // legend: [{
    //     // selectedMode: 'single',
    //     data: categories.map(function (a) {
    //         return a.name;
    //     })
    // }],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            name: 'policy',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            categories: categories,
            roam: true,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}'
                }
            },
            lineStyle: {
                normal: {
                    curveness: 0.3
                }
            },
            // focusNodeAdjacency: true, //划过只显示对应关系
            draggable: true,
            force: {
                gravity: 0.1,
                // repulsion: 20,
                edgeLength: 120,
                repulsion: 4000
            }
        }
    ]
};
var clicktemp=-1
myChart.on('click', function (node) {
    if (node.dataType == 'node') {
        //node.value 是 id   可以打印node看数据怎么存储的
//              这里放具体的操作         
        console.log(node)
        if(node.dataIndex==clicktemp){
            myChart.dispatchAction({
                type: 'unfocusNodeAdjacency',
                seriesIndex: 0
            })
            clicktemp=-1
        }
        else
        {
            myChart.dispatchAction({
                type: 'focusNodeAdjacency',
                seriesIndex: 0,
                dataIndex: node.dataIndex
            })
            clicktemp=node.dataIndex
        }
    }

});
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}


$("#btn_search").click(function () {
    var search_key = $("#input_search").val()
    console.log(search_key)
    optiondata = option.series[0].data
    var whatIwantID = []
    console.log(search_key.toLowerCase())
    for (var i = 0; i < optiondata.length; i++) {
        // console.log(optiondata[i].name.toLowerCase())
        if (optiondata[i].name.toLowerCase().indexOf(search_key.toLowerCase()) > -1) {
            whatIwantID.push(i)
            // console.log(11111111)
        }
    }

    console.log(whatIwantID)
    clicktemp = whatIwantID[0]
    myChart.dispatchAction({
        type: 'focusNodeAdjacency',
        seriesIndex: 0,
        dataIndex: whatIwantID[0]
    })

    console.log($("#input_search").val() + "h");

});

$("#echarts1").dblclick(function(){
    myChart.dispatchAction({
        type: 'unfocusNodeAdjacency',
        seriesIndex: 0,
    })
});

$(function () {
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $("#btn_search").click();
        }
    })
})

$(function () {
    $(document).keydown(function (event) {
        if (event.keyCode == 27) {
            myChart.dispatchAction({
                type: 'unfocusNodeAdjacency',
                seriesIndex: 0,
            })
        }
    })
})