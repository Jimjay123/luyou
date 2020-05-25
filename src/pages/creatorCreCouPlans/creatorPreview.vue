<template>
  <div class="creatorPreview">
    <TopHeader></TopHeader>
    <el-container>
      <!-- 内容 -->
      <el-main clearfix>
        <div class="Analysis">
          <div class="ana-card">
            <img
              class="img1"
              :src="channelInfo.popularizeImageUrl || require('../../assets/creator/patternBg_img.png')"
              alt
            />
            <img
              class="img2"
              :src="channelInfo.popularizeImageUrl || require('../../assets/creator/patternBg_img.png')"
              alt
            />
            <img
              class="img3"
              :src="channelInfo.popularizeImageUrl || require('../../assets/creator/patternBg_img.png')"
              alt
            />
            <span class="title">频道</span>
            <div class="time">
              <i class="icon-time"></i>
              {{courseInfo.duration || 120}}分钟
            </div>
          </div>

          <div class="fx">
            <h3>{{courseInfo.name}}</h3>
            <span class="oo1">课程频道</span>
            <span class="oo2">{{courseInfo.duration}}分钟·{{bundleTotal}}章</span>
            <div class="csd">
              <img src="../../assets/img/red.svg" alt class="imr" />
              <div class="cs1" v-for="item in tagNameList" :key="item">
                <span>{{item}}</span>
              </div>
            </div>
            <div class="names">
              <img :src="ownerInfo.avatar" alt class="w1" />
              <span class="w2">{{ownerInfo.name}}</span>
              <img src="../../assets/img/v1.svg" alt class="w3" v-if="ownerInfo.level != 0" />
              <span class="w4">/{{ownerInfo.orgName}}</span>
            </div>
          </div>
        </div>

        <div
          class="introduction"
          v-if="channelInfo.summary != null || channelInfo.summary != undefined"
        >
          <div class="jj">
            <img src="../../assets/img/kcjj.svg" alt />
            <p class="kcjj">课程简介</p>
          </div>
          <p class="kcj">{{channelInfo.summary}}</p>
        </div>

        <div class="structure">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt class="is" />
            <p>课程结构</p>
          </div>
          <div class="ow" v-for="(item,index) in bundleList" :key="item.id">
            <div class="one">
              <span>第{{trimNumberFun(index+1)}}章</span>
              <p>{{item.bundleName}}</p>
              <div class="yll" v-for="items in item.courseList" :key="items.id">
                <img src alt class="im1" />
                <p class="on">{{items.courseName}}</p>
                <p class="tw">{{items.duration}}分钟</p>
                <el-row>
                  <el-button @click="Thirdparty(wrz)">预览</el-button>
                </el-row>
              </div>
            </div>
          </div>
        </div>

        <div class="Acquire">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt />
            <p>{{faqsList.question}}</p>
          </div>
          <div class="acqu">
            <div class="one" v-for="(item,index) in faqsList.answerList" :key="index">
              <span class="o1" v-if="index < 9">0</span>
              <span class="o2">{{index+1}}</span>
              <div class="yll">
                <p class="on">{{item}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="Acquire">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt />
            <p>{{faqsLists.question}}</p>
          </div>
          <div class="acqu">
            <div class="one" v-for="(item,index) in faqsLists.answerList" :key="index">
              <span class="o1" v-if="index < 9">0</span>
              <span class="o2">{{index+1}}</span>
              <div class="yll">
                <p class="on">{{item}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- start -->
        <div class="teaIntroduce clearfix">
          <div class="title_header clearfix">
            <img src="../../assets/creator/title_headerImg.svg" alt class="clearfix" />
            <p class="clearfix">共建新时代社会工作教育共同体</p>
          </div>
          <div class="singleTeacher clearfix" v-for="(item,index) in list" :key="index">
            <div v-if="index%2===0">
              <div class="leftImg clearfix">
                <img :src="item.avatar" alt class="onImg clearfix" />
                <img src="../../assets/creator/patternBg_orange.svg" alt class="underImg clearfix" />
              </div>
              <div class="rightIntro clearfix">
                <img src="../../assets/creator/bg_quotatioMarks.svg" alt class="bgImg" />
                <p class="name">{{item.memberName}}</p>
                <p class="teaTitle">{{item.orgName+item.position}}</p>
                <p class="teaMsg">{{item.summary}}</p>
              </div>
            </div>
            <div v-else-if="index%2===1">
              <div class="rightImg clearfix">
                <img :src="item.avatar" alt class="onImg clearfix" />
                <img src="../../assets/creator/patternBg_blue.svg" alt class="underImg clearfix" />
              </div>
              <div class="leftIntro clearfix">
                <img src="../../assets/creator/bg_quotatioMarks_right.svg" alt class="bgImg" />
                <p class="name">{{item.memberName}}</p>
                <p class="teaTitle">{{item.orgName+item.position}}</p>
                <p class="teaMsg">{{item.summary}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- end -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TopHeader from "./courseHeader";
import {
  courPlanDetail, //推荐频道/标准课详情页
  memberRecommenList, //标准课详情页
  memberidentifyRoleType //认证
} from "../../service/groupApi";
import { courseChannelDetail } from "../../service/creatorApi";
import { trimNumber } from "../../utils/utils";
export default {
  name: "creatorStandard",
  components: {
    TopHeader
  },

  created() {
    let courseId = this.$route.query.courseChannelId;
    let courseChannelId = this.$route.query.courseChannelId;
    // 获取课程频道信息
    courseChannelDetail({ courseChannelId: courseChannelId })
      .then(res => {
        if (res.code == "0") {
          this.url = res.data.bundleList[0].courseList[0].courseServerUrl;

          this.ownerInfo = res.data.ownerInfo;
          this.channelInfo = res.data.channelInfo;

          this.bundleList = res.data.bundleList;
          this.tagNameList = res.data.tagNameList;
          this.recommendTeacherPage = res.data.recommendTeacherPage.list;
          this.bundleTotal = res.data.bundleTotal;

          // faqsList
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
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    memberRecommenList({ page: "1", limit: "3" })
      .then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
          let list = this.list;
          let odd = [];
          this.list.filter(function(list, index) {
            if (index % 2 === 1) {
              odd.push(list);
              return true;
            }
          });
          let even = [];
          this.list.filter(function(list, index) {
            if (index % 2 === 0) {
              even.push(list);
              return true;
            }
          });
          this.evenList = even;
          this.oddList = odd;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    memberidentifyRoleType({})
      .then(res => {
        if (res.code == "0") {
          this.wrz = res.identifiedRoleType;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      wrz: "",
      list: [],
      url: "",
      lessonList: [],
      card1: false,
      none: false,
      inputVal: "",
      search: "",
      card: false,
      activeIndex: "1",
      progreess: 30,
      courseInfo: [],
      channelInfo: [],
      faqsList: [],
      faqsLists: [],
      ownerInfo: [],
      tagNameList: [],
      recommendTeacherPage: [],
      lessonList: [],
      bundleList: [],
      bundleTotal: "",
      oddList: [],
      evenList: [],
      faqsz: {
        id: 2,
        question: "课程基本要求",
        answerList: ["未设置", "未设置", "未设置"]
      },
      faqs: {
        id: 1,
        question: "你将学到什么",
        answerList: ["未设置", "未设置", "未设置"]
      }
    };
  },
  methods: {
    toHome() {
      this.$router.push("/creator/home");
    },
    trimNumberFun(val) {
      return trimNumber(val);
    },
    Thirdparty(wrz) {
      if (wrz == 0 || wrz == 4) {
        return;
      } else {
        let newUrl = this.url;
        window.open(
          window.location.href.split("#")[0] +
            "#/orther?url=" +
            encodeURIComponent(newUrl)
        );
      }
    }
  }
};
</script>>

<style lang="less" scoped>
.creatorPreview {
  .header {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(237, 237, 237, 1);
    .main_header {
      width: 1200px;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      .left_logo {
        float: left;
        cursor: pointer;
      }
      .right_useInfo {
        float: right;
        .msg,
        .user {
          display: inline-block;
          width: 48px;
          height: 48px;
          text-align: center;
          line-height: 48px;
        }
      }
    }
  }
  .el-container {
    margin: 0 auto;
    width: 100%;
    display: block;
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
      height: 283px;
      padding-bottom: 66px;
      overflow: hidden;
      margin-top: 24px;
      img {
        width: 280px;
        height: 170px;
        float: left;
        border-radius: 13px;
      }
      .ana-card {
        width: 280px;
        height: 170px;
        float: left;
        border-radius: 13px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .img2,
        .img3 {
          position: absolute;
          top: 6px;
          left: 5px;
          opacity: 0.5;
          z-index: -1;
          width: 269px;
        }
        .img3 {
          width: 254px;
          top: 12px;
          left: 13px;
          opacity: 0.3;
          z-index: -2;
        }
        .title {
          position: absolute;
          top: -1px;
          left: -1px;
          width: 54px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: rgba(254, 120, 101, 1);
          border-radius: 12px 0px 12px 0px;
          font-size: 16px;
          color: #fff;
          font-weight: 500;
        }
        .time {
          position: absolute;
          bottom: 8px;
          right: 12px;
          font-size: 14px;
          color: #fff;
          font-weight: 600;
          .icon-time {
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url("../../assets/groupStaAnalysis/time.svg") no-repeat;
            background-size: 100% auto;
            vertical-align: middle;
          }
        }
      }
      .clock_minutes {
        position: absolute;
        bottom: 114px;
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
          overflow: hidden;
          .imr {
            margin-top: 50px;
            width: 40px;
            height: 20px;
            margin-right: 11px;
          }
          .cs1 {
            margin-top: 50px;
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
            }
          }
        }
        .names {
          float: left;
          position: absolute;
          bottom: 114px;
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
        .el-row {
          position: absolute;
          top: 113px;
          right: 0;
          text-align: center;
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
          font-family: PingFangSC;
          font-weight: 600;
          color: rgba(254, 120, 101, 1);
          letter-spacing: 1px;
        }
      }
      .kcj {
        margin-top: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
      }
    }
    .structure {
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
          font-family: PingFangSC;
          font-weight: 600;
          color: rgba(254, 120, 101, 1);
          letter-spacing: 1px;
        }
      }
      .ow {
        margin-bottom: 42px;
        .one {
          line-height: 40px;
          margin-bottom: 33px;
          span {
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(153, 153, 153, 1);
            float: left;
            margin-right: 10px;
          }
          p {
            font-size: 20px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(77, 77, 77, 1);
          }
          .yll {
            height: 40px;
            border-radius: 8px;
            margin-bottom: 10px;
            position: relative;
            background: rgba(250, 250, 250, 1);
            .im1 {
              float: left;
              width: 40px;
              height: 40px;
              line-height: 40px;
              margin-right: 6px;
              background: url(../../assets/img/touxiang12.svg);
              // background: url(../../assets/img/shipin.svg);
            }
            .on {
              float: left;
              font-size: 14px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
            }
            .tw {
              width: 85px;
              height: 40px;
              text-align: center;
              float: right;
              font-size: 14px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
            }
            .el-row {
              display: none;
              position: absolute;
              right: 0;
              .el-button {
                width: 120px;
                height: 36px;
                background: -webkit-gradient(
                  linear,
                  left top,
                  right top,
                  from(#ffb09e),
                  to(#fe7865)
                );
                background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
                border-radius: 6px;
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: #ffffff;
                line-height: 8px;
                border: none;
              }
              .el-button:hover {
                color: #fff;
              }
            }
          }
          .yll:hover {
            height: 40px;
            background: rgba(247, 247, 247, 1);
            .im1 {
              width: 40px;
              height: 40px;
              line-height: 40px;
              background: url(../../assets/img/shipin.svg);
            }
            .el-row {
              display: block;
            }
          }
        }
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
          font-family: PingFangSC;
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
          font-family: Montserrat-Bold;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.05);
          float: left;
        }
        .o2 {
          font-size: 28px;
          font-family: Montserrat-Bold;
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
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
      .one:last-child {
        margin-bottom: 80px;
      }
    }
    .teaIntroduce {
      margin-top: 90px;
      padding: 0 77px;
      margin-bottom: 127px;
      .title_header {
        position: relative;
        margin-bottom: 150px;
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        p {
          position: absolute;
          left: 50%;
          top: 40px;
          transform: translateX(-50%);
          font-size: 22px;
          font-family: AlibabaPuHuiTiR;
          color: rgba(153, 153, 153, 1);
          line-height: 30px;
          letter-spacing: 2px;
        }
      }
      .singleTeacher {
        margin-bottom: 74px;
        .leftImg {
          float: left;
          margin-right: 22px;
          position: relative;
          padding-top: 23px;
          width: 261px;
          height: 203px;
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
        .rightImg {
          float: right;
          margin-left: 22px;
          position: relative;
          padding-top: 23px;
          width: 261px;
          height: 203px;
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
        .leftIntro {
          float: left;
          position: relative;
          padding: 0 32px;
          .bgImg {
            position: absolute;
            right: 0;
            top: -23px;
          }
          .name {
            font-size: 24px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(69, 69, 69, 1);
            line-height: 33px;
            z-index: 100;
            right: 0;
            text-align: right;
            position: relative;
          }
          .teaTitle {
            font-size: 17px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            line-height: 24px;
            margin-bottom: 13px;
            text-align: right;
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
            text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
          }
        }
      }
    }
  }
}
</style>
