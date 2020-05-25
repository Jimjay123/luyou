/**

* Created by wangxin

* @date 2019/11/6 11:28

*/
<template>
  <div class="report">
    <div class="content">
      <!--顶部 课程名称  start-->
      <div class="top">
        <div class="title">
          <div class="bg">
            <span class="p1">智能反馈报告：</span>
            <span class="p2">{{msgList.coursePlanName}}</span>
            <span class="p3">{{msgList.memberName}}</span>
          </div>
        </div>
        <div class="clearfix">
          <a class="btn" @click="downReportFun" href="javascript:;"></a>
          <a class="cancel" @click="cancelFun" href="javascript:;"></a>
        </div>
      </div>
      <!--顶部 课程名称  end-->

      <!--报告内容 start-->
      <div class="report-content">
        <!--<Vuescroll :ops="ops">-->
        <div class="clearfix">
          <div class="card yellow w248">
            <p class="score">
              <span class="s1">最终得分</span>
              <span class="s2">生成于{{msgList.modifyDatetime}}</span>
            </p>
            <div class="s-bottom clearfix flexItem">
              <div class="sb-l w122">
                <span>{{msgList.maxScore}}</span>分
              </div>
              <div class="sb-r"></div>
            </div>
          </div>
          <div class="card w319 bgWhite borRadius10">
            <p class="score">
              <span class="point"></span>
              <span class="s2-title">排名</span>
            </p>
            <div class="s-bottom clearfix sort">
              <div class="sb-l pd24">
                <div class="flexItem">
                  <div class="txLeft">
                    <span>{{msgList.rank}}</span>名
                  </div>
                  <div class="win">
                    击败了
                    <span class="color666">{{msgList.overPercent}}%</span>的同学
                  </div>
                </div>
                <div class="progress">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="card w281 bgWhite borRadius10">
            <p class="score">
              <span class="point"></span>
              <span class="s2-title">完成情况</span>
            </p>
            <div class="s-bottom clearfix">
              <div class="sb-l flexItem pd24 completed">
                <div>
                  <span class="mr6">{{msgList.totalInteractionType}}</span>种互动方式
                  <br />
                  <span class="w-line"></span>
                </div>
                <span class="line"></span>
                <div class="pdl23">
                  <span class="mr6">{{msgList.totalQuiz || 0}}</span>个步骤
                  <br />
                  <span class="w-line"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="card w160 bgWhite borRadius10">
            <p class="score">
              <span class="point"></span>
              <span class="s2-title">信效度</span>
            </p>
            <div class="s-bottom clearfix reliability">
              <div class="sb-l">
                <span>{{msgList.realPercent}}</span>
                <div class="bg-b"></div>
              </div>
            </div>
          </div>
        </div>

        <!--图表内容 start-->
        <!-- <div class="echarts">
          <p class="score">
            <span class="point"></span>
            <span class="s2-title">信效度</span>
          </p>
          <div class="echarts-box">
            <TabBox :tabType="tabType" :tabCbFun="tabTypeCbFun" :list="tabBoxList" />
            <div class="box" style="width:100%">
              <TeaChartBox :tabType="tabType" :chartsList="chartsList" />
            </div>
          </div>
        </div>-->

        <div class="echarts">
          <p class="score">
            <span class="point"></span>
            <span class="s2-title">信效度</span>
          </p>
          <div class="echarts-box">
            <ul class="tab clearfix">
              <!-- <li :class="{'tab-item':true,'active':tabType==='各步骤得分'}"> -->
              <li class="active tab-item">
                各步骤得分
                <i class="line"></i>
              </li>
            </ul>
            <div class="box" style="width:100%">
              <StuChaBox :tabType="tabType" :chartsList="chartsList" />
            </div>
          </div>
        </div>

        <!--图表内容 end-->

        <!--反馈语 start-->
        <div class="Feedback">
          <p class="score">
            <span class="point"></span>
            <span class="s2-title">反馈语</span>
          </p>
          <div class="box">
            <i></i>
            <p>{{feedBackWord}}</p>
          </div>
        </div>
        <!--反馈语 end-->
        <!--</Vuescroll>-->
      </div>
      <!--报告内容 start-->
    </div>
  </div>
