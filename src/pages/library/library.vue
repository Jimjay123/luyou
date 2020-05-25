<!--
 * @Descripttion: 
 * @version: 
 * @Author: pengwanchong
 * @Date: 2019-09-23 09:32:37
 * @LastEditors  : pengwanchong
 * @LastEditTime : 2019-12-20 17:35:38
 -->
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
            <i>资源库（{{total || 0}}）</i>
          </div>
        </div>

        <!-- 筛选按钮 -->
        <div class="but" v-if="list != '' || list != null">
          <el-row>
            <el-button plain @click="handleClickTab('全部')">
              <div ref="q" :class="{'butto': butt == buttq ? true : false,}">全部</div>
            </el-button>
            <el-button plain @click="handleClickTab('标准课')">
              <div ref="b" :class="{'butto': butt == buttb ? true : false,}">标准课</div>
            </el-button>
            <el-button plain @click="handleClickTab('课程频道')">
              <div ref="k" :class="{'butto': butt == buttk ? true : false,}">课程频道</div>
            </el-button>
            <el-button plain @click="handleClickTab('沙盘课程')">
              <div ref="k" :class="{'butto': butt == butts ? true : false,}">沙盘课程</div>
            </el-button>
          </el-row>
          <div class="screen" @click="screen(bel)">
            <p>标签筛选</p>
            <img src="../../assets/img/icontop.svg" alt v-if="show" />
            <img src="../../assets/img/iconbot.svg" alt v-if="shob" />
          </div>
        </div>
        <!-- 标签筛选 -->
        <div
          class="Label"
          v-if="list != '' || list != null"
          :class="{'abel': bel == label ? true : false}"
        >
          <div class="individual" v-for="(item,index) in major" :key="index">
            <p>{{item.majorName}}</p>
            <ul>
              <li
                id="sel"
                v-for="(items,index) in item.tagName"
                :key="index"
                :class="{'selection': sele == items ? true : false,}"
                @click.stop="selection(items)"
              >{{items}}</li>
            </ul>
          </div>
        </div>
        <!-- 内容显示 -->
        <div class="ppk clearfix">
          <div
            class="introduce"
            v-for="item in list"
            :key="item.id"
            :ref="'introduce' + item.keyType"
            v-if="getShowFun(item.keyType,item.tagNameList)"
          >
            <div
              class="card1"
              @click="EstablishClick(item.keyType,item.keyId,item.keyName)"
              :class="(item.keyType == 11 || item.keyType == 12) ? cardone:cardtwo"
            >
              <div class="casd">
                <p>{{item.keyType}}</p>
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
                <div class="counts">
                  <img src="../../assets/img/duration.svg" alt class="imgr" />
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
                    v-for="(itemz,index) in item.tagNameList"
                    :key="index"
                  >
                    <span>{{itemz}}</span>
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

          <div class="default" v-if="def">
            <p class="p01">咦，没有找到相关内容～</p>
            <p class="p02">诚邀您和我们一起，共建优质内容生态</p>
          </div>
        </div>
        <!-- 缺省页 -->
        <div class="nocourse" v-if="list == '' || list == null">
          <img src="../../assets/img/kecheng.svg" alt />
          <h3>诶～尚未授权任何课程呢</h3>
          <p>快去看看有什么不错的课程，联系我们购买授权吧～</p>
          <el-button round class="el-but" @click="butUncert">
            <div>去看看</div>
          </el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  unAvailresourceList,
  subjectMajormaTagList
} from "../../service/groupApi";
import TopHeader from "../Header/header";
import PaginationItem from "../group/paginationItem";
import { cloneObj } from "../../utils/utils";
export default {
  name: "library",

  created() {
    // 获取页面所有数据的接口
    unAvailresourceList({ limit: "999", page: "1" })
      .then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
          this.total = res.page.totalCount;
          let list = res.page.list;
          let list1 = [];
          let list2 = [];
          let list3 = [];
          list.map(item => {
            if (item.keyType == 1 || item.keyType == 2) {
              list1.push(cloneObj(item));
            } else if (item.keyType == 11) {
              list2.push(cloneObj(item));
            } else if (
              item.keyType == 12 ||
              item.keyType == 4 ||
              item.keyType == 3
            ) {
              list3.push(cloneObj(item));
            }
          });
          this.data = {
            list: cloneObj(list),
            list1: list1,
            list2: list2,
            list3: list3
          };
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
      cour: 1,
      butt: "",
      buttq: "全部",
      buttb: "标准课",
      buttk: "课程频道",
      butts: "沙盘课程",
      def: false,
      shob: true,
      show: false,
      label: "block",
      bel: "",
      sele: null,
      clickTab: "全部",
      cardone: "cardone",
      cardtwo: "cardtwo",
      total: "",
      card1: false,
      list: [],
      major: [
        {
          majorName: "工作方法",
          tagName: [
            "个案工作",
            "小组工作",
            "社区工作",
            "社会行政",
            "社会工作督导",
            "社会工作伦理"
          ]
        },
        {
          majorName: "工作模式",
          tagName: [
            "人本中心模式",
            "问题解决模式",
            "危机干预模式 ",
            "行为治疗模式",
            "家庭治疗模式",
            "任务中心模式",
            "生态系统模式",
            "心理社会治疗模式",
            "行为修正模式",
            "理性情绪模式",
            "焦点解决",
            "治疗模式",
            "精神分析模式",
            "社会目标模式",
            "互惠模式",
            "发展性模式",
            "社区发展模式",
            "社会策划模式",
            "社会行动模式"
          ]
        },
        {
          majorName: "工作领域",
          tagName: [
            "儿童领域",
            "青少领域",
            "老年领域",
            "妇女领域",
            "残疾人领域",
            "家庭领域",
            "医务领域",
            "司法领域",
            "学校领域",
            "灾害领域 ",
            "企业领域",
            "社区矫正领域",
            "禁毒领域",
            "社会救助领域",
            "临终关怀领域",
            "精神健康领域",
            "农村领域",
            "城市领域"
          ]
        }
      ]
    };
  },
  methods: {
    // 跳转首页
    butUncert() {
      this.$router.push({
        path: "/Uncertified"
      });
    },
    // 缺省页显示隐藏
    screen(val) {
      this.show = !this.show;
      this.shob = !this.shob;
      if (val == "") {
        this.bel = "block";
      } else {
        this.bel = "";
      }
    },
    // 缺省页筛选
    selection(val) {
      this.def = true;
      if (this.clickTab !== val) {
        this.sele = val;
        this.clickTab = val;
      } else {
        this.clickTab = "全部";
        this.sele = null;
        this.def = false;
      }
    },
    menu() {
      window.scrollTo(0, 0);
    },
    // 页面跳转
    EstablishClick(keyType, keyId) {
      let cour = this.cour;
      if (keyType === 11 || keyType === 12) {
        window.open(
          window.location.href.split("#")[0] +
            "#/prechannel?courseChannelId=" +
            keyId +
            "&ard=" +
            +cour
        );
        // this.$router.push({
        //   path: "/Recstandard",
        //   query: {
        //     courseId: keyId
        //   }
        // });
      } else {
        window.open(
          window.location.href.split("#")[0] +
            "#/Recstandard?courseId=" +
            keyId +
            "&ard=" +
            +cour
        );

        // this.$router.push({
        //   path: "/prechannel",
        //   query: {
        //     courseChannelId: keyId
        //   }
        // });
      }
    },
    // 筛选方法
    handleClickTab(val) {
      if (this.clickTab !== val) {
        this.clickTab = val;
        if (val == "全部") {
          this.butt = val;
          this.list = cloneObj(this.data.list || []);
        } else if (val == "标准课") {
          this.butt = val;
          this.list = cloneObj(this.data.list1 || []);
        } else if (val == "课程频道") {
          this.butt = val;
          this.list = cloneObj(this.data.list2 || []);
        } else if (val == "沙盘课程") {
          this.butt = val;
          this.list = cloneObj(this.data.list3 || []);
        }
      }
    },
    // 判断筛选后的内容展示的方法
    getShowFun(val, type) {
      let clickTab = this.clickTab;
      console.log(type);
      let v = type.find(value => value == clickTab);
      if (clickTab == "全部") {
        if (val != null) {
          this.butt = clickTab;
          this.sele = null;
          return true;
        }
      } else if (clickTab == "标准课") {
        if (val == 1 || val == 2) {
          this.sele = null;
          return true;
        }
      } else if (clickTab == "课程频道") {
        if (val == 11) {
          this.sele = null;
          return true;
        }
      } else if (clickTab == "沙盘课程") {
        if (val == 12 || val == 4 || val == 3) {
          this.sele = null;
          return true;
        }
      } else if (clickTab) {
        if (v) {
          this.def = false;
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    this.menu();
  },
  components: {
    TopHeader: TopHeader, //注册该组件
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
  padding-bottom: 10px;
  .plana {
    margin-top: 24px;
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
    padding-left: 10px;
    padding-right: 10px;
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
        div {
          padding-left: 12px;
          padding-right: 12px;
          height: 34px;
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
    .screen {
      width: 81px;
      float: right;
      line-height: 36px;
      cursor: pointer;
      p {
        float: left;
        font-size: 14px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
      img {
        float: left;
        width: 20px;
        height: 20px;
        margin-top: 8px;
        margin-left: 5px;
      }
    }
  }
  .Label {
    margin-top: 22px;
    min-height: 92px;
    padding: 0 10px 0;
    display: none;
    .individual {
      min-height: 20px;
      margin-bottom: 16px;
      p {
        float: left;
        width: 56px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFangSC;
        font-weight: 500;
        color: rgba(179, 179, 179, 1);
        line-height: 20px;
        margin-right: 8px;
      }
      ul {
        width: 1100px;
        height: 100%;
        overflow: hidden;
      }
      li {
        float: left;
        margin: 0 16px 10px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFangSC;
        font-weight: 400;
        color: rgba(75, 75, 75, 1);
        line-height: 20px;
        cursor: pointer;
      }
      .selection {
        color: rgba(254, 120, 101, 1);
      }
    }
  }
  .abel {
    display: block;
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
            transition: 0.2s;
            z-index: 9;
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
            transition: 0.2s;
            z-index: 9;
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
          .sandchannel {
            position: absolute;
            top: -6px;
          }
          .sandstandard {
            position: absolute;
            top: -6px;
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
      .cardtwo:hover {
        .imgs2 {
          display: block;
        }
      }
    }
    .introduce:nth-child(4n) {
      margin-right: 0;
    }
    .default {
      text-align: center;
      height: 280px;
      padding-top: 90px;
      .p01 {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
      .p02 {
        margin-top: 5px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .nocourse {
    margin: 0 auto;
    margin-top: 54px;
    // width: 210px;
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
    .el-but {
      margin-top: 35px;
      width: 110px;
      height: 36px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      border: none;
      padding: 0;
      div {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
    .el-but:hover {
      border: none;
      div {
        color: #fff;
      }
    }
  }
  .butto {
    color: #fe7865;
    background-color: rgba(254, 243, 241, 1);
  }
}
</style>
