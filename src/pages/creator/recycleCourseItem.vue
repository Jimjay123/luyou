/**

* Created by wangxin

* @date 2019/9/5 13:29

*/
<template>
  <div class="course-item" @click="totalRestore(options.keyType,options.keyId,'show')">
    <div class="img-box">
      <div class="blackBgc"></div>
      <div class="tabShowHide">
        <!-- 课程频道 -->
        <span class="channel" v-if="options.keyType===11">频道</span>
        <!-- 沙盘课程频道或者沙盘 -->
        <span
          class="sandTable"
          v-if="options.keyType==0 || options.keyType==3 ||options.keyType==4"
        >沙盘</span>
        <span class="sandTableCourse" v-if=" options.keyType== 12">沙盘频道</span>
      </div>
      <img :src="options.popularizeImageUrl" alt />
      <div class="type-info clearfix">
        <span class="remark">{{courseType}}</span>
        <div class="time">
          <i class="icon-time"></i>
          <span>{{options.duration||0}}</span>
        </div>
      </div>
      <div class="bg">
        <div class="preview icon-item" @click.stop="previewFun">
          <div class="tips" @click.stop="previewFun">
            预览
            <i class="icon-triangle"></i>
          </div>
        </div>
        <div class="copy icon-item" @click.stop="moreFun">
          <div class="tips">
            更多
            <i class="icon-triangle"></i>
          </div>
        </div>
        <div class="bg-edit" @click="editFun"></div>
      </div>
      <ul class="drop-down" v-show="dropDown" v-Clickoutside="outClick">
        <li @click.stop="goRestore(options.keyType,options.keyId)">
          <img :src="require('../../assets/creator/icon-restore.svg')" class="mr" />
          <span>恢复</span>
        </li>
        <li @click.stop="perDelete(options.keyType,options.keyId)">
          <img :src="require('../../assets/creator/icon-d.svg')" class="mr" />
          <span>删除</span>
        </li>
      </ul>
    </div>
    <div class="c-info">
      <!-- @click="editName" 点击时间删除 -->
      <p v-if="!isEdit">
        {{options.keyName}}
        <!-- <i class="icon-edit"></i> -->
      </p>
      <p v-else>
        <textarea v-Clickoutside="textareaOutClick"></textarea>
      </p>
      <div class="c-bottom clearfix">
        <span class="l-time">{{options.modifyDatetimeInterval}}</span>
        <div class="r-edit r-cancel">
          <i class="icon-edit"></i>
          <span>已删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { ownCourseAndChannelList } from "../../service/creatorApi";
@Component({
  name: "CourseItem",
  directives: {
    Clickoutside
  }
})
export default class CourseItem extends Vue {
  @Prop({
    required: false,
    default: () => {
      return {
        src: require("../../assets/creator/default.png")
      };
    }
  })
  options;

  @Prop({
    default: null
  })
  cbFun;

  @Prop({
    default: null
  })
  grFun;

  dropDown = false;
  isEdit = false;

  //下拉选择--点击区域以外位置关闭
  @Emit outClick() {
    this.dropDown = false;
  }

  //课程类型
  get courseType() {
    let courseType = this.options.keyType;
    if (this.options.keyType === 11) {
      return "课程频道";
    } else {
      if (courseType === 1) {
        return "TPE课程";
      } else if (courseType === 2) {
        return "NPE课程";
      } else if (courseType === 12) {
        return "沙盘课程";
      }
    }
  }

  // 恢复删除课程
  @Emit goRestore(type, id) {
    this.dropDown = false;
    this.grFun(type, id);
  }

  // 恢复删除课程
  @Emit totalRestore(type, id, isShow) {
    this.grFun(type, id, isShow);
  }

  // 彻底删除课程
  @Emit perDelete(type, id) {
    this.dropDown = false;
    this.cbFun(type, id);
  }

  // goRestore

  //预览点击事件
  @Emit previewFun(courseType) {
    console.log(courseType);
    let opt = this.options;
    console.log(opt);
    let data = {};
    if (opt.keyType === 12 || opt.keyType === 11) {
      //沙盘频道 || 频道
      window.open(
        window.location.href.split("#")[0] +
          "#/creatorChannel?courseChannelId=" +
          encodeURIComponent(opt.keyId)
      );
    } else {
      if (courseType == "NPE课程") {
        window.open(
          window.location.href.split("#")[0] +
            "#/creatorStandard?courseId=" +
            encodeURIComponent(opt.keyId) +
            "&courseType=" +
            encodeURIComponent(courseType)
        );
      } else {
        window.open(
          window.location.href.split("#")[0] +
            "#/creatorStandard?courseId=" +
            encodeURIComponent(opt.keyId)
        );
      }
    }
    window.open(this.$router.push(data));
  }
  // @Emit previewFun() {
  //   let opt = this.options;
  //   let data = {};
  //   if (opt.keyType === 2) {
  //     //频道
  //     window.open(
  //       window.location.href.split("#")[0] +
  //         "#/creatorChannel?courseChannelId=" +
  //         encodeURIComponent(opt.keyId)
  //     );
  //     // data.path = "/creatorChannel";
  //     // data.query = { courseChannelId: opt.keyId };
  //   } else {
  //     // data.path = "/creatorStandard";
  //     // data.query = { courseId: opt.keyId };
  //     window.open(
  //       window.location.href.split("#")[0] +
  //         "#/creatorStandard?courseId=" +
  //         encodeURIComponent(opt.keyId)
  //     );
  //   }
  // }

  //更多点击事件
  @Emit moreFun() {
    this.dropDown = true;
  }

