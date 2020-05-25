/**

* Created by wangxin

* @date 2019/8/19 16:48

*/
<template>
  <div class="ana-card">
    <img class="img1" :src="data.url" alt />
    <img v-if="data.type==2" class="img2" :src="data.url" alt />
    <img v-if="data.type==2" class="img3" :src="data.url" alt />
    <span class="title" v-if="data.type==23">频道</span>
    <span class="sandTableCourse" v-if="data.type==24">沙盘频道</span>
    <span class="sandTable" v-if="data.type==25 || data.type==26 ">沙盘</span>
    <div class="time">
      <i class="icon-time"></i>
      {{data.time}}分钟
    </div>
  </div>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "AnaCard"
})
export default class AnaCard extends Vue {
  @Prop({
    default: () => {
      return {
        url: require("../../assets/mainNoSign/pgc-s.png"), //图片地址
        time: "120", //时长
        type: "1" //类型 1 课程频道 2标准课
      };
    },
    required: false
  })
  data;
  created() {
    console.log(this.data);
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.ana-card {
  width: 280px;
  height: 170px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .img2,
  .img3 {
    position: absolute;
    top: 6px;
    left: 5px;
    opacity: 0.5;
    z-index: -1;
    width: 269px;
  }
  .img3 {
    width: 254px;
    top: 12px;
    left: 13px;
    opacity: 0.3;
    z-index: -2;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    width: 54px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: rgba(254, 120, 101, 1);
    border-radius: 12px 0px 12px 0px;
    @include fontSet(16px, #fff, 500);
  }
  .sandTableCourse {
    position: absolute;
    top: -1px;
    left: -1px;
    // width: 54px;
    height: 30px;
    padding: 0 10px;
    text-align: center;
    line-height: 30px;
    background: rgba(104, 193, 254, 1);
    border-radius: 12px 0px 12px 0px;
    @include fontSet(16px, #fff, 500);
  }
  .sandTable {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 54px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: rgba(104, 193, 254, 1);
    border-radius: 12px 0px 12px 0px;
    @include fontSet(16px, #fff, 500);
  }
  .time {
    position: absolute;
    bottom: 8px;
    right: 12px;
    @include fontSet(14px, #fff, 600);
    .icon-time {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url("../../assets/groupStaAnalysis/time.svg") no-repeat;
      background-size: 100% auto;
      vertical-align: middle;
    }
  }
}
</style>
