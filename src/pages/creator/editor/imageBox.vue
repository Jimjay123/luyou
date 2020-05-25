/**

* Created by wangxin

* @date 2019/9/18 16:30

*/
<template>
  <ul class="block-box clearfix">
    <li v-for="(item,index) in imageList" :key="index" @click="imgClick(item,'tab')">
      <img :src="item.src" alt />
      <i class="icon-del" v-if="item.type!=='default'" @click.stop="delFun(item)"></i>
    </li>

    <li :key="'add'" class="add" v-if="addShow&&imageList.length<24" @click="test">
      <i class="icon-add"></i>
      <input type="file" @change="imgChange" ref="uploadFile" accept="image/*" hidden />
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import {
  uploadBgImg,
  delEditResBackImgFun
} from "../../../service/editor/editorAction";
import { State, Action, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";
const EditMod = namespace("edit");
@Component({
  name: "ImageBox"
})
export default class ImageBox extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  //背景图片选中项
  get bgImg() {
    return this.editList[this.editIndex].rightNav.bgImg;
  }
  @Prop({
    default: () => {
      return [];
    },
    required: false
  })
  imageList;

  @Prop({
    required: false,
    default: null
  })
  selImgValCb;

  @Prop({
    required: false,
    default: null
  })
  selImgVal;

  @Prop({
    required: false,
    default: true
  })
  addShow;

  @Emit imgClick(val, type) {
    if (!this.addShow) {
      this.setEditList("uploadImg", val);
    }
    if (typeof this.selImgValCb === "function") {
      this.selImgValCb(val);
    }
  }

  //删除回调方法
  @Emit delFun(item) {
    delEditResBackImgFun({ attachId: item.id });
  }

  //触发文件选择
  @Emit test() {
    this.$refs.uploadFile.click();
  }

  //图片选择改变事件
  @Emit imgChange() {
    let file = event.target.files[0].name;
    let fileObj = event.target.files[0];
    event.target.value = "";
    if (file) {
      //this.selImgValCb(file, "add");
      let data = new FormData();
      data.append("file", fileObj);
      data.append("fileType", "2");
      uploadBgImg(data);
    }
  }
  setEditList(name, val) {
    let editList = cloneObj(this.editList);
    editList[this.editIndex].rightNav[name] = val;
    this.editListHandle({
      editList
    });
  }
}
</script>

<style lang="scss" scoped>
.block-box {
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
    img {
      width: 32px;
      height: 32px;
      border-radius: 4px;
    }
    .icon-del {
      position: absolute;
      top: 0;
      right: 0;
      background: url("../../../assets/creator/editor/del.svg") no-repeat;
      background-size: 12px auto;
      width: 12px;
      height: 12px;
    }
  }
  .add {
    text-align: center;
    line-height: 32px;
    box-shadow: 0px 0px 3px 0px rgba(189, 189, 189, 0.5);
    .icon-add {
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url("../../../assets/creator/editor/img-add.svg");
      background-size: 16px 16px;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 32px;
      height: 32px;
      opacity: 0;
      z-index: 100;
      cursor: pointer;
    }
  }
  li:nth-child(4n) {
    margin-right: 0;
  }
  li:hover {
    box-shadow: 0px 0px 0px 2px rgba(254, 120, 101, 0.4);
  }
}
</style>
