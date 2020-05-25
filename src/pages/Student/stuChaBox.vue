/**

* Created by wangxin

* @date 2019/8/29 11:38

*/
<template>
  <div id="groupStaAnaEcharts1" :class="{'chart-box':true}"></div>
</template>

<script>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "StuChaBox"
})
export default class StuChaBox extends Vue {
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
        dataIPS: [20, 60, 50, 80, 120, 100],
        dataIPS1: []
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
    setTimeout(() => {
      this.setChart();
    }, 100);
  }

  //监听 coursePlanScoreAvg 变化
  @Watch("coursePlanScoreAvg") testFun2() {
    console.log(this.coursePlanScoreAvg);
    this.setChart();
  }

  @Emit setChart() {
    let echarts = require("echarts");
    let data = this.chartsList;
    let dataIPSxAxis = data.dataIPSxAxis;
    let dataIPS = data.dataIPS;
    let dataIPS1 = data.dataIPS1 || [];
    let tabType = this.tabType;
    console.log(tabType);
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
          if (tabType === "得分") {
            return (
              '<div class="tips" style="text-align: center">' +
              data.name +
              '得分为 <br/><span style="">' +
              data.value +
              "</span>分</div>"
            );
          } else if (tabType === "用时") {
            return (
              '<div class="tips" style="text-align: center">' +
              data.name +
              '用时 <br/><span style="">' +
              data.value +
              "</span>分</div>"
            );
          } else {
            if(tabType==='各步骤得分'){
              return (
                '<div class="tips" style="text-align: center">' +
                data.name
              );
            }else{
              return (
                '<div class="tips" style="text-align: center">' +
                data.name +
                '排名 <br/><span style="">' +
                data.value +
                "</span>分</div>"
              );
            }
          }
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
              if(val*1<=100){
                return val + "";
              }
            },
            show: true,
            textStyle: {
              color: "#999999" //字体颜色
              //color: "#fff" //字体颜色
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
    if(tabType==='各步骤得分'){
      option.yAxis[0].min=0;
      option.yAxis[0].max=120;
      option.yAxis[0].axisLabel.textStyle.color='#fff';
    }
    if (dataIPS1.length > 0) {
      option.series.push({
        type: "line",
        smooth: 0.45,
        smoothMonotone: "",
        //symbol: "image://" + require("../../assets/groupStaAnalysis/pointer.svg"),
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
              width: 1,
              type: "dashed",
              color: "#FE7865"
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
        symbolSize: 5, //折线点的大小
        areaStyle: {
          normal: {}
        },
        data: dataIPS1
      });
    }
    // 基于准备好的dom，初始化echarts实例
    if (!this.groupStaAnaEcharts) {
      if (document.getElementById("groupStaAnaEcharts1")) {
        this.groupStaAnaEcharts = echarts.init(
          document.getElementById("groupStaAnaEcharts1")
        );
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

  beforeDestroy() {
    //组件销毁前先销毁 ECharts 实例
    if (!this.groupStaAnaEcharts) {
      return;
    }
    this.groupStaAnaEcharts.dispose();
    this.groupStaAnaEcharts = null;
  }
}
</script>

<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: 100%;
}
.w {
  width: calc(100% - 170px);
}

.tips {
  color: red;
}
</style>
