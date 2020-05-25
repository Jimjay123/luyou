<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-08-29 13:19:25
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-11-21 13:30:43
 -->
<template>
  <a class="page-item">
    <router-view />
    <MainHead />
    <div class="site-header">
      <a href="javascript:;" class="site-logo">
        <img :src="require('@/assets/Header_drak_icon.svg')" alt />
      </a>
      <div class="site-nav" @click="toLogin">
        <a href="javascript:;">登录</a>/
        <a href="javascript:;">注册</a>
      </div>
    </div>
    <div class="page-container">
      <div class="video-box">
        <img class="topImg" src="../../assets/aboutsth/s10.jpg" alt />
        <!-- <video
          width="100%"
          height="100%"
          autoplay="autoplay"
          loop="loop"
          muted="muted"
          src=""
          id="video"
          poster="../../assets/mainNoSign/video_bg2.png"
          class="video-h"
        ></video>-->
        <div class="mask"></div>
        <div class="video-info">
          <!-- <p class="p1">共建新时代</p>
          <p class="p1" style="margin-bottom:50px;">社会工作教育共同体</p>-->
          <p class="p1">关于</p>
          <div class="aboutBgBox">
            <span @click="goHomePage" style="cursor: pointer;">首页</span>
            <span>/</span>
            <span>关于</span>
          </div>
          <!-- <p class="p2">聚合一线教学和实务专家，融合大数据智能反馈技术，共建实践教学优质内容知识资源库</p> -->
          <!-- <a class="login" href="javascript:;" @click="toLogin">登录/注册</a> -->
        </div>
        <!-- <p class="video-more">
          <i></i>滑动查看更多
        </p>-->
      </div>
      <div class="product">
        <div class="product-row pt51">
          <div style="text-align:center">
            <h3 class="introWord">公司简介</h3>
            <img class="bigLogo" src="../../assets/aboutsth/logo-big.png" alt />
          </div>
          <!-- <p class="our-p">product</p> -->
          <!-- <p class="our-n">我们的产品</p> -->
          <!-- <div class="fix-box">
            <ProductAll></ProductAll>
          </div>-->
          <div class="introMain">
            <div>
              陆由是上海积途信息科技有限公司（以下简称“我们”）旗下专业的面向高等教育的新型在线教育教学品牌。我们致力于持续提升高等教育实践教学和学习的效率，成为中国领先的教育科技公司。
            </div>
            <div>
              我们已于2019年2月11日完成了对上海踏瑞计算机软件有限公司（简称“踏瑞软件”）社会工作专业线产品线的全资收购。收购后，在原产品的基础上，我们重新定义、设计、开发了全新一代SaaS云数据智能反馈平台——陆由云。
            </div>
            <div>
              通过经营陆由云平台，我们向高校提供兼具多元化和个性化，具备虚拟仿真实训和云数据智能反馈特质的优秀互联网教育产品及服务，并以此展示了我们对前沿互联网技术和教育行业的透彻理解。自我们开创社会工作专业教学软件以来，我们成功地开发和重新定义了众多的技术工具及媒介，支持高等教育实践和实验教学的体验向云端大数据教学、虚拟仿真实训教学、精细化视频教学、轻松快乐学习、实训结合实践项目应用的角度不断深化。我们正在持续构建庞大的高等教育实践教学与学习用户行为数据库。
            </div>
            <div>
              目前，我们聚焦于社会工作专业虚拟仿真实训和云数据智能反馈教学，依托国内外顶级师资力量与教学资源，拥有中国先进的教学内容开发与制作团队，致力于为高校老师和大学生提供个性化、互动化、智能化的卓越在线教学与学习的体验。公司已经推出“陆由云虚拟仿真智能大数据平台（社会工作专业版）”、陆由社会工作虚拟社区divTM平台软件、陆由社区治理虚拟仿真平台软件、陆由个案工作云数据智能反馈平台软件、陆由小组工作云数据智能反馈平台软件、陆由社会工作教学资源云平台软件、陆由社会工作专业考试资源云平台软件等一系列产品。目前，陆由已经累计服务50多个城市、100多所大学、300余位老师、100000余名大学生。
            </div>
            <div>
              在此基础上，我们通过持续投资升级和创新自有的大数据分析技术和相关分析模型，不断成功推出能够方便老师教学、提高学生学习专注度，孕育卓越教学和学习成果的互联网教育产品和服务。
            </div>
          </div>
        </div>

        <!-- 使命 start -->
        <div class="missionStart">
          <div class="missionContainer">
            <div class="missionTitle">使命愿景价值观</div>
            <div class="missionRow">
              <div class="rowItem col-md-4">
                <img src="../../assets/aboutsth/icon-1.png" alt="" />
                <p class="smallTitle">使命</p>
                <p class="smallMain">以科技提升教育及学习的效率</p>
              </div>
              <div class="rowItem col-md-4">
                <img src="../../assets/aboutsth/icon-2.png" alt="" />
                <p class="smallTitle">愿景</p>
                <p class="smallMain">
                  以前瞻性的技术和模式聚合优质教育资源，助力教育成功，成为行业领先的教育科技公司。
                </p>
              </div>
              <div class="rowItem col-md-4">
                <img src="../../assets/aboutsth/icon-3.png" alt="" />
                <p class="smallTitle">价值观</p>
                <p class="smallMain">
                  专注极致、谦卑进取<br />尚德尊才、开放共赢
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 使命 end -->

        <!--云数据智能反馈 start-->
        <!-- <ProductShowCard v-for="(item,index) in list" :key="index" :options="item"></ProductShowCard> -->
        <!--云数据智能反馈 end-->

        <div class="partner">
          <h3>组织架构</h3>
          <img src="../../assets/aboutsth/zz.svg" alt />
        </div>
      </div>
    </div>

    <!--footer start-->
    <Foot></Foot>
    <!--footer end-->

    <!-- goTop start -->
    <div class="goTop">
      <i>^</i>
    </div>
    <!-- goTop end -->
  </a>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import ProductAll from "../../components/home/mainNoSign/productAll";
