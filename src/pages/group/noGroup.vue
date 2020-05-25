/**

* Created by wangxin

* @date 2019/8/26 21:01

*/
<template>
  <div class="no-group">
    <div class="centered">
      <div class="nothing" v-if="selectShow==='noGroup'">
        <img :src="require('../../assets/student/no-group.svg')" alt />
        <p class="p1">您还未创建群呢</p>
        <p class="p2">快去创建一个群吧～</p>
      </div>

      <div class="button">
        <a href="javascript:;" @click="addGroup">创建群</a>
      </div>
    </div>

    <div class="cards1" v-if="cardaz">
      <div class="h">
        <h3>创建群</h3>
        <span>用以发布您的课程计划</span>
      </div>
      <el-input v-model="name" placeholder="群名称，不超过30字符，如：社工-19届-3班" label-width="80px"></el-input>
      <CheckBox style="margin-left:32px;" :value="checkVal" :list="checkList" :input="checkChange"></CheckBox>

      <el-row>
        <el-button>
          <span @click="AddInfo">确定</span>
        </el-button>
        <el-button v-on:click="handleClickss1(cardaz)">
          <span>取消</span>
        </el-button>
      </el-row>
    </div>

    <footer class="footer">© 2019 上海积途信息科技有限公司. All Rights Reserved.</footer>
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import {
  stuGroSeaGroup,
  stuGroJoinGroup,
  stuGroJoinGroList,
  stuGroPlaLeaStaList,
  stuGroPlaTotStatistic,
  groMemQuiGroup
} from "../../service/studentApi";
import {
  groMemGroMemList,
  groupInfoAdd,
  groInfOwnGroupList
} from "../../service/groupApi";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import CheckBox from "./checkBox";

const Userinfo = namespace("userinfo");
const StudentMod = namespace("student");
@Component({
  name: "noGroup",
  components: {
    CheckBox
  },
  directives: {
    Clickoutside
  }
})
export default class NoGroup extends Vue {
  @Userinfo.State("dialog") dialog; //老师端群组列表数据
  @Userinfo.Action("dialogHandle") dialogHandle; //老师端群组列表数据  action修改方法

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

  selectShow = "noGroup";
  inputVal = ""; //输入框内容
  timer = null; //定时器
  type = ""; //当前点击选中的类型 join 加入 applyJoin 申请加入
  diaShow = false; //弹框显示隐藏

  list = []; //搜索结果数组

  diaItem = {}; //弹框数据

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
  @Emit addGroup() {
    this.cardaz = true;
  }

