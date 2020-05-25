/**

* Created by wangxin

* @date 2019/8/20 10:53

*/
<template>
  <div class="chart-all">
    <div id="groupStaAnaEcharts" :class="{'chart-box':true,'w':rightW&&check?true:false}"></div>
    <div class="x-axis-tip" v-show="isXAxisTipShow">
      <p>群统计分析群统计分析群统计分析群统计分析</p>
      <span></span>
    </div>
  </div>

</template>

<script>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "ChartBox"
})
export default class ChartBox extends Vue {
  @Prop({
    default: 1,
    required: false
  })
  tabType;

  @Prop({
    required: false,
    default: true
  })
  rightW;

  check = true;
  isXAxisTipShow=false;
  xAxisTip={
    content:'',//显示内容
    show:true,//是否显示
    top:'',//
    left:'',
  };//hover提示显示


  @Prop({
    required: false,
    default: () => {
      return {
        // x轴 数据
        dataIPSxAxis: [
          "50分以下",
          "50~60",
          "60~70",
          "70~80",
          "80~90",
          "90~100"
        ],
        dataIPS: [20, 60, 50, 80, 120, 100]
      };
    }
  })
  chartsList;

  @Prop({
    default: 0,
    required: false
  })
  coursePlanScoreAvg;

  groupStaAnaEcharts = null;

  //监听 delStuId 变化
  @Watch("tabType") testFun() {
    if (this.groupStaAnaEcharts) {
      this.groupStaAnaEcharts.resize();
    }
  }

  //监听 delStuId 变化
  @Watch("chartsList", { immediate: true, deep: true }) testFun1() {
    this.setChart();
  }

  @Emit setChart() {
    let echarts = require("echarts");
    let data = this.chartsList;
    let dataIPSxAxis = data.dataIPSxAxis;
    let dataIPS = data.dataIPS;
    let option = {
      title: {
        textStyle: {
          color: "#fff"
        }
      },
      backgroundColor: "#fff",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          //type: 'cross',
          label: {
            backgroundColor: "#6a7985"
          },
          lineStyle: {
            width: 0
          }
        },
        formatter: function(value) {
          let data = value[0];
          return (
            '<div class="tips" style="text-align: center">' +
            data.name +
            '分区间人数 <br/><span style="">' +
            data.value +
            "</span>人</div>"
          );
        }
      },
      color: ["#0080ff", "#4cd5ce"],
      toolbox: {
        // feature: {
        //     saveAsImage: {}
        // }
      },
      grid: {
        left: "0",
        right: "3%",
        top: "10%",
        bottom: "0",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          triggerEvent: true,// 设置为true后，可触发事件。实现x轴文字过长，显示省略号，hover上去显示全部的功能
          data: dataIPSxAxis,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#999",
              fontSize: 12
            },
            formatter: function (value) {
              return (value.length > 6 ? (value.slice(0,6)+"...") : value )
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#999",
              width: 0.5 //这里是为了突出显示加上的
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            onZero: false,
            lineStyle: {
              color: "#999",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            formatter: function(val) {
              return val + "";
            },
            show: true,
            textStyle: {
              color: "#999" //字体颜色
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#F1F1F1"
            }
          }
        }
      ],
      series: [
        {
          type: "line",
          name:'1',
          smooth: 0.45,
          smoothMonotone: "",
          symbol:
            "image://" + require("../../assets/groupStaAnalysis/pointer.svg"),
          stack: 100,
          itemStyle: {
            normal: {
              //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: "rgba(254,120,101,0)" // 0% 处的颜色
                },
                {
                  offset: 0.1,
                  color: "rgba(254,120,101,0.25)" // 100% 处的颜色
                }
              ]), //背景渐变色
              lineStyle: {
                // 系列级个性化折线样式
                width: 2,
                type: "solid",
                //color: "#FE7865",
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(254,120,101,0)" // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: "rgba(254,120,101,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(254,120,101,0)" // 100% 处的颜色
                    }
                  ]
                }
              }
            },
            emphasis: {
              color: "#FE7865",
              lineStyle: {
                // 系列级个性化折线样式
                width: 0.5,
                type: "dotted",
                color: "#FE7865" //折线的颜色
              }
            }
          }, //线条样式
          symbolSize: 15, //折线点的大小
          areaStyle: {
            normal: {}
          },
          data: dataIPS
        }
      ]
    };
    // 基于准备好的dom，初始化echarts实例
    if (!this.groupStaAnaEcharts) {
      if (document.getElementById("groupStaAnaEcharts")) {
        this.groupStaAnaEcharts = echarts.init(
          document.getElementById("groupStaAnaEcharts")
        );
        this.groupStaAnaEcharts.setOption(option);
        this.groupStaAnaEcharts.on('mouseover', 'xAxis', function (params) {
          document.querySelector('.x-axis-tip').style.cursor = "auto";
          if( params.componentType == 'xAxis' ){
            /*let clientX = params.event.event.offsetX;
            let clientY = params.event.event.offsetY;*/

            let clientX = params.event.target.position[0];
            let clientY = params.event.target.position[1];
            let xAxisTip = document.querySelector('.x-axis-tip');
            xAxisTip.innerText = params.value;
            let val=params.value+'';
            xAxisTip.style.left = clientX + document.documentElement.scrollLeft + "px";
            xAxisTip.style.top = clientY - document.documentElement.scrollTop + 20 + "px";
            if(params.value.length>6){
              this.clock = setTimeout(() => {
                xAxisTip.style.display='inline-block';
                $('.x-axis-tip p').html(params.value);
              }, 300)
            }
          }
        });
        this.groupStaAnaEcharts.on('mouseout', 'xAxis', function (params) {
          let xAxisTip = document.querySelector('.x-axis-tip');
          xAxisTip.style.display='none';
        });
      }
    } else {
      // 绘制图表
      this.groupStaAnaEcharts.setOption(option);
    }
  }

  //初始化渲染完成生命周期方法
  mounted() {
    this.setChart();
    this.check = false;
  }

  updated() {
    this.setChart();
  }
}
</script>

<style lang="scss" scoped>
#groupStaAnaEcharts {
  width: 100%;
}
.chart-all{
  position: relative;
  width:100%;
  height:100%;
}
.chart-box {
  width: 100%;
  height: 100%;
}
.w {
  width: calc(100% - 170px);
}
.x-axis-tip{
  position: absolute;
  top:0;
  left:0;
  transform: translateX(-50%);
  border-radius: 12px;
  background:rgba(51,51,51,0.6);
  color:#fff;
  padding:5px 10px;
  font-size: 12px;
  z-index:99;
  width: 100px;
  max-width: 100px;
  span{
    position: absolute;
    top:-8px;
    left:50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style:solid;
    border-color:transparent transparent rgba(51,51,51,0.6) transparent;
  }
}
.tips {
  color: red;
}
</style>
