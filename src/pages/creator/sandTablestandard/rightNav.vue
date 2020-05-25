/**

* Created by wangxin

* @date 2019/9/18 11:31

*/
<template>
  <div class="right-nav">
    <div class="item mt24">
      <h3>场景</h3>
      <div class="mt14" v-if="bgImgStatus===0">
        <a class="btn" href="javascript:;" @click="addClick">选择课程</a>
      </div>
      <div class="mt14" v-if="bgImgStatus===1">
        <a class="btn" href="javascript:;" @click="addBtn">上传场景</a>
      </div>
      <div class="mt14" v-if="bgImgStatus===2">
        <a class="btn-t" href="javascript:;" @click="addBtn">替换场景</a>
        <a class="btn-y" href="javascript:;" @click="addlication">应用到所有</a>
      </div>
    </div>
    <div class="item mt24 courseList" v-if="bgImgStatus===1 || bgImgStatus===2">
      <h3>课程名称</h3>
      <!-- 课程列表 start -->
      <div class="listBox">
        <p class="e-p">{{courseList[0].courseName || '未命名课程'}}</p>
      </div>
    </div>

    <div class="item mt24 courseList" v-if="bgImgStatus===1 || bgImgStatus===2">
      <h3>课程结构</h3>
      <div class="mt14">
        <a class="btn" href="javascript:;" @click="addClick">替换课程</a>
      </div>
      <!-- 课程列表 start -->
      <div class="listBox" :style="{'height':maxH + 'px'}" v-if="classType != 4">
        <div class="e-list" v-for="(items,index) in courseList" :key="index">
          <div class="img">{{+index+1}}</div>
          <span>{{items.lessonName}}</span>
        </div>
      </div>
      <!-- 课程列表 end -->
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { OperateNewOperate } from "../../../service/sandTableApi";
const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "RightNav",
  components: {}
})
export default class RightNav extends Vue {
  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前编辑模块的下标
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前编辑模块的下标  action

  @SandTableMod.State("PrimaryShow") PrimaryShow; //当前编辑模块的下标
  @SandTableMod.Action("PrimaryShowHandle") PrimaryShowHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseList") courseList; //当前编辑模块的下标
  @SandTableMod.Action("courseListHandle") courseListHandle; //当前编辑模块的下标  action

  @SandTableMod.State("maxH") maxH; //当前编辑模块的下标
  @SandTableMod.Action("maxHHandle") maxHHandle; //当前编辑模块的下标  action

  @SandTableMod.State("bgImg") bgImg; //当前编辑模块的下标
  @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前编辑模块的下标  action

  @SandTableMod.State("licationShow") licationShow; //当前编辑模块的下标
  @SandTableMod.Action("licationShowHandle") licationShowHandle; //当前编辑模块的下标  action

  @SandTableMod.State("classType") classType; //新建竖版列表
  @SandTableMod.Action("classTypeHandle") classTypeHandle; //新建竖版列表  action修改方

  @SandTableMod.State("checkedShow") checkedShow; //当前模块应用场景的类名判断
  @SandTableMod.Action("checkedShowHandle") checkedShowHandle; //当前模块应用场景的类名判断  action

  @SandTableMod.State("editIndex") editIndex; //当前编辑模块的下标
  @SandTableMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseId") courseId; //当前编辑模块的Id
  @SandTableMod.Action("courseIdHandle") courseIdHandle; //当前编辑模块的Id  action

  @SandTableMod.State("courseInfo") courseInfo; //当前编辑模块的下标
  @SandTableMod.Action("courseInfoHandle") courseInfoHandle; //当前编辑模块的下标  action

  @SandTableMod.State("refId") refId; //当前编辑模块的refId
  @SandTableMod.Action("refIdHandle") refIdHandle; //当前编辑模块的refId  action

  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前模块的状态
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前模块的状态  action

  addBtn() {
    //上传图片点击事件
    $("#filElem").click();
  }

