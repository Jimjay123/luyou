<template>
  <div
    class="system-recent-notice"
    v-if="identifiedRoleType == 0 || identifiedRoleType == 4 ? false : true"
  >
    <div class="view-header">系统消息</div>
    <div class="view-content">
      <div class="notice-emit" v-if="list == '' || list == null || list == undefined">
        <div class="notice-no">暂无消息～</div>
      </div>
      <div class="notice-list">
        <div v-for="(item,index) in list" :key="index" :class="['notice-row',{readed:item.readed}]">
          <img :src="item.type && icons[item.type - 1] || item.src" class="notice-icon" />
          <span class="notice-content">{{item.message}}</span>
          <div
            class="notice-date"
          >{{(item.relativeDay || "") + (item.time == null ? item.date: item.time || item.date == null ? item.time:item.date)}}</div>
        </div>
      </div>
    </div>
    <div class="view-footer">
      <a
        class="to-group-notice"
        href="#/group/list?groupId=-1"
        target="__blank"
        v-show="identifiedRoleType == '1'"
      >入群申请</a>
      <a
        class="to-all-notice"
        href="javascript:;"
        @click="jumpFun"
        style="position:absolute;bottom:0px;right:5px;"
      >查看全部 ></a>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { recentSystemNotice } from "../../service/noticeApi";
import { memberidentifyRoleType } from "../../service/groupApi";
import { tipsFail } from "../../utils/utils";

@Component({
  name: "systemRecentNotice"
})
export default class SystemRecentNotice extends Vue {
  icons = [
    require("../../assets/notice/success.svg"),
    require("../../assets/notice/error.svg"),
    require("../../assets/notice/video.svg")
  ];
  list = [];
  identifiedRoleType = "";
  @Emit getMockData() {
    return [
      {
        id: "notice-id-1",
        src: require("../../assets/notice/success.svg"),
        message: "恭喜，您的 学生认证 申请已通过审核",
        date: "22:20",
        readed: false
      },
      {
        id: "notice-id-2",
        src: require("../../assets/notice/error.svg"),
        message:
          "很抱歉，您的 专业老师认证 申请未通过审核。由于您的什么什么原因",
        date: "14:00",
        readed: false
      },
      {
        id: "notice-id-3",
        src: require("../../assets/notice/video.svg"),
        message:
          "【市场营销1班】全部学生完成了课程计划【KANO模型】完成度20/100人",
        date: "昨天12:00",
        readed: false
      },
      {
        id: "notice-id-4",
        src: require("../../assets/notice/video.svg"),
        message:
          "【市场营销1班】全部学生完成了课程计划【KANO模型】完成度20/100人",
        date: "8月04日",
        readed: true
      }
    ];
  }

  @Emit getData() {
    recentSystemNotice()
      .then(res => {
        if (res.code == "0") {
          this.list = res.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        // 测试阶段调用
        this.list = this.getMockData();
      });
  }

  @Emit jumpFun() {
    let identifiedRoleType = sessionStorage.getItem("loginRoleStatus");
    console.log(identifiedRoleType);

    let path =
      identifiedRoleType == 1
        ? "#/teaNotice"
        : identifiedRoleType == 2
        ? "#/stuNotice"
        : identifiedRoleType == 3
        ? "#/creator/creatorNotice"
        : "#/teaNotice";
    window.location.href = path;
  }
  created() {
    this.getData();
    memberidentifyRoleType().then(res => {
      if (res.code === 0) {
        this.identifiedRoleType = res.identifiedRoleType;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.system-recent-notice {
  @include relative();
  font-family: PingFangSC;
  .view-header {
    padding: 14px 0 2px 20px;
    color: #333;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
  .view-content {
    .notice-row {
      display: flex;
      align-items: flex-start;
      font-size: 12px;
      padding: 13px 12px 13px 20px;
      &.readed {
        * {
          opacity: 0.5;
        }
      }
      .notice-icon {
        position: relative;
        width: 12px;
        margin-top: 3px;
        margin-right: 10px;
      }
      .notice-content {
        width: 202px;
        line-height: 17px;
      }
      .notice-date {
        width: 84px;
        text-align: right;
        color: #999;
        line-height: 16px;
        font-family: MicrosoftYaHei;
      }
    }
  }
  .view-footer {
    display: flex;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;
    padding: 0 14px 0 20px;
    background: #fafafa;
    .to-group-notice {
      color: #999;
      font-size: 13px;
    }
    .to-all-notice {
      font-size: 14px;
      color: #fe7865;
      font-family: MicrosoftYaHei;
    }
  }
  .notice-emit {
    width: 340px;
    height: 44px;
    background: rgba(216, 216, 216, 0);
    padding: 13px 69px 14px 69px;
    .notice-no {
      text-align: center;
      width: 202px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