import Foot from "@/pages/index/footer";
import ProductShowCard from "../../components/home/mainNoSign/ProductShowCard";
import MainHead from "@/pages/home/topHeader";

@Component({
  name: "mainNoSign",
  components: {
    ProductAll,
    Foot,
    ProductShowCard,
    MainHead
  }
})
export default class MainNoSign extends Vue {
  diaOptions = {
    show: true, //true 显示  false隐藏 默认false
    title: null, //头部信息 默认 提示
    btn1: true, //按钮1 默认显示 true
    btn2: true, //按钮2 默认确定
    btn1Text: "取消", //按钮1 显示文字
    btn2Text: "确定", //按钮2 显示文字
    btn1Cb: null, //按钮1回调方法
    btn2Cb: null, //按钮2回调方法
    closeBtn: true, //关闭按钮是否显示 默认显示
    closeCb: null //关闭按钮回调方法
  };

  @Emit toLogin() {
    this.$router.push({
      path: "/main/login"
    });
  }
  @Emit goHomePage() {
    this.$router.push({
      path: "/main"
    });
  }
}
</script>

<style lang="less" scoped>
@mixin wh100 {
  width: 100%;
  height: 100%;
}

@mixin proInfo() {
  width: 443px;
  .p-t {
    height: 45px;
    font-size: 36px;
    font-weight: 600;
    color: rgba(11, 22, 43, 1);
    line-height: 45px;
    margin-bottom: 8px;
  }
  .p-icon {
    width: 33px;
    height: 6px;
    background: rgba(254, 120, 101, 1);
    border-radius: 5px;
    margin-bottom: 45px;
  }
  .p-con {
    width: 443px;
    height: 45px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(11, 22, 43, 1);
    line-height: 23px;
  }
}

