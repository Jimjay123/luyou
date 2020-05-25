<!--
 * @Descripttion: 
 * @version: 
 * @Author: pengwanchong
 * @Date: 2019-10-21 10:33:09
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-10-24 09:27:56
 -->
<template>
  <div class="PictureUpload" :style="bgBgc">
    <div class="content" @click.stop>
      <div class="boxx">
        <div
          v-if="loadingStatus===1"
          :class="['box clearfix', mousebox == 1 ?'mouse-box':'']"
          @dragover="mouseEnterFun"
          @drop="mouseEnterFun"
          @dragenter="mouseMigrationFun"
          @dragleave="mouseRemovalFun"
          @click="clickFun"
        >
          <img :src="require('../../../assets/creator/upload.svg')" alt />
          <p class="p1">拖拽图片到此区域也可上传</p>

          <a @click.stop="clickFun" class="btn" href="javascript:;">上传文件</a>
          <input ref="filElem" type="file" @change="uploadFiles" hidden accept="image/*" />
        </div>

        <!--上传中 start-->
        <div v-else-if="loadingStatus===2">
          <div class="upload-item">
            <div class="right">
              <div class="box clearfix">
                <img :src="require('../../../assets/creator/upload.svg')" alt />
                <p class="p1">拖拽图片到此区域也可上传</p>
              </div>
              <!--上传中  start-->
              <div class="upload-info">
                <div class="u-info clearfix">
                  <span class="u-1">努力上传中…</span>
                  <div class="complete">
                    已完成：
                    <span>{{file.comPercentage+'%'}}</span>
                  </div>
                </div>
                <div class="progress">
                  <div :style="{'width':file.comPercentage+'%'}"></div>
                </div>
              </div>
              <!--上传中  end-->
            </div>
          </div>
        </div>
        <!--上传中 end-->

        <!--上传完成 start-->
        <div v-else>
          <div class="upload-item">
            <div class="right">
              <div class="name-box">
                <img class="name" :src="courseServerUrl" :style="bgStyle" />
                <a class="replace-box" @click="clickFun" href="javascript:;">
                  <input ref="filElem" type="file" @change="uploadFiles" hidden accept="image/*" />
                  <span>替换图片</span>
                </a>
                <div class="clearfix del-box">
                  <div class="icon-box del" @click="delFun()"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--上传完成 end-->
      </div>
    </div>
    <div class="PictureText">
      <div :class="['word-box',positionVal==''?'middle-center':positionVal]">
        <div class="input" @click="showInput">
          <ResizeTextarea
            class="text-word textarea"
            type="textarea"
            :style-obj="{'text-align':selAlignVal==''?'left':selAlignVal,'color':fontColor|| '#4D4D4D'}"
            placeholder="点击输入文本"
            rows="14"
            :autosize="{ minRows: 1, maxRows: 14 }"
            @input="inputFun"
            :value="text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";

import {
  cloneObj,
  tipsFail,
  tipsMsg,
  fileSizeFun,
  trimTime
} from "../../../utils/utils";
import { State, Action, namespace } from "vuex-class";
import { changeCouUpdPageContentFun } from "../../../service/editor/editorAction";
const CreatorMod = namespace("creator");
const EditMod = namespace("edit");
import {
  physicalDelete,
  putFileCourseImageUpload
} from "../../../service/creatorApi";
import { ImageDeleteCourseImages } from "../../../service/creatorApi";
import CloseDailog from "../closeDailog";
// import PictureText from "./PictureText";
import ResizeTextarea from "../component/resizeTextarea";
@Component({
  name: "UploadFile",
  components: {
    CloseDailog,
    ResizeTextarea
  }
})
export default class UploadFile extends Vue {
  @CreatorMod.State("uploadFileShow") uploadFileShow; //上传文件弹框显示隐藏
  @CreatorMod.Action("uploadFileShowHandle") uploadFileShowHandle; //上传文件弹框显示隐藏  action修改方法

  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("positionVal") positionVal; //文本对齐位置
  @EditMod.Action("positionValHandle") positionValHandle; //文本对齐位置  action修改方法

  @Prop({
    require: false,
    default: null
  })
  index;

