<template>
  <el-container direction="vertical" v-if="wrz == 0 || wrz == 4 ? false : true">
    <TopHeader class="clearfix" v-if="wrz === 1? true: false"></TopHeader>
    <TopHeaderp class="clearfix" v-if="wrz === 2? true: false"></TopHeaderp>
    <TopHeader class="clearfix" v-if="wrz === 3? true: false"></TopHeader>
    <el-main class="system-all-notice">
      <el-container class="page-container">
        <el-header class="page-title" height="30px">系统消息</el-header>
        <el-main class="page-main">
          <div class="notice-list">
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
import { systemNotice } from "../../service/noticeApi";
import { memberidentifyRoleType } from "../../service/groupApi";
import TopHeader from "../Header/header";
import TopHeaderp from "../Header/headerp";
import Pagination from "../group/paginationItem";
import Vuescroll from "vuescroll";

@Component({
  name: "systemAllNotice",
  components: {
    TopHeader: TopHeader,
    TopHeaderp: TopHeaderp,
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
.el-container {
  width: 100%;
}
.system-all-notice {
  @include relative();
  font-family: PingFangSC;
  padding: 0;
  width: 60%;
  min-width: 860px;
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 60px);
  text-align: center;
  .page-container {
    height: 100%;
    width: 100%;
  }
  .page-title {
    font-weight: 600;
    line-height: 30px;
    font-size: 22px;
    letter-spacing: 1px;
    margin: 22px auto 24px auto;
    color: #000;
  }
  .page-main {
    padding: 0;
  }
  .notice-list {
    height: calc(100% - 20px);
  }
  .notice-row {
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
}
</style>
