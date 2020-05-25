<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <TopHeaderp class="clearfix"></TopHeaderp>

      <!-- 内容 -->
      <el-main class="clearfix">
        <!-- 推荐的课程计划 -->
        <div class="plana">
          <div class="ans1">
            <span></span>
            <i>我的课程</i>
          </div>
        </div>
        <!-- 筛选按钮 -->
        <div class="but">
          <el-row>
            <el-button plain @click="handleClickTab('全部')">
              <div ref="q" :class="{'butto': butt == buttq ? true : false,}">全部</div>
            </el-button>
            <el-button plain @click="handleClickTab('待完成')">
              <div ref="d" :class="{'butto': butt == buttd ? true : false,}">待完成</div>
            </el-button>
            <el-button plain @click="handleClickTab('已完成')">
              <div ref="y" :class="{'butto': butt == butty ? true : false,}">已完成</div>
            </el-button>
            <el-button plain @click="handleClickTab('已过期')">
              <div ref="g" :class="{'butto': butt == buttg ? true : false,}">已过期</div>
            </el-button>
          </el-row>
        </div>
        <!-- 内容显示 -->
        <div class="cards clearfix">
          <div
            class="gkd clearfix"
            v-for="item in list"
            :key="item.id"
            @click="xueclick(item.groupId,item.coursePlanId,item.coursePlanType,)"
          >
            <div class="nas1">
              <a href="javascript:;" class="nas">
                <div class="he">
                  <img :src="item.popularizeImageUrl" alt class="imgs1" />
                  <div class="corner" v-if="item.coursePlanType === 23 ? true:false">频道</div>
                  <div class="sandchannel" v-if="item.coursePlanType === 24 ? true:false">沙盘频道</div>
                  <div
                    class="sandstandard"
                    v-if="(item.coursePlanType === 25 || item.coursePlanType === 26) ? true:false"
                  >沙盘</div>
                  <div class="count">
                    <p class="one" v-if="item.courseType === '未开始'">未开始</p>
                    <p class="two" v-else-if="item.courseType === '进行中'">
                      已完成
                      <span>{{item.finishPercent}}%</span>
                    </p>
                    <p class="three" v-else-if="item.courseType === '已完成'">已完成</p>
                    <p class="four" v-else-if="item.courseType === '已过期'">已过期</p>
                    <p class="five" v-if="item.expireFlag == true">完成了：{{item.finishPercent||0}}%</p>
                  </div>
                </div>
                <div class="chang">
                  <div
                    class="progress"
                    :style="{width:(item.finishPercent||0)+'%'}"
                    v-if="item.finishPercent > 0 && item.finishPercent < 100"
                  ></div>
                  <div
                    class="progres"
                    :style="{width:(item.finishPercent||0)+'%'}"
                    v-if="item.finishPercent == 100"
                  ></div>
                </div>
                <div class="statistics">
                  <h3>{{item.coursePlanName}}</h3>
                  <div class="ri">
                    <p class="two">截止日</p>
                    <span>：</span>
                    <span>{{item.endDate}}</span>
                  </div>

                  <div class="qun">
                    <p class="two">群组</p>
                    <span>：</span>
                    <span class="twoos">{{item.groupName}}</span>
                  </div>

                  <div class="act">
                    <img :src="item.avatar || require('../../assets/img/touxiang.svg')" />
                    <p>{{item.teacherName}}</p>
                  </div>

                  <el-row>
                    <el-button
                      class="qxx"
                      v-if="item.courseType === '未开始'"
                      @click.stop="xueclick(item.groupId,item.coursePlanId,item.coursePlanType,)"
                    >
                      <span>去学习</span>
                    </el-button>
                  </el-row>

                  <el-row>
                    <el-button
                      class="tws"
                      v-if="item.courseType === '进行中'"
                      @click.stop="xueclick1(item.courseServerUrl,item.groupId,item.coursePlanId,item.coursePlanType,item.refKeyId)"
                    >
                      <span>继续学习</span>
                    </el-button>
                  </el-row>

                  <el-row>
                    <el-button
                      class="ths"
                      v-if="item.finishFlag == true || item.expireFlag == true"
                      @click.stop="xueclick2(item.groupId,item.coursePlanId,item.coursePlanType,item.refKeyId)"
                    >
                      <span>查看报告</span>
                    </el-button>
                  </el-row>

                  <div class="wc" v-if="item.finishFlag == true && item.expireFlag != true">
                    <img src="../../assets/img/yiwancheng.svg" alt />
                  </div>

                  <div class="gq" v-if="item.expireFlag === true">
                    <img src="../../assets/img/yiguoqi.svg" alt />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <!-- 缺省页 -->
        <div class="nocourse" v-if="list == null || list == ''">
          <img src="../../assets/img/kecheng.svg" alt />
          <!-- <h3>暂无可学习课程～</h3> -->
          <h3>暂无课程～</h3>
          <p>等待老师发布课程后再来学习吧～</p>
        </div>

        <!--分页插件 start-->
        <PaginationItem
          :options="{page:page,limit:limit,total:total,cb:paginCb}"
          style="margin-bottom:53px;margin-top:61px;"
        ></PaginationItem>
        <!--分页插件 end-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { studentCourseList } from "../../service/groupApi";
