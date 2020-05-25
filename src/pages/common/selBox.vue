<template>
  <div class="sel-box">
    <div class="text" @click="textClick">{{'+'+value.label}}<i :class="iconClass"></i></div>
    <!-- <div class="text" @click="textClick">{{value.label}}<i :class="iconClass"></i></div> -->
    <div class="h0">
      <ul class="sel-list" v-show="show">
        <li
          v-for="(item,index) in list"
          :key="index"
          @click="liClick(item)"
          :class="{active:item.val===value.val}"
        ><i v-if="item.val===value.val" class="el-icon-check"></i>+{{item.label}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Emit, Prop} from 'vue-property-decorator';

  @Component({
    name: 'selBox'
  })
  export default class SelBox extends Vue{
    show=false;//下拉选择显示隐藏
    //当前选中项
    value=this.selVal||{
      val:'',//值
      label:'请选择',//对应展示值
    };
    get iconClass(){
      if(this.show){
        return 'el-icon-caret-top'
      }
      return 'el-icon-caret-bottom'
      // return 'el-icon-caret-right'
    }
    @Prop() selVal;
    @Prop({
      required:false,
      default:true,//true 禁用  false 不禁用
    }) disabled;

    @Prop({
      required: true,
      default:[
        {
          val:'libai',
          label:'李白',
        },
        {
          val:'dufu',
          label:'杜甫',
        },
        {
          val:'baijuyi',
          label:'白居易',
        },
        {
          val:'wanganshi',
          label:'王安石',
        },
      ],
    }) list;

    @Prop() cb;

    //可选框点击事件
    @Emit textClick(){
      if(this.disabled){
        return;
      }
      this.show=true;
    }

    //li可选项
    @Emit liClick(item){
      this.value=item;
      if(typeof this.cb==='function'){
        this.cb(item);
      }
      this.show=false;
    }
    @Emit mouLeave(){
      this.show=false;
    }
    @Emit clickFun(e){
      let className=e.target.className;
      if(className=='sel-box'||className=='text'){

      }else{
        this.mouLeave();
      }
    }
    mounted(){
      window.onclick=this.clickFun;
    }
    destroyed(){
      window.onclick=null;
    }
  }
</script>

<style lang="scss" scoped>
  @mixin boxSha($t,$r,$b,$l,$c){
    -moz-box-shadow:$t $r $b $l $c;
    -webkit-box-shadow:$t $r $b $l $c;
    box-shadow:$t $r $b $l $c;
  }
  @mixin hidPoint{
    overflow:hidden; /*超出的部分隐藏起来。*/
    white-space:nowrap;/*不显示的地方用省略号...代替*/
    text-overflow:ellipsis;/* 支持 IE */
  }
  .sel-box{
    display:inline-block;
    width:96px;
    height:48px;
    line-height:48px;
    position:relative;
    cursor:pointer;
    color:#666;
    div.text{
      width: 100%;
      height:100%;
      text-align: center;
      @include hidPoint;
      font-size: 18px;
      position:relative;
      i{
        float:right;
        margin-top:17px;
      }
    }
    .h0{
      position: relative;
      width:100%;
      height:0;
    }
    ul{
      position:absolute;
      top:1px;
      left:0;
      z-index:998;
      @include boxSha(0,2px,12px,0,rgba(0,0,0,.1));
      width:100%;
      background:#fff;
      border-radius:8px;
      border:1px solid rgba(230,230,230,1);
      li{
        height:39px;
        line-height: 39px;
        @include hidPoint;
        padding-left:29px;
      }
      li:hover{
        background:#F7F7F7;
      }
      .active{
        color:#FE7865;
        position:relative;
        i{
          font-size: 14px;
          position:absolute;
          top:12.5px;
          left:11px;
        }
      }
    }
  }
</style>
