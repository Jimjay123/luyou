<template>
  <div class="dialog-bg" v-show="options.show">
    <!--fail start-->
    <div class="dialog-box fail">
      <p v-show="options.title!==null">{{options.title?options.title:'提示'}} <i @click="close" class="el-icon-close"></i></p>
      <div class="dialog-content clearfix">
        <slot></slot>
      </div>
      <div class="dialog-footer" v-if="btnShow===true">
        <a href="javascript:;" v-if="options.btn1!==false" @click="btn1Click">{{options.btn1Text?options.btn1Text:'取消'}}</a>
        <a href="javascript:;" v-if="options.btn2!==false" @click="btn2Click">{{options.btn2Text?options.btn2Text:'确定'}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  /*
  *
  * 弹框壳函数 内容、表单可通过slot的方式传进来
  *
  * */
  import {Component, Vue, Emit,Prop} from 'vue-property-decorator';

  @Component({
    name: 'dialogBox',
  })
  export default class DialogBox extends Vue {
    @Prop(Boolean) show;
    /*
    * options{
    *   show:true,//true 显示  false隐藏 默认false
    *   title:'提示',//头部信息 默认 提示  null 时
    *   btn1:true,//按钮1 默认显示 true
    *   btn2:true,//按钮2 默认确定
    *   btn1Text:'取消',//按钮1 显示文字
    *   btn2Text:'确定',//按钮2 显示文字
    *   btn1Cb:null,//按钮1回调方法
    *   btn2Cb:null,//按钮2回调方法
    *   closeBtn:true,//关闭按钮是否显示 默认显示
    *   closeCb:null,//关闭按钮回调方法
    * }
    *
    * 注释：参数除show 以外皆为非必填
    *
    * */
    get btnShow(){
      console.log(!(this.options.btn1===false&&this.options.btn2===false));
      return !(this.options.btn1===false&&this.options.btn2===false)
    };

    @Prop({
      type:Object,
      default:()=>{
        return {
          show:false,
        }
      }
    }) options;

    @Emit close(){
      this.$emit('btnCb','show',false);
    }

    @Emit btn1Click(){
      this.$emit('btnCb','show',false)
    }

    @Emit btn2Click(){
      this.$emit('btnCb','show',false)
    }

    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @mixin posAbs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @mixin texCen {
    text-align: center;
  }

  .dialog-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    .dialog-loading {
      @include posAbs;
      i {
        font-size: 50px;
      }

    }
  }

  .dialog-box {
    @include posAbs;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    p {
      @include texCen;
      position: relative;

      i {
        position: absolute;
        top: 0;
        right: 0;
      }

    }
    .dialog-content {
      @include texCen;
      padding: 10px;
    }

    .dialog-footer {
      padding: 5px 10px;
      text-align: center;
      a {
        padding: 2px 10px;
        background: #999;
        color: #fff;
        margin-right: 20px;
      }

      a:last-child {
        margin-right: 0;
      }

    }
  }
</style>
