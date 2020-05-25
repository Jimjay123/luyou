<template>
  <div class="container clearfix">
    <div class="nas1" v-for="item in list" :key="item.id" :ref="'nas1' + item.coursePlanType">
      <a
        href="javascript:;"
        class="nas"
        @click.stop="xueclick(item.coursePlanId,item.coursePlanType,item.stateName,item.groupId)"
      >
        <div class="he">
          <img :src="item.popularizeImageUrl" alt class="imgs1" />
          <div class="corner" v-if="item.coursePlanType === 23 ? true:false">频道</div>
          <div class="sandchannel" v-if="item.coursePlanType === 24 ? true:false">沙盘频道</div>
          <div
            class="sandstandard"
            v-if="(item.coursePlanType === 25 || item.coursePlanType === 26) ? true:false"
          >沙盘</div>
          <img
            src="../../assets/img/yulan.svg"
            alt
            class="imgs2"
            v-if="item.stateName === '未发布'"
            @click.stop="xueclick1(item.coursePlanId,item.coursePlanType,item.stateName)"
          />
          <div class="counts"></div>
          <div class="count" v-if="item.stateName === '未发布' ? false:true">
            已完成
            <span class="oo1">{{item.finishStudentCount||0}}</span>
            <span class="oo2">/</span>
            <span class="oo3">{{item.totalStudentCount||0}}</span>
            人
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
            <span>{{item.beginDate||'未设置'}}</span> -
            <span>{{item.endDate||'未设置'}}</span>
          </div>

          <div class="qun">
            <p class="two">群组</p>
            <span>：</span>
            <span>{{item.groupName||'未设置'}}</span>
          </div>

          <div class="zh">
            <p class="two">状态</p>
            <span>：</span>
            <span :class="item.stateName === '未发布' ? spw: spy">{{item.stateName||'未设置'}}</span>
          </div>
          <el-row>
            <el-button
              v-if="item.stateName == '未发布'"
              @click.stop="fbclick(item.coursePlanType,item.coursePlanId)"
            >
              <span>去编辑</span>
            </el-button>
          </el-row>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "MyPlan"
})
export default class MyPlan extends Vue {
  @Prop(Array) list;
  spw = "spw";
  spy = "spy";
  xueclick(cour, type, val, group) {
    console.log(cour, type, val, group);
    if (val == "已发布") {
      this.$router.push({
        path: "/groupStaAnalysis",
        query: {
          coursePlanId: cour,
          coursePlanType: type,
          groupId: group
        }
      });
    }
    if (val == "未发布") {
      if (type === 23 || type === 24) {
        this.$router.push({
          path: "teachers/editCouPlans",
          query: {
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      } else {
        this.$router.push({
          path: "teachers/editCourseBase",
          query: {
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      }
    }
  }
  xueclick1(cour, type, val) {
    if (type === 23 || type === 24) {
      this.$router.push({
        path: "/Coursechanne",
        query: {
          coursePlanId: cour,
          coursePlanType: type
        }
      });
    } else {
      this.$router.push({
        path: "/Standarddetails",
        query: {
          coursePlanId: cour,
          coursePlanType: type
        }
      });
    }
  }
  fbclick(val, cour) {
    if (val === 23 || val === 24) {
      this.$router.push({
        path: "/teachers/editCouPlans",
        query: {
          coursePlanId: cour,
          addCourseType: "editChannel"
        }
      });
    } else {
      this.$router.push({
        path: "/teachers/editCourseBase",
        query: {
          coursePlanId: cour,
          addCourseType: "editCourse"
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.container {
  // min-height: calc(100vh - 346px);
  max-width: 1200px;
  margin: 0 auto;
}

.nas1 {
  float: left;
  margin-right: 24px;
  margin-bottom: 38px;
  border-radius: 13px;
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
  transition: 0.3s all;
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
    .he {
      height: 146px;
      .imgs1 {
        width: 280px;
        height: 146px;
        border-radius: 13px 13px 0px 0px;
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
      .imgs2 {
        display: none;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 28px;
        height: 28px;
      }
      .counts {
        position: absolute;
        top: 102px;
        width: 280px;
        height: 44px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px 10px 0px 0px;
      }
      .count {
        position: absolute;
        right: 10px;
        top: 110px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 20px;

        .oo1 {
          font-size: 26px;
          font-family: Bebas;
          color: rgba(254, 120, 101, 1);
          line-height: 35px;
          letter-spacing: 1px;
        }
        .oo2,
        .oo3 {
          font-size: 18px;
          font-family: Bebas;
          color: rgba(254, 120, 101, 1);
          line-height: 24px;
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
      position: relative;
      overflow: hidden;
      h3 {
        width: 248px;
        height: 50px;
        font-size: 18px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        padding-left: 16px;
        margin-top: 18px;
        margin-bottom: 22px;
      }
      .ri {
        margin-left: 16px;
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
        margin-left: 16px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        margin-bottom: 12px;
        .two {
          width: 45px;
          float: left;
          text-justify: distribute;
          text-align: justify;
          text-align-last: justify;
        }
      }
      .zh {
        margin-left: 16px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        padding-bottom: 15px;
        .two {
          width: 45px;
          float: left;
          text-justify: distribute;
          text-align: justify;
          text-align-last: justify;
        }
        .spw {
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(254, 98, 76, 1);
          line-height: 20px;
        }
      }
      .el-button {
        position: absolute;
        bottom: 12px;
        right: 16px;
        width: 63px;
        height: 26px;
        background: rgba(255, 255, 255, 1);
        border-radius: 13px;
        border: 1px solid rgba(254, 120, 101, 0.4);
        text-align: center;
        float: right;
        z-index: 999;
        span {
          position: absolute;
          top: 25%;
          left: 20%;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
          line-height: 13px;
        }
      }
      .el-button:active {
        color: #fff;
        border-color: #fff;
      }
    }
  }
  .nas:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 10px 0px rgba(153, 153, 153, 0.5);
    border-radius: 13px;
    .imgs2 {
      display: block;
    }
  }
}

.nas1:nth-child(4n) {
  margin-right: 0;
}
</style>