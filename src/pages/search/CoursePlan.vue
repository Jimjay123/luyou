<template>
  <div class="art-container clearfix">
    <div class="art" v-for="item in list" :key="item.id">
      <div
        class="cards"
        :class="(item.keyType == 23 || item.keyType == 24) ? cardos:cardts"
        @click="StandarddetailsClick1(item.keyType,item.keyId)"
      >
        <img :src="item.popularizeImageUrl" alt class="im1" />

        <img
          :src="item.popularizeImageUrl"
          alt
          class="im2"
          v-if="item.keyType == 23 || item.keyType == 24"
        />

        <img
          :src="item.popularizeImageUrl"
          alt
          class="im3"
          v-if="item.keyType == 23 || item.keyType == 24"
        />
        <div class="corner" v-if="item.keyType === 23 ? true:false">频道</div>
        <div class="sandchannel" v-if="item.keyType === 24 ? true:false">沙盘频道</div>
        <div
          class="sandstandard"
          v-if="(item.keyType === 25 || item.keyType === 26) ? true:false"
        >沙盘</div>
        <h3 class="hb">{{item.keyName}}</h3>
        <div class="bq">
          <p class="guan" v-if="item.officialFlag == true">官方</p>
          <div class="texts" v-for="items in item.tagNameList" :key="items">
            <span class="bqs">{{items}}</span>
          </div>
        </div>
        <div class="names">
          <img :src="item.avatar" alt class="im11" />
          <span>{{item.ownerName}}</span>
          <img src="../../assets/img/v1.svg" alt class="im22" />
        </div>
      </div>
      <div class="words">
        <h3>{{item.keyName}}</h3>
        <p class="words1">
          <span>{{item.duration}}分钟</span>
          <span>·</span>
          <span>{{item.totalBundle}}章</span>
          <span>{{item.modifyDatetime}} 更新了</span>
        </p>
        <p class="words2">{{item.summary}}</p>
        <el-row>
          <el-button round @click="StandarddetailsClick1(item.type,item.keyId)">去预览</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "coursePlan"
})
export default class CoursePlan extends Vue {
  @Prop(Array) list;
  cardos = "cardos";
  cardts = "cardts";
  StandarddetailsClick1(val, key) {
    if (val === 23 || val === 24) {
      this.$router.push({
        path: "/palnchannel",
        query: {
          coursePlanId: key
        }
      });
    } else {
      this.$router.push({
        path: "/planstandard",
        query: {
          coursePlanId: key
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.art-container {
  max-width: 1200px;
  margin: 0 auto;
  // min-height: calc(100vh - 346px);
}
.art {
  height: 283px;
  margin-bottom: 60px;
  padding-top: 30px;
  // padding-left: 10px;
  padding-right: 10px;
  .cardos {
    position: relative;
    width: 447px;
    height: 283px;
    float: left;
    .im1 {
      width: 447px;
      height: 271px;
      position: absolute;
      top: 0px;
      opacity: 1;
      z-index: 9;
      width: 447px;
      height: 271px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      border-radius: 13px;
      transition: 0.2s;
    }
    .im2 {
      width: 447px;
      height: 271px;
      position: absolute;
      top: 6px;
      opacity: 0.5;
      transform: scaleX(0.97);
      z-index: 8;
      border-radius: 13px;
      transition: 0.2s;
    }
    .im3 {
      width: 447px;
      height: 271px;
      position: absolute;
      top: 12px;
      opacity: 0.189;
      transform: scaleX(0.95);
      // left: 12px;
      border-radius: 13px;
      z-index: 7;
      transition: 0.2s;
    }
    .corner {
      width: 54px;
      height: 30px;
      background: rgba(254, 120, 101, 1);
      border-radius: 13px 0px 13px 0px;
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 10px;
      padding-top: 3px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      letter-spacing: 1px;
      z-index: 91;
      transition: 0.2s;
    }
    .sandchannel {
      width: 88px;
      height: 30px;
      background: rgba(104, 193, 254, 1);
      border-radius: 13px 0px 13px 0px;
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 10px;
      padding-top: 3px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      letter-spacing: 1px;
      z-index: 91;
      transition: 0.2s;
    }
    .sandstandard {
      width: 54px;
      height: 30px;
      background: rgba(104, 193, 254, 1);
      border-radius: 8px 0px 8px 0px;
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 10px;
      padding-top: 3px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      letter-spacing: 1px;
      transition: 0.2s;
      z-index: 9;
    }
    .hb {
      position: absolute;
      bottom: 63px;
      left: 20px;
      z-index: 9;
      width: 356px;
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 33px;
      letter-spacing: 1px;
      transition: 0.2s;
    }
    .bq {
      position: absolute;
      bottom: 32px;
      left: 20px;
      z-index: 91;
      transition: 0.2s;
      .guan {
        width: 34px;
        height: 20px;
        background: rgba(254, 120, 101, 1);
        border-radius: 3px;
        border: 1px solid rgba(254, 120, 101, 1);
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 16px;
        float: left;
        margin-right: 14px;
        text-align: center;
      }
      .texts {
        z-index: 91;
        float: left;
        margin-right: 14px;
        transition: 0.2s;
        .bqs {
          display: block;
          height: 20px;
          padding: 0px 5px 0px 5px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 17px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
        }
      }
    }
    .names {
      position: absolute;
      right: 0;
      bottom: 29px;
      height: 28px;
      width: 140px;
      z-index: 91;
      line-height: 28px;
      transition: 0.2s;
      .im11 {
        float: left;
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      span {
        float: left;
        display: block;
        margin-left: 11px;
        max-width: 68px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
      }
      .im22 {
        margin-left: 5px;
        float: left;
        width: 24px;
        height: 17px;
        line-height: 28px;
        margin-top: 6px;
      }
    }
  }
  .cardos:hover {
    .im1 {
      position: absolute;
      top: -4px;
      opacity: 1;
      z-index: 9;
      width: 447px;
      height: 271px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      border-radius: 13px;
    }
    .im2 {
      position: absolute;
      top: 4px;
      opacity: 0.5;
      transform: scaleX(0.97);
      z-index: 8;
    }
    .im3 {
      position: absolute;
      top: 12px;
      opacity: 0.189;
      transform: scaleX(0.95);
      z-index: 7;
    }
    .corner {
      position: absolute;
      top: -4px;
    }
    .sandchannel {
      position: absolute;
      top: -4px;
    }
    .sandstandard {
      position: absolute;
      top: -4px;
    }
    .hb {
      position: absolute;
      bottom: 67px;
    }
    .bq {
      position: absolute;
      bottom: 36px;
      left: 20px;
      z-index: 91;
    }
    .names {
      position: absolute;
      bottom: 35px;
    }
  }
  .cardts {
    position: relative;
    width: 447px;
    height: 283px;
    float: left;
    .im1 {
      width: 447px;
      height: 271px;
      position: absolute;
      top: 0px;
      opacity: 1;
      z-index: 9;
      width: 447px;
      height: 271px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      border-radius: 13px;
      transition: 0.2s;
    }
    .im2 {
      width: 447px;
      height: 271px;
      position: absolute;
      top: 6px;
      opacity: 0.5;
      transform: scaleX(0.97);
      z-index: 8;
      border-radius: 13px;
      transition: 0.2s;
    }
    .im3 {
      width: 447px;
      height: 271px;
      position: absolute;
      top: 12px;
      opacity: 0.189;
      transform: scaleX(0.95);
      // left: 12px;
      border-radius: 13px;
      z-index: 7;
      transition: 0.2s;
    }
    .corner {
      width: 54px;
      height: 30px;
      background: rgba(254, 120, 101, 1);
      border-radius: 13px 0px 13px 0px;
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 10px;
      padding-top: 3px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      letter-spacing: 1px;
      z-index: 91;
      transition: 0.2s;
    }
    .sandchannel {
      width: 88px;
      height: 30px;
      background: rgba(104, 193, 254, 1);
      border-radius: 13px 0px 13px 0px;
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 10px;
      padding-top: 3px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      letter-spacing: 1px;
      z-index: 91;
      transition: 0.2s;
    }
    .sandstandard {
      width: 54px;
      height: 30px;
      background: rgba(104, 193, 254, 1);
      border-radius: 8px 0px 8px 0px;
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 10px;
      padding-top: 3px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      letter-spacing: 1px;
      transition: 0.2s;
      z-index: 9;
    }
    .hb {
      position: absolute;
      bottom: 63px;
      left: 20px;
      z-index: 9;
      width: 356px;
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 33px;
      letter-spacing: 1px;
      transition: 0.2s;
    }
    .bq {
      position: absolute;
      bottom: 32px;
      left: 20px;
      z-index: 91;
      transition: 0.2s;
      .guan {
        width: 34px;
        height: 20px;
        background: rgba(254, 120, 101, 1);
        border-radius: 3px;
        border: 1px solid rgba(254, 120, 101, 1);
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 16px;
        float: left;
        margin-right: 14px;
        text-align: center;
      }
      .texts {
        z-index: 91;
        float: left;
        margin-right: 14px;
        transition: 0.2s;
        .bqs {
          display: block;
          height: 20px;
          padding: 0px 5px 0px 5px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 17px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
        }
      }
    }
    .names {
      position: absolute;
      right: 0;
      bottom: 29px;
      height: 28px;
      width: 140px;
      z-index: 91;
      line-height: 28px;
      transition: 0.2s;
      .im11 {
        float: left;
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      span {
        float: left;
        display: block;
        margin-left: 11px;
        max-width: 68px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
      }
      .im22 {
        margin-left: 5px;
        float: left;
        width: 24px;
        height: 17px;
        line-height: 28px;
        margin-top: 6px;
      }
    }
  }
  .cardts:hover {
    .im1 {
      position: absolute;
      top: -4px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
      border-radius: 13px;
    }
    .corner {
      position: absolute;
      top: -4px;
    }
    .sandchannel {
      position: absolute;
      top: -4px;
    }
    .sandstandard {
      position: absolute;
      top: -4px;
    }
    .hb {
      position: absolute;
      bottom: 67px;
    }
    .bq {
      position: absolute;
      bottom: 36px;
      left: 20px;
      z-index: 91;
    }
    .names {
      position: absolute;
      bottom: 35px;
    }
  }
  .words {
    float: left;
    width: 623px;
    margin-left: 56px;
    border-bottom: 1px solid #eeeeee;
    h3 {
      width: 623px;
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 33px;
      margin-top: 8px;
    }
    .words1 {
      margin-top: 14px;
      span:nth-child(1),
      span:nth-child(3) {
        width: 101px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
      span:nth-child(4) {
        margin-left: 24px;
        width: 144px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 22px;
      }
    }
    .words2 {
      width: 623px;
      height: 112px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
      text-align: justify;
      text-justify: distribute;
      margin-top: 23px;
      overflow: hidden;

      text-overflow: ellipsis;

      display: -webkit-box;

      -webkit-box-orient: vertical;

      -webkit-line-clamp: 4;
    }
    .el-row {
      margin-top: 11px;
      margin-bottom: 39px;
      .el-button {
        width: 99px;
        height: 40px;
        background: rgba(255, 255, 255, 0.4);
        box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
        border-radius: 18px;
        border: 1px solid rgba(254, 120, 101, 0.4);
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(254, 120, 101, 1);
        span {
          width: 48px;
          height: 16px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
        }
      }
      .is-round {
        padding: 11px 15px 11px 15px;
      }
    }
    .el-button:hover {
      opacity: 0.8;
      border: 1px solid rgba(254, 120, 101, 0.8) !important;
      span {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(254, 120, 101, 1);
      }
    }
  }
}
.art:last-child {
  .words {
    border: none;
  }
}
</style>