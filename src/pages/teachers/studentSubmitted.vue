<template>
  <div>
    <header>
      <div class="header-content">
        <img src="../../teacherImg/LOGO.png" alt />
        <ul>
          <li>
            <router-link to="/teachers">首页</router-link>
            <span class="one"></span>
          </li>
          <li>
            <router-link to="/teachers/main">我的课程</router-link>
            <span class="two"></span>
          </li>
          <li>
            <router-link to="/teachers/team">我的群组</router-link>
            <span class="three"></span>
          </li>
          <li>
            <router-link to="/teachers/content">统计中心</router-link>
            <span class="four"></span>
          </li>
        </ul>
        <div>
          <img src="../../teacherImg/icon／搜索 40px .png" alt />
        </div>
        <div>
          <img src="../../teacherImg/icon／搜索 40px (1).png" alt />
        </div>
        <div>
          <img src="../../teacherImg/icon／36pd／Head／2.png" alt />
        </div>
      </div>
      <router-view></router-view>
    </header>
    <div class="main-content">
      <a href="javascript:;"></a>
      <h3>身份验证</h3>
      <div class="box">    
          <img src="/teacherImg/提交成功.png" alt="" />
          <h3>提交成功，等待审核</h3>
          <p>平台会在1个工作日内完成审核，请耐心等待，可在“<span>个人中心</span>”查看进度</p>
          <router-link to="/teachers" tag="div">
            <button>返回首页</button>
          </router-link>
      </div> 
    </div>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "teacherIndex"
})
export default class teacherIndex extends Vue {}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
header {
  width: 1440px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(237, 237, 237, 1);
}
.header-content {
  height: 60px;
  width: 90%;
  margin: 0 auto;
}
.header-content img {
  margin-top: 10px;
  float: left;
}
.header-content ul {
  float: left;
  margin-left: 252px;
  height: 60px;
}
.header-content ul li {
  margin-top: 12px;
  height: 60px;
  margin-right: 80px;
  float: left;
}
.header-content ul li a {
  color: rgba(102, 102, 102, 1);
  display: block;
}
.header-content div {
  width: 60px;
  height: 48px;
  background: rgba(255, 255, 255, 0.01);
  float: left;
}
.header-content div img {
  margin-left: 40px;
  width: 36px;
  height: 30px;
  background: rgba(255, 255, 255, 0.01);
}
.main-content {
  width: 90%;
  margin: 0 auto;
}
.main-content h3 {
  width: 91px;
  height: 30px;
  font-size: 22px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 30px;
  float: left;
  padding-top: 22px;
}
.main-content a {
  display: block;
  float: left;
  width: 6px;
  height: 23px;
  background: rgba(254, 120, 101, 1);
  border-radius: 3px;
  margin-right: 10px;
  margin-top: 28px;
  padding-top: 22px;
}
.box {
  width: 952px;
  height: 454px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  float: left;
  margin-top: 85px;
}
.box img{
    height: 81px;
    width: 97px;
    margin-top: 40px;
    margin-left: 348px
}
.box h3{
    width:135px;
    height:21px;
    font-size:15px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:21px;
    margin-top: 130px;
    margin-left: 400px
}
.box p{
    width:600px;
    height:14px;
    font-size:10px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:14px;
    margin-top: 150px;
    margin-left:210px;
    line-height: 17px;
    text-align: center
}
.box p span{
    color: rgba(254,120,101,1)
}
.box button{
    border:0;
    width:92px;
    height:30px;
    background:linear-gradient(90deg,rgba(255,176,158,1) 0%,rgba(254,120,101,1) 100%);
    border-radius:15px;
    font-size:15px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:30px;
    text-align: center;
    margin-left: 420px;
    margin-top: 21px
}
</style>
