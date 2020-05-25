<template>
  <LoginBox :show="show">
    <img src="../../assets/img/close.svg" alt @click="closeBtn" class="closeBtn" />
    <p class="title">设置新密码</p>

    <!--输入新密码 start-->
    <div class="ver-code clearfix">
      <div :class="newPasWordClass">
        <form action style="width:100%">
          <input
            maxlength="16"
            v-model="newPasWord"
            @input="newPasWordFun"
            placeholder="设置新密码（6-16位字符）"
            type="password"
          />
        </form>
        <i @click="delFun('newPasWord')" class="el-icon-error"></i>
      </div>
    </div>
    <!--输入新密码 end-->

    <!--确认密码 start-->
    <div class="ver-code clearfix">
      <div :class="conPasWordClass">
        <form action style="width:100%">
          <input
            maxlength="16"
            v-model="conPasWord"
            @input="conPasWordFun"
            placeholder="确认新密码（6-16位字符）"
            type="password"
            autocomplete="off"
          />
        </form>
        <i @click="delFun('conPasWord')" class="el-icon-error"></i>
      </div>
    </div>
    <!--确认密码 end-->

    <div class="to-login">
      不找回了？
      <span @click="toLogin">去登录</span>
    </div>

    <!--提交按钮 start-->
    <BtnBox
      style="margin-top:22px;font-size: 20px;"
      :signClick="signClick"
      :signBtn="signBtn"
      :btnText="'确定并登录'"
    ></BtnBox>
    <!--提交按钮 end-->

    <!--第三方登陆 start-->
    <LoginThree></LoginThree>
    <!--第三方登陆 end-->
  </LoginBox>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import LoginBox from "./loginBox";
import BtnBox from "./btnBox";
import LoginThree from "./loginThree";
import { resetPasswordMemberInfo } from "../../service/mainApi";
import {
  cloneObj,
  tokenFun,
  tipsFail,
  loginSuccess,
  memberidFun
} from "../../utils/utils";

@Component({
  name: "ResetPassword",
  components: {
    BtnBox,
    LoginThree,
    LoginBox
  }
})
export default class ResetPassword extends Vue {
  show = true;

  newPasWord = ""; //新密码
  newPasWordTips = ""; //新密码提示信息 true 显示 false 不显示
  conPasWord = ""; //确认密码
  conPasWordTips = ""; //确认密码

  signBtn = false; //登陆按钮点击事件  true 可点击  false 不可点击

  //新密码class样式
  get newPasWordClass() {
    return this.setClass(this.newPasWordTips);
  }

  //确认密码class样式
  get conPasWordClass() {
    return this.setClass(this.conPasWordTips);
  }

  @Emit setClass(val) {
    if (val) {
      return "ver-box code-err";
    } else {
      return "ver-box";
    }
  }

  //新密码输入框改变事件
  @Emit newPasWordFun() {
    this.newPasWordTips = false;
    this.signBtnCheck();
  }

  //确认密码输入框改变事件
  @Emit conPasWordFun() {
    this.conPasWordTips = false;
    this.signBtnCheck();
  }

  //确定按钮校验方法
  @Emit signBtnCheck() {
    if (
      this.passwordLength(this.newPasWord) &&
      this.passwordLength(this.conPasWord)
    ) {
      this.signBtn = true;
    }
  }

  //密码长度规则校验方法
  @Emit passwordLength(val) {
    val = val + "";
    if (val.length >= 6 && val.length <= 16) {
      return true;
    }
    return false;
  }

  //密码正则校验 数字大小写字符
  @Emit passwordRule(val) {
    let reg = /^[0-9A-Za-z]{6,16}$/;
    if (reg.test(val)) {
      return true;
    }
    return false;
  }

  //x号点击事件
  @Emit delFun(name) {
    this[name] = "";
    if (name == "newPasWord") {
      //手机号删除
      this.newPasWordTips = false;
    } else {
      //验证码框删除
      this.conPasWordTips = false;
    }
    this.signBtnCheck();
  }

  // 关闭登录框按钮
  @Emit
  closeBtn() {
    console.log(111);
    this.$router.push({
      path: "/main"
    });
  }

  //去登录按钮点击事件
  @Emit toLogin() {
    this.$router.push({
      path: "/main/login"
    });
  }

  //登录按钮点击事件
  @Emit signClick() {
    let newPasWord = this.newPasWord + "";
    let conPasWord = this.conPasWord + "";

    if (!this.signBtn) {
      return;
    }

    let check = false;
    //校验新密码规则
    if (!this.passwordLength(newPasWord) || !this.passwordRule(newPasWord)) {
      this.newPasWordTips = true;
      check = true;
      return;
    }
    //校验确认密码规则
    if (!this.passwordLength(conPasWord) || !this.passwordRule(conPasWord)) {
      this.conPasWordTips = true;
      check = true;
    }
    //校验 新密码和确认密码是否相同
    if (newPasWord !== conPasWord) {
      this.conPasWordTips = true;
      check = true;
    }
    if (check) {
      return false;
    }
    resetPasswordMemberInfo({
      password: conPasWord
    }).then(res => {
      if (res.code == "0") {
        //登录成功 跳转页面
        tokenFun(res.token); //设置token缓存
        memberidFun(res.memberId); //设置token缓存
        loginSuccess(sessionStorage.getItem("loginRoleStatus") * 1, this);
      } else {
        tipsFail(res.msg);
      }
    });
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
  font-weight: 500;
  margin: 35px 0;
  text-align: center;
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

.to-login {
  color: #999;
  font-size: 13px;
  text-align: right;
  margin-top: 10px;
  span {
    color: #fe7865;
    cursor: pointer;
  }
}
</style>