.page-item {
  overflow-x: hidden;
  overflow-y: hidden;
  min-width: 1200px;
}

.site-header {
  height: 50px;
  line-height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: auto;
  right: 0;
  text-align: center;
  z-index: 100;
  background: 0 0;
  border-bottom: none;
  .site-logo {
    float: left;
    margin-left: 40px;
  }
  .site-nav {
    float: right;
    max-width: 27%;
    color: #fff;
    margin-right: 40px;
    a {
      color: #ffffff;
      font-size: 16px;
    }
  }
}

.page-container {
  height: 100%;
  min-height: 70%;
  .video-box {
    @include wh100;
    overflow: hidden;
    position: relative;
    .topImg {
      width: 100%;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.4);
      // opacity: 0.25;
    }
    .video-info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      text-align: center;
      .p1 {
        font-size: 66px;
        margin-top: 0px;
        margin-bottom: 40px;
        font-weight: 200;
        line-height: 1.1;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC";
        margin-bottom: 12px;
        color: #3a3848d1;
      }
      .aboutBgBox {
        background: rgba(255, 255, 255, 0.9);
        padding: 6px 8px;
        display: inline-block;
        color: #323232;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 3px;
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        -o-border-radius: 3px;
        span {
          color: #32353e;
          line-height: 25px;
          font-weight: 200;
          font-size: 16px;
          font-family: "Microsoft";
          display: inline-block;
          padding-left: 8px;
          padding-right: 8px;
        }
      }
    }
  }
}
.product {
  margin-top: 80px;
}