  addlication() {
    console.log(this.checkedShow);
    if (this.checkedShow == false) {
      let licationShow = true;

      this.licationShowHandle({
        licationShow: licationShow
      });
      let editIndex = this.editIndex;
      let cour = this.courseList;
      let courseList = [];
      cour.map(item => {
        courseList.push({
          isOpen: false, //当前模块是否展开 true展开 false 不展开
          isUse: true, //当前模块是否可用
          courseId: item.courseId, //课程id
          lessonName: item.lessonName, //课程名称
          lessonSceneUrl: cour[editIndex].lessonSceneUrl, //选择课程后的场景
          lessonServerUrl: item.lessonServerUrl, //选择课程后的第三方课程
          sceneThumbnailUrl: cour[editIndex].sceneThumbnailUrl, //选择课程后的缩略图
          courseName: item.courseName //课程名称
        });
      });

      this.courseListHandle({
        courseList: courseList
      });

      let list = {
        courseId: this.courseId,
        courseType: this.courseInfo.currentStCourseData.courseType,
        refCourseId: this.refId,
        stLessonList: courseList,
        bgImgStatus: this.bgImgStatus,
        courseServerUrl: courseList[editIndex].lessonServerUrl,
        sceneThumbnailUrl: courseList[editIndex].sceneThumbnailUrl,
        editIndex: this.editIndex,
        remindApplyAllFlag: false //应用所有场景
      };
      OperateNewOperate(list).then(res => {
        if (res.code === 0) {
          let courseInfo = res.data;

          this.courseInfoHandle({
            courseInfo: courseInfo
          });

          let licationShow = true;

          this.licationShowHandle({
            licationShow: licationShow
          });
        } else {
          tipsFail(res.msg);
        }
      });
    } else {
      let licationShow = false;

      this.licationShowHandle({
        licationShow: licationShow
      });
    }
  }

  //上传课程点击事件
  addClick(e) {
    let pageHeight = document.querySelector(".right-nav");
    let maxH = pageHeight.offsetHeight - 250;
    this.maxHHandle({
      maxH: maxH
    });
    let PrimaryShow = true;
    this.PrimaryShowHandle({
      PrimaryShow: PrimaryShow
    });
  }

  // 添加课程
  addCourse() {
    console.log("添加课程");
  }
  created() {}
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
  z-index: 222;
  // padding-left: 20px;
  padding: 0 3px 0 20px;
}
//
.item {
  h3 {
    @include fontSet(12px, #333, 500);
    line-height: normal;
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

.btn {
  display: inline-block;
  width: 158px;
  height: 26px;
  text-align: center;
  line-height: 24px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 6px;
  border: 1px solid rgba(230, 230, 230, 1);
  @include fontSet(12px, #666, 400);
}

.btn-t {
  display: inline-block;
  width: 74px;
  height: 26px;
  text-align: center;
  line-height: 24px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 6px;
  border: 1px solid rgba(230, 230, 230, 1);
  @include fontSet(12px, #666, 400);
}

.btn-y {
  display: inline-block;
  width: 60px;
  height: 26px;
  text-align: center;
  line-height: 24px;
  // background: rgba(255, 255, 255, 0.01);
  // border-radius: 6px;
  // border: 1px solid rgba(230, 230, 230, 1);
  @include fontSet(12px, #666, 400);
  margin-left: 17px;
}

.btn-box {
  display: flex;
  justify-content: space-between;
  .btn {
    width: 74px;
  }
}

.courseList {
  position: relative;
}

.listBox {
  margin-top: 14px;
  overflow: auto;
  // padding-bottom: 62px;
  // height: 100%;
  .e-p {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}

.e-list {
  margin-bottom: 10px;
  display: flex;
  .img {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: linear-gradient(
      127deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 50%;
    // background: url("../../../assets/creator/sandTable/icon-e-list.svg")
    //   no-repeat center center;
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

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 7px;
  background-color: #fff;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 4px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
