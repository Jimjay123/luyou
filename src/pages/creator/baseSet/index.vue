/**

* Created by wangxin

* @date 2019/9/3 17:22  编辑课程信息--频道--基础信息设置

*/
<template>
  <div class="classInfo">
    <TopHeader class="clearfix"></TopHeader>
    <section class="content">
      <Back />
      <div class="title clearfix">
        <BlockTitle />
      </div>
      <SectionCard title="基础信息">
        <BaseForm />
      </SectionCard>
      <SectionCard title="课程封面">
        <Upload :file="file" :fileCb="fileCb" />
      </SectionCard>
      <SectionCard title miniTitle="1">
        <!--学到什么 start-->
        <div>
          <h4 class="litSpace">本课程可学到什么</h4>
          <div class="elements contBox delHover" :key="index" v-for="(item,index) in learnReceives">
            <span>{{index<9?'0'+(index+1):index+1}}</span>
            <FormInput
              :style="styleObj"
              :maxLength="40"
              :limit="true"
              :maxLengthShow="true"
              :placeHolder="'本课程可学到什么'"
              :value="item.answer"
              :input="(e,type)=>learnChangeFun(index,'learnReceives',e)"
            />
            <i @click="delCallFun(index,'learnReceives')"></i>
          </div>
          <div
            class="elements contBox add"
            v-if="learnReceives.length<10"
            @click="addCallFun('learnReceives')"
          >
            <span>{{learnReceives.length<9?'0'+(learnReceives.length+1):learnReceives.length+1}}</span>
            <div class="icon-box">
              <i class="icon-add">添加一个答案</i>
            </div>
          </div>
        </div>
        <!--学到什么 end-->

        <!--需要什么 start-->
        <div>
          <h4 class="litSpace">学习课程的基本要求</h4>
          <div class="elements contBox delHover" :key="index" v-for="(item,index) in learnRequires">
            <span>{{index<9?'0'+(index+1):index+1}}</span>
            <FormInput
              :style="styleObj"
              :maxLength="40"
              :limit="true"
              :maxLengthShow="true"
              :placeHolder="'请输入基本要求'"
              :value="item.answer"
              :input="(e,type)=>learnChangeFun(index,'learnRequires',e)"
            />
            <i @click="delCallFun(index,'learnRequires')"></i>
          </div>
          <div
            class="elements contBox add"
            v-if="learnRequires.length<10"
            @click="addCallFun('learnRequires')"
          >
            <span>{{learnRequires.length<9?'0'+(learnRequires.length+1):learnRequires.length+1}}</span>
            <div class="icon-box">
              <i class="icon-add">添加一个答案</i>
            </div>
          </div>
        </div>
        <!--需要什么 end-->
      </SectionCard>
      <!--<SectionCard title="讲师简介" litTitle="认证时候填写的简介，不可更改">
        <div class="elements contBox">
          <div class="tea-info">
            {{teaInfo}}
          </div>
        </div>
      </SectionCard>-->
      <!--<h1>更多设置</h1>
      <SectionCard
        title="消息反馈设置"
        miniTitle="1"
        litTitle="当学生加入您的课程或您的课程时，您给学生写的消息（可选）会自动发送，以鼓励他们积极参加课程。"
      >
        <div class="elements contBox">
          <p>欢迎消息</p>
          <TextareaBox
            style="width:958px;height:67px;"
            :maxLength="50"
            :limit="true"
            :placeHolder="'阐述课程的学习要求'"
            :value="welcome"
            :input="(e,type)=>inputChange(e,type,'welcome')"
          />
          <p>祝贺消息</p>
          <TextareaBox
            style="width:958px;height:67px;"
            :maxLength="50"
            :limit="true"
            :placeHolder="'阐述课程的学习要求'"
            :value="congratulation"
            :input="(e,type)=>inputChange(e,type,'congratulation')"
          />
        </div>
       &lt;!&ndash; <h4 class="litSpace">智能反馈建议设置</h4>
        <div class="elements contBox">
          <ZoneCard v-for="item in cardList" :key="item.id" :id="item.id" :data="item"/>
        </div>
        <div class="addNew" @click="addNewCard">
          <i class="el-icon-plus"/> &nbsp;&nbsp;新增一个分数区间
        </div>&ndash;&gt;
      </SectionCard>-->
      <div class="btn-box" style="overflow:auto;margin:20px 0;">
        <BaseButton @click.native="putCouChaBaseInfoFun('1')" right label="发布" />
        <BaseButton
          style="background:#fff"
          @click.native="putCouChaBaseInfoFun('0')"
          right
          label="保存"
          border
        />
        <BaseButton
          style="background:rgba(255,255,255,0);color:rgba(254,120,101,1)"
          @click.native="displayFun"
          right
          label="转审"
        />
      </div>
      <channelBox v-if="channelShow"></channelBox>
    </section>
  </div>
