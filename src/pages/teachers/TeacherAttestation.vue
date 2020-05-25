<template>
  <div>
    <TopHeaderp></TopHeaderp>
    <!--绑定手机号 start-->
    <BindMobile :show="show" :mobileFun="mobileFun"></BindMobile>
    <!--绑定手机号 end-->

    <div class="main-content clearfix">
      <!--完成步骤开始 start-->
      <StepItem></StepItem>
      <!--完成步骤开始 end-->

      <div class="form-box">
        <div class="credential clearfix">身份认证（必填）</div>
        <div class="clearfix">
          <div class="left-box">
            <div class="item">
              <div class="left">姓名</div>
              <div class="right">
                <InputBox
                  class="input"
                  :required="true"
                  :style="inputStyle"
                  :tips="memberNameTips"
                  :value="memberName"
                  :placeHolder="'请填写真实姓名'"
                  :input="(e, type) => inputChange(e, type, 'memberName')"
                ></InputBox>
              </div>
            </div>
            <div class="item">
              <div class="left">性别</div>
              <div class="right">
                <span :class="getClass('男')" @click="professionFun('男')"
                  >男</span
                >
                <span :class="getClass('女')" @click="professionFun('女')"
                  >女</span
                >
              </div>
            </div>
            <div class="item">
              <div class="left">手机号</div>
              <div class="right" v-if="mobile">
                <InputBox
                  class="input"
                  :style="inputStyle"
                  :value="mobile"
                  :disabled="true"
                  :placeHolder="'例如系主任'"
                  :input="(e, type) => inputChange(e, type, 'mobile')"
                ></InputBox>
                <i class="bind-tips">已绑定</i>
              </div>
              <div class="right clearfix" v-else>
                <a class="go-bind" href="javascript:;" @click="bindMobileFun"
                  >去绑定</a
                >
              </div>
            </div>

            <div class="item">
              <div class="left">电子邮箱</div>
              <div class="right">
                <InputBox
                  class="input"
                  :style="inputStyle"
                  :value="email"
                  :placeHolder="'填写电子邮箱'"
                  :input="(e, type) => inputChange(e, type, 'email')"
                ></InputBox>
              </div>
            </div>

            <div class="item">
              <div class="left">身份证</div>
              <div class="right">
                <InputBox
                  class="input"
                  :style="inputStyle"
                  :value="identityCardNo"
                  :placeHolder="'请输入身份证'"
                  :input="(e, type) => inputChange(e, type, 'identityCardNo')"
                ></InputBox>
              </div>
            </div>
          </div>
          <div class="left-box">
            <!--上传头像 start-->
            <div class="item">
              <div class="upload">
                <div class="up-box">
                  <input
                    type="file"
                    ref="file"
                    @change="fileChange"
                    accept="image/*"
                  />
                  <img :src="header" alt />
                  <span>编辑</span>
                </div>
              </div>
            </div>
            <!--上传头像 end-->

            <div class="item">
              <div class="left">大学/单位</div>
              <div class="right">
                <SelectBox
                  :style="inputStyle"
                  :tips="universityNameTips"
                  :selVal="universityName"
                  :list="universityNameList"
                  :input="e => inputChange(e, 'select', 'universityName')"
                ></SelectBox>
              </div>
            </div>
            <div class="item">
              <div class="left">所在学院</div>
              <div class="right">
                <InputBox
                  class="input"
                  :style="inputStyle"
                  :value="collegeName"
                  :placeHolder="'例如：社会工作'"
                  :input="(e, type) => inputChange(e, type, 'collegeName')"
                ></InputBox>
              </div>
            </div>

            <div class="item">
              <div class="left">所在专业</div>
              <div class="right">
                <SelectBox
                  :style="inputStyle"
                  :tips="majorNameTips"
                  :selVal="majorName"
                  :list="majorNameList"
                  :input="e => inputChange(e, 'select', 'majorName')"
                ></SelectBox>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-box clearfix">
          <a href="javascript:;" class="submit" @click="submitForm">下一步</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import { memIdeIdeInfo } from "../../service/teachersApi";
import { putFileAvatarUpload } from "../../service/groupApi";
import {
  memInfoGetMobile,
  mobCapCheCaptcha,
  getSubMajorList,
  getUniversityList
} from "../../service/teachersApi";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import InputBox from "../group/inputBox";
import StepItem from "./stepItem";
import BindMobile from "./bindMobile";
import TopHeaderp from "../Header/headers";
import SelectBox from "./selectBox";
@Component({
  name: "teacherAttestation",
  components: {
    StepItem,
    InputBox,
    BindMobile,
    SelectBox,
    TopHeaderp: TopHeaderp //注册该组件
  }
})
export default class TeacherAttestation extends Vue {
  show = false; //绑定手机号弹框
  file = ""; //
  inputStyle = { width: "299px", height: "40px" }; //input 输入框宽高

