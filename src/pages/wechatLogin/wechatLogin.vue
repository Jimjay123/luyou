<template>
  <LoginBox :show="showc" :callback="callback" class="clearfix">
    <!-- <LogThrClose></LogThrClose> -->
    <i @click="closeBtn" class="close"></i>
    <!--<LogThrTitle style="font-weight: 500;" :title="'微信扫码登录'"></LogThrTitle>-->
    <!--二维码 start-->
    <WxLogin
      class="sweep-code"
      :appid="app_id"
      :scope="scope"
      :state="'bind-'+ memberId "
      :redirect_uri="redirect_uri"
      href
      style="margin-top:30px;text-align: center"
    ></WxLogin>
    <!--二维码 end-->
    <!-- <LogThrExplain :explain="explain"></LogThrExplain>-->
    <LogThrFooter style="margin-top:0;" :type="'wechat'"></LogThrFooter>
  </LoginBox>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import LoginBox from "./loginBox";
import LogThrTitle from "./logThrTitle";
import LogThrFooter from "./logThrFooter";
import LogThrExplain from "./logThrExplain";
import WxLogin from "vue-wxlogin";
import { wechatAppInfo } from "../../service/index";
import { memberInfobindInfo } from "../../service/groupApi";
import { tipsFail } from "../../utils/utils";

@Component({
  name: "wechatLogin",
  components: {
    LoginBox,
    LogThrTitle,
    LogThrFooter,
    LogThrExplain,
    // LogThrClose,
    WxLogin
  }
})
export default class WechatLogin extends Vue {
  showc = false; //弹框显示隐藏  true显示  false隐藏
  explain = "请使用微信扫描二维码登录";
  app_id = ""; //
  scope = "snsapi_login"; //
  redirect_uri = ""; //

  @Prop({
    default: false,
    required: false
  })
  showc; //弹框显示隐藏

  @Prop({
    default: null,
    required: false
  })
  mobileFun; //

  //扫码成功回调
  @Emit wxCallback() {
    console.log("微信回调触发");
  }

  @Emit closeBtn(val) {
    this.mobileFun("hide", false);
    this.capNum = "";
    this.originMobile = "";
  }

  //弹框回调事件
  @Emit callback() {
    this.mobileFun("hide", false);
  }

  memberId = "";

  created() {
    //获取微信公参
    wechatAppInfo().then(res => {
      if (res.code == 0) {
        let data = res.data;
        this.app_id = data.appId;
        this.redirect_uri = encodeURIComponent(data.redirectUrl);
      } else {
        tipsFail(res.msg);
      }
    });
    memberInfobindInfo().then(res => {
      if (res.code == 0) {
        this.memberId = res.data.memberId;
      } else {
        tipsFail(res.msg);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.sweep-code {
  margin: 0 auto;
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  background: url("../../assets/home/close.png") no-repeat;
  background-size: 100% auto;
  cursor: pointer;
}
</style>
