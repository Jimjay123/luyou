<template>
  <div class="list pages">
    <el-container class="pages-content" v-if="groupList.length<=0">
      <!--<el-container class="pages-content" v-if="1">-->
      <el-main class="main">
        <NoGroup></NoGroup>
      </el-main>
    </el-container>
    <el-container class="pages-content" v-else>
      <el-aside width="214px">
        <div class="add">
          <div class="clearfix">
            <a href="javascript:;" @click="entryGroup">加入群</a>
          </div>
        </div>
        <div class="group-list">
          <Vuescroll :ops="ops">
            <ul>
              <li
                :class="{'clearfix':true,'active':checkFun(item.groupId,selGroup.groupId)}"
                v-for="item in groupList"
                :key="item.id"
                @click="groupClick(item)"
              >
                <span class="title">{{subStrFun(item.groupName)}}</span>
                <span class="text">{{item.groupName}}</span>
                <span class="line" v-if="checkFun(item.groupId,selGroup.groupId)"></span>
              </li>
            </ul>
          </Vuescroll>
        </div>
      </el-aside>
      <el-main class="main">
        <div class="header clearfix">
          <div class="left">
            <img :src="selGroup.ownerAvatar" alt />
            <span class="teacher-name">{{selGroup.ownerName}}</span>
            <span class="group-name">{{selGroup.groupName}}</span>
            <span>（{{selGroup.totalStudent||0}}人）</span>
          </div>
          <!--群设置 start-->
          <StuRigLab></StuRigLab>
          <!--群设置 end-->
        </div>
        <div class="plan clearfix">
          <div class="left">
            <span class="name">课程计划</span>
            <div :class="{'btn':true,'active':tabType=='all'}" @click="tabClick('all')">
              全部
              <span>{{groCenInfo.coursePlanTotal}}</span>
            </div>
            <div :class="{'btn':true,'active':tabType=='remain'}" @click="tabClick('remain')">
              待完成
              <span>{{groCenInfo.learningCoursePlanCount}}</span>
            </div>
            <div :class="{'btn':true,'active':tabType=='finish'}" @click="tabClick('finish')">
              已完成
              <span>{{groCenInfo.finishedCoursePlanCount}}</span>
            </div>
            <div :class="{'btn':true,'active':tabType=='expired'}" @click="tabClick('expired')">
              已过期
              <span>{{groCenInfo.expireCoursePlanCount}}</span>
            </div>
          </div>
        </div>
        <div class="card-list">
          <div class="card-box clearfix">
            <Vuescroll :ops="ops">
              <StuNothing v-if="groupList.length<=0"></StuNothing>
              <StuCardItem
                v-for="(item,index) in groCouList"
                :key="index"
                :index="index"
                :options="item"
                @click.native="courseInfoFun(item)"
              ></StuCardItem>
            </Vuescroll>
            <!--分页插件 start-->
            <PaginationItem
              :options="{page:page,limit:limit,total:total,cb:paginCb}"
              style="margin-bottom:53px;"
            ></PaginationItem>
            <!--分页插件 end-->
          </div>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Component, Vue, Emit, Watch } from "vue-property-decorator";
import StuCardItem from "./stuCardItem";
import AddCard from "../group/addCard";
import StuRigLab from "./stuRigLab";
import NoGroup from "./noGroup";
import StuNothing from "./stuNothing";
import PaginationItem from "../group/paginationItem";
import {
  stuGroJoinGroList,
  stuGroPlaLeaStaList,
  stuGroPlaTotStatistic
} from "../../service/studentApi";
import { groMemGroMemList } from "../../service/groupApi";
import { cloneObj, tokenFun, tipsFail, getUrlParams } from "../../utils/utils";
import { State, Action, namespace } from "vuex-class";
import Vuescroll from "vuescroll";

const StudentMod = namespace("student");

@Component({
  name: "studentList",
  components: {
    Vuescroll,
    StuCardItem,
    AddCard,
    StuRigLab,
    PaginationItem,
    NoGroup,
    StuNothing
  }
})
export default class StudentList extends Vue {
  @StudentMod.State("groupList") groupList; //老师端群组列表数据
  @StudentMod.Action("groupListHandle") groupListHandle; //老师端群组列表数据  action修改方法

