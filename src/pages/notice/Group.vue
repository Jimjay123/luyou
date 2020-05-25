<template>
  <div class="group-notice">
    <header>
      <div class="group-notice-title">入群申请</div>
      <el-select
        v-model="selectValue"
        placeholder="请选择"
        class="notice-group-selector"
        @change="handleGroupSelect"
        @focus="setMinWidth"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :style="{'min-width': minWidth + 2 + 'px'}"
        ></el-option>
      </el-select>
    </header>
    <div v-if="isBatch" class="action-wrap" key="action-wrap-key">
      <div>
        <el-button round class="batch-btn pass-all gradient" @click="handleSelects(1)">全部同意</el-button>
        <el-button round class="batch-btn reject-all" @click="handleSelects(2)">全部拒绝</el-button>
      </div>
      <el-button round class="batch-btn complete" @click="toggleBatch">完成</el-button>
    </div>
    <div v-else class="menu-wrap" key="menu-wrap-key">
      <el-menu
        :default-active="menuIndex"
        class="el-menu-type"
        mode="horizontal"
        @select="handleMenuSelect"
      >
        <el-menu-item index="1" v-on:click="toggleFlag(-1)">
          <span class="item-value">全部</span>
          <span class="bottom-line"></span>
        </el-menu-item>
        <el-menu-item index="2" v-on:click="toggleFlag(0)">
          <span class="item-value">待审核</span>
          <span class="bottom-line"></span>
        </el-menu-item>
        <el-menu-item index="3" v-on:click="toggleFlag(1)">
          <span class="item-value">已通过</span>
          <span class="bottom-line"></span>
        </el-menu-item>
        <el-menu-item index="4" v-on:click="toggleFlag(2)">
          <span class="item-value">已拒绝</span>
          <span class="bottom-line"></span>
        </el-menu-item>
      </el-menu>
      <el-button round class="batch-btn start-batch" @click="toggleBatch">批量操作</el-button>
    </div>
    <div class="notice-list">
      <div class="notice-list-box">
        <Vuescroll :ops="ops">
          <div
            v-for="(item,index) in list"
            :key="item.groupMemberRelId || index"
            class="notice-row"
          >
            <div :class="['base-info',{'show-select':isBatch}]">
              <el-checkbox
                v-if="isBatch"
                :value="getChecked(item.groupMemberRelId)"
                class="row-checkbox"
                @change="checked(item.groupMemberRelId)"
                :disabled="hasResult(item.agreeFlag)"
              ></el-checkbox>
              <img :src="item.avatar" class="user-profile" />
              <div>
                <div class="row-top user-info">
                  <div class="user-name">{{item.memberName}}</div>
                  <img v-if="item.gender==2" class="user-gender" src="../../assets/group/boy.svg" />
                  <img v-else class="user-gender" src="../../assets/group/girl.svg" />
                  <div class="user-grade">{{item.grade}}</div>
                </div>
                <div class="row-botttom user-no">学号：{{item.studentNo}}</div>
              </div>
            </div>
            <div class="college-info">
              <div class="row-top">
                <span class="name">学院</span>
                <span class="value">{{item.collegeName}}</span>
              </div>
              <div class="row-bottom clearfix">
                <span class="name" style="float: left;">专业</span>
                <span class="value" style="float: left;">{{item.majorName}}</span>
              </div>
            </div>
            <div class="class-info">
              <div class="row-top">
                <span class="name">所在班级</span>
                <span class="value">{{item.clazz}}</span>
              </div>
              <div class="row-bottom clearfix">
                <span class="name" style="float: left;">申请加入</span>
                <span
                  class="value apply-target"
                  style="float: left;width: 200px;"
                >{{item.groupName}}</span>
              </div>
            </div>
            <div class="action-group">
              <div
                v-if="hasResult(item.agreeFlag)"
                class="result-status"
              >{{getResult(item.agreeFlag)}}</div>
              <div v-else>
                <el-button
                  round
                  class="batch-btn reject"
                  @click="handleSelect(item.groupMemberRelId,2)"
                >拒绝</el-button>
                <el-button
                  round
                  class="batch-btn pass gradient"
                  @click="handleSelect(item.groupMemberRelId,1)"
                >同意</el-button>
              </div>
            </div>
          </div>
          <Pagination :options="{page:page,limit:limit,total:total,cb:paginCb}"></Pagination>
        </Vuescroll>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { tipsFail } from "../../utils/utils";
import {
  groMemApplyList,
  groMemApproveSingle,
  groMemApproveBatch,
  groInfOwnGroupList
} from "../../service/groupApi";
import Pagination from "../group/paginationItem";
import Vuescroll from "vuescroll";
import { State, Action, namespace } from "vuex-class";
const GroupMod = namespace("group");

