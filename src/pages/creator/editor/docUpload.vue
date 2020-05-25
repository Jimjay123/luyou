<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-10-23 15:40:07
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-10-24 09:33:47
 -->
<template>
  <div class="docUpload">
    <div class="upload-file">
      <div class="content">
        <!--未上传 start-->
        <div
          v-if="uploadStatus===1"
          :class="['box clearfix', mousebox == 1 ?'mouse-box':'']"
          @dragover="mouseEnterFun"
          @drop="mouseEnterFun"
          @dragenter="mouseMigrationFun"
          @dragleave="mouseRemovalFun"
          @click="clickFun"
        >
          <img :src="require('../../../assets/creator/icon-cloud.svg')" alt />
          <p class="p1">拖拽至该区域也可上传</p>
          <p class="p2">
            支持导入
            <span>doc、docx、ppt、pptx、pdf</span>
            格式文件
          </p>
          <a class="btn" href="javascript:;" @click.stop="clickFun">文件上传</a>
        </div>
        <!--未上传 end-->

        <!--上传中 start-->
        <div class="box-upload" v-else-if="uploadStatus===2">
          <p class="loading-box" v-if="uploadStatus===2">
            <i class="icon-loading"></i>
          </p>
          <p class="loading-tips" v-if="uploadStatus===2">努力上传中，切勿离开当前页喔…</p>
          <div class="upload-item">
            <img class="course-type" :src="require('../../../assets/creator/editor/word.svg')" alt />
            <div class="right">
              <div class="name-box">
                <div class="name">{{file.name}}</div>
                <div class="clearfix del-box">
                  <div class="icon-box del" @click="delFun()">
                    <div class="tips">
                      删除
                      <span></span>
                    </div>
                  </div>
                  <div class="icon-box suspend">
                    <div class="tips">
                      暂停
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
                    <span>{{file.comPercentage}}%</span>
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

        <!-- 上传成功 start -->
        <div class="uploaded" v-if="uploadStatus ===3">
          <!-- <iframe ref="iframe" frameborder="0" scrolling="auto" :src="fileServerUrl"></iframe> -->
          <iframe
            id="viewIframe"
            ref="iframe"
            frameborder="0"
            scrolling="auto"
            @load="onLoadFun"
            :src="showPdf=='-1'?fileServerUrl:fileServerUrlPdf"
          ></iframe>
          <!-- <div id="viewIframe">
            <a class="media" href="fileServerUrl"></a>
          </div>-->
        </div>
        <!-- 上传成功 end -->

        <input
          :id="index==null?'filElem':''"
          ref="filElem"
          type="file"
          @click.stop
          @change="uploadFiles"
          hidden
        />
      </div>
    </div>
  </div>
</template>




<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import ResizeTextarea from "../component/resizeTextarea";
import { State, Action, namespace } from "vuex-class";
// import { media } from "../../../../node_modules/jquery/dist/jquery.media";
// import { jquery } from "../../../../node_modules/jquery/dist/jquery";
const EditMod = namespace("edit");
import {
  cloneObj,
  tipsFail,
  tipsMsg,
  fileSizeFun,
  trimTime
} from "../../../utils/utils";
import { physicalDelete } from "../../../service/creatorApi";
import {
  attachUpload,
  logicDeleteAttach,
  getAllPageInfoList,
  changeCouUpdPageContent
} from "../../../service/editor/editorApi";
import { changeCouUpdPageContentFun } from "../../../service/editor/editorAction";

