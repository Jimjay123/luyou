<template>
  <div class="elements" v-if="boxShow">
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
  courseExpressModifyExpress,
  productExpress
} from "../../../../service/creatorApi";
import { cloneObj, tipsFail, message, tipsMsg } from "../../../../utils/utils";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
const CreCouInfoMod = namespace("creatorCourseInfo");
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
  @CreCouInfoMod.State("boxShow") boxShow; //弹框显示隐藏
  @CreCouInfoMod.Action("boxShowHandle") boxShowHandle; //弹框显示隐藏  action修改方法

  @CreCouInfoMod.State("file") file; //上传文件缓存信息
  @CreCouInfoMod.Action("fileHandle") fileHandle; //上传文件缓存信息  action修改方法

  @CreCouInfoMod.State("title") title; //课程标题
  @CreCouInfoMod.Action("titleHandle") titleHandle; //课程标题  action修改方法

  @CreCouInfoMod.State("majorTeacherList") majorTeacherList; //专业老师可选数组
  @CreCouInfoMod.Action("majorTeacherListHandle") majorTeacherListHandle; //专业老师可选数组  action修改方法

  @CreCouInfoMod.State("duration") duration; //建议时长
  @CreCouInfoMod.Action("durationHandle") durationHandle; //建议时长  action修改方法

  @CreCouInfoMod.State("selfIntro") selfIntro; //课程简介
  @CreCouInfoMod.Action("selfIntroHandle") selfIntroHandle; //课程简介  action修改方法

  @CreCouInfoMod.State("major") major; //专业学科选中项
  @CreCouInfoMod.Action("majorHandle") majorHandle; //专业学科选中项  action修改方法

  @CreCouInfoMod.State("majorTips") majorTips; //专业学科选中项
  @CreCouInfoMod.Action("majorTipsHandle") majorTipsHandle; //专业学科选中项  action修改方法

  @CreCouInfoMod.State("tagList") tagList; //标签可选列表
  @CreCouInfoMod.Action("tagListHandle") tagListHandle; //标签可选列表  action修改方法

  @CreCouInfoMod.State("learnReceives") learnReceives; //学到什么
  @CreCouInfoMod.Action("learnReceivesHandle") learnReceivesHandle; //学到什么  action修改方法

  @CreCouInfoMod.State("learnRequires") learnRequires; //需要什么
  @CreCouInfoMod.Action("learnRequiresHandle") learnRequiresHandle; //需要什么  action修改方法

  @CreCouInfoMod.State("welcome") welcome; //欢迎消息
  @CreCouInfoMod.Action("welcomeHandle") welcomeHandle; //欢迎消息  action修改方法

  @CreCouInfoMod.State("congratulation") congratulation; //祝贺消息
  @CreCouInfoMod.Action("congratulationHandle") congratulationHandle; //祝贺消息  action修改方法

  @CreCouInfoMod.State("feedbackList") feedbackList; //祝贺消息
  @CreCouInfoMod.Action("feedbackListHandle") feedbackListHandle; //祝贺消息  action修改方法

  @CreCouInfoMod.State("datum") datum; //基准分设置
  @CreCouInfoMod.Action("datumHandle") datumHandle; //基准分设置  action修改方法

  @CreCouInfoMod.State("delFeedbackList") delFeedbackList; //祝贺消息
  @CreCouInfoMod.Action("delFeedbackListHandle") delFeedbackListHandle; //祝贺消息  action修改方法

  @CreCouInfoMod.State("courseKeyId") courseKeyId; //KeyId
  @CreCouInfoMod.Action("courseKeyIdHandle") courseKeyIdHandle; //KeyId  action修改方法

  @CreCouInfoMod.State("courseKeyType") courseKeyType; //KeyType
  @CreCouInfoMod.Action("courseKeyTypeHandle") courseKeyTypeHandle; //KeyType  action修改方法

  @CreCouInfoMod.State("courseKeyName") courseKeyName; //KeyName
  @CreCouInfoMod.Action("courseKeyNameHandle") courseKeyNameHandle; //KeyName  action修改方法

  @CreCouInfoMod.State("courseExpressId") courseExpressId; //ExpressId
  @CreCouInfoMod.Action("courseExpressIdHandle") courseExpressIdHandle; //ExpressId  action修改方法

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
    this.boxShowHandle({
      boxShow: false
    });
  }

  //提交基本信息接口
  putCouChaBaseInfoFun(state) {
    let tagList = this.tagList.filter(
      d => d.select === true || (d.select === false && d.delFlag === true)
    );
    let tagList1 = this.tagList.filter(d => d.select === true);
    if (this.memberId == "") {
      return;
    } else {
      let majorTeacherList = this.majorTeacherList;
      let partnerIds = [];
      majorTeacherList.map(m => {
        if (m.selected) {
          partnerIds.push(m.id);
        }
      });
      if (this.courseKeyId == "") {
        let data = {
          state: 4,
          expressToMemberId: this.memberId, // 转审人id
          courseId: this.$route.query.courseId, //课程id
          courseName: this.title || "", //课程标题
          partnerIds: partnerIds.join(","), //专业老师
          duration: this.duration || 0, //建议时长
          mainContent: this.selfIntro || "", //课程描述
          subjectMajorId: this.major.id || "", //专业id
          subjectMajorName: this.major.name || "", //专业名称
          courseTagRelVoList: tagList, //多个标签id字符串
          popularizeImageUrl: this.file.url || "", //推广图片
          learnReceiveList: this.learnReceives.filter(d => d.answer), //获得什么
          learnRequireList: this.learnRequires.filter(d => d.answer), //需要什么
          welcome: this.welcome || "", //欢迎消息
          congratulation: this.congratulation || "", //祝贺消息
          feedbackList: this.feedbackList || [], //智能反馈设置
          score: this.datum || 0, //基准分设置
          delFeedbackList: this.delFeedbackList || [] //智能反馈后端带出，被删除的项
        };
        putCouBaseInfo(data).then(res => {
          if (res.code == 0) {
            let msg = "转审成功";
            message(msg);
            this.$router.push({
              path: "/creator/home"
            });
            this.boxShowHandle({
              boxShow: false
            });
          } else {
            tipsFail(res.msg);
          }
        });
      } else {
        if (this.courseExpressId == 1) {
          let data = {
            keyId: this.courseKeyId,
            expressToMemberId: this.memberId, // 转审人id
            keyType: this.courseKeyType, //课程keyType
            keyName: this.courseKeyName || "" //课程标题
          };
          productExpress(data).then(res => {
            if (res.code == 0) {
              let msg = "转审成功";
              message(msg);
              this.boxShowHandle({
                boxShow: false
              });
            } else {
              tipsFail(res.msg);
            }
          });
        } else {
          let data = {
            keyId: this.courseKeyId,
            expressToMemberId: this.memberId, // 转审人id
            keyType: this.courseKeyType, //课程keyType
            keyName: this.courseKeyName || "", //课程标题
            expressId: this.courseExpressId //课程expressId
          };
          courseExpressModifyExpress(data).then(res => {
            if (res.code == 0) {
              let msg = "转审成功";
              message(msg);
              this.boxShowHandle({
                boxShow: false
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
      } else {
        tipsFail(res.msg);
      }
    });
  }
  mounted() {}
  created() {
    this.memberTeacherAuthorListFun();
    console.log(this.courseKeyId);
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


