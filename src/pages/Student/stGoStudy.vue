
<template>
  <div class="stGoStudy">
    <!-- 头部-学生端  start -->
    <TopHeader></TopHeader>
    <!-- 头部-学生端  end -->

    <!-- iframe start -->
    <div class="main">
      <div class="dragIframe" @mousedown.prevent="moveIframe($event)">
        <iframe :src="stChannelList.sceneServerUrl" frameborder="0"></iframe>
        <div class="layer">
          <!-- 拖拽demo -->
          <div
            class="carMessage"
            v-for="(item,index) in stChannelList.stCourseList"
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
                      @click.stop="goStudy(item,index,stChannelList.stCourseList)"
                    >去学习</a>
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
      <!-- 返回按钮 start -->
      <CallBackBtn></CallBackBtn>
      <!-- 返回按钮 end -->

      <!-- 标题板 start -->
      <TitlePlugin></TitlePlugin>
      <!-- 标题板 end -->

      <!-- 课程完成情况 start -->
      <CourseInfo></CourseInfo>
      <!-- 课程完成情况 end -->
    </div>
    <!-- iframe end -->
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, tipsMsg, tipsFail } from "../../utils/utils";
import TopHeader from "../Header/headerp";
import CallBackBtn from "./callBackBtn";
import TitlePlugin from "./titlePlugin";
import CourseInfo from "./courseInfo";
import {
  stChannelData,
  sandTablePlanLearningState
} from "../../service/studentApi";
const StudentMod = namespace("student");
@Component({
  name: "StGoStudy",
  directives: {
    Clickoutside
  },
  components: {
    TopHeader,
    CallBackBtn,
    TitlePlugin,
    CourseInfo
  }
})

// stChannelList
export default class StGoStudy extends Vue {
  @StudentMod.State("stChannelList") stChannelList; //沙盘课程频道-学生沙盘课程频道数据
  @StudentMod.Action("stChannelListHandle") stChannelListHandle; //沙盘课程频道-学生沙盘课程频道数据

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

  //返回按钮
  @Emit callBack() {
    console.log(111);
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    console.log(groupId, coursePlanId, coursePlanType);
    this.$router.push({
      path: "StudentChannel",
      query: {
        groupId,
        coursePlanId,
        coursePlanType
      }
    });
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
      let stChannelList = cloneObj(this.stChannelList);
      if (t < 233) {
        stChannelList.stCourseList[index].ceilOrFloor = 1;
        stChannelList.stCourseList[index].showDialog = 1;
        stChannelList.stCourseList[index].index = index;
      } else if (t > 833) {
        stChannelList.stCourseList[index].ceilOrFloor = 0;
        stChannelList.stCourseList[index].showDialog = 1;
        stChannelList.stCourseList[index].index = index;
      } else if (t >= 233 && t <= 833) {
        stChannelList.stCourseList[index].ceilOrFloor = 0;
        stChannelList.stCourseList[index].showDialog = 1;
        stChannelList.stCourseList[index].index = index;
      }
      this.stChannelListHandle({
        stChannelList: stChannelList
      });
      console.log(this.stChannelList);
    }
  }
  // 点击区域外隐藏弹框
  @Emit outsideClick(index) {
    let stChannelList = cloneObj(this.stChannelList);
    stChannelList.stCourseList[index].showDialog = 0;
    console.log(stChannelList);
    this.stChannelListHandle({
      stChannelList: stChannelList
    });
    console.log(this.stChannelList);
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

  // 去学习
  @Emit goStudy(data, index, list) {
    console.log(data);
    console.log(index);
    let latestNeedLearnCourseId = data.courseId;
    console.log(latestNeedLearnCourseId);

    // let address = this.$route.name;
    // console.log(address);
    // this.$router.push({
    //   path: "/previewMain",
    //   query: {
    //     courseId: data.courseId,
    //     preview: 1,
    //     address: address,
    //     displayR: true
    //   }
    // });
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId; // tpe标准课
    let baseUrl = window.location.href.split("#")[0] + "";
    let address = this.$route.name; // 原页面跳转
    this.$router.push({
      path: "/previewMain",
      query: {
        courseId: data.courseId,
        preview: 1,
        address: address,
        displayR: true,
        refId: latestNeedLearnCourseId,
        groupId: groupId,
        courId: coursePlanId,
        courseType: data.courseType
      }
    });
  }

  created() {
    let channelId = this.$route.query.channelId;
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    stChannelData({
      channelId,
      groupId,
      coursePlanId
    })
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          let stChannelList = res.data.stChannelData;
          this.stChannelListHandle({
            stChannelList: stChannelList
          });
          console.log(this.stChannelList);
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });

    // // 学生端沙盘课程频道学生课程接口
    // sandTablePlanLearningState({ groupId, coursePlanId })
    //   .then(res => {
    //     console.log(res);
    //     if (res.code === 0) {
    //     } else {
    //       tipsFail(res.msg);
    //     }
    //   })
    //   .catch(err => {
    //     tipsFail(err);
    //   });
  }
}
</script>

<style lang="scss" scoped>
.stGoStudy {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.main {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 60px);
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
}
.newCourse {
  width: 70px;
  height: 70px;
  position: absolute;
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
    background: url("../../assets/creator/sandTable/icon-new-hover.svg")
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
  background: url("../../assets/creator/sandTable/icon-new-new.svg") no-repeat;
}
.hasMoveBg {
  background: url("../../assets/creator/sandTable/icon-new-hasMove.svg")
    no-repeat;
}
</style>
