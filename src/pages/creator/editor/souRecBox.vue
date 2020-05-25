/**

* Created by wangxin

* @date 2019/9/19 12:19  右侧面板--录音组件

*/
<template>
  <div class="record">
    <!--录制 start-->
    <div v-if="recordStatus==='normal'" class="normal">
      <div class="top" @click="recordFun">
        <img :src="require('../../../assets/creator/editor/record.svg')" alt="">
        <span>开始录制</span>
      </div>
      <p>本页可录制3分钟旁白语音</p>
    </div>
    <!--录制 end-->

    <!--开始录音 start-->
    <div v-else-if="recordStatus==='start'" class="box start">
      <div class="top" @click="recordFun">
        <div class="voice">
          <img :src="require('../../../assets/creator/editor/voice.svg')" alt="">
        </div>
        <!--<div class="play">
          <img  :src="require('../../../assets/creator/editor/play.svg')" alt="">
        </div>-->
        <span>{{showTime}}</span>
      </div>
      <p class="btn-box">
        <a class="stopBtn" href="javascript:;" @click="stopFun">暂停</a>
        <a class="gray" href="javascript:;">删除</a>
      </p>
    </div>
    <!--开始录音 end-->

    <!--暂停 start-->
    <div v-else-if="recordStatus==='stop'" class="box stop">
      <div class="top" @click="recordFun">
        <div class="voice">
          <img :src="require('../../../assets/creator/editor/voice.svg')" alt="">
        </div>
        <div class="play" @click.stop="playFun">
          <img :src="require('../../../assets/creator/editor/play.svg')" alt="">
        </div>
        <span>{{showTime}}</span>
      </div>
      <p class="btn-box">
        <a class="green" href="javascript:;" @click="resumeFun">继续</a>
        <a class="del" href="javascript:;">删除</a>
      </p>
    </div>
    <!--暂停 end-->

    <!--结束 start-->
    <div v-else-if="recordStatus==='end'" class="box end">
      <div class="top" @click="recordFun">
        <div class="voice">
          <img :src="require('../../../assets/creator/editor/voice.svg')" alt="">
        </div>
        <div class="play" @click.stop="playFun">
          <img :src="require('../../../assets/creator/editor/play.svg')" alt="">
        </div>
        <span>{{showTime}}</span>
      </div>
      <p class="btn-box">
        <a class="gray" href="javascript:;">继续</a>
        <a class="del" href="javascript:;" @click="delAudio">删除</a>
      </p>
    </div>
    <!--结束 end-->

    <audio
      @canplay="getCount"
      @timeupdate="timeUpdate"
      @durationchange="getCount"
      id="audio1"
      ref="audio"
      :src="radioServerUrl"
      controls="controls"
      preload
      hidden
    ></audio>
    <!--<audio id="audio1" ref="audio" src="http://mp3.9ku.com/m4a/186947.m4a" controls="controls" preload hidden></audio>-->
  </div>
</template>

