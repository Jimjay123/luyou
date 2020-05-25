<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-08-29 13:19:25
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-11-21 10:48:58
 -->
<template>
  <div class="container clearfix">
    <div class="nas1" v-for="item in list" :key="item.id" :ref="'nas1' + item.coursePlanType">
      <a href="javascript:;" class="nas">
        <div class="he">
          <img :src="item.popularizeImageUrl" alt />
          <div class="corner" v-if="item.coursePlanType === 23 ? true:false">频道</div>
          <div class="sandchannel" v-if="item.coursePlanType === 24 ? true:false">沙盘频道</div>
          <div
            class="sandstandard"
            v-if="(item.coursePlanType === 25 || item.coursePlanType === 26) ? true:false"
          >沙盘</div>
          <div class="count">
            <p
              class="one"
              v-if=" (item.finishPercent == null || item.finishPercent == 0) && item.expireFlag != true"
            >未开始</p>
            <p
              class="two"
              v-else-if="item.finishPercent > 0 && item.finishPercent < 100 && item.expireFlag != true"
            >
              已完成
              <span>{{item.finishPercent}}%</span>
            </p>
            <p class="three" v-else-if="item.finishFlag == true && item.expireFlag != true">已完成</p>
            <p class="four" v-else-if="item.expireFlag == true">已过期</p>
            <p class="five" v-if="item.expireFlag == true">完成了：{{item.finishPercent||0}}%</p>
          </div>
        </div>
        <div class="chang">
          <div
            class="progress"
            :style="{width:(item.finishPercent||0)+'%'}"
            v-if="item.finishPercent > 0 && item.finishPercent < 100"
          ></div>
          <div
            class="progres"
            :style="{width:(item.finishPercent||0)+'%'}"
            v-if="item.finishPercent == 100"
          ></div>
        </div>
        <div class="statistics">
          <h3>{{item.coursePlanName}}</h3>
          <div class="ri">
            <p class="two">截止日</p>
            <span>：</span>
            <span>{{item.endDate}}</span>
          </div>

          <div class="qun">
            <p class="two">群组</p>
            <span>：</span>
            <span class="twoos">{{item.groupName}}</span>
          </div>

          <div class="act">
            <img :src="item.avatar || require('../../assets/img/touxiang.svg')" />
            <p>{{item.teacherName}}</p>
          </div>
          <el-row
            v-if="(item.finishPercent == null || item.finishPercent == 0) && item.expireFlag != true"
          >
            <el-button
              class="qxx"
              @click.stop="xueclick(item.groupId,item.coursePlanId,item.coursePlanType,)"
            >
              <span>去学习</span>
            </el-button>
          </el-row>

          <el-row
            v-if="item.finishPercent > 0 && item.finishPercent < 100 && item.expireFlag != true"
          >
            <el-button
              class="tws"
              @click.stop="xueclick1(item.courseServerUrl,item.groupId,item.coursePlanId,item.coursePlanType,item.refKeyId)"
            >
              <span>继续学习</span>
            </el-button>
          </el-row>

          <el-row v-if="item.finishFlag == true || item.expireFlag == true">
            <el-button
              class="ths"
              @click.stop="xueclick2(item.groupId,item.coursePlanId,item.coursePlanType,)"
            >
              <span>查看报告</span>
            </el-button>
          </el-row>

          <div class="wc" v-if="item.finishFlag == true && item.expireFlag != true">
            <img src="../../assets/img/yiwancheng.svg" alt />
          </div>

          <div class="gq" v-if="item.expireFlag === true">
            <img src="../../assets/img/yiguoqi.svg" alt />
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import { jumpOrther } from "../../utils/utils";
@Component({
  name: "MyPlan"
})
export default class MyPlan extends Vue {
  @Prop(Array) list;
  xueclick(group, cour, type) {
    if (type === 2) {
      this.$router.push({
        path: "/StudentChannel",
        query: {
          groupId: group,
          coursePlanId: cour,
          coursePlanType: type
        }
      });
    } else {
      this.$router.push({
        path: "/StudentStandard",
        query: {
          groupId: group,
          coursePlanId: cour,
          coursePlanType: type
        }
      });
    }
  }
  xueclick1(url, group, cour, type, ref) {
    this.group = group;
    this.cour = cour;
    this.type = type;
    let token = sessionStorage.getItem("assent_token");
    if (type === 1) {
      jumpOrther(url, group, cour, ref, token);
    } else {
      this.$router.push({
        path: "/StudentChannel",
        query: {
          groupId: group,
          coursePlanId: cour,
          coursePlanType: type
        }
      });
    }
  }
  xueclick2(group, cour, type) {
    if (type === 2) {
      this.$router.push({
        path: "/StudentReportsChannel",
        query: {
          groupId: group,
          coursePlanId: cour,
          coursePlanType: type
        }
      });
    } else {
      this.$router.push({
        path: "/StudentReports",
        query: {
          groupId: group,
          coursePlanId: cour,
          coursePlanType: type
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.nas1 {
  float: left;
  // margin-top: 27px;
  border-radius: 13px;
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
  margin-right: 26px;
  margin-bottom: 40px;
  .whole {
    position: absolute;
    top: 132px;
    right: 0;
    line-height: 40px;
    span {
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #666666;
      line-height: 28px;
      letter-spacing: 1px;
    }
    .imgs {
      width: 22px;
      height: 22px;
      color: #666666;
      margin-bottom: 7px;
    }
  }

  .nas {
    position: relative;
    display: inline-block;
    width: 280px;
    height: 348px;
    overflow: hidden;
    .he {
      height: 146px;
      img {
        width: 280px;
        height: 146px;
        border-radius: 13px 13px 0 0;
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
      }
      .sandstandard {
        width: 54px;
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
      }
      .count {
        position: absolute;
        top: 102px;
        width: 280px;
        height: 44px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px 10px 0px 0px;
        .one {
          position: absolute;
          right: 14px;
          bottom: 7px;
          width: 64px;
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 28px;
          letter-spacing: 1px;
        }
        .two {
          position: absolute;
          right: 14px;
          bottom: 7px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          line-height: 20px;
          span {
            font-size: 26px;
            font-family: Bebas;
            color: rgba(254, 120, 101, 1);
            line-height: 35px;
            letter-spacing: 1px;
          }
        }
        .three {
          position: absolute;
          right: 14px;
          bottom: 7px;
          width: 64px;
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          line-height: 28px;
          letter-spacing: 1px;
        }
        .four {
          position: absolute;
          right: 14px;
          bottom: 7px;
          width: 64px;
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          line-height: 28px;
          letter-spacing: 1px;
        }
        .five {
          position: absolute;
          left: 14px;
          bottom: 7px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          line-height: 20px;
        }
      }
    }
    .chang {
      width: 100%;
      height: 6px;
      background: rgba(153, 153, 153, 0.35);
      div.progress {
        background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
        border-radius: 0px 3px 3px 0px;
        height: 6px;
        line-height: 6px;
      }
      div.progres {
        background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
        height: 6px;
        line-height: 6px;
      }
    }
    .statistics {
      padding-left: 16px;
      position: relative;
      overflow: hidden;
      h3 {
        padding-right: 16px;
        height: 60px;
        font-size: 18px;
        font-family: PingFangSC-Semibold;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        letter-spacing: 1px;
        margin-top: 18px;
        margin-bottom: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .ri {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        margin-bottom: 12px;
        .two {
          width: 45px;
          float: left;
          letter-spacing: 1px !important;
        }
      }
      .qun {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        overflow: hidden;
        .two {
          width: 45px;
          float: left;
          text-justify: distribute;
          text-align: justify;
          text-align-last: justify;
        }
      }
      .act {
        margin-top: 9px;
        height: 25px;
        margin-bottom: 20px;
        img {
          width: 24px;
          height: 25px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          float: left;
        }
        p {
          float: left;
          margin-left: 11px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 25px;
        }
      }
      .qxx {
        position: absolute;
        bottom: 20px;
        right: 17px;
        width: 80px;
        height: 26px;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 13px;
        text-align: center;
        float: right;
        z-index: 9;
        border: none;
        span {
          position: absolute;
          top: 26%;
          left: 28%;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 13px;
        }
      }
      .tws {
        position: absolute;
        bottom: 20px;
        right: 17px;
        width: 80px;
        height: 26px;
        font-size: 12px;
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        border-radius: 13px;
        text-align: center;
        float: right;
        z-index: 9;
        border: none;
        span {
          position: absolute;
          top: 26%;
          left: 20%;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 13px;
        }
      }
      .ths {
        position: absolute;
        bottom: 20px;
        right: 17px;
        width: 79px;
        height: 26px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 13px;
        border: 1px solid rgba(240, 240, 240, 1);
        text-align: center;
        float: right;
        z-index: 9;
        span {
          position: absolute;
          top: 25%;
          left: 20%;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 12px;
        }
      }
      .wc {
        position: absolute;
        right: -16px;
        bottom: -22px;
      }
      .gq {
        position: absolute;
        bottom: -22px;
        right: -16px;
      }
      .el-button:active {
        color: #fff;
        border-color: #fff;
      }
    }
  }
}
.nas1:last-child {
  margin-right: 0;
}
.nas1:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 10px 0px rgba(153, 153, 153, 0.5);
  border-radius: 13px;
}
</style>
