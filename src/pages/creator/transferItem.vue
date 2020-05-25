/**

* Created by wangxin

* @date 2019/9/5 13:29

*/
<template>
  <div class="course-item">
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
      <img
        :src="options.popularizeImageUrl?options.popularizeImageUrl:require('../../assets/common/default.png')"
        alt
      />
      <div class="type-info clearfix">
        <span class="remark">{{courseType}}</span>
        <div class="time">
          <i class="icon-time"></i>
          <span>{{options.duration||0}}分钟</span>
        </div>
      </div>
      <div class="bg">
        <div class="preview icon-item" @click="previewFun(courseType)" v-if="options.keyType !=0">
          <div class="tips" @click="previewFun(courseType)">
            预览
            <i class="icon-triangle"></i>
          </div>
        </div>
        <div
          class="copy icon-item"
          @click="moreFun(options)"
          v-if="options.expressState===0 && options.keyState === 4"
        >
          <div class="tips">
            更多
            <i class="icon-triangle"></i>
          </div>
        </div>
        <div class="copys icon-item" v-if="options.keyState != 4 || options.expressState == 1">
          <div class="tips" @click.stop="copyFun">
            复制
            <i class="icon-triangle"></i>
          </div>
        </div>
        <div
          v-if="(options.courseType===2 ||options.keyType===0 || options.keyType===2 || options.keyType===3 || options.keyType===4 || options.keyType===11 || options.keyType===12 )&&options.state===0"
          class="bg-edit"
          @click="editCourse(options)"
        ></div>
      </div>
      <ul class="drop-down" v-show="dropDown" v-Clickoutside="outClick">
        <li
          v-if="options.expressState===0 && options.keyState === 4"
          @click.stop="editFun(options)"
        >
          <img :src="require('../../assets/creator/icon-set.svg')" class="mr" />
          <span>课程设置</span>
        </li>
        <li v-if="options.expressState===0 && options.keyState === 4" @click="releaseFun(options)">
          <img :src="require('../../assets/creator/icon-release.png')" class="mr" />
          <span>发布</span>
        </li>
        <li
          v-if="options.expressState===0 && options.keyState === 4"
          @click="transferTrial(options)"
        >
          <img :src="require('../../assets/creator/icon-transfer.png')" class="mr" />
          <span>转审</span>
        </li>
        <li @click.stop="copyFun" v-if="options.expressState===0">
          <img :src="require('../../assets/creator/icon-c.svg')" class="mr" />
          <span>复制</span>
        </li>
        <li v-if="options.expressState===0" @click="editName('edit')">
          <img :src="require('../../assets/creator/icon-rename.svg')" class="mr" />
          <span>重命名</span>
        </li>
        <!-- <li @click="ddelFun('del')" v-if="options.state === 4">
          <img :src="require('../../assets/creator/icon-d.svg')" class="mr" />
          <span>删除</span>
        </li>-->
      </ul>
    </div>
    <div class="c-info">
      <!-- <p v-if="options.state===4&&isEdit">
        <textarea
          maxlength="24"
          v-Clickoutside="textareaOutClick"
          v-model="options.keyName"
          @keyup.enter="editNames"
        ></textarea>
      </p>
      <p v-else-if="options.state===4&&!isEdit" @click="editName">
        {{options.keyName}}
        <i class="icon-edit"></i>
      </p>-->
      <p @click="editName">{{options.keyName}}</p>
      <div class="c-bottom clearfix">
        <span class="l-time">{{options.modifyDatetimeInterval}}</span>
        <div class="r-trial r-examine" v-if="options.expressState===0 && options.keyState === 4">
          <i class="icon-trial"></i>
          <span>来自{{options.previousMemberName}}的转审</span>
        </div>
        <div class="r-edit r-issue" v-else-if="options.keyState===2">
          <i class="icon-edit"></i>
          <span>已发布</span>
        </div>
        <div class="r-edit r-examine" v-else-if="options.keyState===1 ">
          <i class="icon-edit"></i>
          <span>审核中</span>
        </div>
        <div class="r-trialTop r-examine" v-else-if="options.keyState === 4">
          <i class="icon-trialTop"></i>
          <span>已转审</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import {
  ownCourseAndChannelList,
  productCheckProductComplete
} from "../../service/creatorApi";
import { State, Action, namespace } from "vuex-class";
const CreCouInfoMod = namespace("creatorCourseInfo");
const CreBaseInfoMod = namespace("creatorBaseInfo");
@Component({
  name: "CourseItem",
  directives: {
    Clickoutside
  },
  components: {}
})
export default class CourseItem extends Vue {
  @CreCouInfoMod.State("boxShow") boxShow; //弹框显示隐藏
  @CreCouInfoMod.Action("boxShowHandle") boxShowHandle; //弹框显示隐藏  action修改方法

