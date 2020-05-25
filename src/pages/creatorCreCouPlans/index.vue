<template>
  <div class="creatorCreCouPlans">
    <div class="header">
      <div class="left clearfix">
        <img :src="require('../../assets/img/LOGO1.svg')" alt />
        <div class="saved" @click="toGoSave">
          <img
            :src="require('../../assets/creator/class-save.svg')"
            alt
            v-if="creatorModifyDateTime.modifyDatetime ==''"
          />
          <img :src="require('../../assets/creator/class-saved.svg')" alt v-else />
          <span
            v-if="creatorModifyDateTime.modifyDatetime !=''"
          >今天 {{creatorModifyDateTime.modifyDatetime}} 自动保存</span>
          <div class="saveTips" v-if="showSaveTips">课程保存成功</div>
        </div>
      </div>
      <div class="right clearfix">
        <div class="preview">
          <img :src="require('../../assets/creator/class-preview.svg')" alt @click="goToPreview" />
          <span @click="goToPreview">预览</span>
        </div>
        <button class="goRelease" @click="goRelease">去发布</button>
      </div>
    </div>
    <!-- 退出 -->
    <button class="exitBtn" @click="exit">退出</button>
    <!-- 退出结束 -->
    <div class="list pages">
      <!--删除提示弹框 start-->
      <DelCouConfirm :show="show" :course="delCourseState" :cbFun="diaCbFun"></DelCouConfirm>
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
                v-for="(item,index) in creatorClassList"
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
          <RecallCourse v-show="creatorDelCourse.show" :show="chapterShow"></RecallCourse>
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
  updateCourseChannel,
  creatorCourseChannelDetail
} from "../../service/teachersApi";
import { saveCreatorFun } from "../../service/creator/creatorAction";
import Clickoutside from "element-ui/src/utils/clickoutside";
import DelCouConfirm from "./delCouConfirm";
import CreNewCourse from "./creNewCourse";
import RecallCourse from "./recallCourse";
import Vuescroll from "vuescroll";
import { State, Action, namespace } from "vuex-class";
import { fail } from "assert";
import {
  delCouLogDel,
  ownCourseAndChannelList
} from "../../service/creatorApi";

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

  @creatorStore.State("creatorDelDate") creatorDelDate; //点击确定删除时的数据
  @creatorStore.Action("creatorDelDateHandle") creatorDelDateHandle; //点击确定删除时的数据  action修改方法

  @creatorStore.State("creatorModifyDateTime") creatorModifyDateTime; //当前模板或当前新建课程信息
  @creatorStore.Action("creatorModifyDateTimeHandle")
  creatorModifyDateTimeHandle; //当前模板或当前新建课程信息  action修改方法

  @TeachersStore.State("editOrAdd") editOrAdd; //新曾或编辑 课程计划 相关参数
  @TeachersStore.Action("editOrAddHandle") editOrAddHandle; //新曾或编辑 课程计划 相关参数  action修改方法

  courseChannelId = ""; //当前 上一页带过来的 courseChannelId 模板Id

  show = false; //删除弹框显示隐藏  true 显示 false 隐藏
  addCourseType = "editTem"; //当前添加类型 addNew新建  editTem  模版新建   edit  编辑

  leaveShow = false; //页面离开弹框提示

  leaveCheck = false; //离开
  delI = -1; //删除弹框 i
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
  isHasList = false; //判断进入页面时是否有数据
  showSaveTips = false;
  chapterShow = false; //删除章节显示

  //退出按钮 跳转首页
  @Emit exit() {
    // console.log(this.creatorClassList.length);
    // console.log(this.creatorDelDate);
    // console.log(this.creatorModifyDateTime.modifyDatetime);
    // console.log(this.$route.query.courseChannelId);
    let keyId = this.$route.query.courseChannelId;

    if (
      this.creatorClassList.length === 0 &&
      this.creatorModifyDateTime.modifyDatetime
    ) {
      delCouLogDel({
        keyId: keyId,
        keyType: 2,
        keyName: ""
      }).then(res => {
        console.log(res);
        if (res.code === 0) {
          ownCourseAndChannelList({}).then(res => {
            console.log(res);
            if (res.code === 0) {
            }
          });
          this.leaveCheck = true;
          this.$router.push({
            path: this.leaveRouter ? this.leaveRouter : "/creator/home"
          });
        }
      });
    }
    if (this.creatorClassList.length === 0) {
      this.leaveCheck = true;
      this.$router.push({
        path: this.leaveRouter ? this.leaveRouter : "/creator/home"
      });
    }
    this.leaveShow = true;
    // 离开页面
    this.$router.push({
      path: this.leaveRouter ? this.leaveRouter : "/creator/home"
    });
  }

  // 点击保存图标
  @Emit toGoSave() {
    this.showSaveTips = true;
    setTimeout(() => {
      this.showSaveTips = false;
    }, 2000);
  }

  //  预览按钮
  @Emit goToPreview() {
    this.leaveCheck = true;
    window.open(
      window.location.href.split("#")[0] +
        "#/creatorChannel?courseChannelId=" +
        encodeURIComponent(this.creatorChannel.channelId)
    );
  }
  // 去发布
  @Emit goRelease() {
    this.leaveCheck = true;
    let courseChannelId = this.creatorChannel.channelId;
    this.$router.push({
      path: "/classInfoBase", //课程频道发布页
      query: {
        courseId: courseChannelId
      }
    });
  }

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
    console.log(index);
    let courseChannelId = this.$route.query.courseChannelId;
    let query = {
      addCourseType: "add",
      courseChannelId: courseChannelId
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
    let creatorClassList = this.creatorClassList;
    creatorClassList[index] = cloneObj(data);
    this.creatorClassListHandle({
      creatorClassList: cloneObj(creatorClassList)
    });
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
        courseList: this.getMapFun(item.courseList)
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
  @Emit delCallback(type, temIndex, index = null) {
    if (type === "all") {
      this.delCourseState = this.creatorClassList[temIndex];
      this.delCourseState.level = "chapter";
      this.delCourseState.temIndex = temIndex;
      this.show = true;
      let creatorDelCourse = {
        show: false, //提示框是否显示
        index: index, //下标
        temIndex: temIndex,
        data:
          index === null
            ? this.creatorClassList[temIndex]
            : this.creatorClassList[temIndex].courseList[index] //被删除的数据
      };
      this.creatorDelCourseHandle({ creatorDelCourse: creatorDelCourse });
    } else {
      this.chapterShow = true;
      saveCreatorFun({
        item:
          index === null
            ? ""
            : this.creatorClassList[temIndex].courseList[index],
        type: 2,
        delType: "creDel", // creDel 表示竖版内点击删除
        i: index,
        id: index,
        temIndex: temIndex
      });
      let creatorDelCourse = {
        show: true, //提示框是否显示
        index: index, //下标
        temIndex: temIndex,
        data:
          index === null
            ? this.creatorClassList[temIndex]
            : this.creatorClassList[temIndex].courseList[index] //被删除的数据
      };
      this.creatorDelCourseHandle({ creatorDelCourse: creatorDelCourse });
      this.delCourseState = this.creatorClassList[temIndex].courseList[index];
      this.delCourseState.temIndex = temIndex;
      this.delCourseState.index = index;
    }
    let creatorClassList = cloneObj(this.creatorClassList);
    let oldDel;
    //
    if (type == "all") {
      //删除整个章节
      if (creatorClassList[temIndex].temType === "old") {
        // del show
        this.show = true;
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
      if (creatorClassList[temIndex].courseList[index].temType === "old") {
        creatorClassList[temIndex].courseList[index].delFlag = true; // true 删除  false 新增
      } else {
        let data = cloneObj(creatorClassList[temIndex]);
        if (creatorClassList[temIndex].courseList.length == 1) {
          //当前章节只有 一个小节 删除整个
          oldDel = creatorClassList.splice(temIndex, 1)[0];
        } else {
          //当前章节有多个小节--删除其中一个小节
          oldDel = creatorClassList[temIndex].courseList.splice(index, 1)[0];
        }
        this.delCourseState = {
          show: true,
          temIndex: temIndex,
          index: index,
          data: cloneObj(oldDel)
        };
      }
      this.newTemplateList = creatorClassList;
    }
  }

  // 弹框 回调方法
  @Emit diaCbFun(type, temIndex, index = null) {
    // type cancel 取消  confirm 确定
    // console.log(this.creatorClassList);
    // console.log(type, temIndex, index);
    if (type === "confirm") {
      this.chapterShow = false;
      saveCreatorFun({
        item:
          index === null
            ? ""
            : this.creatorClassList[temIndex].courseList[index],
        type: 2,
        delType: "creDel", // creDel 表示竖版内点击删除
        i: index,
        id: index,
        temIndex: temIndex
      });
      this.show = false;
      let creatorDelCourse = {
        show: false, //提示框是否显示
        index: index, //下标
        temIndex: temIndex,
        data:
          index === null
            ? this.creatorClassList[temIndex]
            : this.creatorClassList[temIndex].courseList[index] //被删除的数据
      };
      this.creatorDelCourseHandle({ creatorDelCourse: creatorDelCourse });
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
        courseList: this.mapFun(item.courseList) //这里将chapter: 改成了courseList
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

  //设置courseList数据
  @Emit setCouListFun(data, d = []) {
    let newData = cloneObj(data);
    let list = [];
    newData.map(item => {
      let c = d.find(o => o.courseBundleRelId === item.courseBundleRelId) || {};
      list.push({
        ...item,
        isEdit: c.isEdit || false, //是否编辑中
        delFlag: c.delFlag || false, //是否删除
        isOpen: c.isOpen || false //是否展开
      });
    });
    return cloneObj(list);
  }

  //处理后台获取的bulidList 数据
  @Emit setBuildListFun(data) {
    let newData = cloneObj(data);
    let list = [];
    newData.map((item, index) => {
      let creatorClassList = cloneObj(this.creatorClassList);
      let d = creatorClassList.find(o => o.bundleId === item.bundleId) || {};
      let obj = {
        ...item,
        isEdit: d.isEdit || false, //是否编辑中
        delFlag: d.delFlag || false //是否删除
      };
      obj.courseList = this.setCouListFun(item.courseList, d.courseList);
      list.push(obj);
    });
    return cloneObj(list);
  }

  //编辑状态进去时 获取课程频道竖版信息接口
  @Emit creatorCourseChannelDetailFun() {
    let courseChannelId = this.$route.query.courseChannelId;
    if (!courseChannelId) {
      return;
    }
    creatorCourseChannelDetail({
      courseChannelId: courseChannelId
    }).then(res => {
      if (res.code == 0) {
        let newList = this.setBuildListFun(res.data.bundleList);
        this.creatorClassListHandle({
          creatorClassList: newList
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    let courseChannelId = this.$route.query.courseChannelId;
    if (courseChannelId) {
      creatorCourseChannelDetail({
        courseChannelId: courseChannelId
      })
        .then(res => {
          if (res.code == 0) {
            let newList = this.setBuildListFun(res.data.bundleList);
            this.creatorClassListHandle({
              creatorClassList: newList
            });
            let creatorChannel = {
              channelId: res.data.channelId,
              channelName: res.data.channelName
            };
            this.creatorChannelHandle({
              creatorChannel: creatorChannel
            });
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    let query = {
      addCourseType: "add",
      courseChannelId: "",
      type: true
    };
    if (this.courseChannelId) {
      return this.creatorClassList;
      return this.creatorModifyDateTime;
    } else {
      let creatorClassList = [];
      this.creatorClassListHandle({
        creatorClassList: creatorClassList
      });
      let creatorModifyDateTime = {
        modifyDatetime: ""
      };
      this.creatorModifyDateTimeHandle({
        creatorModifyDateTime: creatorModifyDateTime
      });
      // console.log(this.creatorModifyDateTime);
      // console.log(this.creatorClassList);
      return this.creatorClassList;
    }
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
    }
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
        .saveTips {
          position: fixed;
          top: 75px;
          left: calc(50% - 60px);
          padding: 0 5px;
          height: 23px;
          text-align: center;
          line-height: 23px;
          background: rgba(51, 51, 51, 0.44);
          border-radius: 4px;
          color: #fff;
          font-size: 12px;
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
    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  }

  .list {
    background: #fff;
    margin: 0 24px;
    margin-top: 24px;
    .el-container {
      margin: 1px;
    }
    .main {
      // width: auto;
      padding: 20px 0;
      height: calc(100vh - 120px);
    }
    .c-box {
      white-space: nowrap;
    }
  }
}
</style>

