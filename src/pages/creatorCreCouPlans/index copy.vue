<template>
  <div class="creatorCreCouPlans">
    <div class="header">
      <div class="left clearfix">
        <img src="/static/img/LOGO1.e6d73f6.svg" alt />
        <div class="saved">
          <img
            src="../../assets/creator/class-save.svg"
            alt
            v-if="creatorClassList.createDatetime? false:true"
          />
          <img src="../../assets/creator/class-saved.svg" alt v-else />
          <span v-if="creatorClassList.createDatetime">今天 {{creatorClassList.createDatetime}} 自动保存</span>
        </div>
      </div>
      <div class="right clearfix">
        <div class="preview" @click="goPreview">
          <img src="../../assets/creator/class-preview.svg" alt />
          <span>预览</span>
        </div>
        <button class="goRelease" @click="goRelease">去发布</button>
      </div>
    </div>
    <!-- 退出 -->
    <button class="exitBtn" @click="leaveCb('pre')">退出</button>
    <!-- 退出结束 -->
    <div class="list pages">
      <!--删除提示弹框 start-->
      <DelCouConfirm :show="show" :course="delCourseState.data" :cbFun="diaCbFun"></DelCouConfirm>
      <!--删除提示弹框 end-->

      <!--离开页面 tips start-->
      <CreLeaveTips :cbFun="leaveCb" :show="leaveShow"></CreLeaveTips>
      <!--离开页面 tips start-->
      <el-container>
        <el-main class="main">
          <Vuescroll :ops="ops">
            <!--新建课程模板 start-->
            <div class="c-box">
              <CreNewCourse
                v-for="(item,index) in creatorClassList.list"
                :key="index"
                :index="index"
                :data="item"
                :cbFun="cbFun"
                :delCallback="delCallback"
                :addCbFun="addCbFun"
              ></CreNewCourse>
              <!--新建课程模板 end-->

              <!--新建课程 start-->
              <AddCourse :addCbFun="addCbFun" :index="creatorClassList.length"></AddCourse>
              <!--新建课程 end-->
            </div>
          </Vuescroll>
          <router-view></router-view>
          <RecallCourse v-show="creatorDelCourse.show"></RecallCourse>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Watch, Prop } from "vue-property-decorator";
import AddCourse from "./AddCourse";
import CreLeaveTips from "./creLeaveTips";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import {
  couChaChaRef,
  couPlaSavForCouChannel,
  courPlaCouPlaDetail
} from "../../service/creCouPlans";
import {
  saveCourseChannel,
  updateCourseChannel
} from "../../service/teachersApi";
import Clickoutside from "element-ui/src/utils/clickoutside";
import DelCouConfirm from "./delCouConfirm";
import CreNewCourse from "./creNewCourse";
import RecallCourse from "./recallCourse";
import Vuescroll from "vuescroll";
import { State, Action, namespace } from "vuex-class";