.product-row {
  margin-bottom: 80px;
  .introWord {
    font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
      "Heiti SC", "WenQuanYi Micro Hei";
    font-size: 37px;
    color: #32353e;
    font-weight: 300;
    text-align: center;
  }
  .bigLogo {
    width: 270px;
    height: 93px;
    margin: 0 auto;
    margin-top: 50px;
  }
  .introMain {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    div {
      text-indent: 2em;
      color: #32353e;
      line-height: 25px;
      font-weight: 200;
      font-size: 16px;
      font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
        "Heiti SC", "WenQuanYi Micro Hei";
    }
  }

  @media (min-width: 576px) {
    .introMain {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .introMain {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .introMain {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .introMain {
      max-width: 1140px;
    }
  }

  .left {
    width: 390px;
    height: 302px;
    float: left;
    position: relative;
    margin-right: 161px;
    .clo-img {
      width: 390px;
      height: 302px;
    }
    .clo-img-s {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .right {
    float: right;
    position: relative;
  }
  .product-info {
    @include proInfo;
  }
}
.missionStart {
  background-color: #f4f4f4;
  padding: 80px 0;
  // .missionContainer {
  //   visibility: visible;
  //   width: 100%;
  //   padding-right: 15px;
  //   padding-left: 15px;
  //   margin-right: auto;
  //   margin-left: auto;
  //   .missionTitle {
  //     font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
  //       "Heiti SC", "WenQuanYi Micro Hei";
  //     font-size: 37px;
  //     color: #32353e;
  //     font-weight: 300;
  //     text-align: center;
  //     margin-bottom: 60px;
  //   }
  //   .missionRow {
  //     display: flex;
  //     -ms-flex-wrap: wrap;
  //     flex-wrap: wrap;
  //     margin-right: -15px;
  //     margin-left: -15px;
  //   }
  //   .rowItem {
  //     flex: 1;
  //     text-align: center;
  //     img {
  //       // width: 100%;
  //     }
  //     .smallTitle {
  //       color: #323232;
  //       font-weight: 400;
  //       font-size: 16px;
  //       margin-bottom: 10px;
  //       margin-top: 20px;
  //       font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
  //         "Heiti SC", "WenQuanYi Micro Hei";
  //     }
  //     .smallMain {
  //       color: #32353e;
  //       line-height: 25px;
  //       font-weight: 200;
  //       font-size: 16px;
  //       font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
  //         "Heiti SC", "WenQuanYi Micro Hei";
  //     }
  //   }
  // }
  @media (max-width: 576px) {
    .missionContainer {
      width: 540px;
    }
    .missionRow {
      // display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
    }
    .rowItem {
      // flex: 1;
      text-align: center;
      margin-bottom: 10px;
      img {
        // width: 100%;
      }
      .smallTitle {
        color: #323232;
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 10px;
        margin-top: 20px;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC", "WenQuanYi Micro Hei";
      }
      .smallMain {
        color: #32353e;
        line-height: 25px;
        font-weight: 200;
        font-size: 16px;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC", "WenQuanYi Micro Hei";
      }
    }
  }
  @media (min-width: 576px) {
    .missionContainer {
      width: 540px;
    }
    .missionContainer {
    visibility: visible;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    .missionTitle {
      font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
        "Heiti SC", "WenQuanYi Micro Hei";
      font-size: 37px;
      color: #32353e;
      font-weight: 300;
      text-align: center;
      margin-bottom: 60px;
    }
    .missionRow {
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
    }
    .rowItem {
      flex: 1;
      text-align: center;
      img {
        // width: 100%;
      }
      .smallTitle {
        color: #323232;
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 10px;
        margin-top: 20px;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC", "WenQuanYi Micro Hei";
      }
      .smallMain {
        color: #32353e;
        line-height: 25px;
        font-weight: 200;
        font-size: 16px;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC", "WenQuanYi Micro Hei";
      }
    }
  }
  }
  @media (min-width: 768px) {
    .missionContainer {
      width: 720px;
    }
    .missionContainer {
    visibility: visible;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    .missionTitle {
      font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
        "Heiti SC", "WenQuanYi Micro Hei";
      font-size: 37px;
      color: #32353e;
      font-weight: 300;
      text-align: center;
      margin-bottom: 60px;
    }
    .missionRow {
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
    }
    .rowItem {
      flex: 1;
      text-align: center;
      img {
        // width: 100%;
      }
      .smallTitle {
        color: #323232;
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 10px;
        margin-top: 20px;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC", "WenQuanYi Micro Hei";
      }
      .smallMain {
        color: #32353e;
        line-height: 25px;
        font-weight: 200;
        font-size: 16px;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC", "WenQuanYi Micro Hei";
      }
    }
  }
  }
  @media (min-width: 992px) {
    .missionContainer {
      width: 960px;
    }
    .missionContainer {
    visibility: visible;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    .missionTitle {
      font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
        "Heiti SC", "WenQuanYi Micro Hei";
      font-size: 37px;
      color: #32353e;
      font-weight: 300;
      text-align: center;
      margin-bottom: 60px;
    }
    .missionRow {
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
    }
    .rowItem {
      flex: 1;
      text-align: center;
      img {
        // width: 100%;
      }
      .smallTitle {
        color: #323232;
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 10px;
        margin-top: 20px;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC", "WenQuanYi Micro Hei";
      }
      .smallMain {
        color: #32353e;
        line-height: 25px;
        font-weight: 200;
        font-size: 16px;
        font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
          "Heiti SC", "WenQuanYi Micro Hei";
      }
    }
  }
  }
}

.partner {
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  text-align: center;
  h3 {
    font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
      "Heiti SC";
    font-size: 37px;
    color: #32353e;
    font-weight: 300;
  }
  img {
    width: 95%;
    margin-top: 71px;
    margin-bottom: 48px;
  }
}
.goTop {
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-align: center;
  font-size: 20px;
  background: #323232;
  background: #555;
  color: #fff;
  z-index: 99;
  display: none;
  transition: none;
  -o-transition: none;
  -moz-transition: none;
  -webkit-transition: none;
}
</style>
