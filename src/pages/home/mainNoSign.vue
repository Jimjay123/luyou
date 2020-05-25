<template>
  <div class="page-item">
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
        <video
          width="100%"
          height="100%"
          autoplay="autoplay"
          loop="loop"
          muted="muted"
          src="https://video.luyouor.com/home/home.mp4"
          id="video"
          poster="../../assets/mainNoSign/video_bg2.png"
          class="video-h"
        ></video>
        <div class="mask"></div>
        <div class="video-info">
          <!-- <p class="p1">共建新时代</p>
          <p class="p1" style="margin-bottom:50px;">社会工作教育共同体</p>-->
          <p class="p1">共建新时代社会工作知识共同体</p>
          <p class="p2">聚合一线教学和实务专家，融合大数据智能反馈技术，共建实践教学优质内容知识资源库</p>
          <a class="login" href="javascript:;" @click="toLogin">登录/注册</a>
        </div>
        <p class="video-more">
          <i></i>滑动查看更多
        </p>
      </div>
      <div class="product">
        <div class="product-row pt51">
          <p class="our-p">product</p>
          <p class="our-n">我们的产品</p>
          <div class="fix-box">
            <ProductAll></ProductAll>
          </div>
        </div>

        <!--云数据智能反馈 start-->
        <ProductShowCard v-for="(item,index) in list" :key="index" :options="item"></ProductShowCard>
        <!--云数据智能反馈 end-->

        <div class="partner">
          <p class="p1">CUSTOMERS</p>
          <p class="p2">客户伙伴</p>
          <img src="../../assets/img/partner.svg" alt />
        </div>
      </div>
    </div>

    <!--footer start-->
    <Foot></Foot>
    <!--footer end-->
  </div>
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
  list = [
    {
      type: "left",
      title: "云数据智能反馈",
      info:
        "云服务器在线存储用户操作数据，即时生成智能反馈报告，通过科学计算，精确反馈学生得分、操作结果以及参考答案。",
      imgBig: require("../../assets/mainNoSign/clo-img.png"),
      imgSmall: require("../../assets/mainNoSign/clo-img-s.png"),
      top: "14",
      left: "-16"
    },
    {
      type: "right",
      title: "PGC专家共创",
      info:
        "遵循Professional Generated ，强调专家生产内容、专业生产内容，与业界知名专家学者深度合作，支持内容专业性与教育意义。",
      imgBig: require("../../assets/mainNoSign/pgc-big.png"),
      imgSmall: require("../../assets/mainNoSign/pgc-s.png"),
      top: "77",
      left: "104"
    },
    {
      type: "left",
      title: "电影级视频制作",
      info:
        "联合影视制作团队，遵循从前期策划、剧本创作、分镜头脚本、角色选定、拍摄到后期制作的专业流程，精细打磨呈现高品质案例视频。",
      imgBig: require("../../assets/mainNoSign/dy-big.png"),
      imgSmall: require("../../assets/mainNoSign/dy-s.png"),
      top: "103",
      left: "147"
    },
    {
      type: "right",
      title: "虚拟仿真实训",
      info:
        "软件将真实的一线实务场景嵌入系统，结合真实场景拍摄和虚拟仿真技术，让学生在模拟实验时更具场景感和真实感。",
      imgBig: require("../../assets/mainNoSign/xn-big.png"),
      imgSmall: require("../../assets/mainNoSign/xn-s.png"),
      top: "35",
      left: "9"
    },
    {
      type: "left",
      title: "多领域广覆盖",
      info:
        "产品涵盖多个领域的一线实务案例，包括医务、老年、青少年、社会救助、家庭、精神康复、社区矫治等，可满足学生多元化需求。",
      imgBig: require("../../assets/mainNoSign/dl-big.png"),
      imgSmall: require("../../assets/mainNoSign/dl-s.png"),
      top: "85",
      left: "102"
    }
  ];

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
}
</script>

<style lang="scss" scoped>
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
    .video-h {
      @include wh100;
      object-fit: cover;
      height: fill-available;
    }
    .mask{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background: #000;
      opacity:0.25;
    }
    .video-info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      text-align: center;
      .p1 {
        font-size: 48px;
        margin-bottom: 12px;
      }
      .p2 {
        font-size: 17px;
        margin-bottom: 57px;
      }
      .login {
        display: inline-block;
        width: 140px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 5px;
      }
    }
    .video-more {
      color: #fff;
      font-size: 16px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 22px;
      i {
        display: inline-block;
        width: 18px;
        height: 21px;
        background: url("../../assets/mainNoSign/cursor@2x.png") no-repeat;
        background-size: 100% auto;
        margin-right: 13px;
        vertical-align: middle;
      }
    }
  }

  .product {
    .our-p {
      font-size: 16px;
      color: #c7c7d3;
      text-align: center;
      width: 100%;
    }
    .our-n {
      font-size: 36px;
      color: #212128;
      text-align: center;
      margin-bottom: 130px;
      width: 100%;
    }
    .product-row {
      width: 100%;
      padding-top: 126px;
      padding-bottom: 149px;
    }
    .pt51 {
      padding-top: 51px;
    }
    .customer {
      padding-bottom: 47px;
      .our-p {
        font-size: 16px;
        font-weight: 600;
        color: rgba(199, 199, 211, 1);
        line-height: 19px;
        margin-bottom: 37px;
      }
      .our-n {
        font-size: 40px;
        font-weight: 600;
        color: rgba(33, 33, 40, 1);
        line-height: 48px;
      }
    }
  }
}

.flx-box {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 1200px;
  margin: 0 auto;
}

.customer-img {
  display: -webkit-box;
  width: 1090px;
  height: auto;
  margin: 0 auto;
  border: 1px dashed #eee;
}

.product-row {
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

.product-row:nth-child(2n) {
  background: rgba(250, 250, 250, 1);
}

.partner {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  .p1 {
    margin-top: 71px;
    font-size: 16px;
    font-family: SFProText;
    font-weight: 500;
    color: rgba(199, 199, 211, 1);
    letter-spacing: 2px;
  }
  .p2 {
    height: 48px;
    margin-top: 37px;
    font-size: 40px;
    font-family: PingFangSC;
    font-weight: 600;
    color: rgba(33, 33, 40, 1);
  }
  img {
    margin-top: 71px;
    margin-bottom: 48px;
  }
}
</style>
