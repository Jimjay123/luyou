<template>
  <LoginBox :show="show">
    <img src="../../assets/img/close.svg" alt @click="closeBtn" class="closeBtn" />
    <!--验证码登录 start-->
    <LoginTab :type="'password'"></LoginTab>
    <!--验证码登录 end-->

    <div :class="inpBoxClass">
      <!-- <SelBox class="select" :selVal="selVal" :list="list"></SelBox> -->
      <div class="select">
        <img src="../../assets/img/right-arrow.svg" alt class="right_arrow" />0086
      </div>
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
      <div :class="passWordClass">
        <form action style="width:100%">
          <input
            maxlength="16"
            v-model="passWord"
            @input="passWordChange"
            placeholder="输入密码"
            type="password"
            autocomplete="off"
          />
        </form>
        <i @click="delFun('passWord')" class="el-icon-error"></i>
      </div>
    </div>

    <!--记住密码 start-->
    <div class="remember">
      <el-checkbox v-model="remChecked">记住密码</el-checkbox>
      <div class="forget">
        忘记密码了？
        <span @click="recPassword">去找回</span>
      </div>
    </div>
    <!--记住密码 end-->

    <!--提交按钮 start-->
    <BtnBox style="margin-top:21px;" :signClick="signClick" :signBtn="signBtn"></BtnBox>
    <!--提交按钮 end-->

    <!--第三方登陆 start-->
    <LoginThree></LoginThree>
    <!--第三方登陆 end-->
  </LoginBox>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import SelBox from "../common/selBox";
import {
  cloneObj,
  tokenFun,
  tipsFail,
  loginSuccess,
  memberidFun
} from "../../utils/utils";
import { putMemMobPassword } from "../../service/mainApi";
import LoginBox from "./loginBox";
import BtnBox from "./btnBox";
import LoginTab from "./loginTab";
import LoginThree from "./loginThree";

@Component({
  name: "PasLogin",
  components: {
    SelBox,
    LoginBox,
    BtnBox,
    LoginTab,
    LoginThree
  }
})
export default class PasLogin extends Vue {
  show = true;
  phoneNumber = ""; //手机号码
  //区号值
  selVal = {
    val: "86", //值
    label: "86" //对应展示值
  };
  getFocus = false; //手机号密码框获取焦点 状态  false 'focus' 'error'
  passWord = ""; //密码框输入内容
  passWordTips = false; //密码框错误信息提示  true 显示  false 不显示
  signBtn = false; //登陆按钮点击事件  true 可点击  false 不可点击
  // list = [
  //   {
  //     val: "86",
  //     label: "86"
  //   },
  //   {
  //     val: "886",
  //     label: "886"
  //   },
  //   {
  //     val: "852",
  //     label: "852"
  //   }
  // ];
  remChecked = false; //记住密码 状态  true 记住密码 false 不记住密码

  //手机号码输入框样式class
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

  //密码输入框 样式class
  get passWordClass() {
    if (this.passWordTips) {
      return "ver-box code-err";
    } else {
      return "ver-box";
    }
  }

  //手机号输入框改变事件
  @Emit phoneChange(e) {
    let phoneNumber = e.target.value + "";
    this.phoneNumber = phoneNumber;
    if (this.getFocus != "focus") {
      this.getFocus = false;
    }
    this.phoneChaInit(); //改变 signBtn
  }

  @Emit phoneChaInit() {
    let phoneNumber = this.phoneNumber + "";
    let password = this.passWord + "";
    if (
      phoneNumber.length == 11 &&
      password.length >= 6 &&
      password.length <= 16
    ) {
      this.signBtn = true;
    } else {
      this.signBtn = false;
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

  //密码输入框改变事件
  @Emit passWordChange() {
    if (this.passWordTips) {
      this.passWordTips = false;
    }
    this.phoneChaInit(); //改变 signBtn
  }

  //x号点击事件
  @Emit delFun(name) {
    this[name] = "";
    if (name == "phoneNumber") {
      //手机号删除
      this.phoneNumber = "";
      this.getFocus = false;
    } else {
      //验证码框删除
      this.passWord = "";
      this.passWordTips = false;
    }
    this.signBtn = false;
  }

  //找回密码点击事件
  @Emit recPassword() {
    this.$router.push({
      path: "/main/forget"
    });
  }
  // 关闭登录框按钮
  @Emit
  closeBtn() {
    console.log(111);
    this.$router.push({
      path: "/main"
    });
  }

  //登录按钮点击事件
  @Emit signClick() {
    let phoneNumber = this.phoneNumber;
    let password = this.passWord;
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
    let pasTag = /^[0-9A-Za-z]{6,16}$/;
    if (!pasTag.test(password)) {
      this.passWordTips = true;
      check = true;
    }
    if (check) {
      return false;
    }
    let remChecked = this.remChecked;
    //密码登陆接口
    putMemMobPassword({
      areaCode: val,
      mobile: phoneNumber,
      password
    })
      .then(res => {
        if (res.code == "0") {
          if (remChecked) {
            //登录成功后缓存密码
            localStorage.setItem("mobilePhone", this.phoneNumber);
            localStorage.setItem("password", this.passWord);
          }
          tokenFun(res.token); //设置token缓存
          memberidFun(res.memberId); //设置token缓存
          let state = res.identifiedRoleType; //当前登录成功的人的认证状态
          loginSuccess(state, this);
        } else {
          if (res.errorCode && res.errorCode == "PASSWORD_NOT_MATCH") {
            //密码错误
            this.passWordTips = true;
          } else {
            tipsFail(res.msg);
          }
        }
      })
      .catch(err => {
        //登录失败
        if (1) {
          //手机号错误
          this.getFocus = "error";
        } else if (2) {
          //密码错误
          this.passWordTips = true;
        } else {
          //弹框提示后台错误信息
        }
      });
  }

  created() {
    //初始化
    let userName = localStorage.getItem("mobilePhone");
    if (userName) {
      this.phoneNumber = userName;
      this.passWord = localStorage.getItem("password");
      this.phoneChaInit(); //改变 signBtn
    }
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
    width: 100%;
    height: 52px;
    line-height: 52px;
    margin-right: 14px;
    display: flex;
    align-items: center;
  }
  input {
    width: 100%;
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
    box-shadow: 0px 0px 0px 2px rgba(254, 120, 101, 0.2);
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
}

.remember {
  margin-top: 10px;
  font-size: 13px;
  color: rgba(153, 153, 153, 1);
  height: 18px;
  line-height: 18px;
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
</style>
