<template>
  <LoginBox :show="show" class="clearfix">
    <LogThrClose></LogThrClose>
    <!--<LogThrTitle style="font-weight: 500;" :title="'微信扫码登录'"></LogThrTitle>-->
    <!--二维码 start-->
    <WxLogin
      v-if="app_id!==''"
      class="sweep-code"
      :appid="app_id"
      :scope="scope"
      :state="'login'"
      :redirect_uri="redirect_uri"
      href=""
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
import LogThrClose from "./logThrClose";
import WxLogin from "vue-wxlogin";
import {wechatAppInfo} from '../../service/index';
import {tipsFail} from '../../utils/utils';

@Component({
  name: "wechatLogin",
  components: {
    LoginBox,
    LogThrTitle,
    LogThrFooter,
    LogThrExplain,
    LogThrClose,
    WxLogin
  }
})
@Component({
  name: "wechatLogin",
  components: {
    LoginBox,
    LogThrTitle,
    LogThrFooter,
    LogThrExplain,
    LogThrClose,
    WxLogin
  }
})
export default class WechatLogin extends Vue {
  show = true; //弹框显示隐藏  true显示  false隐藏
  explain = "请使用微信扫描二维码登录";
  app_id = ""; //
  scope = "snsapi_login"; //
  redirect_uri = ""; //
  //扫码成功回调
  @Emit wxCallback() {
    console.log('微信回调触发');
  }

  created() {
    //获取微信公参
    wechatAppInfo().then(res=>{
      if(res.code==0){
        let data=res.data;
        this.app_id=data.appId;
        this.redirect_uri=encodeURIComponent(data.redirectUrl);
      }else{
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
</style>
