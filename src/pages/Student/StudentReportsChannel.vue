<template>
  <div class="require">
    <el-container>
      <!-- 头部 -->
      <TopHeaderp class="clearfix"></TopHeaderp>
      <!-- 内容 -->
      <el-main clearfix>
        <!-- 课程计划 -->
        <div class="Analysis">
          <div class="fh">
            <a href="javascript:;" onClick="javaScript:history.go(-1)">
              <img src="../../assets/img/fanhui1.svg" alt />
              <span>返回</span>
            </a>
          </div>
          <div class="titlePic clearfix" @click="goCourseDetails">
            <img :src="list.popularizeImageUrl" alt class="imgsr1" />
            <img
              :src="list.popularizeImageUrl"
              alt
              class="imgsr2"
              v-if="list.coursePlanType == '23' ||list.coursePlanType == '24'"
            />
            <img
              :src="list.popularizeImageUrl"
              alt
              class="imgsr3"
              v-if="list.coursePlanType == '23' ||list.coursePlanType == '24'"
            />
            <div class="corner" v-if="list.coursePlanType === 23">频道</div>
            <div class="sandchannel" v-if="list.coursePlanType == 24">沙盘频道</div>
            <img src="../../assets/img/duration.svg" alt class="imgr" />
            <span class="duration">{{list.duration}}分钟</span>
          </div>
          <!-- <div class="timeOver">
            <img src="../../assets/img/time.png" alt />
            <span class="bigDuration">{{list.duration}} 分钟</span>
          </div>-->
          <div class="fx">
            <h3>{{list.coursePlanName}}</h3>
            <span class="oo1">{{list.coursePlanType == 23 ? '课程频道' : '沙盘课程频道'}}</span>
            <span class="oo2">{{list.duration}}分钟 · {{list.totalBundle}}章</span>
            <div class="oo3">
              <img src="../../assets/img/jiezhiriqi.svg" alt />
              <span>{{list.endDate}} 截止</span>
            </div>
            <!-- <div class="cs1">
              <span v-for="(item, index) in tagNameList" :key="index">{{item}}</span>
            </div>
            <div class="names">
              <img :src="list.ownerAvatar" alt class="w1" />
              <span class="w2">{{list.ownerName}}</span>
              <img src="../../assets/img/v1.svg" alt class="w3" />
              <span class="w4">/{{list.orgName}}</span>
            </div>-->
            <div class="csd">
              <img src="../../assets/img/red.svg" alt class="imr" />
              <div class="cs1" v-for="(item, index) in tagNameList" :key="index">
                <span>{{item}}</span>
              </div>
            </div>
            <div class="names">
              <img
                :src="list.ownerAvatar || require('../../assets/img/touxiang.svg')"
                alt
                class="w1"
              />
              <span class="w2">{{list.ownerName}}</span>
              <img src="../../assets/img/v1.svg" alt class="w3" v-if="list.ownerLevel != 0" />
              <span class="w4">/{{list.orgName}}</span>
            </div>
            <div class="df">
              <!-- 完成的大图片 完成显示 -->
              <img
                src="../../assets/img/yiwancheng.svg"
                alt
                class="i1"
                v-if="list.score === 100 ? true :false"
              />
              <img
                src="../../assets/img/yiguoqi.svg"
                alt
                class="i1"
                v-if="list.finishFlag === true? true:false"
              />
              <span class="d1">得分</span>
              <span class="f2">{{msgList.studentScore || 0}}</span>
              <img src="../../assets/img/xiahuaxian.svg" alt class="i2" />
              <span
                class="c3"
                v-if="isShowCourseDetails===true"
                @click="goCourseDetails"
                style="cursor:pointer"
              >课程详情</span>
              <!-- <span class="c3" v-if="list.finishFlag === true? true:false">去学习</span> -->
              <el-row>
                <el-button @click="updownReport">下载报告</el-button>
              </el-row>
            </div>
          </div>
        </div>

        <!-- 表格echart  start -->
        <div class="chart-info">
          <div class="chart-title">
            <i class="icon-chart"></i>
            <span>个人成绩统计表</span>
            <!-- 下拉框 -->
            <el-select v-model="value" placeholder="请填写" @change="getValue(value)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- 个人成绩统计 -->
          <div class="Stucard">
            <el-row :gutter="20">
              <!-- 1 -->
              <el-col :span="7">
                <el-card shadow="always">
                  <p>最终得分</p>
                  <div>
                    <span
                      style="float: left; font-size: 30px; font-weight: 700;font-family:Bebas;line-height:39px;"
                    >{{msgList.studentScore}}</span>
                    <span
                      style="float: left; font-size: 12px; color: #ccc; padding: 18px 0px 0px 5px"
                    >分</span>
                    <span
                      style="float: right; font-size: 20px; padding: 12px 0px 0px 0px; font-weight: 700 "
                    >{{msgList.maxScore}}</span>
                    <span
                      style="float: right; font-size: 12px;color: #ccc; padding: 18px 5px 0px 0px"
                    >最高的分</span>
                    <img class="firstImg" src="../../assets/img/buzhoutiao.png" alt />
                  </div>
                </el-card>
              </el-col>
              <!-- 2 -->
              <el-col :span="7">
                <el-card shadow="always">
                  <p>排名</p>
                  <div style="margin-bottom: 30px">
                    <span style="float: left; font-size: 30px; font-weight: 700 ">{{msgList.rank}}</span>
                    <span
                      style="float: left; font-size: 12px; color: #ccc; padding: 18px 0px 0px 5px"
                    >名</span>
                    <span
                      style="float: right; font-size: 12px;color: #ccc; padding: 18px 0px 0px 5px "
                    >的同学</span>
                    <span
                      style="float: right; font-size: 20px; padding: 12px 0px 0px 0px; font-weight: 700 "
                    >{{msgList.overPercent}}%</span>
                    <span
                      style="float: right; font-size: 12px;color: #ccc; padding: 18px 5px 0px 0px"
                    >击败了</span>
                    <img src alt />
                  </div>
                  <div class="kk">
                    <div class="progress" :style="{width:(msgList.overPercent||0) + '%'}"></div>
                  </div>
                  <!-- <el-progress
                    :percentage="msgList.overPercent"
                    :text-inside="true"
                    :stroke-width="5"
                    color="#FE7865"
                  ></el-progress>-->
                </el-card>
              </el-col>
              <!-- 3 -->
              <el-col :span="7">
                <el-card shadow="always">
                  <p>完成情况</p>
                  <div>
                    <el-row :gutter="50">
                      <el-col :span="12">
                        <span
                          style="font-size: 30px; font-weight: 700"
                        >{{msgList.totalInteractionType}}</span>
                        <span style="font-size: 12px;color: #ccc; padding: 18px 0px 0px 5px">种互动形式</span>
                        <span class="lineDuna"></span>
                      </el-col>
                      <div class="line"></div>
                      <el-col :span="12">
                        <span style="font-size: 30px; font-weight: 700">{{msgList.totalCourse}}</span>
                        <span style="font-size: 12px;color: #ccc; padding: 18px 0px 0px 5px">个课程</span>
                        <span class="lineDunabu"></span>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
              <!-- 4 -->
              <el-col :span="3" class="credibility">
                <el-card shadow="always">
                  <p>可信度</p>
                  <div class="credible">
                    <span>{{msgList.realPercent}}</span>
                  </div>
                  <img class="secondImg" src="../../assets/img/credibility.svg" alt />
                </el-card>
              </el-col>
            </el-row>
          </div>
          <!-- 点击切换 tab -->
          <StuTabChange :tabCbFun="tabClick" :list="tabList" :tabType="tabType" />
          <div class="chart-box">
            <StuChaBox :tabType="tabType" :chartsList="chartsList" />
          </div>
          <div class="chart-footer" v-show="value">
            <p class="title">反馈语</p>
            <p class="p1">{{feedBackWord}}</p>
          </div>
        </div>
        <!-- 表格echart  end -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import StuChaBox from "../student/stuChaBox";
