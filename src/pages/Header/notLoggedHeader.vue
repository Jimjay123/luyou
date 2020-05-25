<template>
  <el-header clearfix>
    <div class="header-box">
      <div class="header clearfix">
        <div class="logo">
          <img src="../../assets/img/LOGO1.svg" alt @click="toHome" />
        </div>

        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/Uncertified" v-on:click="handleClick1(card,1)">
            首页
            <i v-if="headerTab===1"></i>
          </el-menu-item>
          <el-menu-item index="/Courseplan" v-on:click="handleClick1s1(card,2)">
            {{ title }}
            <i v-if="headerTab===2"></i>
          </el-menu-item>
          <el-menu-item index="/group/list" v-on:click="handleClick1s2(card,3)">
            我的群组
            <i v-if="headerTab===3"></i>
          </el-menu-item>
          <el-menu-item index="/teachers/teaNcesCenter" v-on:click="handleClick1s3(card,4)">
            个人中心
            <i v-if="headerTab===4"></i>
          </el-menu-item>
        </el-menu>

        <div class="icon">
          <div
            class="onez"
            ref="onez"
            v-Clickoutside="()=>{searchclick(none, wrz)}"
            @click="searchs(none, wrz)"
          >
            <img src="../../assets/img/search.svg" alt class="img1" ref="img1" />
            <em v-if="none">
              <input
                autocomplete="off"
                type="text"
                placeholder="请输入您要查找的内容"
                v-model="inputVal"
                id="messageInput"
                ref="search"
                @click="popShow = true"
                @keyup.enter="toSearch"
              />
              <i v-if="inputVal === '' ? false : true" @click="cleardata">×</i>
            </em>
          </div>

          <el-popover
            placement="bottom"
            width="340"
            trigger="hover"
            class="twos"
            popper-class="notice-popover"
            v-if="wrz == 0 || wrz == 4 ? false: true"
          >
            <Notices></Notices>
            <img src="../../assets/img/normal2.svg" alt class="img2" slot="reference" />
          </el-popover>

          <div class="twos" v-if="wrz == 0 || wrz == 4">
            <img src="../../assets/img/normal2.svg" class="img2" />
          </div>

          <span
            class="three"
            v-on:mouseenter="mouseoversFun(cardow,wrz)"
            v-on:mouseleave="mouseleavesFun(cardow,wrz)"
            v-on:click="handleClick(card)"
          >
            <div class="bb">
              <div class="hover">
                <img :src="listz.avatar || require('../../assets/img/touxiang.svg')" class="img3" />
              </div>
            </div>
            <div class="ge" v-if="cardow">
              <div class="lianjie"></div>
              <div class="Triangle"></div>
              <div class="ks">
                <div class="gr" @click="PersonalCenter">
                  <div class="jh">
                    <div class="mc">{{listz.memberName||未设置}}</div>
                    <img
                      src="../../assets/img/nan.svg"
                      alt
                      class="tou"
                      v-if="listz.gender === 1? true: false"
                    />
                    <img
                      src="../../assets/img/nv.svg"
                      alt
                      class="tou"
                      v-if="listz.gender === 2? true: false"
                    />
                    <div class="rz" v-if="listz.identifiedRoleType === 1">专业老师</div>
                    <div class="rz" v-if="listz.identifiedRoleType === 2">学生</div>
                    <div class="rz" v-if="listz.identifiedRoleType === 3">内容创建者</div>
                    <div class="shz" v-if="listz.identifiedRoleType === 4">
                      <img src="../../assets/img/shz.svg" alt />
                      <span>审核中</span>
                    </div>
                    <div class="wtg" v-if="listz.identifiedRoleType === 5">
                      <img src="../../assets/img/cw.svg" alt />
                      <span>未通过</span>
                    </div>
                  </div>
                  <p class="ids">ID：{{listz.mobile}}</p>
                  <div class="bk"></div>
                </div>
                <div class="sz" @click="emit">
                  <img src="../../assets/img/shezhi.svg" alt class="tous" />
                  <div class="mc">账号设置</div>
                </div>
                <div class="tc" @click="loginOut">
                  <img src="../../assets/img/tuichu.svg" alt class="tous" />
                  <div class="mc">退出登录</div>
                </div>
              </div>
            </div>
          </span>
        </div>

        <div class="kkp" v-if="wrz === 0 || wrz === 5 ? true : false ">
          <div class="card" v-if="card">
            <div class="Triangle"></div>
            <button class="one" v-on:click="handleClick(card)">暂不认证</button>
            <p class="two">身份认证</p>
            <p class="three">快去进行身份认证，使用更多的功能吧</p>
            <el-row>
              <el-button v-on:click="handleClick2(cards1)">
                <span>去认证</span>
              </el-button>
            </el-row>
          </div>

          <div class="cards1" v-if="cards1">
            <div class="Triangle"></div>
            <ul>
              <li>
                <a href="javascript:;" @click="teachersClick">
                  <img src="../../assets/img/touxiang.svg" alt />
                  <p>我是学生</p>
                </a>
              </li>

              <li>
                <a href="javascript:;" @click="teachersClick1">
                  <img src="../../assets/img/touxiang.svg" alt />
                  <p>我是老师</p>
                </a>
              </li>

              <li>
                <a href="javascript:;" @click="teachersClick2">
                  <img src="../../assets/img/touxiang.svg" alt />
                  <p>我是创作者</p>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="modal" v-if="sout" @click="out"></div>
        <div class="signout" v-if="sout" v-Clickoutside="()=>{sout()}">
          <div class="tc">
            <div class="header">确认退出？</div>
            <div class="main">是否确认退出陆由？</div>
            <div class="footer">
              <el-button @click="out">取消</el-button>
              <el-button @click="signout">确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import Notices from "../notice/Recent";
