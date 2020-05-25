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
        <div class="first">
          <p>
            姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              id="username"
              type="text"
            />
          </p>
          <p>
            性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" value="男" />
            <input type="text" value="女" />
          </p>
          <p>
            手机号码*
            <input id="num" value="去绑定" />
          </p>
          <p>
            电子邮件*
            <input id="email" type="text" />
          </p>
          <p>
            学号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="numder"
              id="studentId"
            />
          </p>
        </div>

        <div class="next">
          <p>
            <input @change="selectFile" type="file" accept="image/*" />
          </p>
          <p>
            大学/单位
            <input type="text" />
          </p>
          <p>
            所在学院
            <input type="text" />
          </p>
          <p>
            专业学科
            <input type="text" />
          </p>
          <input id="reg-btn" @click="putInfo" type="button" value="提交" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {putFileAvatarUpload} from '../../service/groupApi';
export default {
  data() {
    return {
      file:'',
    };
  },
  methods:{
    putInfo:function(){
      let data=new FormData();
      data.append('file',this.file);
      putFileAvatarUpload({key:val}).then(res => {
        if(res.code=='0'){
          this.serverCode=res.captcha;//验证码
          this.checkBtnState='timer';//改变验证码按钮状态
          //启动计数定时器
          this.timerNum=5;
          this.timer=this.timer=setInterval(this.setInt,1000);
        }else{
          tipsFail(res.msg);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    selectFile:function(e){
      this.file=e.target.files[0];
     console.log();
    }
  },
  mounted() {
    let emailRg = /^\w+[-+.]*\w*@([a-z0-9A-Z\u2E80-\u9FFF]-?)+(\.\w{2,6})+/;
    let emailIpt = document.getElementById("email");
    let isEmail = false;
    emailIpt.onkeyup = function() {
      if (emailRg.test(emailIpt.value)) {
        this.nextElementSibling.style.color = "green";
        this.nextElementSibling.innerHTML = "格式正确";
        isEmail = true;
      } else {
        this.nextElementSibling.style.color = "red";
        this.nextElementSibling.innerHTML = "格式不正确";
        isEmail = false;
      }
    };

    let subRg = /^[a-zA-Z]\w{5,17}$/;
    let subIpt = document.getElementById("sub");
    let isSub = false;
    subIpt.onkeyup = function() {
      if (subRg.test(subIpt.value)) {
        this.nextElementSibling.style.color = "green";
        this.nextElementSibling.innerHTML = "格式正确";
        isSub = true;
      } else {
        this.nextElementSibling.style.color = "red";
        this.nextElementSibling.innerHTML = "格式不正确";
        isSub = false;
      }
    };
  }
};
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
.box .first {
  float: left;
  width: 455px;
  height: 454px;
}
.box .first #num {
  width: 97px;
  height: 32px;
  border-radius: 16px;
  opacity: 0.4;
  border: 2px solid rgba(254, 120, 101, 1);
  color: rgba(254, 120, 101, 1);
  line-height: 32px;
  text-align: center;
}
.box .next {
  float: left;
  width: 445px;
  height: 454px;
}
.box p {
  display: block;
  margin-left: 20px;
  height: 50px;
  width: 392px;
  margin-top: 20px;
}
.box p:nth-child(2) input {
  width: 140px;
  height: 40px;
  background: rgba(0, 0, 0, 0);
  border-radius: 6px;
  line-height: 40px;
  text-align: center;
}
.box p input {
  width: 299px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  border: 1px solid rgba(230, 230, 230, 1);
}

.box section {
  width: 50px;
}

.box #ipt {
  margin-left: 100px;
}

.box textarea {
  margin-left: 60px;
}

#reg-btn {
  display: block;
  width: 110px;
  height: 36px;
  background: linear-gradient(
    90deg,
    rgba(255, 176, 158, 1) 0%,
    rgba(254, 120, 101, 1) 100%
  );
  border-radius: 18px;
  border: 0;
  margin-left: 260px;
  margin-top: 100px;
  float: left;
  color: rgba(255, 255, 255, 1);
}
</style>
