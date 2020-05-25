<template>
  <div class="leftMain">
    <!-- <img class="bgImg" :src="sandTable.sceneServerUrl" alt v-if="bgImgStatus===0" /> -->

    <iframe
      class="bgImg"
      :src="sandTable.defaultSceneServerUrl"
      frameborder="0"
      v-if="bgImgStatus===0"
    ></iframe>
    <!-- <div class="moveIframe"> -->
    <div class="dragIframe" @mousedown.prevent="moveIframe($event)" v-if="bgImgStatus===1">
      <iframe :src="sandTable.sceneServerUrl" frameborder="0"></iframe>
      <div class="layer">
        <div class="addCourse" id="addNewCourse" @click.stop="addCourse('add')">
          <p>+</p>
        </div>
        <!-- 拖拽demo -->
        <div
          class="carMessage"
          @mousedown.stop="move($event,index)"
          v-for="(item,index) in sandTable.stCourseList"
          :key="item.creListIndex"
          :style="{
            top: item.positionY+'px',
            left:item.positionX+'px',
          }"
        >
          <div
            class="newCourse"
            v-if="newCourseShow===1"
            :key="item.creListIndex"
            :class="item.showBg===1?'newCourseBg':'hasMoveBg'"
            @click.stop="showClick(index,$event)"
            @mousedown="showTipsCount"
            @mouseup="showTipsCount"
          >
            <!-- :style="{background: 'url(' + item.showBg===1?newCourseBg:hasMoveBg + ') no-repeat'}" -->
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
                  <div class="preview" @click.stop="goPreview(index,item.courseServerUrl)">
                    <img src="../../../assets/creator/sandTable/icon-preview.svg" alt />
                    <span>预览</span>
                  </div>
                  <a
                    class="change"
                    href="javascript:;"
                    @click.stop="changeCourse(index,'change')"
                  >替换</a>
                  <a class="del" href="javascript:;" @click.stop="delCourse(index,'del')">删除</a>
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
    <!-- </div> -->

    <!-- 未上传图片 start -->
    <div class="btn" v-if="bgImgStatus===0">
      <a href="javascript:;" @click.stop="clickFun">上传场景</a>
    </div>
    <!-- 未上传图片按钮 end -->

    <!-- 已上传图片 start -->
    <!-- <div class="hasBgImg" v-if="bgImgStatus===1"></div> -->
    <!-- 已上传图片 end -->

    <!-- exit start -->
    <div class="exit" @click="exit">退出</div>
    <!-- exit end -->

    <!-- change start -->
    <div class="changeBtn" v-if="bgImgStatus===1" @click.stop="clickFun">替换场景</div>
    <!-- change end -->

    <!-- 添加课程弹框 start -->
    <primary />
    <!-- 添加课程弹框 end -->

    <!-- 已上传图片 end -->
    <input id="filElem" ref="filElem" type="file" @change="uploadFiles" hidden />
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, tipsMsg, tipsFail } from "../../../utils/utils";
import { putFileCourseImageUpload } from "../../../service/creatorApi";
import VueDragResize from "vue-drag-resize";
import primary from "./primary";
import {
  newStChannel,
  stChannelSceneUpload,
  stChannelNewOperate,
  universityAvailCourseList
} from "../../../service/sandTableApi";

const SandTableMod = namespace("sandTable");
const creatorStore = namespace("creator"); //现 已改
@Component({
  name: "LeftMain",
  directives: {
    Clickoutside
  },
  components: {
    VueDragResize,
    primary
  }
})
export default class LeftMain extends Vue {
  @SandTableMod.State("bgImg") bgImg; //当前编辑模块的下标
  @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前编辑模块的下标  action

  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前编辑模块的下标
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前编辑模块的下标  action

  @SandTableMod.State("showAddDailog") showAddDailog; //添加课程弹框
  @SandTableMod.Action("showAddDailogHandle") showAddDailogHandle; //添加课程弹框  action

  @SandTableMod.State("addOrChangeCourse") addOrChangeCourse; //添加课程弹框 add or change
  @SandTableMod.Action("addOrChangeCourseHandle") addOrChangeCourseHandle; //添加课程弹框  add or change

  @SandTableMod.State("sandTable") sandTable; //沙盘课程频道-添加课程
  @SandTableMod.Action("sandTableHandle") sandTableHandle; //沙盘课程频道-添加课程

  @SandTableMod.State("uploadBg") uploadBg; //沙盘课程频道-上传背景
  @SandTableMod.Action("uploadBgHandle") uploadBgHandle; //沙盘课程频道-上传背景

