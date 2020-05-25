/**

* Created by wangxin

* @date 2019/9/4 17:19

*/
<template>
  <div class="sel-box">
    <div class="text" @click="textClick" v-if="value.label">
      {{value.label}}
      <i :class="iconClass"></i>
    </div>
    <div class="text" @click="textClick" style="color:rgba(0,0,0,0.25)" v-else>
      {{placeHolder}}
      <i :class="iconClass"></i>
    </div>
    <div class="h0">
      <ul class="sel-list" v-show="show">
        <li
          v-for="(item,index) in list"
          :key="index"
          @click="liClick(item)"
          :class="{active:item.val===value.val}"
        >
          <span
            :class="{'color':(item.children&&item.children.find(res=>res.val===value.val)?true:false)}"
          >{{item.label}}</span>
          <i class="icon-r" v-if="item.children&&item.children.length>0"></i>
          <i class="icon-s" v-if="item.val===value.val"></i>
          <ul
            :class="['child','sel-list',item.children.find(res=>res.val===value.val)?'':'none']"
            v-if="item.children&&item.children.length>0"
          >
            <li
              v-for="(opt,k) in item.children"
              :key="k"
              @click.stop="liClick(opt)"
              :class="{active:opt.val===value.val}"
            >
              <!-- <i class="icon-r" v-if="opt.val===value.val"></i>-->
              <i class="icon-s" v-if="opt.val===value.val"></i>
              {{opt.label}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component({
  name: "MulSelect"
})
export default class MulSelect extends Vue {
  show = false; //下拉选择显示隐藏
  //当前选中项
  value = {};
  get iconClass() {
    if (this.show) {
      return "i-up";
    }
    return "i-d";
  }
  @Prop({
    default: () => {
      return {};
    },
    required: false
  })
  selVal;
  @Prop({
    required: false,
    default: () => {
      return [
        {
          val: "libai",
          label: "李白"
        },
        {
          val: "dufu",
          label: "杜甫"
        },
        {
          val: "baijuyi",
          label: "白居易"
        },
        {
          val: "wanganshi",
          label: "王安石"
        }
      ];
    }
  })
  list;

  @Prop({
    default: "请选择",
    required: false
  })
  placeHolder;

  @Prop({
    default: null,
    required: false
  })
  input;

  //可选框点击事件
  @Emit textClick() {
    this.show = !this.show;
  }

  //li可选项
  @Emit liClick(item) {
    this.value = item;
    if (typeof this.input === "function") {
      this.input(item);
    }
    this.show = false;
  }
  @Emit mouLeave() {
    this.show = false;
  }
  @Emit clickFun(e) {
    let className = e.target.className;
    if (className == "sel-box" || className == "text") {
    } else {
      this.mouLeave();
    }
  }
  created() {
    this.value = this.selVal || {
      val: "", //值
      label: "请选择" //对应展示值
    };
  }

  updated() {
    this.value = this.selVal || {
      val: "", //值
      label: "请选择" //对应展示值
    };
  }

  mounted() {
    window.onclick = this.clickFun;
  }
  destroyed() {
    window.onclick = null;
  }
}
</script>

<style lang="scss" scoped>
@mixin boxSha($t, $r, $b, $l, $c) {
  -moz-box-shadow: $t $r $b $l $c;
  -webkit-box-shadow: $t $r $b $l $c;
  box-shadow: $t $r $b $l $c;
}
@mixin hidPoint {
  overflow: hidden; /*超出的部分隐藏起来。*/
  white-space: nowrap; /*不显示的地方用省略号...代替*/
  text-overflow: ellipsis; /* 支持 IE */
}
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.sel-box {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  vertical-align: middle;
  div.text {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid rgba(230, 230, 230, 1);
    @include hidPoint;
    font-size: 14px;
    position: relative;
    i {
      position: absolute;
      top: 7px;
      right: 10px;
      width: 20px;
      height: 20px;
    }
    .i-d {
      background: url("../../assets/creator/i-d.svg") no-repeat;
      background-size: 100% auto;
    }
    .i-up {
      background: url("../../assets/creator/i-up.svg") no-repeat;
      background-size: 100% auto;
    }
  }
  .h0 {
    position: relative;
    width: 100%;
    height: 0;
  }
  ul {
    position: absolute;
    top: 1px;
    left: 0;
    z-index: 998;
    @include boxSha(0, 2px, 12px, 0, rgba(0, 0, 0, 0.1));
    width: 100%;
    background: #fff;
    border-radius: 8px;
    border: 1px solid rgba(230, 230, 230, 1);
    max-height: 300px;
    li {
      height: 32px;
      line-height: 32px;
      padding-left: 18px;
      padding-right: 15px;
      position: relative;
      i {
        position: absolute;
        top: 10px;
        left: 4px;
      }
      .icon-r {
        left: auto;
        right: 6px;
        width: 9px;
        height: 12px;
        background: url("../../assets/creator/icon-r.svg") no-repeat;
        background-size: 100% auto;
      }
      .icon-s {
        width: 12px;
        height: 12px;
        background: url("../../assets/creator/icon-s.svg") no-repeat;
        background-size: 100% auto;
      }
    }
    li:hover {
      background: rgba(0, 0, 0, 0.03);
      .child {
        display: block;
        position: absolute;
        top: 0;
        left: 100%;
      }
    }
    .active,
    .active:hover {
      color: #fe7865;
      background: rgba(0, 0, 0, 0.03);
      position: relative;
      ul li {
        color: #666;
      }
    }
    .color {
      color: #fe7865;
    }
  }
  .child {
    position: absolute;
    top: 0;
    left: 100%;
  }
  .none {
    display: none;
  }
}
</style>
