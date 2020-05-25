<template>
  <div>
    <TopHeaderp></TopHeaderp>
    <div class="main-content">
      <!--完成步骤开始 start-->
      <StepItem :step="2"></StepItem>
      <!--完成步骤开始 end-->
      <div class="must">
        <div class="credential">身份认证（必填）</div>
        <div class="item">
          <div class="left">职业</div>
          <div class="right">
            <span :class="getClass('专业老师')" @click="professionFun('专业老师')">专业老师</span>
            <span :class="getClass('创作者')" @click="professionFun('创作者')">专业老师&创作者</span>

            <!-- @click="professionFun('系主任')" -->
            <span :class="getClass('系主任')">系主任</span>

            <!-- @click="professionFun('学院领导')" -->
            <span :class="getClass('学院领导')">学院领导</span>
            <!--<span class="disabled" @click="professionFun('学院领导')" >学院领导</span>-->
          </div>
        </div>
        <div class="item">
          <div class="left">职称</div>
          <div class="right">
            <SelectBox
              style="width:376px;height:40px;"
              :selVal="title"
              :tips="titleTips"
              :list="list"
              :input="(e)=>inputChange(e,'select','title')"
            ></SelectBox>
          </div>
        </div>
        <div class="item">
          <div class="left">职务</div>
          <div class="right">
            <InputBox
              class="input"
              style="width:376px;height:40px;"
              :value="job"
              :tips="jobTips"
              :placeHolder="'例如系主任'"
              :input="(e,type)=>inputChange(e,type,'job')"
            ></InputBox>
          </div>
        </div>
        <div class="item">
          <div class="left">个人简介</div>
          <div class="right">
            <TextareaBox
              class="input"
              style="width:618px;height:112px;"
              :value="selfIntro"
              :tips="selfIntroTips"
              :maxLength="300"
              :limit="true"
              :placeHolder="'概述一下自己耕耘的领域，我们会展示在讲师介绍里，便于老师学生了解到您。'"
              :input="(e,type)=>inputChange(e,type,'selfIntro')"
            ></TextareaBox>
          </div>
        </div>
        <div class="btn-box">
          <a href="javascript:;" class="save" @click="couPlaBasPlaInfo('0')">上一步</a>
          <a href="javascript:;" class="submit" @click="couPlaBasPlaInfo('1')">提交</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import StepItem from "./stepItem";
import InputBox from "../group/inputBox";
import TextareaBox from "./textareaBox";
import SelectBox from "./selectBox";
import { memberIteacherIdentity } from "../../service/teachersApi";
import TopHeaderp from "../Header/headers";

@Component({
  name: "teacherIndex",
  components: {
    StepItem,
    InputBox,
    TextareaBox,
    SelectBox,
    TopHeaderp: TopHeaderp //注册该组件
  }
})
export default class teacherIndex extends Vue {
  profession = ""; //职业
  title = {
    label: "",
    val: ""
  }; //职称
  titleTips = {
    show: false,
    content: "职称不能为空"
  };
  list = [
    {
      val: "",
      label: "请选择"
    },
    {
      val: "教授",
      label: "教授"
    },
    {
      val: "讲师",
      label: "讲师"
    },
    {
      val: "副教授",
      label: "副教授"
    }
  ];
  job = ""; //职务
  jobTips = {
    show: false,
    content: "职务不能为空"
  };
  selfIntro = ""; //自我介绍
  selfIntroTips = {
    show: false,
    content: "自我介绍不能为空"
  };

  //职业 改变事件
  @Emit professionFun(val) {
    this.profession = val;
    if (this.profession !== val) {
      this.jobTips.show = false;
      this.selfIntroTips.show = false;
    }
  }

  //表单改变事件
  @Emit inputChange(e, type, name) {
    if (type === "input") {
      this[name] = e.target.value;
      if (name === "job") {
        this.jobTips.show = false;
      }
      if (name === "selfIntro") {
        this.selfIntroTips.show = false;
      }
    } else if (type === "del") {
      this[name] = "";
    } else if (type === "select") {
      this[name] = e;
      if (name === "title") {
        this.titleTips.show = false;
      }
    }
  }

