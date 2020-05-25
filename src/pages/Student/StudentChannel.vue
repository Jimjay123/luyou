<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-09-08 20:07:35
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-12-13 15:34:04
 -->
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
          <div class="casd">
            <img :src="list.popularizeImageUrl" alt class="imgsr1" />
            <img :src="list.popularizeImageUrl" alt class="imgsr2" />
            <img :src="list.popularizeImageUrl" alt class="imgsr3" />
          </div>
          <div class="corner" v-if="list.coursePlanType == 23">频道</div>
          <div class="sandchannel" v-if="list.coursePlanType == 24">沙盘频道</div>
          <span class="clock_minutes">
            <img src="../../assets/img/clock.svg" alt class="clock" />
            <span class="minutes">{{ list.duration }}分钟</span>
          </span>
          <div class="fx clearfix">
            <h3>{{ list.coursePlanName }}</h3>
            <span class="oo1" v-if="list.coursePlanType == 23">课程频道</span>
            <span class="oo1" v-if="list.coursePlanType == 24">沙盘课程频道</span>
            <span class="oo2">{{ list.duration }}分钟·{{ list.totalBundle }}章</span>
            <div class="csd">
              <img src="../../assets/img/red.svg" alt class="imr" />
              <div class="cs1" v-for="(item, index) in tagNameList" :key="index">
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
              <span class="w4">/{{ list.ownerOrgName }}</span>
            </div>

            <div class="df">
              <img
                src="../../assets/img/yiwancheng.svg"
                class="i1"
                v-if="list.finishFlag == true && list.expireFlag != true"
              />
              <img src="../../assets/img/yiguoqi.svg" class="i1" v-if="list.expireFlag == true" />
              <span class="d1" v-if="list.finishFlag == true || list.expireFlag == true || 0">最终得分</span>
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
                @click="emit(list)"
              >再学一遍</span>
              <span class="c3" v-if="list.expireFlag == true" @click="emit(list)">去学习</span>
              <el-row class="el-r" v-if="list.finishFlag == true || list.expireFlag == true">
                <el-button @click="ckemit(list)">查看报告</el-button>
              </el-row>
              <el-row
                v-if="
                  (list.finishPercent == null || list.finishPercent == 0) &&
                    list.expireFlag != true
                "
              >
                <el-button @click="emit(list)">去学习</el-button>
              </el-row>
              <el-row
                v-if="
                  list.finishPercent > 0 &&
                    list.finishPercent < 100 &&
                    list.expireFlag != true
                "
              >
                <el-button @click="emit(list)">继续学习</el-button>
              </el-row>
              <p class="p1" v-if="list.expireFlag == true">课程已过期了噢，最终成绩以截止日为准，下次早点来完成吧～</p>
              <p
                class="p1"
                v-if="list.finishFlag == true && list.expireFlag != true"
              >温故而知新，再学一遍不影响当前最终得分哦～</p>
            </div>
          </div>
        </div>

        <div class="introduction" v-if="list.summary != null">
          <div class="jj">
            <img src="../../assets/img/kcjj.svg" alt />
            <p class="kcjj">课程简介</p>
          </div>
          <p class="kcj">{{ list.summary }}</p>
        </div>

        <div class="structure">
          <div class="jg">
            <img src="../../assets/img/shu3.svg" alt />
            <p>课程结构</p>
          </div>
          <div class="jdt">
            <p class="k1">课程已完成{{ list.finishPercent || 0 }}%</p>
            <div class="k2">
              <div class="progress" :style="{ width: (list.finishPercent || 0) + '%' }"></div>
            </div>
          </div>
          <div class="ow" v-for="(item, index) in learningBundleList" :key="item.id">
            <div class="one">
              <!-- 沙盘课程需判断  start-->
              <span v-if="list.coursePlanType == 23">第{{ trimNumberFun(index + 1) }}章</span>
              <p v-if="list.coursePlanType == 23">{{ item.bundleName }}</p>
              <!-- 沙盘课程需判断 end -->
              <div
                :class="items.finishFlag == true ? kc : kz"
                v-for="items in item.courseLearningStateList"
                :key="items.courseId"
              >
                <div class="yll clearfix">
                  <div class="im1"></div>
                  <p class="on">{{ items.courseName }}</p>
                  <p class="tw">{{ items.duration }}分钟</p>
                  <el-row v-if="items.finishFlag == false">
                    <el-button @click="btEmit(items,list)">去学习</el-button>
                  </el-row>
                  <el-row v-if="Report(items.finishFlag)">
                    <el-button @click="btEmit(items,list)">去复习</el-button>
                  </el-row>
                </div>
                <div class="bg clearfix" v-if="Report(items.finishFlag)">
                  <el-row>
                    <el-button @click="ReportsChannel(items)">查看报告</el-button>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>

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

        <div class="teaIntroduce clearfix">
          <div class="title_header clearfix">
            <img src="../../assets/creator/title_headerImg.svg" alt class="clearfix" />
            <p class="clearfix">共建新时代社会工作知识共同体</p>
          </div>
          <div
            v-for="(item, index) in listz"
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
              <p class="name">{{ item.memberName }}</p>
              <p class="teaTitle">{{ item.orgName + item.position }}</p>
              <p class="teaMsg">{{ item.summary }}</p>
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
import { planLearningDetail, coursepartnerList } from "../../service/groupApi";
import TopHeaderp from "../Header/headerp";
import {
  jumpOrther,
  trimNumber,
  teaIroFun,
  tipsFail,
  memberidFun
} from "../../utils/utils";

