/**

* Created by wangxin

* @date 2019/8/12 9:45

*新建课程 组件

*/
<template>
  <div class="add-course">
    <div class="number">第{{getNum}}章</div>
    <NewAdd :index="null" :cbFun="addCbFunction"></NewAdd>
  </div>
</template>

<script>
  import {
    Component, Vue,Prop,Emit
  } from "vue-property-decorator";
  import NewAdd from './newAdd';
  import {trimNumber} from '../../utils/utils'

  @Component({
    name: "addCourse",
    components: {
      NewAdd
    }
  })
  export default class AddCourse extends Vue {
    @Prop({
      required:false,
      default :1
    }) index;

    @Prop({
      required:false,
      default:null,
    }) addCbFun;

    get getNum(){
      return trimNumber(this.index+1);
    }

    //新增回调跳转
    @Emit addCbFunction(){
      this.addCbFun(null);
    }
  }
</script>

<style lang="scss" scoped>
  .add-course{
    display: inline-block;
    width:338px;
    background:rgba(248,249,250,1);
    height:calc(100vh - 160px);
    border-radius:16px;
  }
  .number{
    font-size:16px;
    font-weight:500;
    color:rgba(102,102,102,1);
    padding:16px 24px;
  }
</style>