  get ShowIndex() {
    return this.index !== null ? this.index : this.editIndex;
  }

  //文字 背景
  get rightType() {
    return this.editList[this.ShowIndex].rightNav.rightType;
  }

  //文字颜色
  get fontColor() {
    return this.editList[this.ShowIndex].rightNav.fontColor;
  }

  // 背景颜色
  get bgColor() {
    return this.editList[this.ShowIndex].rightNav.bgColor;
  }

  //背景图片数据
  get bgImgList() {
    return this.editList[this.ShowIndex].rightNav.bgImgList;
  }

  //背景图片选中项
  get bgImg() {
    return this.editList[this.ShowIndex].rightNav.bgImg;
  }

  //对齐方式
  get selAlignVal() {
    return this.editList[this.ShowIndex].rightNav.selAlignVal;
  }

  // 文本文字
  get text() {
    return this.editList[this.ShowIndex].leftSket.title;
  }

  // //配图选中项
  // get layOutVal() {
  //   return this.editList[this.ShowIndex].rightNav.layOutVal;
  // }

  //上传-状态选中项
  get loadingStatus() {
    return this.editList[this.ShowIndex].leftSket.loadingStatus || 1;
  }

  //上传-配图选中项
  get courseServerUrl() {
    return this.editList[this.ShowIndex].leftSket.courseServerUrl;
  }

  get bgStyle() {
    let layOutVal = this.editList[this.ShowIndex].rightNav.layOutVal;
    let obj = {};
    obj = {
      "background-image": 'url("' + layOutVal.src + '")',
      "background-repeat": "no-repeat",
      "background-position": "center center",
      "background-size": "cover"
    };
    return obj;
  }

  //背景计算属性
  get bgBgc() {
    let {
      bgColor, //背景颜色
      bgImg //背景图片
    } = this.editList[this.ShowIndex].rightNav;
    let obj = {};
    if (bgColor && !bgImg) {
      obj = {
        background: bgColor
      };
    } else if (!bgColor && bgImg) {
      obj = {
        "background-image": 'url("' + bgImg.src + '")',
        "background-repeat": "no-repeat",
        "background-position": "center center",
        "background-size": "cover"
      };
    }
    return obj;
  }

  @Prop({
    default: null,
    required: false
  })
  cbFun;

  file = {
    file: "", //文件本身
    name: "文件名称",
    uploadedSize: "11.2", //已上传文件 大小
    fileSize: "119.2", //文件总大小
    speed: "833", //当前文件上传速度
    remainTime: "2.5", //剩余时间
    comPercentage: "40" //已完成百分比
  }; //上传文件内容
  cancel = null; //文件上传取消
  courseInfo = {
    courseId: "",
    courseType: ""
  };
  // courseServerUrl = ""; //上传文件预览第三方
  attachId = ""; //上传图片的id
  closeShow = false; //关闭弹框

  @Emit cbFunction(type, val) {
    if (typeof this.cbFun === "function") {
      this.cbFun(type, val);
    }
  }

  mousebox = "";

  elemetnNode = ""; //最后一次节点

  //点击事件
  @Emit clickFun() {
    this.uploadStart = true;
    this.$refs.filElem.click();
  }

  //上传文件点击事件
  @Emit uploadFiles() {
    let files = this.$refs.filElem.files[0];
    this.$refs.filElem.value = "";
    if (files) {
      this.setUpFiles(files);
    }
  }

  //鼠标移入触发
  @Emit mouseEnterFun(e) {
    e.preventDefault(); //阻止拖放后的浏览器默认行为
    if (event.type === "drop") {
      console.log("拖拽触发--获取文件");
      let file = event.dataTransfer.files[0];
      this.setUpFiles(file);
    }
  }

  // 鼠标拖拽移入触发
  @Emit mouseMigrationFun(e) {
    console.log(1);
    this.elemetnNode = e.target;
    this.mousebox = 1;
  }

  // 鼠标拖拽移出触发
  @Emit mouseRemovalFun(e) {
    if (this.elemetnNode === e.target) {
      this.mousebox = "";
    }
  }

