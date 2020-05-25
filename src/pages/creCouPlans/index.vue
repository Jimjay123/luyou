/**

* Created by wangxin

* @date 2019/8/9 19:20

*/
<template>
  <div class="list pages">
    <!--删除提示弹框 start-->
    <DelCouConfirm :show="show" :course="delCourseState.data" :cbFun="diaCbFun"></DelCouConfirm>
    <!--删除提示弹框 end-->

    <!--离开页面 tips start-->
    <CreLeaveTips :cbFun="leaveCb" :show="leaveShow"></CreLeaveTips>
    <!--离开页面 tips start-->

    <!--面包屑 start-->

    <CrumbsItem style="margin-top:24px;" :list="list" :cbFun="cruCallback" :btn="true"></CrumbsItem>
    <!--面包屑 end-->

    <el-container>
      <el-main class="main">
        <Vuescroll :ops="ops">
          <!--新建课程模板 start-->
          <div class="c-box">
            <CreNewCourse
              v-for="(item,index) in templateList"
              :key="index"
              :index="index"
              :data="item"
              :cbFun="cbFun"
              :delCallback="delCallback"
              :addCbFun="addCbFun"
            ></CreNewCourse>
            <!--新建课程模板 end-->

            <!--新建课程 start-->
            <AddCourse :addCbFun="addCbFun" :index="templateList.length"></AddCourse>
            <!--新建课程 end-->
          </div>
        </Vuescroll>
        <router-view></router-view>
        <RecallCourse v-show="delCourse.show"></RecallCourse>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import CrumbsItem from "./CrumbsItem";
import TopHeader from "./../Header/header";
import AddCourse from "./AddCourse";
import CreLeaveTips from "./creLeaveTips";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import {
  couChaChaRef,
  couPlaSavForCouChannel,
  courPlaCouPlaDetail
} from "../../service/creCouPlans";
import Clickoutside from "element-ui/src/utils/clickoutside";
import DelCouConfirm from "../creCouPlans/delCouConfirm";
import CreNewCourse from "./creNewCourse";
import RecallCourse from "./recallCourse";
import Vuescroll from "vuescroll";
import { State, Action, namespace } from "vuex-class";

const CreCouPlaStore = namespace("creCouPlans");
const TeachersStore = namespace("teachers");

@Component({
  name: "creCouPlans",
  directives: {
    Clickoutside
  },
  //离开时路由守卫
  beforeRouteLeave(to, from, next) {
    if (this.leaveCheck) {
      next();
    } else {
      this.leaveShow = true; //弹出离开页面提示框
      this.leaveRouter = to.path;
      next(false);
    }
  },
  components: {
    CrumbsItem,
    TopHeader,
    AddCourse,
    Vuescroll,
    CreNewCourse,
    RecallCourse,
    DelCouConfirm,
    CreLeaveTips
  }
})
export default class CreCouPlans extends Vue {
  @CreCouPlaStore.State("templateList") templateList; //新建竖版列表
  @CreCouPlaStore.Action("templateListHandle") templateListHandle; //新建竖版列表  action修改方法

  @CreCouPlaStore.State("delCourse") delCourse; //被删除的--课程
  @CreCouPlaStore.Action("delCourseHandle") delCourseHandle; //被删除的--课程  action修改方法

  @CreCouPlaStore.State("channel") channel; //当前模板或当前新建课程信息
  @CreCouPlaStore.Action("channelHandle") channelHandle; //当前模板或当前新建课程信息  action修改方法

  @TeachersStore.State("editOrAdd") editOrAdd; //新曾或编辑 课程计划 相关参数
  @TeachersStore.Action("editOrAddHandle") editOrAddHandle; //新曾或编辑 课程计划 相关参数  action修改方法

  courseChannelId = ""; //当前 上一页带过来的 courseChannelId 模板Id

  show = false; //删除弹框显示隐藏  true 显示 false 隐藏
  addCourseType = "editTem"; //当前添加类型 addNew新建  editTem  模版新建   edit  编辑

  leaveShow = false; //页面离开弹框提示

  leaveCheck = false; //离开

  list = [
    {
      name: "新建课程频道",
      path: "/Establish",
      type: true
    },
    {
      name: "章节编辑",
      path: "/teachers/creCouPlans",
      type: true
    },
    {
      name: "基础设置",
      path: "",
      type: false
    },
    {
      name: "发布",
      path: "",
      type: false
    }
  ]; //面包屑数据

