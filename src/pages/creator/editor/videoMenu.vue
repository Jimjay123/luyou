/**

* Created by wangxin 视频右侧功能栏

* @date 2019/10/8 16:44

*/
<template>
  <div class="item-box">
    <!--视频名称 start-->
    <div class="item">
      <h3>视频名称</h3>
      <div class="mr14 text">{{name?name:'-'}}</div>
    </div>
    <!--视频名称 end-->

    <!--视频时长 start-->
    <div class="item mr14">
      <h3>视频时长</h3>
      <div class="mr14 text">{{time?time:'-'}}</div>
    </div>
    <!--视频时长 end-->

    <!--文件大小 start-->
    <div class="item mr14">
      <h3>文件大小</h3>
      <div class="mr14 text">{{size=='-'?'-':fileSizeFunction(size)}}</div>
    </div>
    <!--文件大小 end-->

    <!--操作 start-->
    <div class="item mr14">
      <h3>操作</h3>
      <div class="mr14" v-if="fileState!=='uploaded'">
        <a class="btn" href="javascript:;" @click="addClick">上传视频</a>
      </div>
      <div class="btn-box mr14" v-else>
        <a class="btn" href="javascript:;" @click="addClick">替换视频</a>
        <a class="btn noBorder" href="javascript:;" @click="delClick">删除视频</a>
      </div>
    </div>
    <!--操作 end-->
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, fileSizeFun } from "../../../utils/utils";
const EditMod = namespace("edit");
@Component({
  name: "VideoMenu",
  components: {}
})
export default class VideoMenu extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  //视频名称
  get name() {
    return this.editList[this.editIndex].leftSket.name;
  }

  //视频时长
  get time() {
    return this.editList[this.editIndex].leftSket.time;
  }

  //视频大小
  get size() {
    return this.editList[this.editIndex].leftSket.size;
  }

  //文件上出状态 normal uploading 上传中 uploaded 上传完成
  get fileState() {
    return this.editList[this.editIndex].leftSket.uploadStatus || "";
  }

  //计算文件大小
  @Emit fileSizeFunction(val) {
    if (fileSizeFun(val) === "0B") {
      return "-";
    } else {
      return fileSizeFun(val);
    }
  }

  //上传视频点击事件
  addClick() {
    $("#filElem").click();
  }

  delClick() {
    $("#delVideo").click();
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.item-box {
  padding: 20px;
}

.item {
  h3 {
    @include fontSet(12px, #333, 500);
    line-height: normal;
  }
}

.mr14 {
  margin-top: 14px;
}

.text {
  word-break: break-all;
  @include fontSet(12px, #999, 400);
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
