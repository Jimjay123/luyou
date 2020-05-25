<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-08-29 13:19:25
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-10-28 10:53:48
 -->
<template>
  <el-container>
    <el-main>
      <div class="blank">
        <div class="tip">咦，没有找到相关内容~</div>
        <div class="sub-tip">去看看有什么不错课程推荐吧！</div>
      </div>
      <!-- 课程推荐 -->
      <div class="plana">
        <div class="ans1">
          <span></span>
          <i>课程推荐</i>
          <span>基于陆由Starry core 大数据统计</span>
        </div>
      </div>

      <!-- 热门课程 -->
      <div class="curriculum">
        <p class="hots">热门课程</p>
      </div>

      <div class="swiper-father">
        <div class="swiper-container" id="swiper1">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" :key="item.id">
              <div class="card1" :class="item.type == 2 ? cardone:cardtwo">
                <div class="casd" @click="StandarddetailsClick(item.type,item.keyId)">
                  <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                  <img :src="item.popularizeImageUrl" alt class="imgsr2" v-if="item.type === 2" />
                  <img :src="item.popularizeImageUrl" alt class="imgsr3" v-if="item.type === 2" />
                  <div class="corner" v-if="item.type === 2">频道</div>
                  <img src="../../assets/img/duration.svg" alt class="imgr" />
                  <span class="duration">{{item.duration}}分钟</span>
                </div>
                <div class="tj">
                  <p class="pp1">{{item.keyName}}</p>
                  <div class="cas">
                    <img
                      src="../../assets/img/red.svg"
                      alt
                      class="imr"
                      v-if="item.officialFlag == true"
                    />
                    <div
                      class="cards clearfix"
                      v-for="(items,index) in item.tagNameList"
                      :key="index"
                    >
                      <span>{{items}}</span>
                    </div>
                  </div>
                  <div class="names">
                    <img :src="item.avatar" alt class="im1" />
                    <span class="sp1">{{item.ownerName}}</span>
                    <img src="../../assets/img/v1.svg" alt class="im2" v-if="item.ownerLevel == 1" />
                    <span class="sp2">/{{item.orgName}}</span>
                  </div>
                  <div class="white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev prev1"></div>
        <div class="swiper-button-next next1"></div>
      </div>

      <!-- 最新课程 -->
      <div class="curriculum">
        <p class="hots">最新课程</p>
      </div>

      <div class="swiper-father">
        <div class="swiper-container" id="swiper2">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list1" :key="item.id">
              <div class="card1" :class="item.type == 2 ? cardone:cardtwo">
                <div class="casd" @click="StandarddetailsClick(item.type,item.keyId)">
                  <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                  <img :src="item.popularizeImageUrl" alt class="imgsr2" v-if="item.type === 2" />
                  <img :src="item.popularizeImageUrl" alt class="imgsr3" v-if="item.type === 2" />
                  <div class="corner" v-if="item.type === 2">频道</div>
                  <img src="../../assets/img/duration.svg" alt class="imgr" />
                  <span class="duration">{{item.duration}}分钟</span>
                </div>
                <div class="tj">
                  <p class="pp1">{{item.keyName}}</p>
                  <div class="cas">
                    <img
                      src="../../assets/img/red.svg"
                      alt
                      class="imr"
                      v-if="item.officialFlag == true"
                    />
                    <div
                      class="cards clearfix"
                      v-for="(items,index) in item.tagNameList"
                      :key="index"
                    >
                      <span>{{items}}</span>
                    </div>
                  </div>
                  <div class="names">
                    <img :src="item.avatar" alt class="im1" />
                    <span class="sp1">{{item.ownerName}}</span>
                    <img src="../../assets/img/v1.svg" alt class="im2" v-if="item.ownerLevel == 1" />
                    <span class="sp2">/{{item.orgName}}</span>
                  </div>
                  <div class="white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev prev2"></div>
        <div class="swiper-button-next next2"></div>
      </div>

      <!-- 同行在教 -->
      <div class="curriculum">
        <p class="hots">同行在教</p>
      </div>

      <div class="swiper-father">
        <div class="swiper-container" id="swiper3">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list2" :key="item.id">
              <div class="card1" :class="item.type == 2 ? cardone:cardtwo">
                <div class="casd" @click="StandarddetailsClick(item.type,item.keyId)">
                  <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                  <img :src="item.popularizeImageUrl" alt class="imgsr2" v-if="item.type === 2" />
                  <img :src="item.popularizeImageUrl" alt class="imgsr3" v-if="item.type === 2" />
                  <div class="corner" v-if="item.type === 2">频道</div>
                  <img src="../../assets/img/duration.svg" alt class="imgr" />
                  <span class="duration">{{item.duration}}分钟</span>
                </div>
                <div class="tj">
                  <p class="pp1">{{item.keyName}}</p>
                  <div class="cas">
                    <img
                      src="../../assets/img/red.svg"
                      alt
                      class="imr"
                      v-if="item.officialFlag == true"
                    />
                    <div
                      class="cards clearfix"
                      v-for="(items,index) in item.tagNameList"
                      :key="index"
                    >
                      <span>{{items}}</span>
                    </div>
                  </div>
                  <div class="names">
                    <img :src="item.avatar" alt class="im1" />
                    <span class="sp1">{{item.ownerName}}</span>
                    <img src="../../assets/img/v1.svg" alt class="im2" v-if="item.ownerLevel == 1" />
                    <span class="sp2">/{{item.orgName}}</span>
                  </div>
                  <div class="white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev prev3"></div>
        <div class="swiper-button-next next3"></div>
      </div>

      <!-- 可能喜欢 -->
      <div class="curriculum">
        <p class="hots">可能喜欢</p>
      </div>

      <div class="swiper-father">
        <div class="swiper-container" id="swiper4">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list6" :key="item.id">
              <div class="card1" :class="item.type == 2 ? cardone:cardtwo">
                <div class="casd" @click="StandarddetailsClick(item.type,item.keyId)">
                  <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                  <img :src="item.popularizeImageUrl" alt class="imgsr2" v-if="item.type === 2" />
                  <img :src="item.popularizeImageUrl" alt class="imgsr3" v-if="item.type === 2" />
                  <div class="corner" v-if="item.type === 2">频道</div>
                  <img src="../../assets/img/duration.svg" alt class="imgr" />
                  <span class="duration">{{item.duration}}分钟</span>
                </div>
                <div class="tj">
                  <p class="pp1">{{item.keyName}}</p>
                  <div class="cas">
                    <img
                      src="../../assets/img/red.svg"
                      alt
                      class="imr"
                      v-if="item.officialFlag == true"
                    />
                    <div
                      class="cards clearfix"
                      v-for="(items,index) in item.tagNameList"
                      :key="index"
                    >
                      <span>{{items}}</span>
                    </div>
                  </div>
                  <div class="names">
                    <img :src="item.avatar" alt class="im1" />
                    <span class="sp1">{{item.ownerName}}</span>
                    <img src="../../assets/img/v1.svg" alt class="im2" v-if="item.ownerLevel == 1" />
                    <span class="sp2">/{{item.orgName}}</span>
                  </div>
                  <div class="white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev prev4"></div>
        <div class="swiper-button-next next4"></div>
      </div>

      <!-- 推荐的课程计划 -->
      <div class="planb">
        <div class="ans1">
          <span></span>
          <i>推荐的课程计划</i>
          <span>基于陆由Starry core 大数据统计</span>
        </div>
      </div>

      <div class="art" v-for="item in list4" :key="item.id">
        <div class="cards" :class="item.type == 2 ? cardos:cardts">
          <img :src="item.popularizeImageUrl" alt class="im1" />

          <img :src="item.popularizeImageUrl" alt class="im2" v-if="item.type === 2" />

          <img :src="item.popularizeImageUrl" alt class="im3" v-if="item.type === 2" />
          <div class="corner" v-if="item.type === 2">频道</div>
          <h3 class="hb">世界艺术史</h3>
          <div class="bq">
            <p class="guan">官方</p>
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
            <span>{{item.duration}}分钟·{{item.totalBundle}}章</span>
            <span>{{item.modifyDatetime}} 更新了</span>
          </p>
          <p class="words2">{{item.summary}}</p>
          <el-row>
            <el-button round @click="StandarddetailsClick1(item.type,item.keyId)">去预览</el-button>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {
  couAppNewestCourses,
  courseRecommendList
} from "../../service/groupApi";
import { tipsFail } from "../../utils/utils";
import Swiper from "swiper";