  //计算文件大小
  @Emit fileSizeFunction(val) {
    return fileSizeFun(val);
  }

  //计算剩余时间
  @Emit trimTimeF(val) {
    return trimTime(val);
  }

  //发送文件
  @Emit setUpFiles(file) {
    let typeList = file.name.split(".");
    let type = typeList[typeList.length - 1];
    if (
      !(
        type === "bmp" ||
        type === "jpg" ||
        type === "png" ||
        type === "tif" ||
        type === "gif" ||
        type === "pcx" ||
        type === "tga" ||
        type === "exif" ||
        type === "fpx" ||
        type === "svg" ||
        type === "psd" ||
        type === "cdr" ||
        type === "pcd" ||
        type === "dxf" ||
        type === "ufo" ||
        type === "eps" ||
        type === "ai" ||
        type === "raw" ||
        type === "WMF" ||
        type === "webp" ||
        type === "jpeg"
      )
    ) {
      tipsMsg("上传文件格式错误");
      return;
    }
    let fileData = {};
    fileData = {
      file: file, //文件本身
      name: file.name,
      uploadedSize: "0", //已上传文件 大小
      fileSize: file.fileSize, //文件总大小
      speed: "0", //当前文件上传速度
      remainTime: "0", //剩余时间
      comPercentage: "0" //已完成百分比
    }; //上传文件内容
    this.file = fileData;
    let editList = cloneObj(this.editList);
    editList[this.editIndex].leftSket.loadingStatus = 2;
    this.editListHandle({
      editList
    });
    let data = new FormData();
    let courseId = this.$route.query.courseId;
    data.append("file", file);
    data.append("courseId", courseId);
    // data.append("pageId", this.editList[this.ShowIndex].pageId);
    //调用上传文件接口
    putFileCourseImageUpload(
      data,
      progressEvent => {
        let loaded = progressEvent.loaded;
        let total = progressEvent.total;
        let fileData = cloneObj(this.file);
        fileData.speed = parseInt(loaded - fileData.uploadedSize); //当前文件上传速度
        fileData.uploadedSize = loaded; ////已上传文件 大小
        fileData.fileSize = total; //文件总大小
        fileData.comPercentage = parseInt((loaded / total) * 100); //已完成百分比
        fileData.remainTime = parseInt((total - loaded) / fileData.speed); //剩余时间
        this.file = fileData;
      },
      //上传接口取消方法
      cancel => {
        this.cancel = cancel;
      }
    ).then(res => {
      if (res.code == 0) {
        this.courseInfo = res.data;
        this.cbFunction("uploadSuccess", "");
        this.attachId = res.data.attachId;
        let editList = cloneObj(this.editList);
        editList[this.editIndex].leftSket.loadingStatus = 3;
        editList[this.editIndex].leftSket.courseServerUrl = res.data.webUrl;
        editList[this.editIndex].imageServerUrl = res.data.webUrl;
        editList[this.editIndex].imageAttachId = this.attachId;
        this.editListHandle({
          editList
        });

        changeCouUpdPageContentFun({
          pageList: editList
        });
      } else {
        tipsFail(res.msg);
        let fileData = {};
        fileData = {
          file: "", //文件本身
          name: "",
          uploadedSize: "0", //已上传文件 大小
          fileSize: file.fileSize, //文件总大小
          speed: "0", //当前文件上传速度
          remainTime: "0", //剩余时间
          comPercentage: "0" //已完成百分比
        }; //上传文件内容
        this.file = fileData;
        editList[this.editIndex].leftSket.loadingStatus = 1; //加载状态 1没有任何上传文件  2上传中  3上传完成
      }
    });
  }

