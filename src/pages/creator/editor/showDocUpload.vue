<template>
  <div class="page-con">
    <div :class="[uploadStatus===3?'hidden':'showStatic']" v-if="uploadStatus===1">
      <div class="show">
        <!-- <div class="content"> -->
        <div class="boxShow" v-if="uploadStatus===1">
          <img class="showImg" :src="require('../../../assets/creator/icon-cloud.svg')" alt />
          <p class="word1">拖拽至该区域也可上传</p>
          <p class="word2">
            支持导入
            <span>doc、docx、ppt、pptx、pdf</span>
            格式文件
          </p>
          <a class="btnUpload" href="javascript:;">上传文件</a>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <div class="docUpload" v-if="uploadStatus===3">
      <div class="upload-file">
        <div class="content">
          <!-- 上传成功 start -->
          <div class="uploaded">
            <!-- <iframe ref="iframe" frameborder="0" scrolling="auto" :src="fileServerUrl"></iframe> -->
            <iframe
              :id="index===null?'docLook':'docThum'"
              ref="iframe"
              frameborder="0"
              scrolling="auto"
              :src="showPdf==-1?fileServerUrl:fileServerUrlPdf"
            ></iframe>
          </div>
          <!-- 上传成功 end -->
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
const EditMod = namespace("edit");
@Component({
  name: "ShowDocUpload",
  components: {},
  directives: {}
})
export default class ShowDocUpload extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("previewEditList") previewEditList; //编辑文档数据
  @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action


  @Prop({
    require: false,
    default: null
  })
  index;

  get ShowIndex() {
    return this.index !== null ? this.index : this.editIndex;
  }
  //文件上传状态
  get uploadStatus() {
    return this.previewEditList[this.ShowIndex].leftSket.uploadStatus;
  }

  //文件名称
  get name() {
    return this.previewEditList[this.ShowIndex].leftSket.name;
  }

  //文件大小
  get size() {
    return this.previewEditList[this.ShowIndex].leftSket.size;
  }

  //文件地址
  get fileServerUrl() {
    return `https://view.officeapps.live.com/op/view.aspx?src=${this.previewEditList[this.ShowIndex].leftSket.fileServerUrl}`;
  }
  get fileServerUrlPdf() {
    return this.previewEditList[this.ShowIndex].leftSket.fileServerUrl;
  }
  get showPdf() {
    let data=this.previewEditList[this.ShowIndex].leftSket.fileServerUrl
    let num=data.indexOf('pdf')
    console.log(num)
    return num
  }
  //文件id
  get fileAttachId() {
    return this.previewEditList[this.ShowIndex].leftSket.fileAttachId;
  }

  // data
  // loadingStatus = 1; //加载状态 1没有任何上传文件  2上传中  3上传完成
  file = {
    file: "", //文件本身
    name: "文件名称",
    uploadedSize: "11.2", //已上传文件 大小
    fileSize: "119.2", //文件总大小
    speed: "833", //当前文件上传速度
    remainTime: "2.5", //剩余时间
    comPercentage: "25" //已完成百分比
  }; //上传文件内容
  cancel = null; //文件上传取消
  courseInfo = {};

  created() {
    console.log(this.fileServerUrl);
  }
}
</script>

<style lang="scss" scoped>
.page-con{
    width:100%;
    height:100%;
  }
.showStatic {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  padding: 64px;
}
.show {
  width: 100%;
  height: 100%;
}
.content {
  height: 100%;
}
.boxShow {
  width: 100%;
  height: 100%;
  border: 1px dashed rgba(204, 204, 204, 1);
  text-align: center;
  .showImg {
    margin-top: 144px;
    width: 64px;
    height: 49px;
  }
  .word1 {
    margin-top: 25px;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }
  .word2 {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
    font-weight: normal;
    span {
      color: #fe7865;
    }
  }
  .btnUpload {
    display: inline-block;
    width: 134px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border-radius: 22px;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    margin-top: 65px;
    margin-bottom: 55px;
  }
}
.hidden {
  display: none;
}
.docUpload {
  width: 100%;
  height: 100%;
  // width: 996px;
  // height: 570px;
  overflow: auto;
  position: relative;
}
.upload-file {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
  // width: 868px;
  // height: 442px;
  // margin: 64px;
  border: 1px dashed rgba(204, 204, 204, 1);
  text-align: center;
  img {
    margin-top: 144px;
    width: 64px;
    height: 49px;
  }
  .p1 {
    margin-top: 25px;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }
  .p2 {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
    font-weight: normal;
    span {
      color: #fe7865;
    }
  }
  .btn {
    display: inline-block;
    width: 134px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border-radius: 22px;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    margin-top: 65px;
    margin-bottom: 55px;
  }
}
.uploaded {
  width: 100%;
  height: 100%;
}
// 上传成功
iframe {
  // position: fixed;
  z-index: 199;
  background-color: rgb(255, 255, 255);
  // left: 159px;
  // top: 66px;
  // width: calc(100vw - 159px);
  //height: calc(100vh - 66px);
  width: 100%;
  height: 100%;
}
</style>
