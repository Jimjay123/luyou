
<template>
  <div class="sandTablePreview">
    <!-- iframe start -->
    <div class="dragIframe" @mousedown.prevent="moveIframe($event)">
      <iframe :src="previewList.sceneServerUrl" frameborder="0"></iframe>
      <div class="layer">
        <!-- 拖拽demo -->
        <div
          class="carMessage"
          v-for="(item,index) in previewList.stCourseList"
          :key="item.creListIndex"
          :style="{
            top: item.positionY+'px',
            left:item.positionX+'px',
          }"
        >
          <div
            class="newCourse"
            :key="item.creListIndex"
            :class="item.showBg===1?'newCourseBg':'hasMoveBg'"
            @click.stop="showClick(index,$event)"
            @mousedown="showTipsCount"
            @mouseup="showTipsCount"
          >
            <p>{{index+1}}</p>
          </div>
          <!-- 弹框显示 start -->
          <div v-if="item.showDialog===1">
            <div
              :class="item.ceilOrFloor===0?'showBoxCeiling':'showBoxFloor'"
              v-Clickoutside="()=>{outsideClick(index)}"
            >
              <div class="bigBox">
                <div class="title">{{item.courseName}}</div>
                <div class="word">{{item.mainContent}}</div>
                <div class="bottom">
                  <a
                    class="goStudy"
                    href="javascript:;"
                    @click.stop="goPreview(item,item.courseServerUrl)"
                  >预览</a>
                </div>
              </div>
              <div class="triangle"></div>
            </div>
          </div>
          <!-- 弹框显示 end -->
        </div>
      </div>

      <!-- 拖拽demo -->
    </div>
    <!-- iframe end -->

    <!-- 返回按钮 start -->
    <!-- <CallBackBtn></CallBackBtn> -->
    <!-- 返回按钮 end -->

    <!-- 标题板 start -->
    <TitlePlugin :channelName="channelName"></TitlePlugin>
    <!-- 标题板 end -->

    <!-- 课程完成情况 start -->
    <CourseInfo :stCourseList="stCourseList"></CourseInfo>
    <!-- 课程完成情况 end -->
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, tipsMsg, tipsFail } from "../../../utils/utils";

import CallBackBtn from "./callBackBtn";
import TitlePlugin from "./titlePlugin";
import CourseInfo from "./courseInfo";
import { previewStChannelData } from "../../../service/sandTableApi";
const SandTableMod = namespace("sandTable");
@Component({
  name: "SandTablePreview",
  directives: {
    Clickoutside
  },
  components: {
    CallBackBtn,
    TitlePlugin,
    CourseInfo
  }
})
export default class SandTablePreview extends Vue {
  @SandTableMod.State("previewList") previewList; //沙盘课程频道-添加课程
  @SandTableMod.Action("previewListHandle") previewListHandle; //沙盘课程频道-添加课程

  get channelName() {
    return this.previewList.channelName;
  }
  get stCourseList() {
    return this.previewList.stCourseList;
  }
  // method
  // 拖拽背景 moveIframe
  @Emit moveIframe(e) {
    var iframeBox = document.querySelector(".dragIframe");
    console.log(iframeBox + "拖拽");
    // let odiv = e.target; //获取目标元素

    //算出鼠标相对元素的位置
    let boxX = e.clientX - iframeBox.offsetLeft;
    let boxY = e.clientY - iframeBox.offsetTop;
    document.onmousemove = e => {
      //鼠标按下并移动的事件
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let l = e.clientX - boxX;
      let t = e.clientY - boxY;
      //移动当前元素
      iframeBox.style.left = l + "px";
      iframeBox.style.top = t + "px";
    };
    document.onmouseup = e => {
      document.onmousemove = null;
      document.onmouseup = null;

      e = e || window.event;
      if (e.stopPropagation) {
        //W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法
      }
    };
  }
  // 点击显示弹框  ceilOrFloor
  @Emit showClick(index, e) {
    if (
      this.mousedownX === this.mouseupX &&
      this.mousedownY === this.mouseupY
    ) {
      //
      var odiv = document.querySelectorAll(".carMessage")[index];
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;

      let l = e.clientX - disX;
      let t = e.clientY - disY;
      let previewList = cloneObj(this.previewList);
      if (t < 233) {
        previewList.stCourseList[index].ceilOrFloor = 1;
        previewList.stCourseList[index].showDialog = 1;
        previewList.stCourseList[index].index = index;
      } else if (t > 833) {
        previewList.stCourseList[index].ceilOrFloor = 0;
        previewList.stCourseList[index].showDialog = 1;
        previewList.stCourseList[index].index = index;
      } else if (t >= 233 && t <= 833) {
        previewList.stCourseList[index].ceilOrFloor = 0;
        previewList.stCourseList[index].showDialog = 1;
        previewList.stCourseList[index].index = index;
      }
      this.previewListHandle({
        previewList: previewList
      });
      console.log(this.previewList);
    }
  }
  // 点击区域外隐藏弹框
  @Emit outsideClick(index) {
    let previewList = cloneObj(this.previewList);
    previewList.stCourseList[index].showDialog = 0;
    console.log(previewList);
    this.previewListHandle({
      previewList: previewList
    });
    console.log(this.previewList);
  }

