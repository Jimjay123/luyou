/**

* Created by wangxin

* @date 2019/8/15 20:25

*/
<template>
  <div class="sel-box" v-Clickoutside="outClick">
    <!-- <div class="text" @click="textClick" v-if="value.label">
      {{value.label}}
      <i :class="iconClass" @click="textClick"></i>
    </div>
    <div class="text" @click="textClick" style="color:rgba(0,0,0,0.25)" v-else>
      {{placeHolder}}
      <i :class="iconClass" @click="textClick"></i>
    </div>-->
    <div class="text" @click="textClick" v-if="value.val!==''">
      <p @click.stop="textClick">{{selVal.label?selVal.label:placeHolder}}</p>
      <i @click.stop="textClick" :class="iconClass"></i>
    </div>
    <div class="text" @click="textClick" style="color:rgba(0,0,0,0.25)" v-else>
      <p @click.stop="textClick">{{selVal.label?selVal.label:placeHolder}}</p>
      <i @click.stop="textClick" :class="iconClass"></i>
    </div>
    <div class="error" v-show="tips.show">
      <p>{{tips.content}}</p>
    </div>
    <div class="h0">
      <ul class="sel-list" v-show="show">
        <li
          v-for="(item,index) in list"
          :key="index"
          @click="liClick(item)"
          :class="{active:item.val===value.val}"
        >
          <i v-if="item.val===value.val" class="el-icon-check"></i>
          {{item.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Emit, Prop} from "vue-property-decorator";
  import Clickoutside from "element-ui/src/utils/clickoutside";

  @Component({
    name: "selBox",
    directives:{
      Clickoutside
    }
  })
  export default class SelBox extends Vue {
    show = false; //下拉选择显示隐藏
    //当前选中项
    value = {};

    get iconClass() {
      if (this.show) {
        return "el-icon-arrow-up";
      }
      return "el-icon-arrow-down";
    }

    @Prop({
      default: () => {
        return {};
      },
      required: false
    })selVal;
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
    }) list;

    @Prop({default: "请选择", required: false})placeHolder;

    @Prop({default: null, required: false}) input;
    @Prop({
      default:()=>{
        return {
          show:false,
          content:'请选择'
        }
      },
      required: false
    }) tips;//提示信息

    //可选框点击事件
    @Emit textClick(event) {
      const target = event.target.tagName;
      if (target === "I" || target === "DIV"||target==='P') {
        this.show = !this.show;
      }
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

    //点击元素以外区域
    @Emit outClick(){
      this.mouLeave();
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
    div.text {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 14px;
      border-radius: 6px;
      border: 1px solid rgba(230, 230, 230, 1);
      @include hidPoint;
      font-size: 16px;
      position: relative;
      @include fontSet(16px, rgba(0, 0, 0, 0.65), 400);
      i {
        position: absolute;
        top: 8px;
        right: 12px;
      }
      .el-icon-arrow-up {
        color: #fe7865;
      }
      p{
        width: 100%;
        @include hidPoint;
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
      @include fontSet(16px, #666, 400);
      max-height: 300px;
      overflow-y: auto;
      li {
        height: 39px;
        line-height: 39px;
        @include hidPoint;
        padding-left: 29px;
      }
      li:hover {
        background: #f7f7f7;
      }
      .active {
        color: #fe7865;
        position: relative;
        i {
          font-size: 14px;
          position: absolute;
          top: 12.5px;
          left: 11px;
          color: #fe7865;
          font-weight: 600;
        }
      }
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
