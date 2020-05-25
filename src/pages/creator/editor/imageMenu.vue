
<template>
  <div class="text">
    <!--操作 start-->
    <div class="item mr14">
      <h3>操作</h3>
      <div class="mr14" v-if="fileState !== 'uploaded'">
        <a class="btn" href="javascript:;" @click="addClick">上传图片</a>
      </div>
      <div class="btn-box mr14" v-else>
        <a class="btn" href="javascript:;" @click="addClick">替换图片</a>
        <a class="btn noBorder" href="javascript:;" @click="delClick">删除图片</a>
      </div>
    </div>
    <!--操作 end-->
    <!--位置 start-->
    <div class="item mr14">
      <h3>本页旁白</h3>
      <SouRecBox />
    </div>
    <!--位置 end-->
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import SouRecBox from "./souRecBox";
import { State, Action, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";
import { changeCouUpdPageContentFun } from "../../../service/editor/editorAction";
const EditMod = namespace("edit");
@Component({
  name: "TextMenu",
  components: {
    SouRecBox
  }
})
export default class TextMenu extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("bgImgList") bgImgList; //编辑文档数据
  @EditMod.Action("bgImgListHandle") bgImgListHandle; //编辑文档数据  action

  get selPositionVal() {
    return this.editList[this.editIndex].rightNav.selPositionVal;
  }

  //文件上出状态 normal uploading 上传中 uploaded 上传完成
  get fileState() {
    return this.editList[this.editIndex].leftSket.uploadStatus;
  }

  //上传图片点击事件
  addClick() {
    $("#filElem").click();
  }

  delClick() {
    $("#delimage").click();
  }

  updated() {}
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.item {
  h3 {
    @include fontSet(12px, #333, 500);
    line-height: normal;
  }
}

.mr14 {
  margin-top: 24px;
}

.text {
  word-break: break-all;
  @include fontSet(12px, #999, 400);
  padding-left: 20px;
  padding-right: 20px;
}

.btn {
  display: inline-block;
  width: 158px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 6px;
  border: 1px solid rgba(230, 230, 230, 1);
  @include fontSet(12px, #666, 400);
}
.btn-box {
  display: flex;
  justify-content: space-between;
  .btn {
    width: 74px;
  }
}
</style>
