<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-10-10 17:40:47
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-10-24 09:29:35
 -->
/**

* Created by wangxin

* @date 2019/9/6 15:31  上传文件 修改

*/
<template>
  <div class="upload-file">
    <!-- 关闭弹框start -->
    <CloseDailog :show="closeShow" :cbFun="diaCbFun" :loadingStatus="loadingStatus"></CloseDailog>
    <!-- end -->
    <div class="content" @click.stop>
      <div class="closeBtn" @click="clickTest">
        <img src="../../assets/creator/closeBtn.svg" alt />
      </div>
      <h3>
        <span>上传课程文件</span>请上传 xAPI、PPT、HTML格式的文件
      </h3>
      <div
        v-if="loadingStatus===1"
        :class="['box clearfix', mousebox == 1 ?'mouse-box':'']"
        @dragover="mouseEnterFun"
        @drop="mouseEnterFun"
        @dragenter="mouseMigrationFun"
        @dragleave="mouseRemovalFun"
        @click="clickFun"
      >
        <img :src="require('../../assets/creator/icon-cloud.svg')" alt />
        <p class="p1">拖拽文件到此区域也可上传</p>
        <p class="p2">
          支持导入
          <span>xAPI、PPT、HTML</span>
        </p>
        <a @click.stop="clickFun" class="btn" href="javascript:;">上传文件</a>
        <input ref="filElem" type="file" @change="uploadFiles" hidden />
      </div>

      <!--上传中 start-->
      <div v-else-if="loadingStatus===2">
        <div class="upload-item">
          <img
            class="course-type"
            :src="require('../../assets/creator/xapi.svg')"
            alt
            v-if="loadingStatus===3"
          />
          <img
            class="course-type"
            src="../../assets/creator/updateImg.svg"
            alt
            v-if="loadingStatus===2"
          />
          <div class="right">
            <div class="name-box">
              <div class="name">{{file.name}}</div>
              <div class="clearfix del-box">
                <div class="icon-box del" @click="delFun('upload')">
                  <div class="tips">
                    删除
                    <span></span>
                  </div>
                </div>
                <div class="icon-box suspend" v-if="0">
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
        <p class="loading-box" v-if="loadingStatus===2">
          <i class="icon-loading"></i>
        </p>
        <p class="loading-tips" v-if="loadingStatus===2">努力上传中，切勿离开当前页喔…</p>
      </div>
      <!--上传中 end-->

      <!--上传完成 start-->
      <div v-else>
        <div class="upload-item">
          <img class="course-type" :src="require('../../assets/creator/xapi.svg')" alt />
          <div class="right">
            <div class="name-box">
              <div class="name">{{file.name}}</div>
              <div class="clearfix del-box">
                <div class="icon-box del" @click="delFun('uploaded')">
                  <div class="tips">
                    删除
                    <span></span>
                  </div>
                </div>
                <!-- <div class="icon-box preview" @click="previewFun">
                  <div class="tips">
                    预览<span></span>
                  </div>
                </div>-->
              </div>
            </div>

            <!--上传完成 start-->
            <div class="upload-info">
              <div class="u-info clearfix">
                <span>上传完成</span>
                <div class="complete">
                  <i></i>
                </div>
              </div>
              <div class="progress">
                <div class="completed"></div>
              </div>
            </div>
            <!--上传完成 end-->
          </div>
        </div>
        <p class="loading-tips mrt144">上传完成…下一步进入“课程规划信息”</p>
        <div class="btn-box">
          <a class="edit" href="javascript:;" @click="goPreview">预览</a>
          <a class="next" @click="nextBtn" href="javascript:;">去发布</a>
        </div>
      </div>
      <!--上传完成 end-->
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
} from "../../utils/utils";
import { State, Action, namespace } from "vuex-class";
const CreatorMod = namespace("creator");
import { uploadFileSpeed, physicalDelete } from "../../service/creatorApi";
import CloseDailog from "./closeDailog";

@Component({
  name: "UploadFile",
  components: {
    CloseDailog
  }
})
export default class UploadFile extends Vue {
  @CreatorMod.State("uploadFileShow") uploadFileShow; //上传文件弹框显示隐藏
  @CreatorMod.Action("uploadFileShowHandle") uploadFileShowHandle; //上传文件弹框显示隐藏  action修改方法

  loadingStatus = 1; //加载状态 1没有任何上传文件  2上传中  3上传完成

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
  courseServerUrl = ""; //上传文件预览第三方
  closeShow = false; //关闭弹框

  mousebox = "";

  elemetnNode = ""; //最后一次节点

  // 预览
  @Emit goPreview() {
    window.open(
      window.location.href.split("#")[0] +
        "#/orthers?url=" +
        encodeURIComponent(this.courseServerUrl)
    );
  }

