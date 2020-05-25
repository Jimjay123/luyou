<template>
  <div class="dia-bg" @click="closeFun" v-if="showAddDailog===1">
    <div class="main-content" @click.stop>
      <div class="content-cli">
        <!-- 关闭按钮 start -->
        <img
          class="closeBtn"
          @click="closeFun"
          :src="require('../../../assets/creator/sandTable/icon-closeImg.svg')"
          alt
        />
        <!-- 关闭按钮 end -->
        <div class="top clearfix">
          <div class="left">
            <span :class="{'item':true,'active':subjectId=='3,4'}" @click="tabClick('3,4')">全部</span>
            <span
              v-for="(item) in majorList"
              :key="item.id"
              :class="{'item':true,'active':subjectId== item.id}"
              @click="tabClick(item.id)"
            >{{item.name}}</span>
          </div>
          <div class="right">
            <SearchInput
              class="input"
              style="width:198px;height:28px;font-size:12px"
              :value="keyName"
              :placeHolder="'请输入关键字'"
              :input="(e,type)=>inputChange(e,type,'keyName')"
            ></SearchInput>
          </div>
        </div>
        <ul class="list">
          <li
            v-for="(item,index) in creList"
            :key="index"
            :style="{'opacity':(item.isSelected?'0.5':'1')}"
          >
            <img :src="item.popularizeImageUrl" title="图片" />
            <p>{{item.courseName}}</p>
            <span class="span-timer">{{item.duration}}分钟</span>
            <div class="remark-box">
              <span
                v-for="(obj,i) in item.tagNameList"
                :key="i"
                :class="{'remark':true,'authority':obj=='官方'}"
              >{{obj}}</span>
              <span class="whiteLayer"></span>
            </div>
            <div class="btn">
              <a href="javascript:;" class="see" @click="previewFun(item,item.courseServerUrl)">预览</a>
              <a
                v-if="item.isSelected !==true"
                href="javascript:;"
                class="add"
                @click="selectFun('1',index,item)"
              >选择</a>
              <a v-else href="javascript:;" class="has">已存在</a>
            </div>
          </li>
        </ul>
        <!--分页插件 start-->
        <PaginationItem
          :options="{page:page,limit:limit,total:total,cb:paginCb}"
          style="margin-bottom:53px;margin-top:21px"
        ></PaginationItem>
        <!--分页插件 end-->
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import SearchInput from "./searchInput";
import PaginationItem from "./paginationItem";
import {
  uniPurAvaCouList,
  courseListForChannel,
  saveCourseChannel,
  updateCourseChannel
} from "../../../service/teachersApi";
import {
  universityAvailCourseList,
  stChannelNewOperate
} from "../../../service/sandTableApi";
import { saveCreatorFun } from "../../../service/creator/creatorAction";
import { cloneObj, tokenFun, tipsFail, trimNumber } from "../../../utils/utils";
import { State, Action, namespace } from "vuex-class";

const CreCouPlaStore = namespace("creCouPlans"); //原
const creatorStore = namespace("creator"); //现 已改

const SandTableMod = namespace("sandTable"); //沙盘vuex

@Component({
  name: "primary",
  components: {
    SearchInput,
    PaginationItem
  }
})
export default class Primary extends Vue {
  @SandTableMod.State("showAddDailog") showAddDailog; //添加课程弹框
  @SandTableMod.Action("showAddDailogHandle") showAddDailogHandle; //添加课程弹框  action

  @SandTableMod.State("addOrChangeCourse") addOrChangeCourse; //添加课程弹框 add or change
  @SandTableMod.Action("addOrChangeCourseHandle") addOrChangeCourseHandle; //添加课程弹框  add or change

  @SandTableMod.State("creList") creList; //新建竖版列表
  @SandTableMod.Action("creListHandle") creListHandle; //新建竖版列表  action修改方法

  @SandTableMod.State("sandTable") sandTable; //沙盘课程频道-添加课程
  @SandTableMod.Action("sandTableHandle") sandTableHandle; //沙盘课程频道-添加课程

