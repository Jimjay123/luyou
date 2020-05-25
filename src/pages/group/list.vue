<template>
  <div class="list pages">
    <TopHeader></TopHeader>
    <div style="width:100%;height:100%;background: #FFF">
      <el-container class="pages-content" v-if="groupLi.length > 0">
        <el-aside width="214px">
          <div class="add">
            <div class="clearfix">
              <a href="javascript:;" @click="addGroup">创建群</a>
            </div>
          </div>
          <!-- <div class="entry"> -->
          <!-- <div
            :class="[{active:groupVal==='notice'}, 'notice-item', 'clearfix']"
            @click="entryGroup"
          >
            <i />
            <span class="text">入群申请</span>
            <span class="line" v-if="groupVal==='notice'"></span>
          </div>-->
          <!-- </div> -->
          <div class="group-list">
            <Vuescroll :ops="ops">
              <ul>
                <li
                  key="notice-item-key"
                  :class="[{active:checkFun(-1,selGroup.id)}, 'notice-item', 'clearfix']"
                  @click="entryGroup"
                >
                  <i />

                  <span class="text">
                    入群申请
                    <!-- <span
                      class="dota"
                      v-for="(item, index) in list"
                      :key="index"
                      v-show="item.agreeFlag == 0? true : false"
                    ></span>-->

                    <span class="dota" v-show="getListRed()"></span>
                  </span>

                  <span class="line" v-if="checkFun(-1,selGroup.id)"></span>
                </li>
                <li
                  :class="{'clearfix':true,'active':checkFun(item.id,selGroup.id)}"
                  v-for="item in groupList"
                  :key="item.id"
                  @click="groupClick(item)"
                >
                  <span class="title">{{subStrFun(item.name)}}</span>
                  <span class="text">{{item.name}}</span>
                  <span class="line" v-if="checkFun(item.id,selGroup.id)"></span>
                </li>
              </ul>
            </Vuescroll>
          </div>
        </el-aside>
        <el-main v-if="checkFun(-1,selGroup.id)" class="main">
          <GroupNotice></GroupNotice>
          <router-view></router-view>
        </el-main>
        <el-main v-else class="main">
          <div class="header clearfix">
            <div class="left">
              <span class="group-name">{{selGroup.name}}</span>
              <span>（{{selGroup.totalStudent||0}}）</span>
            </div>
            <!--群设置 start-->
            <RightLab></RightLab>
            <!--群设置 end-->
          </div>
          <div class="plan clearfix">
            <div class="left">
              <span class="name">课程计划</span>
              <div :class="{'btn':true,'active':tabType=='all'}" @click="tabClick('all')">
                <span>全部</span>
                <span style="font-size:18px;font-weight:600;">{{groCenInfo.totalCount}}</span>
              </div>
              <div :class="{'btn':true,'active':tabType=='finish'}" @click="tabClick('finish')">
                <span>已完成</span>
                <span style="font-size:18px;font-weight:600;">{{groCenInfo.finishCount}}</span>
              </div>
              <div :class="{'btn':true,'active':tabType=='remain'}" @click="tabClick('remain')">
                <span>待完成</span>
                <span style="font-size:18px;font-weight:600;">{{groCenInfo.remainCount}}</span>
              </div>
            </div>
            <div class="right">
              <a href="javascript:;" @click="addCourse">新建课程计划</a>
            </div>
          </div>
          <div class="card-list">
            <div class="card-box clearfix">
              <Vuescroll :ops="ops">
                <!-- <AddCard v-if="groCouList.length<=0"></AddCard> -->
                <!-- 课程 -->
                <!-- <div class="sna1 gkd" ref="sna" v-if="tabType==='all'" style="display: none">
                  <a href="javascript:;" class="sna" @click="EstablishClick">
                    <a href="javascript:;" class="sna" @click="EstablishClick">
                      <div class="imgs"></div>
                    </a>
                  </a>
                </div>-->
                <!-- 取消cardItem 修改了:temIndex="tabType==='all'?index+2:index+1" -->
                <CardItem
                  class="gkd"
                  v-for="(item,index) in groCouList"
                  :key="index"
                  :temIndex="tabType==='all'?index+1:index+1"
                  :options="item"
                  @click.native="courseInfoFun(item)"
                ></CardItem>
              </Vuescroll>
              <!--分页插件 start-->
              <PaginationItem
                :options="{page:page,limit:limit,total:total,cb:paginCb}"
                style="margin-bottom:53px;"
              ></PaginationItem>
              <!--分页插件 end-->
            </div>

            <div class="center" v-if="listzz">
              <div class="nothing">
                <img :src="require('../../assets/student/no-course.svg')" alt />
                <p class="p1">暂无课程计划～</p>
                <p class="p2">快去发布课程计划吧～</p>
              </div>
            </div>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- <noGroup></noGroup> -->
      <div class="no-group" v-if="groupLi.length == 0">
        <div class="centered">
          <div class="nothing">
            <img :src="require('../../assets/student/no-group.svg')" alt />
            <p class="p1">您还未创建群呢</p>
            <p class="p2">快去创建一个群吧～</p>
          </div>

          <div class="button">
            <a href="javascript:;" @click="addGr">立即创建</a>
          </div>
        </div>

        <div class="cards1" v-if="cardaz">
          <div class="h">
            <h3>创建群</h3>
            <span>用以发布您的课程计划</span>
          </div>
          <el-input v-model="name" placeholder="群名称，不超过30字符，如：社工-19届-3班" label-width="80px"></el-input>
          <CheckBox
            style="margin-left:32px;"
            :value="checkVal"
            :list="checkList"
            :input="checkChange"
          ></CheckBox>

          <el-row>
            <el-button>
              <span @click="AddGroup">确定</span>
            </el-button>
            <el-button v-on:click="handleClickss1">
              <span>取消</span>
            </el-button>
          </el-row>
        </div>

        <footer class="footer">© 2019 上海积途信息科技有限公司. All Rights Reserved.</footer>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Watch } from "vue-property-decorator";
