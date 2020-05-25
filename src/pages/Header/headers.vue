<template>
  <el-header clearfix>
    <div class="header clearfix">
      <div class="logo">
        <img src="../../assets/img/LOGO1.svg" alt @click="toHome" />
      </div>

      <ul class="el-menu-demo">
        <li index="1" v-on:click="handleClick1s1">
          <span>首页</span>
          <i v-if="bgc1"></i>
        </li>
        <li index="2" v-on:click="handleClick1s2">
          <span ref="ind1">课程计划</span>
          <i v-if="bgc2"></i>
        </li>
        <li index="3" v-on:click="handleClick1s3">
          <span ref="ind2">我的群组</span>
          <i v-if="bgc3"></i>
        </li>
        <li index="4" v-on:click="handleClick1s4">
          <span ref="ind3">个人中心</span>
          <i v-if="bgc4"></i>
        </li>
      </ul>

      <div class="icon">
        <div class="onez" v-on:click="handleClick1s5">
          <img src="../../assets/img/search.svg" class="img1" />
        </div>

        <div class="twos" v-on:click="handleClick1s6">
          <img src="../../assets/img/normal2.svg" class="img2" />
        </div>

        <span class="three">
          <div class="bb" v-on:click="handleClick">
            <div class="hover">
              <img src="../../assets/img/touxiang.svg" class="img3 zz" />
            </div>
          </div>
        </span>
      </div>

      <div class="card" v-if="card">
        <div class="Triangle"></div>
        <p>身份认证后，才能使用更多功能噢～</p>
      </div>
      <div class="card22" v-if="card22">
        <div class="Triangle"></div>
        <p>身份认证后，才能使用更多功能噢～</p>
      </div>
      <div class="card33" v-if="card33">
        <div class="Triangle"></div>
        <p>身份认证后，才能使用更多功能噢～</p>
      </div>
      <div class="card44" v-if="card44">
        <div class="Triangle"></div>
        <p>身份认证后，才能使用更多功能噢～</p>
      </div>
      <div class="card55" v-if="card55">
        <div class="Triangle"></div>
        <p>身份认证后，才能使用更多功能噢～</p>
      </div>
      <div class="card66" v-if="card66">
        <div class="Triangle"></div>
        <p>身份认证后，才能使用更多功能噢～</p>
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
  </el-header>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      card: false,
      card11: false,
      card22: false,
      card33: false,
      card44: false,
      card55: false,
      card66: false,

      sout: false,
      input: "",
      activeIndex: "",
      none: false,
      inputVal: "",
      search: "",
      bgc1: false,
      bgc2: false,
      bgc3: false,
      bgc4: false
    };
  },
  methods: {
    handleClick1s1() {
      this.$router.push("/Uncertified");
    },
    handleClick1s2() {
      this.card22 = true;
      this.card33 = false;
      this.card44 = false;
      this.card55 = false;
      this.card66 = false;
      this.card = false;
      this.bgc2 = true;
      this.bgc3 = false;
      this.bgc4 = false;
      this.$refs.ind1.style.color = "#fe7865";
      this.$refs.ind2.style.color = "#666666";
      this.$refs.ind3.style.color = "#666666";
      setTimeout(() => {
        this.card22 = false;
      }, 2000);
    },
    handleClick1s3() {
      this.card33 = true;
      this.card22 = false;
      this.card44 = false;
      this.card55 = false;
      this.card66 = false;
      this.card = false;
      this.bgc3 = true;
      this.bgc2 = false;
      this.bgc4 = false;
      this.$refs.ind1.style.color = "#666666";
      this.$refs.ind2.style.color = "#fe7865";
      this.$refs.ind3.style.color = "#666666";
      setTimeout(() => {
        this.card33 = false;
      }, 2000);
    },
    handleClick1s4() {
      this.card44 = true;
      this.card22 = false;
      this.card33 = false;
      this.card55 = false;
      this.card66 = false;
      this.card = false;
      this.bgc4 = true;
      this.bgc3 = false;
      this.bgc2 = false;
      this.$refs.ind1.style.color = "#666666";
      this.$refs.ind2.style.color = "#666666";
      this.$refs.ind3.style.color = "#fe7865";
      setTimeout(() => {
        this.card44 = false;
      }, 2000);
    },
    handleClick1s5() {
      this.card55 = true;
      this.card22 = false;
      this.card33 = false;
      this.card44 = false;
      this.card66 = false;
      this.card = false;
      this.bgc2 = false;
      this.bgc3 = false;
      this.bgc4 = false;
      this.$refs.ind1.style.color = "#666666";
      this.$refs.ind2.style.color = "#666666";
      this.$refs.ind3.style.color = "#666666";
      setTimeout(() => {
        this.card55 = false;
      }, 2000);
    },
    handleClick1s6() {
      this.card66 = true;
      this.card22 = false;
      this.card33 = false;
      this.card44 = false;
      this.card55 = false;
      this.card = false;
      this.bgc2 = false;
      this.bgc3 = false;
      this.bgc4 = false;
      this.$refs.ind1.style.color = "#666666";
      this.$refs.ind2.style.color = "#666666";
      this.$refs.ind3.style.color = "#666666";
      setTimeout(() => {
        this.card66 = false;
      }, 2000);
    },
    handleClick() {
      this.card = true;
      this.card22 = false;
      this.card33 = false;
      this.card44 = false;
      this.card55 = false;
      this.card66 = false;
      this.bgc2 = false;
      this.bgc3 = false;
      this.bgc4 = false;
      this.$refs.ind1.style.color = "#666666";
      this.$refs.ind2.style.color = "#666666";
      this.$refs.ind3.style.color = "#666666";
      setTimeout(() => {
        this.card = false;
      }, 2000);
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
    menu() {
      window.scrollTo(0, 0);
    },
    handleSelect(keyPath) {
      console.log(keyPath);
    }
  }
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
    ul {
      position: relative;
      box-sizing: border-box;
      li {
        float: left;
        position: relative;
        line-height: 60px;
        padding-right: 25px;
        padding-left: 25px;
        text-align: center;
        span {
          font-size: 16px;
          color: #666666;
          font-weight: 500;
        }
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
    .card {
      position: absolute;
      z-index: 999;
      right: 0;
      top: 70px;
      margin-top: 10px;
      border-radius: 4px;
      width: 212px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
      .Triangle {
        position: absolute;
        top: -20px;
        right: 25px;
        z-index: 999;
        width: 10px;
        height: 10px;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(255, 255, 255, 1);
        border-left: 10px solid transparent;
      }
      p {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
      }
    }

    .card11 {
      position: absolute;
      z-index: 999;
      right: 643px;
      top: 70px;
      margin-top: 10px;
      border-radius: 4px;
      width: 212px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
      .Triangle {
        position: absolute;
        top: -20px;
        right: 165px;
        z-index: 999;
        width: 10px;
        height: 10px;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(255, 255, 255, 1);
        border-left: 10px solid transparent;
      }
      p {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
      }
    }

    .card22 {
      position: absolute;
      z-index: 999;
      right: 546px;
      top: 70px;
      margin-top: 10px;
      border-radius: 4px;
      width: 212px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
      .Triangle {
        position: absolute;
        top: -20px;
        right: 165px;
        z-index: 999;
        width: 10px;
        height: 10px;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(255, 255, 255, 1);
        border-left: 10px solid transparent;
      }
      p {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
      }
    }

    .card33 {
      position: absolute;
      z-index: 999;
      right: 431px;
      top: 70px;
      margin-top: 10px;
      border-radius: 4px;
      width: 212px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
      .Triangle {
        position: absolute;
        top: -20px;
        right: 165px;
        z-index: 999;
        width: 10px;
        height: 10px;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(255, 255, 255, 1);
        border-left: 10px solid transparent;
      }
      p {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
      }
    }

    .card44 {
      position: absolute;
      z-index: 999;
      right: 318px;
      top: 70px;
      margin-top: 10px;
      border-radius: 4px;
      width: 212px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
      .Triangle {
        position: absolute;
        top: -20px;
        right: 165px;
        z-index: 999;
        width: 10px;
        height: 10px;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(255, 255, 255, 1);
        border-left: 10px solid transparent;
      }
      p {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
      }
    }

    .card55 {
      position: absolute;
      z-index: 999;
      right: 148px;
      top: 70px;
      margin-top: 10px;
      border-radius: 4px;
      width: 212px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
      .Triangle {
        position: absolute;
        top: -20px;
        right: 25px;
        z-index: 999;
        width: 10px;
        height: 10px;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(255, 255, 255, 1);
        border-left: 10px solid transparent;
      }
      p {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
      }
    }

    .card66 {
      position: absolute;
      z-index: 999;
      right: 68px;
      top: 70px;
      margin-top: 10px;
      border-radius: 4px;
      width: 212px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
      .Triangle {
        position: absolute;
        top: -20px;
        right: 25px;
        z-index: 999;
        width: 10px;
        height: 10px;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(255, 255, 255, 1);
        border-left: 10px solid transparent;
      }
      p {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
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
