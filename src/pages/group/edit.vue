<template>
  <div class="group-info" v-Clickoutside="outClick">
    <div class="edit">
      <span @click="completed">完成</span>
    </div>
    <div class="name">群名</div>
    <div class="name-val h56">
      <textarea :value="groupName" @input="nameChange" cols="30" rows="10"></textarea>
    </div>
    <EditCheBox style="margin-bottom:22px" :value="checkVal" :list="checkList" :input="checkChange"></EditCheBox>
    <hr class="line" />
    <div class="title">
      <div>
        <div class="name">成员（{{selGroup.totalStudent}}人）</div>
      </div>
    </div>
    <div class="members">
      <Vuescroll :ops="ops">
        <ul>
          <li
            class="item"
            @mouseover="mouseOver(item)"
            @mouseleave="mouseLeave"
            v-for="(item,index) in groMemList"
            :key="index"
          >
            <div class="img">
              <img :src="item.avatar" alt />
            </div>
            <span>{{item.memberName}}</span>
            <span @click="del(item)" class="remove">移除</span>
            <!--群组提示信息-->
          </li>
        </ul>
      </Vuescroll>
      <StudentInfoTips :top="top" :left="left" :info="info" :show="show"></StudentInfoTips>
    </div>
    <hr class="line" />
    <div class="invite">
      <div @click="dismiss">解散群组</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import EditCheBox from "./editCheBox";
import StudentInfoTips from "./studentInfoTips";
import { groupInfo } from "../../service/groupApi";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import Vuescroll from "vuescroll";
import { State, Action, namespace } from "vuex-class";
const GroupMod = namespace("group");

@Component({
  name: "groupList",
  directives: {
    Clickoutside
  },
  components: {
    EditCheBox,
    StudentInfoTips,
    Vuescroll
  }
})
export default class GroupList extends Vue {
  @GroupMod.State("groupList") groupList; //老师端群组列表数据
  @GroupMod.Action("groupListHandle") groupListHandle; //老师端群组列表数据  action修改方法

  @GroupMod.State("selGroup") selGroup; //当前选择的群组 默认第一个群组
  @GroupMod.Action("selGroupHandle") selGroupHandle; //当前选择的群组  action修改方法

  @GroupMod.State("groMemList") groMemList; //当前选择的群组 所有群成员list
  @GroupMod.Action("groMemListHandle") groMemListHandle; //当前选择的群组 所有群成员list  action修改方法

  groupName = ""; //群名称
  id = ""; //群ID
  checkVal = {
    val: true,
    label: "入群需审批"
  }; //单选框选中的值
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

  show = false;
  top = "";
  left = "";
  info = {};

  //群名称输入框改变事件
  @Emit nameChange() {
    let val = event.target.value;
    this.groupName = val;
  }

  // approveJoinFlag
  @Emit checkExist(val) {
    let value = true,
      label = "入群需审批";
    if (val === false) {
      value = false;
      label = "入群不审批";
    }
    return {
      val: value,
      label: label
    };
  }

  //成员鼠标悬浮事件
  @Emit mouseOver(item) {
    let data = null;
    let el = event.target;
    if (el.className === "item") {
      data = el.getBoundingClientRect();
    } else {
      if (el.parentNode.nodeName === "LI") {
        data = el.parentNode.getBoundingClientRect();
      } else if (el.parentNode.parentNode.nodeName === "LI") {
        data = el.parentNode.parentNode.getBoundingClientRect();
      }
    }
    this.show = true;
    this.top = data.y + data.height / 2 - 80;
    this.left = data.x - 218 - 20;
    this.info = cloneObj(item);
  }

  @Emit mouseLeave() {
    this.show = false;
  }

  //单选框改变事件
  @Emit checkChange(item) {
    this.checkVal = item;
  }

  //点击当前页面意外的其他区域跳转页面
  @Emit outClick() {
    let id = event.target.id;
    if (id == "groupRecall") {
      return;
    }
    this.$router.push({
      path: "/group/list"
    });
  }

