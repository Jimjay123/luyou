/**

* Created by wangxin

* @date 2019/8/6 10:29

*/
<template>
  <GroupDiaBox :width="551">
    <div class="add">
      <p>
        <span class="shortWord">创建群</span>
        <span class="longWord">用以发布您的课程计划</span>
      </p>
      <InputBox
        style="margin-bottom:20px;height:40px;"
        :value="value"
        :tips="valueTips"
        :placeHolder="'群名称，不超过24字符，如：社工-19届-3班'"
        :input="inputChange"
      ></InputBox>
      <CheckBox style="margin-bottom:29px" :value="checkVal" :list="checkList" :input="checkChange"></CheckBox>
      <div class="btn">
        <a @click="cancel" href="javascript:;" class="cancel">取消</a>
        <a @click="create" class="submit" href="javascript:;">确定</a>
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
import { groupInfoAdd, groInfOwnGroupList } from "../../service/groupApi";
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

  value = ""; //输入框值
  valueTips = {
    show: false,
    content: "群名称不能为空"
  };
  // placeholder = "群名称，不超过30字符，如：社工-19届-3班";
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

  //input 改变事件
  @Emit inputChange(e) {
    this.value = e.target.value;
    this.valueTips.show = false;
  }

  //单选框改变事件
  @Emit checkChange(item) {
    this.checkVal = item;
  }

  //取消按钮点击事件
  @Emit cancel() {
    this.$router.push({ path: "/group/list" });
  }

  //创建按钮点击事件
  @Emit create() {
    console.log(this.value.length);
    if (this.value === "") {
      this.valueTips.show = true;
      return;
    } else if (this.value.length > 24) {
      this.valueTips.show = true;
      this.valueTips.content = "群名称不能超过24字符";
      return;
    } else {
      this.valueTips.show = false;
    }

    groupInfoAdd({
      name: this.value,
      approveJoinFlag: this.checkVal.val
    }).then(res => {
      if (res.code == "0") {
        this.groInfOwnGroupListFun(); //
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取老师相关群组列表
  @Emit groInfOwnGroupListFun() {
    groInfOwnGroupList({}).then(res => {
      if (res.code == "0") {
        this.groupListHandle({ groupList: res.groupList });
        this.$router.push({ path: "/group/list" });
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
.add {
  padding-top: 28px;
  padding-bottom: 28px;
}
p {
  display: flex;
  align-items: center;
  // @include fontSet(14px,#999,normal);
  // span{
  //   @include fontSet(22px,#333,600);
  //   margin-right:8px;
  // }
  .shortWord {
    font-size: 22px;
    font-family: PingFangSC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-right: 8px;
  }
  .longWord {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 19px;
    letter-spacing: 1px;
    margin-top: 6px;
    margin-bottom: 5px;
  }

  margin-bottom: 34px;
}
input {
  width: 100%;
}
// input占位符修改
input::-webkit-input-placeholder {
  /* 字体大小直接写样式即可 */
  font-size: 16px;
  color: rgba(153, 153, 153, 1);
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
    border: 2px solid rgba(254, 120, 101, 0.4);
    border-radius: 18px;
  }
  // .cancel {
  //   &:hover {
  //     border: 2px solid rgba(254, 120, 101, 1);
  //   }
  // }
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
