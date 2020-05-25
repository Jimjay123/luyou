/**

* Created by wangxin

* @date 2019/8/19 16:21  群课程分析

*/
<template>
  <div class="pages">
    <!--顶部header start-->
    <TopHeader></TopHeader>
    <!--顶部header end-->

    <div class="group-analysis">
      <div class="fh">
        <a href="javascript:;" v-on:click="backHistory">
          <img src="../../assets/img/fanhui1.svg" alt />
          <span>返回</span>
        </a>
      </div>

      <!--baseInfo start-->
      <div class="base-info">
        <AnaCard
          :data="{
            url:data.popularizeImageUrl,
            time:data.duration,
            type:coursePlanType,
          }"
        ></AnaCard>
        <CardInfo :data="data" :coursePlanType="coursePlanType" style="flex-grow:1"></CardInfo>
        <RightBtn
          :data="{
            totalStudentCount:data.totalStudentCount,
            finishStudentCount:data.finishStudentCount
          }"
          :rbCbFun="rbCbFun"
        ></RightBtn>
      </div>
      <!--baseInfo end-->

      <!--统计图表 start-->
      <div class="chart">
        <div class="chart-title">
          <i class="icon-chart"></i>
          <span>{{data.groupName}}</span>
          <SelectBox
            v-if="coursePlanType==2"
            style="width:224px;height:32px;"
            :selVal="chartType"
            :list="chartTypeList"
            :input="(e)=>inputChange(e,'select','chartType')"
          ></SelectBox>
          <span v-else>成绩统计</span>
        </div>
        <TabBox :tabType="tabType" :tabCbFun="tabCbFun" :list="tabBoxList"></TabBox>
        <div :class="{'chart-content':true,'chart-item':tabType==='成绩区间统计'}">
          <div class="box">
            <ChartBox
              :tabType="tabType"
              :coursePlanScoreAvg="coursePlanScoreAvg"
              :chartsList="chartsList"
            />
          </div>
          <ScoreList
            style="width:154px;height:365px;padding-top:40px;"
            :coursePlanScoreAvg="coursePlanScoreAvg"
            v-show="tabType==='成绩区间统计'"
            :sortList="sortList"
          ></ScoreList>
        </div>
        <div class="chart-footer">
          <p class="title">反馈语</p>
          <p>{{feedback}}</p>
        </div>
      </div>
      <!--统计图表 end-->

      <!--table start-->
      <div class="table">
        <div class="table-title">
          <div class="left">
            <i class="icon-book"></i>
            <span>课程完成情况列表</span>
          </div>
          <div class="right">
            <TabChange :tableTab="tableTab" :TabChangeFun="TabChangeFun" style="margin-right:16px"></TabChange>
            <SearchInput
              class="input"
              style="width:300px;height:32px"
              :value="searchVal"
              :placeHolder="'请输入'"
              :input="(e,type)=>inputChange(e,type,'searchVal')"
            ></SearchInput>
          </div>
        </div>
        <div class="table-box">
          <TableBox :tableList="tableList"></TableBox>
          <PaginationItem :options="{page:page,limit:limit,total:total,cb:paginCb}" />
        </div>
      </div>
      <!--table end-->
    </div>
  </div>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import TopHeader from "../Header/header";
import AnaCard from "./anaCard";
import CardInfo from "./cardInfo";
import RightBtn from "./rightBtn";
import ScoreList from "./scoreList";
import TabBox from "./tabBox";
import ChartBox from "./chartBox";
import TabChange from "./tabChange";
import TableBox from "./tableBox";
import PaginationItem from "../group/paginationItem";
import SelectBox from "../teachers/selectBox";
import SearchInput from "../teachers/searchInput";
import {
  plaStuStaPlanStuList,
  groCouPlaCouPlaBasInfo,
  groStaScoreRanges,
  groStaScoSort,
  groStaFeeBackData,
  groStaQuiScoChaData,
  groStaCouScoChaData,
  groStaCouPlaScoAvg,
  groStaCouPlaCouList,
  groStaCouScoRange,
  groStaCouScoSort,
  groStaCouScoAvg
} from "../../service/teachersApi";
import { cloneObj, tokenFun, tipsFail, tipsMsg } from "../../utils/utils";