</template>

<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
import TopHeader from "@/pages/Header/creatorHeader";
import Back from "./component/back";
import BlockTitle from "./component/blockTitle";
import channelBox from "./component/channelBox";
import BaseButton from "./component/button";
import SectionCard from "./component/sectionCard";
import BaseForm from "./component/form";
import Upload from "./component/upload";
import ZoneCard from "./component/zoneCard";
import FormInput from "./component/formInput";
import TextareaBox from "../../teachers/textareaBox";
import {
  popFileImageUpload,
  memTeaSelIntro,
  subMajorList,
  creatorBaseTagList,
  getCouBaseInfo,
  putCouBaseInfo,
  getCouChaBaseInfo,
  putCouChaBaseInfo
} from "../../../service/creatorApi";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import { tipsFail, message } from "../../../utils/utils";

const CreBaseInfoMod = namespace("creatorBaseInfo");
@Component({
  name: "BaseSet",
  directives: {
    Clickoutside
  },
  components: {
    TopHeader,
    Back,
    BlockTitle,
    BaseButton,
    SectionCard,
    BaseForm,
    Upload,
    ZoneCard,
    TextareaBox,
    FormInput,
    channelBox
  }
})
export default class BaseSet extends Vue {
  @CreBaseInfoMod.State("file") file; //上传文件缓存信息
  @CreBaseInfoMod.Action("fileHandle") fileHandle; //上传文件缓存信息  action修改方法

  @CreBaseInfoMod.State("teaInfo") teaInfo; //当前选择的群组 默认第一个群组
  @CreBaseInfoMod.Action("teaInfoHandle") teaInfoHandle; //当前选择的群组  action修改方法

  @CreBaseInfoMod.State("title") title; //课程标题
  @CreBaseInfoMod.Action("titleHandle") titleHandle; //课程标题  action修改方法

  @CreBaseInfoMod.State("titleTips") titleTips; //课程标题必填提示框
  @CreBaseInfoMod.Action("titleTipsHandle") titleTipsHandle; //课程标题必填提示框  action修改方法

  @CreBaseInfoMod.State("duration") duration; //建议时长
  @CreBaseInfoMod.Action("durationHandle") durationHandle; //建议时长  action修改方法

  @CreBaseInfoMod.State("durationTips") durationTips; //建议时长提示信息
  @CreBaseInfoMod.Action("durationTipsHandle") durationTipsHandle; //建议时长提示信息  action修改方法

  @CreBaseInfoMod.State("selfIntro") selfIntro; //课程简介
  @CreBaseInfoMod.Action("selfIntroHandle") selfIntroHandle; //课程简介  action修改方法

  @CreBaseInfoMod.State("selfIntroTips") selfIntroTips; //课程简介提示信息
  @CreBaseInfoMod.Action("selfIntroTipsHandle") selfIntroTipsHandle; //课程简介提示信息  action修改方法

  @CreBaseInfoMod.State("majorList") majorList; //专业学科可选项列表
  @CreBaseInfoMod.Action("majorListHandle") majorListHandle; //专业学科可选项列表  action修改方法

  @CreBaseInfoMod.State("major") major; //专业学科选中项
  @CreBaseInfoMod.Action("majorHandle") majorHandle; //专业学科选中项  action修改方法

  @CreBaseInfoMod.State("majorTips") majorTips; //专业学科选中项
  @CreBaseInfoMod.Action("majorTipsHandle") majorTipsHandle; //专业学科选中项  action修改方法

  @CreBaseInfoMod.State("tagList") tagList; //标签可选列表
  @CreBaseInfoMod.Action("tagListHandle") tagListHandle; //标签可选列表  action修改方法

  @CreBaseInfoMod.State("tag") tag; //标签选中项
  @CreBaseInfoMod.Action("tagHandle") tagHandle; //标签选中项  action修改方法

  @CreBaseInfoMod.State("learnReceives") learnReceives; //学到什么
  @CreBaseInfoMod.Action("learnReceivesHandle") learnReceivesHandle; //学到什么  action修改方法

  @CreBaseInfoMod.State("learnRequires") learnRequires; //需要什么
  @CreBaseInfoMod.Action("learnRequiresHandle") learnRequiresHandle; //需要什么  action修改方法

