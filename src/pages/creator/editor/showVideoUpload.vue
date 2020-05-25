<template>
  <div class="videoUpload">
    <div class="content" @click.stop>
      <!--上传完成 start-->
      <div v-if="loadingStatus===1" class="box clearfix">
        <img :src="require('../../../assets/creator/icon-cloud.svg')" alt />
        <p class="p1">拖拽文件到此区域也可上传</p>
        <p class="p2">
          支持导入
          <span>mp4、mov、m4v、rm、rmvb</span>
        </p>
        <a class="btn" href="javascript:;">上传视频</a>
      </div>
      <div class="upload-item" v-if="loadingStatus===3">
        <div class="right">
          <div class="name-box">
            <video :src="video" class="name" id="videoPlayer" controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
    <!--上传完成 end-->
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
const CreatorMod = namespace("creator");
import {
  uploadFileSpeed,
  physicalDelete,
  PageMediavideoUpload
} from "../../../service/creatorApi";
import { PageMedialogicDeleteVideo } from "../../../service/creatorApi";
import {
  getAllPageInfovideoFun,
  changeCouUpdPageContentFun
} from "../../../service/editor/editorAction";
const EditMod = namespace("edit");

@Component({
  name: "ShowVideoUpload",
  components: {}
})
export default class ShowVideoUpload extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @CreatorMod.State("uploadFileShow") uploadFileShow; //上传文件弹框显示隐藏
  @CreatorMod.Action("uploadFileShowHandle") uploadFileShowHandle; //上传文件弹框显示隐藏  action修改方法

  @EditMod.State("previewEditList") previewEditList; //编辑文档数据
  @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action

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
    return this.previewEditList[this.ShowIndex].leftSket.loadingStatus || 1;
  }

  //上传-视频选中项
  get video() {
    return this.previewEditList[this.ShowIndex].leftSket.video;
  }

  //上传-视频名称选中项
  get name() {
    return this.previewEditList[this.ShowIndex].leftSket.video;
  }
  //上传-视频时长选中项
  get time() {
    return this.previewEditList[this.ShowIndex].leftSket.time;
  }
  //上传-视频大小选中项
  get size() {
    return this.previewEditList[this.ShowIndex].leftSket.size;
  }

  //文件上出状态 normal uploading 上传中 uploaded 上传完成
  get uploadStatus() {
    return this.previewEditList[this.ShowIndex].leftSket.uploadStatus || "";
  }

  @Prop({
    default: null,
    required: false
  })
  cbFun;

  created() {}
  uploda() {}
}
</script>

<style lang="scss" scoped>
.videoUpload {
  width: 100%;
  // height: 570px;
  height: 100%;
  position: relative;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  border-radius: 13px;
  .box {
    width: 868px;
    height: 442px;
    border-radius: 14px;
    border: 1px dashed rgba(204, 204, 204, 1);
    text-align: center;
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
    align-items: center;
    .course-type {
      width: 34px;
      height: 40px;
      margin-right: 28px;
    }
    .right {
      flex-grow: 1;
      .name-box {
        margin-top: 57px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        position: relative;
        padding: 0 32px 0 32px;
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
        .revi {
          position: absolute;
          top: 12px;
          right: 42px;
          width: 62px;
          height: 24px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          line-height: 24px;
          text-align: center;
        }
        .name {
          width: 996px;
          height: 468px;
          @include fontSet(18px, #4d4d4d, 500);
          outline: none;
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
    @include fontSet(16px, #b3b3b3, 400);
  }
}
</style>