  // 弹框 回调方法
  @Emit diaCbFun(type) {
    if (type === "confirm") {
      this.uploadFileShowHandle({
        uploadFileShow: false
      });
      this.$router.replace("/creator/home");

      this.file = {
        file: "", //文件本身
        name: "文件名称",
        uploadedSize: "11.2", //已上传文件 大小
        fileSize: "119.2", //文件总大小
        speed: "833", //当前文件上传速度
        remainTime: "2.5", //剩余时间
        comPercentage: "40" //已完成百分比
      }; //上传文件内容
      this.cancel = null; //文件上传取消
      this.courseInfo = {
        courseId: "",
        courseType: ""
      };
      this.loadingStatus = 1;
    }
    this.closeShow = false;
  }

  //点击关闭
  @Emit clickTest() {
    if (this.loadingStatus === 2) {
      this.closeShow = true;
    } else {
      this.closeShow = false;
      this.uploadFileShowHandle({
        uploadFileShow: false
      });
      this.$router.replace("/creator/home");

      this.file = {
        file: "", //文件本身
        name: "文件名称",
        uploadedSize: "11.2", //已上传文件 大小
        fileSize: "119.2", //文件总大小
        speed: "833", //当前文件上传速度
        remainTime: "2.5", //剩余时间
        comPercentage: "40" //已完成百分比
      }; //上传文件内容
      this.cancel = null; //文件上传取消
      this.courseInfo = {
        courseId: "",
        courseType: ""
      };
      this.loadingStatus = 1;
    }
  }

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
    if (!(type === "zip" || type === "ppt" || type === "pptx")) {
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
    this.loadingStatus = 2; //加载状态 1没有任何上传文件  2上传中  3上传完成
    let data = new FormData();
    data.append("file", file);
    //调用上传文件接口
    uploadFileSpeed(
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
        if (type == "ppt" || type == "pptx") {
          this.$router.push({
            path: "/editor",
            query: {
              courseId: res.data.courseId
            }
          });
        } else {
          this.loadingStatus = 3; //加载状态 1没有任何上传文件  2上传中  3上传完成
          this.courseInfo = res.data;
          this.courseServerUrl = res.data.courseServerUrl;

          // this.file.name = res.data.courseName;
          console.log(this.file.name);

          this.cbFunction("uploadSuccess", "");
        }
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
        this.loadingStatus = 1; //加载状态 1没有任何上传文件  2上传中  3上传完成
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
      this.loadingStatus = 1; //加载状态 1没有任何上传文件  2上传中  3上传完成
      this.cancel({ code: 200, message: "主动取消上传" }); //取消接口上传
    } else {
      let courseInfo = this.courseInfo;
      physicalDelete({
        keyId: courseInfo.courseId,
        keyType: courseInfo.courseType
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
          this.loadingStatus = 1; //加载状态 1没有任何上传文件  2上传中  3上传完成
          this.cancel({ code: 200, message: "主动取消上传" }); //取消接口上传
          this.cbFunction("uploadSuccess", "");
        } else {
          tipsFail(res.msg);
        }
      });
    }
  }

  //预览点击事件
  @Emit previewFun() {}

  //下一步按钮点击事件
  @Emit nextBtn() {
    this.uploadFileShowHandle({
      uploadFileShow: false
    });
    this.$router.push({
      path: "/classCourseInfo",
      query: this.courseInfo
    });
  }

  created() {}
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

.upload-file {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 99;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 840px;
  min-height: 475px;
  background: rgba(255, 255, 255, 1);
  border-radius: 13px;
  padding: 32px 25px;
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
  .box {
    border-radius: 14px;
    border: 1px dashed rgba(204, 204, 204, 1);
    text-align: center;
    img {
      margin-top: 97px;
      width: 64px;
      height: 49px;
    }
    .p1 {
      @include fontSet(14px, #666, 500);
      margin-top: 25px;
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
      margin-top: 34px;
      margin-bottom: 55px;
    }
  }
  .box:hover {
    background: rgba(254, 120, 101, 0.01);
    border: 1px dashed rgba(254, 120, 101, 0.5);
  }
  .upload-item {
    width: 100%;
    background: rgba(254, 120, 101, 0.02);
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 18px 39px 18px 26px;
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
          @include bg("../../assets/creator/del.svg");
        }
        .suspend {
          @include bg("../../assets/creator/suspend.svg");
        }
        .preview {
          @include bg("../../assets/creator/preview.svg");
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
              @include bg("../../assets/creator/finish.svg");
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
    margin-top: 84px;

    margin-bottom: 19px;
    .icon-loading {
      display: inline-block;
      width: 40px;
      height: 40px;
      @include bg("../../assets/creator/loading.svg");
    }
  }
  .loading-tips {
    text-align: center;
    @include fontSet(16px, #b3b3b3, 400);
  }
  .mrt144 {
    margin-top: 144px;
  }
  .btn-box {
    text-align: right;
    margin-top: 22px;
    a {
      display: inline-block;
      text-align: center;
      height: 44px;
      line-height: 44px;
      border-radius: 22px;
      @include fontSet(16px, #fe7865, 400);
      margin-left: 22px;
    }
    .edit {
      width: 145px;
      border: 1px solid rgba(254, 120, 101, 0.4);
    }
    .next {
      width: 134px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      color: #fff;
    }
  }
  .mouse-box {
    background: rgba(254, 120, 101, 0.01);
  }
}
</style>