@Component({
  name: "GroupStaAnalysis",
  components: {
    TopHeader,
    AnaCard,
    CardInfo,
    RightBtn,
    SelectBox,
    ScoreList,
    ChartBox,
    TabChange,
    SearchInput,
    TableBox,
    PaginationItem,
    TabBox
  }
})
export default class GroupStaAnalysis extends Vue {
  chartType = {
    val: "", //
    label: "全部"
  }; //图标选择
  //可选项
  chartTypeList = [
    /*{
        val: '章节1',//
        label: '章节1',
      },*/
  ];
  sortList = []; //排名接口
  feedback = ""; //反馈语
  courseScoreAvg = ""; //各课程计划平均分
  coursePlanScoreAvg = ""; //课程频道平均分

  tabType = "成绩区间统计"; //tab 切换类型 1 成绩区间 2 各步骤平均分

  tableTab = "全部"; //全部 已完成 未完成 切换
  searchVal = ""; //搜索框的值
  timer = null;

  page = 1; //当前页数
  limit = 10; //当前每页条数
  total = ""; //总条数
  groupId = "1"; //群id
  coursePlanId = "1"; //课程计划id
  coursePlanType = "1"; //必填1单一标准课 2课程频道

  tableList = []; //table数据
  data = {}; //当前页基础数据
  chartsList = {}; //echats 图表数据
  tabBoxList = ["各课程平均分", "成绩区间统计"]; //图表tab数据 各步骤平均分

  @Emit inputChange(e, type, name) {
    if (type === "select") {
      //选择课程下拉框改变事件
      if (e.val != this.chartType.val) {
        if (e.val == "") {
          this.tabBoxList = ["各课程平均分", "成绩区间统计"]; //图表tab数据 各步骤平均分
        } else {
          this.tabBoxList = ["各步骤平均分", "成绩区间统计"]; //图表tab数据 各步骤平均分
        }
        this.tabType = "成绩区间统计"; //tab 切换类型 1 成绩区间 2 各步骤平均分
        this[name] = e;
        this.selChange();
      }
    } else if ("input") {
      this[name] = e.target.value;
      if (this[name].val !== e.target.value) {
        this.setTimeFun();
      }
    }
  }

