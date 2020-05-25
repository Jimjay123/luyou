/**

* Created by wangxin

* @date 2019/8/21 16:57

* 统计中心

*/
<template>
  <div class="main-content clearfix">
    <div class="top-title">
      <span class="line"></span>个人中心
    </div>
    <!--基础信息 start -->
    <div class="base-info">
      <div class="left">
        <img :src="list.avatar || require('../../assets/img/touxiang.svg')" alt />
        <div class="person">
          <p class="p1">
            {{list.memberName}}
            <i :class="list.gender === 1 ? 'boy' : 'girl' "></i>
            <span>大二</span>
          </p>
          <p class="p2">ID：{{list.mobile}}</p>
        </div>
        <div class="item ml42">
          <p class="p1" style="font-weight:550">{{list.totalCoursePlan}}</p>
          <p class="p2">我的课程</p>
        </div>
        <div class="h-line"></div>
        <div class="item">
          <p class="p1" style="font-weight:550">{{list.totalGroup}}</p>
          <p class="p2">我的群组</p>
        </div>
      </div>
      <div class="right">
        <div class="info">
          <p class="mb10">
            <span
              style="width:73px;font-size:12px;font-family:PingFangSC;font-weight:400;color:rgba(179,179,179,1);line-height:17px;"
            >大学/单位：</span>
            <span>{{list.universityName}}</span>
          </p>
          <p class="mb10">
            <span
              style="width:73px;font-size:12px;font-family:PingFangSC;font-weight:400;color:rgba(179,179,179,1);line-height:17px;"
            >所在专业：</span>
            <span>{{list.majorName}}</span>
          </p>
          <p class="mb10">
            <span
              style="width:73px;font-size:12px;font-family:PingFangSC;font-weight:400;color:rgba(179,179,179,1);line-height:17px;"
            >所在班级：</span>
            <span>{{list.clazz}}</span>
          </p>
        </div>
        <a href="javascript:;" class="edit" @click="editFun">编辑资料</a>
      </div>
    </div>
    <!--基础信息 start -->

    <!--echart 图表 start-->
    <div class="chart-info">
      <div class="chart-title">
        <i class="icon-chart"></i>
        <span>个人成长趋势</span>
      </div>
      <ul class="tab clearfix">
        <li :class="{'tab-item':true,'active':tabType==='排名'}" @click="tabClick('排名')">
          排名
          <i class="line"></i>
        </li>
        <li :class="{'tab-item':true,'active':tabType==='用时'}" @click="tabClick('用时')">
          用时
          <i class="line"></i>
        </li>
        <li :class="{'tab-item':true,'active':tabType==='得分'}" @click="tabClick('得分')">
          得分
          <i class="line"></i>
        </li>
      </ul>
      <div class="chart-box">
        <StuChaBox :tabType="tabType" :chartsList="chartsList" />
      </div>
      <div class="chart-footer">
        <p class="title">
          成长反馈语
          <!-- <SelectBox
            style="width:224px;height:32px;margin-left:20px"
            :selVal="backChannels"
            :list="backChannelsList"
            :input="(e)=>inputChange(e,'select','backChannels')"
          ></SelectBox>-->
        </p>
        <p class="p1">
          {{courseFeedback || `作为现代社会工作三大方法之一的个案工作是一个助人的历程， 是以个人或者个别家庭为服务对象，
          让其更好发挥功能。 其目的是帮助人们解决自身能力和资源无法解决的问题。
          社会工作注重伦理与实会工作等领域的案例` }}
        </p>
      </div>
    </div>
    <!--echart 图表 end-->
    <!--table start-->
    <div class="table">
      <div class="table-title">
        <div class="left">
          <i class="icon-book"></i>课程成绩统计列表
        </div>
        <div class="right">
          <SearchInput
            class="input"
            style="width:272px;height:32px"
            :value="searchVal"
            :placeHolder="'请输入'"
            :input="(e,type)=>inputChange(e,type,'searchVal')"
          ></SearchInput>
        </div>
      </div>
      <div class="table-box">
        <StuTableBox1 :tableList="tableList"></StuTableBox1>
        <PaginationItem :options="{page:page,limit:limit,total:total,cb:paginCb}" />
      </div>
    </div>
    <!--table end-->
  </div>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import StuChaBox from "../student/stuChaBox";