  @StudentMod.State("selGroup") selGroup; //当前选择的群组 默认第一个群组
  @StudentMod.Action("selGroupHandle") selGroupHandle; //当前选择的群组  action修改方法

  @StudentMod.State("groCenInfo") groCenInfo; //当前选择的群组 的统计信息
  @StudentMod.Action("groCenInfoHandle") groCenInfoHandle; //当前选择的群组 的统计信息  action修改方法

  @StudentMod.State("groCouList") groCouList; //当前选择的群组 课程计划列表
  @StudentMod.Action("groCouListHandle") groCouListHandle; //当前选择的群组 的统计信息  action修改方法

  @StudentMod.State("page") page; //当前选择的群组 当前页
  @StudentMod.Action("pageHandle") pageHandle; //当前选择的群组 当前页  action修改方法

  @StudentMod.State("limit") limit; //当前选择的群组 每页多少条
  @StudentMod.Action("limitHandle") limitHandle; //当前选择的群组 每页多少条  action修改方法

  @StudentMod.State("total") total; //当前选择的群组 总条数
  @StudentMod.Action("totalHandle") totalHandle; //当前选择的群组 总条数  action修改方法

  @StudentMod.State("tabType") tabType; //当前选择的群组 当前已完成未完成类型  all 全部 finish 已完成  remain 未完成
  @StudentMod.Action("tabTypeHandle") tabTypeHandle; //当前选择的群组 当前已完成未完成类型  action修改方法

  @StudentMod.State("groMemList") groMemList; //当前选择的群组 所有群成员list
  @StudentMod.Action("groMemListHandle") groMemListHandle; //当前选择的群组 所有群成员list  action修改方法

  groupVal = ""; //