  @Emit handleClickss1() {
    this.cardaz = !this.cardaz;
  }
  @Emit AddInfo() {
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
  created() {
    groInfOwnGroupList({}).then(res => {
      if (res.code == "0") {
        this.showList = res.groupList;
      } else {
        tipsFail(res.msg);
      }
    });
  }
  showList = "";
  /**
   * selectShow
   * 1，没有群 进来提醒搜索加群 noGroup
   * 2，搜索无结果  提醒没有结果 searchNull
   * 3，搜索有结果  显示下拉结果列表 showList
   *
   * */

  @Emit showAdd(item) {
    let joinState = item.joinState,
      approveJoinFlag = item.approveJoinFlag;
    if (joinState === 0) {
      //未加入
      if (approveJoinFlag) {
        //需要审核
        return 3;
      } else {
        //不需要审核
        return 4;
      }
    } else if (joinState === 1) {
      //已申请加入
      return 1;
    } else if (joinState === 2) {
      //已加入
      return 2;
    }
  }

  //确认加群弹框回调方法
  @Emit diaCbFun(type, val) {
    if (type === "dialog") {
      //弹框关闭回调
      this.diaShow = false;
    } else if (type === "cancel") {
      //取消按钮点击事件
      this.diaShow = false;
    } else if (type === "commit") {
      //提交按钮点击事件
      this.stuGroJoinGroupFun();
    } else if (type === "join") {
      //申请
    } else {
      //applyJoin  申请加群
    }
  }

  //输入框改变事件
  @Emit inputFun(e) {
    this.inputVal = e.target.value;
    this.setTimeFun();
  }

  //输入框失去焦点
  @Emit focusFun() {
    this.stuGroSeaGroupFun();
  }

  @Emit setTimeFun() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      //调用接口获取结果
      this.stuGroSeaGroupFun();
    }, 300);
  }

  //点击元素以外其他区域
  @Emit clickOut() {
    let _this = event.target;
    if (
      $(_this).hasClass("dialog-bg") ||
      $(_this).parents(".dialog-bg").length > 0
    ) {
      return;
    }
    this.selectShow = "noGroup";
  }

  //加入群组点击事件
  @Emit joinFun(item, type) {
    this.type = type;
    this.diaShow = true;
    this.diaItem = item;
  }

  //搜索接口
  @Emit stuGroSeaGroupFun() {
    stuGroSeaGroup({ serialNo: this.inputVal }).then(res => {
      if (res.code == "0") {
        let list = res.list || [];
        let len = list.length;
        if (len > 0) {
          //搜索结果不为空
          this.selectShow = "showList";
          this.list = list;
        } else {
          //为空
          this.list = [];
          this.selectShow = "searchNull";
        }
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //加群接口
  @Emit stuGroJoinGroupFun() {
    stuGroJoinGroup({
      groupId: this.diaItem.groupId
    }).then(res => {
      if (res.code == "0") {
        this.diaShow = false;
        this.dialogHandle({
          show: true,
          type: "success",
          content: "恭喜你，申请提交成功",
          time: 2000,
          hasMask: false
        });
        if (this.type === "join") {
          //加群--
          this.stuGroJoinGroListFun();
        } else {
          //申请加入
          this.stuGroSeaGroupFun();
        }
      } else {
        tipsFail(res.msg);
      }
    });
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

  //获取群组相关群组列表
  @Emit stuGroJoinGroListFun() {
    stuGroJoinGroList({}).then(res => {
      if (res.code == "0") {
        if (res.list.length <= 0) {
          return;
        }
        // 当前默认选中一个群
        let group = res.list[0];
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
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

// .no-group {
//   text-align: center;
// }

.search {
  display: inline-block;
  margin-top: 70px;
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
  border-radius: 26px;
  input {
    width: 432px;
    height: 52px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
    border-radius: 26px;
    border: none;
    padding-left: 55px;
    padding-right: 20px;
    font-size: 18px;
    background: url("../../assets/student/search.svg") 10px 6px no-repeat;
  }
  input::placeholder {
    color: #ccc;
    font-size: 18px;
  }
}

.group {
  max-height: 378px;
  width: 432px;
  overflow-y: auto;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 16px;
    .title {
      font-size: 18px;
      width: 32px;
      height: 32px;
      line-height: 31px;
      text-align: center;
      border: 1px solid rgba(254, 120, 101, 0.25);
      border-radius: 50%;
      margin-right: 10px;
      font-weight: 500;
      color: #fe7865;
    }
    .center {
      width: 290px;
      text-align: left;
      p {
        @include fontSet(16px, #333, 400);
      }
      div {
        @include fontSet(12px, #b3b3b3, 400);
        span {
          margin-right: 26px;
        }
      }
    }
    a {
      width: 68px;
      height: 22px;
      text-align: center;
      line-height: 20px;
      background: rgba(255, 255, 255, 1);
      border-radius: 11px;
      opacity: 0.4;
      border: 1px solid rgba(254, 120, 101, 1);
      @include fontSet(12px, #fe7865, 400);
    }
    .gray {
      background: rgba(153, 153, 153, 0.2);
      color: rgba(0, 0, 0, 0.25);
      border: none;
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
      // box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
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
