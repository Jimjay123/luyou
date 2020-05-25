<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-09-11 15:13:45
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-10-28 10:17:53
 -->
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
          <!-- 大图片 -->
          <div class="titlePic clearfix" @click="goCourseDetails">
            <img :src="infoData.popularizeImageUrl ||list.popularizeImageUrl" alt class="imgsr1" />
            <img src="../../assets/img/duration.svg" alt class="imgr" />
            <span class="duration">{{infoData.duration||list.duration}}分钟</span>
          </div>
          <div class="timeOver">
            <img src="../../assets/img/time.png" alt />
            <span class="bigDuration">{{infoData.duration ||list.duration}} 分钟</span>
          </div>
          <div class="fx">
            <!-- <h3>{{list.coursePlanName}}</h3>
            <span class="oo1">标准课</span>
            <span class="oo2">{{list.duration}}分钟</span>
            <div class="oo3">
              <img src="../../assets/img/jiezhiriqi.svg" alt />
              <span>{{list.endDate}} 截止</span>
            </div>
            <div class="cs1">
              <span v-for="(item, index) in tagNameList" :key="index">{{item}}</span>
            </div>
            <div class="names">
              <img :src="list.ownerAvatar" alt class="w1" />
              <span class="w2">{{list.ownerName}}</span>
              <img src="../../assets/img/v1.svg" alt class="w3" />
              <span class="w4">/{{list.orgName}}</span>
            </div>-->

            <h3>{{infoData.courseName|| list.coursePlanName || list.name}}</h3>
            <div class="bx">
              <span class="oo1">标准课</span>
              <span class="oo2">{{infoData.duration ||list.duration}}分钟</span>
              <div class="oo3">
                <img src="../../assets/img/jiezhiriqi.svg" alt />
                <span>{{infoData.endDate ||list.endDate}} 截止</span>
              </div>
            </div>

            <div class="csd">
              <img src="../../assets/img/red.svg" alt class="imr" />
              <div
                class="cs1"
                v-for="(item, index) in infoData.tagNameList ||list.tagNameList"
                :key="index"
              >
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
                v-if="true"
                @click="goCourseDetails(infoData)"
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
                      style="float: left; font-size: 30px; font-weight: 700 "
                    >{{msgList.studentScore}}</span>
                    <span
                      style="float: left; font-size: 12px; color: #ccc; padding: 18px 0px 0px 5px"
                    >分</span>
                    <span
                      style="float: right; font-size: 20px; padding: 12px 0px 0px 0px; font-weight: 700 "
                    >{{msgList.maxScore}}</span>
                    <span
                      style="float: right; font-size: 12px;color: #ccc; padding: 18px 5px 0px 0px"
                    >最高得分</span>
                    <img src="../../assets/img/buzhoutiao.png" class="firstImg" alt />
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
                    backgroundColor: linear-gradient(90deg,#ffb09e,#fe7865);
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
                        <span style="font-size: 30px; font-weight: 700">{{msgList.totalQuiz || 0}}</span>
                        <span style="font-size: 12px;color: #ccc; padding: 18px 0px 0px 5px">个步骤</span>
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
          <ul class="tab clearfix">
            <li :class="{'tab-item':true,'active':tabType==='各步骤得分'}" @click="tabClick('各步骤得分')">
              各步骤得分
              <i class="line"></i>
            </li>
          </ul>
          <div class="chart-box">
            <StuChaBox :tabType="tabType" :chartsList="chartsList" />
          </div>
          <div class="chart-footer" style="margin-top: 39px;">
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
import { cloneObj, tipsMsg, tipsFail } from "../../utils/utils";
import {
  studentCoursePlan,
  studentCoursestatistics,
  studentCourseStep,
  studentFeedbackWord,
  courPlanDetail
} from "../../service/groupApi";
import { stCourseBaseInfo } from "../../service/studentApi";
import TopHeaderp from "../Header/headerp";
export default {
  data() {
    return {
      list: [],
      // 信息列表
      msgList: {},
      none: false,
      card: false,
      // progreess: 80,
      // progreessDuan: 20,
      tagNameList: [],
      learningLessonList: [],
      tabType: "各步骤得分",
      chartsList: {
        dataIPSxAxis: [
          "步骤一",
          "步骤二",
          "步骤三",
          "步骤四",
          "步骤五",
          "步骤六"
        ],
        dataIPS: [20, 60, 50, 80, 120, 100]
      },
      // courseId: -1,
      feedBackWord: "", //反馈语
      infoData: {} //标准课课程信息
    };
  },
  created() {
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let courseId = this.$route.query.courseId;
    let detailType = this.$route.query.isDetail;
    console.log(detailType);
    if (detailType == 1) {
      courPlanDetail({
        groupId: groupId,
        coursePlanId: coursePlanId,
        courseId: courseId
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            this.list = res.data.courseInfo;
            console.log(this.list);
            this.tagNameList = res.data.tagNameList;
            this.learningLessonList = res.data.learningLessonList;
            this.faqsList = res.data.faqsList;
            let newCourseId =courseId|| res.data.refKeyId;
            // 获取反馈
            studentFeedbackWord({
              groupId: groupId,
              coursePlanId: coursePlanId,
              courseId: newCourseId
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
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // 上面的信息
      studentCoursePlan({
        groupId: groupId,
        coursePlanId: coursePlanId,
        courseId: courseId
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            this.list = res.data;
            // console.log(this.list);
            this.tagNameList = res.data.tagNameList;
            this.learningLessonList = res.data.learningLessonList;
            this.faqsList = res.data.faqsList;
            let newCourseId =courseId|| res.data.refKeyId;
            // 获取反馈
            studentFeedbackWord({
              groupId: groupId,
              coursePlanId: coursePlanId,
              courseId: newCourseId
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
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    // 下面的信息 百分比
    studentCoursestatistics({
      groupId: groupId,
      coursePlanId: coursePlanId
    })
      .then(res => {
        if (res.code == "0") {
          this.msgList = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });

    // echart 接口
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

    // 课程信息接口;
    // let courseId = this.$route.query.courseId;
    stCourseBaseInfo({
      courseId,
      groupId,
      coursePlanId
    })
      .then(res => {
        console.log(res);
        this.infoData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //下载报告
    updownReport() {
      tipsMsg("功能开发中");
    },
    // 跳转课程详情页
    goCourseDetails(data) {
      let groupId = this.$route.query.groupId;
      let coursePlanId = this.$route.query.coursePlanId;
      let coursePlanType = this.$route.query.coursePlanType;
      let courseId = this.$route.query.courseId;
      let type = this.list.coursePlanType;
      this.$router.push({
        path: "/StudentStandard", //标准课
        query: {
          groupId,
          coursePlanId,
          coursePlanType,
          courseId,
          isDetail: 1
        }
      });
    },
    //图表 tab切换
    tabClick(val) {
      this.tabType = val;
    }
  },

  components: {
    TopHeaderp: TopHeaderp, //头部样式注册该组件
    StuChaBox: StuChaBox
  }
};
</script>

<style lang="less" scoped>
.el-container {
  margin: 0 auto;
  display: block;
  width: 100%;
}

.el-main {
  display: block;
  margin: 0 auto;
  width: 1220px;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
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
      float: left;
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
      .bx {
        overflow: hidden;
        .oo1 {
          float: left;
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(74, 74, 74, 1);
          line-height: 22px;
          margin-right: 32px;
        }
        .oo2 {
          float: left;
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(254, 120, 101, 1);
          line-height: 22px;
        }
        .oo3 {
          float: left;
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
      }
      .csd {
        overflow: hidden;
        margin-top: 50px;
        width: 613px;
        height: 20px;
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
      font-weight: blod;
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
        // border: 1px dashed #666;.
        position: absolute;
        left: -10px;
        top: -5px;
      }
      span {
        font-size: 21px;
        color: #666;
        font-weight: 600;
        margin-right: 12px;
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
    .chart-footer {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      .title {
        margin-bottom: 18px;
        font-weight: 600;
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
      // 卡片宽度
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
        width: 20px;
        height: 4px;
        background: rgba(254, 120, 101, 0.6);
        border-radius: 3px;
      }
      p {
        color: #ccc;
        font-size: 12px;
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
      // .el-progress {
      //   // padding-top: 21px;
      //   .el-progress__text {
      //     font-size: 0px;
      //     .el-progress-bar__inner {
      //       background: linear-gradient(
      //         90deg,
      //         rgba(255, 255, 255, 1) 0%,
      //         rgba(254, 120, 101, 1) 100%
      //       );
      //       border-radius: 3px;
      //       // opacity: 0.85;
      //     }
      //   }
      // }
      .kxdPercent {
        padding-top: 13px;
        .el-progress__text {
          font-size: 0px;
          .el-progress-bar__inner {
            // background: linear-gradient(
            //   90deg,
            //   rgba(255, 255, 255, 1) 0%,
            //   rgba(254, 120, 101, 1) 100%
            // );
            color: #fe7865;
            border-radius: 3px;
            // opacity: 0.85;
          }
        }
      }
    }
  }
}
</style>