  //计算class
  @Emit getClass(val1) {
    if (val1 === this.profession) {
      return "active";
    } else {
      return "";
    }
  }

  //上一步或者提交点击事件
  @Emit couPlaBasPlaInfo(type) {
    if (type === "0") {
      this.$router.push({
        path: "/teachers/teacherAttestation",
        query: {
          identifiedType: this.$route.query.identifiedType
        }
      });
    } else {
      //提交触发
      let baseInfo = {};
      let d = sessionStorage.getItem("teacherBaseInfo");
      if (d && d !== undefined) {
        baseInfo = JSON.parse(d);
      }

      let teacherType = ""; //1 专业老师 2 创建者
      if (this.profession === "专业老师") {
        teacherType = 1;
      } else if (this.profession === "创作者") {
        teacherType = 2;
      }

      let check = false;
      if (this.title.val === "") {
        this.titleTips.show = true;
        check = true;
      }

      //创作者
      if (teacherType === 2) {
        //职务校验
        if (this.job === "") {
          this.jobTips.show = true;
          check = true;
        } else {
          this.jobTips.show = false;
        }

        //个人简介
        if (this.selfIntro === "") {
          this.selfIntroTips.show = true;
          check = true;
        } else {
          this.selfIntroTips.show = false;
        }
      }

      if (check) {
        return;
      }

      let data = {
        profession: this.profession,
        title: this.title.val,
        job: this.job,
        selfIntro: this.selfIntro,
        teacherType: teacherType,
        ...baseInfo
      };
      this.memberIteacherIdentityFun(data);
    }
  }

  //老师端认证信息提交接口
  @Emit memberIteacherIdentityFun(data) {
    memberIteacherIdentity(data).then(res => {
      if (res.code == "0") {
        sessionStorage.removeItem("teacherBaseInfo");
        //认证成功
        this.$router.push({
          path: "/teachers/teacherSubmitted"
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    let identifiedType = this.$route.query.identifiedType || "";
    if (identifiedType == 1) {
      this.profession = "专业老师";
    } else if (identifiedType == 3) {
      this.profession = "创作者";
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";

@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.main-content {
  width: 1200px;
  margin: 0 auto;
}

.must {
  width: 952px;
  height: 454px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 0 auto;
}

.credential {
  height: 48px;
  line-height: 48px;
  padding-left: 32px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  border: 1px solid #f1f1f1;
  margin-bottom: 21px;
}

.item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 0 32px;
  .left {
    @include fontSet(16px, #666, 400);
    width: 92px;
    height: 40px;
    line-height: 40px;
  }
  .input /deep/ i {
    top: 16px;
  }
  .right {
    @include fontSet(16px, rgba(0, 0, 0, 0.65), normal);
    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px;
      border: 1px solid rgba(230, 230, 230, 1);
      color: rgba(0, 0, 0, 0.25);
      margin-right: 20px;
      cursor: pointer;
    }
    .active {
      border: 1px solid rgba(254, 120, 101, 1);
      color: rgba(254, 120, 101, 1);
    }
    .disabled {
      border: none;
      background: rgba(250, 250, 250, 1);
      color: rgba(0, 0, 0, 0.25);
    }
    span:nth-child(3),
    span:nth-child(4) {
      cursor: not-allowed;
      background: rgba(250, 250, 250, 1);
      border: none;
    }
  }
}

.btn-box {
  text-align: right;
  margin-right: 40px;
  margin-top: 28px;
  a {
    width: 109px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
  }
  .save {
    border: 2px solid rgba(254, 120, 101, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
    @include fontSet(16px, #fe7865, 500);
    background: #fff;
  }
  .submit {
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    @include fontSet(16px, #fff, 500);
    margin-left: 21px;
    margin-right: 8px;
  }
}
</style>
