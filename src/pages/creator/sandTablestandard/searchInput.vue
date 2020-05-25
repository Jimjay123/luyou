/**

* Created by wangxin

* @date 2019/8/16 9:01

*/
<template>
  <div :class="className">
    <i class="icon-search"></i>
    <input
      :type="type"
      :placeholder="placeHolder"
      :value="value"
      :disabled="disabled"
      @input="inputFun"
      @blur="blurFun"
      :maxlength="maxLength"
    />
    <!--<i @click="delFun" v-show="delShow"></i>-->
    <i class="required" v-if="required"></i>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "searchInput",
  components: {}
})
export default class SearchInput extends Vue {
  @Prop(String) placeHolder;
  @Prop({ required: false, default: "text" }) type; //当前输入框类型
  @Prop({ required: false, default: false }) required; //当前输入框是否必填
  @Prop({ required: false, default: "" }) value; //当前输入框值
  @Prop({ required: false, default: false }) disabled; //输入框是否禁用
  @Prop({ required: false, default: false }) tips; //当前输入框是否显示 错误提示  true显示 false 不显示 默认不显示
  @Prop({ required: false, default: 30 }) maxLength; //长度限制 默认30
  @Prop({ required: false, default: null }) input; //长度限制 默认30
  @Prop({ required: false, default: null }) blur; //失去焦点事件
  @Prop({ required: false, default: true }) del; //是否有删除按钮 true 有 false 没有

  delShow = false; //删除按钮是否显示

  @Emit inputFun(e) {
    if (e.target.value !== "") {
      this.delShow = true;
    } else {
      this.delShow = false;
    }
    if (typeof this.input == "function") {
      this.input(e, "input");
    }
  }
  @Emit blurFun(e) {
    if (typeof this.blur == "function") {
      this.blur(e, "blur");
    }
  }

  //快捷删除
  @Emit delFun() {
    let obj = {
      target: {
        value: ""
      }
    };
    this.delShow = false;
    if (typeof this.input == "function") {
      this.input(obj, "del");
    }
  }

  get className() {
    let required = this.required;
    let disabled = this.disabled;
    let del = this.del;
    let tips = this.tips;
    let className = "box";
    if (tips) {
      className += " tips";
    }
    if (required) {
      className += " required";
    }

    if (del) {
      className += " del";
    }

    return className;
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
  input {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    border: 1px solid rgba(230, 230, 230, 1);
    padding: 0 20px;
    padding-left: 28px;
  }
  .icon-search {
    position: absolute;
    top: 4px;
    left: 6px;
    width: 20px;
    height: 20px;
    background: url("../../../assets/search/search.svg") no-repeat;
    background-size: 100% auto;
  }
}
input:hover {
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  border: 1px solid rgba(254, 120, 101, 0.2);
}
input:focus {
  box-shadow: 0px 0px 0px 4px rgba(254, 120, 101, 0.2);
  border: 1px solid rgba(255, 163, 158, 1);
}
.required {
  input {
    padding-right: 30px;
  }
}
.del {
  input {
  }
  i.required {
    position: absolute;
    top: 5px;
    right: 8px;
    width: 7px;
    height: 7px;
    background: #ffa39e;
    border-radius: 50%;
  }
}
.tips {
  input {
    box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
    border: 1px solid rgba(254, 120, 101, 1);
  }
}
</style>
