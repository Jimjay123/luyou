/**

* Created by wangxin

* @date 2019/9/4 20:26

*/
<template>
  <div class="new-course course-item" @click="addClick">
    <img :src="require('../../assets/creator/add-course.svg')" alt />
    <p>新建课程</p>
    <ul class="level-menu course" v-show="show" v-Clickoutside="outClick">
      <li v-for="(obj,index) in list" :key="index" @click="tabClick(obj)">
        <img :src="obj.title?obj.icon2:obj.icon1" class="mr" />
        <span>{{obj.title}}</span>
        <span v-if="obj.tem" class="remark">{{obj.tem}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";

@Component({
  name: "NewCourse",
  directives: {
    Clickoutside
  }
})
export default class NewCourse extends Vue {
  list = [
    {
      icon1: require("../../assets/creator/icon-course.svg"),
      icon2: require("../../assets/creator/icon-course.svg"),
      title: "新建课程",
      isOpen: true,
      url: "/editor",
      query: ""
    },
    {
      icon1: require("../../assets/creator/icon-channel.svg"),
      icon2: require("../../assets/creator/icon-channel.svg"),
      title: "新建课程频道",
      isOpen: true,
      url: "/creatorCreCouPlans",
      query: "",
      tem: "模板"
    },
    {
      icon1: require("../../assets/creator/icon-upload.svg"),
      icon2: require("../../assets/creator/icon-upload.svg"),
      title: "标准课（沙盘）",
      isOpen: true,
      url: "/sandTablestandard",
      query: ""
    },
    {
      icon1: require("../../assets/creator/icon-upload.svg"),
      icon2: require("../../assets/creator/icon-upload.svg"),
      title: "课程频道（沙盘）",
      isOpen: true,
      url: "/sandTable",
      query: ""
    },
    {
      icon1: require("../../assets/creator/icon-upload.svg"),
      icon2: require("../../assets/creator/icon-upload.svg"),
      title: "上传课程",
      isOpen: true,
      url: "",
      query: ""
    }
  ];
  show = false;

  @Prop({
    default: null,
    required: false
  })
  addCb;

  //新建点击事件
  @Emit addClick() {
    this.show = true;
  }

  //点击元素以外区域
  @Emit outClick() {
    this.show = false;
  }

  //新建点击事件
  @Emit tabClick(obj) {
    if(obj.url){
      this.$router.push({
        path:obj.url,
        query:obj.query
      })
    }else{
      if (typeof this.addCb === "function") {
        this.addCb("show");
      }
    }
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
.new-course {
  float: left;
  //margin-right:36px;
  width: 250px;
  height: 208px;
  background: rgba(247, 247, 247, 1);
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  font-weight: 500;
  position: relative;
  margin: 0 18px 31px 18px;
  img {
    width: 24px;
    height: 24px;
    margin-top: 66px;
    margin-bottom: 22px;
  }
  .course {
    width: 198px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    border: 1px solid rgba(230, 230, 230, 1);
    @include fontSet(16px, #666, 500);
    position: absolute;
    top: 55px;
    left: 50%;
    z-index: 20;
    li {
      cursor: pointer;
      position: relative;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      background: rgba(255, 255, 255, 0.01);
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
      background: rgba(0, 0, 0, 0.03);
    }
    li:last-child {
      margin-bottom: 0;
    }
  }
  .level-menu {
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
}
</style>
