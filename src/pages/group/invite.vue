/**

* Created by wangxin

* @date 2019/8/6 17:29

*/
<template>
  <GroupDiaBox :width="551">
    <div class="add">
      <p>
        <span>链接邀请学生进入群</span>
      </p>
      <div class="btn">
        <span>{{url}}</span>
        <a @click="create" :class="className" href="javascript:;">复制链接</a>
      </div>
      <div class="tips">将链接复制发送给学生就可以了</div>
    </div>
  </GroupDiaBox>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import GroupDiaBox from "./groupDiaBox";
import InputBox from "./inputBox";
import CheckBox from "./checkBox";
import { cloneObj, tokenFun, tipsFail, copy } from "../../utils/utils";
import { groInfInv } from "../../service/groupApi";
import { State, Action, namespace } from "vuex-class";
const GroupMod = namespace("group");
@Component({
  name: "invite",
  components: {
    GroupDiaBox,
    InputBox,
    CheckBox
  }
})
export default class Invite extends Vue {
  url = " "; //输入框值
  className = "";

  @GroupMod.State("selGroup") selGroup; //当前选择的群组 默认第一个群组
  @GroupMod.Action("selGroupHandle") selGroupHandle; //当前选择的群组  action修改方法

  //创建按钮点击事件
  @Emit create() {
    if (copy(false, this.url)) {
      this.className = "submit";
    }
  }

  created() {
    //邀请群成员链接获取
    groInfInv({ groupId: this.selGroup.id })
      .then(res => {
        if (res.code == "0") {
          let data = res.data;
          this.url =
            window.location.href.split("#")[0] +
            "#/StudentLinkto?invitationCode=" +
            data.invitationCode +
            "&inviterId=" +
            data.inviterId;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {});
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
/*超长...*/
@mixin superWidth {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
.add {
  padding-top: 21px;
  padding-bottom: 28px;
}
p {
  display: flex;
  align-items: center;
  @include fontSet(14px, #999, normal);
  span {
    @include fontSet(22px, #333, 600);
    margin-right: 8px;
  }
  margin-bottom: 34px;
}
.btn {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    border-radius: 6px;
    border: 1px solid rgba(230, 230, 230, 1);
    width: 369px;
    padding: 12px 1px 12px 12px;
    @include superWidth;
  }
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    margin-left: 8px;
  }
  .submit {
    background: linear-gradient(
      90deg,
      rgba(157, 215, 254, 1) 0%,
      rgba(104, 193, 254, 1) 100%
    );
  }
}
.tips {
  color: #999;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  margin-top: 14px;
}
</style>

