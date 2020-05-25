/**

* Created by wangxin

* @date 2019/8/5 14:09

*/
<template>
  <div :class="{'card-item':true,'mr0':!(temIndex%4)}">
    <i class="course" v-if="newData.coursePlanType == 23">频道</i>
    <i class="sandchannel" v-if="newData.coursePlanType == 24">沙盘频道</i>
    <i class="sandstandard" v-if="newData.coursePlanType == 26 || newData.coursePlanType == 25">沙盘</i>
    <div class="top">
      <img :src="newData.popularizeImageUrl" alt />
      <div class="count-info">
        已完成
        <span>{{newData.finishStudentCount}}</span>
        <span>/{{newData.totalStudentCount}}</span>
      </div>
    </div>

    <ProgressItem :options="{percentage:percentage}"></ProgressItem>
    <ul class="card-info">
      <li class="title">{{newData.coursePlanName}}</li>
      <li class="date">起止日：</li>
      <li class="time">
        <span class="year">{{startTime.y}}.</span>
        <span class="monthDay">{{startTime.m}}.{{startTime.r}}</span>
        <span class="year">-{{endTime.y}}.</span>
        <span class="monthDay">{{endTime.m}}.{{endTime.r}}</span>
      </li>

      <img
        v-if="newData.finishFlag"
        class="completed"
        :src="require('../../assets/group/completed.svg')"
        alt
      />
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import ProgressItem from "./progressItem";
import { getDateStr } from "../../utils/utils";

@Component({
  name: "CardItem",
  components: {
    ProgressItem
  }
})
export default class CardItem extends Vue {
  @Prop() options;

  @Prop({
    required: false,
    default: 0
  })
  temIndex;

  get percentage() {
    let opt = this.newData;
    // console.log(opt);
    let per = 0;
    if (!opt.finishStudentCount) {
      return 0;
    } else {
      return (opt.finishStudentCount / opt.totalStudentCount).toFixed(2) *
        100 >=
        100
        ? 100
        : (opt.finishStudentCount / opt.totalStudentCount).toFixed(2) * 100;
    }
  }
  get startTime() {
    return getDateStr(this.newData.beginDate);
  }

  get endTime() {
    return getDateStr(this.newData.endDate);
  }

  get newData() {
    let opt = this.options;
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
      finishFlag: opt.finishFlag || false //是否已完成  true完成 false未完成

      /*"groupId": 1,//群id
        "groupName": "刘老师的群1",//群名称
        "coursePlanId": 2,//课程计划id
        "coursePlanName": "刘老师的课程计划2",//课程计划名称
        "coursePlanType": 2,//课程计划类型 1标准课  非1 课程频道
        "beginDate": "2019-08-01",//开始时间
        "endDate": "2019-08-30",//结束时间
        "finishStudentCount": 1,//完成学生总人数
        "totalStudentCount": 4,//学生总人数
        "popularizeImageUrl": "http://localhost:8010/images/course1.png",//课程图片
        "finishFlag": false,//是否已完成  true完成 false未完成*/
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

.card-item {
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  float: left;
  margin-left: 20px;
  margin-bottom: 22px;
  margin-top: 16px;
  position: relative;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  border-radius: 12px;
  cursor: pointer;
  // &:nth-child(4n) {
  //   margin-right: 0;
  // }
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
    .count-info {
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
      font-size: 11px;
      font-weight: 400;
      padding-right: 11px;
      padding-bottom: 2px;
      color: rgba(255, 255, 255, 0.8);
      border-radius: 8px 8px 0px 0px;
      span {
        color: #fe7865;
      }
      span:first-child {
        font-size: 21px;
      }
    }
    // .doing {
    //   @include fontAll(12px, rgba(255, 255, 255, 0.8), 400);
    // }
  }
  .card-info {
    width: 224px;
    padding: 8px 12px 14px;
    position: relative;
    .title {
      @include fontAll(16px, #333, 500);
      @include superWidth;
      margin-bottom: 5px;
      width: 203px;
      height: 44px;
      font-size: 16px;
      font-family: PingFangSC;
      line-height: 22px;
    }
    .date {
      @include fontAll(12px, #999, 400);
      margin-bottom: 1px;
      font-family: PingFangSC;
      line-height: 17px;
    }
    .time {
      font-family: PingFangSC;
      line-height: 14px;
      font-family: PingFangSC;
      .year {
        display: inline-block;
        font-size: 12px;
        color: #999;
        vertical-align: middle;
        margin-bottom: 3px;
      }
      .monthDay {
        @include fontAll(18px, #666, 500);
        vertical-align: baseline;
      }
    }
    .completed {
      position: absolute;
      bottom: 0;
      right: 0;
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
  float: left;
}
</style>
