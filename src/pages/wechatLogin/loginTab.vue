<template>
  <div>
    <p>
      <img :src="require('../../assets/home/logo-bg.svg')" alt />
    </p>
    <ul class="tab clearfix" v-if="type=='captcha'">
      <li class="active">
        验证码登录
        <br />
        <span class="line"></span>
      </li>
      <li @click="pasClick">密码登录</li>
    </ul>
    <ul class="tab clearfix" v-else>
      <li @click="pasClick">验证码登录</li>
      <li class="active">
        密码登录
        <br />
        <span class="line"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "LoginTab",
  components: {}
})
export default class LoginTab extends Vue {
  @Prop(String) type;
  //密码登陆点击事件
  @Emit pasClick() {
    //当前是验证码登录跳转到  密码登录  captcha
    //当前是密码登录  跳转到验证码登录 posWord
    let url = this.type == "captcha" ? "/main/pasLogin" : "/main/login";
    this.$router.push({
      path: url
    });
  }
}
</script>

<style lang="scss" scoped>
p {
  text-align: center;
  padding-top: 16px;
  img {
    display: inline-block;
    width: 126px;
    height: 43px;
    width: auto;
    margin: 6px 0;
  }
}

.tab {
  li {
    float: left;
    width: 50%;
    height: 56px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.58);
    text-align: center;
    padding: 10px 0 21px 0;
    cursor: pointer;
  }
  .active {
    font-weight: 600;
    padding: 10px 0;
    color: rgba(51, 51, 51, 1);
    .line {
      display: inline-block;
      width: 38px;
      height: 4px;
      background: #fe7865;
      border-radius: 4px;
      position: relative;
      top: -6px;
    }
  }
}
</style>
