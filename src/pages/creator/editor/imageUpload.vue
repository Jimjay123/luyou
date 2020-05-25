<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-10-15 11:16:22
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-10-24 09:34:26
 -->
<template>
  <div class="imageUpload">
    <div class="content" @click.stop>
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
        <p class="p2">
          支持导入
          <span>webp、bmp、jpg、png、tif、gif</span>
        </p>
        <a @click.stop="clickFun" class="btn" href="javascript:;">上传图片</a>
        <!-- <input ref="filElem" type="file" @change="uploadFiles" hidden accept="image/*" /> -->
      </div>

      <!--上传中 start-->
      <div v-else-if="loadingStatus===2">
        <p class="loading-box">
          <i class="icon-loading"></i>
        </p>
        <p class="loading-tips">努力上传中，切勿离开当前页喔…</p>
        <div class="upload-items">
          <img class="course-type" src="../../../assets/creator/Picture.svg" alt />
          <div class="right">
            <div class="name-box">
              <div class="name">{{file.name}}</div>
              <div class="clearfix del-box">
                <div class="icon-box del" @click="delFun('upload')">
                  <div class="tips">
                    <span></span>
                  </div>
                </div>
                <div class="icon-box suspend" v-if="0">
                  <div class="tips">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <!--上传中  start-->
            <div class="upload-info">
              <div class="u-info clearfix">
                <span
                  class="u-1"
                >已经上传：{{fileSizeFunction(file.uploadedSize)}}/{{fileSizeFunction(file.fileSize)}}</span>
                <span class="u-2">当前速度：{{fileSizeFunction(file.speed)}}</span>
                <span class="u-3">剩余时间：{{trimTimeF(file.remainTime)}}</span>
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
              <img class="name" :src="courseServerUrl" />
              <a class="replace-box" @click="clickFun" href="javascript:;">
                <!-- <input ref="filElem" type="file" @change="uploadFiles" hidden accept="image/*" /> -->
                <span>替换图片</span>
              </a>
              <div class="clearfix del-box">
                <div class="icon-box del" @click="delFun()" id="delimage"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--上传完成 end-->
      <input
        :id="index == null ? 'filElem' : ''"
        ref="filElem"
        type="file"
        @change="uploadFiles"
        hidden
      />
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
@Component({
  name: "imageUpload",
  components: {
    CloseDailog
  }
})
export default class imageUpload extends Vue {
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

  //上传-状态选中项
  get loadingStatus() {
    return this.editList[this.ShowIndex].leftSket.loadingStatus || 1;
  }

  //文件上出状态 normal uploading 上传中 uploaded 上传完成
  get uploadStatus() {
    return this.editList[this.editIndex].leftSket.uploadStatus || "";
  }

