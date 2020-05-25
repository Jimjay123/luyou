<template>
  <el-container direction="vertical" v-if="wrz == 0 || wrz == 4 ? false : true">
    <!-- <creatorNav></creatorNav> -->
    <el-main class="system-all-notice">
      <el-container class="page-container">
        <!-- <el-header class="page-title" height="30px">系统消息</el-header> -->

        <el-main class="page-main">
          <div class="notice-list">
            <div class="Default" v-if="list == ''">
              <img src="../../assets/img/default.svg" alt />
              <p>消息空空如也～</p>
            </div>

            <Vuescroll :ops="ops">
              <div
                v-for="(item,index) in list"
                :key="index"
                :class="['notice-row',{readed:item.readed}]"
              >
                <div class="notice-main">
                  <img :src="item.type && icons[item.type - 1]" class="notice-icon" />
                  <span class="notice-content">{{item.message}}</span>
                </div>
                <div
                  class="notice-datestamp"
                >{{(item.relativeDay || "") + (item.time == null ? item.date: item.time || item.date == null ? item.time:item.date)}}</div>
              </div>
            </Vuescroll>
          </div>
        </el-main>
        <el-footer class="page-footer" height="93px" v-if="total > limit">
          <Pagination :options="{page:page,limit:limit,total:total,cb:paginCb}"></Pagination>
        </el-footer>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import { tipsFail } from "../../utils/utils";
import { systemNoticeTotalFun } from "../../service/creator/creatorAction";
import { systemNotice } from "../../service/noticeApi";
import { memberidentifyRoleType } from "../../service/groupApi";

import TopHeader from "../Header/header";
import TopHeaderp from "../Header/headerp";
import creatorNav from "../creator/creatorNav";
import Pagination from "../group/paginationItem";
import Vuescroll from "vuescroll";

@Component({
  name: "systemAllNotice",
  components: {
    TopHeader: TopHeader,
    TopHeaderp: TopHeaderp,
    creatorNav: creatorNav,
    Pagination,
    Vuescroll
  }
})
export default class SystemAllNotice extends Vue {
  created() {
    this.paginCb(1, 10, {});
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
  }

  icons = [
    require("../../assets/notice/success.svg"),
    require("../../assets/notice/error.svg"),
    require("../../assets/notice/video.svg")
  ];
  wrz = "";
  list = [];
  list1 = [
    {
      id: "notice-id-" + 1,
      type: 1,
      message:
        "【市场营销1班】全部学生完成了课程计划【KANO模型】完成度20/100人",
      date: new Date()
    },
    {
      id: "notice-id-" + 1,
      type: 2,
      message:
        "【市场营销1班】全部学生完成了课程计划【KANO模型】完成度20/100人",
      date: new Date()
    },
    {
      id: "notice-id-" + 1,
      type: 3,
      message:
        "【市场营销1班】全部学生完成了课程计划【KANO模型】完成度20/100人",
      date: new Date()
    }
  ];
  page = 1;
  limit = 10;
  total = 0;
  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: "#c1c1c1",
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: "6px",
      disable: false
    }
  }; //滚动条设置

  @Emit getMockData() {
    return Array(10)
      .fill(0)
      .map((_, index) => ({
        id: "notice-id-" + index + 1,
        type: 1,
        message:
          "【市场营销1班】全部学生完成了课程计划【KANO模型】完成度20/100人",
        date: new Date().toLocaledateString(),
        relativeDay: "",
        readed: index % 4 === 3
      }));
  }

  @Emit getData(opt) {
    systemNotice(opt)
      .then(res => {
        if (res.code == "0") {
          const list = res.page.list;
          this.list = list;
          this.total = res.page.totalCount;
          systemNoticeTotalFun();
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        // 测试阶段调用
        this.list = this.getMockData();
        this.total = 10;
      });
  }

  @Emit paginCb(page, size, options = {}) {
    this.page = page;
    this.limit = size;
    let opt = {
      page: page,
      limit: size
    };
    this.getData(opt);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.nav {
  float: left;
}
.el-container {
  width: 100%;
}
.system-all-notice {
  width: 100%;
  margin-left: 18px;
  font-family: PingFangSC;
  padding: 0;
  height: calc(100vh - 60px);
  .page-container {
    height: 100%;
    width: 100%;
  }
  .page-title {
    font-weight: 600;
    padding: 0;
    line-height: 30px;
    font-size: 22px;
    letter-spacing: 1px;
    margin-top: 38px;
    color: #000;
  }
  .page-main {
    padding: 0;
    position: relative;
    margin-top: 70px;
  }
  .notice-list {
    height: calc(100% - 20px);
  }
  .notice-row {
    position: relative;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 860px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #f5f5f5;
    font-size: 14px;
    &.readed {
      * {
        opacity: 0.5;
      }
    }
    .notice-icon {
      position: relative;
      top: -2px;
      width: 13px;
    }
    .notice-content {
      color: #666;
    }
    .notice-datestamp {
      color: #999;
    }
  }
  .page-footer {
    .pagination-item {
      justify-content: center;
    }
  }
  .Default {
    height: 204px;
    position: fixed;
    left: 50%;
    top: 25%;
    transform: translateX(-50%);
    text-align: center;
    img {
      width: 139px;
      height: 166px;
    }
    p {
      margin-top: 18px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
}
</style>
