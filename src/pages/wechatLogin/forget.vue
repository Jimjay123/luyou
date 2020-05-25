<template>
  <LoginBox :show="show">
    <img src="../../assets/img/close.svg" alt @click="closeBtn" class="closeBtn" />
    <p class="title" style="font-weight: 500;">找回密码</p>

    <!--手机号输入框 start-->
    <div :class="inpBoxClass">
      <!-- <SelBox class="select" :selVal="selVal" :list="list"></SelBox>
      -->
      <div class="select">
        <img src="../../assets/img/right-arrow.svg" alt class="right_arrow" />0086
      </div>
      <input
        @focus="focus"
        v-bind:value="phoneNumber"
        @blur="blur"
        maxlength="11"
        type="text"
        placeholder="输入手机号（新用户自动注册）"
        @input="phoneChange"
      />
      <i @click="delFun('phoneNumber')" v-show="getFocus=='error'" class="el-icon-error"></i>
    </div>
    <!--手机号输入框 end-->

    <!--验证码输入框  start-->
    <div class="ver-code clearfix">
      <div :class="checkCodeClass">
        <input maxlength="6" v-model="capNum" @input="capChange" placeholder="输入验证码" type="text" />
        <i @click="delFun('capNum')" class="el-icon-error"></i>
      </div>
      <a :class="checkBtnClass" @click="checkBtnCLick" href="javascript:;">{{checkBtnText}}</a>
    </div>
    <!--验证码输入框  end-->
    <div class="remember">
      <!-- <el-checkbox v-model="remChecked">记住密码</el-checkbox> -->
      <div class="forget">
        不找回了？
        <span @click="recPassword">去登录</span>
      </div>
    </div>

    <!--提交按钮 start-->
    <BtnBox
      :signClick="signClick"
      :signBtn="signBtn"
      :btnText="'确定'"
      class="btnBox"
      style="margin-top: 22px;"
    ></BtnBox>
    <!--提交按钮 end-->

    <!--第三方登陆 start-->
    <LoginThree></LoginThree>
    <!--第三方登陆 end-->
  </LoginBox>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import LoginTab from "./loginTab";
import SelBox from "../common/selBox";
import LoginBox from "./loginBox";
import BtnBox from "./btnBox";
import LoginThree from "./loginThree";
import { getMobileCpaCode, getMemLogMobCap } from "../../service/mainApi";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";

@Component({
  name: "forget",
  components: {
    LoginTab,
    BtnBox,
    LoginThree,
    LoginBox,
    SelBox
  }
})
export default class Forget extends Vue {
  show = true;
  phoneNumber = ""; //手机号码
  //区号值
  selVal = {
    val: "86", //值
    label: "86" //对应展示值
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
  // // 关闭登录框按钮
  @Emit
  closeBtn() {
    console.log(111);
    this.$router.push({
      path: "/main"
    });
  }
  //手机号输入框改变事件
  @Emit phoneChange(e) {
    let phoneNumber = e.target.value + "";
    this.phoneNumber = phoneNumber;
    this.phoneChaInit(); //改变 checkBtnState
    this.changeSubmit(); //输入框改变时 修正提交按钮样式
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

  //找回密码点击事件
  @Emit recPassword() {
    this.$router.push({
      path: "/main/login"
    });
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
        this.serverCode = res.captcha; //验证码
        this.checkBtnState = "timer"; //改变验证码按钮状态
        //启动计数定时器
        this.timerNum = 60;
        this.timer = this.timer = setInterval(this.setInt, 1000);
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
    this.changeSubmit(); //验证码输入框改变时 修正提交按钮样式
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
      this.changeSubmit();
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
    //验证码对比--放弃
    /*if(capNum!=serverCode){
        this.checkCode=true;
        check=true;
      }*/
    if (check) {
      return false;
    }
    getMemLogMobCap({
      mobile: phoneNumber,
      captcha: capNum,
      areaCode: val
    })
      .then(res => {
        if (res.code == "0") {
          //登录成功 跳转页面
          tokenFun(res.token); //设置token缓存
          sessionStorage.setItem('loginRoleStatus',res.identifiedRoleType);
          //登录成功 跳转页面
          this.$router.push({
            path: "/main/resetPassword"
          });
        } else {
          if (res.errorCode && res.errorCode == "MOBILE_CAPTCHA_NOT_MATCH") {
            this.checkCode = true;
          } else {
            tipsFail(res.msg);
          }
        }
      })
      .catch(err => {});
  }
}
</script>

<style lang="scss" scoped>
@mixin bgC {
  background: #f7f7f7;
}
.closeBtn {
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
}
.title {
  color: #333;
  font-size: 22px;
  font-weight: 600;
  padding-top: 35px;
  margin-bottom: 35px;
  text-align: center;
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
    top: 0px;
    left: 24px;
    font-size: 18px;
    color: #666666;
    .right_arrow {
      position: absolute;
      left: 58px;
      top: 20px;
    }
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
  input::-webkit-input-placeholder {
    /* 字体大小直接写样式即可 */
    font-size: 16px;

    color: rgba(153, 153, 153, 1);
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
  input::-webkit-input-placeholder {
    /* 字体大小直接写样式即可 */
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
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
  // a:hover {
  //   border: 1px solid rgba(254, 120, 101, 0.2);
  // }
  .get-code {
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    color: #fff;
    width: 130px;
    height: 52px;
    border-radius: 8px;
    border: none;
  }
  .timer-show {
    color: #fe7865;
  }
}
.remember {
  margin-top: 10px;
  font-size: 13px;
  color: rgba(153, 153, 153, 1);
  height: 22px;
  line-height: 22px;
  .forget {
    float: right;
    span {
      color: #fe7865;
      cursor: pointer;
    }
  }
}
.remember /deep/ .el-checkbox__label {
  color: rgba(153, 153, 153, 1);
}
.remember /deep/ .el-checkbox__input .el-checkbox__inner {
  border-color: #ccc;
}
.remember /deep/ .is-checked .el-checkbox__inner {
  background: rgba(254, 120, 101, 1);
  border-color: rgba(254, 120, 101, 1);
}
.btn-box {
  margin-top: 22px;
}
</style>
