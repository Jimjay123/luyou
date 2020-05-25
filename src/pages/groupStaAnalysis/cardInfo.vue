/**

* Created by wangxin

* @date 2019/8/19 17:23

*/
<template>
  <div class="center">
    <div class="title">{{data.coursePlanName}}</div>
    <div class="p1 clearfix">
      <!-- <span>{{data.coursePlanType==2?'课程频道':'标准课'}}</span> -->
      <span>{{typeComputed}}</span>
      <span class="time">{{data.duration}}分钟{{coursePlanType==2?'•'+data.bundleTotal+'章':''}}</span>
      <div>
        <i class="icon-time"></i>
        {{trimDateFun(data.beginDate)}} — {{trimDateFun(data.endDate)}}
      </div>
    </div>
    <div class="p2 clearfix">
      <span class="official">官方</span>
      <span
        :class="item==='官方'?'official':''"
        v-for="(item,index) in data.tagNameList"
        :key="index"
      >{{item}}</span>
      <!-- <span v-if="item==='官方'" :class="item==='官方'?'official':''">官方</span> -->
      <!-- mask -->
      <div class="maskWhite"></div>
      <!-- mask -->
    </div>
    <div class="p3">
      <img :src="data.avatar" alt />
      <span class="name">{{data.teacherName}}</span>
      <i class="icon-att" v-if="data.teacherLevel"></i>
      <span class="company">/{{data.orgName}}</span>
    </div>
  </div>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { trimDate } from "../../utils/utils";

@Component({
  name: "cardInfo"
})
export default class CardInfo extends Vue {
  @Prop({
    default: () => {
      return {};
    },
    required: false
  })
  data;
  @Prop({
    default: 1,
    required: false
  })
  coursePlanType;

  @Emit trimDateFun(val) {
    return trimDate(val);
  }
  get typeComputed() {
    let courseType;
    if (this.coursePlanType * 1 === 21 || this.coursePlanType * 1 === 22) {
      courseType = "标准课";
    } else if (
      this.coursePlanType * 1 === 25 ||
      this.coursePlanType * 1 === 26
    ) {
      courseType = "沙盘标准课";
    } else if (this.coursePlanType * 1 === 23) {
      courseType = "课程频道";
    } else if (this.coursePlanType * 1 === 24) {
      courseType = "沙盘课程频道";
    }
    return courseType;
  }
  created() {
    console.log(this.coursePlanType);
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.center {
  display: inline-block;
  @include fontSet(24px, #333, 500);
  margin-left: 51px;
  height: 170px;
  width: 613px;
  .title {
    @include fontSet(24px, #333, 500);
    margin-bottom: 7px;
  }
  .p1 {
    margin-bottom: 54px;
    span {
      float: left;
      @include fontSet(16px, #4a4a4a, 600);
      margin-right: 32px;
    }
    .time {
      @include fontSet(16px, #fe7865, 600);
    }
    div {
      @include fontSet(14px, #999, 500);
      i {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url("../../assets/groupStaAnalysis/icon-time.svg") no-repeat;
        background-size: 100% auto;
        margin-right: 8px;
      }
    }
  }
  .p2 {
    margin-bottom: 13px;
    position: relative;
    height: 20px;
    overflow: hidden;
    span {
      background: rgba(250, 250, 250, 1);
      border-radius: 5px;
      border: 1px solid rgba(238, 238, 238, 1);
      @include fontSet(12px, #999, 400);
      padding: 0 5px;
      margin-right: 20px;
      float: left;
      height: 20px;
      line-height: 18px;
    }
    .official {
      background: rgba(254, 243, 241, 1);
      border-radius: 5px;
      border: none;
      color: #fe7865;
    }
    .maskWhite {
      width: 46px;
      height: 30px;
      position: absolute;
      right: 0;
      top: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }
  }
  .p3 {
    font-size: 13px;
    img {
      width: 20px;
      height: 20px;
      border-radius: 14px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .name {
      @include fontSet(13px, #666, 500);
    }
    .icon-att {
      display: inline-block;
      width: 16px;
      height: 12px;
      background: url("../../assets/groupStaAnalysis/icon-att.svg") no-repeat;
      background-size: 100% auto;
      vertical-align: middle;
    }
    .company {
      @include fontSet(13px, #c2c2c2, 400);
    }
  }
}
</style>