  @CreCouInfoMod.State("text") text; //弹框文本
  @CreCouInfoMod.Action("textHandle") textHandle; //弹框显示隐藏  action修改方法

  @CreBaseInfoMod.State("channelShow") channelShow; //弹框显示隐藏
  @CreBaseInfoMod.Action("channelShowHandle") channelShowHandle; //弹框显示隐藏  action修改方法

  @CreCouInfoMod.State("courseKeyId") courseKeyId; //KeyId
  @CreCouInfoMod.Action("courseKeyIdHandle") courseKeyIdHandle; //KeyId  action修改方法

  @CreCouInfoMod.State("courseKeyType") courseKeyType; //KeyType
  @CreCouInfoMod.Action("courseKeyTypeHandle") courseKeyTypeHandle; //KeyType  action修改方法

  @CreCouInfoMod.State("courseKeyName") courseKeyName; //KeyName
  @CreCouInfoMod.Action("courseKeyNameHandle") courseKeyNameHandle; //KeyName  action修改方法

  @CreCouInfoMod.State("courseExpressId") courseExpressId; //ExpressId
  @CreCouInfoMod.Action("courseExpressIdHandle") courseExpressIdHandle; //KeyName  action修改方法

  @CreCouInfoMod.State("PublishShow") PublishShow; //PublishShow弹框显示
  @CreCouInfoMod.Action("PublishShowHandle") PublishShowHandle; //KeyName  action修改方法

  @CreBaseInfoMod.State("channelKeyId") channelKeyId; //KeyId
  @CreBaseInfoMod.Action("channelKeyIdHandle") channelKeyIdHandle; //KeyId  action修改方法

  @CreBaseInfoMod.State("channelKeyType") channelKeyType; //KeyType
  @CreBaseInfoMod.Action("channelKeyTypeHandle") channelKeyTypeHandle; //KeyType  action修改方法

  @CreBaseInfoMod.State("channelKeyName") channelKeyName; //KeyName
  @CreBaseInfoMod.Action("channelKeyNameHandle") channelKeyNameHandle; //KeyName  action修改方法