  mousedownX = 0;
  mousedownY = 0;
  mouseupX = 0;
  mouseupY = 0;
  showTipsCount() {
    let type = event.type;
    if (type === "mousedown") {
      this.mousedownX = event.x;
      this.mousedownY = event.y;
    } else if (type === "mouseup") {
      this.mouseupX = event.x;
      this.mouseupY = event.y;
    }
  }
  // 预览
  @Emit goPreview(item, url) {
    console.log(item);
    // 沙盘npe||沙盘tpe
    let address = this.$route.name;
    console.log(address);
    // 原页面跳转
    this.$router.push({
      path: "/previewMain",
      query: {
        courseId: item.courseId,
        preview: 1,
        address: address,
        displayR: true
      }
    });
    // if (courseType == 3) {
    //   //tpe沙盘标准课
    //   window.location.href = url;
    // } else if (courseType == 4) {
    //   //npe沙盘标准课
    //   window.location.href = url + "&preview=1";
    // }

    // window.location.href = url + "&preview=1";

    // this.$router.push({
    //   path: url
    // });

    // 新页面跳转
    // let address = this.$route.name;
    // window.open(
    //   window.location.href.split("#")[0] +
    //     "#/orther?address=" +
    //     address +
    //     "&url=" +
    //     encodeURIComponent(url)
    //   // "#/orther?url=" +
    //   // encodeURIComponent(url) +
    //   // "address=" +
    //   // address
    // );
  }

  created() {
    console.log(this.channelName);
    console.log(this.previewList);
    let channelId = this.$route.query.channelId;
    previewStChannelData({ channelId: channelId })
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          let previewList = res.data.stChannelData;
          this.previewListHandle({
            previewList: previewList
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
  }
  updated() {
    console.log(this.channelName);
  }
}
</script>

<style lang="scss" scoped>
.sandTablePreview {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.dragIframe {
  width: 1920px;
  height: 1080px;
  position: relative;
}

.layer {
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 200;
  position: absolute;
  left: 0;
  top: 0;
}
iframe {
  width: 100%;
  height: 100%;
}
.carMessage {
  width: 70px;
  height: 70px;
  position: absolute;
  // top: 51%;
  // left: 52%;
  // transform: translate(-51%, -52%);
}
// .vdr .active {
//   width: 0;
//   height: 0;
//   top: 51%;
//   left: 52%;
//   transform: translate(-51%, -52%);
// }

.newCourse {
  width: 70px;
  height: 70px;
  position: absolute;
  // top: 51%;
  // left: 52%;
  // transform: translate(-51%, -52%);
  // background: url(require("../../../assets/creator/sandTable/icon-newCourse-new.svg"))
  //   no-repeat;
  background-repeat: no-repeat;
  cursor: pointer;
  text-align: center;
  p {
    position: absolute;
    left: 20px;
    top: 22px;
    font-size: 24px;
    font-family: "GalanoGrotesque";
    font-weight: bold;
    color: #fff;
    line-height: 24px;
    text-align: center;
    width: 30px;
  }
  &:hover {
    background: url("../../../assets/creator/sandTable/icon-new-hover.svg")
      no-repeat;
    p {
      top: 17px;
    }
  }
}

//弹框显示
.showBoxCeiling {
  width: 260px;
  height: 198px;
  position: absolute;
  top: -195px;
  left: 50%;
  transform: translateX(-50%);
  .bigBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 260px;
    height: 191px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.18);
    border-radius: 6px;
    padding: 12px 20px;
    .title {
      padding: 0 12px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      text-align: center;
      margin-bottom: 6px;
    }
    .word {
      width: 220px;
      height: 85px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      margin-bottom: 12px;
    }
    .bottom {
      bottom: 15px;
      right: 16px;
      position: absolute;
      .goStudy {
        display: inline-block;
        text-align: center;
        width: 56px;
        height: 24px;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 14px;
        // 字
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
      }
    }
  }
  .triangle {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0px;
    height: 0px;
    border: 7px solid #666;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-top-color: rgba(255, 255, 255, 1);
  }
}
.showBoxFloor {
  width: 260px;
  height: 198px;
  position: absolute;
  top: 74px;
  left: 50%;
  transform: translateX(-50%);
  .bigBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 260px;
    height: 191px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.18);
    border-radius: 6px;
    padding: 12px 20px;
    .title {
      padding: 0 12px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      text-align: center;
      margin-bottom: 6px;
    }
    .word {
      width: 220px;
      height: 85px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      margin-bottom: 12px;
    }
    .bottom {
      bottom: 15px;
      right: 16px;
      position: absolute;
      .goStudy {
        display: inline-block;
        text-align: center;
        width: 56px;
        height: 24px;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 14px;
        // 字
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
      }
    }
  }
  .triangle {
    position: absolute;
    bottom: 197px;
    left: 50%;
    transform: translateX(-50%);
    width: 0px;
    height: 0px;
    border: 7px solid #666;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #fff;
    border-top-color: transparent;
  }
}
.newCourseBg {
  background: url("../../../assets/creator/sandTable/icon-new-new.svg")
    no-repeat;
}
.hasMoveBg {
  background: url("../../../assets/creator/sandTable/icon-new-hasMove.svg")
    no-repeat;
}
</style>
