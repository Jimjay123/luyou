/**

* Created by wangxin

* @date 2019/9/4 11:19

*/
<template>
  <div class="home-header clearfix">
    <span class="user-name">{{pageName || '我的创作'}}</span>
    <!-- <span class="user-name">我的创作</span> -->
    <div class="user-info">
      <!-- <div class="msg">
        <img :src="require('../../assets/img/sousuo-opc.svg')" alt />
      </div>-->

      <!-- 创作者中心start -->
      <div class="creators" @click="jumpPage">
        <div class="text">老师端</div>
      </div>
      <!-- 创作者中心end -->

      <el-popover
        placement="bottom"
        width="340"
        trigger="hover"
        class="twos"
        popper-class="notice-popover"
        v-if="wrz == 0 || wrz == 4 ? false: true"
      >
        <Notices></Notices>
        <img
          :src="otherList[1].count>0?require('../../assets/creator/notice.svg'):require('../../assets/creator/notice-n.svg')"
          alt
          class="img2"
          slot="reference"
        />
      </el-popover>

      <div class="user">
        <img :src="userList.avatar" alt v-if="userList.avatar!==''" />
        <img
          v-else
          :src="userList.gender === 1? require('../../assets/teachers/boy.svg'): require('../../assets/teachers/girls.svg')"
          alt
        />
        <div class="ge">
          <div class="lianjie"></div>
          <div class="Triangle"></div>
          <div class="ks">
            <div class="gr">
              <div class="jh">
                <div class="mc">{{userName}}</div>
                <div class="tou">
                  <img src="../../assets/img/nan.svg" alt />
                </div>
                <div class="rz" v-if="wrz===3">创作者</div>
                <div class="rz audit" v-if="wrz===4">
                  <i></i>审核中
                </div>
                <div class="rz error" v-if="wrz===5">
                  <i></i>未通过
                </div>
                <!-- <img
                  src="../../assets/img/nv.svg"
                  alt
                  class="tou"
                  v-if="listz.gender === 2? true: false"
                />-->
                <!-- 身份判断 -->
                <!-- <div class="rz" v-if="listz.identifiedRoleType === 1">创作者</div>
                <div class="rz" v-if="listz.identifiedRoleType === 2">审核中</div>
                <div class="rz" v-if="listz.identifiedRoleType === 3">未通过</div>
                <div class="shz" v-if="listz.identifiedRoleType === 4">
                  <img src="../../assets/img/shz.svg" alt />
                  <span>审核中</span>
                </div>
                <div class="wtg" v-if="listz.identifiedRoleType === 5">
                  <img src="../../assets/img/cw.svg" alt />
                  <span>未通过</span>
                </div>-->
                <!-- 身份判断 -->
              </div>
              <p class="ids">ID：{{userList.mobile}}</p>
              <div class="bk"></div>
            </div>
            <div class="sz">
              <img src="../../assets/img/shezhi.svg" alt class="tous" />
              <div class="mc" @click="infoSet">账号设置</div>
            </div>
            <div class="tc">
              <img src="../../assets/img/tuichu.svg" alt class="tous" />
              <div class="mc" @click="signClick">退出登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--退出登录弹框 start-->
    <LogOut v-if="logOut" :logOutCb="logOutCb" />
    <!--退出登录弹框 end-->
  </div>
</template>

<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import LogOut from "./logOut";
import { State, Action, namespace } from "vuex-class";
import Notices from "../notice/Recent";
import { memberidentifyRoleType } from "../../service/groupApi";
const CreatorMod = namespace("creator");

@Component({
  name: "HomeHeader",
  directives: {
    Clickoutside
  },
  components: {
    LogOut,
    Notices
  }
})
export default class HomeHeader extends Vue {
  @CreatorMod.State("userList") userList; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("userListHandle") userListHandle; //当前选择的群组  action修改方法

  @CreatorMod.State("tab") tab; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("tabHandle") tabHandle; //当前选择的群组  action修改方法

  @CreatorMod.State("courseList") courseList; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("courseListHandle") courseListHandle; //当前选择的群组  action修改方法

  @CreatorMod.State("otherList") otherList; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("otherListHandle") otherListHandle; //当前选择的群组  action修改方法
  firstTitle = ""; //title名称
  wrz = ""; //
  logOut = false;

  // 点击跳转老师端页面
  @Emit jumpPage() {
    sessionStorage.setItem("loginRoleStatus", "1");
    this.$router.push({
      path: "/Uncertified"
    });
  }

  //退出登录弹框回调
  @Emit logOutCb() {
    this.logOut = false;
  }

  //退出登录点击按钮点击事件
  @Emit signClick() {
    this.logOut = true;
  }

  //页面名称修改
  get pageName() {
    let path = this.$route.path;
    let tab = "我的创作";
    let obj1 = this.otherList.find(d => d.url === path);
    let obj2 = this.courseList.find(d => d.url === path);
    tab = obj1 ? obj1.title : tab;
    tab = obj2 ? obj2.title : tab;
    return tab;
  }

  get userName() {
    let memberName = this.userList.memberName + "";
    return memberName.length > 4 ? memberName.slice(0, 4) : memberName;
  }

  //账号设置
  @Emit infoSet() {
    this.tabHandle({
      tab: "个人中心"
    });
    this.$router.replace("/creator/creatorpersonal");
  }

