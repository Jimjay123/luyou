/**

* Created by wangxin  文档右侧功能栏

* @date 2019/10/8 16:59

*/
<template>
  <div class="item-box">
    <!--文档名称 start-->
    <div class="item">
      <h3>文档名称</h3>
      <div class="mr14 text">{{name}}</div>
    </div>
    <!--文档名称 end-->

    <!--文件大小 start-->
    <div class="item mr14">
      <h3>文件大小</h3>
      <div class="mr14 text">{{size == '-' ? '-' : fileSizeFunction(size)}}</div>
    </div>
    <!--文件大小 end-->

    <!--操作 start-->
    <div class="item mr14">
      <h3>操作</h3>
      <div class="mr14" v-show="uploadStatus===1||uploadStatus===2">
        <a class="btn" href="javascript:;" @click="uploadClick">上传文档</a>
      </div>
      <div class="btn-box mr14" v-show="uploadStatus===3">
        <a class="btn" href="javascript:;" @click="uploadClick">替换文档</a>
        <a class="btn noBorder" href="javascript:;" @click="delClick">删除文档</a>
      </div>
    </div>
    <!--操作 end-->
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, fileSizeFun, tipsFail } from "../../../utils/utils";
import { logicDeleteAttach } from "../../../service/editor/editorApi";
import { changeCouUpdPageContentFun } from "../../../service/editor/editorAction";

const EditMod = namespace("edit");

@Component({
  name: "FileMenu",
  components: {}
})
export default class FileMenu extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @Prop({
    require: false,
    default: null
  })
  index;

  get ShowIndex() {
    return this.index !== null ? this.index : this.editIndex;
  }
  //文件名称
  get name() {
    return this.editList[this.ShowIndex].leftSket.name || "-";
  }

  //文件大小
  get size() {
    return this.editList[this.ShowIndex].leftSket.size || "-";
  }

  //文件上出状态 1未上传 2上传中 3已上传
  get uploadStatus() {
    return this.editList[this.ShowIndex].leftSket.uploadStatus || 1;
  }

  //文件id
  get fileAttachId() {
    return this.editList[this.ShowIndex].leftSket.fileAttachId;
  }

  //计算文件大小
  @Emit fileSizeFunction(val) {
    return fileSizeFun(val) || "-";
  }

  //上传文件点击事件
  @Emit uploadClick() {
    $("#filElem").click();
  }
  @Emit delClick() {
    let attachId = this.editList[this.ShowIndex].leftSket.fileAttachId;
    let pageContentRelId = this.editList[this.ShowIndex].pageContentRelId;
    let data = {
      attachId,
      pageContentRelId
    };
    logicDeleteAttach(data).then(res => {
      if (res.code === 0) {
        let fileStatus = 1;
        let editList = cloneObj(this.editList);
        editList[this.editIndex].leftSket.uploadStatus = fileStatus;
        editList[this.editIndex].leftSket.size = "";
        editList[this.editIndex].leftSket.name = "";

        editList[this.editIndex].fileServerUrl = "";
        editList[this.editIndex].fileAttachName = "";
        editList[this.editIndex].fileAttachSize = "";
        editList[this.editIndex].uploadStatus = 1;
        this.editListHandle({
          editList
        });
        changeCouUpdPageContentFun({
          pageList: editList
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }
  created() {
  }
  updated() {
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
  line-height: 23px;
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
.noBorder {
  border: 0;
}
</style>