  @SandTableMod.State("tabList") tabList; //沙盘课程频道-选中课程
  @SandTableMod.Action("tabListHandle") tabListHandle; //沙盘课程频道-选中课程

  @SandTableMod.State("headIconList") headIconList; //沙盘课程频道-选中课程
  @SandTableMod.Action("headIconListHandle") headIconListHandle; //沙盘课程频道-选中课程

  temIndex = ""; //竖版 下标

  page = 1; //当前页数
  limit = 5; //每页条数
  total = 10; //总条数

  subjectId = "3,4"; //当前tab 选中的类型 '3,4' 全部
  keyType = ""; // 1标准课 2课程计划
  keyName = ""; //输入框搜索值
  list = []; //当前页数据列表
  majorList = [{ id: 3, name: "TPE标准课" }, { id: 4, name: "NPE标准课" }];
  count = -1;

  //tab切换点击事件
  @Emit tabClick(val) {
    this.subjectId = val;
    this.paginCb(1, this.limit, {});
    if (val == "3,4") {
      let data = {
        page: this.page,
        limit: this.limit,
        keyTypes: this.subjectId,
        keyName: this.keyName
      };
      this.uniPurAvaCouListFun(data, val);
    } else {
      let data = {
        page: this.page,
        limit: this.limit,
        keyTypes: this.subjectId,
        keyName: this.keyName
      };
      this.uniPurAvaCouListFun(data, val);
    }
  }

  //输入框搜索值改变事件
  @Emit inputChange(e, type, name) {
    if (type === "input") {
      this[name] = e.target.value;
      this.paginCb(1, this.limit);
    } else if (type === "del") {
      this[name] = "";
    } else if (type === "select") {
      this[name] = e;
    }
  }

  //窗口关闭回调
  @Emit closeFun() {
    let showAddDailog = 0;
    this.showAddDailogHandle({
      showAddDailog: showAddDailog
    });
  }

  //预览点击事件
  @Emit previewFun(item, url) {
    // 沙盘npe||沙盘tpe
    let address = this.$route.name;
    // 原页面跳转
    this.$router.push({
      path: "/previewMain",
      query: {
        courseId: item.courseId,
        preview: 1,
        address: address,
        displayR: true
      }
    });

    // old
    // let courseType = item.keyType;
    // if (courseType == 3) {
    //   //tpe沙盘标准课
    //   window.open(
    //     window.location.href.split("#")[0] +
    //       "#/orther?url=" +
    //       encodeURIComponent(url)
    //   );
    // } else if (courseType == 4) {
    //   //npe沙盘标准课
    //   url = url + "&preview=1";
    //   window.open(
    //     window.location.href.split("#")[0] +
    //       "#/orther?url=" +
    //       encodeURIComponent(url)
    //   );
    // }
  }

  // 将新添加的课程添加到数组中