  @CreBaseInfoMod.State("welcome") welcome; //欢迎消息
  @CreBaseInfoMod.Action("welcomeHandle") welcomeHandle; //欢迎消息  action修改方法

  @CreBaseInfoMod.State("congratulation") congratulation; //祝贺消息
  @CreBaseInfoMod.Action("congratulationHandle") congratulationHandle; //祝贺消息  action修改方法

  @CreBaseInfoMod.State("channelShow") channelShow; //弹框显示隐藏
  @CreBaseInfoMod.Action("channelShowHandle") channelShowHandle; //弹框显示隐藏  action修改方法

  cardList = [];

  styleObj = {
    width: "955px",
    height: "40px",
    display: "inline-block",
    "vertical-align": "middle"
  };

  //上传图片回调方法
  fileCb(type, val) {
    if (type === "add") {
      //上传文件
      this.popFileImageUploadFun(val);
    }
  }

  //添加新的
  addCallFun(type) {
    if (type === "learnReceives") {
      let learnReceives = this.learnReceives;
      learnReceives.push({
        content: ""
      });
      this.setVuexFun("learnReceives", learnReceives);
    } else if (type === "learnRequires") {
      let learnRequires = this.learnRequires;
      learnRequires.push({
        content: ""
      });
      this.setVuexFun("learnRequires", learnRequires);
    }
  }

  //学道什么、需要什么  删除事件
  delCallFun(index, type) {
    if (type === "learnReceives") {
      let learnReceives = this.learnReceives;
      learnReceives.splice(index, 1);
      this.setVuexFun("learnReceives", learnReceives);
    } else if (type === "learnRequires") {
      let learnRequires = this.learnRequires;
      learnRequires.splice(index, 1);
      this.setVuexFun("learnRequires", learnRequires);
    }
  }

  //学道什么、需要什么  改变事件
  learnChangeFun(index, type, e) {
    if (type === "learnReceives") {
      let learnReceives = this.learnReceives;
      learnReceives[index].answer = e.target.value;
      this.setVuexFun("learnReceives", learnReceives);
    } else if (type === "learnRequires") {
      let learnRequires = this.learnRequires;
      learnRequires[index].answer = e.target.value;
      this.setVuexFun("learnRequires", learnRequires);
    }
  }

