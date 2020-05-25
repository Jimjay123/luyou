<template>
  <div class="elements" v-if="channelShow">
    <div class="classBox" @click="closeFun"></div>
    <div class="box">
      <h3>转审课程</h3>
      <img class="closeImg" @click="closeFun" src="../../../../assets/creator/closeBtn.svg" alt />
      <SelectBox
        style="width:369px;height:40px;"
        :selVal="auditorList"
        :list="auditor"
        :input="(e)=>inputChange(e,'select','auditorList')"
        :placeHolder="'选择转审对象'"
      ></SelectBox>
      <div :class="memberId == '' ? 'noTransfer':'transfer'" @click="putCouChaBaseInfoFun('4')">转审</div>
      <div class="text">转审后，您将失去、转审对象将具备对该课程的“编辑”与“发布”功能</div>
    </div>
  </div>
</template>

<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
import MulSelectPlugin from "../../../common/mulSelectPlgin";
import SelectBox from "../../../teachers/selectBox";
import {
  putCouBaseInfo,
  memberTeacherAuthorList,
  putCouChaBaseInfo,
  courseExpressModifyExpress,
  productExpress
} from "../../../../service/creatorApi";

import { cloneObj, tipsFail, message, tipsMsg } from "../../../../utils/utils";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
const CreBaseInfoMod = namespace("creatorBaseInfo");
@Component({
  name: "CourseBox",
  directives: {
    Clickoutside
  },
  components: {
    MulSelectPlugin,
    SelectBox
  }
})
export default class CourseBox extends Vue {
  @CreBaseInfoMod.State("channelShow") channelShow; //弹框显示隐藏
  @CreBaseInfoMod.Action("channelShowHandle") channelShowHandle; //弹框显示隐藏  action修改方法

  @CreBaseInfoMod.State("file") file; //上传文件缓存信息
  @CreBaseInfoMod.Action("fileHandle") fileHandle; //上传文件缓存信息  action修改方法

  @CreBaseInfoMod.State("title") title; //课程标题
  @CreBaseInfoMod.Action("titleHandle") titleHandle; //课程标题  action修改方法

  @CreBaseInfoMod.State("majorTeacherList") majorTeacherList; //专业老师可选数组
  @CreBaseInfoMod.Action("majorTeacherListHandle") majorTeacherListHandle; //专业老师可选数组  action修改方法

  @CreBaseInfoMod.State("duration") duration; //建议时长
  @CreBaseInfoMod.Action("durationHandle") durationHandle; //建议时长  action修改方法

  @CreBaseInfoMod.State("selfIntro") selfIntro; //课程简介
  @CreBaseInfoMod.Action("selfIntroHandle") selfIntroHandle; //课程简介  action修改方法

  @CreBaseInfoMod.State("major") major; //专业学科选中项
  @CreBaseInfoMod.Action("majorHandle") majorHandle; //专业学科选中项  action修改方法

  @CreBaseInfoMod.State("majorTips") majorTips; //专业学科选中项
  @CreBaseInfoMod.Action("majorTipsHandle") majorTipsHandle; //专业学科选中项  action修改方法

  @CreBaseInfoMod.State("tagList") tagList; //标签可选列表
  @CreBaseInfoMod.Action("tagListHandle") tagListHandle; //标签可选列表  action修改方法

  @CreBaseInfoMod.State("learnReceives") learnReceives; //学到什么
  @CreBaseInfoMod.Action("learnReceivesHandle") learnReceivesHandle; //学到什么  action修改方法

  @CreBaseInfoMod.State("learnRequires") learnRequires; //需要什么
  @CreBaseInfoMod.Action("learnRequiresHandle") learnRequiresHandle; //需要什么  action修改方法

  @CreBaseInfoMod.State("welcome") welcome; //欢迎消息
  @CreBaseInfoMod.Action("welcomeHandle") welcomeHandle; //欢迎消息  action修改方法

  @CreBaseInfoMod.State("congratulation") congratulation; //祝贺消息
  @CreBaseInfoMod.Action("congratulationHandle") congratulationHandle; //祝贺消息  action修改方法

  @CreBaseInfoMod.State("feedbackList") feedbackList; //祝贺消息
  @CreBaseInfoMod.Action("feedbackListHandle") feedbackListHandle; //祝贺消息  action修改方法

  @CreBaseInfoMod.State("datum") datum; //基准分设置
  @CreBaseInfoMod.Action("datumHandle") datumHandle; //基准分设置  action修改方法

  @CreBaseInfoMod.State("delFeedbackList") delFeedbackList; //祝贺消息
  @CreBaseInfoMod.Action("delFeedbackListHandle") delFeedbackListHandle; //祝贺消息  action修改方法

