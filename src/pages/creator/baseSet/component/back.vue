<template>
    <div class="back" @click="backFun" >
        <img :src="require('@/assets/creator/back.png')" style="height:100%" />返回
    </div>
</template>
<script>
import {Component,Emit,Vue,Prop} from 'vue-property-decorator';
@Component({
    name:'back'
})
export default class Back extends Vue{
  backFun(){
    window.history.go(-1);
  }
}
</script>
<style lang="scss" scoped>
.back{
  display: inline-block;
    height:22px;
    line-height: 22px;
    margin:13px 0;
    font-size:14px;
    cursor: pointer;
}
</style>