  //编辑点击事件
  @Emit editFun() {}

  //编辑名称
  @Emit editName() {
    this.isEdit = true;
  }

  //textarea 以外区域点击触发
  @Emit textareaOutClick() {
    this.isEdit = false;
  }
  created() {
    // console.log(this.options);
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}

.course-item {
  float: left;
  //margin-right: 36px;
  border-radius: 10px;
  width: 250px;
  height: 208px;
  font-size: 14px;
  font-weight: 400;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  margin: 0 18px 31px 18px;
  .img-box {
    width: 100%;
    height: 131px;
    position: relative;
    .blackBgc {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      height: 30px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }
    .tabShowHide {
      position: absolute;
      top: 0;
      left: 0;
      height: 24px;
      width: 100%;
    }
    .channel {
      position: absolute;
      top: 0;
      left: 0;
      width: 42px;
      height: 24px;
      background: rgba(254, 120, 101, 1);
      border-radius: 10px 0px 10px 0px;
      @include fontSet(14px, #fff, 500);
      text-align: center;
      line-height: 24px;
    }
    .sandTable {
      float: left;
      width: 42px;
      height: 24px;
      background: rgba(104, 193, 254, 1);
      border-radius: 10px 0px 10px 0px;
      @include fontSet(14px, #fff, 500);
      text-align: center;
      line-height: 24px;
    }
    .sandTableCourse {
      float: left;
      padding: 2px 6px;
      height: 24px;
      background: rgba(104, 193, 254, 1);
      border-radius: 10px 0px 10px 0px;
      @include fontSet(14px, #fff, 500);
      text-align: center;
      line-height: 20px;
    }
    img {
      width: 250px;
      height: 131px;
      border-radius: 10px 10px 0 0;
    }
    .type-info {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 5px 10px;
      @include fontSet(12px, #fff, 400);
      .remark {
        float: left;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        border: 1px solid rgba(238, 238, 238, 1);
        padding: 0 5px;
      }
      .time {
        float: right;
        font-weight: 600;
        font-size: 14px;
        .icon-time {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          background: url("../../assets/creator/c-time.svg") no-repeat;
          background-size: 100% auto;
          margin-right: 9px;
        }
        span {
          vertical-align: middle;
        }
      }
    }
  }
  .c-info {
    padding: 8px 12px 10px 12px;
    p {
      cursor: pointer;
      position: relative;
      height: 38px;
      @include fontSet(14px, #333, 400);
      overflow: hidden;
      display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示 。
      text-overflow: ellipsis; // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
      -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式 。
      -webkit-line-clamp: 2;
      margin-bottom: 4px;
      .icon-edit {
        display: none;
        width: 16px;
        height: 16px;
        @include bg("../../assets/creator/icon-edit.svg");
        vertical-align: middle;
      }
      &:hover .icon-edit {
        display: inline-block;
      }
      textarea {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      textarea:hover {
        border: 1px solid rgba(254, 120, 101, 0.2);
      }
      textarea:focus {
        border: 1px solid rgba(255, 163, 158, 1);
        background: #fff;
      }
    }
    .c-bottom {
      @include fontSet(12px, #b3b3b3, 400);
      .l-time {
        float: left;
        font-weight: 600;
      }
      .r-edit {
        float: right;
        .icon-edit {
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          background: url("../../assets/creator/icon-edit.svg") no-repeat;
          background-size: 100% auto;
          // margin-right: 5px;
          margin-top: 1px;
        }
        span {
          vertical-align: middle;
        }
      }
      .r-cancel {
        color: #ccc;
        .icon-edit {
          @include bg("../../assets/creator/icon-cancel.svg");
        }
      }
    }
  }
  .bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 30;
    border-radius: 10px 10px 0px 0px;
    .icon-item {
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: 10px;
      width: 24px;
      height: 24px;
      background: url("../../assets/creator/icon-preview.svg") no-repeat;
      background-size: 100% auto;
      z-index: 99;
      .tips {
        display: none;
        position: absolute;
        top: -26px;
        left: -8px;
        width: 40px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        border-radius: 3px;
        background: rgba(51, 51, 51, 0.6);
        @include fontSet(12px, #fff, 400);
        .icon-triangle {
          position: absolute;
          bottom: -8px;
          left: 17px;
          border-width: 4px;
          border-style: solid;
          border-color: rgba(51, 51, 51, 0.6) transparent transparent
            transparent;
        }
      }
    }
    .icon-item:hover {
      .tips {
        display: block;
      }
    }
    .preview {
    }
    .copy {
      top: 10px;
      left: auto;
      right: 10px;
      background: url("../../assets/creator/icon-copy.png") no-repeat;
      background-size: 100% auto;
    }
    .bg-edit {
      cursor: pointer;
      position: absolute;
      top: 48px;
      left: 105px;
      width: 40px;
      height: 40px;
      // background: url("../../assets/creator/red-edit.svg") no-repeat;
      background-size: 100% auto;
    }
  }
}

.course-item:hover {
  .bg {
    display: block;
  }
}

//下拉选项
.img-box .drop-down {
  position: absolute;
  top: 34px;
  right: -108px;
  z-index: 99;
  width: 144px;
  @include fontSet(16px, #4d4d4d, 400);
  background: #fff;
  border-radius: 8px;
  border: 1px solid rgba(230, 230, 230, 1);
  li {
    cursor: pointer;
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    .mr {
      margin: 0 13px 0 11px;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
  li:hover {
    background: rgba(0, 0, 0, 0.03);
  }
}
</style>
