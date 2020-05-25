/**

* Created by wangxin

* @date 2019/8/22 14:12  老师端统计分析

*/
<template>
  <div class="main-content clearfix">
    <div class="top-title">
      <span class="line"></span>个人中心
    </div>
    <!--基础信息 start -->
    <div class="base-info">
      <div class="left">
        <img :src="baseInfo.avatar || require('../../assets/img/touxiang.svg')" alt />
        <div class="info">
          <div class="person">
            <div class="p1">
              {{baseInfo.memberName}}
              <i v-if="baseInfo.gender===1" class="boy"></i>
              <i v-else class="girl"></i>
              <span>专业老师</span>
            </div>
            <p class="p2">ID：{{baseInfo.mobile}}</p>
          </div>
          <div class="item ml40">
            <p class="p1" style="font-weight:550">{{baseInfo.coursePlanTotal}}</p>
            <p class="p2">课程计划</p>
          </div>
          <div class="h-line"></div>
          <div class="item">
            <p class="p1" style="font-weight:550">{{baseInfo.groupTotal}}</p>
            <p class="p2">我的群组</p>
          </div>
          <div class="h-line"></div>
          <div class="item">
            <p class="p1" style="font-weight:550">{{baseInfo.resourceTotal}}</p>
            <p class="p2">资源库</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="info">
          <p class>大学/单位：</p>
          <p class>
            <span>{{baseInfo.universityName}}</span>
          </p>
        </div>
        <div class="info">
          <p class>所在学院：</p>
          <p class="m10">
            <span>{{baseInfo.collegeName}}</span>
          </p>
        </div>
        <div class="info technical-title">
          <p class>职称：</p>
          <p class>
            <span>{{baseInfo.title}}</span>
          </p>
        </div>
        <a href="javascript:;" class="edit" @click="editFun">编辑资料</a>
      </div>
    </div>
    <!--基础信息 start -->

    <!--echart 图表 start-->
    <div class="chart-info">
      <div class="chart-title">
        <i class="icon-chart"></i>
        <span>各群组数据统计</span>
      </div>
      <TabBox :tabType="tabType" :tabCbFun="tabTypeCbFun" :list="tabBoxList"></TabBox>
      <div class="chart-box">
        <TeaChartBox :tabType="tabType" :chartsList="chartsList" />
      </div>
      <div class="chart-footer">
        <p class="title">
          班级反馈语
          <SelectBox
            style="width:224px;height:32px;margin-left:20px"
            :selVal="backChannels"
            :list="backChannelsList"
            :input="(e)=>inputChange(e,'select','backChannels')"
          ></SelectBox>
        </p>
        <p class="p1">{{feedback}}</p>
      </div>
    </div>
    <!--echart 图表 end-->

    <!--table start-->
    <div class="table">
      <div class="table-title">
        <div class="left">
          <i class="icon-book"></i>
          <span>各群组数据统计列表</span>
        </div>
        <div class="right">
          <SearchInput
            class="input"
            style="width:272px;height:32px"
            :value="searchVal"
            :placeHolder="'请输入'"
            :input="(e,type)=>inputChange(e,type,'searchVal')"
          ></SearchInput>
        </div>
      </div>
      <div class="table-box">
        <StuTableBox :tableList="tableList" :tabCbFun="tabCbFun"></StuTableBox>
        <PaginationItem :options="{page:page,limit:limit,total:total,cb:paginCb}" />
      </div>
    </div>
    <!--table end-->
  </div>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import TeaChartBox from "./TeaChartBox";
import SelectBox from "../teachers/selectBox";
import TabChange from "../groupStaAnalysis/tabChange";
import StuTableBox from "../student/StuTableBox";
import PaginationItem from "../group/paginationItem";
import SearchInput from "../teachers/searchInput";
import TabBox from "../groupStaAnalysis/tabBox";
import { tipsFail, cloneObj } from "../../utils/utils";
import {
  groStaGroInfVoList,
  groStaGroFeeBack,
  getGroStaTeaDetail
} from "../../service/teachersApi";
@Component({
  name: "TeaNcesCenter",
  components: {
    SelectBox,
    TabChange,
    StuTableBox,
    PaginationItem,
    SearchInput,
    TabBox,
    TeaChartBox
  }
})
export default class TeaNcesCenter extends Vue {
  searchVal = ""; //搜索框的值
  timer = null;
  tableTab = "全部"; //全部 已完成 未完成 切换

  page = 1; //当前页数
  limit = 10; //当前每页条数
  total = ""; //总条数

  tableList = []; //table数据
  backChannels = {
    val: "",
    label: ""
  }; //群选中项
  backChannelsList = [
    {
      val: "1",
      label: "课程一反馈语"
    },
    {
      val: "2",
      label: "课程二反馈语"
    }
  ]; //群可选项数组
  feedback = ""; //反馈语

  tabType = "成员数量"; //图表tab切换
  tabBoxList = ["人均使用时长", "课程计划数量", "成员数量"];

