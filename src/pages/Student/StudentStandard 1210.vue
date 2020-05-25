<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <TopHeaderp></TopHeaderp>

      <!-- 内容 -->
      <el-main>
        <div class="Analysis">
          <div class="fh">
            <a href="javascript:;" v-on:click="backHistory">
              <img src="../../assets/img/fanhui1.svg" alt />
              <span>返回</span>
            </a>
          </div>
          <img :src="list.popularizeImageUrl" alt class="im1" />
          <div
            class="sandstandard"
            v-if="list.coursePlanType === 25 || list.coursePlanType === 26"
          >沙盘</div>
          <span class="clock_minutes">
            <img src="../../assets/img/clock.svg" alt class="clock" />
            <span class="minutes">{{ list.duration }}分钟</span>
          </span>
          <div class="fx">
            <h3>{{ list.coursePlanName || list.name }}</h3>
            <span
              class="oo1"
              v-if="list.coursePlanType === 21 || list.coursePlanType === 22 || list.type===1|| list.type===2"
            >标准课</span>
            <span
              class="oo1"
              v-if="list.coursePlanType === 25 || list.coursePlanType === 26 || list.type===3|| list.type===4"
            >沙盘标准课</span>
            <span class="oo2">{{ list.duration }}分钟</span>
            <div class="csd">
              <img src="../../assets/img/red.svg" alt class="imr" />
              <div class="cs1" v-for="item in tagNameList" :key="item">
                <span>{{ item }}</span>
              </div>
              <div class="cs2"></div>
            </div>
            <div class="names">
              <img
                :src="
                  list.ownerAvatar || require('../../assets/img/touxiang.svg')
                "
                alt
                class="w1"
              />
              <span class="w2">{{ list.ownerName }}</span>
              <img src="../../assets/img/v1.svg" alt class="w3" v-if="list.ownerLevel != 0" />
              <span class="w4">/{{ list.ownerOrgName || ownerInfo.orgName }}</span>
            </div>

            <div class="df">
              <img
                src="../../assets/img/yiwancheng.svg"
                class="i1"
                v-if="list.finishFlag == true && list.expireFlag != true"
              />
              <img src="../../assets/img/yiguoqi.svg" class="i1" v-if="list.expireFlag == true" />
              <span class="d1" v-if="list.finishFlag == true || list.expireFlag == true">最终得分</span>
              <span
                class="d2"
                v-if="
                  list.finishPercent > 0 &&
                    list.finishPercent < 100 &&
                    list.expireFlag != true
                "
              >已完成</span>
              <span
                class="f2"
                v-if="list.finishFlag == true || list.expireFlag == true"
              >{{ list.score || 0 }}</span>
              <span
                class="f3"
                v-if="
                  list.finishPercent > 0 &&
                    list.finishPercent < 100 &&
                    list.expireFlag != true
                "
              >{{ list.finishPercent }}%</span>
              <img
                src="../../assets/img/xiahuaxian.svg"
                class="i2"
                v-if="list.finishFlag == true || list.expireFlag == true"
              />
              <span
                class="c3"
                v-if="list.finishFlag == true && list.expireFlag != true"
                @click="
                  jumpPage(
                    list.refKeyId,
                    list.courseServerUrl,
                    list.expireFlag,
                    list.finishFlag,
                    list.coursePlanType
                  )
                "
              >再学一遍</span>
              <span
                class="c3"
                v-if="list.expireFlag == true"
                @click="
                  jumpPage(
                    list.refKeyId,
                    list.courseServerUrl,
                    list.expireFlag,
                    list.finishFlag,
                    list.coursePlanType
                  )
                "
              >去学习</span>
              <el-row class="el-r" v-if="list.finishFlag == true || list.expireFlag == true">
                <el-button @click="viewReport">查看报告</el-button>
              </el-row>
              <el-row
                v-if="
                  (list.finishPercent == null || list.finishPercent == 0) &&
                    list.expireFlag != true
                "
              >
                <el-button
                  @click="
                    jumpPage(
                      list.refKeyId,
                      list.courseServerUrl,
                      list.expireFlag,
                      list.finishFlag,
                      list.coursePlanType
                    )
                  "
                >去学习</el-button>
              </el-row>
              <el-row
                v-if="
                  list.finishPercent > 0 &&
                    list.finishPercent < 100 &&
                    list.expireFlag != true
                "
              >
                <el-button
                  @click="jumpPage(list.refKeyId,
                    list.courseServerUrl,
                    list.expireFlag,
                    list.finishFlag,
                    list.coursePlanType)"
                >继续学习</el-button>
              </el-row>
              <p class="p1" v-if="list.expireFlag == true">课程已过期了噢，最终成绩以截止日为准，下次早点来完成吧～</p>
              <p
                class="p1"
                v-if="list.finishFlag == true && list.expireFlag != true"
              >温故而知新，再学一遍不影响当前最终得分哦～</p>
            </div>
          </div>
        </div>
        <!-- 内容简介 -->
        <div class="introduction" v-if="list.summary != ''">
          <div class="jj">
            <img src="../../assets/img/kcjj.svg" alt />
            <p class="kcjj">课程简介</p>
          </div>
          <p class="kcj">{{ list.summary }}</p>
        </div>
        <!-- 学到什么 -->
        <div class="Acquire">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt />
            <p>{{ faqsList.question }}</p>
          </div>
          <div class="acqu">
            <div class="one" v-for="(item, index) in faqsList.answerList" :key="index">
              <span class="o1" v-if="index < 9">0</span>
              <span class="o2">{{ index + 1 }}</span>
              <div class="yll">
                <p class="on">{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 学到什么 -->
        <div class="Acquire">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt />
            <p>{{ faqsLists.question }}</p>
          </div>
          <div class="acqu">
            <div class="one" v-for="(item, index) in faqsLists.answerList" :key="index">
              <span class="o1" v-if="index < 9">0</span>
              <span class="o2">{{ index + 1 }}</span>
              <div class="yll">
                <p class="on">{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 老师介绍 -->
        <div class="teachers">
          <div class="jg">
            <img src="../../assets/img/szjs.svg" alt />
            <h3>共建新时代社会工作教育共同体</h3>
          </div>
        </div>

        <div class="singleTeacher clearfix" v-for="(item, index) in listz" :key="index">
          <div class="leftImg clearfix">
            <img :src="item.avatar" alt class="onImg clearfix" />
            <img src="../../assets/creator/patternBg_orange.svg" alt class="underImg clearfix" />
          </div>
          <div class="rightIntro clearfix">
            <img src="../../assets/creator/bg_quotatioMarks.svg" alt class="bgImg" />
            <p class="name">{{ item.memberName }}</p>
            <p class="teaTitle">{{ item.orgName + item.position }}</p>
            <p class="teaMsg">{{ item.summary }}</p>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import {
  planLearningDetail,
  memberRecommenList,
  courPlanDetail,
  courseLearningState
} from "../../service/groupApi";
import TopHeaderp from "../Header/headerp";
import {
  trimNumber,
  jumpOrther,
  tipsFail,
  tipsMsg,
  cloneObj
} from "../../utils/utils";

export default {
  name: "Standarddetails",
  created() {
    let detailType = this.$route.query.isDetail;
    let token = sessionStorage.getItem("assent_token");
    let url = this.$route.query.url;
    let ref = this.$route.query.ref;
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    let courseBzId = this.$route.query.courseId;
    if (detailType == 1) {
      //获取标准课详情
      courPlanDetail({ courseId: courseBzId })
        .then(res => {
          if (res.code === 0) {
            if (res.data.courseInfo.expireFlag == undefined) {
              let list = res.data.courseInfo;
              courseLearningState({
                groupId,
                coursePlanId,
                courseId: courseBzId
              })
                .then(res => {
                  if (res.code == 0) {
                    this.list = list;
                    list.score = res.data.score;
                    list.expireFlag = res.data.expireFlag;
                    list.finishPercent = res.data.finishPercent;
                    list.finishFlag = res.data.finishFlag;
                    this.list.refKeyId = this.list.id;
                    this.list.coursePlanType = this.list.type;
                  }
                })
                .catch(err => {
                  tipsFail(err);
                });
            }

            this.ownerInfo = res.data.ownerInfo;
            this.tagNameList = res.data.tagNameList;
            this.learningLessonList = res.data.learningLessonList;

            this.faqsList = res.data.faqsList[0];
            if (this.faqsList == undefined) {
              this.faqsList = this.faqs;
            }
            if (this.faqsList.answerList == undefined) {
              this.faqsList.answerList = this.faqs.answerList;
            }

            this.faqsLists = res.data.faqsList[1];
            if (this.faqsLists == undefined) {
              this.faqsLists = this.faqsz;
            }
            if (this.faqsLists.answerList == undefined) {
              this.faqsLists.answerList = this.faqsz.answerList;
            }
            this.ref = res.data.refKeyId;
            this.url = res.data.courseServerUrl;
            this.expireFlag = res.data.expireFlag;
            this.listz = res.data.coursePartnerList;
            console.log(this.list);
            // 获取标准课去学习详情
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    } else {
      // 获取页面信息接口
      planLearningDetail({
        groupId: groupId,
        coursePlanId: coursePlanId,
        coursePlanType: coursePlanType,
        courseId: courseBzId
      })
        .then(res => {
          if (res.code == "0") {
            this.list = res.data;
            this.tagNameList = res.data.tagNameList;
            this.learningLessonList = res.data.learningLessonList;

            this.faqsList = res.data.faqsList[0];
            if (this.faqsList == undefined) {
              this.faqsList = this.faqs;
            }
            if (this.faqsList.answerList == undefined) {
              this.faqsList.answerList = this.faqs.answerList;
            }

            this.faqsLists = res.data.faqsList[1];
            if (this.faqsLists == undefined) {
              this.faqsLists = this.faqsz;
            }
            if (this.faqsLists.answerList == undefined) {
              this.faqsLists.answerList = this.faqsz.answerList;
            }

            this.ref = res.data.refKeyId;
            this.url = res.data.courseServerUrl;
            this.expireFlag = res.data.expireFlag;
            this.listz = res.data.coursePartnerList;
            console.log(this.list);
          } else {
            console.log(res.msg);
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    }
  },
  data() {
    return {
      faqsz: {
        id: 2,
        question: "课程基本要求",
        answerList: ["未设置", "未设置", "未设置"]
      },
      faqs: {
        id: 1,
        question: "你将学到什么",
        answerList: ["未设置", "未设置", "未设置"]
      },

      expireFlag: "",
      url: "",
      ref: "",
      groupId: "",
      coursePlanId: "",
      token: "",
      learningBundleList: [],
      faqsList: [],
      faqsLists: [],
      listz: [],
      xs: true,
      xs1: false,
      list: {},
      card1: false,
      none: false,
      inputVal: "",
      search: "",
      card: false,
      activeIndex: "1",
      progreess: 30,
      tagNameList: [],
      learningLessonList: [],
      ownerInfo: {}
    };
  },
  methods: {
    // 查看报告
    viewReport() {
      let groupId = this.$route.query.groupId;
      let coursePlanId = this.$route.query.coursePlanId;
      let coursePlanType = this.$route.query.coursePlanType;
      let courseId = this.$route.query.courseId;

      if (coursePlanType == 2) {
        this.$router.push({
          path: "/StudentReportsChannel",
          query: {
            groupId: groupId,
            coursePlanId: coursePlanId,
            coursePlanType: coursePlanType,
            courseId
          }
        });
      } else {
        this.$router.push({
          path: "/StudentReports",
          query: {
            groupId: groupId,
            coursePlanId: coursePlanId,
            coursePlanType: coursePlanType,
            courseId
          }
        });
      }
    },
    // 返回
    backHistory() {
      // this.$router.go(-1); //返回上一层
      this.$router.push({
        path: "StudentCour"
      });
    },

    // 跳转第三方
    jumpPage(ref, url, expireFlag, finishFlag, type) {
      console.log(ref, url, expireFlag, finishFlag, type);
      if (expireFlag == true || finishFlag == true) {
        // 已过期或已学完
        // 标准课 沙盘标准课 npe标准课
        if (type === 21 || type === 1) {
          // tpe标准课
          let token = sessionStorage.getItem("assent_token");
          let group = this.$route.query.groupId;
          let cour = this.$route.query.coursePlanId;
          // tpe标准课
          let baseUrl = window.location.href.split("#")[0] + "";
          let newUrl =
            url +
            '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
            baseUrl +
            "&content_token=" +
            group +
            "-" +
            cour +
            "-" +
            ref;
          window.open(
            window.location.href.split("#")[0] +
              "#/orther?url=" +
              encodeURIComponent(newUrl) +
              "&btnContext=" +
              true
          );
          // window.open(
          //   window.location.href.split("#")[0] +
          //     "#/orther?url=" +
          //     encodeURIComponent(url) +
          //     "&btnContext=" +
          //     true
          // );
        } else if (type === 22 || type === 2) {
          // npe标准课
          let groupId = this.$route.query.groupId;
          let coursePlanId = this.$route.query.coursePlanId;
          let coursePlanType = this.$route.query.coursePlanType;
          let courseId = ref;
          this.$router.push({
            path: "pptPreview",
            query: {
              courseId,
              groupId,
              coursePlanId,
              coursePlanType,
              preview: 3
            }
          });
          // window.open(
          //   window.location.href.split("#")[0] +
          //     "#/pptPreview?" +
          //     "courseId=" +
          //     courseId +
          //     "&groupId=" +
          //     groupId +
          //     "&coursePlanId=" +
          //     coursePlanId +
          //     "&coursePlanType=" +
          //     coursePlanType +
          //     "&preview=3"
          // );
        } else if (type === 25 || type === 26 || type === 3 || type === 4) {
          // tpe/npe沙盘标准课
          let address = this.$route.name;
          // 原页面跳转
          this.$router.push({
            path: "/previewMain",
            query: {
              courseId: ref,
              preview: 1,
              address: address,
              displayR: true,
              refId: ref
            }
          });
        }
        // // 标准课
        // window.open(
        //   window.location.href.split("#")[0] +
        //     "#/orther?url=" +
        //     encodeURIComponent(url) +
        //     "&btnContext=" +
        //     true
        // );
        // 沙盘标准课

        // npe标准课
      } else {
        if (type === 21 || type === 1) {
          // // 标准课
          let token = sessionStorage.getItem("assent_token");
          let group = this.$route.query.groupId;
          let cour = this.$route.query.coursePlanId;
          // tpe标准课
          let baseUrl = window.location.href.split("#")[0] + "";
          let newUrl =
            url +
            '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
            baseUrl +
            "api/learningRecordStore/&token=" +
            token +
            "&content_token=" +
            group +
            "-" +
            cour +
            "-" +
            ref;
          window.open(
            window.location.href.split("#")[0] +
              "#/orther?url=" +
              encodeURIComponent(newUrl) +
              "&btnContext=" +
              false
          );
          // window.open(
          //   window.location.href.split("#")[0] +
          //     "#/orther?url=" +
          //     encodeURIComponent(url) +
          //     "&btnContext=" +
          //     false
          // );
        } else if (type === 22 || type === 2) {
          // npe标准课
          let groupId = this.$route.query.groupId;
          let coursePlanId = this.$route.query.coursePlanId;
          let coursePlanType = this.$route.query.coursePlanType;
          let courseId = ref;
          this.$router.push({
            path: "pptPreview",
            query: {
              courseId,
              groupId,
              coursePlanId,
              coursePlanType,
              preview: 3
            }
          });
        } else if (type === 25 || type === 26 || type === 3 || type === 4) {
          // tpe/npe沙盘标准课
          let coursePlanType = this.$route.query.coursePlanType;
          let group = this.$route.query.groupId;
          let cour = this.$route.query.coursePlanId;
          // tpe标准课
          let baseUrl = window.location.href.split("#")[0] + "";
          let address = this.$route.name;
          // 原页面跳转
          this.$router.push({
            path: "/previewMain",
            query: {
              courseId: ref,
              preview: 1,
              address: address,
              displayR: true,
              refId: ref,
              groupId: group,
              courId: cour,
              coursePlanType
            }
          });
        }

        // let baseUrl = window.location.href.split("#")[0] + "";
        // let newUrl =
        //   url +
        //   '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
        //   baseUrl +
        //   "api/learningRecordStore/&token=" +
        //   token +
        //   "&content_token=" +
        //   group +
        //   "-" +
        //   cour +
        //   "-" +
        //   ref;
        // location.href =
        //   location.href.split("#")[0] +
        //   "#/orther?url=" +
        //   encodeURIComponent(newUrl);
      }
    },

    menu() {
      window.scrollTo(0, 0);
    },
    // 数字转汉字
    trimNumberFun(val) {
      return trimNumber(val);
    }
  },
  mounted() {
    this.menu();
  },
  components: {
    TopHeaderp: TopHeaderp //注册该组件
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
  width: 1240px;
  padding: 0;
  .Analysis {
    width: 1200px;
    margin-left: 20px;
    position: relative;
    height: 299px;
    overflow: hidden;
    .fh {
      height: 48px;
      line-height: 48px;
      a {
        height: 48px;
        line-height: 48px;
        img {
          margin-top: 14px;
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
    img {
      width: 280px;
      height: 170px;
      float: left;
      border-radius: 13px;
    }
    .sandstandard {
      position: absolute;
      top: 47px;
      width: 54px;
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
    }
    .clock_minutes {
      position: absolute;
      bottom: 81px;
      left: 0;
      width: 280px;
      height: 36px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      border-radius: 0px 0px 12px 12px;
      .clock {
        position: absolute;
        top: 9px;
        bottom: 9px;
        right: 76px;
        width: 18px;
        height: 18px;
      }
      .minutes {
        position: absolute;
        top: 8px;
        left: 212px;
        right: 10px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
      }
    }
    .fx {
      width: 613px;
      height: 170px;
      float: left;
      margin-left: 50px;
      h3 {
        height: 37px;
        font-size: 26px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 37px;
        letter-spacing: 1px;
        margin-bottom: 7px;
        width: 700px;
      }
      .oo1 {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
        margin-right: 32px;
      }
      .oo2 {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(254, 120, 101, 1);
        line-height: 22px;
      }
      .csd {
        position: relative;
        width: 100%;
        height: 25px;
        margin-top: 45px;
        overflow: hidden;
        white-space: nowrap;
        .imr {
          width: 40px;
          height: 20px;
          margin-right: 11px;
          float: left;
          margin-top: 5px;
        }
        .cs1 {
          margin-top: 5px;
          display: inline-block;
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
        .cs2 {
          position: absolute;
          top: 0;
          right: 0;
          width: 46px;
          height: 25px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 100%
          );
        }
      }
      .names {
        float: left;
        position: absolute;
        bottom: 81px;
        height: 20px;
        line-height: 20px;
        .w1 {
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

        .i1 {
          position: absolute;
          right: 120px;
          top: 53px;
          width: 100px;
          height: 100px;
        }
        .d1 {
          position: absolute;
          right: 82px;
          top: 105px;
          font-size: 18px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 25px;
        }
        .d2 {
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
          right: 16px;
          top: 86px;
          font-size: 38px;
          font-family: Bebas;
          color: rgba(254, 120, 101, 1);
          line-height: 51px;
          letter-spacing: 1px;
        }
        .f3 {
          position: absolute;
          right: 16px;
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
          cursor: pointer;
          position: absolute;
          top: 166px;
          right: 155px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
          line-height: 20px;
        }
      }
      .el-row {
        position: absolute;
        bottom: 81px;
        right: 0;
        .el-button {
          border: none;
          width: 120px;
          height: 36px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 8px;
        }
        .el-button:active {
          border: none;
        }
      }
      .el-r {
        position: absolute;
        bottom: 107px;
        right: 0;
        .el-button {
          border: none;
          width: 120px;
          height: 36px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 8px;
        }
        .el-button:active {
          border: none;
        }
      }
    }
    .p1 {
      position: absolute;
      right: 0;
      bottom: 81px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(179, 179, 179, 1);
      line-height: 20px;
    }
  }
  .introduction {
    width: 1200px;
    margin-left: 20px;
    margin-bottom: 80px;
    .jj {
      height: 28px;
      line-height: 28px;
      img {
        float: left;
        width: 22px;
        height: 22px;
        background: rgba(255, 255, 255, 0.01);
        margin-top: 3px;
      }
      .kcjj {
        margin-left: 7px;
        float: left;
        font-size: 20px;
        font-weight: 600;
        color: rgba(254, 120, 101, 1);
        letter-spacing: 1px;
      }
    }
    .kcj {
      margin-top: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
    }
  }
  .Acquire {
    width: 1200px;
    margin-left: 20px;
    .jg {
      height: 28px;
      line-height: 28px;
      margin-bottom: 20px;
      img {
        float: left;
        width: 22px;
        height: 22px;
        background: rgba(255, 255, 255, 0.01);
        margin-top: 3px;
      }
      p {
        margin-left: 7px;
        float: left;
        font-size: 20px;
        font-weight: 600;
        color: rgba(254, 120, 101, 1);
        letter-spacing: 1px;
      }
    }
    .one {
      height: 34px;
      line-height: 34px;
      margin-bottom: 13px;
      .o1 {
        font-size: 28px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.05);
        float: left;
      }
      .o2 {
        font-size: 28px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.05);
        float: left;
        margin-right: 18px;
      }
      .yll {
        height: 34px;
        border-radius: 8px;
        .on {
          height: 34px;
          float: left;
          font-size: 14px;
          font-weight: 600;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .one:last-child {
      margin-bottom: 80px;
    }
  }
  .teachers {
    width: 1200px;
    height: 107px;
    margin-left: 20px;
    .jg {
      position: relative;
      img {
        position: absolute;
        left: 50%;
        transform: translateX(-39%);
        width: 235px;
        height: 61px;
        background: rgba(255, 255, 255, 0.01);
      }
      h3 {
        position: absolute;
        top: 77px;
        left: 50%;
        transform: translateX(-50%);
        height: 30px;
        font-size: 22px;
        font-family: AlibabaPuHuiTiR;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
        letter-spacing: 2px;
      }
    }
  }
  .singleTeacher {
    width: 1200px;
    margin: 121px 0 137px 20px;
    .leftImg {
      float: left;
      margin-right: 22px;
      position: relative;
      padding-top: 23px;
      width: 261px;
      height: 203px;
      margin-left: 77px;
      .onImg {
        position: absolute;
        left: 0;
        top: 0;
        width: 241px;
        height: 181px;
        border-radius: 20px;
        z-index: 99;
        display: block;
      }
      .underImg {
        position: absolute;
        left: 22px;
        top: 23px;
        display: block;
      }
    }
    .rightIntro {
      float: left;
      position: relative;
      padding: 0 32px;
      .bgImg {
        position: absolute;
        left: 0;
        top: -23px;
      }
      .name {
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(69, 69, 69, 1);
        line-height: 33px;
        z-index: 100;
        position: relative;
      }
      .teaTitle {
        font-size: 17px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
        margin-bottom: 13px;
      }
      .teaMsg {
        width: 679px;
        height: 135px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(69, 69, 69, 1);
        line-height: 27px;
        text-align: justify;
      }
    }
  }
}
.swiper-container {
  width: 100%;
  padding-top: 20px;
  height: 590px;
}
.swiper-slide {
  width: 444px;
  transform: scale(0.9);
}
.swiper-slide-active {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  .ban {
    background-color: #fff;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.05);
    .js {
      color: rgba(69, 69, 69, 1);
    }
  }
}
.swiper-button-next {
  position: absolute;
  right: 0px;
  width: 52px;
  height: 52px;
  background-image: url(../../assets/img/Right.svg);
  background-size: 52px 52px !important;
}
.swiper-button-prev {
  position: absolute;
  left: 0px;
  width: 52px;
  height: 52px;
  background-image: url(../../assets/img/Left.svg);
  background-size: 52px 52px !important;
}
</style>
