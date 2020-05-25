/**

* Created by wangxin

* @date 2019/8/19 11:36 绑定手机号

*/
<template>
  <TeaDiaBox :show="show" :callback="callback">
    <h3>解绑微信登录</h3>
    <div :class="inpBoxClass">
      <SelBox class="select" :selVal="selVal" :list="list"></SelBox>
      <input
        @focus="focus"
        v-bind:value="phoneNumber"
        @blur="blur"
        maxlength="11"
        type="text"
        placeholder="输入手机号"
        @input="phoneChange"
      />
      <i @click="delFun('phoneNumber')" v-show="getFocus=='error'" class="el-icon-error"></i>
    </div>
    <div class="ver-code clearfix">
      <div :class="checkCodeClass">
        <input maxlength="6" v-model="capNum" @input="capChange" placeholder="输入验证码" type="text" />
        <i @click="delFun('capNum')" class="el-icon-error"></i>
      </div>
      <a :class="checkBtnClass" @click="checkBtnCLick" href="javascript:;">{{checkBtnText}}</a>
    </div>
    <!--提交按钮 start-->
    <BtnBox style="margin-top:40px;margin-bottom:28px;" :signClick="signClick" :signBtn="signBtn"></BtnBox>
    <!--提交按钮 end-->
  </TeaDiaBox>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import SelBox from "../common/selBox";
import { cloneObj, tokenFun, tipsFail, loginSuccess } from "../../utils/utils";
import { getMobileCpaCode } from "../../service/mainApi";
import { mobCapCheCaptcha } from "../../service/teachersApi";
import { memberInfounbind } from "../../service/groupApi";
import TeaDiaBox from "../teachers/teaDiaBox";
import BtnBox from "./btnBox";
import LoginTab from "../home/loginTab";

@Component({
  name: "BindMobile",
  components: {
    SelBox,
    TeaDiaBox,
    BtnBox,
    LoginTab
  }
})
export default class BindMobile extends Vue {
  @Prop({
    default: false,
    required: false
  })
  show; //弹框显示隐藏

  // @Prop({
  //   default: "",
  //   required: false
  // })
  // wx; //弹框显示隐藏

  @Prop({
    default: null,
    required: false
  })
  mobileFun; //
  wx = 1;
  zfb = 2;
  phoneNumber = ""; //手机号码
  //区号值
  selVal = {
    val: "0086", //值
    label: "0086" //对应展示值
  };
  getFocus = false; //手机号密码框获取焦点 状态  false 'focus' 'error'
  //验证码按钮状态 gray初始化状态 submit 初次可点击状态  timer 计时器计数状态  grayAgain 重新发送验证码不可点击状态  submitAgain 重新发送验证码可点击状态
  checkBtnState = "gray";
  checkCode = false; //验证码输入框状态 true 错误提示显示 false 错误提示隐藏
  timer = null; //定时器
  checkBtnOne = true; //验证码按钮是否初次提交  true是 false不是
  serverCode = ""; //服务端获取的验证码
  timerNum = 0; //计时器时间
  capNum = ""; //用户输入的验证码
  signBtn = false; //登陆按钮点击事件  true 可点击  false 不可点击
  list = [
    {
      val: "86",
      label: "86"
    },
    {
      val: "886",
      label: "886"
    },
    {
      val: "852",
      label: "852"
    }
  ];

  //验证码输入框 样式class
  get checkCodeClass() {
    if (this.checkCode) {
      return "ver-box code-err";
    } else {
      return "ver-box";
    }
  }
  //弹框回调事件
  @Emit callback() {
    this.mobileFun("hide", false);
  }

  get inpBoxClass() {
    //手机输入框样式class
    if (this.getFocus === "focus") {
      return "input-box input-box-blur";
    } else if (this.getFocus === "error") {
      return "input-box input-box-error";
    } else {
      return "input-box";
    }
  }

  //验证码按钮是否可点击 true  false
  get capBtnDo() {
    let checkBtnState = this.checkBtnState;
    if (checkBtnState == "submit" || checkBtnState == "submitAgain") {
      return true;
    } else {
      return false;
    }
  }

