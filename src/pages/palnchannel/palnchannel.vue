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
          <div class="casd">
            <img :src="coursePlanInfo.popularizeImageUrl" alt class="imgsr1" />
            <img :src="coursePlanInfo.popularizeImageUrl" alt class="imgsr2" />
            <img :src="coursePlanInfo.popularizeImageUrl" alt class="imgsr3" />
          </div>
          <div class="corner" v-if="coursePlanInfo.type == 23">频道</div>
          <div class="sandchannel" v-if="coursePlanInfo.type == 24">沙盘频道</div>
          <span class="clock_minutes">
            <img src="../../assets/img/clock.svg" alt class="clock" />
            <span class="minutes">{{coursePlanInfo.duration}}分钟</span>
          </span>
          <div class="fx">
            <h3>{{coursePlanInfo.name}}</h3>
            <span class="oo1" v-if="coursePlanInfo.type == 23">课程频道</span>
            <span class="oo1" v-if="coursePlanInfo.type == 24">沙盘课程频道</span>
            <span class="oo2">{{coursePlanInfo.duration}}分钟·{{bundleTotal}}章</span>
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
              <el-button @click="Thirdparty(wrz,coursePlanInfo)">去预览</el-button>
            </el-row>
          </div>
        </div>
        <!-- 内容简介 -->
        <div
          class="introduction"
          v-if="coursePlanInfo.summary != null || coursePlanInfo.summary != undefined"
        >
          <div class="jj">
            <img src="../../assets/img/kcjj.svg" alt />
            <p class="kcjj">课程简介</p>
          </div>
          <p class="kcj">{{coursePlanInfo.summary}}</p>
        </div>
        <!-- 课程结构 -->
        <div class="structure">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt class="is" />
            <p>课程结构</p>
          </div>
          <div class="ow" v-for="(item,index) in bundleList" :key="item.id">
            <div class="one">
              <span v-if="coursePlanInfo.type == 23">第{{trimNumberFun(index+1)}}章</span>
              <p v-if="coursePlanInfo.type == 23">{{item.bundleName}}</p>
              <div class="yll" v-for="items in item.courseList" :key="items.id">
                <img src alt class="im1" />
                <p class="on">{{items.courseName}}</p>
                <p class="tw">{{items.duration}}分钟</p>
                <el-row>
                  <el-button @click="Thirdparty1(items,wrz)">预览</el-button>
                </el-row>
              </div>
            </div>
          </div>
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
        <div class="teaIntroduce clearfix">
          <div class="title_header clearfix">
            <img src="../../assets/creator/title_headerImg.svg" alt class="clearfix" />
            <p class="clearfix">共建新时代社会工作知识共同体</p>
          </div>
          <div
            v-for="(item,index) in list"
            :key="item.id"
            :class="index % 2 === 0 ? singleTeacher : doubleTeacher"
          >
            <div class="leftImg clearfix">
              <img :src="item.avatar" alt class="onImg clearfix" />
              <img
                src="../../assets/creator/patternBg_orange.svg"
                alt
                class="underImg clearfix"
                v-if="index % 2 === 0"
              />
              <img
                src="../../assets/creator/patternBg_blue.svg"
                alt
                class="underImg clearfix"
                v-if="index % 2 != 0"
              />
            </div>
            <div class="rightIntro clearfix">
              <img
                src="../../assets/creator/bg_quotatioMarks.svg"
                alt
                class="bgImg"
                v-if="index % 2 === 0"
              />
              <img
                src="../../assets/creator/bg_quotatioMarks_right.svg"
                alt
                class="bgImg"
                v-if="index % 2 != 0"
              />
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
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

