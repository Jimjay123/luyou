<template>
  <div class="elements">
    <div class="classBox" v-if="PublishShow" @click="closeFun"></div>
    <div class="box" v-if="PublishShow">
      <div class="header">{{text.title}}</div>
      <div class="main">{{text.content}}</div>
      <div class="footer">
        <el-button @click="closeFun">{{text.cancel}}</el-button>
        <el-button @click="clickFun(text.confirm)">{{text.confirm}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { productPublish } from "../../service/creatorApi";
import { State, Action, namespace } from "vuex-class";
import { message } from "../../utils/utils";
const CreCouInfoMod = namespace("creatorCourseInfo");
@Component({
  name: "CourseBox",

  components: {}
})
export default class CourseBox extends Vue {
  @CreCouInfoMod.State("PublishShow") PublishShow; //PublishShow弹框显示
  @CreCouInfoMod.Action("PublishShowHandle") PublishShowHandle; //KeyName  action修改方法

  @CreCouInfoMod.State("text") text; //弹框显示隐藏
  @CreCouInfoMod.Action("textHandle") textHandle; //弹框显示隐藏  action修改方法

  @CreCouInfoMod.State("courseKeyId") courseKeyId; //KeyId
  @CreCouInfoMod.Action("courseKeyIdHandle") courseKeyIdHandle; //KeyId  action修改方法

  @CreCouInfoMod.State("courseKeyType") courseKeyType; //KeyType
  @CreCouInfoMod.Action("courseKeyTypeHandle") courseKeyTypeHandle; //KeyType  action修改方法

  @Prop({
    required: false,
    default: () => {
      return {
        src: require("../../assets/creator/default.png")
      };
    }
  })
  options;
  // 关闭弹框
  closeFun() {
    this.PublishShowHandle({
      PublishShow: false
    });
    this.textHandle({
      textHandle: []
    });
  }
  // 点击按钮
  clickFun(data) {
    if (data == "去填写") {
      let type = this.courseKeyType;
      this.dropDown = false;
      if (type === 1 || type === 2 || type === 3 || type === 4) {
        //标准课
        this.$router.push({
          path: "/classCourseInfo",
          query: {
            courseId: this.courseKeyId,
            courseType: this.courseKeyType
          }
        });
        this.PublishShowHandle({
          PublishShow: false
        });
      } else {
        // 课程频道
        this.$router.push({
          path: "/classInfoBase",
          query: {
            courseId: this.courseKeyId,
            courseType: this.courseKeyType
          }
        });
        this.PublishShowHandle({
          PublishShow: false
        });
      }
    } else {
      let data = {
        keyId: this.courseKeyId,
        keyType: this.courseKeyType
      };
      productPublish(data).then(res => {
        if (res.code == 0) {
          this.PublishShowHandle({
            PublishShow: false
          });
          let msg = "发布成功";
          message(msg);
          this.PublishShowHandle({
            PublishShow: false
          });
        } else {
          tipsFail(res.msg);
        }
      });
    }
  }

  mounted() {}
  created() {}
}
</script>
<style lang="scss" scoped>
.classBox {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 410px;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  border-radius: 13px;
  padding: 24px 24px 20px 32px;
  z-index: 9999;
  .header {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
  }
  .main {
    margin-top: 15px;
    margin-bottom: 29px;
    width: 342px;
    height: 48px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
  }
  .footer {
    position: absolute;
    right: 24px;
    .el-button:first-child {
      width: 109px;
      height: 36px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
      border-radius: 18px;
      // border: 1px solid rgba(254, 120, 101, 0.4);
      border: none !important;
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

    .el-button:last-child {
      width: 110px;
      height: 36px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      line-height: 11px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      border: none !important;
      &:hover {
        color: rgba(255, 255, 255, 1);
      }
      &:focus {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>