  //搜索框定时查询 延迟300毫秒
  @Emit setTimeFun() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.paginCb(1, this.limit);
    }, 300);
  }

  //课程详情--下载报告点击事件
  @Emit rbCbFun(type) {
    if (type === "info") {
      if (
        this.coursePlanType * 1 === 21 ||
        this.coursePlanType * 1 === 22 ||
        this.coursePlanType * 1 === 25 ||
        this.coursePlanType * 1 === 26
      ) {
        this.$router.push({
          path: "/Standarddetails", //标准课
          query: {
            groupId: this.groupId,
            coursePlanId: this.coursePlanId,
            coursePlanType: this.coursePlanType
          }
        });
      } else if (
        this.coursePlanType * 1 === 23 ||
        this.coursePlanType * 1 === 24
      ) {
        this.$router.push({
          path: "/Coursechanne", //课程频道
          query: {
            groupId: this.groupId,
            coursePlanId: this.coursePlanId,
            coursePlanType: this.coursePlanType
          }
        });
      }
    } else {
      //下来报告
      tipsMsg("功能开发中");
    }
  }

  //图表tab 切换
  @Emit tabCbFun(val) {
    this.tabType = val;
    this.tabClickAjax();
  }

  //table tab改变事件
  @Emit TabChangeFun(val) {
    this.tableTab = val;
    this.paginCb(1, this.limit);
  }

  //分页回调
  @Emit paginCb(page, size) {
    this.page = page;
    this.size = size;
    let opt = {
      page: page,
      limit: size,
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId, //课程计划id
      memberName: this.searchVal
    };
    let tableTab = this.tableTab;
    if (tableTab !== "全部") {
      opt.finishFlag = tableTab == "已完成" ? 1 : 0;
    }
    this.plaStuStaPlanStuListFun(opt);
  }

  //获取学生课程完成情况列表接口
  @Emit plaStuStaPlanStuListFun(opt) {
    plaStuStaPlanStuList(opt).then(res => {
      console.log(res);
      if (res.code == "0") {
        let data = res.page;
        this.tableList = data.list || [];
        this.total = data.totalCount || 0;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取基本信息接口
  @Emit groCouPlaCouPlaBasInfoFun() {
    groCouPlaCouPlaBasInfo({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId, //课程计划id
      coursePlanType: this.coursePlanType //必填1单一标准课 2课程频道
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.data = res.data;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取图表 课程频道成绩排名接口
  @Emit groStaScoSortFun() {
    groStaScoSort({
      limit: "7",
      page: "1",
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId //课程计划id
    }).then(res => {
      if (res.code == "0") {
        this.sortList = res.list;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取图表 标准课成绩排名
  @Emit groStaCouScoSortFun() {
    groStaCouScoSort({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId, //课程计划id
      courseId: this.chartType.val
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.sortList = res.list;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取反馈语接口
  @Emit groStaFeeBackDataFun() {
    groStaFeeBackData({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId //课程计划id
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.feedback = res.data;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取 各步骤平均分接口 图表数据
  @Emit groStaQuiScoChaDataFun() {
    groStaQuiScoChaData({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId //课程计划id
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        let list = res.list;
        let dataIPSxAxis = [];
        let dataIPS = [];
        list.map(item => {
          dataIPSxAxis.push(item.quizName);
          dataIPS.push(item.avgScore);
        });
        this.chartsList = {
          dataIPSxAxis: cloneObj(dataIPSxAxis),
          dataIPS: cloneObj(dataIPS)
        };
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取各课程平均分
  @Emit groStaCouScoChaDataFun() {
    groStaCouScoChaData({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId, //课程计划id
      courseId: this.chartType.val
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        let list = res.list;
        let dataIPSxAxis = [];
        let dataIPS = [];
        list.map(item => {
          dataIPSxAxis.push(item.courseName);
          dataIPS.push(item.avgScore);
        });
        this.chartsList = {
          dataIPSxAxis: cloneObj(dataIPSxAxis),
          dataIPS: cloneObj(dataIPS)
        };
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取课程频道平均分接口
  @Emit groStaCouPlaScoAvgFun() {
    groStaCouPlaScoAvg({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId //课程计划id
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.coursePlanScoreAvg = res.coursePlanScoreAvg;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //课程标准课平均分
  @Emit groStaCouScoAvgFun() {
    groStaCouScoAvg({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId, //课程计划id
      courseId: this.chartType.val
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.coursePlanScoreAvg = res.courseScoreAvg;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取课程频道 所有课程接口
  @Emit groStaCouPlaCouListFun() {
    groStaCouPlaCouList({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId //课程计划id
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        let chartTypeList = [
          {
            val: "",
            label: "全部"
          }
        ];
        res.list.map(item => {
          chartTypeList.push({
            val: item.courseId,
            label: item.courseName
          });
        });
        this.chartTypeList = chartTypeList;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取标准课成绩区间接口
  @Emit groStaCouScoRangeFun() {
    groStaCouScoRange({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId, //课程计划id
      courseId: this.chartType.val
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //课程频道--成绩区间统计
  @Emit groStaScoreRangesFun() {
    groStaScoreRanges({
      groupId: this.groupId, //群id
      coursePlanId: this.coursePlanId //课程计划id
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.chartsList = cloneObj(this.getData(res.list));
      } else {
        tipsFail(res.msg);
      }
    });
  }

  @Emit getData(list = []) {
    let dataIPSxAxis = [];
    let dataIPS = [];
    list.map(item => {
      let obj = "";
      if (item.scoreMin === 0) {
        obj = item.scoreMax + "分以下";
      } else {
        obj = item.scoreMin + "-" + item.scoreMax;
      }
      dataIPSxAxis.push(obj);
      dataIPS.push(item.count);
    });
    return {
      dataIPSxAxis: cloneObj(dataIPSxAxis),
      dataIPS: cloneObj(dataIPS)
    };
  }

  //课程下拉选择获取接口
  @Emit selChange() {
    let chartType = this.chartType;
    if (chartType.val) {
      //标准课
      this.groStaCouScoAvgFun(); //获取标准课平均分
      this.groStaCouScoSortFun(); //获取标准课成绩排名列表
      this.groStaCouScoRangeFun(); //获取标准课--成绩区间统计
    } else {
      //课程计划
      this.groStaCouPlaScoAvgFun(); //获取课程频道平均分
      this.groStaScoSortFun(); //获取课程频道成绩排名接口
      this.groStaScoreRangesFun(); //课程频道成绩区间统计
    }
    this.groStaFeeBackDataFun(); //获取反馈语
  }

  //图表右侧tab切换 调用接口
  @Emit tabClickAjax() {
    let chartType = this.chartType;
    if (this.coursePlanType == 1) {
      //标准课
      if (this.tabType == "成绩区间统计") {
        this.groStaScoreRangesFun(); //课程频道成绩区间统计
      } else {
        this.groStaQuiScoChaDataFun(); //获取各步骤平均分列表
      }
    } else {
      //课程计划
      if (!chartType.val) {
        if (this.tabType == "成绩区间统计") {
          this.groStaScoreRangesFun(); //课程频道成绩区间统计
        } else {
          this.groStaCouScoChaDataFun(); //获取各课程平均分--图表接口
        }
      } else {
        if (this.tabType == "成绩区间统计") {
          this.groStaScoreRangesFun(); //课程频道成绩区间统计
        } else {
          this.groStaQuiScoChaDataFun(); //获取各步骤平均分列表
        }
      }
    }
  }

  // 返回上一页
  @Emit backHistory() {
    // this.$router.go(-1); //返回上一层
    this.$router.push({
      path: "/Courseplan"
    });
  }

  created() {
    let query = this.$route.query;
    console.log(query);
    this.groupId = query.groupId || ""; //群id
    this.coursePlanId = query.coursePlanId || ""; //课程计划id
    this.coursePlanType = query.coursePlanType || ""; //必填1单一标准课 2课程频道

    this.groCouPlaCouPlaBasInfoFun(); //获取基础信息接口数据
    this.groStaCouPlaCouListFun(); //获取课程计划所有课程接口

    this.paginCb(1, this.limit); //学生课程完成情况列表数据

    if (this.coursePlanType == 1) {
      // 1标准课  2课程计划
      this.tabBoxList = ["各步骤平均分", "成绩区间统计"]; //图表tab数据 各步骤平均分
    }
    this.selChange();
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.pages {
  height: 100vh;
  overflow-x: auto;
}

.group-analysis {
  width: 1200px;
  margin: 0 auto;
  padding: 14px 0;
}

/*返回*/
.fh {
  height: 21px;
  a {
    height: 21px;
    line-height: 21px;
    img {
      width: 12px;
      height: 21px;
    }
    span {
      font-size: 13px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
    }
  }
}

/*baseInfo*/
.base-info {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/*统计图表*/
.chart {
  margin-top: 68px;
  .chart-title {
    .icon-chart {
      display: inline-block;
      width: 40px;
      height: 40px;
      vertical-align: middle;
      background: url("../../assets/groupStaAnalysis/chart.svg") no-repeat;
      background-size: 100% auto;
    }
    span {
      @include fontSet(21px, #666, 600);
      margin-right: 12px;
    }
    & /deep/ {
      .text {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
      .sel-box div.text i {
        top: 8px;
      }
      .sel-list {
        font-size: 14px;
      }
    }
  }
}

.chart-tab {
  @include fontSet(16px, #999, 400);
  .tab-item {
    float: right;
    margin-left: 40px;
    cursor: pointer;
  }
  .active {
    position: relative;
    color: #333;
    .line {
      display: block;
      margin: 0 auto;
      width: 56px;
      height: 4px;
      background: rgba(254, 120, 101, 1);
      border-radius: 2px;
      margin-top: 9px;
    }
  }
}

.chart-content {
  display: flex;
  align-items: flex-end;
  .box {
    flex-grow: 1;
    height: 364px;
  }
}
.chart-item {
  .box {
    width: 1046px;
  }
}

.chart-footer {
  margin-top: 40px;
  margin-bottom: 79px;
  .title {
    @include fontSet(16px, #333, 500);
    margin-bottom: 10px;
    width: auto;
  }
  p {
    @include fontSet(14px, #999, 400);
    width: 768px;
  }
}

/* table  部分 */
.table-title {
  display: flex;
  justify-content: space-between;
  .left {
    height: 40px;
    line-height: 40px;
    .icon-book {
      display: block;
      float: left;
      // vertical-align: middle;
      width: 40px;
      height: 40px;
      background: url("../../assets/groupStaAnalysis/book.svg") no-repeat;
      background-size: 100% auto;
    }
    span {
      @include fontSet(21px, #666, 600);
      margin-right: 12px;
      display: block;
      float: left;
    }
  }
  .right {
    height: 40px;
    padding-top: 4px;
    padding-bottom: 4px;
    f
    // line-height: 40px;
    & /deep/ {
      input {
        padding: 5px 12px;
        padding-right: 28px;
      }
      input::placeholder {
        font-size: 14px;
      }
      .icon-search {
        right: 6px;
        top: 6px;
        left: auto;
      }
    }
  }
}

.table-box {
  margin-bottom: 108px;
}
</style>