export default {
  name: "Standarddetails",
  created() {
    let token = sessionStorage.getItem("assent_token");
    let url = this.$route.query.url;
    let ref = this.$route.query.ref;
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    // 获取页面信息接口
    planLearningDetail({
      groupId: groupId,
      coursePlanId: coursePlanId,
      coursePlanType: coursePlanType
    })
      .then(res => {
        if (res.code == "0") {
          this.list = res.data;
          this.tagNameList = res.data.tagNameList;
          this.learningBundleList = res.data.learningBundleList;

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
          this.expireFlag = res.data.expireFlag;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
    // 老师介绍接口
    coursepartnerList({ coursePlanId: coursePlanId })
      .then(res => {
        if (res.code == "0") {
          this.listz = teaIroFun(res.list);
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
      singleTeacher: "singleTeacher",
      doubleTeacher: "doubleTeacher",
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
      kc: "kc",
      kz: "kz",
      url: "",
      ref: "",
      groupId: "",
      coursePlanId: "",
      token: "",
      listz: [],
      list: [],
      tagNameList: [],
      learningBundleList: [],
      faqsList: [],
      faqsLists: [],
      jumpType: 0 // 1 npe 2 第三方
    };
  },
  methods: {
    // 去复习
    Report(val) {
      if (val == true) {
        return true;
      }
    },
    ckemit(data) {
      let type = data.coursePlanType;
      let groupId = this.$route.query.groupId;
      let coursePlanId = this.$route.query.coursePlanId;
      let coursePlanType = this.$route.query.coursePlanType;
      this.$router.push({
        path: "/StudentReportsChannel",
        query: {
          groupId: groupId,
          coursePlanId: coursePlanId,
          coursePlanType: coursePlanType
        }
      });
    },
    // 查看频道报告
    viewReport() {
      let groupId = this.$route.query.groupId;
      let coursePlanId = this.$route.query.coursePlanId;
      let coursePlanType = this.$route.query.coursePlanType;
      if (coursePlanType == 2) {
        this.$router.push({
          path: "/StudentReportsChannel",
          query: {
            groupId: groupId,
            coursePlanId: coursePlanId,
            coursePlanType: coursePlanType
          }
        });
      } else {
        this.$router.push({
          path: "/StudentReports",
          query: {
            groupId: groupId,
            coursePlanId: coursePlanId,
            coursePlanType: coursePlanType
          }
        });
      }
    },
    // 查看标准课报告
    ReportsChannel(data) {
      let groupId = this.$route.query.groupId;
      let coursePlanId = this.$route.query.coursePlanId;
      let coursePlanType = this.$route.query.coursePlanType;
      this.$router.push({
        path: "/StudentReports",
        query: {
          courseId: data.courseId,
          groupId: groupId,
          coursePlanId: coursePlanId,
          coursePlanType: data.courseType,
          isDetail: 1
        }
      });
    },
    // 返回
    backHistory() {
      // this.$router.go(-1); //返回上一层
      this.$router.push({
        path: "StudentCour"
      });
    },
    // 章节内的去学习
    btEmit(data, list) {
      let expireFlag = this.expireFlag;
      let finishFlag = data.finishFlag;
      let type = list.coursePlanType;
      let url = data.courseServerUrl;
      if (expireFlag == false || finishFlag == false) {
        //未过期 未学完
        //判断是沙盘课程还是频道
        if (type === 24) {
          //沙盘频道
          let refKeyId = data.courseId;
          let groupId = this.$route.query.groupId;
          let coursePlanId = this.$route.query.coursePlanId; // tpe标准课
          let baseUrl = window.location.href.split("#")[0] + "";
          let address = this.$route.name; // 原页面跳转
          this.$router.push({
            path: "/previewMain",
            query: {
              courseId: data.courseId,
              preview: 1,
              address: address,
              displayR: true,
              refId: refKeyId,
              groupId: groupId,
              courId: coursePlanId,
              courseType: data.courseType
            }
          });
          // let address = this.$route.name;
          // console.log(address);
          // this.$router.push({
          //   path: "/previewMain",
          //   query: {
          //     courseId: data.courseId,
          //     preview: 3,
          //     address: address,
          //     displayR: true
          //   }
          // });
        } else {
          //课程频道
          let num = url.indexOf("pptPreview");
          if (num === -1) {
            //tpe
            let token = sessionStorage.getItem("assent_token");
            let memberId = sessionStorage.getItem("memberId");
            let group = this.$route.query.groupId;
            let cour = this.$route.query.coursePlanId;
            let baseUrl = window.location.href.split("#")[0] + "";
            console.log(baseUrl);
            // let firstUrl =
            //   list.learningBundleList[0].courseLearningStateList[0]
            //     .courseServerUrl;
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
              data.courseId +
              "-" +
              memberId;
            window.open(
              window.location.href.split("#")[0] +
                "#/orther?url=" +
                encodeURIComponent(newUrl) +
                "&btnContext=" +
                true
            );
            // window.open(
            //   window.location.href.split("#")[0] +
            //     "#/orthers?url=" +
            //     encodeURIComponent(url)
            // );
          } else {
            //npe
            let groupId = this.$route.query.groupId;
            let coursePlanId = this.$route.query.coursePlanId;
            let coursePlanType = this.$route.query.coursePlanType;
            this.$router.push({
              path: "pptPreview",
              query: {
                courseId: data.courseId,
                preview: 3,
                groupId,
                coursePlanId,
                coursePlanType
              }
            });
          }
        }
      } else {
        //已过期 已学完
        if (type === 24) {
          //沙盘频道
          let address = this.$route.name;
          this.$router.push({
            path: "/previewMain",
            query: {
              courseId: data.courseId,
              preview: 3,
              address: address,
              displayR: true
            }
          });
        } else {
          //课程频道
          let num = url.indexOf("pptPreview");
          if (num === -1) {
            //tpe
            window.open(
              window.location.href.split("#")[0] +
                "#/orthers?url=" +
                encodeURIComponent(url) +
                "&btnContext=" +
                true
            );
          } else {
            //npe
            let groupId = this.$route.query.groupId;
            let coursePlanId = this.$route.query.coursePlanId;
            let coursePlanType = this.$route.query.coursePlanType;
            this.$router.push({
              path: "pptPreview",
              query: {
                courseId: data.courseId,
                preview: 3,
                groupId,
                coursePlanId,
                coursePlanType
              }
            });
          }
        }
      }
    },
    // 顶部去学习
    emit(list) {
      let channelId = list.refKeyId;
      let coursePlanId = list.coursePlanId;
      let expireFlag = list.expireFlag;
      let finishFlag = list.finishFlag;
      let type = list.coursePlanType;
      let refKeyId = list.refKeyId || -1; //已学习后的状态
      let firstUrl =
        list.learningBundleList[0].courseLearningStateList[0].courseServerUrl;
      let courseId =
        list.learningBundleList[0].courseLearningStateList[0].courseId;
      let latestNeedLearnCourseId = list.latestNeedLearnCourseId;

      if (expireFlag == true || finishFlag == true) {
        // 已过期或已学完
        console.log("已过期 已学完");
        if (type === 24) {
          // 沙盘课程频道
          let groupId = this.$route.query.groupId;
          let coursePlanId = this.$route.query.coursePlanId;
          let coursePlanType = this.$route.query.coursePlanType;

          this.$router.push({
            path: "stGoStudy",
            query: {
              channelId,
              groupId,
              coursePlanId,
              coursePlanType,
              latestNeedLearnCourseId,
              channel: 1
            }
          });

          //跳转新页面
          // window.open(
          //   window.location.href.split("#")[0] +
          //     "#/stGoStudy?channelId=" +
          //     encodeURIComponent(channelId) +
          //     "&groupId=" +
          //     groupId +
          //     "&coursePlanId=" +
          //     coursePlanId +
          //     "&latestNeedLearnCourseId=" +
          //     latestNeedLearnCourseId
          // );
        } else {
          // 课程频道
          let num = firstUrl.indexOf("pptPreview");
          if (num == -1) {
            //tpe
            // 彭代码
            let token = sessionStorage.getItem("assent_token");
            let group = this.$route.query.groupId;
            let cour = this.$route.query.coursePlanId;
            let baseUrl = window.location.href.split("#")[0] + "";
            let newUrl =
              firstUrl +
              '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
              baseUrl +
              "&content_token=" +
              group +
              "-" +
              cour +
              "-" +
              courseId +
              "-" +
              "&channel=1";
            window.open(
              window.location.href.split("#")[0] +
                "#/orther?url=" +
                encodeURIComponent(newUrl) +
                "&btnContext=" +
                true
            );
            // 熊代码
            // window.open(
            //   window.location.href.split("#")[0] +
            //     "#/orthers?url=" +
            //     encodeURIComponent(firstUrl)
            // );
          } else {
            //npe
            let groupId = this.$route.query.groupId;
            let coursePlanId = this.$route.query.coursePlanId;
            let coursePlanType = this.$route.query.coursePlanType;
            this.$router.push({
              path: "pptPreview",
              query: {
                courseId,
                preview: 3,
                groupId,
                coursePlanId,
                coursePlanType,
                channel: 1
              }
            });
          }
        }
        // if (type === 24) {
        //   // 沙盘课程频道
        //   window.open(
        //     window.location.href.split("#")[0] +
        //       "#/stGoStudy?courseChannelId=" +
        //       encodeURIComponent(ref)
        //   );
        // } else {
        //   //课程频道
        //   window.open(
        //     window.location.href.split("#")[0] +
        //       "#/orther?url=" +
        //       encodeURIComponent(url) +
        //       "&btnContext=" +
        //       true
        //   );
        // }

        // // 原版本
        // window.open(
        //   window.location.href.split("#")[0] +
        //     "#/orther?url=" +
        //     encodeURIComponent(url) +
        //     "&btnContext=" +
        //     true
        // );
      } else {
        // 未过期或未学完
        console.log("未过期 未学完-111");
        if (type === 24) {
          // 沙盘课程频道
          let groupId = this.$route.query.groupId;
          let coursePlanId = this.$route.query.coursePlanId;
          let coursePlanType = this.$route.query.coursePlanType;
          this.$router.push({
            path: "stGoStudy",
            query: {
              channelId,
              groupId,
              coursePlanId,
              coursePlanType,
              latestNeedLearnCourseId,
              channel: 1
            }
          });
          //跳转新页面
          // window.open(
          //   window.location.href.split("#")[0] +
          //     "#/stGoStudy?channelId=" +
          //     encodeURIComponent(channelId) +
          //     "&groupId=" +
          //     groupId +
          //     "&coursePlanId=" +
          //     coursePlanId +
          //     "&latestNeedLearnCourseId=" +
          //     latestNeedLearnCourseId
          // );
        } else {
          // 课程频道
          let num = firstUrl.indexOf("pptPreview");
          if (num == -1) {
            //tpe
            //彭代码
            let token = sessionStorage.getItem("assent_token");
            let memberId = sessionStorage.getItem("memberId");

            let group = this.$route.query.groupId;
            let cour = this.$route.query.coursePlanId;

            let baseUrl = window.location.href.split("#")[0] + "";
            let newUrl =
              firstUrl +
              '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
              baseUrl +
              "api/learningRecordStore/&token=" +
              token +
              "&content_token=" +
              group +
              "-" +
              cour +
              "-" +
              courseId +
              "-" +
              memberId +
              "-" +
              "&channel=1";
            window.open(
              window.location.href.split("#")[0] +
                "#/orther?url=" +
                encodeURIComponent(newUrl) +
                "&btnContext=" +
                false
            );
            console.log(newUrl);
            //熊代码
            // window.open(
            //   window.location.href.split("#")[0] +
            //     "#/orthers?url=" +
            //     encodeURIComponent(firstUrl)
            // );
          } else {
            //npe
            let groupId = this.$route.query.groupId;
            let coursePlanId = this.$route.query.coursePlanId;
            let coursePlanType = this.$route.query.coursePlanType;
            this.$router.push({
              path: "pptPreview",
              query: {
                courseId,
                preview: 3,
                groupId,
                coursePlanId,
                coursePlanType,
                channel: 1 //1 表示从课程频道中去学习的 查看报告返回课程频道报告页
              }
            });
          }
        }
        // let token = sessionStorage.getItem("assent_token");
        // let group = this.$route.query.groupId;
        // let cour = this.$route.query.coursePlanId;
        // jumpOrther(url, group, cour, ref, token);
      }
    },

    menu() {
      window.scrollTo(0, 0);
    },
    // 数字转汉字方法
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
      .df {
        width: 220px;
        height: 170px;
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
    .p1 {
      position: absolute;
      right: 0;
      bottom: 81px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFangSC;
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
    margin-bottom: 80px;
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
    .jdt {
      position: relative;
      height: 42px;
      .k1 {
        position: absolute;
        right: 0;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(254, 120, 101, 1);
        line-height: 20px;
      }
      .k2 {
        position: absolute;
        top: 30px;
        width: 1200px;
        height: 12px;
        background: rgba(240, 240, 240, 1);
        border-radius: 8px;
        div.progress {
          background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
          border-radius: 8px;
          height: 12px;
          line-height: 12px;
        }
      }
    }
    .one {
      line-height: 40px;
      margin-top: 32px;
      overflow: hidden;
      span {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(153, 153, 153, 1);
        float: left;
        margin-right: 10px;
      }
      .kc {
        height: 40px;
        margin-bottom: 10px;
        padding-right: 116px;
        position: relative;
        .yll {
          float: left;
          height: 40px;
          border-radius: 8px;
          position: relative;
          background: rgba(250, 250, 250, 1);
          width: 100%;
          .im1 {
            float: left;
            width: 40px;
            height: 40px;
            margin-right: 6px;
            position: absolute;
            top: 0;
            left: 0;
            background: url(../../assets/img/k2.svg);
          }
          .on {
            margin-left: 46px;
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
            margin-right: 15px;
          }
          .el-row {
            position: absolute;
            right: 0;
            display: none;
            .el-button {
              line-height: 1px;
              border: none;
              width: 85px;
              height: 40px;
              background: linear-gradient(
                90deg,
                rgba(255, 176, 158, 1) 0%,
                rgba(254, 120, 101, 1) 100%
              );
              border-radius: 8px;
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
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
            background: url(../../assets/img/k4.svg);
          }
          .tw {
            display: none;
          }
          .el-row {
            display: block;
          }
        }
        .bg {
          position: absolute;
          right: 0;
          float: right;
          .el-button {
            text-align: center;
            width: 100px;
            height: 40px;
            border-radius: 8px;
            border: 2px solid rgba(254, 120, 101, 0.4);
            font-size: 16px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(254, 120, 101, 1);
            line-height: 8px;
            padding: 0;
          }
          .el-button:hover {
            background-color: #fff;
          }
        }
      }
      .kz {
        height: 40px;
        margin-bottom: 10px;
        // padding-right: 116px;
        .yll {
          float: left;
          height: 40px;
          border-radius: 8px;
          position: relative;
          background: rgba(250, 250, 250, 1);
          width: 100%;
          .im1 {
            float: left;
            width: 40px;
            height: 40px;
            margin-right: 6px;
            position: absolute;
            top: 0;
            left: 0;
            background: url(../../assets/img/k2.svg);
          }
          .on {
            margin-left: 46px;
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
            margin-right: 15px;
          }
          .el-row {
            position: absolute;
            right: 0;
            display: none;
            .el-button {
              line-height: 1px;
              border: none;
              width: 85px;
              height: 40px;
              background: linear-gradient(
                90deg,
                rgba(255, 176, 158, 1) 0%,
                rgba(254, 120, 101, 1) 100%
              );
              border-radius: 8px;
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
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
            background: url(../../assets/img/k4.svg);
          }
          .tw {
            display: none;
          }
          .el-row {
            display: block;
          }
        }
        .bg {
          position: absolute;
          right: 0;
          float: right;
          .el-button {
            text-align: center;
            width: 100px;
            height: 40px;
            border-radius: 8px;
            border: 2px solid rgba(254, 120, 101, 0.4);
            font-size: 16px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(254, 120, 101, 1);
            line-height: 8px;
            padding: 0;
          }
          .el-button:hover {
            background-color: #fff;
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
