/**

* Created by wangxin

* @date 2019/8/14 20:29

*/
<template>
  <GroupDiaBox :width="551" v-show="show" :cbFun="diaHide">
    <div class="add">
      <p>
        <span>创建群组</span>用以发布您的课程计划
      </p>
      <InputBox
        style="margin-bottom:20px;height:40px;"
        :value="value"
        :placeholder="'群名称，不超过30字符，如：社工-19届-3班'"
        :tips="tips"
        :input="inputChange"
      ></InputBox>
      <CheckBox style="margin-bottom:29px" :value="checkVal" :list="checkList" :input="checkChange"></CheckBox>
      <div class="btn">
        <a @click="cancel" class="save" href="javascript:;">取消</a>
        <a @click="create" class="submit" href="javascript:;">创建群组</a>
      </div>
    </div>
  </GroupDiaBox>
</template>

<script>
  import {Component, Vue, Emit, Prop} from "vue-property-decorator";
  import GroupDiaBox from "../group/groupDiaBox";
  import InputBox from "../group/inputBox";
  import CheckBox from "../group/checkBox";
  import {cloneObj, tokenFun, tipsFail} from "../../utils/utils";
  import {groupInfoAdd, groInfOwnGroupList} from "../../service/groupApi";
  import {State, Action, namespace} from "vuex-class";

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

    @Prop({default: false, required: false}) show;
    @Prop({
      default: ()=>{
        return {
          show:false,
          content:'群名称不能为空'
        }
      },
      required: false
    }) tips;

    @Prop({
      default: null,
      required: false
    })
    cbFun; //回调方法

    value = ""; //输入框值
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

    //弹框关闭回调
    @Emit diaHide(val) {
      this.cbFun(val);
    }

    //input 改变事件
    @Emit inputChange(e) {
      this.value = e.target.value;
      this.tips.show=false;
    }

    //单选框改变事件
    @Emit checkChange(item) {
      this.checkVal = item;
    }

    //取消按钮点击事件
    @Emit cancel() {
      this.cbFun(false);
    }

    //创建按钮点击事件
    @Emit create() {
      this.cbFun("submit", {
        name: this.value,
        approveJoinFlag: this.checkVal.val
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
    @include fontSet(14px, #999, normal);
    span {
      @include fontSet(22px, #333, 600);
      margin-right: 8px;
    }
    margin-bottom: 34px;
  }

  input {
    width: 100%;
  }

  .btn {
    text-align: right;
    a {
      width: 109px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
    }
    .save {
      background: rgba(255, 255, 255, 1);
      border-radius: 18px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(254, 120, 101, 1);
      box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
      @include fontSet(16px, #fe7865, 500);
      background: #fff;
    }
    .submit {
      background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      @include fontSet(16px, #fff, 500);
      margin-left: 21px;
      margin-right: 8px;
    }
    .submit:hover {
      box-shadow: 0px 2px 4px 0px rgba(254, 120, 101, 0.4);
    }
    .save:hover {
      box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
    }
  }
</style>