  //表单改变事件
  inputChange(e, type, name) {
    if (type === "input") {
      let obj = {};
      obj[name] = e.target.value;
      if (name === "duration") {
        //时长限制输入数字
        obj[name].replace(/[^0-9]/, "");
      }
      this[name + "Handle"](obj);
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

  addNewCard() {
    this.cardList.push({
      range0: "",
      range1: "",
      content: "",
      id: Math.random()
        .toString(16)
        .slice(2)
    });
  }

  //上传推广图片接口
  popFileImageUploadFun(file) {
    let data = new FormData();
    data.append("file", file);
    data.append("courseId", this.$route.query.courseId);
    popFileImageUpload(data).then(res => {
      if (res.code == 0) {
        let newfile = this.file;
        newfile.url = res.webUrl;
        newfile.name = file.name;
        this.fileHandle({ file: newfile });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取讲师简介
  memTeaSelIntroFun() {
    memTeaSelIntro().then(res => {
      if (res.code == 0) {
        this.teaInfoHandle({ teaInfo: res.data });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取专业列表
  subMajorListFun() {
    subMajorList().then(res => {
      if (res.code == 0) {
        this.majorListHandle({ majorList: res.list });
        if (this.major.id === "") {
          let major = { id: "", name: "" };
          if (res.list.length > 0) {
            major = res.list[0];
          }
          this.setVuexFun("major", major);
          this.creatorBaseTagListFun(major.id); //获取标签可选数据
        }
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取标签列表
  creatorBaseTagListFun(id) {
    creatorBaseTagList({
      majorId: id
    }).then(res => {
      if (res.code == 0) {
        let tagList = this.tagList;
        let allList = res.list || [];
        let list = [];
        allList.map(d => {
          let val = tagList.find(m => m.tagId === d.tagId && m.select);
          if (val) {
            d.select = true;
            d = { ...d, ...val };
          }
          list.push(d);
        });
        this.tagListHandle({ tagList: list });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //设置 vuex数据
  setVuexFun(name, val) {
    let obj = {};
    obj[name] = val;
    this[name + "Handle"](obj);
  }

  //获取基础信息
  getCouBaseInfoFun() {
    getCouChaBaseInfo({
      courseChannelId: this.$route.query.courseId
    }).then(res => {
      if (res.code == 0) {
        let data = res.data;
        //this.teaInfoHandle({teaInfo:res.data});
        //课程标题
        this.setVuexFun("title", data.courseChannelName || "");
        //专业学科
        this.setVuexFun("major", {
          id: data.subjectMajorId || "",
          name: data.subjectMajorName || ""
        });
        this.subMajorListFun();
        if (data.subjectMajorId) {
          this.creatorBaseTagListFun(data.subjectMajorId); //获取标签可选数据
        }

        //选择标签
        let tagList = data.courseTagRelVoList;
        tagList.map(m => {
          m.select = true;
        });
        this.setVuexFun("tagList", tagList || "");

        //建议时长
        this.setVuexFun("duration", data.duration || "");
        //课程简介
        this.setVuexFun("selfIntro", data.summary || "");

        //上传封面
        this.setVuexFun("file", {
          url: data.popularizeImageUrl || "",
          name: data.popularizeImageUrl
            ? data.popularizeImageUrl.split("/").pop()
            : ""
        });
        //学到什么
        this.setVuexFun("learnReceives", data.learnReceiveList || "");
        //需要什么
        this.setVuexFun("learnRequires", data.learnRequireList || "");
      } else {
        tipsFail(res.msg);
      }
    });
  }

  // 显示弹框
  displayFun() {
    let check = false; //错误校验 true 有必填项未填 false 没有
    //校验方法
    let saveCheckFun = name => {
      let val = this[name] || "";
      let tips = this[name + "Tips"];
      if (val === "") {
        tips.show = true;
        check = true;
      } else {
        tips.show = false;
      }
      let obj = {};
      obj[name + "Tips"] = tips;
      this[name + "TipsHandle"](obj);
    };

    let tagList = this.tagList.filter(
      d => d.select === true || (d.select === false && d.delFlag === true)
    );
    let tagList1 = this.tagList.filter(d => d.select === true);
    //转审

    //课程标题校验
    saveCheckFun("title");

    //专业学科校验
    saveCheckFun("major");
    let majorTips = this.majorTips;
    if (tagList1.length <= 0) {
      majorTips.show = true;
      check = true;
    } else {
      majorTips.show = false;
    }
    this.majorTipsHandle({
      majorTips
    });

    //建议时长校验
    saveCheckFun("duration");

    //课程介绍校验
    saveCheckFun("selfIntro");

    if (check) {
      return;
    }

    this.channelShowHandle({
      channelShow: true
    });
  }

  //设置tips false
  setTips(name) {
    let tips = this[name + "Tips"];
    tips.show = false;
    let obj = {};
    obj[name + "Tips"] = tips;
    this[name + "TipsHandle"](obj);
  }

  //提交基本信息接口
  putCouChaBaseInfoFun(state) {
    let check = false; //错误校验 true 有必填项未填 false 没有
    //校验方法
    let saveCheckFun = name => {
      let val = this[name] || "";
      let tips = this[name + "Tips"];
      if (val === "") {
        tips.show = true;
        check = true;
      } else {
        tips.show = false;
      }
      let obj = {};
      obj[name + "Tips"] = tips;
      this[name + "TipsHandle"](obj);
    };

    let tagList = this.tagList.filter(
      d => d.select === true || (d.select === false && d.delFlag === true)
    );
    let tagList1 = this.tagList.filter(d => d.select === true);
    if (state === "0") {
      //保存
      this.setTips("title");
      this.setTips("major");
      this.setTips("duration");
      this.setTips("selfIntro");
    } else {
      //课程标题校验
      saveCheckFun("title");

      //专业学科校验
      saveCheckFun("major");
      let majorTips = this.majorTips;
      if (tagList1.length <= 0) {
        majorTips.show = true;
        check = true;
      } else {
        majorTips.show = false;
      }
      this.majorTipsHandle({
        majorTips
      });

      //建议时长校验
      saveCheckFun("duration");

      //课程介绍校验
      saveCheckFun("selfIntro");
    }

    if (check) {
      return;
    }

    let data = {
      state: state === "0" ? 0 : 1,
      courseChannelId: this.$route.query.courseId, //课程id
      courseChannelName: this.title || "", //课程标题
      duration: this.duration || 0, //建议时长
      summary: this.selfIntro || "", //课程描述
      subjectMajorId: this.major.id || "", //专业id
      subjectMajorName: this.major.name || "", //专业名称
      courseTagRelVoList: tagList, //多个标签id字符串
      popularizeImageUrl: this.file.url || "", //推广图片
      learnReceiveList: this.learnReceives.filter(d => d.answer), //获得什么
      learnRequireList: this.learnRequires.filter(d => d.answer) //需要什么
      /*welcome:this.welcome||'',//欢迎消息
        congratulation:this.congratulation||"",//祝贺消息*/
    };

    putCouChaBaseInfo(data).then(res => {
      if (res.code == 0) {
        let msg =
          state === "0"
            ? "保存成功"
            : "您的课程已提交路由管理平台，请耐心等待审核~";
        message(msg);
        if (state === "1") {
          this.$router.push({
            path: "/creator/home"
          });
        } else {
          this.getCouBaseInfoFun();
        }
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    this.memTeaSelIntroFun(); //获取讲师简介
    this.subMajorListFun(); //获取专业列表
    this.getCouBaseInfoFun(); //获取基础信息接口
  }
}
</script>

<style lang="scss" scoped>
.elements {
  width: 100%;
  box-sizing: border-box;
  padding-left: 120px;
  margin: 20px 0;
  position: relative;
  min-height: 40px;
  span {
    line-height: 40px;
  }
  .label {
    position: absolute;
    line-height: 40px;
    left: 0;
    width: 120px;
    font-size: 16px;
    text-align: right;
    &.ness::before {
      content: " ";
      width: 8px;
      height: 8px;
      margin-right: 10px;
      border-radius: 50%;
      background: #fe7865;
      display: inline-block;
    }
    &::after {
      content: " ：";
    }
  }
  .label1Cont {
    overflow: auto;
    display: flex;
    align-items: center;
    min-height: 40px;
    .labels {
      float: left;
      box-sizing: border-box;
      font-size: 14px;
      cursor: pointer;
    }
    .label1 {
      height: 34px;
      padding: 8px;
      border-radius: 4px;
      line-height: 18px;
      margin-right: 20px;
      &.active {
        background: #fef3f1;
        color: #fe7865;
      }
    }
    .label2 {
      height: 30px;
      border-radius: 15px;
      padding: 4px 18px;
      line-height: 22px;
      border: solid 1px #f0f0f0;
      color: #999;
      margin-right: 20px;
      &.active {
        border-color: #fe7865;
        color: #fe7865;
      }
    }
  }
}

.classInfo {
  .content {
    width: 1200px;
    margin: 0 auto;
    .title {
      position: relative;
    }
  }
  .litSpace {
    margin-left: 34px;
  }
  .card_header {
    padding: 12px;
    background: #fffcfc;
  }
  .contBox {
    width: 90%;
    padding-left: 76px;
    span {
      display: inline-block;
      vertical-align: middle;
      width: 31px;
      height: 34px;
      font-size: 28px;
      font-family: Montserrat-Bold, Montserrat;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.05);
      line-height: 34px;
      margin-right: 12px;
    }
    & > p {
      margin: 14px 0 10px 0;
    }
    .icon-box {
      width: 955px;
      height: 40px;
      display: inline-block;
      vertical-align: middle;
      border: 1px dashed rgba(230, 230, 230, 1);
      border-radius: 6px;
      text-align: center;
      .icon-add {
        display: inline-block;
        height: 40px;
        background: url("../../../assets/creator/add-learn.svg") 0 14px
          no-repeat;
        background-size: 12px 12px;
        padding-left: 19px;
        font-size: 14px;
        font-weight: 400;
        color: #999;
        line-height: 40px;
      }
    }
    .tea-info {
      width: 955px;
      min-height: 115px;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px;
      border: 1px solid rgba(230, 230, 230, 1);
      padding: 7px 11px;
    }
  }
  .add {
    cursor: pointer;
  }
  .delHover {
    position: relative;
    i {
      display: none;
      position: absolute;
      width: 42px;
      height: 40px;
      top: 0;
      right: -40px;
      background: url("../../../assets/creator/icon-recycle.svg") 10px 9px
        no-repeat;
      background-size: 22px auto;
      cursor: pointer;
    }
  }
  .delHover:hover {
    i {
      display: block;
    }
  }
  h4 {
    font-size: 16px;
    font-weight: 400;
  }
  .addNew {
    width: 100%;
    text-align: center;
    color: #fe7865;
    margin: 30px 0;
    cursor: pointer;
  }
}
.btn-box {
  position: fixed;
  right: calc(50% - 600px);
  bottom: 0;
}
</style>
<style lang="scss">
.elements .el-card__header {
  padding: 0;
}
</style>