  groupId = "";

  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: "#c1c1c1",
      opacity: 0,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: "6px",
      disable: false
    },
    scrollPanel: {
      scrollingX: true,
      initialScrollY: false
    }
  }; //滚动条设置

  //跳转 课程详情
  @Emit courseInfoFun(item) {
    if (item.coursePlanType == 23 || item.coursePlanType == 24) {
      // 频道|| 沙盘频道
      this.$router.push({
        path: "/StudentChannel",
        query: {
          groupId: item.groupId,
          coursePlanId: item.coursePlanId,
          coursePlanType: item.coursePlanType
        }
      });
    } else {
      this.$router.push({
        path: "/StudentStandard",
        query: {
          groupId: item.groupId,
          coursePlanId: item.coursePlanId,
          coursePlanType: item.coursePlanType
        }
      });
    }
  }

  //加入群组
  @Emit entryGroup() {
    this.$router.push({
      path: "/student/studentList/entryGroup"
    });
  }

  //截取字符串方法
  @Emit subStrFun(val) {
    val += "";
    let s = val.substr(0, 1);
    if (s) {
      return s;
    } else {
      return "";
    }
  }

  //校验两值是否相等
  @Emit checkFun(val1, val2) {
    return val1 == val2;
  }

  //全部 已完成 未完成点击事件
  @Emit tabClick(item) {
    this.tabTypeHandle({
      tabType: item
    });
    this.paginCb(1, this.limit, { tabType: item, groupId: this.groupId });
  }

  //分页回调
  @Emit paginCb(page, size, options = {}) {
    this.pageHandle({ page: page });
    this.limitHandle({ limit: size });
    let opt = {
      page: page,
      limit: size,
      groupId: options.groupId ? options.groupId : this.selGroup.groupId
    };
    let tabType =
      options.tabType !== undefined
        ? options.tabType === "all"
          ? undefined
          : options.tabType
        : this.tabType == "all"
        ? undefined
        : this.tabType;
    if (tabType !== undefined) {
      //all remain finish expired
      if (tabType === "finish") {
        opt.finishFlag = 1;
      } else if (tabType === "remain") {
        opt.finishFlag = 0;
      } else if (tabType === "expired") {
        opt.expireFlag = 1;
      }
    }
    this.stuGroPlaLeaStaListFun(opt);
  }

  //切换群组--点击事件
  @Emit groupClick(item) {
    let id = item.groupId;
    if (item.groupId != this.selGroup.groupId) {
      this.selGroupHandle({
        selGroup: cloneObj(item)
      });
      this.tabTypeHandle({ tabType: "all" });
      this.stuGroPlaTotStatisticFun(id); //获取群统计信息
      this.paginCb(1, this.limit, { tabType: "all", groupId: id });
      this.groMemGroMemListFun(id); //获取群成员列表
    }
  }

  //当前页接口调用 获取相关信息
  @Emit getInfo() {
    this.stuGroJoinGroListFun(); //获取群组列表接口
  }

  //获取群组相关群组列表
  @Emit stuGroJoinGroListFun() {
    stuGroJoinGroList({}).then(res => {
      if (res.code == "0") {
        // 当前默认选中一个群
        if (res.list.length <= 0) {
          return;
        }
        let group = {};
        if (getUrlParams("groupId")) {
          group = res.list.find(
            item => item.groupId == getUrlParams("groupId")
          );
        } else {
          group = res.list[0];
        }

        let list = res.list;
        this.selGroupHandle({ selGroup: cloneObj(group) });
        this.groupListHandle({ groupList: cloneObj(list) });

        let id = group.groupId;
        this.stuGroPlaTotStatisticFun(id); //获取群统计信息
        this.paginCb(1, this.limit, { tabType: "all", groupId: id });
        this.groMemGroMemListFun(id); //获取群成员列表
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取群课程统计接口
  @Emit stuGroPlaTotStatisticFun(id) {
    stuGroPlaTotStatistic({ groupId: id })
      .then(res => {
        console.log(res);
        if (res.code == "0") {
          this.groCenInfoHandle({ groCenInfo: res.data });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {});
  }

  //获取当前选中项群的所有课程
  @Emit stuGroPlaLeaStaListFun(data) {
    stuGroPlaLeaStaList(data)
      .then(res => {
        if (res.code == "0") {
          this.groCouListHandle({ groCouList: res.page.list });
          this.totalHandle({ total: res.page.totalCount });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {});
  }

  //获取群成员列表接口
  @Emit groMemGroMemListFun(id) {
    groMemGroMemList({ groupId: id }).then(res => {
      if (res.code == "0") {
        this.groMemListHandle({
          groMemList: res.list
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    this.groupId = getUrlParams("groupId") || "";
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

@mixin flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin fontAll($size, $color, $weight) {
  font-size: $size;
  color: $color;
  font-weight: $weight;
}

/*超长...*/
@mixin superWidth {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}

.pages {
  height: calc(100vh - 60px);
  overflow: hidden;
  overflow-x: auto;
  background: rgb(255, 255, 255);
}

.pages-content {
  width: 1220px;
  margin: 0 auto;
  padding-left: 10px;
}

.el-aside {
  overflow: inherit;
  height: fill-available;
  // box-shadow: -2px 0px 6px 0px rgba(0, 0, 0, 0.06);
  background-color: #fff;
}

.add {
  div {
    width: 166px;
    height: 64px;
    margin: 0 auto;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
  }
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 98px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    text-align: center;
    color: #fe7865;
    border-radius: 18px;
    font-weight: 400;
    border: 2px solid rgba(254, 120, 101, 0.4);
    //margin: 16px 23px 15px 24px;
    margin-top: 14px;
    &:hover {
      border: 2px solid rgba(254, 120, 101, 1);
    }
  }
  span {
    display: inline-block;
    width: 100%;
    height: 1px;
    background: #f2f2f2;
  }
}

.entry {
  .notice-item {
    display: flex;
    align-items: center;
    padding: 16px 6px;
    font-size: 15px;
    color: #666;
    font-weight: 600;
    cursor: pointer;
    i {
      display: inline-block;
      width: 31px;
      height: 31px;
      background: url("../../assets/group/iocn-bell.png") no-repeat;
      background-size: 100% auto;
      margin-right: 10px;
    }
  }
  .active {
    background: rgba(251, 248, 248, 1);
    .text {
      color: #fe7865;
      width: 157px;
    }
    .line {
      width: 5px;
      height: 30px;
      background: #fe7865;
      border-radius: 3px;
      color: #fe7865;
    }
  }
}

.group-list {
  height: calc(100vh - 188px);
  li {
    padding: 6px 6px 7px 6px;
    margin: 10px 0px 10px 0px;
    @include flex;
    // border-bottom: 1px solid #f2f2f2;
    cursor: pointer;
    color: #666;
    span {
      float: left;
    }
    .title {
      font-size: 18px;
      width: 31px;
      height: 31px;
      line-height: 31px;
      border: 1px solid rgba(254, 120, 101, 0.25);
      border-radius: 50%;
      @include flex;
      margin-right: 14px;
      font-weight: 500;
      color: #fe7865;
    }
    .text {
      font-size: 16px;
      font-weight: 400;
      width: 157px;
      margin-right: 3px;
      @include superWidth;
    }
    &:hover {
      background: rgba(251, 248, 248, 1);
      border-radius: 100px 4px 4px 100px;
    }
  }
  .notice-item {
    display: flex;
    align-items: center;
    padding: 6px 6px 7px 6px;
    font-size: 15px;
    color: #666;
    font-weight: 600;
    cursor: pointer;
    i {
      display: inline-block;
      width: 31px;
      height: 31px;
      background: url("../../assets/group/iocn-bell.png") no-repeat;
      background-size: 100% auto;
      margin-right: 10px;
    }
  }
  .active {
    background: rgba(251, 248, 248, 1);
    position: relative;
    border-radius: 100px 4px 4px 100px;
    .text {
      color: #fe7865;
    }
    .line {
      width: 6px;
      height: 24px;
      background: #fe7865;
      border-radius: 4px;
      color: #fe7865;
      position: absolute;
      right: 7px;
      top: 10px;
    }
  }
}

.main {
  padding-right: 0px;
  padding-top: 0;
  overflow: inherit;
  position: relative;
  padding: 0px;
}

.header {
  height: 64px;
  padding-top: 16px;
  padding-left: 25px;
  padding-right: 10px;
  .left {
    float: left;
    color: #333;
    font-size: 20px;
    font-weight: 500;
    img {
      width: 28px;
      height: 28px;
      margin-right: 10px;
      border-radius: 50%;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .group-name {
      max-width: 600px;
      @include superWidth;
      margin-left: 20px;
    }
  }
}

.plan {
  height: 64px;
  padding-top: 5px;
  padding-left: 25px;
  padding-right: 10px;
  .left {
    float: left;
    display: flex;
    align-items: center;
    .name {
      color: #666;
      font-size: 16px;
      font-weight: 500;
      margin-right: 24px;
    }
    .btn {
      height: 44px;
      line-height: 44px;
      padding: 0 15px;
      background: #fff;
      color: #999;
      font-weight: 400;
      font-size: 14px;
      box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.2);
      border-radius: 8px;
      margin-right: 24px;
      span {
        font-size: 18px;
        margin-left: 12px;
        vertical-align: middle;
      }
    }
    .active {
      box-shadow: 0px 0px 13px 0px rgba(254, 120, 101, 0.2);
      color: #fe7865;
    }
    .btn:hover {
      box-shadow: 0px 0px 13px 0px rgba(254, 120, 101, 0.2);
    }
  }
  .right {
    float: right;
    margin-top: 9px;
    a {
      display: inline-block;
      width: 128px;
      height: 36px;
      line-height: 32px;
      border-radius: 18px;
      opacity: 0.4;
      border: 2px solid rgba(254, 120, 101, 1);
      text-align: center;
      color: #fe7865;
    }
  }
}

.card-list {
  // padding-left: 20px;
  .card-box {
    height: calc(100vh - 243px);
    // padding: 0 2px;
  }
}
</style>