  delCourseState = {}; //删除待确认的课程数据
  newTemplateList = []; //删除待确认的课程新列表
  leaveRouter = "";

  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: false,
      keepShow: false,
      background: "#c1c1c1",
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: "6px",
      disable: false
    }
  }; //滚动条设置

  //页面离开回调方法
  @Emit leaveCb(type) {
    if (type === "hide" || type === "confirm") {
      this.leaveShow = false;
      this.leaveRouter = "";
    } else {
      this.leaveCheck = true; //弹出离开页面提示框
      //离开页面
      this.$router.push({
        path: this.leaveRouter ? this.leaveRouter : "/Establish"
      });
    }
  }

  //竖版组件 新增 回调
  @Emit addCbFun(index) {
    let query = this.$route.query;
    console.log(query);
    this.$router.replace({
      path: "/teachers/creCouPlans/primary",
      query: {
        temIndex: index,
        addCourseType: query.addCourseType,
        courseChannelId: query.courseChannelId
      }
    });
  }

  //竖版组件回调
  @Emit cbFun(index, data) {
    console.log(index, data);
    let templateList = this.templateList;
    templateList[index] = cloneObj(data);
    this.templateListHandle({
      templateList: cloneObj(templateList)
    });
  }

  //上一步下一步回调方法
  @Emit cruCallback(type) {
    if (type === "pre") {
      this.leaveShow = true; //弹出离开页面提示框
    } else {
      this.leaveCheck = true;
      //下一步提交按钮
      let templateList = this.templateList;
      let data = {
        planId: this.channel.planId,
        planName: this.channel.planName,
        refCourseChannelId: this.courseChannelId,
        bundleList: this.subMapFun(this.templateList)
      };
      this.nextCb(data);
    }
  }

  //处理提交数据转化
  @Emit subMapFun(data) {
    let newData = cloneObj(data);
    let list = [];
    newData.map(item => {
      list.push({
        coursePlanBundleRelId: item.coursePlanBundleRelId,
        bundleId: item.bundleId,
        bundleName: item.title,
        delFlag: item.delFlag,
        bundleSource: item.bundleSource,
        courseList: this.getMapFun(item.chapter)
      });
    });
    return cloneObj(list);
  }

  //返回上一层
  @Emit backHistory() {
    this.$router.go(-1); //返回上一层
  }

  // 提交数据处理
  @Emit getMapFun(data) {
    console.log(data);
    let newData = cloneObj(data);
    let list = [];
    newData.map(item => {
      list.push({
        coursePlanBundleRelId: item.coursePlanBundleRelId,
        courseId: item.courseId,
        courseName: item.title,
        delFlag: item.delFlag,
        courseSource: item.courseSource //
      });
    });
    return cloneObj(list);
  }

  //下一步回调方法
  @Emit nextCb(data) {
    couPlaSavForCouChannel(data).then(res => {
      if (res.code == "0") {
        let coursePlanId = res.data.coursePlanId;
        let editOrAdd = this.editOrAdd;
        editOrAdd.coursePlanId = coursePlanId;
        this.editOrAddHandle({
          editOrAdd: editOrAdd
        });
        this.$router.push({
          path: "/teachers/Addcourse", //跳转下一步
          query: {
            coursePlanId: coursePlanId,
            addCourseType: "editTem"
          }
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //删除回调方法
  @Emit delCallback(type, temIndex, i) {
    let templateList = cloneObj(this.templateList);
    console.log(templateList);
    let oldDel;
    if (type == "all") {
      //删除整个章节
      if (templateList[temIndex].temType === "old") {
        templateList[temIndex].delFlag = true; // true 删除  false 新增
      } else {
        oldDel = templateList.splice(temIndex, 1)[0];
        this.delCourseState = {
          show: true,
          index: temIndex,
          data: cloneObj(oldDel)
        };
      }
      this.newTemplateList = templateList;
    } else {
      if (templateList[temIndex].chapter[i].temType === "old") {
        templateList[temIndex].chapter[i].delFlag = true; // true 删除  false 新增
      } else {
        let data = cloneObj(templateList[temIndex]);
        if (templateList[temIndex].chapter.length == 1) {
          //当前章节只有 一个小节 删除整个
          oldDel = templateList.splice(temIndex, 1)[0];
        } else {
          //当前章节有多个小节--删除其中一个小节
          oldDel = templateList[temIndex].chapter.splice(i, 1)[0];
        }
        this.delCourseState = {
          show: true,
          temIndex: temIndex,
          index: i,
          data: cloneObj(oldDel)
        };
      }
      this.newTemplateList = templateList;
    }
    this.show = true; //显示确认删除弹框
  }

  // 弹框 回调方法
  @Emit diaCbFun(type) {
    // type cancel 取消  confirm 确定
    if (type === "confirm") {
      this.templateListHandle({
        templateList: cloneObj(this.newTemplateList)
      });
      this.delCourseHandle({
        delCourse: cloneObj(this.delCourseState)
      });
    }
    this.show = false;
    this.delCourseState = {};
    this.newTemplateList = [];
  }

  //获取当前课程模板信息  接口
  @Emit couPlaOwnCouPlaListFun() {
    if (!this.courseChannelId) {
      return;
    }
    couChaChaRef({
      courseChannelId: this.courseChannelId
    }).then(res => {
      if (res.code == "0") {
        let data = res.data.bundleList;
        this.templateListHandle({
          templateList: this.handelData(data)
        });
        this.channelHandle({
          channel: {
            planId: data.channelId,
            planName: data.channelName
          }
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //已保存课程频道--获取课程频道信息接口
  @Emit courPlaCouPlaDetailFun(id) {
    courPlaCouPlaDetail({
      coursePlanId: id
    }).then(res => {
      if (res.code == "0") {
        let data = res.data.bundleList;
        this.templateListHandle({
          templateList: this.handelData(data)
        });
        this.channelHandle({
          channel: {
            planId: data.channelId,
            planName: data.channelName
          }
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //处理后端获取的数据
  @Emit handelData(data) {
    let newData = cloneObj(data);
    let list = [];
    newData.map(item => {
      list.push({
        isUse: true, //当前模块是否可用
        isEdit: false, //当前顶部标题  是否在编辑状态  true是  false
        title: item.bundleName, //当前章节标题
        bundleId: item.bundleId, //当前频道Id
        type: "tem", //type类型 模板'tem' 'add'
        coursePlanBundleRelId: item.coursePlanBundleRelId, //type类型 模板'tem' 'add'
        level: "chapter", //当前的层级 chapter 章 section节
        temType: "old", // old  标识 接口获取的  New 表示新增的
        delFlag: item.delFlag, //
        bundleSource: item.bundleSource,
        chapter: this.mapFun(item.courseList)
      });
    });
    return cloneObj(list);
  }

  @Emit mapFun(data) {
    let list = [];
    data.map(item => {
      list.push({
        isOpen: false, //当前模块是否展开 true展开 false 不展开
        isUse: true, //当前模块是否可用
        isEdit: false, //当前顶部标题  是否在编辑状态  true是  false
        header: item.popularizeImageUrl,
        courseId: item.courseId, //课程id
        title: item.courseName, //课程名称
        coursePlanBundleRelId: item.coursePlanBundleRelId, //type类型 模板'tem' 'add'
        level: "section", //当前的层级 chapter 章 section节
        type: "tem", //add 新增的  tem 模版自带的
        temType: "old", // old  标识 接口获取的  New 表示新增的
        delFlag: item.delFlag, //
        courseSource: item.courseSource, //
        lessonList: cloneObj(item.lessonList)
      });
    });
    return cloneObj(list);
  }

  @Emit setEditOrAdd(name) {
    let query = this.$route.query;
    let editOrAdd = this.editOrAdd;
    if (query[name]) {
      this[name] = query[name] || "";
      editOrAdd[name] = this[name];
      this.editOrAddHandle({
        editOrAdd: cloneObj(editOrAdd)
      });
    } else {
      this[name] = editOrAdd[name] || "";
    }
  }

  created() {
    let query = this.$route.query;

    //获取页面传参 add 新建  editTem 在模板基础上修改
    this.setEditOrAdd("addCourseType");
    this.setEditOrAdd("courseChannelId");

    let addCourseType = this.$route.query.addCourseType; // addNew新建  editTem  模版新建   edit  编辑
    if (addCourseType === "addNew") {
      //空模版新建
    } else if (addCourseType === "editTem") {
      //模版新建
      this.couPlaOwnCouPlaListFun();
    } else if (addCourseType === "edit") {
      //
      this.setEditOrAdd("coursePlanId");
      this.courPlaCouPlaDetailFun(this.$route.query.coursePlanId); //编辑课程频道--获取课程频道基本信息
    } else if (addCourseType === "add") {
      this.list = [
        {
          name: "章节编辑",
          path: "/teachers/creCouPlans",
          type: true
        },
        {
          name: "基础设置",
          path: "",
          type: false
        },
        {
          name: "发布",
          path: "",
          type: false
        }
      ];
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
  background: #fff;
  width: 1200px;
  margin: 0 auto;
}

.main {
  width: auto;
  padding: 20px 0;
  height: calc(100vh - 120px);
}
.c-box {
  white-space: nowrap;
}
</style>
