<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <TopHeader class="clearfix"></TopHeader>

      <!-- 内容 -->
      <el-main clearfix>
        <div class="Analysis">
          <div class="fh">
            <a href="javascript:;" v-on:click="backHistory">
              <img src="../../assets/img/fanhui1.svg" alt />
              <span>返回</span>
            </a>
          </div>
          <img :src="coursePlanInfo.popularizeImageUrl" alt />
          <div
            class="sandstandard"
            v-if="coursePlanInfo.type === 25 || coursePlanInfo.type === 26"
          >沙盘</div>
          <span class="clock_minutes">
            <img src="../../assets/img/clock.svg" alt class="clock" />
            <span class="minutes">{{coursePlanInfo.duration}}分钟</span>
          </span>
          <div class="fx">
            <h3>{{coursePlanInfo.name}}</h3>
            <span class="oo1" v-if="coursePlanInfo.type === 21 || coursePlanInfo.type === 22">标准课</span>
            <span class="oo1" v-if="coursePlanInfo.type === 25 || coursePlanInfo.type === 26">沙盘标准课</span>
            <span class="oo2">{{coursePlanInfo.duration}}分钟</span>
            <div class="csd">
              <img src="../../assets/img/red.svg" alt class="imr" />
              <div class="cs1" v-for="item in tagNameList" :key="item">
                <span>{{item}}</span>
              </div>
              <div class="cs2"></div>
            </div>
            <div class="names">
              <img
                :src="ownerInfo.avatar || require('../../assets/img/touxiang.svg')"
                alt
                class="w1"
              />
              <span class="w2">{{ownerInfo.name}}</span>
              <img src="../../assets/img/v1.svg" alt class="w3" v-if="ownerInfo.level != 0" />
              <span class="w4">/{{ownerInfo.orgName}}</span>
            </div>
            <el-row>
              <el-button @click="Thirdparty(coursePlanInfo.type,coursePlanInfo.refKeyId)">预览课程</el-button>
            </el-row>
          </div>
        </div>
        <!-- 内容简介 -->
        <div
          class="introduction"
          v-if="coursePlanInfo.summary == '' || coursePlanInfo.summary == null ? false:true"
        >
          <div class="jj">
            <img src="../../assets/img/kcjj.svg" alt />
            <p class="kcjj">课程简介</p>
          </div>
          <p class="kcj">{{coursePlanInfo.summary}}</p>
        </div>
        <!-- 学到什么 -->
        <div class="Acquire">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt />
            <p>{{faqsList.question}}</p>
          </div>
          <div class="acqu">
            <div class="one" v-for="(items,index) in faqsList.answerList" :key="items.id">
              <span class="o1" v-if="index < 9">0</span>
              <span class="o2">{{index+1}}</span>
              <div class="yll">
                <p class="on">{{items}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 学到什么 -->
        <div class="Acquire">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt />
            <p>{{faqsLists.question}}</p>
          </div>
          <div class="acqu">
            <div class="one" v-for="(items,index) in faqsLists.answerList" :key="items.id">
              <span class="o1" v-if="index < 9">0</span>
              <span class="o2">{{index+1}}</span>
              <div class="yll">
                <p class="on">{{items}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 老师介绍 -->
        <div class="teachers">
          <div class="jg">
            <img src="../../assets/img/szjs.svg" alt />
            <h3>共建新时代社会工作知识共同体</h3>
          </div>
        </div>

        <div class="singleTeacher clearfix" v-for="item in list" :key="item.id">
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import { coursecourseDetail, memberRecommenList } from "../../service/groupApi";
import TopHeader from "../Header/header";
import { trimNumber } from "../../utils/utils";
export default {
  name: "Standarddetails",

  created() {
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    // 获取页面信息接口
    coursecourseDetail({ coursePlanId: coursePlanId })
      .then(res => {
        if (res.code == "0") {
          this.coursePlanInfo = res.data.coursePlanInfo;
          // if (this.coursePlanInfo.type == 1) {
          //   this.coursePlanInfo.type = "标准课";
          // } else {
          //   this.coursePlanInfo.type = "课程频道";
          // }
          this.ownerInfo = res.data.ownerInfo;
          this.url = res.data.bundleList[0].courseList[0].courseServerUrl;
          this.lessonList = res.data.bundleList[0].courseList[0].lessonList;
          this.tagNameList = res.data.tagNameList;

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

          this.bundleTotal = res.data.bundleTotal;

          this.list = res.data.coursePartnerList;
          console.log(this.list);
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
      faqs: {
        id: 1,
        question: "你将学到什么",
        answerList: ["未设置", "未设置", "未设置"]
      },
      faqsz: {
        id: 1,
        question: "课程基本要求",
        answerList: ["未设置", "未设置", "未设置"]
      },

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
      coursePlanInfo: [],
      faqsList: [],
      faqsLists: [],
      ownerInfo: [],
      tagNameList: [],
      recommendTeacherPage: []
    };
  },
  methods: {
    // 返回
    backHistory() {
      // groupStaAnalysis?coursePlanId=573&coursePlanType=22&groupId=91
      // this.$router.go(-1); //返回上一层
      let coursePlanId = this.$route.query.coursePlanId;
      let coursePlanType = this.$route.query.coursePlanType;
      let groupId = this.$route.query.groupId;
      this.$router.push({
        path: "/groupStaAnalysis",
        query: {
          coursePlanId,
          coursePlanType,
          groupId
        }
      });
    },
    // 预览
    Thirdparty(type, id) {
      console.log(type, id);
      let newUrl = this.url;
      console.log(newUrl);
      if (type === 22) {
        // npe标准课
        this.$router.push({
          path: "/pptPreview",
          query: {
            courseId: id,
            preview: 2
          }
        });
        // courseId=1385
      } else if (type === 25 || type === 26) {
        // TPE/NPE沙盘标准课
        let address = this.$route.name;
        console.log(address);
        // 原页面跳转
        this.$router.push({
          path: "/previewMain",
          query: {
            courseId: id,
            preview: 1,
            address: address,
            displayR: true,
            refId: id
          }
        });
        // window.open(
        //   window.location.href.split("#")[0] +
        //     "#/orther?url=" +
        //     encodeURIComponent(newUrl)
        // );
      } else if (type === 21) {
        // tpe标准课
        window.open(
          window.location.href.split("#")[0] +
            "#/orther?url=" +
            encodeURIComponent(newUrl)
        );
      }
    },
    // 数字转汉字方法
    trimNumberFun(val) {
      return trimNumber(val);
    },
    menu() {
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    this.menu();
  },
  components: {
    TopHeader: TopHeader //注册该组件
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
        // height: 37px;
        line-height: 37px;
        font-size: 26px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
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
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(254, 120, 101, 1);
        line-height: 22px;
      }
      .csd {
        position: absolute;
        bottom: 116px;
        // position: relative;
              width: 613px;
        height: 25px;
        // margin-top: 45px;
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
            color: #999;
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
      .el-row {
        position: absolute;
        bottom: 81px;
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
          border: none;
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
      position: relative;
      height: 40px;
      line-height: 40px;
      margin-bottom: 30px;
      img {
        position: absolute;
        left: -10px;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.01);
      }
      h3 {
        line-height: 40px;
        font-size: 20px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(254, 120, 101, 1);
        letter-spacing: 1px;
        margin-left: 30px;
      }
    }
    .one {
      height: 40px;
      line-height: 40px;
      margin-bottom: 33px;
      span {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(153, 153, 153, 1);
        float: left;
        margin-right: 10px;
      }
      .yll {
        width: 1132px;
        margin-left: 78px;
        height: 40px;
        border-radius: 8px;
        position: relative;
        background: rgba(250, 250, 250, 1);
        .im1 {
          float: left;
          width: 40px;
          height: 40px;
          margin-right: 6px;
          background: url(../../assets/img/touxiang12.svg);
        }
        .on {
          float: left;
          font-size: 14px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
        }
        .el-row {
          position: absolute;
          right: 0;
          display: none;
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
          }
          .el-button:hover {
            color: #fff;
          }
        }
      }
      .yll:hover {
        width: 1132px;
        margin-left: 78px;
        height: 40px;
        background: rgba(247, 247, 247, 1);
        .im1 {
          background: url(../../assets/img/shipin.svg);
        }
        .el-row {
          display: block;
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
  .ban {
    width: 444px;
    height: 550px;
    background: rgba(247, 247, 247, 1);
    border-radius: 12px;
    border: 1px solid rgba(249, 249, 249, 1);
    text-align: center;
    margin: 0 auto;
    img {
      width: 120px;
      height: 120px;
      border-radius: 35%;
      margin-top: 50px;
    }
    h3 {
      margin-top: 20px;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(69, 69, 69, 1);
    }
    .mc {
      font-size: 17px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      margin-bottom: 24px;
    }
    .js {
      margin-top: 24px;
      margin: 0 auto;
      width: 344px;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 27px;
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