  @CreBaseInfoMod.State("channelExpressId") channelExpressId; //ExpressId
  @CreBaseInfoMod.Action("channelExpressIdHandle") channelExpressIdHandle; //KeyName  action修改方法

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
    required: false,
    default: null
  })
  callBack;

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

  //更多点击事件
  @Emit moreFun(options) {
    this.dropDown = true;
    this.courseKeyIdHandle({
      courseKeyId: options.keyId
    });
    this.courseKeyTypeHandle({
      courseKeyType: options.keyType
    });
    this.courseKeyNameHandle({
      courseKeyName: options.keyName
    });
    this.courseExpressIdHandle({
      courseExpressId: options.expressId
    });
    this.channelKeyIdHandle({
      channelKeyId: options.keyId
    });
    this.channelKeyTypeHandle({
      channelKeyType: options.keyType
    });
    this.channelKeyNameHandle({
      channelKeyName: options.keyName
    });
    this.channelExpressIdHandle({
      channelExpressId: options.expressId
    });
  }

  //基础信息设置--修改
  @Emit editFun(data) {
    console.log(data);
    let type = data.keyType;
    this.dropDown = false;
    if (type === 1 || type === 2 || type === 3 || type === 4) {
      //标准课
      this.$router.push({
        path: "/classCourseInfo",
        query: {
          courseId: data.keyId,
          courseType: data.keyType
        }
      });
    } else {
      // 课程频道
      this.$router.push({
        path: "/classInfoBase",
        query: {
          courseId: data.keyId,
          courseType: data.keyType
        }
      });
    }
  }

  //编辑课程
  editCourse(data) {
    console.log(data);
    console.log(data.keyType);
    let type = data.keyType;
    let id = data.keyId;
    if (type === 2) {
      //npe
      this.$router.push({
        path: "/editor",
        query: {
          courseId: id
        }
      });
    } else if (type === 0) {
      //沙盘标准课
      this.$router.push({
        path: "/sandTablestandard",
        query: {
          courseId: id
        }
      });
    } else if (type === 3) {
      //tpe沙盘
      this.$router.push({
        path: "/sandTablestandard",
        query: {
          courseId: id
        }
      });
    } else if (type === 4) {
      //npe沙盘
      // sandTablestandard?courseId=164&temIndex=0
      this.$router.push({
        path: "/sandTablestandard",
        query: {
          courseId: id,
          temIndex: "0"
        }
      });
    } else if (type === 11) {
      //课程频道
      // creatorCreCouPlans?addCourseType=add&courseChannelId=2385
      //npe
      this.$router.push({
        path: "/creatorCreCouPlans",
        query: {
          addCourseType: "add",
          courseChannelId: id
        }
      });
    } else if (type === 12) {
      //沙盘课程频道
      // sandTable?channelId=2386
      this.$router.push({
        path: "/sandTable",
        query: {
          channelId: id
        }
      });
    }
  }

  //编辑名称
  @Emit editName() {
    this.dropDown = false;
    this.isEdit = true;
  }
  //编辑名称
  @Emit editNames() {
    this.isEdit = false;
    this.dropDown = false;
    this.cbFunction("edit");
  }

  //删除按钮点击事件
  @Emit ddelFun() {
    this.dropDown = false;
    this.cbFunction("del");
  }

  //撤回审核修改
  recall() {
    this.cbFunction("recall");
  }

  //拷贝回调方法
  @Emit copyFun() {
    this.dropDown = false;
    this.cbFunction("copy");
  }

  //textarea 以外区域点击触发
  @Emit textareaOutClick() {
    this.isEdit = false;
    this.cbFunction("edit");
  }

  //回调方法
  @Emit cbFunction(type) {
    if (typeof this.callBack === "function") {
      this.callBack(type, this.options);
    }
  }

  @Emit releaseFun(options) {
    this.dropDown = false;
    let data = {
      keyId: options.keyId,
      keyType: options.keyType //课程keyType
    };
    productCheckProductComplete(data).then(res => {
      if (res.code == 0) {
        let text = {
          title: "确认发布",
          content: "审核期间课程不可修改，确认现在发布该课程到平台吗？",
          cancel: "取消",
          confirm: "确定"
        };
        this.textHandle({
          text: text
        });
        this.PublishShowHandle({
          PublishShow: true
        });
      } else {
        let text = {
          title: "不可发布",
          content:
            "由于该课程基础设置信息未填写完整，暂不支可发布。是否前去填写完整？",
          cancel: "取消",
          confirm: "去填写"
        };
        this.textHandle({
          text: text
        });
        this.PublishShowHandle({
          PublishShow: true
        });
      }
    });
  }

  @Emit transferTrial(options) {
    this.dropDown = false;
    if (options.keyType == 11 || options.keyType == 12) {
      let data = {
        keyId: options.keyId,
        keyType: options.keyType //课程keyType
      };
      productCheckProductComplete(data).then(res => {
        if (res.code == 0) {
          this.channelShowHandle({
            channelShow: true
          });
        } else {
          let text = {
            title: "不可转审",
            content:
              "由于该课程基础设置信息未填写完整，暂不支持转审。是否前去填写完整？",
            cancel: "取消",
            confirm: "去填写"
          };
          this.textHandle({
            text: text
          });
          this.PublishShowHandle({
            PublishShow: true
          });
        }
      });
    } else {
      let data = {
        keyId: options.keyId,
        keyType: options.keyType //课程keyType
      };
      productCheckProductComplete(data).then(res => {
        if (res.code == 0) {
          this.boxShowHandle({
            boxShow: true
          });
        } else {
          let text = {
            title: "不可转审",
            content:
              "由于该课程基础设置信息未填写完整，暂不支持转审。是否前去填写完整？",
            cancel: "取消",
            confirm: "去填写"
          };
          this.textHandle({
            text: text
          });
          this.PublishShowHandle({
            PublishShow: true
          });
        }
      });
    }
  }

  created() {
    // this.ownCourseAndChannelListFun();
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
      // position: absolute;
      // top: 0;
      // left: 0;
      float: left;
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
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      .remark {
        float: left;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        border: 1px solid rgba(238, 238, 238, 1);
        padding: 0 5px;
        margin-top: 3px;
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
          margin-top: 4px;
        }
        span {
          vertical-align: middle;
        }
      }
      .r-trialTop {
        float: right;
        .icon-trialTop {
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          background: url("../../assets/creator/icon-trial-top.png") no-repeat;
          background-size: 100% auto;
          // margin-right: 5px;
          margin-top: 2px;
        }
        span {
          vertical-align: middle;
        }
      }
      .r-trial {
        float: right;
        .icon-trial {
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          background: url("../../assets/creator/icon-trial.png") no-repeat;
          background-size: 100% auto;
          // margin-right: 5px;
          margin-top: 2px;
        }
        span {
          vertical-align: middle;
        }
      }
      .r-examine {
        color: #fe7865;
        .icon-edit {
          @include bg("../../assets/creator/icon-examine.svg");
        }
      }
      .r-issue {
        color: #ccc;
        .icon-edit {
          @include bg("../../assets/creator/icon-issue.svg");
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
    .copy {
      top: 10px;
      left: auto;
      right: 10px;
      background: url("../../assets/creator/icon-copy.png") no-repeat;
      background-size: 100% auto;
    }
    .copys {
      top: 10px;
      left: auto;
      right: 10px;
      background: url("../../assets/creator/icon-c.svg") no-repeat;
      background-size: 100% auto;
    }
    .bg-edit {
      cursor: pointer;
      position: absolute;
      top: 48px;
      left: 105px;
      width: 40px;
      height: 40px;
      background: url("../../assets/creator/red-edit.svg") no-repeat;
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
