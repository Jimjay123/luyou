/**

* Created by wangxin

* @date 2019/9/18 11:31

*/
<template>
  <div class="right-nav">
    <!-- 场景 start -->
    <div class="item mt24">
      <h3>场景</h3>
      <div class="mt14" v-if="!sandTable.sceneServerUrl">
        <a class="btn" href="javascript:;" @click="addClick">上传场景</a>
      </div>
      <div class="mt14" v-if="sandTable.sceneServerUrl">
        <a class="btn" href="javascript:;" @click="addClick">替换场景</a>
      </div>
    </div>
    <!-- 场景 end -->

    <!-- 课程结构 start -->
    <div class="item mt24 courseList" v-if="sandTable.sceneServerUrl">
      <h3>课程结构</h3>
      <!-- 课程列表 start -->
      <div class="listBox">
        <div class="e-list" v-for="(item,index) in sandTable.stCourseList" :key="index">
          <div class="img">{{index+1}}</div>
          <span>{{item.courseName}}</span>
        </div>
      </div>
      <!-- 课程列表 end -->
      <div class="add" v-if="pofix===0">
        <a class="btn" href="javascript:;" @click="addCourse">+ 添加课程</a>
      </div>
      <div class="mt14 pofix" v-if="pofix===1">
        <a class="btn" href="javascript:;" @click="addCourse">+ 添加课程</a>
      </div>
    </div>
    <!-- 课程结构 end -->
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";
const SandTableMod = namespace("sandTable");
@Component({
  name: "RightNav",
  components: {}
})
export default class RightNav extends Vue {
  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前编辑模块的下标
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseList") courseList; //当前编辑模块的下标
  @SandTableMod.Action("courseListHandle") courseListHandle; //当前编辑模块的下标  action

  @SandTableMod.State("showAddDailog") showAddDailog; //添加课程弹框
  @SandTableMod.Action("showAddDailogHandle") showAddDailogHandle; //添加课程弹框  action

  @SandTableMod.State("sandTable") sandTable; //沙盘课程频道-添加课程
  @SandTableMod.Action("sandTableHandle") sandTableHandle; //沙盘课程频道-添加课程

  //data
  bgImg = false; //是否上传图片
  count = 0;
  pofix = 0;

  //methods
  //上传图片点击事件
  addClick() {
    $("#filElem").click();
  }

  // 计算高度
  get listHeight() {
    let pageHeight = document.querySelector(".right-nav");
    let target = document.querySelector(".listBox");
  }

  // 添加课程
  addCourse(e) {
    let pageHeight = document.querySelector(".right-nav");
    let target = document.querySelector(".listBox");
    let maxH = pageHeight.offsetHeight - 136 - 52;
    let targetH = target.offsetHeight + 52;
    if (targetH >= maxH) {
      // 定位底部
      this.pofix = 1;
    }
    $("#addNewCourse").click();
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.right-nav {
  position: fixed;
  top: 60px;
  right: 0;
  width: 198px;
  height: calc(100vh - 60px);
  background: rgba(255, 255, 255, 1);
  box-shadow: -2px 2px 4px 0px rgba(245, 245, 245, 1);
  z-index: 10;
  padding: 0 20px;
  z-index: 201;
}
//
.item {
  h3 {
    @include fontSet(12px, #333, 500);
    line-height: 17px;
  }
}

.mt24 {
  margin-top: 24px;
}
.mt14 {
  margin-top: 14px;
}

.text {
  word-break: break-all;
  @include fontSet(12px, #999, 400);
  padding-left: 20px;
  padding-right: 20px;
}
.pofix {
  width: 198px;
  height: 52px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 12px 0px rgba(204, 204, 204, 1);
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 13px 20px;
  margin-top: 62px;
}

.btn {
  display: inline-block;
  width: 158px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 6px;
  border: 1px solid rgba(230, 230, 230, 1);
  @include fontSet(12px, #666, 400);
}
.btn-box {
  display: flex;
  justify-content: space-between;
  .btn {
    width: 74px;
  }
}
.courseList {
  height: 100%;
  position: relative;
}
.listBox {
  margin-top: 14px;
  overflow: auto;
  // padding-bottom: 62px;
  // height: 100%;
}
.e-list {
  margin-bottom: 10px;
  display: flex;
  .img {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../../assets/creator/sandTable/icon-e-list.svg")
      no-repeat center center;
    line-height: 20px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    font-family: "GalanoGrotesque";

    font-size: 10px;
    font-weight: bold;
  }
  span {
    display: inline-block;
    width: 132px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    margin-top: 1px;
    margin-left: 5px;

    // 溢出隐藏
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