import TabChange from "../groupStaAnalysis/tabChange";
import StuTableBox1 from "./StuTableBox1";
import PaginationItem from "../group/paginationItem";
import SearchInput from "../teachers/searchInput";
import {
  planLearnStandard,
  planLearnCurric,
  studentFeedback
} from "../../service/groupApi";
import { tipsFail } from "../../utils/utils";
@Component({
  name: "NcesCenter",
  components: {
    StuChaBox,
    TabChange,
    StuTableBox1,
    PaginationItem,
    SearchInput
  }
})
export default class NcesCenter extends Vue {
  list = {};
  tabType = "得分"; //图表部分 tab 切换
  searchVal = ""; //搜索框的值
  timer = null;
  // tableTab = "全部"; //全部 已完成 未完成 切换

  page = 1; //当前页数
  limit = 10; //当前每页条数
  total = 0; //总条数 100

  tableList = [
    {
      id: 161, //唯一性标识
      coursePlanName: "52143121", //群名称
      score: 60, //得分
      cumulativeTime: 100, // 用时
      averageCumulativeTime: 100, //个人用时
      rank: 2 // 排名
    }
  ]; //table数据
  chartsList = {
    dataIPSxAxis: [],
    dataIPS: []
  }; //图表数据

  // 用时表格
  cumulativeTimes = [];
  // 排名
  ranks = [];
  // 得分
  scores = [];

  backChannels = {
    val: "3",
    label: "全部课程反馈语"
  }; //反馈语

  backChannelsList = []; //反馈语可选项数组

  courseFeedback = `作为现代社会工作三大方法之一的个案工作是一个助人的历程， 是以个人或者个别家庭为服务对象，
  让其更好发挥功能。 其目的是帮助人们解决自身能力和资源无法解决的问题。
  社会工作注重伦理与实会工作等领域的案例`; //反馈语