  //添加取消点击事件
  @Emit selectFun(type, i, item) {
    let keyType = item.courseType;
    let addOrChangeCourse = cloneObj(this.addOrChangeCourse); // change
    let courseIndex = this.addOrChangeCourse.index;
    addOrChangeCourse.index = i;
    this.addOrChangeCourseHandle({
      addOrChangeCourse: addOrChangeCourse
    });

    let num = this.addOrChangeCourse.num;
    if (num === 0) {
      // add添加
      let sandTable = cloneObj(this.sandTable);
      let creList = cloneObj(this.creList);
      let dataList = {};
      dataList = creList[i];
      dataList.showBg = 1;
      dataList.index = -1;
      dataList.showDialog = 0;
      dataList.ceilOrFloor = 0;
      dataList.creListIndex = i;
      dataList.positionX = 950;
      dataList.positionY = 520;
      dataList.courseType = keyType;
      sandTable.stCourseList.push(dataList);
      this.sandTableHandle({
        sandTable: sandTable
      });

      // 修改选中课程
      let tabList = cloneObj(this.tabList);
      tabList.push(creList[i]);
      this.creList[i].isSelected = true;
      this.tabListHandle({
        tabList: tabList
      });
    } else {
      //change
      //1.替换index位置的数组
      //2.恢复添加课程列表的状态
      //3.修改当前选择课程的状态
      let sandTable = cloneObj(this.sandTable);
      let creList = cloneObj(this.creList);
      // courseId
      creList.map(d => {
        if (sandTable.stCourseList[courseIndex].courseId === d.courseId) {
          d.isSelected = false;
        }
      });
      creList[i].isSelected = true;

      this.creListHandle({
        creList: creList
      });

      let creListIndex = sandTable.stCourseList[courseIndex].creListIndex; //之前选中课程添加课程竖版的id
      let index = sandTable.stCourseList[courseIndex].index; //当前选中newCourse课程id
      let positionX = sandTable.stCourseList[courseIndex].positionX; //获取newCourse的positionX
      let positionY = sandTable.stCourseList[courseIndex].positionY; //获取newCourse的positionY
      // let courseType = sandTable.stCourseList[courseIndex].courseType;
      let dataList = {};
      dataList = creList[i];
      dataList.showBg = 1;
      dataList.index = index;
      dataList.showDialog = 0;
      dataList.ceilOrFloor = 0;
      dataList.creListIndex = i;
      dataList.positionX = positionX;
      dataList.positionY = positionY;
      // dataList.courseType = courseType;
      sandTable.stCourseList.splice(courseIndex, 1, dataList);
      this.sandTableHandle({
        sandTable: sandTable
      });
      // 修改原课程的显示状态以及现课程的显示状态
      // 修改选中课程
      let tabList = cloneObj(this.tabList);
      tabList.splice(courseIndex, 1, creList[i]);
      this.tabListHandle({
        tabList: tabList
      });
    }
    let data = cloneObj(this.sandTable);
    // 修改实时保存样式
    let headIconList = cloneObj(this.headIconList);
    headIconList[2].isUse = "doing";
    this.headIconListHandle({
      headIconList: headIconList
    });
    stChannelNewOperate(data)
      .then(res => {
        // console.log(res);
        if (res.code == 0) {
          let sandTable = cloneObj(this.sandTable);
          sandTable = res.data.currentStChannelData;
          sandTable.previousOperate = res.data.previousOperate;
          this.sandTableHandle({
            sandTable: sandTable
          });

          let headIconList = cloneObj(this.headIconList);
          headIconList[2].isUse = "done";
          this.headIconListHandle({
            headIconList: headIconList
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
    // 关闭添加课程弹框
    let showAddDailog = 0;
    this.showAddDailogHandle({
      showAddDailog: showAddDailog
    });
  }

  //分页回调
  @Emit paginCb(page, limit, options = {}) {
    this.page = page;
    this.limit = limit;
    if (this.subjectId == "3,4") {
      let opt = {
        page: page,
        limit: limit,
        keyTypes: this.subjectId,
        keyName: this.keyName
      };
      this.uniPurAvaCouListFun(opt);
    } else {
      let opt = {
        page: page,
        limit: limit,
        keyTypes: this.subjectId,
        keyName: this.keyName
      };
      this.uniPurAvaCouListFun(opt);
    }
  }

  //获取列表数据接口
  @Emit uniPurAvaCouListFun(data, val) {
    //这里通过将data 换成了对象
    universityAvailCourseList(data).then(res => {
      if (res.code == 0) {
        let data = res.page;
        this.total = res.page.totalCount;
        let pageList = res.page.list;
        let creList = [];

        let sandTable = cloneObj(this.sandTable);
        let stCourseList = sandTable.stCourseList;

        pageList.map(item => {
          // console.log(item)
          let newObj = {
            courseType: item.courseType, //TPE标准课 3 NPE标准课 4
            duration: item.duration, //时长
            courseId: item.courseId, //课程id
            courseName: item.courseName, //课程名称
            keyType: item.courseType, //标准课 1
            mainContent: item.mainContent, //课程简介
            popularizeImageUrl: item.popularizeImageUrl, //titile
            courseServerUrl: item.courseServerUrl, //预览
            tagNameList: item.tagNameList || "", //标签
            tagNames: item.tagNames,
            isSelected: item.isSelected
          };

          let obj = stCourseList.find(d => d.courseId === item.courseId);
          if (obj) {
            newObj.isSelected = true;
          }
          creList.push(newObj);
        });
        this.creListHandle({
          creList: cloneObj(creList)
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //初次创建新建--接口
  @Emit saveCourseChannelFun() {
    saveCourseChannel().then(res => {
      3;
      if (res.code == 0) {
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    this.temIndex = this.$route.query.temIndex; //获取当前竖版下标
    let data = {
      page: this.page,
      limit: this.limit,
      keyTypes: this.subjectId,
      keyName: this.keyName
    };
    this.paginCb(1, this.limit, {});
    this.uniPurAvaCouListFun(data);
  }

  update() {
    this.uniPurAvaCouListFun(data);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.dia-bg {
  // background: rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 999;
}

body .main-content {
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.1);
}

.content-cli {
  width: 998px;
  height: 534px;
  background: rgba(255, 255, 255, 1);
  border-radius: 13px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 33px 30px 28px;
}
.closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.top {
  .left {
    float: left;
    .item {
      display: inline-block;
      padding: 7px 12px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      cursor: pointer;
      margin-right: 8px;
    }
    .active {
      background: rgba(254, 243, 241, 1);
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(254, 120, 101, 1);
    }
  }
  .right {
    float: right;
    .close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 65px;
      height: 26px;
      line-height: 26px;
      border-radius: 12px;
      border: 1px solid rgba(204, 204, 204, 0.4);
      font-size: 10px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      text-align: center;
      margin-left: 26px;
      margin-right: 19px;
    }
  }
}

.content-cli .input-btn {
  width: 165px;
  height: 23px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(217, 217, 217, 1);
}

.content-cli .span-one {
  width: 43px;
  height: 28px;
  background: rgba(254, 243, 241, 1);
  border-radius: 5px;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(254, 120, 101, 1);
  margin-left: 23px;
  margin-top: 20px;
}

.content-cli .span-three {
  width: 55px;
  height: 28px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 5px;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  margin-left: 7px;
  margin-top: 20px;
}

.content-cli .span-two {
  width: 67px;
  height: 28px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 5px;
  margin-left: 7px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
}

.content-cli .input-btn {
  width: 165px;
  height: 23px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(217, 217, 217, 1);
  margin-left: 350px;
  margin-top: 23px;
}

.content-cli .list {
}

.content-cli .list li {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 3px 0px rgba(153, 153, 153, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 10px;
}

.content-cli .list li:first-child {
  margin-top: 21px;
}

.content-cli .list li img {
  width: 67px;
  height: 40px;
  background: rgba(94, 94, 94, 0.24);
  border-radius: 3px;
}

.content-cli .list li p {
  float: left;
  display: block;
  width: 288px;
  max-height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: 18px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; //几行
}

.content-cli .list li .span-timer {
  width: 63px;
  height: 20px;
  font-weight: 400;
  font-size: 14px;
  color: #1a1a1a;
  margin-left: 80px;
}

.list {
  .remark-box {
    width: 202px;
    height: 24px;
    margin-left: 39px;
    overflow: hidden;
    padding: 0;
    padding-top: 1px;
    position: relative;
    .remark {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      background: rgba(250, 250, 250, 1);
      border-radius: 3px;
      border: 1px solid rgba(238, 238, 238, 1);
      padding: 2px 5px;
      margin-right: 9px;
    }
    .authority {
      background: rgba(254, 243, 241, 1);
      font-size: 12px;
      font-weight: 400;
      color: rgba(254, 120, 101, 1);
    }
    .whiteLayer {
      position: absolute;
      right: 0;
      top: 0;
      width: 24px;
      height: 20px;
      width: 24px;
      height: 20px;
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.9) 60%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
  .btn {
    margin-left: 34px;
    a {
      display: inline-flex;
      width: 55px;
      height: 26px;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
    }
    .see {
      font-size: 12px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
    .add {
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .cancel {
      border: 1px solid rgba(204, 204, 204, 1);
      font-size: 12px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
    .has {
      background: rgba(153, 153, 153, 0.2);
      color: rgba(255, 255, 255, 1);
      font-size: 12px;
      font-weight: 500;
      cursor: not-allowed;
    }
  }
}
</style>
