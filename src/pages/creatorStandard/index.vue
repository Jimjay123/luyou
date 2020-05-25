<template>
  <div class="creatorStandard">
    <el-container>
      <TopHeader />
      <!-- 内容 -->
      <el-main clearfix style="padding:0;">
        <div class="Analysis">
          <img :src="courseInfo.popularizeImageUrl" alt />
          <div class="sandstandard" v-if="courseInfo.type === 4 || courseInfo.type === 3">沙盘</div>
          <span class="clock_minutes">
            <img src="../../assets/img/clock.svg" alt class="clock" />
            <span class="minutes">{{courseInfo.duration}}分钟</span>
          </span>
          <div class="fx">
            <h3>{{courseInfo.name||'标题未命名'}}</h3>
            <span class="oo1" v-if="courseInfo.type === 1 || courseInfo.type === 2">标准课</span>
            <span class="oo1" v-if="courseInfo.type === 3 || courseInfo.type === 4">沙盘标准课</span>
            <span class="oo2">{{courseInfo.duration}}分钟</span>
            <div class="csd">
              <img src="../../assets/img/red.svg" alt class="imr" />
              <div class="cs1" v-for="(items,index) in tagNameList" :key="index">
                <span>{{items}}</span>
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
              <el-button @click="Thirdparty(courseInfo)">去预览</el-button>
            </el-row>
          </div>
        </div>

        <div
          class="introduction"
          v-if="courseInfo.mainContent != null || courseInfo.mainContent != undefined"
        >
          <div class="jj">
            <img src="../../assets/img/kcjj.svg" alt />
            <p class="kcjj">课程简介</p>
          </div>
          <p class="kcj">{{courseInfo.mainContent}}</p>
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

        <div class="teaIntroduce clearfix">
          <div class="title_header clearfix">
            <img src="../../assets/creator/title_headerImg.svg" alt class="clearfix" />
            <p class="clearfix">共建新时代社会工作知识共同体</p>
          </div>
          <div class="singleTeacher clearfix" v-for="(item,index) in list" :key="index">
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
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  courPlanDetail, //推荐频道/标准课详情页
  memberRecommenList, //标准课详情页
  memberidentifyRoleType //认证
} from "../../service/groupApi";
import { creatorCourseChannelDetail } from "../../service/teachersApi";
import { trimNumber } from "../../utils/utils";
import TopHeader from "./../Header/creatorHeader";
export default {
  name: "creatorStandard",
  components: {
    TopHeader
  },
  created() {
    let courseId = this.$route.query.courseId;
    // 获取页面信息接口
    courPlanDetail({ courseId: courseId })
      .then(res => {
        if (res.code == "0") {
          this.courseInfo = res.data.courseInfo;
          this.ownerInfo = res.data.ownerInfo;
          this.url = res.data.courseInfo.courseServerUrl;
          this.tagNameList = res.data.tagNameList;
          this.faqsList = res.data.faqsList;

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

          this.list = res.data.coursePartnerList || [];
          // this.recommendTeacherPage = res.data.recommendTeacherPage.list;
          this.bundleTotal = res.data.bundleTotal;
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
      list: [],
      url: "",
      courseInfo: [],
      faqsList: [],
      faqsLists: [],
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
      ownerInfo: [],
      tagNameList: []
    };
  },
  methods: {
    toHome() {
      this.$router.push("/creator/home");
    },
    // 预览
    Thirdparty(data) {
      let type = data.type;
      if (type == 1) {
        // tpe
        let newUrl = this.url;
        window.open(
          window.location.href.split("#")[0] +
            "#/orthers?url=" +
            encodeURIComponent(newUrl)
        );
      } else if (type == 2) {
        this.$router.push({
          path: "/pptPreview",
          query: {
            courseId: data.id,
            preview: 1
          }
        });
      } else if (type == 3 || type == 4) {
        // 沙盘npe||沙盘tpe
        let address = this.$route.name;
        // 原页面跳转
        this.$router.push({
          path: "/previewMain",
          query: {
            courseId: data.id,
            preview: 1,
            address: address,
            displayR: true
          }
        });
      }
      // 原版本
      // let courseType = this.$route.query.courseType;
      // if (courseType) {
      //   this.$router.push({
      //     path: "/pptPreview",
      //     query: {
      //       courseId: this.$route.query.courseId,
      //       preview: 1
      //     }
      //   });
      // } else {
      //   let newUrl = this.url;
      //   window.open(
      //     window.location.href.split("#")[0] +
      //       "#/orthers?url=" +
      //       encodeURIComponent(newUrl)
      //   );
      // }
    }
  }
};
</script>>

<style lang="less" scoped>
.creatorStandard {
  .el-container {
    margin: 0 auto;
    width: 100%;
    display: block;
  }
  .el-main {
    display: block;
    margin: 0 auto;
    width: 1240px;
    overflow: hidden;
    .Analysis {
      width: 1200px;
      margin-left: 20px;
      position: relative;
      height: 274px;
      overflow: hidden;
      padding-top: 24px;
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
        top: 24px;
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
        z-index: 91;
        transition: 0.2s;
      }
      .clock_minutes {
        position: absolute;
        bottom: 80px;
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
        width: 650px;
        height: 170px;
        float: left;
        margin-left: 50px;
        overflow: hidden;
        h3 {
          // height: 37px;
          line-height: 37px;
          font-size: 26px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
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
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(254, 120, 101, 1);
          line-height: 22px;
        }
        .csd {
          // position: relative;
          width: 613px;
          height: 25px;
          // margin-top: 45px;
          position: absolute;
          bottom: 116px;
          overflow: hidden;
          white-space: nowrap;
          .imr {
            margin-top: 5px;
            width: 40px;
            height: 20px;
            margin-right: 11px;
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
          bottom: 80px;
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
          bottom: 80px;
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
          // .tw {
          //   width: 85px;
          //   height: 40px;
          //   text-align: center;
          //   float: right;
          //   font-size: 14px;
          //   font-family: PingFangSC-Medium;
          //   font-weight: 500;
          //   color: rgba(153, 153, 153, 1);
          // }
          .el-row {
            position: absolute;
            right: 0;
            display: none;
            .el-button {
              width: 85px;
              height: 40px;
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
        margin-bottom: 11px;
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
      }
      .doubleTeacher {
        margin-bottom: 74px;
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
