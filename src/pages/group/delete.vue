/**

* Created by wangxin

* @date 2019/8/7 15:58

*/
<template>
  <GroupDiaBox :width="410">
    <div class="add">
      <p class="sureYc">
        <span>确定移除</span>
      </p>
      <p class="sureWord">
        是否确认移除成员
        <span class="name">{{data.memberName}}</span>
      </p>
      <div class="btn">
        <a @click="cancel" href="javascript:;" class="cancel">取消</a>
        <a @click="submit" class="submit" href="javascript:;">确定</a>
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
import { groMemRemMem, groMemGroMemList } from "../../service/groupApi";
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
  @GroupMod.Action("groMemListHandle") groMemListHandle; //当前选择的群组 所有群成员list  action修改方法
  @GroupMod.Action("delStuIdHandle") delStuIdHandle; //
  data = { id: "", memberName: "" };
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
    let data = this.data;
    groMemRemMem({
      groupId: data.groupId,
      memberId: data.memberId
    })
      .then(res => {
        if (res.code == "0") {
          this.$router.push({ path: "/group/list/edit" });
          this.groMemGroMemListFun(data.groupId);
          this.delStuIdHandle({
            delStuId: {
              groupId: data.groupId,
              memberId: data.memberId,
              show: true
            }
          }); //当前删除成员信息 保存用于撤回
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
    this.data = this.$route.query.data;
    console.log(this.data);
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
  span {
    @include fontSet(20px, #333, 600);
    margin-right: 8px;
    line-height: 28px;
    font-weight: 550;
  }
}
.sureYc {
  margin-bottom: 15px;
}
.sureWord {
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  color: #999999;
  margin-bottom: 53px;
  .name {
    color: #fe7865;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
    margin-left: 2px;
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
  .cancel {
    border: 2px solid rgba(254, 120, 101, 0.4);
    // &:hover {
    //   border: 2px solid rgba(254, 120, 101, 1);
    // }
  }
}
</style>