import PaginationItem from "../group/paginationItem";
import { stuGroPlaLeaStaList } from "../../service/studentApi";
import TopHeaderp from "../Header/headerp";
import { jumpOrther } from "../../utils/utils";
export default {
  name: "Courseplan",

  created() {
    // 内容数据接口
    studentCourseList({ limit: "28", page: "1" })
      .then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
          this.total = res.page.totalCount;
          let list = res.page.list;
          list.map(item => {
            if (
              (item.finishPercent == null || item.finishPercent == 0) &&
              item.expireFlag != true
            ) {
              item.courseType = "未开始"; // 未开始
            } else if (
              item.finishPercent > 0 &&
              item.finishPercent < 100 &&
              item.expireFlag != true
            ) {
              item.courseType = "进行中"; //进行中
            } else if (item.finishFlag == true && item.expireFlag != true) {
              item.courseType = "已完成"; //已完成
            } else if (item.expireFlag == true) {
              item.courseType = "已过期"; //已过期
            }
          });
          this.butt = "全部";
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
      butt: "",
      buttq: "全部",
      buttd: "待完成",
      butty: "已完成",
      buttg: "已过期",
      total: "",
      limit: 28,
      page: 1,
      iscard: true,
      none: false,
      inputVal: "",
      list: [],
      clickTab: "全部",
      eky: ""
    };
  },
  methods: {
    // 分页
    paginCb(page, size, options = {}) {
      this.page = page;
      this.limit = size;
      let opt = {
        page: page,
        limit: size
      };
      let tabType =
        options.tabType !== undefined
          ? options.tabType === "all"
            ? undefined
            : options.tabType
          : this.tabType == "all"
          ? undefined
          : this.tabType;
      if (tabType !== undefined) {
        opt.finishFlag = tabType == "finish" ? true : false;
      }
      this.groCouPlaCoursePlanListFun(opt);
    },
    groCouPlaCoursePlanListFun(data) {
      studentCourseList(data).then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
          this.total = res.page.totalCount;
          let list = res.page.list;
          list.map(item => {
            if (
              (item.finishPercent == null || item.finishPercent == 0) &&
              item.expireFlag != true
            ) {
              item.courseType = "未开始"; // 未开始
            } else if (
              item.finishPercent > 0 &&
              item.finishPercent < 100 &&
              item.expireFlag != true
            ) {
              item.courseType = "进行中"; //进行中
            } else if (item.finishFlag == true && item.expireFlag != true) {
              item.courseType = "已完成"; //已完成
            } else if (item.expireFlag == true) {
              item.courseType = "已过期"; //已过期
            }
          });
        } else {
          tipsFail(res.msg);
        }
      });
    },
    // 去学习跳转详情页
    xueclick(group, cour, type) {
      if (type === 23 || type == 24) {
        this.$router.push({
          path: "/StudentChannel",
          query: {
            groupId: group,
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      } else {
        this.$router.push({
          path: "/StudentStandard",
          query: {
            groupId: group,
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      }
    },
    // 继续学习跳转详情页
    xueclick1(url, group, cour, type, ref) {
      let memberId = sessionStorage.getItem("memberId");
      let token = sessionStorage.getItem("assent_token");
      this.group = group;
      this.cour = cour;
      this.type = type;
      if (type === 23 || type == 24) {
        this.$router.push({
          path: "/StudentChannel",
          query: {
            groupId: group,
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      } else if (type === 25 || type === 26) {
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
            courId: cour
          }
        });
      } else if (type === 21) {
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
          ref +
          "-" +
          memberId;
        window.open(
          window.location.href.split("#")[0] +
            "#/orther?url=" +
            encodeURIComponent(newUrl) +
            "&btnContext=" +
            false
        );
      } else if (type === 22) {
        let courseId = ref;
        this.$router.push({
          path: "pptPreview",
          query: {
            courseId,
            groupId: group,
            coursePlanId: cour,
            coursePlanType: type,
            preview: 3
          }
        });
      }
    },
    // 查看报告
    xueclick2(group, cour, type, refKeyId) {
      if (type === 23 || type == 24) {
        this.$router.push({
          path: "/StudentReportsChannel",
          query: {
            groupId: group,
            coursePlanId: cour,
            coursePlanType: type,
            courseId: refKeyId
          }
        });
      } else {
        this.$router.push({
          path: "/StudentReports",
          query: {
            groupId: group,
            coursePlanId: cour,
            coursePlanType: type,
            courseId: refKeyId
          }
        });
      }
    },
    menu() {
      window.scrollTo(0, 0);
    },
    // 筛选
    handleClickTab(val) {
      if (this.clickTab !== val) {
        this.clickTab = val;
        if (val == "全部") {
          this.butt = val;
          studentCourseList({ limit: "28", page: "1" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                list.map(item => {
                  if (
                    (item.finishPercent == null || item.finishPercent == 0) &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "未开始"; // 未开始
                  } else if (
                    item.finishPercent > 0 &&
                    item.finishPercent < 100 &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "进行中"; //进行中
                  } else if (
                    item.finishFlag == true &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "已完成"; //已完成
                  } else if (item.expireFlag == true) {
                    item.courseType = "已过期"; //已过期
                  }
                });
                this.total = res.page.totalCount;
                this.eky = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (val == "待完成") {
          this.butt = val;
          studentCourseList({ limit: "28", page: "1", finishFlag: "0" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                list.map(item => {
                  if (
                    (item.finishPercent == null || item.finishPercent == 0) &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "未开始"; // 未开始
                  } else if (
                    item.finishPercent > 0 &&
                    item.finishPercent < 100 &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "进行中"; //进行中
                  } else if (
                    item.finishFlag == true &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "已完成"; //已完成
                  } else if (item.expireFlag == true) {
                    item.courseType = "已过期"; //已过期
                  }
                });
                this.total = res.page.totalCount;
                this.eky = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (val == "已完成") {
          this.butt = val;
          studentCourseList({ limit: "28", page: "1", finishFlag: "1" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                list.map(item => {
                  if (
                    (item.finishPercent == null || item.finishPercent == 0) &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "未开始"; // 未开始
                  } else if (
                    item.finishPercent > 0 &&
                    item.finishPercent < 100 &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "进行中"; //进行中
                  } else if (
                    item.finishFlag == true &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "已完成"; //已完成
                  } else if (item.expireFlag == true) {
                    item.courseType = "已过期"; //已过期
                  }
                });
                this.total = res.page.totalCount;
                this.eky = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (val == "已过期") {
          this.butt = val;
          studentCourseList({ limit: "28", page: "1", expireFlag: "1" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                list.map(item => {
                  if (
                    (item.finishPercent == null || item.finishPercent == 0) &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "未开始"; // 未开始
                  } else if (
                    item.finishPercent > 0 &&
                    item.finishPercent < 100 &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "进行中"; //进行中
                  } else if (
                    item.finishFlag == true &&
                    item.expireFlag != true
                  ) {
                    item.courseType = "已完成"; //已完成
                  } else if (item.expireFlag == true) {
                    item.courseType = "已过期"; //已过期
                  }
                });
                this.total = res.page.totalCount;
                this.eky = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
    // getShowFun(val, type) {
    //   let clickTab = this.clickTab;
    //   if (clickTab == "全部") {
    //     this.butt = clickTab;
    //     return true;
    //   } else if (clickTab == "已过期") {
    //     if (type == true) {
    //       this.butt = clickTab;
    //       return true;
    //     }
    //   } else if (clickTab == "待完成") {
    //     if ((val == null || val < 100) && type != true) {
    //       this.butt = clickTab;
    //       return true;
    //     }
    //   } else if (clickTab == "已完成") {
    //     if (val == "100") {
    //       this.butt = clickTab;
    //       return true;
    //     }
    //   }
    //   return false;
    // }
  },
  mounted() {
    this.menu();
  },
  components: {
    TopHeaderp: TopHeaderp, //注册该组件
    PaginationItem: PaginationItem
  }
};
</script>

<style >
.el-button:active {
  color: rgba(254, 120, 101, 1);
}
.el-button:focus {
  color: rgba(254, 120, 101, 1);
}
</style>
<style lang="less" scoped>
.el-container {
  margin: 0 auto;
  width: 100%;
  display: block;
}
.el-main {
  display: block;
  margin: 0 auto;
  width: 1220px;
  overflow: hidden;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  .plana {
    margin-top: 22px;
  }
  .ans1 {
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      display: inline-block;
      width: 6px;
      height: 23px;
      background: rgba(254, 120, 101, 1);
      border-radius: 3px;
    }
    i {
      margin-left: 12px;
      width: 137px;
      height: 30px;
      font-size: 22px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 30px;
    }
  }
  .but {
    width: 100%;
    height: 36px;
    overflow: hidden;
    .el-row {
      float: left;
      .el-button {
        padding: 0;
        height: 34px;
        line-height: 34px;
        margin-top: 1px;
        border-radius: 6px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
        border-color: #fff !important;
        background: #ffffff;
        div {
          padding-left: 12px;
          padding-right: 12px;
          height: 34px;
          // background-color: #000;
          line-height: 34px;
          border-radius: 6px;
        }
      }
      .el-button:hover {
        background-color: rgba(254, 243, 241, 1) !important;
        border-color: #fff !important;
      }
      div:hover {
        background-color: rgba(254, 243, 241, 1) !important;
        border-color: #fff !important;
      }
    }
    .gen {
      line-height: 34px;
      float: right;
      width: 158px;
      height: 100%;
      img {
        width: 28px;
        height: 28px;
        margin-bottom: 3px;
        // margin-left: 10px;
      }
      p {
        float: right;
        margin-left: 10px;
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(254, 120, 101, 1);
        line-height: 32px;
      }
    }
  }
  .cards {
    height: 100%;
  }
  .gkd {
    width: 280px;
    height: 352px;
    margin-top: 22px;
    margin-right: 26px;
    float: left;
    .nas1 {
      float: left;
      margin-bottom: 32px;
      border-radius: 13px;
      box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
      .whole {
        position: absolute;
        top: 132px;
        right: 0;
        line-height: 40px;
        span {
          font-size: 20px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: #666666;
          line-height: 28px;
          letter-spacing: 1px;
        }
        .imgs {
          width: 22px;
          height: 22px;
          color: #666666;
          margin-bottom: 7px;
        }
      }
      .nas {
        position: relative;
        display: inline-block;
        width: 280px;
        height: 348px;
        overflow: hidden;
        .he {
          height: 146px;
          .imgs1 {
            width: 280px;
            height: 146px;
            border-radius: 13px 13px 0 0;
          }
          .corner {
            width: 54px;
            height: 30px;
            background: rgba(254, 120, 101, 1);
            border-radius: 12px 0px 12px 0px;
            position: absolute;
            left: 0;
            top: 0;
            padding-left: 10px;
            padding-top: 3px;
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 22px;
            letter-spacing: 1px;
          }
          .sandchannel {
            width: 88px;
            height: 30px;
            background: rgba(104, 193, 254, 1);
            border-radius: 12px 0px 12px 0px;
            position: absolute;
            left: 0;
            top: 0;
            padding-left: 10px;
            padding-top: 3px;
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 22px;
            letter-spacing: 1px;
          }
          .sandstandard {
            width: 54px;
            height: 30px;
            background: rgba(104, 193, 254, 1);
            border-radius: 12px 0px 12px 0px;
            position: absolute;
            left: 0;
            top: 0;
            padding-left: 10px;
            padding-top: 3px;
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 22px;
            letter-spacing: 1px;
          }
          .count {
            position: absolute;
            top: 102px;
            width: 280px;
            height: 44px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10px 10px 0px 0px;
            .one {
              position: absolute;
              right: 14px;
              bottom: 7px;
              width: 64px;
              height: 28px;
              font-size: 20px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 28px;
              letter-spacing: 1px;
            }
            .two {
              position: absolute;
              right: 14px;
              bottom: 7px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.8);
              line-height: 20px;
              span {
                font-size: 26px;
                font-family: Bebas;
                color: rgba(254, 120, 101, 1);
                line-height: 35px;
                letter-spacing: 1px;
              }
            }
            .three {
              position: absolute;
              right: 14px;
              bottom: 7px;
              width: 64px;
              height: 28px;
              font-size: 20px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.7);
              line-height: 28px;
              letter-spacing: 1px;
            }
            .four {
              position: absolute;
              right: 14px;
              bottom: 7px;
              width: 64px;
              height: 28px;
              font-size: 20px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.7);
              line-height: 28px;
              letter-spacing: 1px;
            }
            .five {
              position: absolute;
              left: 14px;
              bottom: 7px;
              height: 20px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.8);
              line-height: 20px;
            }
          }
        }
        .chang {
          width: 100%;
          height: 6px;
          background: rgba(153, 153, 153, 0.35);
          div.progress {
            background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
            border-radius: 0px 3px 3px 0px;
            height: 6px;
            line-height: 6px;
          }
          div.progres {
            background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
            height: 6px;
            line-height: 6px;
          }
        }
        .statistics {
          padding-left: 16px;
          position: relative;
          overflow: hidden;
          h3 {
            padding-right: 16px;
            height: 50px;
            font-size: 18px;
            font-family: PingFangSC-Semibold;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 25px;
            letter-spacing: 1px;
            margin-top: 18px;
            margin-bottom: 22px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .ri {
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 20px;
            margin-bottom: 12px;
            .two {
              width: 45px;
              float: left;
              letter-spacing: 1px !important;
            }
          }
          .qun {
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 20px;
            overflow: hidden;
            height: 20px;
            .two {
              width: 45px;
              float: left;
              text-justify: distribute;
              text-align: justify;
              text-align-last: justify;
            }
            // .twoo {
            //   float: left;
            // }
            // .twoos {
            //   float: left;
            //   width: 181px;
            //   overflow: hidden;
            //   text-overflow: ellipsis;
            //   display: -webkit-box;
            //   -webkit-box-orient: vertical;
            //   -webkit-line-clamp: 1;
            // }
          }
          .act {
            margin-top: 9px;
            height: 25px;
            margin-bottom: 20px;
            img {
              width: 24px;
              height: 25px;
              border: 1px solid rgba(0, 0, 0, 0.1);
              border-radius: 50%;
              float: left;
            }
            p {
              float: left;
              margin-left: 11px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
              line-height: 25px;
            }
          }
          .qxx {
            position: absolute;
            bottom: 20px;
            right: 17px;
            width: 80px;
            height: 26px;
            background: linear-gradient(
              90deg,
              rgba(255, 176, 158, 1) 0%,
              rgba(254, 120, 101, 1) 100%
            );
            border-radius: 13px;
            text-align: center;
            float: right;
            z-index: 19;
            border: none;
            span {
              position: absolute;
              top: 26%;
              left: 28%;
              font-size: 12px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 13px;
            }
          }
          .tws {
            position: absolute;
            bottom: 20px;
            right: 17px;
            width: 80px;
            height: 26px;
            font-size: 12px;
            background: linear-gradient(
              90deg,
              rgba(255, 176, 158, 1) 0%,
              rgba(254, 120, 101, 1) 100%
            );
            border-radius: 13px;
            text-align: center;
            float: right;
            z-index: 19;
            border: none;
            span {
              position: absolute;
              top: 26%;
              left: 20%;
              font-size: 12px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 13px;
            }
          }
          .ths {
            position: absolute;
            bottom: 20px;
            right: 17px;
            width: 79px;
            height: 26px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 13px;
            border: 1px solid rgba(240, 240, 240, 1);
            text-align: center;
            float: right;
            z-index: 19;
            span {
              position: absolute;
              top: 25%;
              left: 20%;
              font-size: 12px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
              line-height: 12px;
            }
          }
          .wc {
            position: absolute;
            right: -16px;
            bottom: -22px;
          }
          .gq {
            position: absolute;
            bottom: -22px;
            right: -16px;
          }
          .el-button:active {
            color: #fff;
            border-color: #fff;
          }
        }
      }
    }

    .nas1:hover {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 10px 0px rgba(153, 153, 153, 0.5);
      border-radius: 13px;
    }
  }
  .gkd:nth-child(4n) {
    margin-right: 0;
    background-color: #fff;
  }
  .butto {
    color: #fe7865;
    background-color: rgba(254, 243, 241, 1);
  }
  .nocourse {
    margin: 0 auto;
    margin-top: 54px;
    width: 210px;
    text-align: center;
    img {
      width: 162px;
      height: 193px;
    }
    h3 {
      font-size: 18px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(77, 77, 77, 1);
      line-height: 25px;
    }
    p {
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
  .pagination-item {
    justify-content: center;
  }
}
</style>