import {
  memberheaderMemberInfo,
  memberidentifyRoleType
} from "../../service/groupApi";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { mapState, createNamespacedHelpers, mapGetters } from "vuex";
const userinfo = createNamespacedHelpers("userinfo");
export default {
  name: "TopHeader",
  directives: {
    Clickoutside
  },
  created() {
    let token = sessionStorage.getItem("assent_token");
    if (token == null) {
      return;
    } else {
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
    // memberheaderMemberInfo({})
    //   .then(res => {
    //     // if (res.code == "0") {
    //     //   this.listz = res.data;
    //     // } else {
    //     //   tipsFail(res.msg);
    //     // }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  computed: {
    ...mapState({
      //...userinfo.mapGetters(["headerTab"])
    }),
    headerTab() {
      // console.log(this.$route.path);
      if (this.matchFun("/Uncertified")) {
        return 1;
      } else if (this.matchFun("/Courseplan")) {
        return 2;
      } else if (this.matchFun("/group/")) {
        return 3;
      } else if (this.matchFun("/teachers/teaNcesCenter")) {
        return 4;
      }
    }
  },
  data() {
    return {
      sout: false,
      avatar: "",
      wrz: "",
      cardow: false,
      total1: "0",
      total2: "0",
      input: "",
      radio: "1",
      cardq: true,
      cardaz: false,
      cards1: false,
      title: "课程计划",
      activeIndex: "1",
      listz: [],
      listzx: [],
      card1: false,
      none: false,
      inputVal: "",
      search: "",
      card: true,
      progreess: 30,
      bgc1: true,
      bgc2: false,
      bgc3: false,
      bgc4: false
    };
  },
  methods: {
    matchFun(str) {
      if (
        this.$route.path.match(str) &&
        this.$route.path.match(str).length > 0
      ) {
        return true;
      }
    },
    toHome() {
      this.$router.push("/Uncertified");
    },

    loginOut() {
      this.sout = true;
    },

    out() {
      this.sout = false;
    },

    signout() {
      window.sessionStorage.clear();
      this.$router.push("/main");
    },

    PersonalCenter() {
      if (this.wrz === 0 || this.wrz === 4) {
        return;
      } else {
        this.$router.push({
          path: "/teachers/teaNcesCenter"
        });
      }
    },
    emit() {
      if (this.wrz === 0 || this.wrz === 4) {
        return;
      } else {
        this.$router.push({
          path: "/personal"
        });
      }
    },
    mouseoversFun(cardow, wrz) {
      if (wrz === 0) {
        return;
      } else {
        this.cardow = true;
      }
    },
    mouseleavesFun(cardow, wrz) {
      if (wrz === 0) {
        return;
      } else {
        this.cardow = false;
      }
    },
    cleardata() {
      this.inputVal = "";
    },
    searchs(none, wrz) {
      if (wrz === 0) {
        return;
      } else if (wrz != 0) {
        this.none = true;
        this.$refs.img1.style.marginRight = "0";
      }
    },
    searchclick(none, wrz) {
      if (wrz === 0) {
        return;
      } else if (wrz != 0) {
        this.none = false;
        this.$refs.img1.style.marginRight = "16px";
      }
    },
    menu() {
      window.scrollTo(0, 0);
    },
    teachersClick() {
      this.$router.push({
        path: "/studentAttestation",
        query: {
          identifiedType: 2
        }
      });
    },
    teachersClick1() {
      this.$router.push({
        path: "/teachers/teacherAttestation",
        query: {
          identifiedType: 1
        }
      });
    },
    teachersClick2() {
      this.$router.push({
        path: "/teachers/teacherAttestation",
        query: {
          identifiedType: 3
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(card) {
      this.card = !this.card;
      this.cards1 = false;
    },
    handleClick1(card, val) {
      this.changeHeaderTab(val);
      let wrz = this.wrz;
      if (wrz == 1) {
        this.$router.push({
          path: "/Uncertified"
        });
      } else if (wrz == 2) {
        this.$router.push({
          path: "/StudentMain"
        });
      } else if (wrz == 3) {
        this.$router.push({
          path: "creator/home"
        });
      } else if (wrz == 0) {
        this.$router.push({
          path: "/Uncertified"
        });
      }

      this.cards1 = false;
    },
    handleClick1s1(card, val) {
      this.changeHeaderTab(val);
      let wrz = this.wrz;
      if (wrz == 1) {
        this.$router.push({
          path: "/Courseplan"
        });
      } else if (wrz == 2) {
        this.$router.push({
          path: "/StudentCour"
        });
      } else if (wrz == 0) {
        this.$router.push({
          path: "/Uncertified"
        });
      }
      this.cards1 = false;
    },
    handleClick1s2(card, val) {
      this.changeHeaderTab(val);
      let wrz = this.wrz;
      if (wrz == 1) {
        this.$router.push({
          path: "/group/list"
        });
      } else if (wrz == 2) {
        this.$router.push({
          path: "/student/studentList"
        });
      } else if (wrz == 0) {
        this.$router.push({
          path: "/Uncertified"
        });
      }
      this.cards1 = false;
    },
    handleClick1s3(card, val) {
      this.changeHeaderTab(val);
      let wrz = this.wrz;
      if (wrz == 1) {
        this.$router.push({
          path: "/teachers/teaNcesCenter"
        });
      } else if (wrz == 2) {
        this.$router.push({
          path: "/student/ncesCenter"
        });
      } else if (wrz == 0) {
        this.$router.push({
          path: "/Uncertified"
        });
      }
      this.cards1 = false;
    },
    handleClick2(cards1) {
      this.cards1 = !this.cards1;
      this.card = !this.card;
    },
    toSearch() {
      let wrz = this.wrz;
      if (wrz == 1) {
        location.href = "#/search?search=" + this.inputVal;
      } else if (wrz == 2) {
        location.href = "#/studentSearch?studentSearch=" + this.inputVal;
      }
    },
    changeHeaderTab(val) {
      this.$store.dispatch("userinfo/headerTabHandle", {
        headerTab: val
      });
    }
  },
  components: { Notices }
};
</script>
<style>
.notice-popover {
  padding: 0;
}
</style>

<style lang="less" scoped>
.el-header {
  width: 100%;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 2px 6px 0px rgba(237, 237, 237, 1);
  z-index: 99;
  position: relative;
  .header-box {
    position: fixed;
    background: #fff;
    width: 100vw;
  }
  .header {
    width: 1200px;
    position: relative;
    display: block;
    margin: 0 auto;
    .logo {
      float: left;
      height: 60px;
      display: flex;
      align-items: center;
      padding-right: 300px;
      cursor: pointer;
    }
    .el-menu {
      float: left;
      border-bottom: none;
      position: relative;
      box-sizing: border-box;
      background: transparent;
      .el-menu-item {
        position: relative;
        padding-right: 25px;
        padding-left: 25px;
        text-align: center;
        font-size: 16px;
        color: #666666;
        border-bottom: none;
        font-weight: 500;
        i {
          display: inline-block;
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 13px;
          height: 4px;
          background-color: rgba(254, 120, 101, 1);
          border-radius: 2px;
        }
      }
      .is-active {
        color: rgba(254, 120, 101, 1);
      }
    }
    .icon {
      height: 60px;
      float: right;
      .onez {
        float: left;
        line-height: 58px;
        .img1 {
          cursor: pointer;
          width: 48px;
          height: 48px;
          margin-right: 16px;
        }
        .img1:hover {
          width: 48px;
          height: 48px;
          background: rgba(245, 245, 245, 1);
          border-radius: 26px;
        }
        em {
          input {
            width: 150px;
            border: none;
          }
          i {
            cursor: pointer;
          }
        }
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
      .three {
        cursor: pointer;
        float: left;
        width: 72px;
        .bb {
          width: 72px;
          height: 60px;
          margin-left: 16px;
          display: flex;
          align-items: center;
          .hover {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            .img3 {
              width: 32px;
              height: 32px;
              border-radius: 50%;
            }
            &:hover {
              background: rgba(245, 245, 245, 1);
              border-radius: 26px;
            }
          }
        }
        .ge {
          width: 181px;
          height: 183px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 6px 0px rgba(153, 153, 153, 0.27);
          position: absolute;
          z-index: 998;
          top: 70px;
          right: 0;
          border-radius: 10px;
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
            top: -20px;
            right: 22px;
            z-index: 999;
            width: 10px;
            height: 10px;
            border-top: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid rgba(255, 255, 255, 1);
            border-left: 10px solid transparent;
          }
          .gr {
            width: 181px;
            height: 62px;
            padding-left: 16px;
            padding-right: 16px;
            z-index: 999;
            .jh {
              height: 32px;
              background: rgba(255, 255, 255, 0.01);
              overflow: hidden;
              margin-top: 10px;
              .mc {
                width: 69px;
                height: 22px;
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 22px;
                float: left;
                margin-top: 10px;
              }
              .tou {
                position: absolute;
                width: 14px;
                height: 14px;
                margin-top: 14px;
                margin-right: 6px;
              }
              .rz {
                position: absolute;
                right: 16px;
                float: left;
                padding: 2px 4px 2px 4px;
                margin-top: 10px;
                border-radius: 4px;
                border: 1px solid rgba(254, 120, 101, 0.4);
                font-size: 10px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(254, 120, 101, 1);
                text-align: center;
                line-height: 15px;
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
              margin-top: 10px;
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
    }
    .kkp {
      .card {
        position: absolute;
        z-index: 999;
        right: 0;
        top: 60px;
        margin-top: 10px;
        border-radius: 10px;
        width: 405px;
        height: 173px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
        .Triangle {
          position: absolute;
          top: -20px;
          right: 22px;
          z-index: 999;
          width: 10px;
          height: 10px;
          border-top: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid rgba(255, 255, 255, 1);
          border-left: 10px solid transparent;
        }
        .one {
          position: relative;
          z-index: 999;
          margin-top: 26px;
          margin-right: 28px;
          float: right;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
          border: 0px solid transparent;
          background-color: #fff;
        }
        .two {
          margin-top: 40px;
          margin-left: 30px;
          font-size: 18px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
        }
        .three {
          margin-top: 9px;
          margin-left: 30px;
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 21px;
        }
        .el-button {
          position: relative;
          margin-right: 28px;
          margin-top: 19px;
          width: 98px;
          height: 36px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 18px;
          text-align: center;
          float: right;
          z-index: 999;
          // line-height: 10px;

          span {
            position: absolute;
            top: 25%;
            left: 20%;
            // vertical-align: middle;
            font-size: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #fff;
            line-height: 18px;
          }
        }
      }
      .cards1 {
        position: absolute;
        right: 0%;
        top: 60px;
        z-index: 1299;
        margin-top: 10px;
        border-radius: 10px;
        width: 405px;
        height: 173px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
        .Triangle {
          position: absolute;
          top: -20px;
          right: 22px;
          z-index: 999;
          width: 10px;
          height: 10px;
          border-top: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid rgba(255, 255, 255, 1);
          border-left: 10px solid transparent;
        }
        ul {
          display: flex;

          li {
            margin-top: 45px;
            float: left;
            flex: 3;
            text-align: center;
            // vertical-align: middle;
            img {
              margin-bottom: 20px;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              border: 1px solid rgba(237, 237, 237, 1);
            }
            p {
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
              line-height: 22px;
            }
          }
        }
      }
    }
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
      width: 339px;
      height: 60px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
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
        &:hover {
          color: rgba(255, 255, 255, 1);
        }
        &:focus {
          color: rgba(255, 255, 255, 1);
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
</style>
