/**

* Created by wangxin

* @date 2019/10/10 18:33

*/
<template>
  <div class="page-thum">
    <ul id="thumBox" class="ul-box clearfix">
      <li
        :class="{item:true,'active':editIndex===index?true:false}"
        v-for="(item,index) in editList"
        :key="index"
        @click="selectSketFun(index)"
        style="overflow: hidden;"
      >
        <PptTemplate class="scale br64">
          <!--标题画板 start-->
          <TitleSket class="br64" v-if="item.type==='title'" :index="index" />
          <!--标题画板 end-->

          <!-- 图+文 start -->
          <PictureUpload class="br64" v-else-if="item.type==='imageText'" :index="index" />
          <!-- 图+文 end -->

          <!-- 图+文 start -->
          <ImageUpload class="br64" v-else-if="item.type==='image'" :index="index" />
          <!-- 图+文 end -->

          <!-- 文档编辑 start-->
          <TextIntroduce class="br64" v-else-if="item.type==='text'" :index="index" />
          <!-- 文档编辑 end-->

          <!--选择题画板 start-->
          <ChoiceQuestionSket class="br64" v-else-if="item.type==='choiceQuestion'" :index="index" />
          <!--选择题画板 end-->

          <!-- 文档上传 start -->
          <DocUpload class="br64" v-else-if="item.type==='file'" :index="index" />
          <!-- 文档上传 end -->

          <!-- 视频上传 start-->
          <VideoUpload class="br64" v-else-if="item.type==='video'" :index="index" />
          <!-- 视频上传 end-->
        </PptTemplate>
        <div class="mask" v-if="item.type!=='title'">
          <div class="copy" @click.stop="copySketFun(index)">
            <div class="tips">
              复制
              <span class="line"></span>
            </div>
          </div>
          <div class="del" @click.stop="delSketFun(index)">
            <div class="tips">
              删除
              <span class="line"></span>
            </div>
          </div>
        </div>
      </li>
      <!--<li class="item add" @click="addClick">
        <img :src="require('../../../assets/creator/editor/thum-add.svg')" alt />
        <div class="tips">
          插入新页面
          <span class="line"></span>
        </div>
        <div class="add-type" v-if="addShow" v-Clickoutside="addOutClick">
          <span class="line"></span>
          <ul class="add-new">
            <li v-for="(item,index) in typeList" :key="index" @click.stop="addSketFun(item)">
              <img class="normal" :src="item.normal" alt />
              <img class="hover" :src="item.hover" alt />
              <p>{{item.title}}</p>
            </li>
          </ul>
        </div>
      </li>-->
    </ul>
    <div class="item add add-btn" @click="addClick">
      <img :src="require('../../../assets/creator/editor/thum-add.svg')" alt />
      <div class="tips">
        插入新页面
        <span class="line"></span>
      </div>
      <div class="add-type" v-if="addShow" v-Clickoutside="addOutClick">
        <span class="line"></span>
        <ul class="add-new">
          <li v-for="(item,index) in typeList" :key="index" @click.stop="addSketFun(item)">
            <img class="normal" :src="item.normal" alt />
            <img class="hover" :src="item.hover" alt />
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import TitleSket from "./titleSket";
import TextIntroduce from "./textIntroduce";
import PictureUpload from "./PictureUpload";
import ImageUpload from "./imageUpload";
import PptTemplate from "./pptTemplate";
import DocUpload from "./docUpload";
import VideoUpload from "./videoUpload";
import ChoiceQuestionSket from "./choiceQuestionSket";
import {
  editAddNewPageFun,
  delCouConLogPageFun,
  copyEditFormPageFun,
  changeCouUpdPageContentFun
} from "../../../service/editor/editorAction";
import { Action, State, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";

const EditMod = namespace("edit");
@Component({
  name: "BottomThum",
  directives: {
    Clickoutside
  },
  components: {
    TitleSket,
    TextIntroduce,
    PictureUpload,
    PptTemplate,
    DocUpload,
    VideoUpload,
    ChoiceQuestionSket,
    ImageUpload
  }
})
export default class BottomThum extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  addShow = false;

  typeList = [
    {
      type: "text", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      normal: require("../../../assets/creator/typeList/text-n.svg"),
      hover: require("../../../assets/creator/typeList/text-h.svg"),
      title: "文本",
      obj: {
        type: "text", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
        leftSket: {
          title: ""
        }, //左侧画板内容
        rightNav: {
          fontColor: null, //文字颜色
          bgColor: null, //背景颜色
          bgImg: "", //背景图片
          rightType: "背景", // 文字  背景
          selAlignVal: "", //对其方式
          selPositionVal: "" //位置
        } //右侧功能栏内容
      }
    },
    {
      type: "imageText", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      normal: require("../../../assets/creator/typeList/imageText-n.svg"),
      hover: require("../../../assets/creator/typeList/imageText-h.svg"),
      title: "图文",
      obj: {
        type: "imageText", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
        leftSket: {}, //左侧画板内容
        rightNav: {
          fontColor: null, //文字颜色
          bgColor: null, //背景颜色
          bgImg: "", //背景图片
          uploadImg: "", //上传文件背景图片
          rightType: "背景", // 文字  背景
          selAlignVal: "", //对其方式
          selPositionVal: "", //位置
          layOutVal: "" //配图选中项
        } //右侧功能栏内容
      }
    },
    {
      type: "image", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      normal: require("../../../assets/creator/typeList/img-n.svg"),
      hover: require("../../../assets/creator/typeList/img-h.svg"),
      title: "图片",
      obj: {
        type: "image", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
        leftSket: {
          uploadImg: "画板状态",
          loadingStatus: 1,
          courseServerUrl: "这是画板上传的图片"
        }, //左侧画板内容
        rightNav: {} //右侧功能栏内容
      }
    },
    {
      type: "video", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      normal: require("../../../assets/creator/typeList/video-n.svg"),
      hover: require("../../../assets/creator/typeList/video-h.svg"),
      title: "视频",
      obj: {
        type: "video", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
        leftSket: {
          uploadStatus: "", //文件上传状态
          name: "", //视频名称
          time: "", //视频时长
          size: "" //视频大小
        }, //左侧画板内容
        rightNav: {} //右侧功能栏内容
      }
    },
    {
      type: "file", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      normal: require("../../../assets/creator/typeList/file-n.svg"),
      hover: require("../../../assets/creator/typeList/file-h.svg"),
      title: "文档",
      obj: {
        type: "file", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
        leftSket: {
          uploadStatus: "", //文件上传状态
          name: "", //文档名称
          size: "" //文件大小
        }, //左侧画板内容
        rightNav: {} //右侧功能栏内容
      }
    },
    {
      type: "choiceQuestion", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      normal: require("../../../assets/creator/typeList/choiceQuestion-n.svg"),
      hover: require("../../../assets/creator/typeList/choiceQuestion-h.svg"),
      title: "选择题",
      obj: {
        type: "choiceQuestion", //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
        courseQuizQuestion: {
          courseQuizChoicesList: [
            {
              choice: "",
              correctFlag: false
            },
            {
              choice: "",
              correctFlag: false
            }
          ],
          question: ""
        },
        leftSket: {
          title: "", //选择题问题
          answer: [
            {
              answer: "", //选项内容
              select: true //当前项是否是正确答案
            },
            {
              answer: "", //选项内容
              select: false //当前项是否是正确答案
            }
          ] //选择题答案
        }, //左侧画板内容
        rightNav: {
          bgColor: null, //背景颜色
          bgImg: "" //背景图片
        } //右侧功能栏内容
      }
    }
  ];

  //新增点击事件
  addClick() {
    this.addShow = true;
  }

  //点击元素以外其他区域
  addOutClick() {
    this.addShow = false;
  }

  typeTransText = {
    1: "text",
    2: "imageText",
    3: "video",
    4: "file",
    5: "choiceQuestion",
    6: "image",
    7: "title"
  };

  typeTransNum = {
    text: 1,
    imageText: 2,
    video: 3,
    file: 4,
    choiceQuestion: 5,
    image: 6,
    title: 7
  };

  //点击新增画板
  addSketFun(item) {
    this.addShow = false;
    let editList = cloneObj(this.editList);
    let len = editList.length;
    item.obj.pageType = this.typeTransNum[item.type];
    item.obj.delFlag = false;
    editList.push(item.obj);
    this.editListHandle({
      editList
    });
    this.editIndexHandle({
      editIndex: len
    });
    //调用新增画板接口
    changeCouUpdPageContentFun({
      pageList: editList
    });

    this.$nextTick(() => {
      $("#thumBox").scrollLeft($("#thumBox")[0].scrollWidth);
    });
  }

  //删除画板
  delSketFun(index) {
    let editList = cloneObj(this.editList);
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
      pageList: editList
    });
  }

  //复制画板
  copySketFun(index) {
    let editList = cloneObj(this.editList);
    let len = editList.length;
    let obj = cloneObj(editList[index]);
    editList.push(obj);
    this.editListHandle({
      editList
    });
    this.editIndexHandle({
      editIndex: len
    });
    changeCouUpdPageContentFun({
      pageList: editList
    }); //复制成功
  }

  //选中画板
  selectSketFun(index) {
    this.editIndexHandle({
      editIndex: index
    });
  }
}
</script>