  //删除 回调方法    upload 上传中删除  uploaded 上传完成删除
  @Emit delFun() {
    this.mousebox = "";
    let attachId = this.editList[this.ShowIndex].imageAttachId;
    let pageContentRelId = this.editList[this.ShowIndex].pageContentRelId;
    ImageDeleteCourseImages({
      attachIdsStr: attachId,
      pageContentRelId: pageContentRelId
    }).then(res => {
      if (res.code == 0) {
        this.mousebox = "";
        let editList = cloneObj(this.editList);
        editList[this.editIndex].leftSket.loadingStatus = 1;
        editList[this.editIndex].leftSket.courseServerUrl = "";
        editList[this.editIndex].rightNav.uploadImg = "";
        editList[this.editIndex].imageServerUrl = "";
        this.editListHandle({
          editList
        });
        changeCouUpdPageContentFun({
          pageList: editList
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  textShow = 1; //显示默认
  textValue = ""; //输入框绑定数据

  @Emit showInput() {
    this.textShow = 2;
  }

  //输入框改变事件
  inputFun() {
    let editList = cloneObj(this.editList);
    editList[this.editIndex].leftSket.title = event.target.value;
    editList[this.editIndex].text = event.target.value;
    this.editListHandle({
      editList
    });
    let obj = this.editList[this.editIndex];
    clearTimeout(this.timer);
    //输入框改变延迟300ms后向后台发送数据
    this.timer = setTimeout(() => {
      changeCouUpdPageContentFun({
        pageList: editList
      });
    }, 300);
  }

  created() {}
  updated() {}
}
</script>

<style lang="scss" scoped>
.PictureUpload {
  width: 100%;
  height: 570px;
  padding: 64px;
}
@mixin posAbs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}

.content {
  width: 345px;
  height: 345px;
  background: url(../../../assets/creator/dashed.svg);
  margin-top: 49px;
  float: left;
  .closeBtn {
    cursor: pointer;
    width: 36px;
    height: 36px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  h3 {
    margin-bottom: 22px;
    @include fontSet(14px, #999, 400);
    span {
      @include fontSet(22px, #333, 600);
      margin-right: 12px;
    }
  }
  .boxx {
    width: 345px;
    height: 345px;
    float: left;
    // position: absolute;
    // top: 113px;
    // left: 64px;
    .box {
      border-radius: 14px;
      text-align: center;
      img {
        margin-top: 124px;
        width: 67px;
        height: 51px;
      }
      .p1 {
        @include fontSet(18px, rgba(153, 153, 153, 0.4), 500);
        margin-top: 28px;
      }
      .p2 {
        margin-top: 4px;
        @include fontSet(12px, #999, normal);
        span {
          color: #fe7865;
        }
      }
      .btn {
        display: inline-block;
        width: 176px;
        height: 35px;
        background: rgba(255, 255, 255, 0.01);
        border-radius: 6px;
        border: 1px solid rgba(230, 230, 230, 1);
        @include fontSet(12px, rgba(102, 102, 102, 1), 500);
        margin-top: 34px;
        margin-bottom: 55px;
        line-height: 35px;
      }
    }
  }
  .bo {
    border-radius: 14px;
    float: left;
    position: relative;
    z-index: 21;
    .right {
      flex-grow: 1;
      width: 345px;
      height: 345px;

      .name-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        position: relative;
        .del-box {
          display: none;
          position: absolute;
          right: 10px;
          top: 10px;
        }
        .replace-box {
          display: none;
          position: absolute;
          right: 40px;
          top: 10px;
          width: 62px;
          height: 24px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          text-align: center;
          line-height: 24px;
          span {
            @include fontSet(12px, rgba(255, 255, 255, 1), 400);
          }
        }
        .icon-box {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        .del {
          @include bg("../../../assets/creator/delete.svg");
        }
        .suspend {
          @include bg("../../../assets/creator/suspend.svg");
        }
        .preview {
          @include bg("../../../assets/creator/preview.svg");
        }
      }

      .upload-info {
        padding: 0 32px 0 32px;
        @include fontSet(12px, #999, 400);
        margin-top: 57px;
        .u-info {
          height: 24px;
          span {
            display: inline-block;
          }
          .u-1 {
            min-width: 180px;
          }
          .complete {
            float: right;
            span {
              margin-right: 0;
              color: #fe7865;
            }
          }
        }
        .progress {
          width: 100%;
          height: 5px;
          background: rgba(242, 242, 242, 1);
          border-radius: 3px;
          div {
            width: 30%;
            height: 5px;
            background: linear-gradient(
              90deg,
              rgba(255, 176, 158, 1) 0%,
              rgba(254, 120, 101, 1) 100%
            );
            border-radius: 3px;
          }
          .completed {
            width: 100%;
            background: linear-gradient(
              90deg,
              rgba(36, 204, 184, 0.5) 0%,
              rgba(36, 204, 184, 1) 100%
            );
          }
        }
      }
    }
    .right:hover {
      cursor: pointer;
      .name-box {
        .del-box {
          display: block;
        }
        .replace-box {
          display: block;
        }
      }
    }
  }
  .upload-item {
    background: rgba(254, 120, 101, 0.02);
    border-radius: 14px;
    display: flex;
    align-items: center;
    width: 345px;
    height: 345px;
    .course-type {
      width: 34px;
      height: 40px;
      margin-right: 28px;
    }
    .right {
      width: 345px;
      height: 345px;
      flex-grow: 1;
      border-radius: 14px;
      .name-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        position: relative;
        width: 345px;
        height: 345px;

        .del-box {
          display: none;
          position: absolute;
          right: 10px;
          top: 10px;
        }
        .replace-box {
          display: none;
          position: absolute;
          right: 40px;
          top: 10px;
          width: 62px;
          height: 24px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          text-align: center;
          line-height: 24px;
          span {
            @include fontSet(12px, rgba(255, 255, 255, 1), 400);
          }
        }
        .name {
          width: 345px;
          height: 345px;
          @include fontSet(18px, #4d4d4d, 500);
          border-radius: 14px;
        }
        .icon-box {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        .del {
          @include bg("../../../assets/creator/delete.svg");
        }
        .suspend {
          @include bg("../../../assets/creator/suspend.svg");
        }
        .preview {
          @include bg("../../../assets/creator/preview.svg");
        }
      }

      .upload-info {
        padding: 0 32px 0 32px;
        @include fontSet(12px, #999, 400);
        margin-top: 57px;
        .u-info {
          height: 24px;
          span {
            display: inline-block;
          }
          .u-1 {
            min-width: 180px;
          }
          .complete {
            float: right;
            span {
              margin-right: 0;
              color: #fe7865;
            }
          }
        }
        .progress {
          width: 100%;
          height: 5px;
          background: rgba(242, 242, 242, 1);
          border-radius: 3px;
          div {
            width: 30%;
            height: 5px;
            background: linear-gradient(
              90deg,
              rgba(255, 176, 158, 1) 0%,
              rgba(254, 120, 101, 1) 100%
            );
            border-radius: 3px;
          }
          .completed {
            width: 100%;
            background: linear-gradient(
              90deg,
              rgba(36, 204, 184, 0.5) 0%,
              rgba(36, 204, 184, 1) 100%
            );
          }
        }
      }
    }
    .right:hover {
      cursor: pointer;
      .name-box {
        .del-box {
          display: block;
        }
        .replace-box {
          display: block;
        }
      }
    }
  }
  .mouse-box {
    background: rgba(254, 120, 101, 0.01);
  }
}
.PictureText {
  width: 457px;
  height: 443px;
  float: left;
  margin-left: 65px;
  .word-box {
    width: 457px;
    height: 443px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    color: rgba(77, 77, 77, 1);
    line-height: 32px;
    overflow: hidden;
    text-align: left !important;
    .input {
      width: 457px;
      height: 443px;
      flex-wrap: wrap;
      display: flex;
      align-items: center;
      position: relative;
      .text-word {
        height: 100%;
        border: none;
        width: 100%;
        overflow: hidden;
        resize: none;
      }
      .text-input {
        height: 100%;
        border: none;
        width: 100%;
        overflow: hidden;
        resize: none;
        border: 1px dashed rgba(77, 77, 77, 1);
      }
    }
  }
  .text-word /deep/ {
    textarea {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      width: 457px;
      height: 443px;
      font-size: 18px;
      border: none;
      background: none;
      resize: none;
      overflow: hidden;
    }
    textarea::placeholder {
      font-size: 18px;
      color: #4d4d4d;
    }
    textarea::after {
      border: 1px dashed rgba(77, 77, 77, 1);
    }
  }
}
</style>
