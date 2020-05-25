<template>
  <GroupDiaBox :width="410">
    <div class="add">
      <p class="sureJs">
        <span>确定解散群</span>
      </p>
      <p class="sureMsg">
        <span class="one">确定解散群</span>
        <span class="name">{{data.name}}</span>
      </p>
      <p class="sureWord">该操作不可逆，请谨慎操作</p>
      <div class="btn">
        <a @click="cancel" href="javascript:;" class="cancel">取消</a>
        <a @click="submit" class="submit" href="javascript:;">确认</a>
      </div>
    </div>
  </GroupDiaBox>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import GroupDiaBox from "./groupDiaBox";
import InputBox from "./inputBox";
import CheckBox from "./checkBox";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import {
  groInfDisGro,
  groInfOwnGroupList,
  groCouPlaCouPlaCouPlaSta,
  groCouPlaCoursePlanList,
  groMemGroMemList
} from "../../service/groupApi";
import { State, Action, namespace } from "vuex-class";
const GroupMod = namespace("group");
@Component({
  name: "add",
  components: {
    GroupDiaBox,
    InputBox,
    CheckBox
  }
})
export default class Add extends Vue {
  @GroupMod.State("groupList") groupList; //老师端群组列表数据
  @GroupMod.Action("groupListHandle") groupListHandle; //老师端群组列表数据  action修改方法

  @GroupMod.State("selGroup") selGroup; //当前选择的群组 默认第一个群组
  @GroupMod.Action("selGroupHandle") selGroupHandle; //当前选择的群组  action修改方法

  @GroupMod.State("isNotice") isNotice; //查看入群申请
  @GroupMod.Action("selNoticeHandle") selNoticeHandle; //查看入群申请  action修改方法

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

  data = { name: "", id: "" };
  //input 改变事件
  @Emit inputChange(e) {
    this.value = e.target.value;
  }

  //单选框改变事件
  @Emit checkChange(item) {
    this.checkVal = item;
  }

  //取消按钮点击事件
  @Emit cancel() {
    this.$router.push({ path: "/group/list/edit" });
  }

  //确定按钮点击事件
  @Emit submit() {
    groInfDisGro({
      id: this.selGroup.id
    }).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.$router.push({ path: "/group/list" });
        this.groInfOwnGroupListFun();
      } else {
        tipsFail(res.msg);
      }
    });
  }

  @Emit paginCb(page, size, options = {}) {
    console.log(page);
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
  }

  //获取老师相关群组列表
  @Emit groInfOwnGroupListFun() {
    groInfOwnGroupList({}).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.groupListHandle({ groupList: res.groupList });
        this.selGroupHandle({ selGroup: res.groupList[0] });

        let id = res.groupList[0].id;
        this.groCouPlaCouPlaCouPlaStaFun(id); //获取群统计信息
        this.paginCb(1, this.limit, { tabType: "all", groupId: id });
        this.groMemGroMemListFun(id); //获取群成员列表
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取群课程统计接口
  @Emit groCouPlaCouPlaCouPlaStaFun(id) {
    groCouPlaCouPlaCouPlaSta({ groupId: id }).then(res => {
      if (res.code == "0") {
        this.groCenInfoHandle({ groCenInfo: res.data });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取当前选中项群的所有课程
  @Emit groCouPlaCoursePlanListFun(data) {
    groCouPlaCoursePlanList(data).then(res => {
      if (res.code == "0") {
        this.groCouListHandle({ groCouList: res.page.list });
        this.totalHandle({ total: res.page.totalCount });
      } else {
        tipsFail(res.msg);
      }
    });
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
    this.data = this.$route.query.selGroup;
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.add {
  padding-top: 26px;
  padding-bottom: 28px;
}
p {
  // display: flex;
  align-items: center;
  @include fontSet(16px, #999, normal);
  span {
    @include fontSet(20px, #333333, 550);
    line-height: 28px;
    margin-right: 8px;
  }
}
.sureJs {
  margin-bottom: 15px;
}
.sureMsg {
  .one {
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    margin-right: 0;
  }

  .name {
    margin-left: 5px;
    line-height: 24px;
    font-size: 16px;
    color: #fe7865;
    font-weight: 500;
  }
}
.sureWord {
  margin-bottom: 27px;
}
input {
  width: 100%;
}
.btn {
  text-align: right;
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 36px;
    font-size: 16px;
    font-weight: 500;
    color: #fe7865;
    border: 2px solid rgba(254, 120, 101, 1);
    border-radius: 18px;
  }
  .cancel {
    border: 2px solid rgba(254, 120, 101, 0.4);
    // &:hover {
    //   border: 2px solid rgba(254, 120, 101, 1);
    // }
  }
  .submit {
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border: none;
    color: #fff;
    margin-left: 24px;
  }
}
</style>