<style lang="scss" scoped>
@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
.item .scale {
  transform: scale(0.0924);
  background: rgb(51, 51, 51);
  width: 996px;
  height: 570px;
  position: absolute;
  top: -258px;
  left: -452px;
  border-radius: 43px;
}
.item .br64 {
  border-radius: 43px;
}
.scale /deep/ {
  .pptTemplate {
    border-radius: 43px;
  }
}
.page-thum {
  width: calc(100% - 198px);
  height: 90px;
  background: #f0f0f0;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 12px 24px;
  z-index: 200;
  ul.ul-box {
    display: inline-block;
    vertical-align: middle;
    max-width: calc(100% - 103px);
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px 4px;
  }
  div.add-btn {
    vertical-align: top;
    margin-right: 0;
    margin-top: 4px;
    box-shadow: 0px 2px 10px 0px rgba(254, 120, 101, 0.7);
    border-radius: 4px;
  }
  .item {
    display: inline-block;
    width: 92px;
    height: 53px;
    box-shadow: 0px 2px 4px 0px rgba(204, 204, 204, 1);
    border-radius: 4px;
    background: #fff;
    margin-right: 10px;
    position: relative;
    vertical-align: middle;
    &:hover {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(254, 120, 101, 0.7),
        0px 0px 0px 2px rgba(254, 120, 101, 1);
      border-radius: 4px;
    }
  }
  .active,
  .active:hover {
    box-shadow: 0px 2px 10px 0px rgba(254, 120, 101, 0.7),
      0px 0px 0px 2px rgba(254, 120, 101, 1);
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:hover {
      .copy,
      .del {
        display: block;
      }
    }
  }
  .copy,
  .del {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 4px;
    width: 20px;
    height: 20px;
  }
  .copy {
    left: 4px;
    @include bg("../../../assets/creator/editor/thum-copy.svg");
    &:hover {
      .tips {
        display: block;
      }
    }
  }
  .del {
    right: 4px;
    @include bg("../../../assets/creator/editor/thum-del.svg");
    &:hover {
      .tips {
        display: block;
      }
    }
  }
  .tips {
    display: none;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2px 8px;
    font-size: 12px;
    color: #fff;
    background: rgba(51, 51, 51, 0.6);
    min-width: 40px;
    border-radius: 4px;
    .line {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translate(-50%, -50%);
      border-width: 4px;
      border-style: solid;
      border-color: rgba(51, 51, 51, 0.6) transparent transparent transparent;
    }
  }
  .add {
    text-align: center;
    cursor: pointer;
    img {
      margin-top: 15px;
    }
    &:hover {
      .tips {
        min-width: 78px;
        display: block;
      }
    }
  }
}
.add-type {
  position: absolute;
  top: -89px;
  left: -25px;
  transform: translate(0, -50%);
  width: 238px;
  height: 156px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  padding: 13px 17px;
  border-radius: 6px;
  .line {
    position: absolute;
    bottom: -16px;
    left: 63px;
    border-width: 8px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
}
.add-type .add-new {
  li {
    float: left;
    margin-right: 12px;
    img {
      width: 60px;
      height: 40px;
      margin-top: 0;
    }
    p {
      font-size: 12px;
      color: #666;
      font-weight: 500;
      text-align: center;
    }
    .hover {
      display: none;
    }
    &:hover {
      .normal {
        display: none;
      }
      .hover {
        display: block;
      }
    }
  }
  li:nth-child(3n) {
    margin-right: 0;
  }
  li:nth-child(n + 4) {
    margin-top: 10px;
  }
}
</style>
