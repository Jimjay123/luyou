
<template>
  <el-container direction="vertical">
    <Header></Header>

    <el-main class="system-all-notice">
      <el-container class="page-container">
        <el-header class="page-title" height="30px">系统消息</el-header>
        <div class="goback">
          <a href="javascript:history.go(-1)" style="text-decoration:none;color:#666666;">
            <img src="../../assets/studentIMG/goback.png" alt />
            <span>返回</span>
          </a>
        </div>
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
                <div class="notice-datestamp">{{(item.relativeDay || "") + item.date}}</div>
              </div>
            </Vuescroll>
          </div>
        </el-main>
        <el-footer class="page-footer" height="93px" v-if="total > limit">
          <Pagination
            :options="{page:page,limit:limit,total:total,cb:paginCb}"
            class="pagination-item"
          ></Pagination>
        </el-footer>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import { tipsFail } from "../../utils/utils";
import { systemNotice } from "../../service/noticeApi";
import Pagination from "../group/paginationItem";
import Vuescroll from "vuescroll";

@Component({
  name: "stuSystemAllNotice",
  components: { Pagination, Vuescroll }
})
export default class stuSystemAllNotice extends Vue {
  created() {
    this.paginCb(1, 10, {});
  }

  icons = [
    require("../../assets/notice/success.svg"),
    require("../../assets/notice/error.svg"),
    require("../../assets/notice/video.svg")
  ];
  list = [];
  page = 1;
  limit = 5;
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
        date: new Date().toLocaleDateString(),
        relativeDay: "",
        readed: index % 4 === 3
      }));
  }

  @Emit getData(opt) {
    systemNotice(opt)
      .then(res => {
        console.log(res);
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
        console.log(err);
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
.goback {
  position: absolute;
  left: 8px;
  top: 27px;
  color: #666666;
  font-size: 12px;
  cursor: pointer;
  img {
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
}
.system-all-notice {
  @include relative();
  font-family: PingFangSC;
  padding: 0;
  width: 60%;
  min-width: 860px;
  max-width: 1200;
  margin: 0 auto;
  height: calc(100vh - 60px);
  text-align: center;
  .page-container {
    height: 100%;
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