  baseInfo = {}; //老师基本信息
  timeData = {}; //人均使用时长
  courseData = {}; //课程计划数
  memberData = {}; //成员数量
  courseList = []; //标准课数组

  //编辑按钮点击事件
  @Emit editFun() {
    this.$router.push({
      path: "/personal"
    });
  }

  //图表 tab切换
  @Emit tabTypeCbFun(val) {
    if (this.tabType !== val) {
      this.tabType = val;
    }
  }

  get chartsList() {
    if (this.tabType === "成员数量") {
      return cloneObj(this.memberData);
    } else if (this.tabType === "课程计划数量") {
      return cloneObj(this.courseData);
    } else {
      return cloneObj(this.timeData);
    }
  }

  //下拉选择框改变事件
  @Emit inputChange(e, type, name) {
    if (type === "select") {
      if (this[name].val !== e.val) {
        this.groStaGroFeeBackFun(e.val);
      }
      this[name] = e;
    } else if ("input") {
      this[name] = e.target.value;
      if (this[name].val !== e.target.value) {
        this.setTimeFun();
      }
    }
  }

  //搜索框定时查询 延迟300毫秒
  @Emit setTimeFun() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.paginCb(1, this.limit);
    }, 300);
  }

  //table tab改变事件
  @Emit TabChangeFun(val) {
    this.tableTab = val;
    this.paginCb(1, this.limit);
  }

  //查看群详情 回调
  @Emit tabCbFun(code) {
    this.$router.push({
      path: "/group/list",
      query: {
        groupId: code
      }
    });
  }

  //分页回调
  @Emit paginCb(page, limit) {
    this.page = page;
    this.size = limit;
    let opt = {
      page: page,
      limit: limit,
      groupName: this.searchVal
    };
    this.groStaGroInfVoListFun(opt);
  }

  //获取echarts图表数据
  @Emit groChartFun() {
    groStaGroInfVoList({
      page: 1,
      limit: 100
    }).then(res => {
      if (res.code == "0") {
        /*"id": 161,//唯一性标识
            "delFlag": false,//删除标识
            "createDatetime": "2019-08-21 10:38:05",//创建时间
            "modifyDatetime": "2019-08-21 10:38:05",//修改时间
            "code": "1566355085741",//群code
            "invitationCode": "9abccf6c-9cde-4bfd-a8bc-7b3b00b8fdd9",//邀请code
            "name": "52143121",//群名称
            "approveJoinFlag": true,//是否需要审批
            "ownerId": 14,//归属人
            "ownerName": "321",//归属人
            "dismissFlag": false,//是否解散
            "totalStudent": 0,//总人数
            "totalCoursePlan": 0,//总课程计划数
            "averageCumulative": 0.0,//平均用时*/

        let memberData = {
          dataIPSxAxis: [],
          dataIPS: []
        }; //成员数量
        let courseData = {
          dataIPSxAxis: [],
          dataIPS: []
        }; //课程计划数
        let timeData = {
          dataIPSxAxis: [],
          dataIPS: []
        }; //人均使用时长

        let courseList = []; //标准课数组
        res.page.list.map(item => {
          memberData.dataIPSxAxis.push(item.name);
          memberData.dataIPS.push(item.totalStudent);

          courseData.dataIPSxAxis.push(item.name);
          courseData.dataIPS.push(item.totalCoursePlan);

          timeData.dataIPSxAxis.push(item.name);
          timeData.dataIPS.push(item.averageCumulative);

          courseList.push({
            val: item.id, //群id
            label: item.name
          });
        });

        this.memberData = cloneObj(memberData);
        this.courseData = cloneObj(courseData);
        this.timeData = cloneObj(timeData);
        this.backChannelsList = cloneObj(courseList);
        this.backChannels = cloneObj(courseList[0] || []);
        this.groStaGroFeeBackFun(courseList[0].val); //获取反馈语接口
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取课程完成情况列表接口
  @Emit groStaGroInfVoListFun(data) {
    groStaGroInfVoList(data).then(res => {
      if (res.code == "0") {
        let data = res.page;
        this.total = data.totalCount;
        this.tableList = cloneObj(data.list);
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取反馈语接口
  @Emit groStaGroFeeBackFun(id) {
    groStaGroFeeBack({
      groupId: id //群号
    }).then(res => {
      if (res.code == "0") {
        this.feedback = res.data;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取基本信息接口
  @Emit getGroStaTeaDetailFun() {
    getGroStaTeaDetail().then(res => {
      console.log(res);
      if (res.code == "0") {
        this.baseInfo = res.data;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    this.getGroStaTeaDetailFun(); //获取基本信息接口
    //this.groStaGroFeeBackFun();//获取反馈语接口
    this.groChartFun(); //获取chart不图表数据
    this.paginCb(1, this.limit); //获取底部table部分
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}

@mixin wh($url) {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url($url) no-repeat;
  background-size: 12px 12px;
}

.main-content {
  width: 1200px;
  margin: 0 auto;
  padding-top: 22px;
}
.top-title {
  display: flex;
  align-items: center;
  @include fontSet(22px, #000, 600);
  margin-bottom: 24px;
  .line {
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 23px;
    background: rgba(254, 120, 101, 1);
    border-radius: 3px;
    margin-right: 12px;
  }
}
.base-info {
  // box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 44px;
  background: rgba(251, 251, 251, 1);
  .left {
    display: flex;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .info {
      display: flex;
    }
    .person {
      margin-left: 16px;
      width: 176px;
      position: relative;
      .p1 {
        height: 28px;
        overflow: hidden;
        @include fontSet(20px, #333, 500);
        margin-bottom: 5px;
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin: 0 1px;
          margin-right: 5px;
        }
        span {
          padding: 1px 6px;
          @include fontSet(12px, #fe7865, 400);
          border-radius: 5px;
          border: 1px solid rgba(254, 120, 101, 1);
          line-height: 17px;
          text-align: center;
          position: absolute;
          top: 4px;
        }
        .boy {
          @include bg("../../assets/img/boyb.svg");
        }
        .girl {
          @include bg("../../assets/img/girlg.svg");
        }
      }
      .p2 {
        @include fontSet(16px, #999, 400);
      }
      .mark {
        display: inline-flex;
        align-items: center;
        @include fontSet(12px, #666, 400);
        border-radius: 5px;
        padding: 2px 8px;
        i {
          margin-right: 5px;
        }
      }
      .uncertified {
        border: 1px solid rgba(254, 120, 101, 1);
        cursor: pointer;
        .icon-del {
          @include wh("../../assets/teachers/icon-del.svg");
        }
      }
      .examine {
        border: 1px solid #ffc53d;
        .icon-time {
          @include wh("../../assets/teachers/icon-time.svg");
        }
      }
    }
    .item {
      text-align: center;
      width: 109px;
      .p1 {
        font-size: 22px;
        color: #fe7865;
        margin-bottom: 9px;
      }
      .p2 {
        @include fontSet(12px, #b3b3b3, 400);
      }
      .p4 {
        @include fontSet(14px, #666, 400);
        .icon-title {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../../assets/teachers/icon-title.svg") no-repeat;
          background-size: 20px 20px;
          vertical-align: middle;
        }
      }
    }
    .ml40 {
      // margin-left: 40px;
    }
    .ml16 {
      margin-left: 16px;
    }
    .h-line {
      width: 1px;
      height: 31px;
      background: #edeff2;
      margin-top: 15px;
    }
  }
  .right {
    display: flex;
    align-items: flex-start;
    .info {
      margin-left: 40px;
      p {
        display: flex;
        align-items: center;
        @include fontSet(12px, #b3b3b3, 400);
        line-height: 17px;
        span {
          display: inline-block;
          width: 120px;
          @include fontSet(14px, #666, 400);
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
        }
      }
      .mb10 {
        margin-bottom: 10px;
      }
    }
    .technical-title {
      width: 45px;
    }
    .edit {
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      border: 1px solid rgba(204, 204, 204, 1);
      @include fontSet(16px, #999, 500);
      margin-top: 7px;
      margin-left: 33px;
    }
  }
}

.chart-info {
  margin-bottom: 70px;
  .chart-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 29px;
    .icon-chart {
      display: inline-block;
      width: 40px;
      height: 40px;
      vertical-align: middle;
      background: url("../../assets/groupStaAnalysis/chart.svg") no-repeat;
      background-size: 100% auto;
      position: absolute;
      left: -9px;
      top: -5px;
    }
    span {
      @include fontSet(21px, #666, 600);
      margin-right: 12px;
      line-height: 29px;
      font-family: PingFangSC;
    }
  }
  .tab {
    li {
      float: right;
      min-width: 50px;
      text-align: center;
      @include fontSet(16px, #999, 400);
      margin-left: 56px;
      cursor: pointer;
    }
    .active {
      color: #333;
      .line {
        display: block;
        margin: 0 auto;
        height: 4px;
        background: rgba(254, 120, 101, 1);
        margin-top: 9px;
      }
    }
  }
  .chart-box {
    height: 364px;
  }
  .chart-footer {
    margin-top: 61px;
    @include fontSet(16px, #333, 500);
    .title {
      margin-bottom: 18px;
    }
    .p1 {
      width: 768px;
      line-height: 28px;
      @include fontSet(14px, #999, 400);
    }
  }
}

/* table  部分 */
.table {
  margin-bottom: 185px;
}
.table-title {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-left: 29px;
  .left {
    .icon-book {
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 40px;
      background: url("../../assets/groupStaAnalysis/book.svg") no-repeat;
      background-size: 100% auto;
      position: absolute;
      left: -9px;
      top: -5px;
    }
    span {
      @include fontSet(21px, #666, 600);
      margin-right: 12px;
      line-height: 29px;
      font-family: PingFangSC;
    }
  }
  .right {
    & /deep/ {
      input {
        padding: 5px 12px;
        padding-right: 28px;
      }
      .icon-search {
        right: 6px;
        top: 6px;
        left: auto;
      }
    }
  }
}

.chart-info /deep/ .chart-tab .active span {
  width: 28px;
}
</style>