@Component({
  name: "DocUpload",
  components: {
    ResizeTextarea
  },
  directives: {
    Clickoutside
  }
})
export default class DocUpload extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @Prop({
    require: false,
    default: null
  })
  index;

  get ShowIndex() {
    return this.index !== null ? this.index : this.editIndex;
  }
  //文件上传状态
  get uploadStatus() {
    return this.editList[this.ShowIndex].leftSket.uploadStatus;
  }

  //文件名称
  get name() {
    return this.editList[this.ShowIndex].leftSket.name;
  }

  //文件大小
  get size() {
    return this.editList[this.ShowIndex].leftSket.size;
  }

  //文件地址
  get fileServerUrl() {
    return `https://view.officeapps.live.com/op/view.aspx?src=${
      this.editList[this.ShowIndex].leftSket.fileServerUrl
    }`;
  }

  get fileServerUrlPdf() {
    return this.editList[this.ShowIndex].leftSket.fileServerUrl;
  }

  get showPdf() {
    let data = this.editList[this.ShowIndex].leftSket.fileServerUrl;
    let num = data.indexOf("pdf");
    return num;
  }

  //文件id
  get fileAttachId() {
    return this.editList[this.ShowIndex].leftSket.fileAttachId;
  }

  // data
  // loadingStatus = 1; //加载状态 1没有任何上传文件  2上传中  3上传完成
  file = {
    file: "", //文件本身
    name: "文件名称",
    uploadedSize: "11.2", //已上传文件 大小
    fileSize: "119.2", //文件总大小
    speed: "833", //当前文件上传速度
    remainTime: "2.5", //剩余时间
    comPercentage: "25" //已完成百分比
  }; //上传文件内容
  cancel = null; //文件上传取消
  courseInfo = {};
  //Emit

  mousebox = "";

  elemetnNode = ""; //最后一次节点

  //点击事件
  @Emit clickFun() {
    // this.uploadStart = true;
    this.$refs.filElem.click();
  }

  //鼠标移入触发
  @Emit mouseEnterFun(e) {
    e.preventDefault(); //阻止拖放后的浏览器默认行为
    if (event.type === "drop") {
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

  //上传文件点击事件
  @Emit uploadFiles() {
    let files = this.$refs.filElem.files[0];
    this.$refs.filElem.value = "";
    if (files) {
      this.setUpFiles(files);
    }
  }

  //发送文件
  @Emit setUpFiles(file) {
    let typeList = file.name.split(".");
    let type = typeList[typeList.length - 1];
    if (
      !(
        type === "doc" ||
        type === "docx" ||
        type === "ppt" ||
        type === "pptx" ||
        type === "pdf"
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
      fileSize: file.size, //文件总大小
      speed: "0", //当前文件上传速度
      remainTime: "0", //剩余时间
      comPercentage: "0" //已完成百分比
    }; //上传文件内容
    this.file = fileData;
    let documentSize = fileData.fileSize / 1024 / 1024;
    console.log(documentSize);
    if (documentSize > 50) {
      tipsMsg("上传文件不可超过50MB");
      return;
    }
    let fileStatus = 2;
    let editList = cloneObj(this.editList);
    editList[this.editIndex].leftSket.uploadStatus = fileStatus;
    this.editListHandle({
      editList
    });
    let data = new FormData();
    let courseId = this.$route.query.courseId;
    data.append("file", file);
    data.append("courseId", courseId);
    data.append("pageId", this.ShowIndex);
    //调用上传文件接口
    attachUpload(
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
        let fileMsg = this.file;
        this.courseInfo = res.data;
        // let editList = cloneObj(this.editList);
        let dataUrl = res.data.webUrl;
        let dataNum = dataUrl.indexOf("pdf");

        editList[this.editIndex].leftSket.uploadStatus = 3;
        editList[this.editIndex].leftSket.fileServerUrl = res.data.webUrl;
        // editList[this.editIndex].leftSket.showPdf = dataNum;
        editList[this.editIndex].leftSket.fileAttachId = res.data.attachId;

        editList[this.editIndex].fileServerUrl = res.data.webUrl;
        editList[this.editIndex].fileAttachId = res.data.attachId;
        editList[this.editIndex].fileAttachName = fileMsg.name;
        editList[this.editIndex].fileAttachSize = fileMsg.fileSize;
        editList[this.editIndex].uploadStatus = 3;
        this.editListHandle({
          editList
        });

        // console.log(this.editList[this.editIndex]);
        // $("#viewIframe").media({
        //   width: "100%",
        //   height: "100%",
        //   autoplay: true,
        //   src: res.data.webUrl
        // });
        // $(function() {
        //   $("a.media").media({
        //     width: "100%",
        //     height: "100%"
        //   });
        // });

        changeCouUpdPageContentFun({
          pageList: editList
        });
        // let courseId = this.editList[this.ShowIndex].courseId;
        // let pageId = this.editList[this.ShowIndex].pageId;
        // let pageContentRelId = this.editList[this.ShowIndex].pageContentRelId;
        // // let fileServerUrl = res.data.webUrl;
        // let updateFileServerUrl = res.data.webUrl;
        // let fileAttachId = res.data.attachId;
        // let fileName = this.file.name;
        // let fileSize = this.file.uploadedSize;
        // let data = {
        //   courseId,
        //   pageId,
        //   pageContentRelId,
        //   // fileServerUrl,
        //   fileServerUrl: updateFileServerUrl,
        //   fileAttachId,
        //   fileName,
        //   fileSize
        // };
        // changeCouUpdPageContentFun(data);
        // let fileStatus = 3;
        // let editList = cloneObj(this.editList);
        // fileName = this.file.name;
        // editList[this.editIndex].leftSket.name = fileName;
        // fileSize = parseInt(this.file.fileSize);
        // let fileServerUrl =
        //   "https://view.officeapps.live.com/op/view.aspx?src=http://cloud.luyouor.com/medias/attach/1/1.docx";
        // // let fileAttachId = res.data.pageContent.fileAttachId;
        // editList[this.editIndex].leftSket.fileServerUrl = fileServerUrl;
        // editList[this.editIndex].leftSket.size = fileSize;
        // editList[this.editIndex].leftSket.uploadStatus = fileStatus;
        // editList[this.editIndex].leftSket.fileAttachId = fileAttachId;
        // this.editListHandle({
        //   editList
        // });
        // this.courseInfo = res.data;
        // this.fileServerUrl =
        //   "https://view.officeapps.live.com/op/view.aspx?src=" +
        //   encodeURI(res.data.pageContent.fileServerUrl);

        // this.file.name = res.data.courseName;
        this.cbFunction("uploadSuccess", "");
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
        // this.loadingStatus = 1; //加载状态 1没有任何上传文件  2上传中  3上传完成
        let fileStatus = 1;
        let editList = cloneObj(this.editList);
        editList[this.editIndex].leftSket.uploadStatus = fileStatus;
        this.editListHandle({
          editList
        });
      }
    });
  }

  //删除 回调方法    upload 上传中删除  uploaded 上传完成删除
  @Emit delFun() {
    let attachId = this.editList[this.ShowIndex].leftSket.fileAttachId;
    let pageContentRelId = this.editList[this.ShowIndex].pageContentRelId;

    this.mousebox = "";

    let data = {
      attachId,
      pageContentRelId
    };
    logicDeleteAttach(data).then(res => {
      if (res.code === 0) {
        let fileStatus = 1;
        this.mousebox = "";
        let editList = cloneObj(this.editList);
        editList[this.editIndex].leftSket.uploadStatus = fileStatus;
        editList[this.editIndex].leftSket.size = "";
        editList[this.editIndex].leftSket.name = "";

        editList[this.editIndex].fileServerUrl = "";
        editList[this.editIndex].fileAttachName = "";
        editList[this.editIndex].fileAttachSize = "";
        editList[this.editIndex].uploadStatus = 1;
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
    // let fileData = {};
    // fileData = {
    //   file: "", //文件本身
    //   name: "",
    //   uploadedSize: "0", //已上传文件 大小
    //   fileSize: "", //文件总大小
    //   speed: "0", //当前文件上传速度
    //   remainTime: "0", //剩余时间
    //   comPercentage: "0" //已完成百分比
    // }; //上传文件内容
    // this.file = fileData;
    // let fileStatus = 1;
    // let editList = cloneObj(this.editList);
    // editList[this.editIndex].leftSket.uploadStatus = fileStatus;
    // this.editListHandle({
    //   editList
    // });

    this.cancel({ code: 200, message: "主动取消上传" }); //取消接口上传
  }

  @Emit cbFunction(type, val) {
    if (typeof this.cbFun === "function") {
      this.cbFun(type, val);
    }
  }

  onLoadFun() {
    let iframe = $("#iframeOther").contents();
    iframe.onclick = function() {
      console.log("iframe 点击事件触发");
    };
  }

  created() {}
  updated() {}
}
</script>

<style lang="scss" scoped>
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
.docUpload {
  width: 996px;
  height: 570px;
}
.upload-file {
  width: 100%;
  height: 100%;
  padding: 64px;
  position: relative;
}
.box {
  width: 100%;
  height: 100%;
  border: 1px dashed rgba(204, 204, 204, 1);
  text-align: center;
  img {
    margin-top: 144px;
    width: 64px;
    height: 49px;
  }
  .p1 {
    margin-top: 25px;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }
  .p2 {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
    font-weight: normal;
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
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    margin-top: 65px;
    margin-bottom: 73px;
  }
}
// 上传中
.box-upload {
  width: 100%;
  height: 442px;
  // border: 1px dashed rgba(204, 204, 204, 1);
  text-align: center;
}
//上传logo start
.loading-box {
  text-align: center;
  margin-top: 161px;
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
  font-size: 16px;
  font-weight: 400;
  color: #b3b3b3;
  line-height: 22px;
}
//上传logo end
.upload-item {
  width: 100%;
  background: rgba(254, 120, 101, 0.02);
  border-radius: 14px;
  display: flex;
  align-items: center;
  padding: 18px 39px 18px 26px;
  margin-top: 96px;
  .course-type {
    width: 34px;
    height: 40px;
    margin-right: 28px;
  }
  .right {
    flex-grow: 1;
    .name-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      .del-box {
        display: none;
      }
      .name {
        @include fontSet(18px, #4d4d4d, 500);
      }
      .icon-box {
        width: 24px;
        height: 24px;
        float: left;
        position: relative;
        cursor: pointer;
        margin-left: 16px;
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
        @include bg("../../../assets/creator/del.svg");
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
          // min-width: 200px;
          float: left;
          text-align: left;
          margin-right: 40px;
        }
        .u-2 {
          // min-width: 150px;
          float: left;
          text-align: left;
          margin-right: 40px;
        }
        .u-3 {
          // min-width: 150px;
          float: left;
          text-align: left;
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

// 上传成功
iframe {
  //   position: fixed;
  //   left: 0px;
  //   top: 60px;
  //   z-index: 199;
  //   width: calc(100vw - 198px);
  //   height: calc(100vh - 138px);
  width: 100%;
  height: 570px;
  background-color: rgb(255, 255, 255);
  z-index: 198;
  position: absolute;
  left: 0;
  top: 0;
}

.mouse-box {
  background: rgba(254, 120, 101, 1.01);
}
</style>