import CardItem from "./CardItem";
import AddCard from "./addCard";
import RightLab from "./rightLab";
import PaginationItem from "./paginationItem";
import TopHeader from "./../Header/header";

import CheckBox from "./checkBox";

import {
  groInfOwnGroupList,
  groCouPlaCouPlaCouPlaSta,
  groCouPlaCoursePlanList,
  groMemGroMemList,
  groMemApplyList,
  groupInfoAdd
} from "../../service/groupApi";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import { State, Action, namespace } from "vuex-class";
import Vuescroll from "vuescroll";
import GroupNotice from "../notice/Group";
const GroupMod = namespace("group");

@Component({
  name: "groupList",
  components: {
    Vuescroll,
    CardItem,
    AddCard,
    RightLab,
    PaginationItem,
    TopHeader,
    GroupNotice,
    CheckBox
  }
})
export default class GroupList extends Vue {
  @GroupMod.State("groupList") groupList; //老师端群组列表数据
  @GroupMod.Action("groupListHandle") groupListHandle; //老师端群组列表数据  action修改方法

  @GroupMod.State("selGroup") selGroup; //当前选择的群组 默认第一个群组
  @GroupMod.Action("selGroupHandle") selGroupHandle; //当前选择的群组  action修改方法

  @GroupMod.State("groCenInfo") groCenInfo; //当前选择的群组 的统计信息
  @GroupMod.Action("groCenInfoHandle") groCenInfoHandle; //当前选择的群组 的统计信息  action修改方法

  @GroupMod.State("groCouList") groCouList; //当前选择的群组 课程计划列表
  @GroupMod.Action("groCouListHandle") groCouListHandle; //当前选择的群组 的统计信息  action修改方法

  @GroupMod.State("page") page; //当前选择的群组 当前页
  @GroupMod.Action("pageHandle") pageHandle; //当前选择的群组 当前页  action修改方法

  @GroupMod.State("limit") limit; //当前选择的群组 每页多少条
  @GroupMod.Action("limitHandle") limitHandle; //当前选择的群组 每页多少条  action修改方法

  @GroupMod.State("total") total; //当前选择的群组 总条数
  @GroupMod.Action("totalHandle") totalHandle; //当前选择的群组 总条数  action修改方法

  @GroupMod.State("tabType") tabType; //当前选择的群组 当前已完成未完成类型  all 全部 finish 已完成  remain 未完成
  @GroupMod.Action("tabTypeHandle") tabTypeHandle; //当前选择的群组 当前已完成未完成类型  action修改方法