  // 获取基本信息
  created() {
    planLearnStandard({})
      .then(res => {
        if (res.code == "0") {
          this.list = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });

    // 表格和折线图接口
    planLearnCurric({ page: this.page, limit: this.limit }).then(res => {
      let list = [];
      // let score = [];
      let backList = [];
      if (res.code == "0") {
        // console.log(res);
        /*this.page = res.page.currPage;
        // // this.limit = res.page.limit;
        this.limit = res.page.totalCount;
        this.total = res.page.totalCount + 1;*/
        for (let i = 0; i < res.page.list.length; i++) {
          list.push(res.page.list[i].coursePlanName);

          this.scores.push(res.page.list[i].score);
          this.cumulativeTimes.push(res.page.list[i].cumulativeTime);
          this.ranks.push(res.page.list[i].rank);

          backList.push({
            val: res.page.list[i].coursePlanId,
            label: res.page.list[i].coursePlanName
          });
        }
      }
      this.chartsList.dataIPSxAxis = list;
      this.chartsList.dataIPS = this.scores;
      // 下拉框 反馈语
      this.backChannelsList = backList;
      this.studentFeedbackFun();
    });
    this.paginCb(1, this.limit);
  }

  //edit 编辑按钮点击事件
  @Emit editFun() {
    this.$router.push("/personals");
  }

  //学习计划反馈语
  @Emit studentFeedbackFun(id = "") {
    studentFeedback({
      coursePlanId: id
    }).then(res => {
      if (res.code == 0) {
        this.courseFeedback = res.data;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //图表 tab切换
  @Emit tabClick(val) {
    this.tabType = val;
    // console.log(val == "用时");
    if (val == "用时") {
      this.chartsList.dataIPS = this.cumulativeTimes;
      // this.dataIPSxAxis = this.
      // console.log(this.chartsList.dataIPSxAxis);
    } else if (val == "得分") {
      this.chartsList.dataIPS = this.scores;
    } else if ((val = "人均")) {
      this.chartsList.dataIPS = this.ranks;
    }
  }

  //下拉选择框改变事件
  @Emit inputChange(e, type, name) {
    if (type === "select") {
      if (this[name].val !== e.val) {
        //this.setTimeFun();
        let val = e.val;
        this.studentFeedbackFun(val);
      }
      this[name] = e;
    } else if ("input") {
      if (this[name] !== e.target.value) {
        this[name] = e.target.value;
        this.paginCb(1, this.limit);
      }
    }
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

      coursePlanName: this.searchVal //
    };
    planLearnCurric(opt).then(res => {
      if (res.code == 0) {
        this.tableList = res.page.list;
        this.total = res.page.totalCount;
      } else {
        tipsFail(res.msg);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
.main-content {
  width: 1200px;
  margin: 0 auto;
  padding-top: 22px;
}
.top-title {
  display: flex;
  align-items: center;
  @include fontSet(22px, #000, 600);
  margin-bottom: 24px;
  .line {
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 23px;
    background: rgba(254, 120, 101, 1);
    border-radius: 3px;
    margin-right: 12px;
  }
}
.base-info {
  // box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
  background: rgba(251, 251, 251, 1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 50px;
  .left {
    display: flex;
    align-items: center;
    position: relative;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    // .imgb {
    //   @include bg("../../assets/img/boy.png");
    // }
    // .imgg {
    //   @include bg("../../assets/img/girl.png");
    // }
    .person {
      margin-left: 16px;
      position: relative;
      .p1 {
        height: 28px;
        overflow: hidden;
        @include fontSet(20px, #333, 500);
        margin-bottom: 5px;
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin: 0 1px;
        }
        .boy {
          @include bg("../../assets/img/boyb.svg");
        }
        .girl {
          @include bg("../../assets/img/girlg.svg");
        }
        span {
          padding: 1px 6px;
          @include fontSet(12px, #fe7865, 400);
          border-radius: 5px;
          border: 1px solid rgba(254, 120, 101, 1);
          line-height: 17px;
          text-align: center;
          position: absolute;
          top: 4px;
          right: 0;
        }
      }
      .p2 {
        @include fontSet(16px, #999, 400);
      }
    }
    .item {
      text-align: center;
      width: 109px;
      .p1 {
        font-size: 22px;
        color: #fe7865;
        margin-bottom: 9px;
      }
      .p2 {
        @include fontSet(12px, #b3b3b3, 400);
      }
    }
    .ml42 {
      margin-left: 42px;
    }
    .h-line {
      width: 1px;
      height: 31px;
      background: #edeff2;
      // 定位
      position: absolute;
      top: 25px;
      right: 109px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    padding-top: 1px;
    padding-bottom: 2px;
    .info {
      p {
        display: flex;
        align-items: center;
        @include fontSet(12px, #b3b3b3, 400);
        span {
          display: inline-block;
          width: 290px;
          @include fontSet(14px, #666, 400);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 20px;
        }
      }
      .mb10 {
        margin-bottom: 10px;
      }
      .mb10:last-child {
        margin-bottom: 0px;
      }
    }
    .edit {
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      border: 1px solid rgba(204, 204, 204, 1);
      @include fontSet(16px, #999, 500);
      margin-left: 44px;
    }
  }
}

.chart-info {
  margin-bottom: 70px;
  .chart-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 29px;
    .icon-chart {
      display: inline-block;
      width: 40px;
      height: 40px;
      vertical-align: middle;
      background: url("../../assets/groupStaAnalysis/chart.svg") no-repeat;
      background-size: 100% auto;
      position: absolute;
      left: -9px;
      top: -5px;
    }
    span {
      @include fontSet(21px, #666, 600);
      margin-right: 12px;
      line-height: 29px;
    }
  }
  .tab {
    li {
      float: right;
      min-width: 50px;
      text-align: center;
      @include fontSet(16px, #999, 400);
      margin-left: 56px;
      cursor: pointer;
    }
    .active {
      color: #333;
      .line {
        display: block;
        margin: 0 auto;
        height: 4px;
        background: rgba(254, 120, 101, 1);
        margin-top: 9px;
        width: 28px;
        border-radius: 2px;
      }
    }
  }
  .chart-box {
    height: 364px;
  }
  .chart-footer {
    @include fontSet(16px, #333, 500);
    margin-top: 64px;
    .title {
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-bottom: 25px;
    }
    .p1 {
      width: 768px;
      @include fontSet(14px, #999, 400);
      font-family: PingFangSC;
      line-height: 28px;
    }
  }
}

/* table  部分 */
.table-title {
  display: flex;
  position: relative;
  padding-left: 29px;
  justify-content: space-between;
  .left {
    font-size: 21px;
    color: #666;
    font-weight: 600;
    line-height: 29px;
    margin-right: 12px;
    .icon-book {
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 40px;
      background: url("../../assets/groupStaAnalysis/book.svg") no-repeat;
      background-size: 100% auto;
      position: absolute;
      left: -9px;
      top: -5px;
    }
  }
  .right {
    & /deep/ {
      input {
        padding: 5px 12px;
        padding-right: 28px;
      }
      .icon-search {
        right: 6px;
        top: 6px;
        left: auto;
      }
    }
  }
}
</style>