  //上传-配图选中项
  get courseServerUrl() {
    return this.editList[this.ShowIndex].leftSket.courseServerUrl;
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

  mousebox = "";

  elemetnNode = ""; //最后一次节点

  @Emit cbFunction(type, val) {
    if (typeof this.cbFun === "function") {
      this.cbFun(type, val);
    }
  }

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

  @Emit mouseMigrationFun(e) {
    this.elemetnNode = e.target;
    this.mousebox = 1;
  }

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
    data.append("pageId", this.editList[this.ShowIndex].pageId);
    //调用上传视频接口
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
        editList[this.editIndex].leftSket.uploadStatus = "uploaded";
        editList[this.editIndex].imageServerUrl = res.data.webUrl;
        this.editListHandle({
          editList
        });
        console.log(editList);

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
        let editList = cloneObj(this.editList);
        editList[this.editIndex].leftSket.loadingStatus = 1;
        this.editListHandle({
          editList
        });
      }
    });
  }

  //删除 回调方法    upload 上传中删除  uploaded 上传完成删除
  @Emit delFun(type) {
    if (type === "upload") {
      let fileData = {};
      fileData = {
        file: "", //文件本身
        name: "",
        uploadedSize: "0", //已上传文件 大小
        fileSize: "", //文件总大小
        speed: "0", //当前文件上传速度
        remainTime: "0", //剩余时间
        comPercentage: "0" //已完成百分比
      }; //上传文件内容
      this.file = fileData;

      this.mousebox = "";
      let editList = cloneObj(this.editList);
      editList[this.editIndex].leftSket.loadingStatus = 1;
      this.editListHandle({
        editList
      });
      this.cancel({ code: 200, message: "主动取消上传" }); //取消接口上传
    } else {
      let attachId = this.editList[this.ShowIndex].imageAttachId;
      let pageContentRelId = this.editList[this.ShowIndex].pageContentRelId;
      ImageDeleteCourseImages({
        attachIdsStr: attachId,
        pageContentRelId: pageContentRelId
      }).then(res => {
        if (res.code == 0) {
          let fileData = {};
          fileData = {
            file: "", //文件本身
            name: "",
            uploadedSize: "0", //已上传文件 大小
            fileSize: "", //文件总大小
            speed: "0", //当前文件上传速度
            remainTime: "0", //剩余时间
            comPercentage: "0" //已完成百分比
          }; //上传文件内容
          this.file = fileData;

          this.mousebox = "";
          let editList = cloneObj(this.editList);
          editList[this.editIndex].leftSket.loadingStatus = 1;
          editList[this.editIndex].leftSket.uploadStatus = "uploading";
          editList[this.editIndex].leftSket.courseServerUrl = "";
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
  }

  created() {}
  updated() {
    console.log(this.courseServerUrl);
  }
}
</script>

<style lang="scss" scoped>
.imageUpload {
  width: 100%;
  height: 570px;
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
  background: rgba(255, 255, 255, 1);
  // border-radius: 13px;
  overflow: hidden;
  position: relative;
  .box {
    width: 868px;
    height: 442px;
    // border-radius: 14px;
    border: 1px dashed rgba(204, 204, 204, 1);
    text-align: center;
    margin: 0 auto;
    margin-top: 64px;
    img {
      margin-top: 144px;
      width: 64px;
      height: 49px;
    }
    .p1 {
      @include fontSet(14px, #666, 500);
      margin-top: 26px;
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
      width: 134px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 22px;
      @include fontSet(18px, #fff, 500);
      margin-top: 65px;
    }
  }
  .box:hover {
    background: rgba(254, 120, 101, 0.01);
    border: 1px dashed rgba(254, 120, 101, 0.5);
  }
  .upload-items {
    width: 886px;
    background: rgba(254, 120, 101, 0.02);
    border-radius: 14px;
    display: flex;
    height: 105px;
    margin: 0 auto;
    margin-top: 96px;
    .course-type {
      width: 34px;
      height: 40px;
      margin-left: 28px;
      margin-top: 36px;
    }
    .right {
      flex-grow: 1;
      .name-box {
        // margin-top: 57px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        position: relative;
        padding: 0 32px 0 32px;
        margin-top: 18px;
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
          @include fontSet(18px, #4d4d4d, 500);
        }
        .icon-box {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        .del {
          @include bg("../../../assets/creator/del.svg");
        }
        .suspend {
          @include bg("../../../assets/creator/suspend.svg");
        }
      }
      .upload-info {
        padding: 0 32px 0 32px;
        @include fontSet(12px, #999, 400);

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
    width: 996px;
    height: 570px;
    background: rgba(254, 120, 101, 0.02);
    border-radius: 14px;
    display: flex;
    align-items: center;
    .course-type {
      width: 34px;
      height: 40px;
    }
    .right {
      flex-grow: 1;
      .name-box {
        display: flex;
        justify-content: space-between;

        .del-box {
          position: absolute;
          top: 12px;
          right: 12px;
        }
        .revideo {
          @include fontSet(12px, #fff, 400);
        }
        .replace-box {
          position: absolute;
          top: 12px;
          right: 42px;
          width: 62px;
          height: 24px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          line-height: 24px;
          text-align: center;
          span {
            @include fontSet(12px, #fff, 400);
          }
        }
        .name {
          max-width: 996px;
          max-height: 570px;
          @include fontSet(18px, #4d4d4d, 500);
          outline: none;
          margin: 0 auto;
        }
        .name:focus {
          border: none;
          outline: none;
        }
        .icon-box {
          width: 24px;
          height: 24px;
          float: left;
          position: relative;
          cursor: pointer;
          // margin-left: 16px;
          &:hover {
            .tips {
              display: block;
            }
          }
        }
        .tips {
          display: none;
          position: absolute;
          top: -26px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0 8px;
          min-width: 40px;
          height: 22px;
          line-height: 21px;
          background: rgba(51, 51, 51, 0.6);
          @include fontSet(12px, #fff, 400);
          border-radius: 4px;
          span {
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 4px;
            border-style: solid;
            border-color: rgba(51, 51, 51, 0.6) transparent transparent
              transparent;
          }
        }
        .del {
          @include bg("../../../assets/creator/dele.svg");
        }
        .suspend {
          @include bg("../../../assets/creator/suspend.svg");
        }
        .preview {
          @include bg("../../../assets/creator/preview.svg");
        }
      }

      .upload-info {
        @include fontSet(12px, #999, 400);
        .u-info {
          height: 24px;
          span {
            display: inline-block;
          }
          .u-1 {
            min-width: 200px;
          }
          .u-2 {
            min-width: 150px;
          }
          .complete {
            float: right;
            span {
              margin-right: 0;
              color: #fe7865;
            }
            i {
              display: inline-block;
              width: 24px;
              height: 24px;
              @include bg("../../../assets/creator/finish.svg");
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
      }
    }
  }
  .loading-box {
    text-align: center;
    margin-top: 225px;
    margin-bottom: 16px;
    .icon-loading {
      display: inline-block;
      width: 40px;
      height: 40px;
      @include bg("../../../assets/creator/loading.svg");
    }
  }
  .loading-tips {
    text-align: center;
    @include fontSet(16px, #b3b3b3, 400);
  }
  .mouse-box {
    background: rgba(254, 120, 101, 0.01);
  }
}
</style>
