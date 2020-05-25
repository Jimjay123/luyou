/**

* Created by wangxin

* @date 2019/8/14 16:38

*/
<template>
  <div :class="className">
    <textarea
      :type="type"
      :placeholder="placeHolder"
      :value="value"
      :disabled="disabled"
      @input="inputFun"
      @blur="blurFun"
      :maxlength="maxLength"
    ></textarea>
    <!-- <i @click="delFun" v-show="delShow"></i>-->
    <span class="limit" v-if="limit">{{value.length}}/{{maxLength}}</span>
    <div class="error" v-show="tips.show">
      <p>{{tips.content}}</p>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "inputBox",
  components: {}
})
export default class InputBox extends Vue {
  @Prop(String) placeHolder;
  @Prop({ required: false, default: "text" }) type; //当前输入框类型
  @Prop({ required: false, default: false }) required; //当前输入框是否必填
  @Prop({ required: false, default: "" }) value; //当前输入框值
  @Prop({ required: false, default: false }) disabled; //输入框是否禁用
  @Prop({
    required: false,
    default: () => {
      return {
        content: "当前输入框是否显示 错误提示",
        show: false
      };
    }
  })
  tips; //当前输入框是否显示 错误提示  true显示 false 不显示 默认不显示
  @Prop({ required: false, default: 30 }) maxLength; //长度限制 默认30
  @Prop({ required: false, default: null }) input; //长度限制 默认30
  @Prop({ required: false, default: null }) blur; //失去焦点事件
  @Prop({ required: false, default: true }) del; //是否有删除按钮 true 有 false 没有
  @Prop({ required: false, default: false }) limit; //显示字数 true 显示字数 限制的字数分母 为 maxLength

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
    if (tips.show===true) {
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
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.box {
  width: 100%;
  position: relative;
  textarea {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    border: 1px solid rgba(230, 230, 230, 1);
    padding: 9px 14px;
    overflow: hidden;
  }
  .limit {
    position: absolute;
    bottom: 10px;
    right: 12px;
    @include fontSet(14px, rgba(0, 0, 0, 0.45), 400);
  }
}
textarea:hover {
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  border: 1px solid rgba(254, 120, 101, 0.2);
}
textarea:focus {
  box-shadow: 0px 0px 0px 4px rgba(254, 120, 101, 0.2);
  border: 1px solid rgba(255, 163, 158, 1);
}
textarea textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.25);
  line-height: 16px;
}

.required {
  textarea {
    padding-right: 30px;
  }
}
.del {
  textarea {
    padding-right: 28px;
  }
  i {
    position: absolute;
    top: 5px;
    right: 8px;
    width: 12px;
    height: 12px;
    background: #ffa39e;
    border-radius: 50%;
    background: url("../../assets/group/del.svg") no-repeat;
    background-size: 100% 100%;
  }
}
.tips {
  textarea {
    box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
    border: 1px solid rgba(254, 120, 101, 1);
  }
}
.error {
  width: 100%;
  height: 0;
  position: relative;
  p {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #fe7865;
  }
}
</style>
