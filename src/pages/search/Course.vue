<template>
  <div class="introduce-container clearfix">
    <div class="introduce" v-for="item in list" :key="item.id">
      <div class="card1" :class="(item.keyType == 11 || item.keyType == 12) ? cardone:cardtwo">
        <div class="casd" @click="StandarddetailsClick(wrz,item.keyType,item.keyId)">
          <img :src="item.popularizeImageUrl" alt class="imgsr1" />
          <img
            :src="item.popularizeImageUrl"
            alt
            class="imgsr2"
            v-if="item.keyType == 11 || item.keyType == 12"
          />
          <img
            :src="item.popularizeImageUrl"
            alt
            class="imgsr3"
            v-if="item.keyType == 11 || item.keyType == 12"
          />
          <div class="corner" v-if="item.keyType === 11 ? true:false">频道</div>
          <div class="sandchannel" v-if="item.keyType === 12 ? true:false">沙盘频道</div>
          <div
            class="sandstandard"
            v-if="(item.keyType === 3 || item.keyType === 4) ? true:false"
          >沙盘</div>
          <div class="counts">
            <img src="../../assets/img/duration.svg" alt class="imgr" />
            <span class="duration">{{item.duration}}分钟</span>
          </div>
        </div>
        <div class="tj">
          <p class="pp1">{{item.keyName}}</p>
          <div class="cas">
            <img src="../../assets/img/red.svg" alt class="imr" v-if="item.officialFlag == true" />
            <div class="cards clearfix" v-for="items in item.tagNameList" :key="items">
              <span>{{items}}</span>
            </div>
          </div>
          <div class="names">
            <img :src="item.avatar" alt class="im1" />
            <span class="sp1">{{item.ownerName}}</span>
            <img src="../../assets/img/v1.svg" alt class="im2" v-if="item.ownerLevel == 1" />
            <span class="sp2">/{{item.orgName}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "course"
})
export default class Course extends Vue {
  @Prop(Array) list;
  cardone = "cardone";
  cardtwo = "cardtwo";
  StandarddetailsClick(wrz, val, key) {
    if (wrz === 4 || wrz === 0) {
      return;
    }
    if (val === 11 || val === 12) {
      this.$router.push({
        path: "/prechannel",
        query: {
          courseChannelId: key
        }
      });
    } else {
      this.$router.push({
        path: "/Recstandard",
        query: {
          courseId: key
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.introduce-container {
  // min-height: calc(100vh - 346px);
  max-width: 1200px;
  margin: 0 auto;
}
.introduce {
  float: left;
  height: 340px;
  margin-right: 20px;
  .cardone {
    height: 324px;
    width: 280px;
    position: relative;
    .casd {
      position: relative;
      height: 170px;
      width: 280px;
      .imgsr1 {
        position: absolute;
        top: 0;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 12px;
        transition: 0.2s;
        opacity: 1;
        z-index: 9;
        cursor: pointer;
      }
      .imgsr2 {
        position: absolute;
        top: 6px;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 8px;
        transition: 0.2s;
        opacity: 0.5;
        transform: scaleX(0.97);
        z-index: 8;
      }
      .imgsr3 {
        position: absolute;
        top: 12px;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 8px;
        transition: 0.2s;
        opacity: 0.189;
        transform: scaleX(0.95);
        z-index: 7;
      }
      .corner {
        position: absolute;
        top: 0;
        width: 54px;
        height: 30px;
        background: rgba(254, 120, 101, 1);
        border-radius: 8px 0px 8px 0px;
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
        z-index: 9;
      }
      .sandchannel {
        width: 88px;
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
      .imgr {
        position: absolute;
        bottom: 9px;
        right: 76px;
        transition: 0.2s;
        z-index: 9;
      }
      .duration {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 0px 0px 12px 12px;
        position: absolute;
        bottom: 9px;
        left: 213px;
        transition: 0.2s;
        z-index: 9;
      }
    }
    .casd:hover {
      position: relative;
      height: 170px;
      width: 280px;
      .imgsr1 {
        position: absolute;
        top: -6px;
      }
      .imgsr2 {
        position: absolute;
        top: 3px;
      }
      .corner {
        position: absolute;
        top: -6px;
      }
      .sandchannel {
        position: absolute;
        top: -6px;
      }
      .sandstandard {
        position: absolute;
        top: -6px;
      }
      .imgr {
        position: absolute;
        bottom: 19px;
      }
      .duration {
        position: absolute;
        bottom: 19px;
      }
    }
    .tj {
      position: absolute;
      top: 170px;
      margin-left: 10px;
      margin-top: 18px;
      .pp1 {
        width: 248px;
        height: 50px;
        font-size: 18px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 11px;
        line-height: 25px;
        letter-spacing: 1px;
      }
      .cas {
        overflow: hidden;
        .imr {
          float: left;
          margin-right: 11px;
        }
        .cards {
          float: left;
          height: 20px;
          line-height: 14px;
          background: rgba(250, 250, 250, 1);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
          margin-right: 14px;
          padding: 0px 5px 4px 5px;
          span {
            font-size: 12px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
      .names {
        height: 20px;
        margin-top: 10px;
        line-height: 20px;
        .im1 {
          float: left;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .sp1 {
          float: left;
          display: block;
          height: 20px;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-left: 9px;
        }
        .im2 {
          float: left;
          width: 13px;
          height: 9px;
          border-radius: 1px;
          margin-left: 6px;
          margin-top: 6px;
        }
        .sp2 {
          float: left;
          display: block;
          width: 171px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(194, 194, 194, 1);
          margin-left: 3px;
        }
      }
    }
  }
  .cardtwo {
    height: 324px;
    width: 280px;
    position: relative;
    .casd {
      position: relative;
      height: 170px;
      width: 280px;
      .imgsr1 {
        position: absolute;
        top: 0;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 12px;
        transition: 0.2s;
        opacity: 1;
        z-index: 9;
        cursor: pointer;
      }
      .corner {
        position: absolute;
        top: 0;
        width: 54px;
        height: 30px;
        background: rgba(254, 120, 101, 1);
        border-radius: 8px 0px 8px 0px;
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
      .imgr {
        position: absolute;
        bottom: 8px;
        right: 76px;
        transition: 0.2s;
        z-index: 19;
      }
      .duration {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 0px 0px 12px 12px;
        position: absolute;
        bottom: 8px;
        left: 213px;
        transition: 0.2s;
        z-index: 19;
      }
    }
    .casd:hover {
      position: relative;
      height: 170px;
      width: 280px;
      .imgsr1 {
        position: absolute;
        top: -6px;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );

        box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
      }
      .imgsr2 {
        position: absolute;
        top: 3px;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
      }
      .imgr {
        position: absolute;
        bottom: 18px;
      }
      .sandchannel {
        position: absolute;
        top: -6px;
      }
      .sandstandard {
        position: absolute;
        top: -6px;
      }
      .duration {
        position: absolute;
        bottom: 18px;
      }
    }
    .tj {
      position: absolute;
      top: 170px;
      margin-left: 10px;
      margin-top: 18px;
      .pp1 {
        width: 248px;
        height: 50px;
        font-size: 18px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 11px;
        line-height: 25px;
        letter-spacing: 1px;
      }
      .cas {
        overflow: hidden;
        .imr {
          float: left;
          margin-right: 11px;
        }
        .cards {
          float: left;
          height: 20px;
          line-height: 14px;
          background: rgba(250, 250, 250, 1);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
          margin-right: 14px;
          padding: 0px 5px 4px 5px;
          span {
            font-size: 12px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
      .names {
        height: 20px;
        margin-top: 10px;
        line-height: 20px;
        .im1 {
          float: left;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .sp1 {
          float: left;
          display: block;
          height: 20px;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-left: 9px;
        }
        .im2 {
          float: left;
          width: 13px;
          height: 9px;
          border-radius: 1px;
          margin-left: 6px;
          margin-top: 6px;
        }
        .sp2 {
          float: left;
          display: block;
          width: 171px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(194, 194, 194, 1);
          margin-left: 3px;
        }
      }
    }
  }
}
</style>