/**

* Created by wangxin

* @date 2019/11/7 13:07

*/
<template>
  <div :class="['courseInfo',courseRetract?'courseRetract':'']">
    <div class="title" @click="titleClick">
      <div class="flexItem">
        课程完成情况：
        <span>{{totalFinishData}}%</span>
      </div>
      <div class="info">
        详情
        <i :class="courseRetract?'icon-down':''"></i>
      </div>
    </div>
    <div class="course">
      <div class="box">
        <Vuescroll :ops="ops">
          <ul class="course-list">
            <li v-for="(item,index) in courseListData" :key="index">
              <div :class="{'opa6':item.speed>=100?true:false}">
                <i>{{index+1}}</i>
                <p>{{item.courseName}}</p>
              </div>
              <div class="progress" v-if="item.finishFlag===false">
                {{item.finishPercent}}
                <span>%</span>
              </div>
              <div class="complete" v-else></div>
            </li>
          </ul>
        </Vuescroll>
      </div>
      <div class="bottom">
        <div class="btn" @click="lookInfoFun(btnContext)">
          <a href="javascript:;">{{btnContext}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, tipsMsg, tipsFail } from "../../utils/utils";
import { sandTablePlanLearningState } from "../../service/studentApi";
import Vuescroll from "vuescroll";
const StudentMod = namespace("student");

@Component({
  name: "CourseInfo",
  components: {
    Vuescroll
  }
})
export default class CourseInfo extends Vue {
  @StudentMod.State("stChannelList") stChannelList; //沙盘课程频道-添加课程

  @Prop({
    default: () => {
      return {
        speed: 0,
        list: []
      };
    }
  })
  data;

  @Prop({
    default: null,
    required: false
  })
  callback;

  get btnContext() {
    let result = this.totalFinishData === 100 ? "查看报告" : "查看详情";
    return result;
    // let btn = "查看报告";
    // this.data.list.map(item => {
    //   if (item.speed < 100) {
    //     btn = "查看详情";
    //   }
    // });
  }

  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: true,
      background: "#00000033",
      //opacity: 0,
      hoverStyle: true,
      specifyBorderRadius: false,
      minSize: false,
      size: "7px",
      disable: false
    },
    scrollPanel: {
      scrollingX: true,
      initialScrollY: 0
    }
  }; //滚动条设置

  courseRetract = true; //当前是否收起  true收起 false 展开
  courseListData = []; //当前课程详细信息
  totalFinishData = 0; //总课程学习百分比数据
  // finishFlag=false;//单独课程是否学习

  titleClick() {
    this.courseRetract = !this.courseRetract;
  }

  //查看点击事件
  lookInfoFun(val) {
    if (val == "查看详情") {
      //跳转至详情页
      let groupId = this.$route.query.groupId;
      let coursePlanId = this.$route.query.coursePlanId;
      let coursePlanType = this.$route.query.coursePlanType;
      this.$router.push({
        path: "StudentChannel",
        query: {
          groupId,
          coursePlanId,
          coursePlanType
        }
      });
    } else {
      // 跳转至看报告页
      let groupId = this.$route.query.groupId;
      let coursePlanId = this.$route.query.coursePlanId;
      let coursePlanType = this.$route.query.coursePlanType;
      this.$router.push({
        path: "StudentReportsChannel",
        query: {
          groupId,
          coursePlanId,
          coursePlanType
        }
      });
    }
  }

  created() {
    let channelId = this.$route.query.channelId;
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;

    // 学生端沙盘课程频道学生课程接口
    sandTablePlanLearningState({ groupId, coursePlanId })
      .then(res => {
        if (res.code === 0) {
          this.courseListData = res.data.courseLearningStateVoList;
          this.totalFinishData = res.data.finishPercent;
          this.finishFlag = res.data.finishFlag;
        } else {
          console.log(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.courseInfo {
  position: absolute;
  top: 24px;
  right: 28px;
  z-index: 999;
  .title {
    position: absolute;
    top: 0;
    left: 17px;
    width: 266px;
    height: 40px;
    border-radius: 8px;
    font-size: 14px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 13px;
    background: #fff;
    z-index: 10;
    cursor: pointer;
    span {
      font-size: 24px;
      font-weight: 800;
      color: rgba(102, 102, 102, 1);
      vertical-align: middle;
      margin-left: 6px;
    }
    .info {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: 400;
      color: rgba(77, 77, 77, 1);
    }
    i {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("../../assets/creator/sanTabChaPreview/icon-up.svg")
        no-repeat;
      background-size: 100% auto;
    }
    .icon-down {
      background: url("../../assets/creator/sanTabChaPreview/icon-down.svg")
        no-repeat;
      background-size: 100% auto;
    }
  }
  .flexItem {
    display: flex;
    align-items: center;
  }
}
.courseRetract {
  width: 300px;
  height: 40px;
  .title {
    background: rgba(255, 255, 255, 0.7);
  }
  .course {
    display: none;
  }
}
.course {
  width: 300px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 10px;
  padding: 44px 4px 11px 12px;
  margin-top: 20px;
}
.box {
  height: 349px;
}
.course-list {
  padding-right: 26px;
  width: 100%;
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    i {
      float: left;
      width: 26px;
      height: 26px;
      background: url("../../assets/creator/sanTabChaPreview/positioning.svg")
        no-repeat;
      background-size: 26px 26px;
      text-align: center;
      line-height: 26px;
      font-size: 12px;
      font-family: GalanoGrotesqueDEMO-Bold, GalanoGrotesqueDEMO;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    p {
      width: 173px;
      margin-left: 34px;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: rgba(77, 77, 77, 1);
    }
    .complete {
      width: 22px;
      height: 22px;
      background: url("../../assets/creator/sanTabChaPreview/complete.svg")
        no-repeat;
      background-size: 22px 22px;
    }
    .progress {
      color: #fe7865ff;
      font-size: 16px;
      font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
      font-weight: 800;
      span {
        font-size: 12px;
      }
    }
  }
}
.bottom {
  margin-top: 17px;
  text-align: center;
}
.btn {
  display: inline-block;
  height: 30px;
  background: rgba(255, 197, 61, 1);
  border-radius: 8px;
  a {
    display: inline-block;
    width: 80px;
    height: 26px;
    padding: 0 10px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    line-height: 26px;
    text-align: center;
    font-size: 14px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: rgba(254, 120, 101, 1);
  }
}

.opa6 {
  opacity: 0.6;
}
</style>
