/**

* Created by wangxin

* @date 2019/8/6 20:26

*/
<template>
  <div class="group-info" v-Clickoutside="outClick">
    <div class="edit">
      <span @click="edit">编辑</span>
    </div>
    <div class="name">群名</div>
    <div class="name-val h56">{{selGroup.name}}</div>
    <div class="name">
      <span>入群方式</span>
      <span>群号</span>
    </div>
    <div class="name-val">
      <span>{{selGroup.approveJoinFlag?'需审批':'不审批'}}</span>
      <span>{{selGroup.serialNo}}</span>
    </div>
    <hr class="line" />
    <div class="title">
      <div v-if="!searchStatus">
        <div class="name">成员（{{selGroup.totalStudent}}人）</div>
        <div class="name" @click="search">
          <!-- <i class="el-icon-search"></i> -->
          <img src="../../assets/img/gray_search.svg" alt />
        </div>
      </div>
      <!-- 搜索图标 -->
      <div class="search-box clearfix" v-if="searchStatus">
        <InputBox
          v-Clickoutside="inputOutClick"
          class="input-box"
          :value="value"
          :placeHolder="'搜索'"
          :input="searchChange"
        ></InputBox>
        <!-- <i class="el-icon-search"></i> -->
        <img src="../../assets/img/red_search.svg" alt />
      </div>
    </div>
    <div class="members">
      <Vuescroll :ops="ops">
        <ul>
          <li
            class="item"
            @mouseover="mouseOver(item)"
            @mouseleave="mouseLeave"
            v-for="(item,index) in list"
            :key="index"
          >
            <div class="img">
              <img
                :src="item.avatar||(item.gender==1?require('../../assets/teachers/boy.svg'):require('../../assets/teachers/girls.svg'))"
                alt
              />
            </div>
            <span>{{item.memberName}}</span>
          </li>
        </ul>
      </Vuescroll>
    </div>
    <StudentInfoTips :top="top" :left="left" :info="info" :show="show"></StudentInfoTips>
    <hr class="line" />
    <div class="invite">
      <div @click="invite">
        <img :src="require('../../assets/group/invite.svg')" alt />
        邀请成员
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import InputBox from "./inputBox";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import Clickoutside from "element-ui/src/utils/clickoutside";
import StudentInfoTips from "./studentInfoTips";
import Vuescroll from "vuescroll";
import { State, Action, namespace } from "vuex-class";
const GroupMod = namespace("group");
@Component({
  name: "info",
  directives: {
    Clickoutside
  },
  components: {
    InputBox,
    Vuescroll,
    StudentInfoTips
  }
})
export default class Info extends Vue {
  @GroupMod.State("selGroup") selGroup; //当前选择的群组 默认第一个群组
  @GroupMod.Action("selGroupHandle") selGroupHandle; //当前选择的群组  action修改方法

  @GroupMod.State("groMemList") groMemList; //当前选择的群组 所有群成员list
  @GroupMod.Action("groMemListHandle") groMemListHandle; //当前选择的群组 所有群成员list  action修改方法

  value = ""; //搜索框输入值
  searchStatus = false; //当前搜索框状态  true 搜索状态  false展示状态
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

  top = "";
  left = "";
  show = false;
  info = {};

  get list() {
    let list = [];
    let val = this.value;
    if (val === "") {
      list = cloneObj(this.groMemList);
    } else {
      this.groMemList.map(item => {
        let str = item.memberName;
        if (str.search(val) >= 0) {
          list.push(cloneObj(item));
        }
      });
    }

    return list;
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

  //编辑按钮点击事件
  @Emit edit() {
    this.$router.push({
      path: "/group/list/edit"
    });
  }

  //搜索框改变事件
  @Emit searchChange(e) {
    this.value = e.target.value;
  }

  //点击搜索框以外区域 搜索框隐藏
  @Emit inputOutClick() {
    this.searchStatus = false;
    if (this.list.length <= 0) {
      this.value = "";
    }
  }

  //搜索按钮
  @Emit search() {
    this.searchStatus = true;
  }

  //邀请群成员
  @Emit invite() {
    this.$router.push({
      path: "/group/list/info/invite",
      query: { callback: "/group/list/info" }
    });
  }

  created() {}

  //当前组件销毁后
  destroyed() {}
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
  @include fontSet(14px, #666, 400);
  span {
    cursor: pointer;
  }
}
.name {
  @include fontSet(12px, rgba(0, 0, 0, 0.5), 500);
  margin-bottom: 2px;
  span {
    display: inline-block;
    width: 49%;
  }
}
.name-val {
  @include fontSet(13px, rgba(0, 0, 0, 0.85), 500);
  span {
    display: inline-block;
    width: 49%;
    color: #000000;
    font-size: 13px;
    line-height: 20px;
    font-family: PingFangSC;
  }
  margin-bottom: 10px;
}
.h56 {
  height: 56px;
  margin-bottom: 10px;
}
.line {
  background-color: #f5f5f5;
  height: 1px;
  border: none;
}
.title {
  margin-top: 10px;
  div {
    line-height: 17px;
    .name {
      display: inline-block;
      font-size: 12px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      line-height: 17px;
    }
    .name:last-child {
      float: right;
      height: 17px;
      line-height: 17px;
    }
    i {
      cursor: pointer;
    }
    img {
      cursor: pointer;
      float: right;
      color: #fc1f00;
      position: relative;
      top: 3px;
    }
  }

  .search-box {
    .input-box {
      width: 176px;
      height: 22px;
      float: left;
      font-size: 14px;
    }
    i {
      float: right;
      color: #fc1f00;
      position: relative;
      top: 3px;
    }
    img {
      float: right;
      color: #fc1f00;
      position: relative;
      top: 3px;
    }
  }
}
.members {
  padding: 12px 0;
  height: calc(100vh - 306px);
  overflow-y: auto;
  width: 100%;
}
.members::-webkit-scrollbar {
  width: 2px;
  height: 100px;
}
.members::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 1);
  background-color: #e8e8e8;
}
.item {
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
}
.item:last-child {
  margin-bottom: 0;
}

.invite {
  text-align: center;
  div {
    display: inline-flex;
    align-items: center;
    padding: 10px 0;
    line-height: 20px;
    vertical-align: middle;
    @include fontSet(14px, #fe7865, 400);
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
      margin-right: 7px;
    }
  }
}
</style>
