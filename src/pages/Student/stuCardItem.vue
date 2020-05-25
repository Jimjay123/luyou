/**

* Created by wangxin

* @date 2019/8/26 12:54

*/

<template>
  <div :class="{'card-item':true,'mr0':!((index+1)%4)}">
    <i class="course" v-if="newData.coursePlanType == 23">频道</i>
    <i class="sandchannel" v-if="newData.coursePlanType == 24">沙盘频道</i>
    <i class="sandstandard" v-if="newData.coursePlanType == 25 || newData.coursePlanType == 26">沙盘</i>
    <div class="top">
      <img :src="newData.popularizeImageUrl" alt />
      <div
        class="top-info doing"
        v-if="newData.finishPercent > 0 && newData.finishPercent < 100 && newData.expireFlag != true"
      >
        已完成
        <span class="count">{{newData.finishPercent||0}}%</span>
      </div>
      <div class="top-info completed" v-else-if="courseStatus===2">已完成</div>
      <div
        class="top-info not-start"
        v-if="(newData.finishPercent == null || newData.finishPercent == 0) && newData.expireFlag != true"
      >未开始</div>
      <div class="top-info expired" v-else-if="courseStatus===4">
        <span>已完成：{{newData.finishPercent||0}}%</span>
        已过期
      </div>
    </div>
    <ProgressItem :options="{percentage:newData.finishPercent||0}"></ProgressItem>
    <ul class="card-info">
      <li class="title">{{newData.coursePlanName}}</li>
      <li class="time time-gray" v-if="timeFun===1">
        <div>
          <i class="icon-time"></i>
          {{newData.endDate}}日截止
        </div>
      </li>
      <li class="time time-yellow" v-if="timeFun===2">
        <div>
          <i class="icon-time"></i>
          {{newData.remainDays}} day left
        </div>
      </li>
      <li class="time time-yellow" v-if="timeFun===3">
        <div>
          <i class="icon-time"></i>
          剩余{{newData.remainDays}}天
        </div>
      </li>
      <li class="time time-red" v-if="timeFun===4">
        <div>
          <i class="icon-time"></i>
          剩余{{newData.remainDays}}天
        </div>
      </li>
      <li class="time time-end" v-if="timeFun===5">
        <div>
          <i class="icon-time"></i>
          {{newData.endDate}}日已截止
        </div>
      </li>
      <li class="time time-red" v-if="timeFun===6">
        <div>
          <i class="icon-time"></i>
          今日截至
        </div>
      </li>
      <img
        v-if="newData.finishFlag && newData.expireFlag != true"
        class="completed"
        :src="require('../../assets/group/completed.svg')"
        alt
      />
      <img
        v-if="newData.expireFlag"
        class="completed"
        :src="require('../../assets/group/expired.svg')"
        alt
      />
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import ProgressItem from "../group/progressItem";
import { trimDate } from "../../utils/utils";

@Component({
  name: "StuCardItem",
  components: {
    ProgressItem
  }
})
export default class StuCardItem extends Vue {
  @Prop() options;
  @Prop({
    required: false,
    default: 0
  })
  index;

  get percentage() {
    let opt = this.newData;
    console.log(opt);
    let per = 0;
    if (!opt.finishStudentCount) {
      return 0;
    } else {
      return (opt.finishStudentCount / opt.totalStudentCount).toFixed(2) * 100;
    }
  }

  get timeFun() {
    // val 是否过期  date 剩余天数
    //  1  剩余10天以上
    //  2  剩余5-10天以上
    //  3  剩余3-5天以上
    //  4  剩余1-3天以上
    //  5  过期
    let val = this.newData.expireFlag || false;
    let date = this.newData.remainDays;
    console.log(date == "");
    if (val) {
      //已过期
      return 5;
    } else {
      if (date > 10) {
        return 1;
      } else if (date > 5) {
        return 2;
      } else if (date > 3) {
        return 3;
      } else if (date >= 1) {
        return 4;
      } else if (date == "") {
        console.log(date == "");
        return 6;
      }
    }
  }

  //计算当前课程状态
  get courseStatus() {
    /**
     * 1，进行中
     * 2，已完成
     * 3，未开始
     * 4，已过期
     * */

    let expireFlag = this.newData.expireFlag || false; //是否过期  true 过期 false 未过期
    let date = this.newData.remainDays;
    let beginDate = this.newData.beginDate;
    let finishFlag = this.newData.finishFlag;
    if (expireFlag) {
      return 4;
    } else {
      if (new Date(trimDate()) > new Date(trimDate(beginDate))) {
        return 3;
      } else if (finishFlag) {
        return 2;
      }
    }
    return 1;
  }

