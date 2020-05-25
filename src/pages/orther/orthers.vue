/**

* Created by wangxin

* @date 2019/8/29 17:56

*/
<template>
  <div>
    <TopHeader />
    <ConfirmDialog v-if="dialogShow" :diaCbFun="diaCbFun" />
    <div class="w1200">
      <iframe v-if="src!==''" id="iframeOther" :src="src"></iframe>
      <div class="btn-box" v-if="btnShowCount">
        <!--<div class="btn-box" v-if="btnShow">-->
        <ButtonSub :content="btnContext" :btnCbFun="btnCbFun" />
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { getUrlParams, tipsFail } from "../../utils/utils";
import {
  getStudentDetails,
  putStudentCreaterReport
} from "../../service/ortherApi";
import TopHeader from "./../Header/creatorHeader";
import ButtonSub from "../common/buttonSub";
import ConfirmDialog from "./confirmDialog";

@Component({
  name: "orther",
  components: {
    TopHeader,
    ButtonSub,
    ConfirmDialog
  }
})
export default class Orther extends Vue {
  // src =
  //   'http://192.168.10.21:8010/emp/index.html?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=http://192.168.10.21:9000/luyou-ms-auth-server/learningRecordStore/&token=123456&content_token=1-1-67';
  src = "";
  btnShow = false;
  dialogShow = false;
  btnContext = "";
  coursePlanType = "";
  coursePlanId = "";
  groupId = "";
  courseId = "";
  postMessage = false; //子页面传递消息给父页面 当接收到进度为100时 显示生成报告

  get btnShowCount() {
    if (this.btnContext === "查看报告") {
      return true;
    } else if (this.btnContext === "生成报告" && this.postMessage) {
      return true;
    }
  }

  //生成报告按钮
  @Emit btnCbFun() {
    if (this.btnContext === "生成报告") {
      this.dialogShow = true;
    } else {
      let content_token = getUrlParams("content_token", this.src);
      content_token = content_token.split("-");
      if (this.coursePlanType === 2) {
        this.$router.push(
          "/StudentReportsChannel?coursePlanId=" +
            content_token[1] +
            "&groupId=" +
            content_token[0] +
            "&typeId=" +
            content_token[2] +
            "&courseId=" +
            content_token[2]
        );
      } else {
        this.$router.push(
          "/StudentReports?coursePlanId=" +
            content_token[1] +
            "&groupId=" +
            content_token[0] +
            "&typeId=" +
            content_token[2] +
            "&courseId=" +
            content_token[2]
        );
      }
    }
  }

  //弹框回调方法
  @Emit diaCbFun(type) {
    if (type === "hide") {
      this.dialogShow = false;
    } else if (type === "commit") {
      //提交
      this.putStudentCreaterReportFun();
    }
  }

  //生成报告接口
  @Emit putStudentCreaterReportFun() {
    putStudentCreaterReport({
      coursePlanId: this.coursePlanId,
      groupId: this.groupId,
      courseId: this.courseId
    }).then(res => {
      if (res.code == 0) {
        this.btnContext = "查看报告";
        let content_token = getUrlParams("content_token", this.src);
        content_token = content_token.split("-");
        if (this.coursePlanType === 2) {
          this.$router.push(
            "/StudentReportsChannel?coursePlanId=" +
              content_token[1] +
              "&groupId=" +
              content_token[0] +
              "&typeId=" +
              content_token[2] +
              "&courseId=" +
              content_token[2]
          );
        } else {
          this.$router.push(
            "/StudentReports?coursePlanId=" +
              content_token[1] +
              "&groupId=" +
              content_token[0] +
              "&typeId=" +
              content_token[2] +
              "&courseId=" +
              content_token[2]
          );
        }
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //获取详情接口
  @Emit getStudentDetailsFun() {
    getStudentDetails({
      coursePlanId: this.coursePlanId,
      groupId: this.groupId,
      courseId: this.courseId
    }).then(res => {
      console.log(res);
      console.log(111);
      if (res.code == 0) {
        this.coursePlanType = res.data.coursePlanType;
        if (res.data.finishFlag || res.data.expireFlag) {
          //结束
          this.btnContext = "查看报告";
        } else {
          //未结束
          this.btnContext = "生成报告";
        }
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    console.log(222);
    console.log(this.src);
    console.log(this.$route.query);
    let isShow = this.$route.query.show;
    console.log(isShow);
    if (this.$route.query.url) {
      this.src = decodeURIComponent(this.$route.query.url);
      console.log(this.src);
    }
    if (isShow == "1" || isShow == undefined) {
      //老师端 不显示生成报告按钮
      console.log(111);
    } else {
      let str = getUrlParams("content_token", this.src);
      console.log(str);

      if (getUrlParams("content_token", this.src)) {
        this.btnShow = true;
        let content_token = getUrlParams("content_token", this.src);
        content_token = content_token.split("-");
        this.coursePlanId = content_token[1];
        this.groupId = content_token[0];
        this.courseId = content_token[2];
        this.getStudentDetailsFun(); //获取详情
      }

      if (getUrlParams("btnContext") === true) {
        this.btnContext = "查看报告";
      } else {
        this.btnContext = "生成报告";
      }
    }
  }

  timer = null;

  mounted() {
    this.timer = setInterval(() => {
      let $video = $("#iframeOther")
        .contents()
        .find("iframe")
        .contents()
        .find("video");
      $video.attr("controls", "true");
      $video.attr("controlslist", "nodownload");
      $video.on("contextmenu", function() {
        console.log(333);
        return false;
      });
    }, 300);

    window.onmessage = () => {
      if (event.data.pagePosition && event.data.pagePosition === "lastPage") {
        this.postMessage = true;
      } else {
        this.postMessage = false;
      }
    };

    /* setTimeout(()=>{
      let myframe = document.getElementById('iframeOther');//获取iframe
      myframe.contentWindow.postMessage({
        type:'chapterClick',
        sendBack:'#/lessons/dts39lINHZYGrF8XOvTDmaNZ9_KkTaFz'
      },'*');//childDomain是子页面的源（协议+主机+端口号）
    },3000)*/
  }

  destroyed() {
    clearInterval(this.timer);
    window.onmessage = null;
  }
}
</script>

<style lang="scss" scoped>
.w1200 {
  width: 100%;
  height: calc(100vh - 70px);
  iframe {
    width: 100%;
    height: 100%;
    //border: none;
  }
  .btn-box {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }
}
</style>