  //完成按钮点击事件
  @Emit completed() {
    groupInfo({
      id: this.selGroup.id, //群ID
      name: this.groupName, //群名称
      approveJoinFlag: this.checkVal.val //入群是否要审批
    }).then(res => {
      if (res.code == "0") {
        this.sucChaGroInfo();
        this.$router.push({
          path: "/group/list/info"
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //编辑成功后修改群信息
  @Emit sucChaGroInfo() {
    let selGroup = this.selGroup;
    let groupList = this.groupList;
    selGroup.name = this.groupName;
    selGroup.approveJoinFlag = this.checkVal.val;
    this.selGroupHandle({ selGroup: selGroup }); //更新群信息
    let index = groupList.findIndex(item => item.id === selGroup.id);
    groupList[index] = cloneObj(selGroup);
  }

  //删除按钮点击事件
  @Emit del(item) {
    this.$router.push({
      path: "/group/list/edit/delete",
      query: {
        callback: "/group/list/edit",
        data: cloneObj(item)
      }
    });
  }

  //解散群组
  @Emit dismiss() {
    this.$router.push({
      path: "/group/list/edit/dismiss",
      query: {
        callback: "/group/list/edit",
        selGroup: cloneObj(this.selGroup) //群ID
      }
    });
  }

  created() {
    this.groupName = this.selGroup.name;
    this.id = this.selGroup.id;
    this.checkVal = this.checkExist(this.selGroup.approveJoinFlag);
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.group-info {
  position: absolute;
  top: 0;
  right: 0;
  width: 230px;
  height: 100vh;
  box-shadow: -2px 0px 6px 0px rgba(0, 0, 0, 0.06);
  background: #fff;
  z-index: 18;
  padding: 0 16px;
}

.edit {
  height: 40px;
  text-align: right;
  line-height: 40px;
  @include fontSet(14px, #fe7865, 400);
  span {
    cursor: pointer;
  }
}

.name {
  @include fontSet(12px, rgba(0, 0, 0, 0.5), 500);
  margin-bottom: 1px;
  span {
    display: inline-block;
    width: 50%;
  }
}

.name-val {
  @include fontSet(13px, rgba(0, 0, 0, 0.85), 500);
  margin-bottom: 22px;
  span {
    display: inline-block;
    width: 50%;
  }
  textarea {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 5px 6px;
    background: #f7f7f7;
    @include fontSet(13px, #999, 400);
    background: rgba(247, 247, 247, 1);
    border-radius: 4px;
    border: 1px solid rgba(254, 120, 101, 0);
  }
  textarea:hover {
    border: 1px solid rgba(254, 120, 101, 0.2);
  }
  textarea:focus {
    box-shadow: 0px 0px 0px 4px rgba(254, 120, 101, 0.2);
    border: 1px solid rgba(255, 163, 158, 1);
  }
}

.h56 {
  height: 56px;
}

.line {
  background-color: #f5f5f5;
  height: 1px;
  border: none;
}

.title {
  margin-top: 10px;
  .name {
    display: inline-block;
    @include fontSet(12px, rgba(0, 0, 0, 1), 500);
  }
}

.members {
  padding: 12px 0;
  height: calc(100vh - 306px);
  overflow-y: auto;
  width: 100%;
  s ul {
    width: 198px;
  }
}

.item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .img {
    width: 28px;
    height: 28px;
    margin-right: 14px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  span {
    @include fontSet(14px, #333, 500);
  }
  .remove {
    float: right;
    @include fontSet(12px, #a6a6a6, 400);
    margin-left: auto;
    cursor: pointer;
  }
}
.item:last-child {
  margin-bottom: 0;
}

.invite {
  text-align: center;
  cursor: pointer;
  div {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(254, 120, 101, 1);
    line-height: 20px;
    padding: 12px 0;
  }
}
</style>
