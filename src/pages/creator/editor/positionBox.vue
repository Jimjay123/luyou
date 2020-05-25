/**

* Created by wangxin

* @date 2019/9/19 9:56

*/
<template>
  <ul class="align-box clearfix">
    <li
      v-for="(item,index) in positionList"
      :key="index"
      @click="imgClick(item)"
      :class="[item.type,selPositionVal.type===item.type?'active':'']"
    >
      <div class="line-box clearfix">
        <div class="line1"></div>
        <div class="line2"></div>
      </div>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
const EditMod = namespace("edit");

@Component({
  name: "PositionBox"
})
export default class PositionBox extends Vue {
  @EditMod.State("positionVal") positionVal; //文本对齐位置
  @EditMod.Action("positionValHandle") positionValHandle; //文本对齐位置  action修改方法

  @Prop({
    default: () => {
      return [];
    },
    required: false
  })
  positionList;

  @Prop({
    required: false,
    default: null
  })
  selPositionValCb;

  @Prop({
    required: false,
    default: null
  })
  selPositionVal;

  @Emit imgClick(val) {
    if (typeof this.selPositionValCb === "function") {
      this.selPositionValCb(val);
      this.positionValHandle({
        positionVal: val.type
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.align-box {
  width: 100%;
  margin-top: 14px;
  li {
    float: left;
    width: 48px;
    height: 32px;
    margin-right: 7px;
    margin-bottom: 7px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    line-height: 32px;
    text-align: center;
    border: 2px solid rgba(234, 234, 234, 1);
    display: flex;
    .line-box {
      display: inline-block;
      margin: 3px 2px;
      height: 6px;
      div {
        width: 16px;
        height: 2px;
        background: rgba(77, 77, 77, 1);
        border-radius: 1px;
      }
      .line1 {
        margin-bottom: 2px;
      }
      .line2 {
        opacity: 0.6;
      }
    }
  }
  li:nth-child(3n) {
    margin-right: 0;
  }

  li:hover,
  .active {
    border: 2px solid rgba(254, 120, 101, 0.4);
  }
  .active {
    .line-box {
      div {
        background: rgba(254, 120, 101, 1);
      }
    }
  }

  .top-left {
    justify-content: flex-start;
  }
  .top-center {
    justify-content: center;
  }
  .top-right {
    justify-content: flex-end;
  }

  .middle-left {
    justify-content: flex-start;
    align-items: center;
  }
  .middle-center {
    justify-content: center;
    align-items: center;
  }
  .middle-right {
    justify-content: flex-end;
    align-items: center;
  }

  .bottom-left {
    justify-content: flex-start;
    align-items: flex-end;
  }
  .bottom-center {
    justify-content: center;
    align-items: flex-end;
  }
  .bottom-right {
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>