  @CreBaseInfoMod.State("channelKeyId") channelKeyId; //KeyId
  @CreBaseInfoMod.Action("channelKeyIdHandle") channelKeyIdHandle; //KeyId  action修改方法

  @CreBaseInfoMod.State("channelKeyType") channelKeyType; //KeyType
  @CreBaseInfoMod.Action("channelKeyTypeHandle") channelKeyTypeHandle; //KeyType  action修改方法

  @CreBaseInfoMod.State("channelKeyName") channelKeyName; //KeyName
  @CreBaseInfoMod.Action("channelKeyNameHandle") channelKeyNameHandle; //KeyName  action修改方法

  @CreBaseInfoMod.State("channelExpressId") channelExpressId; //ExpressId
  @CreBaseInfoMod.Action("channelExpressIdHandle") channelExpressIdHandle; //ExpressId  action修改方法

  auditor = []; //审核人员
  auditorList = [
    {
      val: "libai",
      label: "李白"
    },
    {
      val: "dufu",
      label: "杜甫"
    }
  ];
  memberId = "";

  //表单改变事件
  @Emit inputChange(e, type, name) {
    this.memberId = e.val;
    this[name] = e;
  }

  // 关闭弹框
  closeFun() {
    this.channelShowHandle({
      channelShow: false
    });
  }

  //提交基本信息接口
  putCouChaBaseInfoFun(state) {
    if (this.memberId == "") {
      return;
    } else {
      if (this.channelKeyId == "") {
        let data = {
          state: 4,
          expressToMemberId: this.memberId, // 转审人id
          courseChannelId: this.$route.query.courseId, //课程id
          courseChannelName: this.title || "", //课程标题
          duration: this.duration || 0, //建议时长
          summary: this.selfIntro || "", //课程描述
          subjectMajorId: this.major.id || "", //专业id
          subjectMajorName: this.major.name || "", //专业名称
          courseTagRelVoList: this.tagList, //多个标签id字符串
          popularizeImageUrl: this.file.url || "", //推广图片
          learnReceiveList: this.learnReceives.filter(d => d.answer), //获得什么
          learnRequireList: this.learnRequires.filter(d => d.answer) //需要什么
        };
        putCouChaBaseInfo(data).then(res => {
          if (res.code == 0) {
            let msg = "转审成功";
            message(msg);
            this.$router.push({
              path: "/creator/home"
            });
            this.channelShowHandle({
              channelShow: false
            });
          } else {
            tipsFail(res.msg);
          }
        });
      } else {
        if (this.channelExpressId == null) {
          let data = {
            keyId: this.channelKeyId,
            expressToMemberId: this.memberId, // 转审人id
            keyType: this.channelKeyType, //课程keyType
            keyName: this.channelKeyName || "" //课程标题
          };
          productExpress(data).then(res => {
            if (res.code == 0) {
              let msg = "转审成功";
              message(msg);
              this.channelShowHandle({
                channelShow: false
              });
            } else {
              tipsFail(res.msg);
            }
          });
        } else {
          let data = {
            keyId: this.channelKeyId,
            expressToMemberId: this.memberId, // 转审人id
            keyType: this.channelKeyType, //课程keyType
            keyName: this.channelKeyName || "", //课程标题
            expressId: this.channelExpressId //课程expressId
          };
          courseExpressModifyExpress(data).then(res => {
            if (res.code == 0) {
              let msg = "转审成功";
              message(msg);
              this.channelShowHandle({
                channelShow: false
              });
            } else {
              tipsFail(res.msg);
            }
          });
        }
      }
    }
  }

  @Emit getMapList(list = [], val, label) {
    let auditor = [];
    if (list.length > 0) {
      list.map((item, index) => {
        auditor.push({
          val: item[val],
          label: item[label]
        });
      });
    }
    return cloneObj(auditor);
  }

  memberTeacherAuthorListFun() {
    memberTeacherAuthorList().then(res => {
      if (res.code == 0) {
        this.auditor = this.getMapList(res.list, "memberId", "memberName");
        return;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  mounted() {}
  created() {
    this.memberTeacherAuthorListFun();
  }
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
  width: 551px;
  height: 220px;
  background: rgba(255, 255, 255, 1);
  border-radius: 13px;
  padding: 26px 32px;
  z-index: 9999;
  h3 {
    width: 88px;
    height: 30px;
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-bottom: 24px;
  }
  .transfer {
    cursor: pointer;
    float: right;
    width: 110px;
    height: 40px;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border-radius: 6px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .text {
    margin-top: 20px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(179, 179, 179, 1);
    line-height: 20px;
  }

  .sel-box /deep/ ul {
    max-height: 240px;
  }

  .noTransfer {
    float: right;
    width: 110px;
    height: 40px;
    background: rgba(153, 153, 153, 0.2);
    border-radius: 6px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }

  .closeImg {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    width: 37px;
    height: 37px;
  }
}
</style>


