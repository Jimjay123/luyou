<template>
  <div class="upload elements">
    <div class="imgBox">
      <img :src="file.url" v-show="file.url" alt>
    </div>
    <div class="wordBox">
      <p class="word" style="margin-bottom:14px">
        根据您的偏好和风格，我们的设计团队创作的绝佳图片能让您的课程脱颖而出。
        <br>
        <span>获取免费图片。</span>
      </p>
      <p class="word" style="margin-bottom:10px">如果您自己创建图片，必须符合我们的课程图片质量标准才能被接受。</p>
      <p class="word" style="margin-bottom:26px">重要指南：750*422像素；jpg、jpeg、gif或png,且图片上无文字。</p>
      <div style="width:70%">
        <el-input disabled="disabled" :value="file.name">
          <el-button slot="append" size="mini" class="innerBtn" @click="clickUpload">上传图片</el-button>
        </el-input>
        <input type="file" style="display:none;" ref="file" @change="changePic">
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "upload"
})
export default class Upload extends Vue {
  @Prop({
    required:false,
    default:()=>{
      return {}
    }
  }) file;

  @Prop({
    default:null,
    required:false,
  }) fileCb;

  //回调方法校验
  fileCbFun(type,val){
    if(typeof this.fileCb==='function'){
      this.fileCb(type,val);
    }
  }

  img = "";
  inputWord = "没有选择文件";

  clickUpload() {
    this.$refs.file.click();
  }

  changePic(evt) {
    console.log(evt.currentTarget.files);
    let file=evt.currentTarget.files[0];
    this.inputWord = file.name;
    //this.loadFile(file);
    this.fileCbFun('add',file);
    evt.target.value='';
  }

  loadFile(file) {
    // let image = new FileReader();
    // image.readAsArrayBuffer(file);
    // image.onload = (evt) => {
    //     console.log(image);
    // }
    let URL = window.URL || window.webkitURL;
    let imageURL = URL.createObjectURL(file);
    this.img = imageURL;
  }
  updated(){
    console.log(this.file)
  }
}
</script>
<style lang="scss" scoped>
.upload {
  overflow: auto;
  .imgBox {
    width: 330px;
    height: 185px;
    margin: 20px 0 30px 0;
    border: solid 1px #e6e6e6;
    border-radius: 4px;
    background: url(../../../../assets/creator/upload_btn.png) no-repeat;
    background-size: 120px 112px;
    background-position: center center;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img{
        max-width:100%;
    }
  }
  .wordBox {
    width: 705px;
    float: left;
    margin-left: 45px;
    margin-top: 20px;
    .word {
      color: #999;
      font-size: 14px;
      line-height: 18px;
      span {
        color: #333;
      }
    }
    .innerBtn {
      background: white;
      color: #fe7865;
      height: 38px;
      float: right;
      padding: 0 15px;
    }
  }
}
</style>