  get newData() {
    let opt = this.options || {};
    // console.log(opt);
    return {
      groupId: opt.groupId || "", //群id
      groupName: opt.groupName || "", //群名称
      coursePlanId: opt.coursePlanId || "", //课程计划id
      coursePlanName: opt.coursePlanName || "", //课程计划名称
      coursePlanType: opt.coursePlanType || 0, //课程计划类型 1标准课  非1 课程频道
      beginDate: opt.beginDate || "", //开始时间
      endDate: opt.endDate || "", //结束时间
      finishStudentCount: opt.finishStudentCount || 0, //完成学生总人数
      totalStudentCount: opt.totalStudentCount || 0, //学生总人数
      popularizeImageUrl: opt.popularizeImageUrl || "", //课程图片
      finishFlag: opt.finishFlag || false, //是否已完成  true完成 false未完成
      expireFlag: opt.expireFlag || false, //是否过期  true完成 false未完成
      remainDays: opt.remainDays || "", //是否过期  true完成 false未完成
      finishPercent: opt.finishPercent || 0 //是否过期  true完成 false未完成
    };
  }
}
</script>

<style lang="scss" scoped>
/*超长...*/
@mixin superWidth {
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // -o-text-overflow: ellipsis;
  overflow: hidden;
}

@mixin fontAll($size, $color, $weight) {
  font-size: $size;
  color: $color;
  font-weight: $weight;
}

@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}

.card-item {
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  border-radius: 10px;
  float: left;
  margin-left: 22px;
  margin-bottom: 22px;
  position: relative;
  cursor: pointer;
  .course {
    position: absolute;
    top: 0;
    left: 0;
    width: 54px;
    height: 30px;
    background: rgba(254, 120, 101, 1);
    border-radius: 10px 0px 12px 0px;
    z-index: 1;
    @include fontAll(16px, #fff, 500);
    text-align: center;
    line-height: 30px;
  }
  .sandchannel {
    position: absolute;
    top: 0;
    left: 0;
    width: 88px;
    height: 30px;
    background: rgba(104, 193, 254, 1);
    border-radius: 10px 0px 12px 0px;
    z-index: 1;
    @include fontAll(16px, #fff, 500);
    text-align: center;
    line-height: 30px;
  }
  .sandstandard {
    position: absolute;
    top: 0;
    left: 0;
    width: 54px;
    height: 30px;
    background: rgba(104, 193, 254, 1);
    border-radius: 10px 0px 12px 0px;
    z-index: 1;
    @include fontAll(16px, #fff, 500);
    text-align: center;
    line-height: 30px;
  }
  .top {
    width: 224px;
    height: 116px;
    position: relative;
    img {
      width: 224px;
      height: 116px;
      border-radius: 12px 12px 0px 0px;
    }
    .top-info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 35px;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      padding-right: 11px;
      padding-left: 11px;
      padding-bottom: 8px;
      span {
        color: #fe7865;
      }
      span.count {
        font-size: 21px;
      }
    }
    .doing {
      @include fontAll(12px, rgba(255, 255, 255, 0.8), 400);
    }
    .expired {
      justify-content: space-between;
      color: rgba(255, 255, 255, 0.7);
      & > span {
        @include fontAll(12px, rgba(255, 255, 255, 0.7), 500);
      }
    }
  }
  .card-info {
    width: 224px;
    padding: 14px 12px;
    position: relative;
    .title {
      @include fontAll(17px, #333, 500);
      // text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      // text-overflow: ellipsis;
      display: -webkit-box;
      // -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 8px;
      height: 44px;
      width: 203px;
    }
    .date {
      @include fontAll(12px, #999, 400);
      margin-bottom: 8px;
    }
    .time {
      font-size: 12px;
      div {
        @include fontAll(12px, #666, 400);
        display: inline-block;
        padding: 4px 5px;
        border-radius: 4px;
      }

      .icon-time {
        display: inline-block;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
    .time-gray {
      div {
        background-color: #f2f2f2;
      }
      .icon-time {
        @include bg("../../assets/student/time-gray.svg");
        margin-bottom: 2px;
      }
    }
    .time-yellow {
      div {
        background: rgba(255, 197, 61, 0.2);
        color: #faad14;
      }
      .icon-time {
        @include bg("../../assets/student/time-yellow.svg");
        margin-bottom: 2px;
      }
    }
    .time-red {
      div {
        background-color: #fef3f1;
        color: #fe7865;
      }
      .icon-time {
        @include bg("../../assets/student/time-red.svg");
        margin-bottom: 2px;
      }
    }
    .time-end {
      div {
        background-color: #f2f2f2;
        color: rgba(0, 0, 0, 0.25);
      }
      .icon-time {
        @include bg("../../assets/student/time-end.svg");
        margin-bottom: 2px;
      }
    }
    .completed {
      position: absolute;
      bottom: 0px;
      right: 0px;
      z-index: 0;
      width: 57px;
      height: 57px;
    }
  }
}
.card-item:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 10px 0px rgba(153, 153, 153, 0.5);
  border-radius: 13px;
}

.mr0 {
  margin-right: 0;
}
</style>