  @SandTableMod.State("creList") creList; //新建竖版列表
  @SandTableMod.Action("creListHandle") creListHandle; //新建竖版列表  action修改方法

  @SandTableMod.State("tabList") tabList; //沙盘课程频道-选中课程
  @SandTableMod.Action("tabListHandle") tabListHandle; //沙盘课程频道-选中课程

  @SandTableMod.State("tabListIndex") tabListIndex; //沙盘课程频道-选中课程
  @SandTableMod.Action("tabListIndexHandle") tabListIndexHandle; //沙盘课程频道-选中课程

  @SandTableMod.State("headIconList") headIconList; //沙盘课程频道-选中课程
  @SandTableMod.Action("headIconListHandle") headIconListHandle; //沙盘课程频道-选中课程

  newCourseShow = 0; //新课程是否显示
  count = 0; //点击次数
  showDialog = 0; //当前课程弹框 0 不显示 1显示

  // methods
  // 退出沙盘课程
  @Emit exit() {
    this.$router.push({
      path: "/creator/home"
    });
  }

  // 添加课程
  addCourse() {
    console.log(this.tabList);
    console.log(this.creList);
    console.log("上传");
    this.newCourseShow = 1;
    let showAddDailog = 1;
    this.showAddDailogHandle({
      showAddDailog: showAddDailog
    });
    console.log(this.showAddDailog);
    let addOrChangeCourse = cloneObj(this.addOrChangeCourse); // change
    addOrChangeCourse.num = 0;
    console.log(addOrChangeCourse);
    this.addOrChangeCourseHandle({
      addOrChangeCourse: addOrChangeCourse
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
      let sandTable = cloneObj(this.sandTable);
      if (t < 233) {
        sandTable.stCourseList[index].ceilOrFloor = 1;
        sandTable.stCourseList[index].showDialog = 1;
        sandTable.stCourseList[index].index = index;
      } else if (t > 833) {
        sandTable.stCourseList[index].ceilOrFloor = 0;
        sandTable.stCourseList[index].showDialog = 1;
        sandTable.stCourseList[index].index = index;
      } else if (t >= 233 && t <= 833) {
        sandTable.stCourseList[index].ceilOrFloor = 0;
        sandTable.stCourseList[index].showDialog = 1;
        sandTable.stCourseList[index].index = index;
      }
      this.sandTableHandle({
        sandTable: sandTable
      });
      console.log(this.sandTable);
    }
  }
  // 点击区域外隐藏弹框
  @Emit outsideClick(index) {
    let sandTable = cloneObj(this.sandTable);
    sandTable.stCourseList[index].showDialog = 0;
    console.log(sandTable);
    this.sandTableHandle({
      sandTable: sandTable
    });
    console.log(this.sandTable);
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

  // 拖拽单独课程
  @Emit move(e, index) {
    var type = e.target.className;
    if (type === "del" || type === "change") {
      return;
    }
    var odiv = document.querySelectorAll(".carMessage")[index];

    // let odiv = e.target; //获取目标元素

    //算出鼠标相对元素的位置
    let disX = e.clientX - odiv.offsetLeft;
    let disY = e.clientY - odiv.offsetTop;
    document.onmousemove = e => {
      //鼠标按下并移动的事件
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let l = e.clientX - disX;
      let t = e.clientY - disY;
      //此处的判断是为了防止拖拽框被拖出屏幕可视区域
      if (l < 45) {
        l = 45;
      } else if (l > 1875) {
        l = 1875;
      }
      if (t < 45) {
        t = 45;
      } else if (t > 1035) {
        t = 1035;
      }
      //移动当前元素
      let sandTable = cloneObj(this.sandTable);
      sandTable.stCourseList[index].positionX = l;
      sandTable.stCourseList[index].positionY = t;
      this.sandTableHandle({
        sandTable: sandTable
      });
    };
    document.onmouseup = e => {
      document.onmousemove = null;
      document.onmouseup = null;
      this.showDialog = -1;

      e = e || window.event;
      if (e.stopPropagation) {
        //W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法
      }
    };
    let sandTable = cloneObj(this.sandTable);
    sandTable.stCourseList[index].showDialog = 0;
    sandTable.stCourseList[index].showBg = 0;
    this.sandTableHandle({
      sandTable: sandTable
    });
    console.log(this.sandTable);
    let data = cloneObj(this.sandTable);
    let headIconList = cloneObj(this.headIconList);
    headIconList[2].isUse = "doing";
    this.headIconListHandle({
      headIconList: headIconList
    });
    stChannelNewOperate(data)
      .then(res => {
        console.log(res);
        if (res.code == 0) {
          let sandTable = cloneObj(this.sandTable);
          sandTable = res.data.currentStChannelData;
          sandTable.previousOperate = res.data.previousOperate;
          this.sandTableHandle({
            sandTable: sandTable
          });

          let headIconList = cloneObj(this.headIconList);
          headIconList[2].isUse = "done";
          this.headIconListHandle({
            headIconList: headIconList
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
  }

  // 预览课程
  @Emit goPreview(index, data) {
    console.log(index, data);
    window.open(
      window.location.href.split("#")[0] +
        "#/orther?url=" +
        encodeURIComponent(data)
    );
  }

  // 替换课程
  @Emit changeCourse(index, type) {
    let addOrChangeCourse = cloneObj(this.addOrChangeCourse); // change
    addOrChangeCourse.num = 1;
    addOrChangeCourse.index = index;
    this.addOrChangeCourseHandle({
      addOrChangeCourse: addOrChangeCourse
    });

    this.newCourseShow = 1;
    let showAddDailog = 1;
    this.showAddDailogHandle({
      showAddDailog: showAddDailog
    });

    let sandTable = cloneObj(this.sandTable);
    sandTable.stCourseList[index].showDialog = 0;
    this.sandTableHandle({
      sandTable: sandTable
    });
  }

  @Emit delCourse(index, type) {
    let sandTable = cloneObj(this.sandTable);
    let creListIndex = sandTable.stCourseList[index].creListIndex; //获取竖版的id
    let courseId = sandTable.stCourseList[index].courseId; //获取竖版的id

    sandTable.stCourseList.splice(index, 1);
    this.sandTableHandle({
      sandTable: sandTable
    });
    let data = cloneObj(this.sandTable);
    //接口
    stChannelNewOperate(data)
      .then(res => {
        console.log(res);
        if (res.code == 0) {
          let sandTable = cloneObj(this.sandTable);
          sandTable = res.data.currentStChannelData;
          sandTable.previousOperate = res.data.previousOperate;
          this.sandTableHandle({
            sandTable: sandTable
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });

    let creList = cloneObj(this.creList);
    creList.map(d => {
      if (courseId === d.courseId) {
        d.isSelected = false;
      }
    });

    this.creListHandle({
      creList
    });

    let tabList = cloneObj(this.tabList);
    tabList.splice(index, 1);
    this.tabListHandle({
      tabList: tabList
    });
    this.tabListIndexHandle({
      tabListIndex: -1
    });
  }
  //上传背景
  @Emit clickFun() {
    this.uploadStart = true;
    this.$refs.filElem.click();
  }

  //上传文件点击事件
  @Emit uploadFiles() {
    // console.log(this.$refs.filElem.file);
    let files = this.$refs.filElem.files[0];
    this.$refs.filElem.value = "";
    if (files) {
      this.setUpFiles(files);
    }
  }

  //发送文件
  @Emit setUpFiles(file) {
    // console.log(file);
    let typeList = file.name.split(".");
    let type = typeList[typeList.length - 1];
    if (!(type === "zip")) {
      tipsMsg("上传文件格式错误");
      return;
    }
    let data = new FormData();
    data.append("file", file);
    data.append("channelId", this.sandTable.channelId);
    //调用上传文件接口
    stChannelSceneUpload(data)
      .then(res => {
        console.log(res);
        console.log(this.sandTable);
        if (res.code === 0) {
          let sandTable = cloneObj(this.sandTable);
          sandTable.sceneServerUrl = res.data.channelSceneUrl;
          this.sandTableHandle({
            sandTable: sandTable
          });
          console.log(this.sandTable);
          let uploadBg = cloneObj(this.uploadBg);
          uploadBg = res.data;
          this.uploadBgHandle({
            uploadBg: uploadBg
          });
          // 实时保存
          let headIconList = cloneObj(this.headIconList);
          headIconList[2].isUse = "doing";
          this.headIconListHandle({
            headIconList: headIconList
          });
          let data2 = cloneObj(this.sandTable);
          console.log(data2);
          stChannelNewOperate(data2)
            .then(res => {
              console.log(res);
              if (res.code == 0) {
                let sandTable = cloneObj(this.sandTable);
                sandTable = res.data.currentStChannelData;
                sandTable.previousOperate = res.data.previousOperate;
                this.sandTableHandle({
                  sandTable: sandTable
                });
                console.log(this.sandTable);
                let headIconList = cloneObj(this.headIconList);
                headIconList[2].isUse = "done";
                this.headIconListHandle({
                  headIconList: headIconList
                });
              } else {
                tipsFail(res.msg);
              }
            })
            .catch(err => {
              tipsFail(err);
            });
          let status = 1;
          this.bgImgStatusHandle({
            bgImgStatus: status
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });

    // // 实时保存
    // let headIconList = cloneObj(this.headIconList);
    // headIconList[2].isUse = "doing";
    // this.headIconListHandle({
    //   headIconList: headIconList
    // });
    // let data2 = cloneObj(this.sandTable);
    // console.log(data2);
    // stChannelNewOperate(data2)
    //   .then(res => {
    //     console.log(res);
    //     if (res.code == 0) {
    //       let sandTable = cloneObj(this.sandTable);
    //       sandTable = res.data.currentStChannelData;
    //       sandTable.previousOperate = res.data.previousOperate;
    //       this.sandTableHandle({
    //         sandTable: sandTable
    //       });
    //       console.log(this.sandTable);
    //       let headIconList = cloneObj(this.headIconList);
    //       headIconList[2].isUse = "done";
    //       this.headIconListHandle({
    //         headIconList: headIconList
    //       });
    //     } else {
    //       tipsFail(res.msg);
    //     }
    //   })
    //   .catch(err => {
    //     tipsFail(err);
    //   });
  }

  created() {
    newStChannel()
      .then(res => {
        console.log(res);
        if (res.code == 0) {
          let sandTable = cloneObj(this.sandTable);
          sandTable = res.stChannelData;
          this.sandTableHandle({
            sandTable: sandTable
          });
          // let data = cloneObj(this.sandTable);
          // stChannelNewOperate(data)
          //   .then(res => {
          //     console.log(res);
          //     if (res.code == 0) {
          //       // let sandTable = cloneObj(this.sandTable);
          //       // sandTable = res.data.currentStChannelData;
          //       // sandTable.previousOperate = res.data.previousOperate;
          //       // this.sandTableHandle({
          //       //   sandTable: sandTable
          //       // });
          //     } else {
          //       tipsFail(res.msg);
          //     }
          //   })
          //   .catch(err => {
          //     tipsFail(err);
          //   });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
  }
  updated() {}
}
</script>

<style lang="scss" scoped>
.leftMain {
  width: 100%;
  height: 100%;
  // min-width: 1245px;
  // min-height: 683px;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.exit {
  position: absolute;
  left: 24px;
  top: 16px;
  width: 52px;
  height: 24px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  z-index: 201;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}
.changeBtn {
  position: absolute;
  right: 24px;
  top: 16px;
  width: 62px;
  height: 24px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  z-index: 201;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}

.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  a {
    display: block;
    width: 134px;
    height: 44px;
    text-align: center;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    box-shadow: 0px 2px 4px 0px rgba(254, 120, 101, 0.4);
    border-radius: 22px;

    //修改字样式
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    letter-spacing: 1px;
  }
}
//背景图片
.bgImg {
  width: 100%;
  height: 100%;
  display: block;
  outline: none;
  margin: 0 auto;
}
.moveIframe {
  width: 1920px;
  height: 1080px;
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

.addCourse {
  width: 60px;
  height: 66px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../../assets/creator/sandTable/icon-position.svg")
    no-repeat;
  cursor: pointer;
  p {
    position: absolute;
    left: 21px;
    top: 13px;
    font-size: 24px;
    font-family: "GalanoGrotesque";
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    font-weight: bold;
  }
  &:hover {
    background: url("../../../assets/creator/sandTable/icon-position-hover.svg")
      no-repeat;
  }
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
      float: left;
      bottom: 15px;
      left: 16px;
      position: absolute;
      .preview {
        display: inline-block;
        margin-right: 27px;
        cursor: pointer;
        img {
          width: 24px;
          height: 24px;
        }
        span {
          height: 24px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;
        }
      }
      .change {
        display: inline-block;
        text-align: center;
        width: 56px;
        height: 24px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 14px;
        border: 1px solid rgba(240, 240, 240, 1);
        // 字
        font-size: 12px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
        margin-right: 18px;
      }
      .del {
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
      float: left;
      bottom: 15px;
      left: 16px;
      position: absolute;
      .preview {
        display: inline-block;
        margin-right: 27px;
        cursor: pointer;
        img {
          width: 24px;
          height: 24px;
        }
        span {
          height: 24px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;
        }
      }
      .change {
        display: inline-block;
        text-align: center;
        width: 56px;
        height: 24px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 14px;
        border: 1px solid rgba(240, 240, 240, 1);
        // 字
        font-size: 12px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
        margin-right: 18px;
      }
      .del {
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
