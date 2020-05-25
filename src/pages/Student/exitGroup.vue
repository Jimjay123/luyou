/**

* Created by wangxin

* @date 2019/8/26 20:21

*/
<template>
  <GroupDiaBox :width="410" :cbFun="cbFun">
    <div class="add">
      <p>
        <span class="gooutGroup">确定退出群</span>
      </p>
      <p style="margin-bottom: 0px;line-height:24px;">
        确定退出群
        <span class="name">{{selGroup.groupName}}</span>
      </p>
      <p style="margin-bottom: 27px;line-height:24px;">该操作不可逆，请谨慎操作</p>
      <div class="btn">
        <a @click="cancel" href="javascript:;" style="border:2px solid rgba(254,120,101,0.4);">取消</a>
        <a @click="submit" class="submit" href="javascript:;">确定</a>
      </div>
    </div>
  </GroupDiaBox>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import GroupDiaBox from "../group/groupDiaBox";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import {
  stuGroJoinGroList,
  stuGroPlaLeaStaList,
  stuGroPlaTotStatistic,
  groMemQuiGroup
} from "../../service/studentApi";
import { groMemGroMemList } from "../../service/groupApi";
import { State, Action, namespace } from "vuex-class";
const StudentMod = namespace("student");
@Component({
  name: "exitGroup",
  components: {
    GroupDiaBox
  }
})
export default class ExitGroup extends Vue {
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

  data = { name: "", id: "" };

  //取消按钮点击事件
  @Emit cancel() {
    this.$router.push({ path: "/student/studentList/stuInfo" });
  }

  //框回调方法
  @Emit cbFun() {
    this.$router.push({ path: "/student/studentList/stuInfo" });
  }

  //退出群组 --确定
  @Emit submit() {
    groMemQuiGroup({
      groupId: this.selGroup.groupId
    }).then(res => {
      if (res.code == "0") {
        this.$router.push({ path: "/student/studentList" });
        this.stuGroJoinGroListFun();
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
          this.selGroupHandle({ selGroup: {} });
          this.groupListHandle({ groupList: [] });
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
  padding-bottom: 20px;
}
p {
  display: flex;
  align-items: center;
  @include fontSet(16px, #999, normal);
  .gooutGroup {
    font-size: 20px;
    color: #333;
    font-weight: 600;
    margin-right: 8px;
    line-height: 28px;
    font-weight: 550;
  }
  span {
    @include fontSet(16px, #fe7865, 600);
    margin-right: 8px;
  }
  margin-bottom: 15px;
  .name {
    margin-left: 5px;
  }
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