@Component({
  name: "groupNotice",
  components: { Vuescroll, Pagination }
})
export default class GroupNotice extends Vue {
  @GroupMod.State("agreeFlagText") agreeFlagText; //老师端群组列表数据
  @GroupMod.Action("agreeFlagTextHandle") agreeFlagTextHandle; //老师端群组列表数据  action修改方法

  options = [];
  list = [];
  page = 1;
  limit = 10;
  total = 0;
  selectValue = "全部群组";
  menuIndex = "1";
  isBatch = false; //是否开启批量操作
  selects = []; //选中的申请 ids
  groupId = -1;
  agreeFlag = -1;
  minWidth = 0;
  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
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

  created() {
    this.paginCb(1, 10, {});
    groInfOwnGroupList()
      .then(res => {
        if (res.code == "0") {
          const groups = res.groupList || [];
          this.options = [{ label: "全部群组", value: -1 }].concat(
            groups.map(g => ({ label: g.name, value: g.id }))
          );
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        // 测试阶段调用
        this.options = [
          {
            value: -1,
            label: "全部群组"
          },
          {
            value: "id1",
            label: "微电子与固体电子1505班"
          },
          {
            value: "id2",
            label: "视觉传达1104班"
          },
          {
            value: "id3",
            label: "环境艺术1302班"
          }
        ];
      });
  }

  @Emit getMockData() {
    return Array(10)
      .fill(0)
      .map((_, index) => ({
        groupMemberRelId: "notice-groupMemberRelId-" + index + 1,
        avatar: require("../../assets/img/touxiang.svg"),
        memberName: "张三" + index,
        collegeName: "艺术学院",
        clazz: "环艺1403班",
        studentNo: "201939203",
        groupName: "视觉传达1054班",
        agreeFlag: 0,
        grade: "大一",
        majorName: "环境艺术设计",
        gender: index % 3 === 0 ? 1 : 2
      }));
  }

  @Emit getData(opt) {
    groMemApplyList(opt)
      .then(res => {
        console.log(res);
        if (res.code == "0") {
          const list = res.page.list;
          this.list = list;
          console.log(this.list);
          this.total = res.page.totalCount;
          this.agreeFlag = list.agreeFlag;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        this.list = this.getMockData();
        this.total = 10;
      });
  }
  @Emit paginCb(page, size, options = {}) {
    this.page = page;
    this.limit = size;
    const opt = {
      page: page,
      limit: size
    };
    if (this.groupId !== -1) opt.groupId = this.groupId;
    if (this.flag !== -1) opt.agreeFlag = this.flag;
    this.getData(opt);
  }

  @Emit hasResult(agreeFlag) {
    return agreeFlag === 1 || agreeFlag === 2;
  }

  @Emit getResult(agreeFlag) {
    return agreeFlag === 1 ? "已通过" : "已拒绝";
  }

  @Emit getChecked(groupMemberRelId) {
    return this.selects.indexOf(groupMemberRelId) !== -1;
  }

  @Emit checked(groupMemberRelId) {
    const index = this.selects.indexOf(groupMemberRelId);
    index === -1
      ? this.selects.push(groupMemberRelId)
      : this.selects.splice(index, 1);
  }

  @Emit handleSelect(groupMemberRelId, agreeFlag, isBatch) {
    const handleFunc = () => {
      const notice = this.list.find(
        n => n.groupMemberRelId === groupMemberRelId
      );
      notice.agreeFlag = agreeFlag;
      if (isBatch) return;
      const index = this.selects.indexOf(groupMemberRelId);
      if (index !== -1) this.selects.splice(index, 1);
    };
    if (isBatch) {
      handleFunc();
      return;
    }
    const opt = {
      groupMemberRelId,
      agreeFlag
    };
    groMemApproveSingle(opt)
      .then(res => {
        console.log(res);
        if (res.code == "0") {
          handleFunc();
          groMemApplyList({
            page: 1,
            limit: 1000,
            agreeFlag: 0
          })
            .then(res => {
              console.log(res);
              if (res.code == "0") {
                const list = res.page.list;
                this.agreeFlagTextHandle({ agreeFlagText: list });
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              this.list = this.getMockData();
              this.total = 10;
            });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        // 测试阶段调用
        handleFunc();
      });
  }

  @Emit handleSelects(agreeFlag) {
    const handleFunc = () => {
      this.selects.map(s => this.handleSelect(s, agreeFlag, true));
      this.selects = [];
    };
    const opt = {
      groupMemberRelIds: this.selects.join(","),
      agreeFlag
    };
    groMemApproveBatch(opt)
      .then(res => {
        console.log(res);
        if (res.code == "0") {
          handleFunc();
          groMemApplyList({
            page: 1,
            limit: 1000,
            agreeFlag: 0
          })
            .then(res => {
              console.log(res);
              if (res.code == "0") {
                const list = res.page.list;
                this.agreeFlagTextHandle({ agreeFlagText: list });
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              this.list = this.getMockData();
              this.total = 10;
            });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        // 测试阶段调用
        handleFunc();
      });
  }

  @Emit handleMenuSelect(index) {
    this.menuIndex = index;
  }

  @Emit toggleFlag(flag) {
    console.log("filter flag", flag);
    const opt = {
      page: this.page || 1,
      limit: 10
    };
    if (this.groupId !== -1) opt.groupId = this.groupId;
    if (flag !== -1) opt.agreeFlag = flag;
    this.agreeFlag = flag;
    this.getData(opt);
  }
  @Emit setMinWidth(val) {
    this.minWidth = val.srcElement.clientWidth;
  }

  @Emit handleGroupSelect(id) {
    console.log("select group id", id);
    const opt = {
      page: 1,
      limit: 10
    };
    if (id !== -1) opt.groupId = id;
    this.agreeFlag = -1;
    this.menuIndex = "1";
    this.groupId = id;
    this.getData(opt);
  }

  @Emit toggleBatch() {
    this.isBatch = !this.isBatch;
    if (!this.isBatch) this.selects = [];
  }
}
</script>

<style lang="scss">
.notice-group-selector .el-input__inner {
  border: none;
  background: transparent;
  font-size: 16px;
}
.el-select-dropdown__list .el-select-dropdown__item {
  color: #666;
  &.selected {
    color: #fe7865;
  }
}
</style>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.group-notice {
  @include relative();
  font-family: PingFangSC;
  header {
    display: flex;
    align-items: center;
    height: 36px;
    line-height: 36px;
    margin-bottom: 11px;
    .group-notice-title {
      color: #333;
      font-weight: 600;
      margin-left: 4px;
      margin-right: 40px;
      font-size: 20px;
    }
    /deep/ .notice-group-selector {
      // min-width: ;
    }
  }
  .batch-btn {
    width: 84px;
    height: 26px;
    line-height: 24px;
    padding: 0;
    color: #999;
    background: #fff;
    font-weight: normal;
    font-size: 12px;
    border-color: #ccc;
    &.gradient {
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      color: #fff;
      border: none;
      line-height: 26px;
    }
    &.pass-all {
      float: left;
      color: #fcfcfc;
    }
    &.reject-all {
      float: left;
      color: #666;
    }
    &.complete {
      font-size: 14px;
      border-color: rgba(0, 0, 0, 0.15);
    }
    &.pass,
    &.reject {
      width: 55px;
    }
  }
  .action-wrap,
  .menu-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    margin: 16px 4px 16px;
  }
  .el-menu-type {
    border-bottom: none;
    background: transparent;
    .el-menu-item {
      @include relative();
      border-bottom: none;
      height: 36px;
      line-height: 36px;
      padding: 0 12px;
      .item-value {
        color: #999;
        font-size: 14px;
        font-weight: normal;
      }
      .bottom-line {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 3px;
        background: transparent;
        width: 24px;
        border-radius: 1.5px;
      }
      &:hover,
      &.is-active {
        background: transparent;
      }
      &.is-active {
        border-bottom: none;
        .item-value {
          color: #fe7865;
          font-weight: 600;
        }
        .bottom-line {
          background: #fe7865;
        }
      }
    }
  }
  .notice-list-box {
    height: calc(100vh - 180px);
  }
  .notice-list .notice-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.2);
    border-radius: 10px;
    margin: 4px 4px 16px;
    padding: 0 20px 0 12px;
    .user-profile {
      width: 42px;
      height: 42px;
      object-fit: cover;
      border-radius: 21px;
      margin-right: 18px;
    }
    .base-info {
      display: flex;
      align-items: center;
      min-width: 20%;
      padding-left: 8px;
      &.show-select {
        padding-left: 0;
      }
      .row-checkbox {
        margin-right: 10px;
      }
      .user-name {
        color: #333;
        font-size: 16px;
        font-weight: 500;
      }
      .user-gender {
        padding: 0 8px;
        height: 16px;
      }
      .user-grade {
        display: inline-block;
        padding: 0 7px;
        border-radius: 4px;
        line-height: 20px;
        color: #fe7865;
        border: 1px solid #fe7865;
        font-size: 12px;
        transform: scale(0.83);
      }
    }
    .college-info,
    .class-info {
      min-width: 30%;
    }
    .action-group {
      width: 130px;
      text-align: center;
      .result-status {
        color: #999;
        font-size: 12px;
        font-weight: normal;
        line-height: 17px;
      }
    }
    .row-top {
      display: flex;
      margin-bottom: 5px;
      line-height: 17px;
      &.user-info {
        align-items: center;
      }
    }
    .row-bottom {
      line-height: 20px;
      width: 278px;
      .name,
      .value {
        line-height: 20px;
        display: inline-block;
        vertical-align: top;
      }
    }
    .user-no,
    .name {
      color: #999;
      font-size: 12px;
      font-weight: normal;
      line-height: 17px;
    }
    .value {
      color: #666;
      font-size: 12px;
      font-weight: 500;
      margin-left: 14px;
      &.apply-target {
        font-size: 14px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
