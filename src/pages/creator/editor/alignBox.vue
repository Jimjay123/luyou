/**

* Created by wangxin

* @date 2019/9/18 19:36

*/
<template>
  <ul class="align-box clearfix">
    <li v-for="(item,index) in alignList" :key="item.type" @click="imgClick(item)">
      <img :src="require('../../../assets/creator/editor/'+item.type+'.svg')" alt />
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
const EditMod = namespace("edit");
@Component({
  name: "AlignBox"
})
export default class AlignBox extends Vue {
  @EditMod.State("alignVal") alignVal; //对齐方式
  @EditMod.Action("alignValHandle") alignValHandle; //对齐方式  action修改方法

  @Prop({
    default: () => {
      return [];
    },
    required: false
  })
  alignList;

  @Prop({
    required: false,
    default: null
  })
  selAlignValCb;

  @Prop({
    required: false,
    default: null
  })
  selAlignVal;

  imgClick(val) {
    if (typeof this.selAlignValCb === "function") {
      this.selAlignValCb(val);
      this.alignValHandle({
        alignVal: val.type
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
    width: 32px;
    height: 32px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    line-height: 32px;
    text-align: center;
    box-shadow: 0px 0px 3px 0px rgba(189, 189, 189, 0.5);
    img {
      width: 24px;
      height: 24px;
      border-radius: 4px;
    }
  }
  li:nth-child(4n) {
    margin-right: 0;
  }
  li:hover {
    box-shadow: 0px 0px 3px 0px rgba(128, 128, 128, 0.5);
    border-radius: 4px;
  }
}
</style>