  //获取验证码按钮class
  get checkBtnClass() {
    let checkBtnState = this.checkBtnState;
    if (this.capBtnDo) {
      return "get-code";
    } else {
      if (checkBtnState == "timer") {
        return "timer-show";
      }
      return "";
    }
  }

  //验证码按钮显示内容
  get checkBtnText() {
    let checkBtnState = this.checkBtnState;
    if (checkBtnState == "gray" || checkBtnState == "submit") {
      //初始化不可点击状态
      return "获取验证码";
    } else if (checkBtnState == "timer") {
      return this.timerNum + "s后重发";
    } else if (checkBtnState == "grayAgain" || checkBtnState == "submitAgain") {
      return "重新发送";
    }
  }

  //手机号输入框改变事件
  @Emit phoneChange(e) {
    let phoneNumber = e.target.value + "";
    this.phoneNumber = phoneNumber;
    this.phoneChaInit(); //改变 checkBtnState
    this.changeSubmit(); //改变提交按钮样式校验
  }

  @Emit phoneChaInit() {
    let phoneNumber = this.phoneNumber;
    if (this.getFocus != "focus") {
      this.getFocus = false;
    }
    if (this.checkBtnState != "timer") {
      if (this.checkBtnOne) {
        //是否初次发送验证码
        if (phoneNumber.length == 11) {
          this.checkBtnState = "submit";
        } else {
          this.checkBtnState = "gray";
        }
      } else {
        //不是首次发送验证码
        if (phoneNumber.length == 11) {
          this.checkBtnState = "submitAgain";
        } else {
          this.checkBtnState = "grayAgain";
        }
      }
    }
  }

  //区号选择回调
  @Emit cbFun(item) {
    this.selVal = cloneObj(item);
  }

  //手机号输入框获取焦点
  @Emit focus() {
    if (this.getFocus != "error") {
      this.getFocus = "focus";
    }
  }

  //手机号密码框失去焦点
  @Emit blur() {
    if (this.getFocus != "error") {
      this.getFocus = false;
    }
  }