import TopHeader from "../Header/header";
import {
  ChannelDetail,
  coursepartnerList,
  memberidentifyRoleType
} from "../../service/groupApi";
import { trimNumber, tipsTitle, teaIroFun } from "../../utils/utils";
export default {
  name: "prechannel",
  created() {
    let coursePlanId = this.$route.query.coursePlanId;
    // 获取页面信息接口
    ChannelDetail({ coursePlanId: coursePlanId })
      .then(res => {
        if (res.code == "0") {
          this.availPreview = res.data.availPreview;
          this.url = res.data.bundleList[0].courseList[0].courseServerUrl;
          this.ownerInfo = res.data.ownerInfo;
          this.coursePlanInfo = res.data.coursePlanInfo;
          this.bundleList = res.data.bundleList;
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
          // this.list = teaIroFun(res.data.coursePartnerList || []);
        } else {
          console.log(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
    // 老师介绍接口
    coursepartnerList({ coursePlanId: coursePlanId })
      .then(res => {
        if (res.code == "0") {
          this.list = teaIroFun(res.list);
        } else {
          console.log(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
    // 身份识别
    memberidentifyRoleType({})
      .then(res => {
        if (res.code == "0") {
          this.wrz = res.identifiedRoleType;
        } else {
          console.log(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
  },
  data() {
    return {
      availPreview: "",
      singleTeacher: "singleTeacher",
      doubleTeacher: "doubleTeacher",
      wrz: "",
      url: "",
      bundleTotal: "",
      list: [],
      ownerInfo: [],
      coursePlanInfo: [],
      tagNameList: [],
      bundleList: [],
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
      }
    };
  },
  methods: {
    // 返回上一层
    backHistory() {
      // this.$router.go(-1); //返回上一层
      this.$router.push({
        path: "Uncertified"
      });
    },
    // 预览点击
    Thirdparty(wrz, data) {
      let availPreview = this.availPreview;
      if (availPreview == false && wrz == 1) {
        tipsTitle("该课程暂未授权，可联系陆由（021-80197088）了解授权");
      } else if (availPreview == false && wrz == 2) {
        tipsTitle("该课程暂未授权，请联系专业老师处理");
      } else if (wrz == 0 || wrz == 4) {
        tipsTitle("您暂未认证，请先认证成功后再查看课程");
      } else {
        // console.log(wrz, data);

        if (data.type === 24) {
          // 沙盘课程频道
          window.open(
            window.location.href.split("#")[0] +
              "#/teaPreview?courseChannelId=" +
              encodeURIComponent(data.refKeyId)
          );
        } else if (data.type === 23) {
          // 课程频道
          let newUrl = this.url;
          let num = newUrl.indexOf("pptPreview");
          if (num == -1) {
            //tpe
            window.open(
              window.location.href.split("#")[0] +
                "#/orthers?url=" +
                encodeURIComponent(newUrl) +
                "&show=1"
            );
          } else {
            //npe
            window.location.href = newUrl + "&preview=2";
          }
        }

        // 原版本
        // let newUrl = this.url;
        // window.open(
        //   window.location.href.split("#")[0] +
        //     "#/orther?url=" +
        //     encodeURIComponent(newUrl)
        // );
      }
    },
    // 课程结构预览点击
    Thirdparty1(data, wrz) {
      let newUrl = data.courseServerUrl;
      let courseId = data.courseId;
      let type = data.courseType;
      let availPreview = this.availPreview;
      if (availPreview == false && wrz == 1) {
        tipsTitle("该课程暂未授权，可联系陆由（021-80197088）了解授权");
      } else if (availPreview == false && wrz == 2) {
        tipsTitle("该课程暂未授权，请联系专业老师处理");
      } else if (wrz == 0 || wrz == 4) {
        tipsTitle("您暂未认证，请先认证成功后再查看课程");
      } else {
        if (type === 3 || type === 4) {
          // tpe沙盘 npe沙盘
          let address = this.$route.name;
          // 原页面跳转
          this.$router.push({
            path: "/previewMain",
            query: {
              courseId: courseId,
              preview: 1,
              address: address,
              displayR: true,
              refId: data.id
            }
          });
        } else {
          let newUrl = data.courseServerUrl;
          if (type === 2) {
            //npe
            window.location.href = newUrl + "&preview=2";
          } else {
            //tpe
            window.open(
              window.location.href.split("#")[0] +
                "#/orthers?url=" +
                encodeURIComponent(newUrl) +
                "&show=1"
            );
          }
          // window.open(
          //   window.location.href.split("#")[0] +
          //     "#/orther?url=" +
          //     encodeURIComponent(newUrl)
          // );
        }
      }
    },
    // 数字转汉字
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
      height: 47px;
      line-height: 47px;
      a {
        height: 47px;
        line-height: 47px;
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
    .casd {
      position: relative;
      height: 170px;
      width: 280px;
      float: left;
      .imgsr1 {
        position: absolute;
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
    }
    .corner {
      position: absolute;
      top: 47px;
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
    }
    .sandchannel {
      position: absolute;
      top: 47px;
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
      z-index: 91;
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
        margin-right: 40px;
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
          float: left;
        }
        .w2 {
          float: left;
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-right: 8px;
          line-height: 20px;
          float: left;
        }
        .w3 {
          float: left;
          width: 16px;
          height: 12px;
          line-height: 20px;
          margin-top: 5px;
          margin-right: 3px;
          float: left;
        }
        .w4 {
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(194, 194, 194, 1);
          line-height: 20px;
          float: left;
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
          border: none;
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
    margin-bottom: 22px;
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
      height: 204px;
      margin-bottom: 97px;
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
          width: 235px;
          height: 185px;
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
      // margin-bottom: 74px;
      height: 204px;
      margin-bottom: 85px;
      .leftImg {
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
      .rightIntro {
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
          text-align: right;
          text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
        }
      }
    }
  }
}
</style>