  @GroupMod.State("groMemList") groMemList; //当前选择的群组 所有群成员list
  @GroupMod.Action("groMemListHandle") groMemListHandle; //当前选择的群组 所有群成员list  action修改方法

  @GroupMod.State("agreeFlagText") agreeFlagText; //老师端群组列表数据
  @GroupMod.Action("agreeFlagTextHandle") agreeFlagTextHandle; //老师端群组列表数据  action修改方法
  groupVal = ""; //
  val = ""; //
  // agreeFlag = 0;
  list = [];
  // page = 1;
  // limit = 10;
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

  groupLi = [];

  cardaz = false;

  checkVal = {
    val: true,
    label: "入群需审批"
  }; //单选框选中的值

  //单选框可选择值
  checkList = [
    {
      val: true,
      label: "入群需审批"
    },
    {
      val: false,
      label: "入群不审批"
    }
  ];
  name = "";
  cardaz = false;
  //新建群组点击事件
  @Emit addGr() {
    this.cardaz = true;
  }

  @Emit handleClickss1() {
    this.cardaz = !this.cardaz;
  }
  @Emit AddGroup() {
    groupInfoAdd({ name: this.name, approveJoinFlag: this.checkVal.val })
      .then(res => {
        if (res.code == "0") {
          this.$router.go(0);
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  @Emit checkChange(item) {
    this.checkVal = item;
  }

  //跳转 课程详情
  @Emit courseInfoFun(item) {
    this.$router.push({
      path: "/groupStaAnalysis",
      query: {
        groupId: item.groupId, //群id
        coursePlanId: item.coursePlanId, //课程计划id
        coursePlanType: item.coursePlanType //必填1单一标准课 2课程频道
      }
    });
  }

  @Emit getListRed() {
    let list = this.agreeFlagText;
    if (list.find(item => item.agreeFlag == 0)) {
      return true;
    }
    return false;
  }

  //新建群组点击事件
  @Emit addGroup() {
    this.$router.push({
      path: "/group/list/add"
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

  //点击添加课程卡片跳转至Establish
  @Emit EstablishClick() {
    this.$router.push({
      path: "/Establish?" + location.href
    });
  }
  //校验两值是否相等
  @Emit checkFun(val1, val2) {
    return val1 == val2;
  }

  //新建课程计划点击事件
  @Emit addCourse() {
    this.$router.push({
      path: "/Establish"
    });
  }

  //全部 已完成 未完成点击事件
  @Emit tabClick(item) {
    this.tabTypeHandle({
      tabType: item
    });
    this.paginCb(1, this.limit, { tabType: item, groupId: this.groupId });
  }

  //入群申请 --跳转我的群消息
  @Emit entryGroup() {
    this.selGroupHandle({
      selGroup: { id: -1 }
    });
    this.$router.push({
      path: "/group/list?groupId=-1"
    });
    groMemApplyList({
      page: this.page,
      limit: this.limit,
      agreeFlag: this.agreeFlagText
    })
      .then(res => {
        console.log(res);
        if (res.code == "0") {
          this.list = res.page.list;
          console.log(this.agreeFlagText);
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  //分页回调
  @Emit
  paginCb(page, size, options = {}) {
    this.pageHandle({ page: page });
    this.limitHandle({ limit: size });
    let opt = {
      page: page,
      limit: size,

      groupId: options.groupId ? options.groupId : this.selGroup.id
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
      opt.finishFlag = tabType == "finish" ? true : false;
    }
    this.groCouPlaCoursePlanListFun(opt);
    // this.getData(opt);
  }

  //切换群组--点击事件
  @Emit groupClick(item) {
    let id = item.id;
    if (item.id != this.selGroup.id) {
      this.selGroupHandle({
        selGroup: cloneObj(item)
      });
      this.tabTypeHandle({ tabType: "all" });
      this.groCouPlaCouPlaCouPlaStaFun(id); //获取群统计信息
      this.paginCb(1, this.limit, { tabType: "all", groupId: id });
      this.groMemGroMemListFun(id); //获取群成员列表
      this.$router.push({
        path: `/group/list?groupId=${id}`
      });
    }
  }

  //当前页接口调用 获取相关信息
  @Emit getInfo() {
    this.groInfOwnGroupListFun(); //获取群组列表接口
  }

  //获取老师相关群组列表
  @Emit groInfOwnGroupListFun() {
    groInfOwnGroupList({})
      .then(res => {
        if (res.code == "0") {
          //判断是否是选中入群申请
          this.groupLi = res.groupList;
          // console.log(this.groupLi.length)
          const groupId =
            decodeURIComponent(
              (new RegExp(
                "[?|&]" + "groupId" + "=" + "([^&;]+?)(&|#|;|$)"
              ).exec(location.href) || [, ""])[1].replace(/\+/g, "%20")
            ) || null;
          const isNotice = groupId == -1 ? true : false;
          // 当前默认选中一个群
          const group =
            (groupId && res.groupList.find(g => g.id == groupId)) ||
            res.groupList[0];
          this.selGroupHandle({ selGroup: isNotice ? { id: -1 } : group });
          this.groupListHandle({ groupList: res.groupList });
          if (isNotice) return;
          let id = group.id;
          this.groCouPlaCouPlaCouPlaStaFun(id); //获取群统计信息
          this.paginCb(1, this.limit, { tabType: "all", groupId: id });
          this.groMemGroMemListFun(id); //获取群成员列表
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {});
  }

  //获取群课程统计接口
  @Emit groCouPlaCouPlaCouPlaStaFun(id) {
    groCouPlaCouPlaCouPlaSta({ groupId: id })
      .then(res => {
        // console.log(res);
        if (res.code == "0") {
          this.groCenInfoHandle({ groCenInfo: res.data });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {});
  }

  //获取当前选中项群的所有课程
  @Emit groCouPlaCoursePlanListFun(data) {
    groCouPlaCoursePlanList(data)
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

  listzz = false;

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
    this.getInfo();
    groMemApplyList({
      page: this.page,
      limit: this.limit,
      agreeFlag: this.agreeFlagText
    })
      .then(res => {
        if (res.code == "0") {
          this.agreeFlagTextHandle({
            agreeFlagText: res.page.list
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
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

@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

/*超长...*/
@mixin superWidth {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}

.pages {
  height: 100vh;
  overflow: hidden;
  overflow-x: auto;
}
.pages-content {
  width: 1220px;
  margin: 0 auto;
  padding-left: 10px;
  // background-color: #fbfbfb;
}

.el-aside {
  overflow: inherit;
  height: fill-available;
  background-color: #fff;
  // box-shadow: -2px 0px 6px 0px rgba(0, 0, 0, 0.06);
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
  background-color: #fff;
  li {
    padding: 6px 6px 7px 6px;
    margin: 10px 0px 10px 0;
    @include flex;
    // border-bottom: 1px solid #f2f2f2;
    cursor: pointer;
    color: #666;
    box-sizing: border-box;
    position: relative;
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
      margin-right: 10px;
      font-weight: 500;
      color: #fe7865;
    }
    .dota {
      position: absolute;
      left: 111px;
      top: 22px;
      width: 6px;
      height: 6px;
      background: rgba(254, 120, 101, 1);
      border-radius: 50%;
    }
    .text {
      font-size: 15px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 15px;
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
    position: relative;
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
      right: 5px;
      top: 10px;
    }
  }
}

.main {
  padding-right: 0;
  padding-left: 0;
  margin-top: 0;
  overflow: inherit;
  position: relative;
}

.header {
  height: 36px;
  line-height: 36px;
  margin-bottom: 11px;
  padding-left: 20px;
  padding-right: 10px;
  .left {
    float: left;
    color: #333;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    span {
      display: inline-block;
      vertical-align: text-top;
    }
    .group-name {
      max-width: 600px;
      @include superWidth;
    }
  }
}
.plan {
  padding-left: 20px;
  padding-right: 10px;
  height: 64px;
  padding-top: 5px;
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
      // line-height: 44px;
      padding: 14px 31px 14px 15px;
      background: #fff;
      color: #999;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
      box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.2);
      border-radius: 8px;
      margin-right: 24px;
      span {
        font-size: 18px;
        margin-left: 12px;
        vertical-align: middle;
        line-height: 16px;
      }
    }
    .btn:hover {
      box-shadow: 0px 0px 13px 0px rgba(254, 120, 101, 0.2);
    }
    .active {
      box-shadow: 0px 0px 13px 0px rgba(254, 120, 101, 0.2);
      color: #fe7865;
      span {
        color: #fe7865;
      }
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
      font-size: 16px;
      font-weight: 400;
      // opacity: 0.4;
      border: 2px solid rgba(254, 120, 101, 0.4);
      text-align: center;
      color: #fe7865;
      &:hover {
        border: 2px solid rgba(254, 120, 101, 1);
      }
    }
  }
}

.card-list {
  padding: 0 3px;
  .card-box {
    height: calc(100vh - 243px);
    .sna1 {
      float: left;
      margin-right: 20px;
      margin-bottom: 22px;
      margin-top: 16px;
      .sna {
        position: relative;
        float: left;
        .imgs {
          width: 224px;
          height: 225px;
          background: url(../../assets/img/null.svg) no-repeat;
        }
        .imgs:hover {
          box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 6px 0px;
          border-radius: 12px;
        }
      }
    }
    // .gkd:nth-child(4n) {
    //   margin-right: 0;
    //   float: right;
    // }
  }
}

.center {
  position: absolute;
  left: 38%;
  top: 50%;
  transform: translate(-50%, -50%);
  .nothing {
    text-align: center;
    .p1 {
      @include fontSet(18px, #4d4d4d, 500);

      margin-top: 10px;
    }
    .p2 {
      @include fontSet(14px, #999, 400);
      margin-top: 6px;
    }
  }

  .button {
    width: 110px;
    height: 36px;
    margin: 0 auto;
    margin-top: 35px;
    a {
      width: 110px;
      height: 36px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      display: inline-flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      line-height: 36px;
      font-size: 16px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      font-weight: 400;
    }
  }
}
.centered {
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  .nothing {
    text-align: center;
    .p1 {
      @include fontSet(18px, #4d4d4d, 500);

      margin-top: 10px;
    }
    .p2 {
      @include fontSet(14px, #999, 400);
      margin-top: 6px;
    }
  }

  .button {
    width: 110px;
    height: 36px;
    margin: 0 auto;
    margin-top: 35px;
    a {
      width: 110px;
      height: 36px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      display: inline-flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      line-height: 36px;
      font-size: 16px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      font-weight: 400;
    }
  }
}

.footer {
  position: fixed;
  bottom: 24px;
  left: 0;
  width: 100%;
  min-width: 1200px;
  text-align: center;
  @include fontSet(14px, #999, 600);
  font-family: PingFangSC;
  line-height: 20px;
}

.cards1 {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  z-index: 999;
  width: 551px;
  height: 253px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
  border-radius: 13px;
  padding: 22px 32px 28px 0px;
  .h {
    vertical-align: middle;
    align-items: center;
    height: 30px;
    line-height: 30px;
    margin-left: 32px;
    h3 {
      float: left;
      font-size: 22px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }
    span {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(153, 153, 153, 1);
      line-height: 19px;
      letter-spacing: 1px;
    }
  }
  .el-row {
    height: 36px;
    margin-top: 24px;
    .el-button:last-child {
      width: 110px;
      height: 36px;
      background: rgba(255, 255, 255, 1);
      border-radius: 18px;
      border: 1px solid rgba(254, 120, 101, 0.4);
      text-align: center;
      float: right;
      z-index: 9999;
      margin-right: 23px;
      span {
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(254, 120, 101, 1);
        line-height: 0px;
      }
    }
    .el-button:last-child:hover {
      background-color: #fff;
      border-color: #fe7865 !important;
    }
    .el-button:first-child {
      width: 110px;
      height: 36px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      text-align: center;
      float: right;
      z-index: 999;
      border: none;
      span {
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 0px;
      }
    }
  }
}
.cards1 /deep/ .el-input {
  margin-top: 34px;
  width: 487px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  margin-bottom: 20px;
  margin-left: 32px;
  &hover {
    border-color: #fff;
  }
  .el-input__inner:hover {
    border-color: rgba(254, 120, 101, 0.2);
  }
  .el-input__inner:focus {
    border-color: rgba(255, 163, 158, 1);
    box-shadow: 0px 0px 0px 2px rgba(254, 120, 101, 0.2);
  }
}
</style>