<script>
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
  import {updateRadioPageMediaFun,delPageMediaRadioFun} from '../../../service/editor/editorAction';
  import Record from '../../../utils/record/record-sdk';
  import { State, Action, namespace } from "vuex-class";
  import {cloneObj} from "../../../utils/utils";
  const EditMod = namespace("edit");

  @Component({
    name: 'SouRecBox',
  })
  export default class SouRecBox extends Vue {
    @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
    @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

    @EditMod.State("editList") editList; //编辑文档数据
    @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

    @EditMod.State("courseInfo") courseInfo; //编辑文档数据

    //recordStatus = 'normal';// normal 开始展示 start开始录音  stop暂停  end录音结束

    controls = '';
    mediaRecorder = {};
    timer = null;//计时器方法
    count = 0;//时间
    recordedChunks = [];
    recorder = new Record();
    src='';

    //音频文件地址
    get radioServerUrl(){
      return this.editList[this.editIndex].rightNav.radioServerUrl||''
    }

    //音频文件状态
    get recordStatus(){
      return this.editList[this.editIndex].rightNav.recordStatus||'normal'
    }

    audioObj={};
    //监听元素变化
    get total(){
      let audio=document.getElementById("audio1");
      this.audioObj={
        duration:audio.duration,
        currentTime:audio.currentTime,
      }
    }

    //录音暂停
    stopFun() {
      clearInterval(this.timer);
      this.recorder.stopRecord({
        success:(data)=>{
          let Obj=new FormData();
          let name=new Date()*1000;
          let file = new File([data],name+'.mp3', {type: 'audio/mp3', lastModified: Date.now()});
          Obj.append('file',file);
          Obj.append('courseId',this.courseInfo.courseId);
          updateRadioPageMediaFun(Obj);
        },
        error:(err)=>{
          console.log(err);
        }
      });
      this.changeRecordStatus('stop');
    }

    //录音继续
    resumeFun() {
      this.recorder.start();
      this.changeRecordStatus('start');
      clearInterval(this.timer);
      this.setTimeFun();
    }

    //获取语音时长
    getCount(){
      this.count=parseInt(event.target.duration);
      console.log('获取录音长度')
    }

    //音频播放时长发生变化
    timeUpdate(){
      this.count=parseInt(event.target.currentTime);
    }

    //删除录音文件
    delAudio(){
      let editList=cloneObj(this.editList);
      editList[this.editIndex].rightNav.radioServerUrl='';
      editList[this.editIndex].rightNav.recordStatus='normal';
      delPageMediaRadioFun({
        attachId:　editList[this.editIndex].radioAttachId,
      });
    }

    //时间展示字段
    get showTime() {
      let count = this.count;
      if (count >= 180) {
        return '03:00'
      } else if (count >= 120) {
        let c = count - 120;
        c = c >= 10 ? c : 0 + '' + c;
        return '02:' + c;
      } else if (count >= 60) {
        let c = count - 60;
        c = c >= 10 ? c : 0 + '' + c;
        return '01:' + c;
      } else {
        let c = count;
        c = c >= 10 ? c : 0 + '' + c;
        return '00:' + c;
      }
    }

    //定时器方法
    setTimeFun() {
      this.timer = setInterval(() => {
        if (this.count >= 180) {
          this.stopFun();
          this.changeRecordStatus('end');
          clearInterval(this.timer);
        } else {
          this.count += 1;
        }
        console.log('this.count', this.count);
      }, 1000)
    }

    //播放
    playFun(){
      let audio = document.getElementById('audio1');
      audio.play();
    }

    //录音回调方法
    @Emit recordFun() {
      this.isFinished = false;
      this.recorder.startRecord({
        success: res => {
          console.log("sdk---start record successfully.");
          //录音开始
          this.changeRecordStatus('start');
          this.setTimeFun();
        },
        error: res => {
          console.log("sdk---start record failed.");
        }
      });
    }

    //修改录音状态
    changeRecordStatus(val){
      let editList=cloneObj(this.editList);
      editList[this.editIndex].rightNav.recordStatus=val;
      this.editListHandle({editList})
    }

    mounted(){

    }
  }
</script>

<style lang="scss" scoped>
  .record {
    font-size: 12px;
  }

  .top {
    width: 100%;
    height: 32px;
    box-shadow: 0px 0px 3px 0px rgba(189, 189, 189, 0.5);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    cursor: pointer;
    position: relative;
    img {
      width: 20px;
      height: 20px;
    }
    span {
      vertical-align: middle;
      font-size: 12px;
      color: rgba(102, 102, 102, 1);
      font-weight: 400;
      margin-left: 5px;
    }
  }

  p {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(179, 179, 179, 1);
    text-align: center;
  }

  .box {
    .top {
      background: rgba(255, 255, 255, 0.01);
    }
    .voice {
      position: absolute;
      top: 0;
      left: 0;
      height: 32px;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    .play {
      position: absolute;
      top: 0;
      right: 0;
      height: 32px;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
  }

  .btn-box {
    display: flex;
    justify-content: space-between;
    a {
      display: inline-block;
      width: 74px;
      height: 20px;
      line-height: 20px;
      background: rgba(245, 245, 245, 1);
      border-radius: 4px;
    }
  }

  .stopBtn {
    color: #FE7865;
  }

  .del {
    color: #4D4D4D;
  }

  .gray {
    color: #ccc;
  }

  .green {
    color: #24CCB8;
  }
</style>