  memberName = ""; //姓名
  memberNameTips = {
    show: false,
    content: "姓名不能为空"
  };
  gender = "男"; //性别
  mobile = ""; //手机号
  email = ""; //电子邮箱
  identityCardNo = ""; //身份证号
  universityName = {
    val: "",
    label: ""
  }; //大学单位
  universityNameTips = {
    show: false,
    content: "大学单位不能为空"
  };
  universityNameList = [
    {
      val: "libai",
      label: "李白"
    },
    {
      val: "dufu",
      label: "杜甫"
    }
  ];
  collegeName = ""; //学院
  collegeNameTips = {
    show: false,
    content: "学院"
  };
  majorName = {
    val: "",
    label: ""
  }; //专业
  majorNameTips = {
    show: false,
    content: "专业不能为空"
  };
  majorNameList = [];

  imageUrl = ""; //上传头像
  get header() {
    if (this.imageUrl !== "") {
      return this.imageUrl;
    } else {
      console.log(this.gender);
      if (this.gender == "男") {
        return require("../../assets/teachers/boy.svg");
      } else {
        return require("../../assets/teachers/girls.svg");
      }
    }
  }
  //计算class
  @Emit getClass(val1) {
    if (val1 === this.gender) {
      return "active";
    } else {
      return "";
    }
  }

  //绑定手机号弹框回调
  @Emit mobileFun(type, val) {
    if (type === "hide") {
      this.show = false;
    } else {
      //提交成功回调手机号
      this.mobile = val;
      this.show = false;
    }
  }

  //绑定手机号 点击事件
  @Emit bindMobileFun() {
    this.show = true;
  }

  //性别 改变事件
  @Emit professionFun(val) {
    this.gender = val;
  }

  //表单改变事件
  @Emit inputChange(e, type, name) {
    if (type === "input") {
      this[name] = e.target.value;
      if (name === "memberName") {
        this.memberNameTips.show = false;
      }
    } else if (type === "del") {
      this[name] = "";
    } else if (type === "select") {
      this[name] = e;
      if (name === "universityName") {
        this.universityNameTips.show = false;
      } else if (name === "majorName") {
        this.majorNameTips.show = false;
      }
    }
  }

  @Emit selectFile(e) {
    this.file = e.target.files[0];
  }

  @Emit submitForm() {
    //下一步页面
    let data = this;
    let newData = {
      memberName: data.memberName, //姓名
      gender: data.gender === "女" ? 2 : 1, //性别
      mobile: data.mobile, //手机号
      email: data.email, //电子邮箱
      universityName: data.universityName.label, //大学单位
      universityId: data.universityName.val, //大学单位
      collegeName: data.collegeName, //学院
      majorName: data.majorName.label, //专业
      majorId: data.majorName.val, //专业
      avatar: this.imageUrl, //头像
      identityCardNo: data.identityCardNo //身份证号
    };
    let check = true;
    //姓名校验
    if (this.memberName === "") {
      this.memberNameTips.show = true;
      check = false;
    } else {
      this.memberNameTips.show = false;
    }

    //大学单位 校验
    if (this.universityName.val === "") {
      this.universityNameTips.show = true;
      check = false;
    } else {
      this.universityNameTips.show = false;
    }

    //专业 校验
    if (this.majorName.val === "") {
      this.majorNameTips.show = true;
      check = false;
    } else {
      this.majorNameTips.show = false;
    }

    //手机号是否绑定
    if (this.mobile === "") {
      check = false;
    }

    if (!check) {
      return;
    }
    sessionStorage.setItem("teacherBaseInfo", JSON.stringify(newData));
    this.$router.push(
      "/teachers/teacherCredentials?identifiedType=" +
        this.$route.query.identifiedType
    );
  }

  //上传图片改变事件
  @Emit fileChange(event) {
    if (event.target.files.length <= 0) {
      return;
    }
    let file = event.target.files[0];
    let data = new FormData();
    data.append("file", file);
    putFileAvatarUpload(data).then(res => {
      if (res.code == "0") {
        this.imageUrl = res.webUrl;
      }
    });
  }

