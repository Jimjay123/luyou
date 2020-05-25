<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <TopHeader class="clearfix"></TopHeader>
      <!-- 内容 -->
      <el-main clearfix>
        <!-- 推荐的课程计划 -->
        <div class="plana clearfix">
          <div class="ans1">
            <span></span>
            <i>我的课程计划</i>
            <p class="ppx">选择课程模板，创建课程计划</p>
          </div>
        </div>
        <!-- 筛选按钮 -->
        <div class="but">
          <el-row>
            <el-button plain @click="handleClickTab('全部')" class="but1">
              <div :class="[butt == buttq ? 'butto' :'']">全部</div>
            </el-button>
            <el-button plain @click="handleClickTab('标准课')" class="but2">
              <div :class="[butt == buttb? 'butto' :'']">标准课</div>
            </el-button>
            <el-button plain @click="handleClickTab('课程频道')" class="but3">
              <div :class="[butt == buttk? 'butto' :'']">课程频道</div>
            </el-button>
            <el-button plain @click="handleClickTab('沙盘课程')" class="but3">
              <div :class="[butt == butts? 'butto' :'']">沙盘课程</div>
            </el-button>
          </el-row>
          <a href="javascript:;" class="gen" @click="EstablishClicks">
            <p>新建课程频道</p>
            <img src="../../assets/img/tianjia.svg" alt />
          </a>
        </div>
        <!-- 内容显示 -->
        <div class="ppk clearfix">
          <div
            class="introduce"
            v-for="item in list"
            :key="item.id"
            v-if="getShowFun(item.keyType)"
          >
            <div
              class="card1"
              @click="EstablishClick(item.keyType,item.keyId,item.keyName)"
              :class="(item.keyType == 11 || item.keyType == 12) ? cardone:cardtwo"
            >
              <div class="casd">
                <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                <img
                  :src="item.popularizeImageUrl"
                  alt
                  class="imgsr2"
                  v-if="item.keyType == 11 || item.keyType == 12"
                />
                <img
                  :src="item.popularizeImageUrl"
                  alt
                  class="imgsr3"
                  v-if="item.keyType == 11 || item.keyType == 12"
                />
                <div class="corner" v-if="item.keyType === 11 ? true:false">频道</div>
                <div class="sandchannel" v-if="item.keyType === 12 ? true:false">沙盘频道</div>
                <div
                  class="sandstandard"
                  v-if="(item.keyType === 3 || item.keyType === 4) ? true:false"
                >沙盘</div>
                <img
                  src="../../assets/img/yulan.svg"
                  class="imgs2"
                  @click.stop="StandarddetailsClick(item.keyType,item.keyId)"
                />
                <div class="counts">
                  <img
                    src="../../assets/img/duration.svg"
                    alt
                    class="imgr"
                    v-if="item.officialFlag == true"
                  />
                  <span class="duration">{{item.duration}}分钟</span>
                </div>
              </div>
              <div class="tj">
                <p class="pp1">{{item.keyName}}</p>
                <div class="cas">
                  <img
                    src="../../assets/img/red.svg"
                    alt
                    class="imr"
                    v-if="item.officialFlag == true"
                  />
                  <div
                    class="cards clearfix"
                    v-for="(items,index) in item.tagNameList"
                    :key="index"
                  >
                    <span>{{items}}</span>
                  </div>
                </div>
                <div class="names">
                  <img :src="item.avatar" alt class="im1" />
                  <span class="sp1">{{item.ownerName}}</span>
                  <img src="../../assets/img/v1.svg" alt class="im2" v-if="item.ownerLevel == 1" />
                  <span class="sp2">/{{item.ownerOrgName}}</span>
                </div>
                <div class="white"></div>
              </div>
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
import { unAvailresourceList } from "../../service/groupApi";
import TopHeader from "../Header/header";
import PaginationItem from "../group/paginationItem";
import { cloneObj } from "../../utils/utils";
export default {
  name: "Establish",

  created() {
    // 获取页面所有数据的接口
    unAvailresourceList({ limit: "28", page: "1" })
      .then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
          let list = res.page.list;
          let list1 = [];
          let list2 = [];
          let list3 = [];
          list.map(item => {
            if (item.keyType == 1 || item.keyType == 2 || item.keyType == 3) {
              list1.push(cloneObj(item));
            } else if (item.keyType == 11) {
              list2.push(cloneObj(item));
            } else if (item.keyType == 12 || item.keyType == 4) {
              list3.push(cloneObj(item));
            }
          });
          this.data = {
            list: cloneObj(list),
            list1: list1,
            list2: list2,
            list3: list3
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
  data() {
    return {
      butt: "全部",
      buttq: "全部",
      buttb: "标准课",
      buttk: "课程频道",
      butts: "沙盘课程",
      opt: {},
      keyType: "",
      clickTab: "全部",
      cardone: "cardone",
      cardtwo: "cardtwo",
      total: "", //总条数
      page: 1, // 当前页
      limit: 28, // 每页条数
      list: [],
      eky: ""
    };
  },
  methods: {
    // 跳转详情页
    StandarddetailsClick(val, key) {
      if (val === 11 || val === 12) {
        this.$router.push({
          path: "/prechannel",
          query: {
            courseChannelId: key
          }
        });
      } else {
        this.$router.push({
          path: "/Recstandard",
          query: {
            courseId: key
          }
        });
      }
    },
    // 返回上一层
    backHistory() {
      this.$router.go(-1); //返回上一层
    },
    menu() {
      window.scrollTo(0, 0);
    },
    // 跳转新建频道页面
    EstablishClicks() {
      this.$store.dispatch("creCouPlans/templateListHandle", {
        templateList: []
      });
      this.$store.dispatch("creCouPlans/coursePlanNameHandle", {
        coursePlanName: ""
      });
      this.$router.push({
        path: "/teachers/creCouPlans",
        query: {
          courseChannelId: "",
          addCourseType: "add",
          type: true
        }
      });
    },
    // 跳转设置信息页面
    EstablishClick(keyType, keyId, keyName) {
      this.$store.dispatch("creCouPlans/coursePlanNameHandle", {
        coursePlanName: keyName
      });
      if (keyType === 1 || keyType === 2 || keyType === 3 || keyType === 4) {
        this.$router.push({
          path: "/teachers/Addcourse",
          query: {
            relCourseId: keyId
          }
        });
      } else {
        this.$router.push({
          path: "/teachers/creCouPlans",
          query: {
            courseChannelId: keyId,
            addCourseType: "editTem"
          }
        });
      }
    },
    // 筛选方法
    handleClickTab(val) {
      if (this.clickTab !== val) {
        this.clickTab = val;
        if (val == "全部") {
          unAvailresourceList({ limit: "28", page: "1" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                let list1 = [];
                let list2 = [];
                list.map(item => {
                  if (
                    item.keyType == 1 ||
                    item.keyType == 2 ||
                    item.keyType == 3
                  ) {
                    list1.push(cloneObj(item));
                  } else if (item.keyType == 11) {
                    list2.push(cloneObj(item));
                  } else if (item.keyType == 12 || item.keyType == 4) {
                    list3.push(cloneObj(item));
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
          this.list = cloneObj(this.data.list || []);
        } else if (val == "标准课") {
          unAvailresourceList({ limit: "28", page: "1", keyTypes: "1,2" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                let list1 = [];
                let list2 = [];
                let list3 = [];
                list.map(item => {
                  if (
                    item.keyType == 1 ||
                    item.keyType == 2 ||
                    item.keyType == 3
                  ) {
                    list1.push(cloneObj(item));
                  } else if (item.keyType == 11) {
                    list2.push(cloneObj(item));
                  } else if (item.keyType == 12 || item.keyType == 4) {
                    list3.push(cloneObj(item));
                  }
                });
                this.data = {
                  list: cloneObj(list),
                  list1: list1,
                  list2: list2,
                  list3: list3
                };
                this.total = res.page.totalCount;
                this.keyType = 1;
                this.eky = val;
                this.butt = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.list = cloneObj(this.data.list1 || []);
        } else if (val == "课程频道") {
          unAvailresourceList({ limit: "28", page: "1", keyTypes: "11" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                let list1 = [];
                let list2 = [];
                let list3 = [];
                list.map(item => {
                  if (
                    item.keyType == 1 ||
                    item.keyType == 2 ||
                    item.keyType == 3
                  ) {
                    list1.push(cloneObj(item));
                  } else if (item.keyType == 11) {
                    list2.push(cloneObj(item));
                  } else if (item.keyType == 12 || item.keyType == 4) {
                    list3.push(cloneObj(item));
                  }
                });
                this.data = {
                  list: cloneObj(list),
                  list1: list1,
                  list2: list2,
                  list3: list3
                };
                console.log(list2);
                this.total = res.page.totalCount;
                this.keyType = 2;
                this.eky = val;
                this.butt = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.list = cloneObj(this.data.list2 || []);
        } else if (val == "沙盘课程") {
          unAvailresourceList({ limit: "28", page: "1", keyTypes: "3,4,12" })
            .then(res => {
              if (res.code == "0") {
                this.list = res.page.list;
                let list = res.page.list;
                let list1 = [];
                let list2 = [];
                let list3 = [];
                list.map(item => {
                  if (
                    item.keyType == 1 ||
                    item.keyType == 2 ||
                    item.keyType == 3
                  ) {
                    list1.push(cloneObj(item));
                  } else if (item.keyType == 11) {
                    list2.push(cloneObj(item));
                  } else if (item.keyType == 12 || item.keyType == 4) {
                    list3.push(cloneObj(item));
                  }
                });
                this.data = {
                  list: cloneObj(list),
                  list1: list1,
                  list2: list2,
                  list3: list3
                };
                this.total = res.page.totalCount;
                this.keyType = 3;

                this.eky = val;
                this.butt = val;
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.list = cloneObj(this.data.list2 || []);
        }
      }
    },
    // 判断筛选后的内容展示的方法
    getShowFun(val) {
      let clickTab = this.clickTab;
      if (clickTab == "全部") {
        this.butt = clickTab;
        return true;
      } else if (clickTab == "标准课") {
        return true;
      } else if (clickTab == "课程频道") {
        return true;
      } else if (clickTab == "沙盘课程") {
        return true;
      }
      return false;
    },
    // 分页
    paginCb(page, size, options = {}) {
      this.page = page;
      this.limit = size;
      if (this.eky == "标准课") {
        this.opt = {
          page: page,
          limit: size,
          keyType: 1
        };
      } else if (this.eky == "课程频道") {
        this.opt = {
          page: page,
          limit: size,
          keyType: 2
        };
      } else if (this.eky == "沙盘课程") {
        this.opt = {
          page: page,
          limit: size,
          keyType: 3
        };
      } else {
        this.opt = {
          page: page,
          limit: size
        };
      }

      this.groCouPlaCoursePlanListFun(this.opt);
    },
    groCouPlaCoursePlanListFun(data) {
      unAvailresourceList(data).then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      });
    }
  },
  mounted() {
    this.menu();
  },
  components: {
    TopHeader: TopHeader, //注册该组件
    PaginationItem
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
  padding-bottom: 10px;
  .plana {
    margin-top: 22px;
    margin-bottom: 22px;
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
    .ans1 {
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      float: left;
      span {
        float: left;
        display: block;
        width: 6px;
        height: 23px;
        background: rgba(254, 120, 101, 1);
        border-radius: 3px;
      }
      i {
        float: left;
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
      .ppx {
        float: left;
        margin-left: 12px;
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 34px;
      }
    }
  }
  .but {
    width: 100%;
    height: 36px;
    overflow: hidden;
    padding: 0 10px 0;
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
  .ppk {
    margin-top: 22px;
    min-width: 1200px;
    padding-left: 10px;
    padding-right: 10px;
    .introduce {
      float: left;
      margin-right: 26px;
      .cardone {
        cursor: pointer;
        height: 324px;
        width: 280px;
        position: relative;
        .casd {
          position: relative;
          height: 170px;
          width: 280px;
          .imgsr1 {
            position: absolute;
            top: 0;
            height: 170px;
            width: 280px;
            text-align: center;
            border-radius: 13px;
            transition: 0.2s;
            opacity: 1;
            z-index: 9;
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
            width: 88px;
            height: 30px;
            background: rgba(104, 193, 254, 1);
            border-radius: 8px 0px 8px 0px;
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
            transition: 0.2s;
            z-index: 9;
          }
          .sandstandard {
            width: 54px;
            height: 30px;
            background: rgba(104, 193, 254, 1);
            border-radius: 8px 0px 8px 0px;
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
            transition: 0.2s;
            z-index: 9;
          }
          .imgs2 {
            display: none;
            position: absolute;
            transition: 0.2s;
            right: 10px;
            top: 10px;
            width: 28px;
            height: 28px;
            z-index: 91;
          }
          .counts {
            position: absolute;
            bottom: 0;
            width: 280px;
            height: 36px;
            z-index: 13;
            background-color: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.5) 100%
            );
            border-radius: 0px 0px 12px 12px;
            transition: 0.2s;
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
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
              position: absolute;
              bottom: 9px;
              left: 213px;
              transition: 0.2s;
              z-index: 9;
            }
          }
        }
        .casd:hover {
          position: relative;
          height: 170px;
          width: 280px;
          .imgsr1 {
            position: absolute;
            top: -6px;
          }
          .imgsr2 {
            position: absolute;
            top: 3px;
          }
          .corner {
            position: absolute;
            top: -6px;
          }
          .sandchannel {
            position: absolute;
            top: -6px;
          }
          .sandstandard {
            position: absolute;
            top: -6px;
          }
          .imgs2 {
            display: block;
            position: absolute;
            top: 4px;
          }
          .counts {
            position: absolute;
            bottom: 6px;
          }
        }
        .tj {
          position: absolute;
          top: 170px;
          width: 280px;
          margin-left: 10px;
          margin-top: 18px;
          // white-space: nowrap;
          // overflow: hidden;
          // text-overflow: ellipsis;
          .pp1 {
            width: 248px;
            height: 50px;
            font-size: 18px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 11px;
            line-height: 25px;
            letter-spacing: 1px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .cas {
            width: 290px;
            height: 20px;
            overflow: hidden;
            .imr {
              float: left;
            }
            .cards {
              float: left;
              height: 20px;
              line-height: 14px;
              background: rgba(250, 250, 250, 1);
              border-radius: 3px;
              border: 1px solid rgba(238, 238, 238, 1);
              margin-left: 14px;
              padding: 0px 5px 4px 5px;
              span {
                font-size: 12px;
                font-family: PingFangSC;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
            }
            .cards:nth-child(1) {
              margin-left: 0;
            }
          }
          .names {
            height: 20px;
            margin-top: 10px;
            line-height: 20px;
            .im1 {
              float: left;
              width: 20px;
              height: 20px;
              border-radius: 50%;
            }
            .sp1 {
              float: left;
              display: block;
              height: 20px;
              font-size: 12px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
              margin-left: 9px;
            }
            .im2 {
              float: left;
              width: 13px;
              height: 9px;
              border-radius: 1px;
              margin-left: 6px;
              margin-top: 6px;
            }
            .sp2 {
              float: left;
              display: block;
              width: 171px;
              height: 17px;
              font-size: 12px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(194, 194, 194, 1);
              margin-left: 3px;
            }
          }
          .white {
            width: 20px;
            height: 20px;
            background: linear-gradient(
              270deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0.9) 60%,
              rgba(255, 255, 255, 0) 100%
            );
            position: absolute;
            right: 0px;
            top: 61px;
          }
        }
      }
      .cardone:hover {
        .imgs2 {
          display: block;
        }
      }
      .cardtwo {
        cursor: pointer;
        height: 324px;
        width: 280px;
        position: relative;
        .casd {
          position: relative;
          height: 170px;
          width: 280px;
          .imgsr1 {
            position: absolute;
            top: 0;
            height: 170px;
            width: 280px;
            text-align: center;
            border-radius: 13px;
            transition: 0.2s;
            opacity: 1;
            z-index: 9;
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
          }
          .sandchannel {
            width: 88px;
            height: 30px;
            background: rgba(104, 193, 254, 1);
            border-radius: 8px 0px 8px 0px;
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
            transition: 0.2s;
            z-index: 9;
          }
          .sandstandard {
            width: 54px;
            height: 30px;
            background: rgba(104, 193, 254, 1);
            border-radius: 8px 0px 8px 0px;
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
            transition: 0.2s;
            z-index: 9;
          }
          .imgs2 {
            display: none;
            position: absolute;
            transition: 0.2s;
            right: 10px;
            top: 10px;
            width: 28px;
            height: 28px;
            z-index: 91;
          }
          .counts {
            position: absolute;
            bottom: 0;
            width: 280px;
            height: 36px;
            z-index: 13;
            background-color: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.5) 100%
            );
            border-radius: 0px 0px 12px 12px;
            transition: 0.2s;
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
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
              position: absolute;
              bottom: 9px;
              left: 213px;
              transition: 0.2s;
              z-index: 9;
            }
          }
        }
        .casd:hover {
          position: relative;
          height: 170px;
          width: 280px;
          .imgsr1 {
            position: absolute;
            top: -6px;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.5) 100%
            );

            box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
          }
          .imgsr2 {
            position: absolute;
            top: 3px;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.5) 100%
            );
            box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
          }

          .imgs2 {
            display: block;
            position: absolute;
            top: 4px;
          }
          .counts {
            position: absolute;
            bottom: 6px;
          }
          .sandchannel {
            position: absolute;
            top: -6px;
          }
          .sandstandard {
            position: absolute;
            top: -6px;
          }
        }
        .tj {
          position: absolute;
          top: 170px;
          width: 280px;
          margin-left: 10px;
          margin-top: 18px;
          // white-space: nowrap;
          // overflow: hidden;
          // text-overflow: ellipsis;
          .pp1 {
            width: 248px;
            height: 50px;
            font-size: 18px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 11px;
            line-height: 25px;
            letter-spacing: 1px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .cas {
            width: 290px;
            height: 20px;
            overflow: hidden;
            .imr {
              float: left;
            }
            .cards {
              float: left;
              height: 20px;
              line-height: 14px;
              background: rgba(250, 250, 250, 1);
              border-radius: 3px;
              border: 1px solid rgba(238, 238, 238, 1);
              margin-left: 14px;
              padding: 0px 5px 4px 5px;
              span {
                font-size: 12px;
                font-family: PingFangSC;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
            }
            .cards:nth-child(1) {
              margin-left: 0;
            }
          }
          .names {
            height: 20px;
            margin-top: 10px;
            line-height: 20px;
            .im1 {
              float: left;
              width: 20px;
              height: 20px;
              border-radius: 50%;
            }
            .sp1 {
              float: left;
              display: block;
              height: 20px;
              font-size: 12px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
              margin-left: 9px;
            }
            .im2 {
              float: left;
              width: 13px;
              height: 9px;
              border-radius: 1px;
              margin-left: 6px;
              margin-top: 6px;
            }
            .sp2 {
              float: left;
              display: block;
              width: 171px;
              height: 17px;
              font-size: 12px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(194, 194, 194, 1);
              margin-left: 3px;
            }
          }
          .white {
            width: 20px;
            height: 20px;
            background: linear-gradient(
              270deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0.9) 60%,
              rgba(255, 255, 255, 0) 100%
            );
            position: absolute;
            right: 0px;
            top: 61px;
          }
        }
      }
      .cardtwo:hover {
        .imgs2 {
          display: block;
        }
      }
    }
    .introduce:nth-child(4n) {
      margin-right: 0;
    }
  }
  .butto {
    color: #fe7865;
    background-color: rgba(254, 243, 241, 1);
  }
}
</style>