const CreCouPlaStore = namespace("creCouPlans"); //现
const creatorStore = namespace("creator"); //原 已改
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

  // creator vuex
  @creatorStore.State("creatorClassList") creatorClassList; //新建竖版列表
  @creatorStore.Action("creatorClassListHandle") creatorClassListHandle; //新建竖版列表  action修改方法

  @creatorStore.State("creatorDelCourse") creatorDelCourse; //被删除的--课程
  @creatorStore.Action("creatorDelCourseHandle") creatorDelCourseHandle; //被删除的--课程  action修改方法

  @creatorStore.State("creatorChannel") creatorChannel; //当前模板或当前新建课程信息
  @creatorStore.Action("creatorChannelHandle") creatorChannelHandle; //当前模板或当前新建课程信息  action修改方法

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

  // 测试
  timer = null; //定时器方法
  count = 6; //定时器计时
  preCreatorClassList = [];

  // // 监听creatorClassList;
  // @Watch("creatorClassList", {
  //   // immediate: true,
  //   deep: true
  // })
  // testFun() {
  //   console.log("creatorClassList");
  //   console.log(this.creatorClassList);
  //   this.goSave();
  // }

  //退出按钮 跳转粗行作者端首页
  @Emit exit() {
    this.leaveShow = true;
    this.$router.push({
      path: this.leaveRouter ? this.leaveRouter : "/creator/home"
    });
  }
  // 去保存
  @Emit goSave() {
    console.log("goSave");
    this.leaveCheck = true;
    console.log(this.creatorClassList);
    console.log(this.creatorChannel);
    let creatorClassList = this.creatorClassList;
    let data = {
      channelName: this.creatorChannel.planName,
      bundleList: this.subMapFun(this.creatorClassList)
    };
    console.log(data);
    saveCourseChannel(data).then(res => {
      console.log(res);
      if (res.code === 0) {
        if (res.data == null) {
          return;
        } else {
          this.courseChannelId = res.data.channelId;
          // this.updateTime = res.data.createDatetime;
          // this.updateTime = this.updateTime.slice(11, 16);
        }
      }
    });
  }
  //去更新
  @Emit goUpdate() {
    console.log("goUpdate");
    this.leaveCheck = true;
    console.log(this.creatorClassList);
    console.log(this.creatorChannel);
    let creatorClassList = this.creatorClassList;
    let data = {
      channelName: this.creatorChannel.planName,
      bundleList: this.subMapFun(this.creatorClassList)
    };
    console.log(data);
    updateCourseChannel(data).then(res => {
      console.log(res);
      if (res.code === 0) {
        if (res.data == null) {
          return;
        } else {
          this.courseChannelId = res.data.channelId;
          // this.updateTime = res.data.createDatetime;
          // this.updateTime = this.updateTime.slice(11, 16);
        }
      }
    });
  }
  //处理提交数据转化 处理bundleList 章节
  @Emit subMapFun(data) {
    console.log(data);
    let newData = cloneObj(data);
    let list = [];
    newData.map(item => {
      list.push({
        bundleName: item.title,
        courseList: this.getMapFun(item.chapter)
      });
    });
    console.log(list);
    return cloneObj(list);
  }

  // 提交数据处理 处理courseList 标准课
  @Emit getMapFun(data) {
    console.log(data);
    let newData = cloneObj(data);
    let list = [];
    newData.map(item => {
      list.push({
        courseId: item.courseId,
        courseName: item.title
      });
    });
    return cloneObj(list);
  }
  // 去预览
  @Emit goPreview() {
    console.log("去预览");
    this.leaveCheck = true;
    // console.log(this.creatorClassList);
    // console.log(this.creatorChannel);
    let creatorClassList = this.creatorClassList;
    let data = {
      channelName: this.creatorChannel.planName,
      bundleList: this.subMapFun(this.creatorClassList)
    };
    // console.log(data);
    saveCourseChannel(data).then(res => {
      // console.log(res);
      if (res.code === 0) {
        this.courseChannelId = res.data.channelId;
        console.log(this.courseChannelId);
        this.$router.push({
          path: "/creatorPreview", //课程频道
          query: {
            courseChannelId: this.courseChannelId
          }
        });
      }
    });
  }
  // 去发布
  @Emit goRelease() {
    console.log("去发布");
    this.leaveCheck = true;
    // console.log(this.creatorClassList);
    // console.log(this.creatorChannel);
    let creatorClassList = this.creatorClassList;
    let data = {
      channelName: this.creatorChannel.planName,
      bundleList: this.subMapFun(this.creatorClassList)
    };
    // console.log(data);
    saveCourseChannel(data).then(res => {
      console.log(res);
      if (res.code === 0) {
        this.courseChannelId = res.data.channelId;
        console.log(this.courseChannelId);
        this.$router.push({
          path: "/creatorClass", //课程频道
          query: {
            courseChannelId: this.courseChannelId
          }
        });
      }
    });
  }

  // //页面离开回调方法
  // @Emit leaveCb(type) {
  //   if (type === "hide" || type === "confirm") {
  //     this.leaveShow = false;
  //     this.leaveRouter = "";
  //   } else {
  //     this.leaveCheck = true; //弹出离开页面提示框
  //     //离开页面
  //     this.$router.push({
  //       path: this.leaveRouter ? this.leaveRouter : "/Establish"
  //     });
  //   }
  // }

  //页面离开回调方法
  @Emit leaveCb(type) {
    if (type === "hide" || type === "cancel") {
      //这里把confirm修改为cancel
      this.leaveShow = false;
      this.leaveRouter = "";
    } else {
      this.leaveShow = true; //xz
      this.leaveCheck = true; //弹出离开页面提示框
      //离开页面
      this.$router.push({
        path: this.leaveRouter ? this.leaveRouter : "/creator/home"
      });
    }
  }

  //竖版组件 新增 回调
  @Emit addCbFun(index) {
    // let query = this.$route.query;
    let query = {
      addCourseType: "add",
      courseChannelId: "1"
    };
    this.$router.replace({
      path: "/creatorCreCouPlans/primary",
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
    let creatorClassList = this.creatorClassList;
    creatorClassList[index] = cloneObj(data);
    this.creatorClassListHandle({
      creatorClassList: cloneObj(creatorClassList)
    });
  }

  // //上一步下一步回调方法
  // @Emit cruCallback(type) {
  //   if (type === "pre") {
  //     this.leaveShow = true; //弹出离开页面提示框
  //   } else {
  //     this.leaveCheck = true;
  //     //下一步提交按钮
  //     let creatorClassList = this.creatorClassList;
  //     let data = {
  //       planId: this.channel.planId,
  //       planName: this.channel.planName,
  //       refCourseChannelId: this.courseChannelId,
  //       bundleList: this.subMapFun(this.creatorClassList)
  //     };
  //     this.nextCb(data);
  //   }
  // }

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
    // console.log(type, temIndex, i);
    let creatorClassList = cloneObj(this.creatorClassList);
    // console.log(creatorClassList);
    let oldDel;
    if (type == "all") {
      //删除整个章节
      if (creatorClassList[temIndex].temType === "old") {
        creatorClassList[temIndex].delFlag = true; // true 删除  false 新增
      } else {
        oldDel = creatorClassList.splice(temIndex, 1)[0];
        this.delCourseState = {
          show: true,
          index: temIndex,
          data: cloneObj(oldDel)
        };
      }
      this.newTemplateList = creatorClassList;
    } else {
      if (creatorClassList[temIndex].chapter[i].temType === "old") {
        creatorClassList[temIndex].chapter[i].delFlag = true; // true 删除  false 新增
      } else {
        let data = cloneObj(creatorClassList[temIndex]);
        if (creatorClassList[temIndex].chapter.length == 1) {
          //当前章节只有 一个小节 删除整个
          oldDel = creatorClassList.splice(temIndex, 1)[0];
        } else {
          //当前章节有多个小节--删除其中一个小节
          oldDel = creatorClassList[temIndex].chapter.splice(i, 1)[0];
        }
        this.delCourseState = {
          show: true,
          temIndex: temIndex,
          index: i,
          data: cloneObj(oldDel)
        };
      }
      this.newTemplateList = creatorClassList;
    }
    this.show = true; //显示确认删除弹框
  }

  // 弹框 回调方法
  @Emit diaCbFun(type) {
    // type cancel 取消  confirm 确定
    if (type === "confirm") {
      this.creatorClassListHandle({
        creatorClassList: cloneObj(this.newTemplateList)
      });
      this.creatorDelCourseHandle({
        creatorDelCourse: cloneObj(this.delCourseState)
      });
    }
    this.show = false;
    this.delCourseState = {};
    this.newTemplateList = [];
  }

  //获取当前课程模板信息  接口
  @Emit couPlaOwnCouPlaListFun() {
    console.log(this.courseChannelId);
    if (!this.courseChannelId) {
      return;
    }
    couChaChaRef({
      courseChannelId: this.courseChannelId
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        let data = res.data.bundleList;
        this.creatorClassListHandle({
          creatorClassList: this.handelData(data)
        });
        this.creatorChannelHandle({
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
        this.creatorClassListHandle({
          creatorClassList: this.handelData(data)
        });
        this.creatorChannelHandle({
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
    // let query= this.$route.query;
    console.log(this.creatorClassList);
    console.log(this.creatorClassList.createDatetime);
    let query = {
      addCourseType: "add",
      courseChannelId: "",
      type: true
    };

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
  updated() {
    console.log(this.creatorClassList);
    console.log(this.creatorClassList.createDatetime);
    // this.updateTime = this.creatorClassList.createDatetime;
    // this.updateTime = this.updateTime.slice(11, 16);
    // console.log(this.updateTime);
  }
}
</script>


<style lang="scss" scoped>
.creatorCreCouPlans {
  .header {
    border-bottom: 1px solid transparent;
    min-width: 1200px;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 2px 0px rgba(237, 237, 237, 1);
    .left {
      position: relative;
      img {
        position: absolute;
        left: 24px;
        top: 15px;
      }
      .saved {
        cursor: pointer;
        img {
          position: absolute;
          left: 163px;
          top: 18px;
        }
        span {
          position: absolute;
          left: 193px;
          top: 21px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
      }
    }
    .right {
      // float: right;
      position: relative;
      .preview {
        cursor: pointer;
        img {
          position: absolute;
          right: 166px;
          top: 18px;
        }
        span {
          position: absolute;
          right: 132px;
          top: 18px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
      }
      .goRelease {
        position: absolute;
        right: 20px;
        top: 12px;
        width: 88px;
        height: 36px;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 18px;
        border: transparent;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
    }
  }
  .exitBtn {
    width: 52px;
    height: 24px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    position: absolute;
    left: 24px;
    top: 70px;
    margin-top: 0px;
    border: transparent;
    // 修改字体
    font-size: 12px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 17px;
    text-align: center;
  }
  .list {
    background: #fff;
    margin: 0 24px;
    margin-top: 24px;
    .main {
      width: auto;
      padding: 20px 0;
      height: calc(100vh - 120px);
    }
    .c-box {
      white-space: nowrap;
    }
  }
}
</style>