export default {
  name: "recommend",
  created() {
    // 热门课程
    courseRecommendList({ limit: "50", page: "1", position: "1" })
      .then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 最新课程
    courseRecommendList({ limit: "50", page: "1", position: "6" })
      .then(res => {
        if (res.code == "0") {
          this.list1 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 同行在教
    courseRecommendList({ limit: "50", page: "1", position: "2" })
      .then(res => {
        if (res.code == "0") {
          this.list2 = res.page.list;
          // console.log(res);
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 同专业在学
    courseRecommendList({ limit: "50", page: "1", position: "5" })
      .then(res => {
        if (res.code == "0") {
          this.list3 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 可能喜欢
    courseRecommendList({ limit: "50", page: "1", position: "3" })
      .then(res => {
        if (res.code == "0") {
          this.list6 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 推荐课程计划
    courseRecommendList({ limit: "41", page: "1", position: "4" })
      .then(res => {
        if (res.code == "0") {
          this.list4 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  data() {
    return {
      cardos: "cardos",
      cardts: "cardts",
      spw: "spw",
      spy: "spy",
      cardone: "cardone",
      cardtwo: "cardtwo",
      card1: false,
      cardsz: false,
      none: false,
      inputVal: "",
      search: "",
      list: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      card: true,
      input: "",
      radio: "1",
      cards1: false,
      activeIndex: "1",
      activeIndex2: "1",
      msg: "Welcome to Your Vue.js App",
      progreess: 30
    };
  },
  methods: {
    getMockData() {
      return Array(4)
        .fill(0)
        .map((_, index) => ({
          id: index,
          popularizeImageUrl: require(`../../assets/img/zhu${(Math.round(
            Math.random() * 10
          ) %
            3) +
            1}.svg`),
          keyName: "小组工作技能实训",
          tagNameList: ["社会", "社会工作", "人力资源"],
          avatar: require("../../assets/group/boy.svg"),
          ownerName: "陈丹青",
          duration: 60,
          modifyDatetime: "2019-7-15 更新了",
          summary:
            "界定问题是将前一步同情心中得来的用户信息加以抽象，以获得一个具体的、有价值的创新工作目标。这是一种“专注”模式。界定问题的步骤有两个目标。一个是深入解析用户信息并为后续设计解决方案提供发挥的空间，同时根据这种理解提出可行的问题陈述：POV。"
        }));
    },
    StandarddetailsClick(wrz, val, key) {
      if (wrz === 4 || wrz === 0) {
        return;
      }
      if (val === 2) {
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
    },
    StandarddetailsClick1(wrz, val, key) {
      console.log(key);
      if (wrz === 4 || wrz === 0) {
        return;
      }
      if (val === 2) {
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
  },
  mounted() {
    // this.menu();
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper1", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
        spaceBetween: 80 / 3,
        navigation: {
          nextEl: ".next1",
          prevEl: ".prev1"
        }
      });
    }, 500);
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper2", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
        spaceBetween: 80 / 3,
        navigation: {
          nextEl: ".next2",
          prevEl: ".prev2"
        }
      });
    }, 500);
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper3", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
        spaceBetween: 80 / 3,
        navigation: {
          nextEl: ".next3",
          prevEl: ".prev3"
        }
      });
    }, 500);
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper4", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
        spaceBetween: 80 / 3,
        navigation: {
          nextEl: ".next4",
          prevEl: ".prev4"
        }
      });
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.el-container {
  max-width: 1220px;
  margin: 0 auto;
}
.el-main {
  overflow: visible;
  position: relative;
  width: 1220px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  .blank {
    height: 240px;
    text-align: center;
    .tip {
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      padding-top: 100px;
      color: #666;
    }
    .sub-tip {
      font-size: 14px;
      padding-top: 5px;
      color: #999;
    }
  }
  .plana {
    margin-top: 59px;
    margin-left: 10px;
    margin-right: 10px;
    .ans1 {
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      span:first-child {
        display: inline-block;
        height: 31px;
        border-left: 8px solid rgba(254, 120, 101, 1);
        border-radius: 4px;
      }
      i {
        text-align: center;
        // width: 116px;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        font-style: normal;
        margin-left: 10px;
        font-size: 28px;
      }
      span:last-child {
        font-family: PingFangSC-Regular;
        // line-height: 20px;
        margin-left: 13px;
        color: rgba(60, 60, 67, 0.6);
        font-size: 16px;
      }
    }
  }
  .curriculum {
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
    .hots {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
  }
  #swiper1 {
    width: 1200px;
    padding-bottom: 32px;
    padding-top: 20px;
  }
  #swiper2 {
    width: 1200px;
    padding-bottom: 32px;
    padding-top: 20px;
  }
  #swiper3 {
    width: 1200px;
    padding-bottom: 32px;
    padding-top: 20px;
  }
  #swiper4 {
    width: 1200px;
    padding-bottom: 32px;
    padding-top: 20px;
  }
  .cardone {
    float: left;
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
        //两行溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .cas {
        width: 290px;
        height: 20px;
        overflow: hidden;
        .imr {
          float: left;
        }
        .cards {
          float: left;
          height: 20px;
          line-height: 14px;
          background: rgba(250, 250, 250, 1);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
          margin-left: 14px;
          padding: 0px 5px 4px 5px;
          span {
            font-size: 12px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        .cards:nth-child(1) {
          margin-left: 0;
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
      .white {
        width: 30px;
        height: 20px;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.9) 60%,
          rgba(255, 255, 255, 0) 100%
        );
        position: absolute;
        right: 0px;
        top: 61px;
      }
    }
  }
  .cardtwo {
    float: left;
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
        //两行溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .cas {
        width: 290px;
        height: 20px;
        overflow: hidden;
        .imr {
          float: left;
        }
        .cards {
          float: left;
          height: 20px;
          line-height: 14px;
          background: rgba(250, 250, 250, 1);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
          margin-left: 14px;
          padding: 0px 5px 4px 5px;
          span {
            font-size: 12px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        .cards:nth-child(1) {
          margin-left: 0;
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
      .white {
        width: 30px;
        height: 20px;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.9) 60%,
          rgba(255, 255, 255, 0) 100%
        );
        position: absolute;
        right: 0px;
        top: 61px;
      }
    }
  }
  .planb {
    margin-left: 10px;
    margin-right: 10px;
    .ans1 {
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      span:first-child {
        display: inline-block;
        height: 31px;
        border-left: 8px solid rgba(254, 120, 101, 1);
        border-radius: 4px;
      }
      i {
        text-align: center;
        // width: 116px;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        font-style: normal;
        margin-left: 10px;
        font-size: 28px;
      }
      span:last-child {
        font-family: PingFangSC-Regular;
        // line-height: 20px;
        margin-left: 13px;
        color: rgba(60, 60, 67, 0.6);
        font-size: 16px;
      }
    }
  }
  .art {
    height: 283px;
    margin-bottom: 60px;
    padding-top: 30px;
    padding-left: 10px;
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
        border-radius: 12px;
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
        border-radius: 12px;
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
        border-radius: 12px;
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
      .hb {
        position: absolute;
        bottom: 63px;
        left: 20px;
        z-index: 9;
        width: 148px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
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
          width: 68px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 28px;
        }
        .im22 {
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
        border-radius: 12px;
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
        border-radius: 12px;
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
        border-radius: 12px;
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
        border-radius: 12px;
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
      .hb {
        position: absolute;
        bottom: 63px;
        left: 20px;
        z-index: 9;
        width: 148px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
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
          width: 68px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 28px;
        }
        .im22 {
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
        border-radius: 12px;
      }
      .corner {
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
        span:nth-child(1) {
          width: 101px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 600;
          color: rgba(74, 74, 74, 1);
          line-height: 22px;
        }
        span:nth-child(2) {
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
        height: 84px;
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
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .el-row {
        margin-top: 39px;
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
}
.swiper-slide {
  width: 280px !important;
  // margin-right: 27px;
}
.swiper-father {
  position: relative;
}
.swiper-button-prev {
  opacity: 0.35;
  width: 48px;
  height: 48px;
  position: absolute;
  left: -18px;
  top: 36%;
  background: url(../../assets/img/zuojiantou.svg);
  transform: translateY(-50%);
  outline: none;
}
.swiper-button-next {
  opacity: 0.35;
  width: 48px;
  height: 48px;
  position: absolute;
  right: -16px;
  top: 36%;
  transform: translateY(-50%);
  background: url(../../assets/img/youjiantou.svg);
  outline: none;
}
.swiper-button-prev:hover {
  opacity: 1;
}
.swiper-button-next:hover {
  opacity: 1;
}
.card {
  position: absolute;
  right: 25%;
  top: 158px;
  margin-top: 10px;
  border-radius: 10px;
  width: 484px;
  height: 184px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
  z-index: 998;
  .Triangle {
    position: absolute;
    top: -20px;
    left: 45px;
    z-index: 999;
    width: 10px;
    height: 10px;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid rgba(255, 255, 255, 1);
    border-left: 10px solid transparent;
  }
  .one {
    position: relative;
    z-index: 999;
    margin-top: 26px;
    margin-right: 28px;
    float: right;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
    border: 0px solid transparent;
    background-color: #fff;
  }
  .two {
    margin-top: 26px;
    margin-left: 22px;
    float: left;
    width: 352px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 22px;
  }
  .three {
    margin-top: 26px;
    margin-left: 22px;
    float: left;
    width: 338px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 22px;
  }
  .el-button {
    position: absolute;
    top: 48px;
    right: 28px;
    // margin-right: 28px;
    margin-top: 19px;
    width: 98px;
    height: 36px;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border-radius: 18px;
    text-align: center;
    float: right;
    z-index: 999;
    // line-height: 10px;

    span {
      position: absolute;
      top: 25%;
      left: 20%;
      // vertical-align: middle;
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #fff;
      line-height: 18px;
    }
  }
  img {
    margin-top: 26px;
    margin-left: 22px;
    width: 84px;
    height: 30px;
  }
}
.cards1 {
  position: absolute;
  left: 25%;
  top: 4.5%;
  margin-top: 10px;
  border-radius: 10px;
  width: 551px;
  height: 253px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
  border-radius: 13px;

  .h {
    vertical-align: middle;
    align-items: center;
    margin-top: 22px;
    margin-left: 32px;
    height: 30px;
    line-height: 30px;
    h3 {
      float: left;
      font-size: 22px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }
    span {
      margin-left: 8px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(153, 153, 153, 1);
      line-height: 19px;
      letter-spacing: 1px;
    }
  }
  .el-input {
    margin-top: 34px;
    margin-left: 32px;

    width: 487px;
    height: 40px;
  }
  .el-radio {
    margin-top: 19px;
    color: #606266;
    margin-left: 32px;
    .el-radio .is-checked {
      color: #fe7865;
      .el-radio__label {
        color: #fe7865;
        border-color: #fe7865;
      }
    }
    // border-color: #fe7865;
  }

  .el-button:first-child {
    position: absolute;
    top: 30px;
    right: 166px;
    width: 98px;
    height: 36px;
    border: 2px solid #fe7865;
    border-radius: 18px;
    text-align: center;
    float: right;
    z-index: 9999;
    span {
      position: absolute;
      top: 25%;
      left: 30%;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(254, 120, 101, 1);
      line-height: 16px;
    }
  }
  .el-button:last-child {
    position: absolute;
    top: 30px;
    right: 32px;
    width: 98px;
    height: 36px;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border-radius: 18px;
    text-align: center;
    float: right;
    z-index: 999;
    border: none;
    span {
      position: absolute;
      top: 25%;
      left: 15%;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 18px;
    }
  }
}
</style>