import StuTabChange from "./stuTabChange";
import { cloneObj, tipsFail, tipsMsg } from "../../utils/utils";
import {
  studentCoursePlan,
  studentCoursestatistics,
  studentCurriculum,
  studentStepSwitching,
  studentFeedbackWord,
  studentCourseStep
} from "../../service/groupApi";
import TopHeaderp from "../Header/headerp";

export default {
  data() {
    return {
      list: [],
      // 信息列表
      msgList: {},
      // none: false,
      // card: false,
      value: "",
      options: [],
      progreess: 80,
      progreessDuan: 20,
      tagNameList: [],
      learningLessonList: [],
      tabType: "各课程得分",
      tabList: ["各课程用时", "各课程得分"], //
      chartsList: {
        //x轴数据
        dataIPSxAxis: [],
        dataIPS: []
      }, //图表数据
      groupId: "",
      coursePlanId: "",
      courseId: -1,
      // 各课程用时
      cumulativeTimes: [],
      // 各课程得分
      scores: [],
      // 反馈语
      feedBackWord: "",
      isShowCourseDetails: true //是否显示课程详情字段
    };
  },
  created() {
    this.groupId = this.$route.query.groupId;
    this.coursePlanId = this.$route.query.coursePlanId;

    // studentCourseStep()

    // 上面的信息
    studentCoursePlan({
      groupId: this.groupId,
      coursePlanId: this.coursePlanId
    })
      .then(res => {
        // console.log(res);
        if (res.code == "0") {
          this.list = res.data;
          this.tagNameList = res.data.tagNameList;
          this.learningLessonList = res.data.learningLessonList;
          this.faqsList = res.data.faqsList;
          this.courseId = res.data.refKeyId;
        } else {
          console.log(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });

    // 下面的信息 百分比
    studentCoursestatistics({
      groupId: this.groupId,
      coursePlanId: this.coursePlanId
    }).then(res => {
      // console.log(res);
      if (res.code == "0") {
        this.msgList = res.data;
      }
    });

    this.studentCurriculumFun(); //获取课程计划图表数据
  },
  methods: {
    // 跳转课程详情页
    goCourseDetails() {
      let type = this.list.coursePlanType;
      this.$router.push({
        path: "/StudentChannel",
        query: {
          groupId: this.groupId,
          coursePlanId: this.coursePlanId,
          coursePlanType: type
        }
      });
    },
    //下载报告
    updownReport() {
      tipsMsg("功能开发中");
    },
    //图表 tab切换
    tabClick(val) {
      this.tabType = val;
      if (val == "各课程得分") {
        this.chartsList.dataIPS = this.scores;
      } else if (val == "各课程用时") {
        this.chartsList.dataIPS = this.cumulativeTimes;
      }
    },
    getValue(val) {
      // 点击获取步骤id =>  切换对应id的 echart
      this.isShowCourseDetails = val === 0 ? true : false;
      this.value = val;
      if (val) {
        this.tabType = "各步骤得分";
        this.tabList = ["各步骤得分"]; //
        this.studentStepSwitchingFun();
        // 获取反馈
        studentFeedbackWord({
          groupId: this.groupId,
          coursePlanId: this.coursePlanId,
          courseId: this.value
        })
          .then(res => {
            // console.log(res);
            if (res.code == "0") {
              this.feedBackWord = res.data;
            }
          })
          .catch(err => {
            tipsFail(err);
          });
      } else {
        this.tabType = "各课程得分";
        this.tabList = ["各课程用时", "各课程得分"]; //
        this.studentCurriculumFun(); //
      }
    },
    //获取标准课图表数据
    studentStepSwitchingFun() {
      studentStepSwitching({
        groupId: this.groupId,
        coursePlanId: this.coursePlanId,
        courseId: this.value
      }).then(res => {
        let list = [];
        let score = [];
        if (res.code == "0") {
          for (let i = 0; i < res.list.length; i++) {
            list.push(res.list[i].lessonName);
            score.push(res.list[i].score);
          }
        }
        this.chartsList.dataIPSxAxis = list;
        this.chartsList.dataIPS = score;
      });
    },
    //获取课程频道图表数据
    studentCurriculumFun() {
      //获取课程频道图表数据
      studentCurriculum({
        groupId: this.groupId,
        coursePlanId: this.coursePlanId
      }).then(res => {
        let list = [];
        let opts = [
          {
            value: 0,
            label: "全部"
          }
        ];
        let scores = [];
        let cumulativeTimes = [];
        if (res.code == "0") {
          for (let i = 0; i < res.list.length; i++) {
            list.push(res.list[i].courseName);
            scores.push(res.list[i].score);
            cumulativeTimes.push(res.list[i].cumulativeTime);
            opts.push({
              value: res.list[i].courseId,
              label: res.list[i].courseName
            });
          }
        }
        this.chartsList.dataIPSxAxis = list;
        this.chartsList.dataIPS = cloneObj(scores);
        this.scores = cloneObj(scores);
        this.cumulativeTimes = cloneObj(cumulativeTimes);
        this.options = opts;
        this.value = opts[0].value;
      });
    }
  },

  components: {
    TopHeaderp: TopHeaderp, //头部样式注册该组件
    StuChaBox: StuChaBox,
    StuTabChange: StuTabChange
  }
};
</script>

<style lang="less" scoped>
.el-container {
  margin: 0 auto;
  width: 100%;
}

.el-main {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  padding: 0;
  overflow: hidden;
  margin-top: 60px;
  z-index: -2;
  // height: 1000px;
  .Analysis {
    position: relative;
    height: 283px;
    padding-bottom: 66px;
    .fh {
      height: 48px;
      line-height: 48px;
      a {
        height: 48px;
        line-height: 48px;
        img {
          // margin-top: 14px;
          width: 12px;
          height: 22px;
        }
        span {
          margin-left: 4px;
          font-size: 13px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .titlePic {
      position: relative;
      float: left;
      width: 280px;
      height: 170px;
      .imgsr1 {
        position: absolute;
        width: 280px;
        height: 170px;
        top: 0;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 12px;
        transition: 0.2s;
        opacity: 1;
        z-index: 9;
        cursor: pointer;
      }
      .imgsr2 {
        position: absolute;
        top: 6px;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 8px;
        transition: 0.2s;
        opacity: 0.5;
        transform: scaleX(0.97);
        z-index: 8;
      }
      .imgsr3 {
        position: absolute;
        top: 12px;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 8px;
        transition: 0.2s;
        opacity: 0.189;
        transform: scaleX(0.95);
        z-index: 7;
      }
      .corner {
        position: absolute;
        top: 0;
        width: 54px;
        height: 30px;
        background: rgba(254, 120, 101, 1);
        border-radius: 8px 0px 8px 0px;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        z-index: 91;
        transition: 0.2s;
        z-index: 9;
      }
      .sandchannel {
        position: absolute;
        top: 0px;
        width: 88px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 8px 0px 8px 0px;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        z-index: 91;
        transition: 0.2s;
      }
      .imgr {
        position: absolute;
        bottom: 9px;
        right: 76px;
        transition: 0.2s;
        z-index: 9;
      }
      .duration {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 0px 0px 12px 12px;
        position: absolute;
        bottom: 9px;
        left: 213px;
        transition: 0.2s;
        z-index: 9;
      }
    }
    .fx {
      float: left;
      margin-left: 50px;
      h3 {
        font-size: 26px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 37px;
        letter-spacing: 1px;
        margin-bottom: 4px;
      }
      .oo1 {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
        margin-right: 32px;
      }
      .oo2 {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(254, 120, 101, 1);
        line-height: 22px;
      }
      .oo3 {
        float: right;
        margin-right: 100px;
        padding-left: 32px;
        line-height: 22px;
        img {
          margin-top: -3px;
          width: 14px;
          height: 14px;
        }
        span {
          margin-left: 3px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
        }
      }
      .csd {
        overflow: hidden;
        margin-top: 50px;
        height: 20px;
        width: 613px;
        .imr {
          width: 40px;
          height: 20px;
          margin-right: 11px;
          float: left;
        }
        .cs1 {
          float: left;
          span {
            float: left;
            text-align: center;
            padding: 1px 4px 1px 4px;
            font-size: 12px !important;
            font-family: PingFangSC;
            background: rgba(250, 250, 250, 1);
            font-weight: 400;
            border-radius: 3px;
            border: 1px solid rgba(238, 238, 238, 1);
            margin-right: 14px;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
      .names {
        position: absolute;
        bottom: 66px;
        height: 20px;
        line-height: 20px;
        .w1 {
          float: left;
          width: 20px;
          height: 20px;
          margin-right: 12px;
          border-radius: 50%;
        }
        .w2 {
          float: left;
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-right: 8px;
          line-height: 20px;
        }
        .w3 {
          float: left;
          width: 16px;
          height: 12px;
          line-height: 20px;
          margin-top: 5px;
          margin-right: 3px;
        }
        .w4 {
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(194, 194, 194, 1);
          line-height: 20px;
        }
      }
      .df {
        width: 220px;
        float: right;

        .i1 {
          position: absolute;
          right: 120px;
          top: 53px;
          width: 100px;
          height: 100px;
          border: 1px dashed #ccc;
        }
        .d1 {
          position: absolute;
          right: 102px;
          top: 105px;
          font-size: 18px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 25px;
        }
        .f2 {
          position: absolute;
          right: 25px;
          top: 86px;
          font-size: 38px;
          font-family: Bebas;
          color: rgba(254, 120, 101, 1);
          line-height: 51px;
          letter-spacing: 1px;
        }
        .i2 {
          position: absolute;
          right: 9px;
          top: 131px;
          width: 50px;
          height: 9px;
        }
        .c3 {
          position: absolute;
          top: 166px;
          right: 155px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
          line-height: 20px;
          cursor: pointer;
        }
      }
      .el-row {
        position: absolute;
        top: 158px;
        right: 0;
        .el-button {
          width: 120px;
          height: 36px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 6px;
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 8px;
        }
        .el-button:active {
          border: none;
        }
      }
    }
  }

  // 事件小图标
  .timeOver {
    position: absolute;
    top: 190px;
    left: 192px;
    background-color: transparent;
    padding: 2px 2px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    img {
      margin-top: 2px;
      width: 18px;
      height: 18px;
    }
    span {
      margin-left: 4px;
      font-size: 14px;
      color: #fff;
      font-weight: bold;
      line-height: 15px;
    }
  }

  //图表
  .chart-info {
    margin-bottom: 70px;
    .chart-title {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 30px;
      .icon-chart {
        display: inline-block;
        width: 40px;
        height: 40px;
        vertical-align: middle;
        background: url("../../assets/groupStaAnalysis/chart.svg") no-repeat;
        background-size: 100% auto;
        position: absolute;
        left: -10px;
        top: 3px;
      }
      span {
        font-size: 21px;
        color: #666;
        font-weight: 600;
        margin-right: 12px;
      }
    }
    .el-select {
      width: 280px;
      font-size: 14px;
      input {
        height: 32px;
        border-radius: 10px;
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
          width: 28px;
          display: inline-block;
          margin: 0 auto;
          height: 4px;
          background: rgba(254, 120, 101, 1);
          margin-top: 9px;
          margin: 8px 20px 0px 20px;
          border-radius: 2px;
        }
      }
    }
    .chart-box {
      height: 364px;
    }
    .chart-footer {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      .title {
        margin-bottom: 18px;
        font-weight: 600;
        margin-top: 39px;
      }
      .p1 {
        width: 768px;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        font-weight: 400;
      }
    }
  }

  // card
  .Stucard {
    padding: 20px 0px 30px 0px;
    position: relative;
    //可信度
    .credibility {
      position: relative;
      .secondImg {
        position: absolute;
        bottom: -41px;
        left: 8px;
        width: 90%;
        height: 90%;
        text-align: center;
      }
    }
    .el-card {
      color: "#ccc";
      height: 122px;
      border-radius: 16px;
      box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
      .firstImg {
        height: 28px;
        width: 315px;
        position: absolute;
        top: 93px;
        left: 18px;
      }
      .lineDuna {
        position: absolute;
        top: 57px;
        left: 30px;
        width: 20px;
        height: 4px;
        background: rgba(254, 120, 101, 0.6);
        border-radius: 3px;
      }
      .lineDunabu {
        position: absolute;
        top: 57px;
        left: 200px;
        height: 4px;
        background: rgba(254, 120, 101, 0.6);
        border-radius: 3px;
        width: 20px;
      }
      p {
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(204, 204, 204, 1);
        line-height: 17px;
      }
      .credible {
        text-align: center;
        margin-top: 12px;
      }

      .line {
        position: absolute;
        top: -5px;
        right: 172px;
        height: 60px;
        width: 2px;
        background-color: #f0f0f0;
      }
      .low {
        position: absolute;
        font-size: 12px;
        color: #fe7865;
        top: 22px;
        right: 30px;
      }
      .kk {
        position: absolute;
        bottom: 20px;
        width: 269px;
        height: 5px;
        background: rgba(242, 242, 242, 1);
        border-radius: 3px;
        margin: 0 16px;
        .progress {
          height: 5px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 3px;
          opacity: 0.85;
        }
      }
      .el-progress {
        // padding-top: 21px;
        .el-progress__text {
          font-size: 0px;
          .el-progress-bar__inner {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(254, 120, 101, 1) 100%
            );
            border-radius: 3px;
            // opacity: 0.85;
          }
        }
      }
      .kxdPercent {
        padding-top: 13px;
        .el-progress__text {
          font-size: 0px;
          .el-progress-bar__inner {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(254, 120, 101, 1) 100%
            );
            // color: #fe7865;
            border-radius: 3px;
            // opacity: 0.85;
          }
        }
      }
    }
  }
}
</style>