  created() {
    this.firstTitle = Object.values(this.$route.query).join("");
    memberidentifyRoleType({})
      .then(res => {
        if (res.code == "0") {
          let loginRoleStatus = sessionStorage.getItem("loginRoleStatus");
          console.log(loginRoleStatus);
          this.wrz = loginRoleStatus;
          // let loginRoleStatus = sessionStorage.setItem(
          //   "loginRoleStatus",
          //   res.identifiedRoleType
          // );
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.home-header {
  //width: 100%;
  height: 60px;
  line-height: 60px;
}
.user-info {
  float: right;
}
.msg,
.user {
  display: inline-block;
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  position: relative;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  &:hover {
    .ge {
      display: block;
    }
  }
  .ge {
    width: 184px;
    height: 172px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(153, 153, 153, 0.27);
    position: absolute;
    z-index: 998;
    top: 48px;
    right: -7px;
    border-radius: 10px;
    display: none;
    .lianjie {
      width: 50px;
      height: 50px;
      position: absolute;
      right: 15px;
      top: -20px;
      z-index: -1;
    }
    .Triangle {
      position: absolute;
      top: -16px;
      right: 22px;
      z-index: 998;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent rgba(255, 255, 255, 1) transparent;
    }
    .gr {
      width: 100%;
      height: 52px;
      padding-left: 16px;
      padding-right: 16px;
      z-index: 999;
      .jh {
        height: 32px;
        background: rgba(255, 255, 255, 0.01);
        margin-top: 6px;
        display: flex;
        align-items: center;
        .mc {
          height: 22px;
          font-size: 16px;
          font-weight: 500;
          color: #333;
          line-height: 22px;
          margin-right: 6px;
          width: 64px;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
          vertical-align: middle;
        }
        .tou {
          width: 14px;
          height: 15px;
          margin-right: 6px;
          line-height: normal;
          img {
            width: 14px;
            height: 15px;
            vertical-align: top;
          }
        }
        .rz {
          font-size: 12px;
          font-weight: 400;
          color: #fe7865;
          line-height: 12px;
          padding: 4px;
          text-align: center;
          border-radius: 4px;
          opacity: 0.4;
          border: 1px solid #fe7865;
          vertical-align: middle;
          i {
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: middle;
            margin-right: 2px;
          }
        }
        .audit {
          i {
            background: url("../../assets/creator/audit.svg") no-repeat;
            background-size: 100% auto;
          }
        }
        .error {
          i {
            background: url("../../assets/creator/error.svg") no-repeat;
            background-size: 100% auto;
          }
        }

        .shz {
          position: absolute;
          right: 16px;
          float: left;
          margin-top: 11px;
          width: 60px;
          height: 20px;
          border-radius: 5px;
          border: 1px solid rgba(255, 197, 61, 1);
          padding-left: 2px;
          line-height: 15px;
          span {
            font-size: 12px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
        .wtg {
          position: absolute;
          right: 16px;
          float: left;
          margin-top: 11px;
          width: 60px;
          height: 20px;
          border-radius: 5px;
          border: 1px solid rgba(254, 120, 101, 1);
          padding-left: 2px;
          line-height: 15px;
          span {
            font-size: 12px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(254, 120, 101, 1);
          }
        }
      }
      .ids {
        // width: 120px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        margin-top: 1px;
        text-align: left;
      }
      .bk {
        margin-top: 10px;
        width: 128px;
        height: 1px;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 10px;
      }
    }
    .sz {
      height: 44px;
      background: rgba(255, 255, 255, 0.01);
      overflow: hidden;
      padding-left: 16px;
      padding-right: 16px;
      margin-top: 20px;

      .tous {
        float: left;
        width: 32px;
        height: 32px;
        margin-top: 8px;
      }
      .mc {
        float: left;
        margin-left: 10px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 44px;
      }
    }
    .tc {
      height: 44px;
      background: rgba(255, 255, 255, 0.01);
      overflow: hidden;
      padding-left: 16px;
      padding-right: 16px;
      line-height: 44px;
      .tous {
        vertical-align: middle;
        float: left;
        width: 32px;
        height: 32px;
        margin-top: 8px;
      }
      .mc {
        float: left;
        margin-left: 10px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 44px;
      }
    }
    .gr:hover,
    .sz:hover,
    .tc:hover {
      background: rgba(247, 247, 247, 1);
    }
  }
}
.user-name {
  display: inline-block;
  vertical-align: baseline;
  @include fontSet(26px, #333, 600);
  position: relative;
  top: 15px;
}
.twos {
  cursor: pointer;
  line-height: 58px;
  float: left;
  width: 72px;
  height: 60px;
  .img2 {
    margin-left: 16px;
    width: 48px;
    height: 48px;
  }
  .img2:hover {
    width: 48px;
    height: 48px;
    background: rgba(245, 245, 245, 1);
    border-radius: 26px;
  }
}
.creators {
  width: 88px;
  // height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  border: 1px solid rgba(254, 120, 101, 0.4);
  float: left;
  margin-top: 14px;
  text-align: center;
  line-height: 32px;
  .text {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fe7865;
  }
}
.creators:hover {
  cursor: pointer;
  border: 1px solid rgba(254, 120, 101, 1);
}
</style>
