/**

* Created by wangxin

* @date 2019/9/3 9:57

*/
<template>
  <div class="nav">
    <div class="left-btn" @click="navShow(systemIndex)" v-if="false">
      <i v-if="systemIndex==='show'" class="icon-right"></i>
      <i v-else class="icon-right"></i>
    </div>
    <div v-if="systemIndex==='show'">
      <p class="logo">
        <img :src="src" alt />
      </p>
      <!-- userList start -->
      <div class="user-info">
        <div class="up-box">
          <!-- <img :src="userList.avatar || require('../../assets/creator/user.svg')" alt /> -->
          <input type="file" ref="file" @change="fileChange" accept="image/*" />
          <img :src="userList.avatar" alt v-if="userList.avatar !=''" />
          <img
            :src="userList.gender === 1? require('../../assets/teachers/boy.svg'): require('../../assets/teachers/girls.svg') "
            alt
            v-else
          />
          <span>编辑</span>
        </div>
        <p class="user">
          <span>{{userList.memberName}}</span>
          <i class="icon-modal"></i>
        </p>
        <p class="id">ID：{{userList.mobile}}</p>
      </div>
      <!-- userList end -->
      <div class="item">
        <h3>我的课程</h3>
        <ul class="course">
          <li
            v-for="(item,index) in courseList"
            :class="{'active':tab===item.title}"
            :key="index"
            @click="tabClick(item)"
          >
            <img :src="tab===item.title?item.icon2:item.icon1" class="mr" />
            <span>{{item.title}}</span>
            <i class="icon-add" v-if="item.title==='我的创作'" @click="addClick"></i>
            <i class="icon-line"></i>
            <ul
              class="level-menu"
              v-show="item.show"
              v-if="item.children&&item.children.length>0"
              v-Clickoutside="outClick"
            >
              <li
                v-for="(obj,index) in item.children"
                :class="{'active':tab===obj.title}"
                :key="index"
                @click.stop="twoLevelClick(obj)"
              >
                <img :src="tab===obj.title?obj.icon2:obj.icon1" class="mr" />
                <span>{{obj.title}}</span>
                <span v-if="obj.tem" class="remark">{{obj.tem}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="item">
        <h3>其他功能</h3>
        <ul class="course">
          <li
            v-for="(item,index) in otherList"
            :class="{'active':tab===item.title,'disabled':item.isOpen?false:true}"
            :key="index"
            @click="tabClick(item)"
          >
            <img :src="tab===item.title?item.icon2:item.icon1" class="mr" />
            <span>{{item.title}}</span>
            <span class="disabled" v-if="!item.isOpen">（待开发）</span>
            <i class="icon-line"></i>
            <span
              v-if="item.count!==undefined&&item.count>0"
              class="msg"
            >{{item.count>99?'99':item.count}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--<div v-if="systemIndex==='show'" class="footer" @click="quitFun">
      <i class="sign-out"></i>退出登录
    </div>-->
  </div>
</template>

<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import { cloneObj } from "../../utils/utils";
import { memberheaderMemberInfo } from "../../service/creatorApi";
import { systemNoticeTotalFun } from "../../service/creator/creatorAction";
import { putFileAvatarUpload } from "../../service/groupApi";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
const CreatorMod = namespace("creator");
@Component({
  name: "CreatorNav",
  directives: {
    Clickoutside
  }
})
export default class CreatorNav extends Vue {
  src = require("../../assets/home/logo-bg.svg");

  @CreatorMod.State("userList") userList; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("userListHandle") userListHandle; //当前选择的群组  action修改方法

  @CreatorMod.State("courseList") courseList; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("courseListHandle") courseListHandle; //当前选择的群组  action修改方法

  @CreatorMod.State("otherList") otherList; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("otherListHandle") otherListHandle; //当前选择的群组  action修改方法

  //@CreatorMod.State("tab") tab; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("tabHandle") tabHandle; //当前选择的群组  action修改方法

  @CreatorMod.State("systemIndex") systemIndex; //当前选择的群组 默认第一个群组
  @CreatorMod.Action("systemIndexHandle") systemIndexHandle; //当前选择的群组  action修改方法

  @CreatorMod.State("uploadFileShow") uploadFileShow; //上传文件弹框显示隐藏
  @CreatorMod.Action("uploadFileShowHandle") uploadFileShowHandle; //上传文件弹框显示隐藏  action修改方法

  //是否可用 判断  true 可用 false 不可用
  @Emit checkFun(val) {
    if (val !== undefined) {
      return val;
    } else {
      return true;
    }
  }

  get tab(){
    let path=this.$route.path;
    let obj1=this.courseList.find((d)=>d.url===path);
    let obj2=this.otherList.find((d)=>d.url===path);
    if(obj1){
      return obj1.title;
    }

    if(obj2){
      return obj2.title;
    }

  }

  //页面导航点击事件
  @Emit tabClick(item) {
    let val = item.title;
    let type = item.isOpen;
    if (!type) {
      return false;
    }
    if (this.tab !== val) {
      this.tabHandle({
        tab: val
      });
    }
    //路由跳转
    if (item.url) {
      if (item.title === "上传课程") {
        this.uploadFileShowHandle({
          uploadFileShow: true
        });
      } else {
        let data = { path: item.url };
        if (item.query) {
          data.query = item.query;
        }
        this.$router.push({ path: item.url /*query: val*/ });
      }
    }
  }

  //上传课程三个按钮点击事件
  @Emit twoLevelClick(item) {
    //路由跳转
    if (item.url) {
      if (item.title === "上传课程") {
        //this.$router.replace(item.url);
        this.uploadFileShowHandle({
          uploadFileShow: true
        });
      } else if (item.title == "新建课程频道") {
        this.$router.push("/creatorCreCouPlans");
      } else {
        let data = { path: item.url };
        if (item.query) {
          data.query = item.query;
        }
        this.$router.push({ path: item.url /*query: val*/ });
      }
    }
  }

  // 点击头像
  @Emit fileChange(event) {
    if (event.target.files.length <= 0) {
      return;
    }
    let file = event.target.files[0];
    let data = new FormData();
    data.append("file", file);
    putFileAvatarUpload(data).then(res => {
      if (res.code == "0") {
        let avatar = res.webUrl;
        memberheaderMemberInfo().then(res => {
          if (res.code === 0) {
            let userList = res.data;
            userList.avatar = avatar;
            this.userListHandle(cloneObj(userList));
          }
        });
      }
    });
  }

  //加号点击事件
  @Emit addClick() {
    let courseList = cloneObj(this.courseList);
    courseList[0].show = true;
    this.courseListHandle({
      courseList: courseList
    });
  }

  //点击元素意外的其他区域
  @Emit outClick() {
    let courseList = cloneObj(this.courseList);
    courseList[0].show = false;
    this.courseListHandle({
      courseList: courseList
    });
  }

  //退出登录点击事件
  @Emit quitFun() {

  }

  //导航栏点击事件
  @Emit navShow(type) {
    if (type === "show") {
      this.systemIndexHandle({
        systemIndex: "hide"
      });
    } else {
      this.systemIndexHandle({
        systemIndex: "show"
      });
    }
  }

  //获取用户基本信息接口
  @Emit memberheaderMemberInfoFun() {
    memberheaderMemberInfo().then(res => {
      if (res.code === 0) {
        let userList = res.data;
        this.userListHandle(cloneObj(userList));
      }
    });
  }

  created() {
    this.memberheaderMemberInfoFun();
    systemNoticeTotalFun(); //获取用户系统消息数量

    let path = this.$route.path;
    let tab = "我的创作";
    let obj1 = this.otherList.find(d => d.url === path);
    let obj2 = this.courseList.find(d => d.url === path);
    tab = obj1 ? obj1.title : tab;
    tab = obj2 ? obj2.title : tab;
    this.tabHandle({ tab });
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
@mixin bg($u) {
  background: url($u) no-repeat;
  background-size: 100% auto;
}
.nav {
  // width: 100%;
  width: 240px;
  height: 100%;
  background: #fafafa;
  padding-left: 20px;
  border: 1px solid rgba(240, 240, 240, 1);
  position: relative;
}
.left-btn {
  width: 20px;
  height: 60px;
  position: absolute;
  top: 50%;
  right: -20px;
  background: rgba(247, 247, 247, 0.6);
  border-radius: 0px 6px 6px 0px;
  border: 1px solid rgba(240, 240, 240, 1);
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  .icon-right {
    display: inline-block;
    width: 12px;
    height: 12px;
    @include bg("../../assets/img/arrow-right.svg");
  }
}
.logo {
  height: 60px;
  vertical-align: middle;
  line-height: 60px;
  img {
    margin-left: 40px;
    width: auto;
    height: 28px;
  }
}
.user-info {
  text-align: center;
  padding-top: 11px;
  padding-right:20px;
  .up-box {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    cursor: pointer;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      top: 71px;
      left: 80px;
    }
    input {
      position: absolute;
      top: 71px;
      left: 80px;
      width: 80px;
      height: 80px;
      opacity: 0;
      cursor: pointer;
      z-index: 10;
    }
    span {
      display: none;
    }
    &:hover {
      span {
        display: block;
        position: absolute;
        top: 71px;
        left: 80px;
        width: 80px;
        height: 80px;
        z-index: 9;
        text-align: center;
        line-height: 79px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        letter-spacing: 2px;
        background: rgba(0, 0, 0, 0.31);
        border-radius: 50%;
      }
    }
  }

  .user {
    padding-top: 8px;
    span {
      @include fontSet(20px, #333, 600);
      vertical-align: middle;
    }
    .icon-modal {
      display: inline-block;
      width: 20px;
      height: 20px;
      @include bg("../../assets/creator/medal.svg");
      vertical-align: middle;
      margin-left: 6px;
    }
  }
  .id {
    @include fontSet(14px, #999, 400);
    margin-top: 4px;
  }
}

.item {
  h3 {
    @include fontSet(14px, #b3b3b3, 400);
    padding-left: 12px;
    margin-bottom: 15px;
    margin-top: 26px;
  }
  .course {
    @include fontSet(16px, #666, 500);
    li {
      cursor: pointer;
      position: relative;
      border-radius: 20px 0px 0px 20px;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      i {
        display: inline-block;
        width: 22px;
        height: 22px;
      }
      .mr {
        margin: 0 18px 0 24px;
      }
      .icon-add {
        display: none;
        @include bg("../../assets/creator/icon-add.svg");
        margin-right: 4px;
        position: absolute;
        top: 9px;
        right: 8px;
      }
      .icon-line {
        display: none;
        width: 4px;
        height: 20px;
        background: #fe7865;
        border-radius: 2px;
        position: absolute;
        top: 10px;
        right: 0;
      }
      .level-menu {
        width: 200px;
        position: absolute;
        top: 39px;
        right: -160px;
        z-index: 20;
        background: #fff;
        border-radius: 10px;
        border: 1px solid rgba(230, 230, 230, 1);
        color: #4d4d4d;
        .mr {
          margin: 0 13px 0 11px;
        }
        .remark {
          display: none;
          position: absolute;
          top: 11px;
          right: 10px;
          @include fontSet(12px, #fe7865, 500);
        }
        li {
          border-radius: 0;
        }
        li:last-child {
          margin-bottom: 0;
        }
        li:hover {
          background: rgba(0, 0, 0, 0.03);
          .remark {
            display: block;
          }
        }
      }
      .msg {
        display: inline-block;
        padding: 0 6px;
        height: 20px;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 8px;
        @include fontSet(12px, #fff, bold);
        text-align: center;
        line-height: 20px;
        margin-left: 13px;
      }
    }
    li:hover {
      background: #fff;
      /*.level-menu{
          display: block;
        }*/
    }
    .disabled {
      span.disabled {
        @include fontSet(12px, rgba(204, 204, 204, 1), 400);
      }
    }
    .disabled:hover {
      background: none;
    }
    .active {
      background: #fff;
      color: #fe7865;
      .icon-line {
        display: block;
      }
    }
    .active:hover {
      .icon-add {
        display: block;
      }
    }
    .disabled {
      color: #ccc;
    }
  }
}

.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  @include fontSet(14px, #999, 400);
  text-align: center;
  cursor: pointer;
  box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.11);
  background: #fafafa;
  .sign-out {
    display: inline-block;
    width: 32px;
    height: 32px;
    @include bg("../../assets/creator/sign-out.svg");
    vertical-align: middle;
  }
}
</style>
