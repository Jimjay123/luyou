/**

* Created by wangxin

* @date 2019/9/18 9:30  编辑器首页

*/
<template>
  <div class="editor" @dragover.stop>
    <!--顶部header  start-->
    <EditorHeader />
    <!--顶部header  end-->

    <!--右侧选择栏 start-->
    <RightNav />
    <!--右侧选择栏 end-->

    <!--退出 删除按钮 start-->
    <a class="btn signOut" href="javascript:;" @click="signOut">退出</a>
    <a class="btn delPage" href="javascript:;" @click="delPage">删除页面</a>
    <!--退出 删除按钮 end-->

    <!--放大缩小 start-->
    <div class="enlarge">
      <span class="en-cut" @click="cutFun" v-if="enlargeScale>=50"></span>
      <span class="en-cut-disabled" v-else></span>
      <span @click="resetFun">{{enlargeScale}}%</span>
      <span class="en-add" @click="addFun" v-if="enlargeScale<=200"></span>
      <span class="en-add-disabled" v-else></span>
    </div>
    <!--放大缩小 end-->

    <div class="sketArea">
      <Vuescroll :ops="ops" style="padding:10px">
        <!--<div class="sketBox" :style="stylePt" id="sketBox" draggable="true" @dragstart.stop="dragStartFun('start')" @drag="dragStartFun('222')">-->
        <div class="sketBox" :style="stylePt" id="sketBox">
          <PptTemplate class="sketPosition" :mouseWheelHas="true">
            <!--标题画板 start-->
            <TitleSket v-if="type==='title'" />
            <!--标题画板 end-->

            <!-- 图+文 start -->
            <PictureUpload v-else-if="type==='imageText'" />
            <!-- 图+文 end -->

            <!-- 图片 start -->
            <ImageUpload v-else-if="type==='image'" />
            <!-- 图片 end -->

            <!-- 文档编辑 start-->
            <TextIntroduce v-else-if="type==='text'" />
            <!-- 文档编辑 end-->

            <!--选择题画板 start-->
            <ChoiceQuestionSket v-else-if="type==='choiceQuestion'" />
            <!--选择题画板 end-->

            <!-- 文档上传 start -->
            <DocUpload v-else-if="type==='file'"></DocUpload>
            <!-- 文档上传 end -->

            <!-- 视频上传 start-->
            <VideoUpload v-else-if="type==='video'" />
            <!-- 视频上传 end-->
          </PptTemplate>
        </div>
      </Vuescroll>
    </div>

    <!--底部缩略图 start-->
    <BottomThum />
    <!--底部缩略图 end-->
  </div>
</template>

<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import { cloneObj } from "../../../utils/utils";
import EditorHeader from "./editorHeader";
import RightNav from "./rightNav";
import TitleSket from "./titleSket";
import TextIntroduce from "./textIntroduce";
import PictureUpload from "./PictureUpload";
import PptTemplate from "./pptTemplate";
import DocUpload from "./docUpload";
import VideoUpload from "./videoUpload";
import BottomThum from "./bottomThum";
import ImageUpload from "./imageUpload";
import ChoiceQuestionSket from "./choiceQuestionSket";
import Vuescroll from "vuescroll";
import {
  getImgList,
  getEditorResDefImg,
  buildNewNpeCourseFun,
  getAllPageInfoListFun,
  delCouConLogPageFun,
  changeCouUpdPageContentFun
} from "../../../service/editor/editorAction";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";

