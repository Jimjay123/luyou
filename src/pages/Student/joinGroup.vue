/**

* Created by wangxin

* @date 2019/8/27 10:49 加入群组

*/
<template>
  <GroupDiaBox :width="410" :cbFun="cbFun">
    <div class="add">
      <p class="p1">{{showText}}</p>
      <p class="p2">
        <span class="whiteWord">{{showText}}</span>
        <span class="name1">{{item.ownerName||''}}</span>
        <span class="whiteWord">老师的群</span>
        <span class="name2">{{item.groupName||''}}</span>
      </p>
      <div class="btn">
        <a
          @click="()=>diaCbFun('cancel')"
          href="javascript:;"
          style="border:2px solid rgba(254,120,101,0.4);"
        >取消</a>
        <a @click="()=>diaCbFun('commit')" class="submit" href="javascript:;">确定</a>
      </div>
    </div>
  </GroupDiaBox>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import GroupDiaBox from "../group/groupDiaBox";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import { groInfOwnGroupList } from "../../service/groupApi";
import { State, Action, namespace } from "vuex-class";
const GroupMod = namespace("group");
@Component({
  name: "joinGroup",
  components: {
    GroupDiaBox
  }
})
export default class JoinGroup extends Vue {
  @Prop({
    default: null,
    required: false
  })
  diaCbFun; //弹框回调方法
  @Prop({
    default: "join",
    required: false
  })
  type; //type join 加群 applyJoin 申请加群

  @Prop({
    required: false,
    default: () => {
      return {
        approveJoinFlag: true,
        groupCode: "1566566973289",
        groupId: 163,
        groupName: "王老师的群1333",
        joinState: 0,
        ownerName: "1",
        serialNo: 100043
      };
    }
  })
  item;

  @Emit cbFun() {
    this.diaCbFun("dialog", false);
  }

  get showText() {
    if (this.type === "join") {
      return "确定加入";
    } else {
      return "确定申请加入";
    }
  }

  //获取老师相关群组列表
  @Emit groInfOwnGroupListFun() {
    groInfOwnGroupList({}).then(res => {
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
  padding-top: 28px;
  padding-bottom: 28px;
}
p {
  // display: flex;
  // align-items: center;
  @include fontSet(16px, #999, normal);
  span {
    @include fontSet(16px, #fe7865, 600);
    // margin-right: 8px;
  }
  margin-bottom: 27px;
}
.p1 {
  @include fontSet(20px, #333, 500);
  margin-bottom: 15px;
  font-family: PingFangSC;
  line-height: 28px;
  text-align: left;
}
.p2 {
  @include fontSet(20px, #333, 500);
  margin-bottom: 27px;
  font-family: PingFangSC;
  line-height: 28px;
  text-align: left;
  .whiteWord {
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #333;
    line-height: 24px;
  }
  .name1 {
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 400;
    line-height: 24px;
  }
  .name2 {
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 400;
    line-height: 24px;
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
