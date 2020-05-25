<template>
  <div class="leftMain">
    <div class="dragIframe">
      <iframe :src="bgImg" frameborder="0"></iframe>
    </div>

    <!-- exit start -->
    <div class="exit" @click="exit">退出</div>
    <!-- exit end -->
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";
import { putFileCourseImageUpload } from "../../../service/creatorApi";
import Primary from "./primary";
import VueDragResize from "vue-drag-resize";
const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "LeftMain",
  components: {
    VueDragResize,
    Primary
  },
  directives: {
    Clickoutside
  }
})
export default class LeftMain extends Vue {
  @SandTableMod.State("bgImg") bgImg; //当前编辑模块的下标
  @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前编辑模块的下标  action

  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前编辑模块的下标
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前编辑模块的下标  action

  @SandTableMod.State("PrimaryShow") PrimaryShow; //当前编辑模块的下标
  @SandTableMod.Action("PrimaryShowHandle") PrimaryShowHandle; //当前编辑模块的下标  action

  @SandTableMod.State("maxH") maxH; //当前编辑模块的下标
  @SandTableMod.Action("maxHHandle") maxHHandle; //当前编辑模块的下标  action

  @SandTableMod.State("licationShow") licationShow; //当前编辑模块的下标
  @SandTableMod.Action("licationShowHandle") licationShowHandle; //当前编辑模块的下标  action

  @SandTableMod.State("checkedShow") checkedShow; //当前编辑模块的下标
  @SandTableMod.Action("checkedShowHandle") checkedShowHandle; //当前编辑模块的下标  action

  @Emit wrap() {
    let checkedShow = !this.checkedShow;
    this.checkedShowHandle({
      checkedShow: checkedShow
    });
  }

  // 取消应用所有弹框
  @Emit out() {
    let licationShow = false;
    this.licationShowHandle({
      licationShow: licationShow
    });
  }
  // 确定应用所有
  @Emit signout() {
    // this.$router.push("/main");
  }

  // 退出沙盘课程
  @Emit exit() {
    this.$router.push({
      path: "/sandTablestandard"
    });
  }

  //上传背景
  @Emit clickBtn() {
    this.uploadStart = true;
    this.$refs.filElem.click();
  }
  //上传背景
  @Emit clickFun() {
    let pageHeight = document.querySelector(".leftMain");
    let maxH = pageHeight.offsetHeight - 250;
    this.maxHHandle({
      maxH: maxH
    });
    let PrimaryShow = true;
    this.PrimaryShowHandle({
      PrimaryShow: PrimaryShow
    });
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
    if (!(type === "html")) {
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
    let data = new FormData();
    let courseId = this.$route.query.courseChannelId;
    data.append("file", file);
    data.append("courseId", courseId);
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
      }, //上传接口取消方法
      cancel => {
        this.cancel = cancel;
      }
    ).then(res => {
      if (res.code == 0) {
        let bgImgStatus = 2;
        this.bgImgStatusHandle({
          bgImgStatus: bgImgStatus
        });
        let bgImg = res.data.webUrl;
        this.bgImgHandle({
          bgImg: bgImg
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {}
}
</script>

<style lang="scss" scoped>
body {
  background: #fff;
}
.leftMain {
  width: 100%;
  height: 100%;
  min-width: 1245px;
  min-height: 683px;
  background-size: cover;
  position: relative;
}
.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  a {
    display: block;
    width: 134px;
    height: 44px;
    text-align: center;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    box-shadow: 0px 2px 4px 0px rgba(254, 120, 101, 0.4);
    border-radius: 22px;

    //修改字样式
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    letter-spacing: 1px;
  }
}
.dragIframe {
  width: 100%;
  height: 100%;
  position: relative;
}
iframe {
  width: 100%;
  height: 100%;
}

//背景图片
.bgImg {
  width: 100%;
  height: 100%;
  display: block;
  outline: none;
  margin: 0 auto;
}
.hasBgImg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.addCourse {
  width: 60px;
  height: 66px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../../assets/creator/sandTable/icon-position.svg")
    no-repeat;
  cursor: pointer;
  p {
    position: absolute;
    left: 21px;
    top: 13px;
    font-size: 24px;
    font-family: Helvetica;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  &:hover {
    background: url("../../../assets/creator/sandTable/icon-position-hover.svg")
      no-repeat;
  }
}
#carMessage {
  width: 88px;
  height: 94px;
  position: absolute;
  top: 51%;
  left: 52%;
  transform: translate(-51%, -52%);
}

.vdr::before {
  outline: none;
}

.newCourse {
  width: 88px;
  height: 94px;
  padding-left: 35px;
  // text-align: center;
  line-height: 90px;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 51%;
  left: 52%;
  transform: translate(-51%, -52%);
  background: url("../../../assets/creator/sandTable/icon-newCourse.svg");
  cursor: pointer;
}
.newCourse:hover {
  background: url("../../../assets/creator/sandTable/icon-newCourse.svg");
}
.exit {
  position: absolute;
  left: 24px;
  top: 16px;
  width: 52px;
  height: 24px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}
.changeBtn {
  position: absolute;
  right: 24px;
  top: 16px;
  width: 62px;
  height: 24px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}
.changeStatus {
  position: absolute;
  right: 24px;
  top: 16px;
  padding: 3px 7px;
  background: linear-gradient(
    90deg,
    rgba(255, 176, 158, 1) 0%,
    rgba(254, 120, 101, 1) 100%
  );
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  cursor: pointer;
}
.signout {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 2020;
  .tc {
    width: 410px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    border-radius: 13px;
    padding: 26px 32px 20px 32px;
    .header {
      position: absolute;
      left: 32px;
      // width: 100px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      height: 28px;
      line-height: 28px;
    }
    .main {
      margin-top: 43px;
      margin-bottom: 15px;
      width: 339px;
      height: 60px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .footer {
      position: absolute;
      .wrap {
        width: 176px;
        position: relative;
        float: left;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        input {
          position: absolute;
          top: 11px;
          border: 1px solid #dcdfe6;
          border-radius: 100%;
          width: 14px;
          height: 14px;
          background-color: #fff;
          cursor: pointer;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          line-height: 36px;
        }
        span {
          position: absolute;
          top: 0;
          left: 24px;
          width: 70px;
          display: inline-block;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(96, 98, 102, 1);
        }
      }
      .active {
        input {
          border: 5px solid #fe7865;
          // background: url(../../../assets/creator/sandTablestandard/radiochecked.svg)
          //   no-repeat;
        }
      }

      .el-but {
        width: 78px;
        height: 36px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
        border-radius: 18px;
        border: none;
        line-height: 11px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(254, 120, 101, 1);
        &:hover {
          color: rgba(254, 120, 101, 1);
        }
        &:focus {
          color: rgba(254, 120, 101, 1);
        }
      }

      .el-utb {
        width: 78px;
        height: 36px;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 18px;
        border: none;
        line-height: 11px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        &:hover {
          color: rgba(255, 255, 255, 1);
        }
        &:focus {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
