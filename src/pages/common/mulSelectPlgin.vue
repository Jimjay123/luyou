/**

* Created by wangxin

* @date 2019/10/25 9:43

*/
<template>
  <div class="group-list" v-Clickoutside="cliOutside">
    <div :class="classShow" @click="showSelFun">
      <div class="item" v-for="(item,index) in list" v-if="item.selected" :key="item.id">
        {{item.label}}
        <i class="del" @click="()=>delFun(index)">x</i>
      </div>
      <span class="placeholder" v-if="showPlaHolder">{{placeHolder}}</span>
      <i v-if="requiredDot" class="btd"></i>
    </div>
    <div class="error-tips" v-show="tips.show">
      <p>{{tips.content}}</p>
    </div>
    <div class="list" v-if="show">
      <ul>
        <li
          v-for="(item,k) in list"
          :class="getClass(item.selected)"
          :key="item.id"
          @click="()=>selFun(k)"
        >
          <i v-if="item.selected" class="el-icon-check"></i>
          {{item.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Prop, Emit} from "vue-property-decorator";
  import Clickoutside from "element-ui/src/utils/clickoutside";

  @Component({
    name: "subGroList",
    directives: {
      Clickoutside
    },
    components: {}
  })
  export default class SubGroList extends Vue {
    @Prop({
      required: false,
      default: () => [
        /*{
            "id": 1,//群ID
            "name": "刘老师的群1",// 群名称
            selected:true,//当前的数据是否被选中
          }*/
      ]
    })
    list; //可选项数组

    @Prop({
      required: false,
      default: () => {
        return {
          content: "请选择",
          show: false
        };
      }
    })
    tips; //当前输入框是否显示 错误提示  true显示 false 不显示 默认不显示

    @Prop({default: "请选择", required: false}) placeHolder;
    show = false; //下拉选择框是否展示

    @Prop({default: false, required: false}) AddGroShow; //是否展示报错提示

    @Prop({default: null, required: false}) addGroupCb; //
    @Prop({default: null, required: false}) requiredDot; //是否显示必填红点

    //选中展示 框 class 展示
    get classShow() {
      if (this.tips.show) {
        return "show-selected error";
      } else {
        if (this.show) {
          return "show-selected focus";
        } else {
          return "show-selected";
        }
      }
    }

    //是否展示 placeHolder
    get showPlaHolder() {
      if (this.list.find(item => item.selected === true)) {
        return false;
      }
      return true;
    }

    @Emit getClass(val) {
      if (val) {
        return "active";
      }
      return "";
    }

    //点击区域以外的部分 关闭下拉选择框
    @Emit cliOutside() {
      this.show = false;
    }

    //展示框点击事件
    @Emit showSelFun() {
      this.show = true;
    }

    //删除选中项
    @Emit delFun(index) {
      this.list[index].selected = false;
      this.cbFun();
    }

    //选择群
    @Emit selFun(index) {
      this.list[index].selected = !this.list[index].selected;
      this.tips.show=false;
      this.cbFun();
      this.show = false;
    }

    cbFun(){
      if(typeof this.addGroupCb === 'function'){
        this.addGroupCb(this.list);
      }
    }

    mounted(){
      console.log(this.list);
    }

  }
</script>

<style lang="scss" scoped>
  @mixin fontSet($s, $c, $w) {
    font-size: $s;
    color: $c;
    font-weight: $w;
  }

  .group-list {
    position: relative;
    width: 618px;
    min-height: 40px;
  }

  .right {
    position: absolute;
    top: 8px;
    right: 28px;
    a {
      @include fontSet(14px, rgba(0, 0, 0, 0.5), 400);
      border-radius: 4px;
      border: 1px solid rgba(217, 217, 217, 1);
      padding: 4px 7px 4px 7px;
    }
    .icon {
      color: rgba(0, 0, 0, 0.5) !important;
      margin-left: 6px;
    }
  }

  .placeholder {
    @include fontSet(16px, rgba(0, 0, 0, 0.25), 400);
  }

  .show-selected {
    width: 100%;
    height: 100%;
    min-height: 40px;
    border-radius: 6px;
    border: 1px solid rgba(230, 230, 230, 1);
    padding: 8px 14px;
    padding-right: 106px;
    .item {
      display: inline-block;
      @include fontSet(14px, #666, 400);
      padding: 0 10px;
      background: rgba(247, 247, 247, 1);
      border-radius: 4px;
      border: 1px solid rgba(230, 230, 230, 1);
      margin-right: 12px;
      /*margin-bottom: 3px;*/
      .del {
        margin-left: 7px;
        color: #ccc;
        cursor: pointer;
      }
    }
  }

  .show-selected:hover {
    border: 1px solid rgba(254, 120, 101, 0.2);
  }

  .focus {
    box-shadow: 0px 0px 0px 4px rgba(254, 120, 101, 0.2);
    border: 1px solid rgba(255, 163, 158, 1);
    &:hover {
      border: 1px solid rgba(255, 163, 158, 1);
    }
  }

  .error {
    box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
    border: 1px solid rgba(254, 120, 101, 1);
  }

  .list {
    width: 100%;
    height: 0;
    position: relative;
    ul {
      width: 100%;
      max-height: 200px;
      overflow-y: auto;
      position: absolute;
      top: 2px;
      left: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 4px 0px rgba(230, 230, 230, 1);
      border-radius: 6px;
      border: 1px solid rgba(230, 230, 230, 1);
      li {
        height: 40px;
        line-height: 40px;
        padding: 0 27px;
        position: relative;
        @include fontSet(16px, #666, 400);
        cursor: pointer;
      }
      .active {
        @include fontSet(16px, #333, 500);
        i {
          position: absolute;
          top: 12px;
          left: 8px;
          color: #fe7865;
        }
      }
      li:hover {
        background: rgba(250, 250, 250, 1);
      }
    }
  }

  .none {
    text-align: center;
  }

  .btd {
    position: absolute;
    top: 15px;
    right: 8px;
    width: 7px;
    height: 7px;
    background: #ffa39e;
    border-radius: 50%;
  }

  input::-webkit-input-placeholder {
    font-size: 34px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.25);
  }

  .error-tips {
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