const EditMod = namespace("edit");
@Component({
  name: "Editor",
  directives: {
    Clickoutside
  },
  components: {
    EditorHeader,
    RightNav,
    PptTemplate,
    TextIntroduce,
    PictureUpload,
    TitleSket,
    ChoiceQuestionSket,
    DocUpload,
    VideoUpload,
    BottomThum,
    ImageUpload,
    Vuescroll
  }
})
export default class Editor extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("enlargeScale") enlargeScale; //编辑文档数据
  @EditMod.Action("enlargeScaleHandle") enlargeScaleHandle; //编辑文档数据  action

  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: true,
      background: "#c1c1c1",
      opacity: 0,
      hoverStyle: true,
      specifyBorderRadius: false,
      minSize: false,
      size: "6px",
      disable: false
    },
    scrollPanel: {
      scrollingX: true,
      initialScrollY: 10
    }
  }; //滚动条设置

  get type() {
    return this.editList[this.editIndex].type || "";
  }

  get stylePt() {
    //return { transform: "scale(" + this.enlargeScale / 100 + ")" };
    return { zoom: this.enlargeScale / 100 };
  }

  //缩小点击事件
  cutFun() {
    let enlargeScale = this.enlargeScale - 5;
    if (enlargeScale > 0) {
      this.enlargeScaleHandle({
        enlargeScale
      });
    }
  }

  //放大点击事件
  addFun() {
    let enlargeScale = this.enlargeScale + 5;
    if (enlargeScale < 200) {
      this.enlargeScaleHandle({
        enlargeScale
      });
    }
  }

  //重置点击事件
  resetFun() {
    this.enlargeScaleHandle({
      enlargeScale: 100
    });
  }

  //删除画板
  delPage() {
    let editList = cloneObj(this.editList);
    let index = this.editIndex;
    if (editList[index].type === "title") {
      return;
    }
    let obj = editList.splice(index, 1);
    this.editListHandle({
      editList
    });
    let len = editList.length - 1;
    this.editIndexHandle({
      editIndex: len
    });
    //删除画板接口调用
    changeCouUpdPageContentFun({
      pageList:editList
    });
  }

  offsetX = "";
  offsetY = "";

  //拖拽开始
  dragStartFun(type) {
    let { offsetX, offsetY, clientX, clientY } = event;
    if (clientX === 0) {
      return;
    }
    if (type === "start") {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
    }
    let left = clientX - this.offsetX;
    let top = clientY - this.offsetY;
    $("#sketBox").css("left", left + "px");
    $("#sketBox").css("top", top + "px");
  }

  mounted() {
    //window.addEventListener('mousewheel', this.handleScroll, true);
  }

  created() {
    getImgList(); //获取背景图数据
    getEditorResDefImg(); //获取配图数据
    let courseId = this.$route.query.courseId;
    if (!courseId) {
      buildNewNpeCourseFun(); //新建npe课程
    } else {
      //编辑器所有画板信息查询接口
      getAllPageInfoListFun({
        courseId: courseId
      });
    }
  }

  handleScroll() {
    let space = 30;
    let top = $("#sketBox")
      .css("top")
      .replace("px", "");
    top = top * 1;
    if (event.deltaY > 0) {
      $("#sketBox").css("top", top + space + "px");
    } else {
      $("#sketBox").css("top", top - space + "px");
    }
  }

  //组件销毁前事件
  beforeDestroy() {
    window.removeEventListener("mousewheel", this.handleScroll, true);
  }

  //退出按钮点击事件
  signOut() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 14px auto;
}

.sketBox {
  //position: fixed;
  /*top: 76px;
    left: 122px;*/
  /*top:calc(50% - 315px);
    left:calc(50% - 597px);

    width: 1px;
    height:1px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;*/
  padding: 20px;
}

.sketArea {
  width: calc(100% - 198px);
  height: calc(100% - 150px);
  overflow: auto;
}

.sketArea /deep/ {
  .__view {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.editor {
  height: 100vh;
  min-width: 1200px;
}

.btn {
  padding: 4px 7px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  position: absolute;
  top: 76px;
}

.btn:hover {
  background: rgba(0, 0, 0, 0.4);
}

.signOut {
  left: 24px;
  z-index: 199;
  width: 52px;
  text-align: center;
}

.delPage {
  right: 212px;
  z-index: 199;
}

.enlarge {
  position: absolute;
  bottom: 100px;
  right: 212px;
  font-size: 12px;
  font-weight: 500;
  color: #4d4d4d;
  cursor: pointer;
  z-index: 199;
  span {
    vertical-align: middle;
    margin: 0 8px;
  }
  .en-add,
  .en-cut,
  .en-add-disabled,
  .en-cut-disabled {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin: 0;
  }
  .en-cut-disabled {
    @include bg("../../../assets/creator/editor/en-re-d.svg");
  }
  .en-add-disabled {
    @include bg("../../../assets/creator/editor/en-a-d.svg");
  }
  .en-add {
    @include bg("../../../assets/creator/editor/en-a-n.svg");
  }
  .en-add:hover {
    @include bg("../../../assets/creator/editor/en-a-h.svg");
  }
  .en-cut {
    @include bg("../../../assets/creator/editor/en-re-n.svg");
  }
  .en-cut:hover {
    @include bg("../../../assets/creator/editor/en-re-h.svg");
  }
}
</style>