  //验证码按钮点击事件
  @Emit checkBtnCLick() {
    let checkBtnState = this.checkBtnState;
    if (checkBtnState != "submit" && checkBtnState != "submitAgain") {
      return;
    }
    let tag = /^1([38][0-9]|4[0145678]|5[0-9]|6[2567]|7[0-8]|8[0-9]|9[189])\d{8}$/;
    let phoneNumber = this.phoneNumber + "";
    if (phoneNumber.length != 11 || !tag.test(phoneNumber)) {
      this.getFocus = "error";
      return;
    }
    //获取验证码接口
    getMobileCpaCode({ mobile: this.phoneNumber, areaCode: this.selVal.val })
      .then(res => {
        if (res.code == "0") {
          this.serverCode = res.captcha; //验证码
          this.checkBtnState = "timer"; //改变验证码按钮状态
          //启动计数定时器
          this.timerNum = 60;
          this.timer = this.timer = setInterval(this.setInt, 1000);
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //获取验证码后的定时器方法
  @Emit setInt() {
    if (this.timerNum > 0) {
      this.timerNum--;
    } else {
      clearInterval(this.timer);
      let phoneNumber = this.phoneNumber;
      this.checkBtnOne = false;
      if (phoneNumber.length == 11) {
        this.checkBtnState = "submitAgain";
      } else {
        this.checkBtnState = "grayAgain";
      }
    }
  }

  //验证码输入框改变事件
  @Emit capChange() {
    this.changeSubmit();
    if (this.checkCode) {
      this.checkCode = false;
    }
  }

  //改变提交按钮样式校验
  @Emit changeSubmit() {
    let capNum = this.capNum;
    let phoneNumber = this.phoneNumber;
    if (capNum.length == 6 && phoneNumber.length == 11) {
      this.signBtn = true;
    } else {
      this.signBtn = false;
    }
  }

  //x号点击事件
  @Emit delFun(name) {
    this[name] = "";
    if (name == "phoneNumber") {
      //手机号删除
      this.phoneChaInit(); //
      this.changeSubmit(); //
    } else {
      //验证码框删除
      this.signBtn = false;
      this.checkCode = false; //验证码提示信息移除
    }
  }

  //登录按钮点击事件
  @Emit signClick() {
    let phoneNumber = this.phoneNumber;
    let capNum = this.capNum;
    let val = this.selVal.val;
    let serverCode = this.serverCode;
    if (!this.signBtn) {
      return;
    }

    let check = false;
    let tag = /^1([38][0-9]|4[0145678]|5[0-9]|6[2567]|7[0-8]|8[0-9]|9[189])\d{8}$/;
    if (phoneNumber.length != 11 || !tag.test(phoneNumber)) {
      this.getFocus = "error";
      check = true;
      return;
    }
    //验证码校验
    /* if(capNum!=serverCode){
         this.checkCode=true;
         check=true;
       }*/
    if (check) {
      return false;
    }
    memberInfounbind({
      mobile: phoneNumber,
      captcha: capNum,
      areaCode: val,
      thirdPartyType: this.wx
    }).then(res => {
      if (res.code == "0") {
        this.show = false;
        // this.$router.go(0);
      } else {
        if (res.errorCode && res.errorCode == "MOBILE_CAPTCHA_NOT_MATCH") {
          this.checkCode = true;
        } else {
          tipsFail(res.msg);
        }
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@mixin bgC {
  background: #f7f7f7;
}
h3 {
  font-size: 22px;
  color: #333;
  font-weight: 600;
  text-align: center;
  margin-top: 35px;
}
.input-box {
  width: 100%;
  height: 52px;
  @include bgC;
  border-radius: 8px;
  margin-top: 23px;
  vertical-align: top;
  padding-left: 96px;
  position: relative;
  line-height: 52px;
  border: 1px solid rgba(204, 204, 204, 0);
  .select {
    position: absolute;
    top: 0;
    left: 0;
  }
  display: flex;
  align-items: center;
  input {
    width: 99%;
    height: 48px;
    padding: 0 13px;
    line-height: 48px;
    font-size: 18px;
    color: #333;
    border: none;
    border-radius: 8px;
    @include bgC;
  }
  i {
    position: absolute;
    right: 16px;
    top: 16px;
    color: #f56c6d;
    font-size: 20px;
    cursor: pointer;
  }
}

.input-box:hover {
  border: 1px solid rgba(254, 120, 101, 0.2);
}

.input-box.input-box-blur {
  background: #fff;
  border: 1px solid rgba(255, 163, 158, 1);
  box-shadow: 0px 0px 0px 2px rgba(254, 120, 101, 0.2);
  input {
    background: #fff;
  }
}
.input-box.input-box-error {
  background: #fff;
  border: 1px solid rgba(254, 120, 101, 1);
  input {
    background: #fff;
  }
}
.ver-code {
  font-size: 16px;
  margin-top: 22px;
  .ver-box {
    position: relative;
    float: left;
    width: 228px;
    height: 52px;
    line-height: 52px;
    margin-right: 14px;
    display: flex;
    align-items: center;
  }
  input {
    width: 228px;
    height: 52px;
    line-height: 52px;
    @include bgC;
    padding: 15px 52px 15px 24px;
    color: #333;
    border-radius: 8px;
    border: 1px solid rgba(254, 120, 101, 0);
  }
  i {
    display: none;
    position: absolute;
    right: 16px;
    top: 16px;
    color: #f56c6d;
    font-size: 20px;
    cursor: pointer;
  }
  input:hover {
    border: 1px solid rgba(254, 120, 101, 0.2);
  }
  input:focus {
    border: 1px solid rgba(255, 163, 158, 1);
    background: #fff;
  }
  .code-err {
    input {
      border: 1px solid rgba(254, 120, 101, 1);
      background: #fff;
    }
    i {
      display: block;
    }
  }

  a {
    float: left;
    width: 130px;
    height: 52px;
    border-radius: 8px;
    color: #999;
    font-size: 16px;
    @include bgC;
    text-align: center;
    line-height: 52px;
    border: 1px solid rgba(254, 120, 101, 0);
  }
  a:hover {
    border: 1px solid rgba(254, 120, 101, 0.2);
  }
  .get-code {
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    color: #fff;
  }
  .timer-show {
    color: #fe7865;
  }
}
</style>