</template>

<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
import TabBox from "../../groupStaAnalysis/tabBox";
// import TeaChartBox from "../../teachers/TeaChartBox";
import StuChaBox from "../../student/stuChaBox";
import { cloneObj, tipsMsg } from "../../../utils/utils";
import {
  studentCoursePlan,
  studentCoursestatistics,
  studentCourseStep,
  studentFeedbackWord
} from "../../../service/groupApi";
import Vuescroll from "vuescroll";
import { State, Action, namespace } from "vuex-class";
const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "SandTableReport",
  components: {
    TabBox,
    // TeaChartBox,
    Vuescroll,
    StuChaBox
  }
})
export default class SandTableReport extends Vue {
  @SandTableMod.State("report") report; //当前编辑模块的下标
  @SandTableMod.Action("reportHandle") reportHandle; //当前编辑模块的下标  action

  msgList = {};
  feedBackWord = "";
  tabType = "成绩区间统计"; //图表选中项
  tabBoxList = ["各课程平均分", "成绩区间统计"]; //图表切换

  chartsList = {
    dataIPSxAxis: ["步骤一", "步骤二", "步骤三", "步骤四", "步骤五", "步骤六"],
    dataIPS: [20, 60, 50, 80, 120, 100]
  };

  memberData = {
    dataIPSxAxis: ["50分以下", "50~60", "60~70", "70~80", "80~90", "90~100"],
    dataIPS: [20, 60, 50, 80, 120, 100]
  }; //成绩区间统计
  courseData = {
    dataIPSxAxis: ["50分以下", "50~60", "60~70", "70~80", "80~90", "90~100"],
    dataIPS: [20, 60, 50, 80, 120, 100]
  }; //各课程平均分
  feedbackList = [
    "作为现代社会工作三大方法之一的个案工作是一个助人的历程，是以个人或个别家庭为服务对象，让其更好发挥社会功能。其目的是帮助人们解决本身能力和资源无法解决的问题。社会工作注重理论与实会工作等领域）的案例，",
    "作为现代社会工作三大方法之一的个案工作是一个助人的历程，是以个人或个别家庭为服务对象，让其更好发挥社会功能。其目的是帮助人们解决本身能力和资源无法解决的问题。社会工作注重理论与实会工作等领域）的案例，",
    "作为现代社会工作三大方法之一的个案工作是一个助人的历程，是以个人或个别家庭为服务对象，让其更好发挥社会功能。其目的是帮助人们解决本身能力和资源无法解决的问题。社会工作注重理论与实会工作等领域）的案例，",
    "作为现代社会工作三大方法之一的个案工作是一个助人的历程，是以个人或个别家庭为服务对象，让其更好发挥社会功能。其目的是帮助人们解决本身能力和资源无法解决的问题。社会工作注重理论与实会工作等领域）的案例，",
    "作为现代社会工作三大方法之一的个案工作是一个助人的历程，是以个人或个别家庭为服务对象，让其更好发挥社会功能。其目的是帮助人们解决本身能力和资源无法解决的问题。社会工作注重理论与实会工作等领域）的案例，"
  ]; //反馈语

  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: true,
      background: "#c1c1c1",
      opacity: 0,
      hoverStyle: true,
      specifyBorderRadius: false,
      minSize: false,
      size: "6px",
      disable: false
    },
    scrollPanel: {
      scrollingX: true,
      initialScrollY: 10
    }
  }; //滚动条设置

  //图表数据
  // get chartsList() {
  //   if (this.tabType === "各课程平均分") {
  //     return cloneObj(this.memberData);
  //   } else if (this.tabType === "成绩区间统计") {
  //     return cloneObj(this.courseData);
  //   }
  //   return {};
  // }

  //tab切换
  tabTypeCbFun(val) {
    this.tabType = val;
  }

  //弹框关闭
  cancelFun() {
    // let router = this.$route.path;
    // router = router.replace("/report", "");
    // this.$router.push({
    //   path: router,
    //   query: this.$route.query
    // });
    let report = false;
    this.reportHandle({
      report
    });
  }

  //下载报告
  downReportFun() {
    tipsMsg("功能开发中");
  }

  //获取数据计算
  getEchartsInfo(list) {
    let memberData = {
      dataIPSxAxis: [],
      dataIPS: []
    }; //成员数量
    let courseData = {
      dataIPSxAxis: [],
      dataIPS: []
    }; //课程计划数
    let timeData = {
      dataIPSxAxis: [],
      dataIPS: []
    }; //人均使用时长

    let courseList = []; //标准课数组
    list.map(item => {
      memberData.dataIPSxAxis.push(item.name);
      memberData.dataIPS.push(item.totalStudent);

      courseData.dataIPSxAxis.push(item.name);
      courseData.dataIPS.push(item.totalCoursePlan);

      timeData.dataIPSxAxis.push(item.name);
      timeData.dataIPS.push(item.averageCumulative);

      courseList.push({
        val: item.id, //群id
        label: item.name
      });
    });

    this.memberData = cloneObj(memberData);
    this.courseData = cloneObj(courseData);
  }

  created() {
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.courId;
    studentCoursePlan({ groupId: groupId, coursePlanId: coursePlanId })
      .then(res => {
        if (res.code == "0") {
          let courseId = res.data.refKeyId;
          // 获取反馈
          studentFeedbackWord({
            groupId: groupId,
            coursePlanId: coursePlanId,
            courseId: courseId
          })
            .then(res => {
              // console.log(res);
              if (res.code == "0") {
                this.feedBackWord = res.data;
              }
            })
            .catch(err => {
              console.log(err);
            });
          studentCourseStep({
            courseId,
            groupId: groupId,
            coursePlanId: coursePlanId
          })
            .then(res => {
              let list = [];
              let score = [];
              if (res.code == "0") {
                for (let i = 0; i < res.list.length; i++) {
                  list.push(res.list[i].lessonName);
                }
                for (let i = 0; i < res.list.length; i++) {
                  score.push(res.list[i].score);
                }
              }
              this.chartsList.dataIPSxAxis = list;
              this.chartsList.dataIPS = score;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    studentCoursestatistics({
      groupId: groupId,
      coursePlanId: coursePlanId
    })
      .then(res => {
        if (res.code == "0") {
          this.msgList = res.data;
          let modifyDatetime = this.msgList.modifyDatetime;
          this.msgList.modifyDatetime = modifyDatetime.substring(0, 16);
          // let modifyDatetime = this.msgList.modifyDatetime.substring(0, 16);
          // let time = this.msgList.modifyDatetime.split("", 16);
          // console.log(modifyDatetime);
          // console.log(time);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
@mixin overflowPoint() {
  white-space: nowrap; //不换行
  overflow: hidden; //超出隐藏
  text-overflow: ellipsis; //变成...
}

.report {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 210;
  overflow-y: auto;
  padding-bottom: 60px;
}

.content {
  display: block;
  width: 1108px;
  margin: 0 auto;
}

.top {
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    display: inline-block;
    @include overflowPoint;
    height: 44px;
    background: #ffc53dff;
    border-radius: 8px;
    .bg {
      height: 40px;
      line-height: 40px;
      background: #fef7e6ff;
      border-radius: 8px;
      padding: 0 18px;
      font-size: 16px;
    }
    .p1 {
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .p2 {
      font-weight: 400;
      color: rgba(77, 77, 77, 1);
    }
    .p3 {
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }
  a {
    float: left;
    vertical-align: middle;
  }
  .btn {
    width: 111px;
    height: 44px;
    background: url("../../../assets/creator/sandTableReport/d-report.svg")
      no-repeat;
    margin-right: 20px;
  }
  .cancel {
    width: 32px;
    height: 32px;
    background: url("../../../assets/creator/sandTableReport/cancel.svg")
      no-repeat;
    margin-top: 6px;
  }
}

.report-content {
  background: rgba(255, 255, 255, 0.75);
  border-radius: 19px;
  border: 2px solid rgba(255, 255, 255, 1);
  margin-top: 6px;
  padding: 36px 19px;
  //height:calc( 100vh - 170px );
  overflow-y: auto;
  .card {
    height: 122px;
    margin-right: 19px;
    float: left;
  }
  .card:last-child {
    margin-right: 0;
  }
  .yellow {
    background: #ffc53dff;
    border-radius: 10px;
  }
  .w248 {
    width: 248px;
  }
  .bgWhite {
    background: #fff;
  }
  .borRadius10 {
    border-radius: 10px;
  }
  .score {
    height: 34px;
    line-height: 34px;
    padding: 0 13px;
    color: #fff;
    .s1 {
      font-size: 16px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      margin-right: 13px;
    }
    .s2 {
      font-size: 12px;
    }
  }
  .s-bottom {
    height: 88px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    .sb-l {
      font-size: 12px;
      color: #666666ff;
      text-align: right;
      height: 88px;
      line-height: 88px;
      span {
        font-size: 32px;
        font-family: GalanoGrotesqueDEMO-Bold, GalanoGrotesqueDEMO;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
    .sb-r {
      float: left;
      width: 126px;
      height: 88px;
      background: url("../../../assets/creator/sandTableReport/completed.svg")
        no-repeat;
      background-size: 126px 88px;
    }
  }
  .w319 {
    width: 319px;
  }
  .w281 {
    width: 281px;
  }
  .w160 {
    width: 160px;
  }
  .w122 {
    width: 122px;
  }
  .pd13 {
    padding: 0 13px;
  }
  .pd24 {
    padding: 0 24px;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .txLeft {
    text-align: left;
  }
  .flexItem {
    display: flex;
    justify-content: space-between;
  }
  .color666 {
    color: #666f;
  }
  .point {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: rgba(254, 120, 101, 1);
    border-radius: 50%;
  }
  .s2-title {
    font-size: 12px;
    font-weight: 500;
    color: #333333ff;
  }
  .s-bottom .win {
    span {
      font-size: 18px;
      font-weight: 600;
      margin: 0 5px;
      color: #666f;
    }
  }
  .progress {
    height: 5px;
    background: rgba(242, 242, 242, 1);
    border-radius: 3px;
    text-align: left;
    span {
      float: left;
      width: 60%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 3px;
    }
  }
  .sort {
    .sb-l {
      padding-top: 10px;
      padding-bottom: 20px;
      div {
        line-height: normal;
      }
      .flexItem {
        align-items: flex-end;
        margin-bottom: 12px;
      }
    }
  }
  .completed {
    padding-top: 15px;
    div {
      width: 50%;
      text-align: left;
      line-height: normal;
    }
    .pdl23 {
      padding-left: 23px;
    }
    .mr6 {
      margin-right: 6px;
    }
    .line {
      display: inline-block;
      width: 1px;
      height: 60px;
      background: rgba(240, 240, 240, 1);
    }
    .w-line {
      display: inline-block;
      width: 20px;
      height: 5px;
      background: rgba(254, 120, 101, 1);
      border-radius: 3px;
    }
  }
  .reliability {
    .sb-l {
      text-align: center;
      line-height: normal;
      padding-top: 15px;
      .bg-b {
        width: 100%;
        height: 26px;
        background: url("../../../assets/creator/sandTableReport/reliability.svg")
          no-repeat;
        background-size: 100% 26px;
        margin-top: 6px;
      }
    }
  }

  .echarts {
    margin-top: 16px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    .echarts-box {
      padding: 24px 32px 32px 32px;
    }
    .box {
      height: 364px;
    }
  }

  .Feedback {
    margin-top: 16px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    overflow: hidden;
    padding-bottom: 14px;
    .box {
      margin: 0 14px;
      i {
        float: left;
        width: 14px;
        height: 14px;
        background: url("../../../assets/creator/sandTableReport/icon-msg.svg")
          no-repeat;
        background-size: 14px 14px;
        margin-top: 8px;
      }
      p {
        margin-left: 22px;
        width: 768px;
        font-size: 14px;
        line-height: 28px;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
}

.tab {
  li {
    float: right;
    min-width: 50px;
    text-align: center;
    font-size: 16px;
    color: #999;
    font-weight: 400;
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
      margin: 8px 20px 0px 20px;
      width: 28px;
      border-radius: 2px;
    }
  }
}
.chart-box {
  height: 364px;
}
</style>