  //老师端获取认证信息接口
  @Emit memIdeIdeInfoFun() {
    memIdeIdeInfo().then(res => {
      if (res.code == "0") {
        let d = res.data;
        this.setDateFun(d);
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取数据设置数据
  @Emit setDateFun(d) {
    this.memberName = d.memberName || ""; //姓名
    if (d.gender === 2) {
      this.gender = "女"; //姓别
    } else {
      this.gender = "男"; //姓别
    }
    this.mobile = d.mobile; //
    this.email = d.email || ""; //电子邮箱
    this.identityCardNo = d.identityCardNo || ""; //身份证

    this.universityName = {
      label: d.universityName || "",
      val: d.universityId || ""
    }; //大学/单位
    this.collegeName = d.collegeName || ""; //所在院校
    this.majorName = {
      label: d.majorName || "",
      val: d.majorId || ""
    }; //专业学科
    this.imageUrl = d.avatar || ""; //头像
  }

  //老师端获取--绑定手机号接口
  @Emit memInfoGetMobileFun() {
    memInfoGetMobile().then(res => {
      if (res.code == "0") {
        this.mobile = res.mobile;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取大学可选
  @Emit getUniversityListFun() {
    getUniversityList().then(res => {
      console.log(res);
      if (res.code == "0") {
        this.universityNameList = this.getMapList(res.list, "id", "name");
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取专业可选
  @Emit getSubMajorListFun() {
    getSubMajorList().then(res => {
      if (res.code == "0") {
        this.majorNameList = this.getMapList(res.list, "id", "name");
      } else {
        tipsFail(res.msg);
      }
    });
  }

  @Emit getMapList(list = [], val, label) {
    let newList = [
      {
        val: "",
        label: "请选择"
      }
    ];
    if (list.length > 0) {
      list.map((item, index) => {
        newList.push({
          val: item[val],
          label: item[label]
        });
      });
    }
    return cloneObj(newList);
  }

  created() {
    let d = sessionStorage.getItem("teacherBaseInfo");
    if (d && d !== undefined) {
      this.setDateFun(JSON.parse(d));
    }
    //调用接口--获取大学专业可选项
    this.getUniversityListFun();
    this.getSubMajorListFun();

    if (!this.mobile) {
      this.memInfoGetMobileFun();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

header {
  width: 1440px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(237, 237, 237, 1);
}

.header-content {
  height: 60px;
  width: 90%;
  margin: 0 auto;
}

.header-content img {
  margin-top: 10px;
  float: left;
}

.header-content ul {
  float: left;
  margin-left: 252px;
  height: 60px;
}

.header-content ul li {
  margin-top: 12px;
  height: 60px;
  margin-right: 80px;
  float: left;
}

.header-content ul li a {
  color: rgba(102, 102, 102, 1);
  display: block;
}

.header-content div {
  width: 60px;
  height: 48px;
  background: rgba(255, 255, 255, 0.01);
  float: left;
}

.header-content div img {
  margin-left: 40px;
  width: 36px;
  height: 30px;
  background: rgba(255, 255, 255, 0.01);
}

@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.main-content {
  width: 1200px;
  margin: 0 auto;
}

.form-box {
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

.left-box {
  float: left;
  width: 50%;
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
    position: relative;
    @include fontSet(16px, rgba(0, 0, 0, 0.65), normal);
    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 137px;
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
    .bind-tips {
      position: absolute;
      top: 10px;
      right: 14px;
      @include fontSet(14px, rgba(254, 120, 101, 1), 400);
    }
    .go-bind {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 97px;
      height: 32px;
      border-radius: 16px;
      opacity: 0.4;
      @include fontSet(14px, #fe7865, 500);
      margin: 4px 0;
      border: 1px solid rgba(254, 120, 101, 1);
    }
  }
}

.upload {
  .up-box {
    width: 83px;
    height: 83px;
    border-radius: 63px;
    border: 2px solid rgba(254, 120, 101, 0.1);
    position: relative;
    margin-top: 18px;
    margin-left: 300px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 10;
    }
    span {
      display: none;
    }
  }
  .up-box:hover {
    span {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      text-align: center;
      line-height: 79px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      letter-spacing: 2px;
    }
  }
}

.btn-box {
  text-align: right;
  margin-right: 40px;
  margin-top: 20px;
  a {
    width: 109px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
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

.btn-box {
  text-align: right;
  margin-right: 40px;
  margin-top: 20px;
  a {
    width: 109px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
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
.btn-box {
  text-align: right;
  margin-right: 40px;
  margin-top: 20px;
  a {
    width: 109px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
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
