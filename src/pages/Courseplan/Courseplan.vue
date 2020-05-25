<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-09-04 15:35:39
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-12-05 11:18:23
 -->
<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <TopHeader class="clearfix"></TopHeader>

      <!-- 内容 -->
      <el-main clearfix>
        <!-- 推荐的课程计划 -->
        <div class="plana">
          <div class="ans1">
            <span></span>
            <i>我的课程计划</i>
          </div>
        </div>

        <!-- 筛选按钮 -->
        <div class="but">
          <el-row>
            <el-button plain @click="handleClickTab('全部')" class="but1">
              <div ref="q" :class="[butt == buttq ? 'butto' :'']">全部</div>
            </el-button>
            <el-button plain @click="handleClickTab('未发布')" class="but2">
              <div ref="w" :class="[butt == buttw? 'butto' :'']">未发布</div>
            </el-button>
            <el-button plain @click="handleClickTab('已发布')" class="but3">
              <div ref="y" :class="[butt == butty? 'butto' :'']">已发布</div>
            </el-button>
          </el-row>
        </div>
        <!-- 内容显示 -->
        <div class="cards clearfix">
          <div class="sna1 gkd" ref="sna" v-if="clickTab==='全部'">
            <a href="javascript:;" class="sna" @click="EstablishClick">
              <div class="imgs"></div>
            </a>
          </div>

          <!-- 课程计划 -->
          <div class="gkd" v-for="item in list" :key="item.id" v-if="getShowFun(item.stateName)">
            <div class="nas1" :ref="'nas1' + item.stateName">
              <a
                href="javascript:;"
                class="nas"
                @click.stop="xueclick(item.coursePlanId,item.coursePlanType,item.stateName,item.groupId)"
              >
                <div class="he">
                  <img :src="item.popularizeImageUrl" alt class="imgs1" />
                  <div class="corner" v-if="item.coursePlanType === 23 ? true:false">频道</div>
                  <div class="sandchannel" v-if="item.coursePlanType === 24 ? true:false">沙盘频道</div>
                  <div
                    class="sandstandard"
                    v-if="(item.coursePlanType === 25 || item.coursePlanType === 26) ? true:false"
                  >沙盘</div>
                  <img
                    src="../../assets/img/yulan.svg"
                    alt
                    class="imgs2"
                    v-if="item.stateName === '未发布'"
                    @click.stop="xueclick1(item.coursePlanId,item.coursePlanType,item.stateName)"
                  />
                  <img
                    src="../../assets/img/delete.svg"
                    alt
                    class="imgs3"
                    v-if="item.stateName === '未发布'"
                    @click.stop="deleteplan(item.coursePlanId,item.groupIds)"
                  />
                  <img
                    src="../../assets/img/delete.svg"
                    alt
                    class="imgs4"
                    v-if="item.stateName === '已发布'"
                    @click.stop="deleteplan(item.coursePlanId,item.groupIds)"
                  />
                  <div class="counts"></div>
                  <div class="count" v-if="item.stateName === '未发布' ? false:true">
                    已完成
                    <span class="oo1">{{item.finishStudentCount}}</span>
                    <span class="oo2">/</span>
                    <span class="oo3">{{item.totalStudentCount}}</span>
                    人
                  </div>
                </div>
                <div class="chang">
                  <div
                    class="progress"
                    :style="{width:(item.finishStudentCount*100/item.totalStudentCount || 0)+'%'}"
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
                    <span>{{item.beginDate||'未设置'}}</span> -
                    <span>{{item.endDate||'未设置'}}</span>
                  </div>

                  <div class="qun">
                    <p class="two">群组</p>
                    <span>：</span>
                    <span class="twoos">{{item.groupName||'未设置'}}</span>
                  </div>

                  <div class="zh">
                    <p class="two">状态</p>
                    <span>：</span>
                    <span :class="item.stateName === '未发布' ? spw: spy">{{item.stateName||'未设置'}}</span>
                  </div>
                  <el-row>
                    <el-button
                      v-if="item.stateName == '未发布'"
                      @click.stop="fbclick(item.coursePlanType,item.coursePlanId)"
                    >
                      <span>去编辑</span>
                    </el-button>
                  </el-row>
                </div>
              </a>
            </div>
          </div>
        </div>
        <!-- 删除弹框 -->
        <div class="modal" v-if="sout" @click="out"></div>
        <div class="signout" v-if="sout" v-Clickoutside="()=>{out()}">
          <div class="tc">
            <div class="header">确认删除</div>
            <div class="main">
              删除后，
              <span>所有数据都将不可恢复，请谨慎操作！</span>
            </div>
            <div class="footer">
              <el-button @click="out">取消</el-button>
              <el-button @click="deleteout">确认</el-button>
            </div>
          </div>
        </div>
        <!-- 分页组件 -->
        <PaginationItem
          :options="{page:page,limit:limit,total:total,cb:paginCb}"
          style="margin-bottom:53px;"
        ></PaginationItem>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  courseownPlanList,
  coursedeleteCoursePlan
} from "../../service/groupApi";
import TopHeader from "../Header/header";
import Clickoutside from "element-ui/src/utils/clickoutside";
import PaginationItem from "../group/paginationItem";
import { cloneObj } from "../../utils/utils";
export default {
  name: "Courseplan",
  created() {
    let groupId = this.$route.query.groupId;
    // 获取页面所有数据的接口
    courseownPlanList({ limit: "27", page: "1" })
      .then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
          let list = res.page.list;
          let list1 = [];
          let list2 = [];
          list.map(item => {
            if (item.stateName === "未发布") {
              list1.push(cloneObj(item));
            } else if (item.stateName === "已发布") {
              list2.push(cloneObj(item));
            }
          });
          this.data = {
            list: cloneObj(list),
            list1: list1,
            list2: list2
          };
          this.total = res.page.totalCount;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  directives: {
    Clickoutside
  },
  data() {
    return {
      butt: "全部",
      buttq: "全部",
      buttw: "未发布",
      butty: "已发布",
      sout: false,
      tishi: false,
      id: "",
      spw: "spw",
      spy: "spy",
      groupId: "",
      total: "", //总条数
      page: 1, // 当前页
      limit: 27, // 每页条数
      clickTab: "全部",
      groupName: "",
      card: false,
      list: [],
      data: {},
      coursePlanId: "",
      eky: ""
    };
  },
  methods: {
    // 筛选方法
    handleClickTab(val) {
      if (this.clickTab !== val) {
        this.clickTab = val;
        if (val == "全部") {
          courseownPlanList({ limit: "27", page: "1" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                let list1 = [];
                let list2 = [];
                list.map(item => {
                  if (item.stateName === "未发布") {
                    list1.push(cloneObj(item));
                  } else if (item.stateName === "已发布") {
                    list2.push(cloneObj(item));
                  }
                });
                this.data = {
                  list: cloneObj(list),
                  list1: list1,
                  list2: list2
                };
                this.total = res.page.totalCount;
                this.eky = val;
                this.butt = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (val == "未发布") {
          courseownPlanList({ limit: "28", page: "1", state: "0" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                let list1 = [];
                let list2 = [];
                list.map(item => {
                  if (item.stateName === "未发布") {
                    list1.push(cloneObj(item));
                  } else if (item.stateName === "已发布") {
                    list2.push(cloneObj(item));
                  }
                });
                this.data = {
                  list: cloneObj(list),
                  list1: list1,
                  list2: list2
                };
                this.total = res.page.totalCount;
                this.eky = val;
                this.butt = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (val == "已发布") {
          courseownPlanList({ limit: "28", page: "1", state: "1" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                let list1 = [];
                let list2 = [];
                list.map(item => {
                  if (item.stateName === "未发布") {
                    list1.push(cloneObj(item));
                  } else if (item.stateName === "已发布") {
                    list2.push(cloneObj(item));
                  }
                });
                this.data = {
                  list: cloneObj(list),
                  list1: list1,
                  list2: list2
                };
                this.total = res.page.totalCount;
                this.eky = val;
                this.state = 1;
                this.butt = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    // 判断筛选后的内容展示的方法
    getShowFun(val) {
      let clickTab = this.clickTab;
      if (clickTab == "全部") {
        if (val != null) {
          return true;
        }
      } else if (clickTab == "未发布") {
        if (val == "未发布") {
          return true;
        }
      } else if (clickTab == "已发布") {
        if (val == "已发布") {
          return true;
        }
      }
      return false;
    },
    // 隐藏弹框
    out() {
      this.sout = false;
    },
    // 显示弹框
    deleteplan(val, groupIds) {
      this.sout = true;
      this.coursePlanId = val;
      this.groupIds = groupIds;
    },
    // 删除课程
    deleteout() {
      console.log(this.groupIds);
      let groupIds = this.groupIds;
      if (groupIds == null) {
        coursedeleteCoursePlan({
          coursePlanId: this.coursePlanId
        })
          .then(res => {
            if (res.code == "0") {
              this.sout = false;
              courseownPlanList({ limit: "27", page: "1" })
                .then(res => {
                  if (res.code == "0") {
                    this.list = res.page.list;
                  } else {
                    tipsFail(res.msg);
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
        coursedeleteCoursePlan({
          coursePlanId: this.coursePlanId,
          groupIds: this.groupIds
        })
          .then(res => {
            if (res.code == "0") {
              this.sout = false;
              courseownPlanList({ limit: "27", page: "1" })
                .then(res => {
                  if (res.code == "0") {
                    this.list = res.page.list;
                  } else {
                    tipsFail(res.msg);
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
    },
    // 分页
    paginCb(page, size, options = {}) {
      this.page = page;
      this.limit = size;
      if (this.eky == "未发布") {
        this.opt = {
          page: page,
          limit: 28,
          state: 0
        };
      } else if (this.eky == "已发布") {
        this.opt = {
          page: page,
          limit: 28,
          state: 1
        };
      } else {
        this.opt = {
          page: page,
          limit: size
        };
      }
      this.groCouPlaCoursePlanListFun(this.opt);
    },
    // 分页
    groCouPlaCoursePlanListFun(data) {
      courseownPlanList(data).then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      });
    },
    // 未发布课程跳转页面
    fbclick(val, cour) {
      if (val === 23 || val === 24) {
        this.$router.push({
          path: "/teachers/editCouPlans",
          query: {
            coursePlanId: cour,
            addCourseType: "editChannel"
          }
        });
      } else {
        this.$router.push({
          path: "/teachers/editCourseBase",
          query: {
            coursePlanId: cour,
            addCourseType: "editCourse"
          }
        });
      }
    },
    // 发布跳转个人中心/未发布跳转编辑页/
    xueclick(cour, type, val, group) {
      if (val == "已发布") {
        this.$router.push({
          path: "/groupStaAnalysis",
          query: {
            coursePlanId: cour,
            coursePlanType: type,
            groupId: group
          }
        });
      }
      if (val == "未发布") {
        if (type == 23 || type == 24) {
          this.$router.push({
            path: "teachers/editCouPlans",
            query: {
              coursePlanId: cour,
              coursePlanType: type
            }
          });
        } else {
          this.$router.push({
            path: "teachers/editCourseBase",
            query: {
              coursePlanId: cour,
              coursePlanType: type
            }
          });
        }
      }
    },
    // 预览跳转详情页
    xueclick1(cour, type, val) {
      if (type == 23 || type == 24) {
        this.$router.push({
          path: "/Coursechanne",
          query: {
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      } else {
        this.$router.push({
          path: "/Standarddetails",
          query: {
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      }
    },
    menu() {
      window.scrollTo(0, 0);
    },
    // 查看所有,跳转我的课程计划页面
    EstablishClick() {
      this.$router.push({
        path: "/Establish"
      });
    }
  },
  mounted() {
    this.menu();
  },
  components: {
    // header组件
    TopHeader: TopHeader, //注册该组件
    // 分页组件
    PaginationItem: PaginationItem
  }
};
</script>

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
  z-index: -2;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  .plana {
    margin-top: 22px;
  }
  .ans1 {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    span {
      display: inline-block;
      width: 6px;
      height: 23px;
      background: rgba(254, 120, 101, 1);
      border-radius: 3px;
    }
    i {
      margin-left: 12px;
      text-align: center;
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
        div {
          padding-left: 12px;
          padding-right: 12px;
          height: 34px;
          line-height: 34px;
          border-radius: 6px;
        }
      }
      .el-button {
        border-radius: 6px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
        border-color: #fff !important;
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
    // .el-row:hover {
    //   border-color: #fff !important;
    // }
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
    .sna1 {
      float: left;
      margin-right: 25px;
      margin-top: 27px;
      .sna {
        position: relative;
        float: left;
        .imgs {
          width: 280px;
          height: 348px;
          background: url(../../assets/img/Normal.svg) no-repeat;
        }
        .imgs:hover {
          box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 6px 0px;
          border-radius: 13px;
        }
      }
    }
    .gkd {
      float: left;
      .nas1 {
        margin-top: 27px;
        border-radius: 13px;
        box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
        margin-right: 25px;
        .nas {
          position: relative;
          display: inline-block;
          width: 280px;
          height: 348px;
          .he {
            height: 146px;
            .imgs1 {
              width: 280px;
              height: 146px;
              border-radius: 13px 13px 0px 0px;
            }
            .corner {
              width: 54px;
              height: 30px;
              background: rgba(254, 120, 101, 1);
              border-radius: 13px 0px 13px 0px;
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
              border-radius: 13px 0px 13px 0px;
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
              border-radius: 13px 0px 13px 0px;
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
            .imgs2 {
              display: none;
              position: absolute;
              left: 10px;
              top: 10px;
              width: 28px;
              height: 28px;
              z-index: 91;
            }
            .imgs3 {
              display: none;
              position: absolute;
              right: 10px;
              top: 10px;
              width: 28px;
              height: 28px;
              z-index: 92;
            }
            .imgs4 {
              display: none;
              position: absolute;
              right: 10px;
              top: 10px;
              width: 28px;
              height: 28px;
              z-index: 91;
            }

            .counts {
              position: absolute;
              top: 102px;
              width: 280px;
              height: 44px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 10px 10px 0px 0px;
            }
            .count {
              position: absolute;
              right: 10px;
              top: 110px;
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.8);
              line-height: 20px;

              .oo1 {
                font-size: 26px;
                font-family: Bebas;
                color: rgba(254, 120, 101, 1);
                line-height: 35px;
                letter-spacing: 1px;
              }
              .oo2,
              .oo3 {
                font-size: 18px;
                font-family: Bebas;
                color: rgba(254, 120, 101, 1);
                line-height: 24px;
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
            position: relative;
            overflow: hidden;
            h3 {
              width: 248px;
              height: 50px;
              font-size: 18px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              line-height: 25px;
              padding-left: 16px;
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
              margin-left: 16px;
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
              margin-left: 16px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 20px;
              margin-bottom: 12px;
              overflow: hidden;
              height: 20px;
              .two {
                width: 45px;
                float: left;
                text-justify: distribute;
                text-align: justify;
                text-align-last: justify;
              }
            }
            .zh {
              margin-left: 16px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 20px;
              padding-bottom: 15px;
              .two {
                width: 45px;
                float: left;
                text-justify: distribute;
                text-align: justify;
                text-align-last: justify;
              }
              .spw {
                font-size: 14px;
                font-family: PingFangSC;
                font-weight: 500;
                color: rgba(254, 98, 76, 1);
                line-height: 20px;
              }
            }
            .el-button {
              position: absolute;
              bottom: 12px;
              right: 16px;
              width: 63px;
              height: 26px;
              background: rgba(255, 255, 255, 1);
              border-radius: 13px;
              border: 1px solid rgba(254, 120, 101, 0.4);
              text-align: center;
              float: right;
              z-index: 19;
              span {
                position: absolute;
                top: 25%;
                left: 20%;
                font-size: 12px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(254, 120, 101, 1);
                line-height: 12px;
              }
            }
            .el-button:active {
              color: #fff;
              border-color: #fff;
            }
          }
        }
        .nas:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 4px 10px 0px rgba(153, 153, 153, 0.5);
          border-radius: 13px;
          .imgs2 {
            display: block;
          }
          .imgs3 {
            display: block;
          }
          .imgs4 {
            display: block;
          }
        }
      }
    }
    .gkd:hover {
      .nas1 {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 10px 0px rgba(153, 153, 153, 0.5);
      }
    }
    .gkd:nth-child(4n) {
      .nas1 {
        margin-right: 0;
      }
    }
  }
  .tishi {
    position: absolute;
    top: 82px;
    left: 50%;
    transform: translateX(-50%;);
    width: 75px;
    height: 23px;
    background: rgba(51, 51, 51, 0.44);
    border-radius: 4px;
    line-height: 23px;
    p {
      font-size: 12px;
      padding: 3px 10px 4px 10px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
    }
  }
  .pagination-item {
    justify-content: center;

    margin-top: 61px;
  }
}
.signout {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 2020;
  .tc {
    width: 410px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    border-radius: 13px;
    padding: 26px 32px 20px 32px;
    .header {
      position: absolute;
      left: 32px;
      width: 100px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
    .main {
      margin-top: 43px;
      margin-bottom: 15px;
      margin-left: 0;
      margin-right: 0;
      height: 60px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #999999;
      span {
        color: #fe7865;
      }
    }
    .footer {
      position: absolute;
      right: 32px;
      .el-button:first-child {
        width: 109px;
        height: 36px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
        border-radius: 18px;
        border: 1px solid rgba(254, 120, 101, 0.4);
        line-height: 11px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(254, 120, 101, 1);
        &:hover {
          color: rgba(254, 120, 101, 1);
        }
        &:focus {
          color: rgba(254, 120, 101, 1);
        }
      }

      .el-button:last-child {
        width: 110px;
        height: 36px;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 18px;
        line-height: 11px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        border: none;
        &:hover {
          color: rgba(255, 255, 255, 1);
          border: none;
        }
        &:focus {
          color: rgba(255, 255, 255, 1);
          border: none;
        }
      }
    }
  }
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2019;
}
.butto {
  color: #fe7865;
  background-color: rgba(254, 243, 241, 1);
}
</style>
