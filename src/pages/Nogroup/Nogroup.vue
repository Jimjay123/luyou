<template>
  <div>
    <el-container>
      <!-- 头部 -->

      <TopHeader class="clearfix"></TopHeader>

      <!-- 内容 -->
      <el-main class="clearfix">
        <!-- 内容介绍，课程计划，我的群组 -->
        <div class="main">
          <div class="logo">
            <img src="../../assets/img/touxiang.svg" alt />
          </div>
          <div class="introduce" v-for="item in listintroduce" :key="item.id">
            <p>{{item.title}}</p>
            <p>{{item.title1}}</p>
          </div>
          <div class="plan" v-on:click="handleClick1(card)">
            <img src="../../assets/img/shipin.svg" alt />
            <span>课程计划</span>
            <i>0</i>
          </div>
          <div class="group" v-on:click="handleClick1(card)">
            <img src="../../assets/img/geren.svg" alt />
            <span>我的群组</span>
            <i>0</i>
          </div>
          <div class="card" v-if="card">
            <div class="Triangle"></div>
            <img src="../../assets/img/Header_light_icon.png" alt />
            <button class="one" v-on:click="handleClick(card)">暂不创建</button>
            <p class="two">欢迎使用“陆由”，一个简单好用的实训教学平台</p>
            <p class="three">您可先创建一个群组，用以发布您的课程计划。</p>
            <el-row>
              <el-button v-on:click="handleClick2(card)">
                <span>去创建</span>
              </el-button>
            </el-row>
          </div>
        </div>

        <div class="cards1" v-if="cards1">
          <div class="h">
            <h3>创建群组</h3>
            <span>用以发布您的课程计划</span>
          </div>
          <el-input v-model="input" placeholder="群名称，不超过30字符，如：社工-19届-3班" label-width="80px"></el-input>
          <el-radio v-model="radio" label="1">入群需审批</el-radio>
          <el-radio v-model="radio" label="2">入群不审批</el-radio>

          <el-row>
            <el-button v-on:click="handleClick2(card)">
              <span>取消</span>
            </el-button>
            <el-button>
              <span @click="groupList">创建群组</span>
            </el-button>
          </el-row>
        </div>

        <!-- 课程计划 -->
        <div class="plans">
          <div class="ans1">
            <span class="sp1"></span>
            <i>课程计划</i>
            <div class="whole" v-if="csz === 0 ? false: true">
              <a href="https:www.baidu.com">
                <span>全部</span>
                <img class="imgs" src="../../assets/img/zhizuo.svg" alt />
              </a>
            </div>
          </div>

          <div class="sna1">
            <a href="javascript:;" class="sna" @click="EstablishClick">
              <span>
                <i class="one"></i>
                <i class="two"></i>
              </span>
              <p>新增课程计划</p>
            </a>
          </div>

          <div class="nas1" v-for="item in list5" :key="item.id">
            <a href="javascript:;" class="nas" v-if="csz === 0 ? false : true">
              <div class="he">
                <img :src="item.popularizeImageUrl" alt />
                <div class="corner" v-if="item.coursePlanType === 2 ? true:false">频道</div>
                <div class="count" v-if="item.stateName === '未发布' ? true:false">
                  已完成
                  <span class="oo1">{{item.finishStudentCount}}</span>
                  <span class="oo2">/</span>
                  <span class="oo3">{{item.totalStudentCount}}</span>
                  人
                </div>
              </div>
              <div class="chang"></div>
              <h3>{{item.coursePlanName}}</h3>
              <p class="one">{{item.summary}}</p>
              <p class="two">
                起止日：
                <span>{{item.beginDate}}</span>-
                <span>{{item.endDate}}</span>
              </p>
              <p class="two">
                群&nbsp;&nbsp;&nbsp;&nbsp;组：
                <span>{{item.groupName}}</span>
              </p>
              <p class="two">
                状&nbsp;&nbsp;&nbsp;&nbsp;态：
                <span>{{item.stateName}}</span>
              </p>
              <el-row>
                <el-button
                  v-if="(item.stateName || item.groupName) === ('未发布' || '未设置')? true: false"
                >
                  <span>去发布</span>
                </el-button>
              </el-row>
            </a>
          </div>
        </div>

        <!-- swiper轮播图 -->

        <img src="../../assets/img/banner.png" alt class="banners" />

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

        <div class="swiper-father swipers">
          <div class="swiper-container" id="swiper1">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="item in list"
                :key="item.id"
                @click="StandarddetailsClick"
              >
                <div class="card1">
                  <img :src="item.popularizeImageUrl" alt />
                  <p>{{item.keyName}}</p>
                  <div class="cards clearfix" v-for="items in item.tagNameList" :key="items">
                    <span>{{items}}</span>
                  </div>
                  <div class="names">
                    <img :src="item.avatar" alt />
                    <span>{{item.ownerName}}</span>
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
              <div
                class="swiper-slide"
                v-for="item in list"
                :key="item.id"
                @click="StandarddetailsClick"
              >
                <div class="card1">
                  <img :src="item.popularizeImageUrl" alt />
                  <p>{{item.keyName}}</p>
                  <div class="cards clearfix" v-for="items in item.tagNameList" :key="items">
                    <span>{{items}}</span>
                  </div>
                  <div class="names">
                    <img :src="item.avatar" alt />
                    <span>{{item.ownerName}}</span>
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
              <div
                class="swiper-slide"
                v-for="item in list2"
                :key="item.id"
                @click="StandarddetailsClick"
              >
                <div class="card1">
                  <img :src="item.popularizeImageUrl" alt />
                  <p>{{item.keyName}}</p>
                  <div class="cards clearfix" v-for="items in item.tagNameList" :key="items">
                    <span>{{items}}</span>
                  </div>
                  <div class="names">
                    <img :src="item.avatar" alt />
                    <span>{{item.ownerName}}</span>
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
              <div
                class="swiper-slide"
                v-for="item in list3"
                :key="item.id"
                @click="StandarddetailsClick"
              >
                <div class="card1 clearfix">
                  <img :src="item.popularizeImageUrl" alt />
                  <p>{{item.keyName}}</p>
                  <div class="cards" v-for="items in item.tagNameList" :key="items">
                    <span>{{items}}</span>
                  </div>
                  <div class="names">
                    <img :src="item.avatar" alt />
                    <span>{{item.ownerName}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev prev4"></div>
          <div class="swiper-button-next next4"></div>
        </div>

        <!-- 推荐的课程计划 -->
        <div class="plana">
          <div class="ans1">
            <span></span>
            <i>推荐的课程计划</i>
            <span>基于陆由Starry core 大数据统计</span>
          </div>
        </div>

        <div class="art" v-for="item in list4" :key="item.id">
          <div class="cards">
            <img :src="item.popularizeImageUrl" alt />

            <img :src="item.popularizeImageUrl" alt />

            <img :src="item.popularizeImageUrl" alt />
          </div>
          <div class="words">
            <h3>{{item.keyName}}</h3>
            <p class="words1">
              <span>{{item.duration}}分钟</span>
              <span>{{item.modifyDatetime}}</span>
            </p>
            <p class="words2">{{item.summary}}</p>
            <el-row>
              <el-button round>加入课程计划</el-button>
            </el-row>
          </div>
          <div class="texts" v-for="items in item.tagNameList" :key="items">
            <h3>世界艺术史</h3>
            <span>{{items}}</span>
          </div>
          <div class="names">
            <img :src="item.avatar" alt />
            <span>{{item.ownerName}}</span>
          </div>
        </div>
      </el-main>

      <!-- 尾部 -->
      <el-footer class="clearfix">
        <div class="link-box clearfix">
          <ul v-for="item in lists" :key="item.title">
            <li>
              <img :src="item.title" alt v-if="item.type==='img'" />
              <a href="javascript:;" v-else>{{item.title}}</a>
            </li>
            <li v-for="(jumps,index) in item.list" :key="index">
              <router-link v-if="jumps.url!==''" to="jumps.url">{{jumps.content}}</router-link>
              <a href="javascript:;" v-else>{{jumps.content}}</a>
            </li>
          </ul>
        </div>
        <p>© 2019 上海积途信息科技有限公司. All Rights Reserved.</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import TopHeader from "../Header/header";

import {
  couAppNewestCourses,
  courseRecommendList,
  courseCoursePlanList
} from "../../service/groupApi";
export default {
  name: "Nogroup",

  created() {
    courseRecommendList({ limit: "41", page: "1", position: "1" })
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

    couAppNewestCourses({ limit: "21", page: "1" })
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

    courseRecommendList({ limit: "41", page: "1", position: "2" })
      .then(res => {
        if (res.code == "0") {
          this.list2 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });

    courseRecommendList({ limit: "41", page: "1", position: "3" })
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
    courseCoursePlanList({})
      .then(res => {
        if (res.code == "0") {
          this.list5 = res.list;
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
      csz: 0,
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
      card: true,
      input: "",
      radio: "1",
      cards1: false,
      activeIndex: "1",
      activeIndex2: "1",
      msg: "Welcome to Your Vue.js App",
      progreess: 30,
      lists: [
        {
          title: require("../../assets/img/LOGO.svg"),
          type: "img", //img 图片 text 文字内容
          list: [
            {
              content:
                "陆由（Luyouor）是上海积途信息科技有限公司旗下专业的面向高校教育的新型在线教育品牌。积途科技是中国领先的教育科技互联网公司，致力于持续提升高等教育实训和实践教学的效率。",
              url: "" //跳转路径 为空不跳转
            }
          ]
        },
        {
          title: "关于",
          type: "text", //img 图片 text 文字内容
          list: [
            {
              content: "关于我们",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "加入我们",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "应用实例",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "新闻动态",
              url: "" //跳转路径 为空不跳转
            }
          ]
        },
        {
          title: "市场",
          type: "text", //img 图片 text 文字内容
          list: [
            {
              content: "产学研项目",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "出版物",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "案例大赛",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "社工年会",
              url: "" //跳转路径 为空不跳转
            }
          ]
        },
        {
          title: "方案",
          type: "text", //img 图片 text 文字内容
          list: [
            {
              content: "标准化实验室",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "虚拟仿真实验室",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "教研一体化实验室",
              url: "" //跳转路径 为空不跳转
            }
          ]
        },
        {
          title: "联系",
          type: "text", //img 图片 text 文字内容
          list: [
            {
              content: "上海市宝山区长逸路188号711室",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "18918310003@163.com",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "教研一体化实验室",
              url: "" //跳转路径 为空不跳转
            }
          ]
        }
      ],
      listintroduce: [
        {
          id: 1,
          title: "Marry，中午好！",
          title1: "知识越多越令人陶醉。"
        }
      ]
    };
  },
  methods: {
    EstablishClick() {
      this.$router.push({
        path: "/Establish"
      });
    },
    menu() {
      window.scrollTo(0, 0);
    },
    StandarddetailsClick() {
      this.$router.push({
        path: "/Standarddetails"
      });
    },

    groupList() {
      this.$router.push({
        path: "/group/list"
      });
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(card) {
      this.card = !this.card;
      this.cards1 = false;

      console.log(card);
    },
    handleClick1(card) {
      if (card === false) {
        this.card = true;
        // console.log(card);
      }
      this.cards1 = false;
    },
    handleClick2(cards1) {
      this.cards1 = !this.cards1;
    },
    mouseover(cardsz) {
      this.cardsz = true;
    },
    mouseleave(cardsz) {
      this.cardsz = false;
    },
    handleClickz() {
      this.$refs.onez.style.marginRight = "0";
      this.none = true;
    },
    cleardata() {
      this.inputVal = "";
    },
    mouseovers(card1) {
      this.card1 = true;
    },
    mouseleaves(card1) {
      this.card1 = false;
    }
  },
  mounted() {
    this.menu();
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper1", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
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
        navigation: {
          nextEl: ".next4",
          prevEl: ".prev4"
        }
      });
    }, 500);
  },
  components: {
    TopHeader: TopHeader //注册该组件
  }
};
</script>
<style lang="less" scoped>
.el-container {
  margin: 0 auto;
  width: 100%;
}
.el-main {
  margin: 0 auto;
  width: 1200px;
  padding: 0;
  overflow: visible;
  position: relative;
  .main {
    overflow: hidden;
    height: 130px;
    .logo {
      float: left;
      margin-top: 32px;
      margin-right: 28px;
      img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
      }
    }
    .introduce {
      float: left;
      p {
        margin: 0;
        margin-top: 32px;
        font-size: 20px;
        line-height: 28px;
        padding: 0;
        letter-spacing: 1px;
      }
      p:last-child {
        margin: 0px;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .plan {
      float: left;
      // overflow: hidden;
      margin-left: 43px;
      margin-top: 35px;
      width: 182px;
      height: 48px;
      padding: 0;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 48px;
      border: 1px solid rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 4px 0px rgba(84, 40, 33, 0.24);
      border-radius: 10px;
      img {
        width: 40px;
        height: 40px;
      }
      span {
        font-size: 18px;
        color: rgba(66, 42, 39, 1);
      }
      i {
        font-size: 24px;
        font-family: SFProText-Bold;
        font-weight: bold;
        color: rgba(254, 120, 101, 1);
        line-height: 29px;
        margin-left: 20px;
      }
    }
    .group {
      float: left;
      margin-left: 43px;
      margin-top: 35px;
      width: 182px;
      height: 48px;
      padding: 0;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 48px;
      border: 1px solid rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 4px 0px rgba(84, 40, 33, 0.24);
      border-radius: 10px;
      img {
        width: 40px;
        height: 40px;
      }
      span {
        font-size: 18px;
        color: rgba(66, 42, 39, 1);
      }
      i {
        font-size: 24px;
        font-family: SFProText-Bold;
        font-weight: bold;
        color: rgba(254, 120, 101, 1);
        line-height: 29px;
        margin-left: 20px;
      }
    }
  }
  .card {
    position: absolute;
    right: 20%;
    top: 100px;
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
    left: 24%;
    top: 6%;
    margin-top: 10px;
    border-radius: 10px;
    z-index: 999;

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
  .plans {
    overflow: hidden;
    .ans1 {
      position: relative;
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      .sp1 {
        display: inline-block;
        height: 31px;
        border-left: 8px solid rgba(254, 120, 101, 1);
        border-radius: 4px;
      }
      i {
        text-align: center;
        width: 116px;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        font-style: normal;
        margin-left: 10px;
        font-size: 28px;
      }
      .whole {
        position: absolute;
        top: 0px;
        right: 0px;
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
    }
    .sna1 {
      float: left;
      .sna {
        position: relative;
        display: inline-block;
        margin-top: 27px;
        width: 280px;
        height: 348px;
        border-radius: 13px;
        border: 1px dashed rgba(102, 102, 102, 0.5);
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -100%);
          font-size: 90px;
          color: rgba(151, 151, 151, 0.3);
        }
        p {
          margin-top: 32px;
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 22px;
          font-weight: 500;
          color: rgba(153, 153, 153, 0.4);
          // line-height: 40px;
          // letter-spacing: 1px;
          color: rgba(102, 102, 102, 0.5);
        }
      }
      .sna:hover {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
        border-radius: 13px;
        border: 1px dashed rgba(0, 0, 0, 0.5);
      }
    }
    .nas1 {
      position: relative;
      float: left;
      margin-top: 27px;
      margin-left: 24px;
      border: 1px dashed rgba(102, 102, 102, 0.5);
      border-radius: 13px;

      .nas {
        position: relative;
        display: inline-block;
        width: 280px;
        height: 348px;
        .he {
          img {
            width: 280px;
            height: 146px;
            border-radius: 13px;
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
          border-radius: 3px;
        }
        h3 {
          margin-left: 16px;
          margin-top: 15px;
          font-size: 22px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
          letter-spacing: 1px;
        }
        .one {
          margin-left: 16px;
          margin-bottom: 24px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          // line-height: 20px;
        }
        .two {
          margin-left: 16px;
          margin-bottom: 12px;
          font-size: 14px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 14px;
          text-align: justify;
          text-justify: distribute;
        }
        .el-button {
          position: relative;
          top: -32px;
          right: 16px;
          width: 64px;
          height: 26px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 13px;
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
            color: rgba(255, 255, 255, 1);
            line-height: 13px;
          }
        }
        .el-button:active {
          color: #fff;
          border-color: #fff;
        }
      }
    }
    .nas1:hover {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 10px 0px rgba(153, 153, 153, 0.5);
      border-radius: 13px;
    }
  }
  .banners {
    margin-top: 51px;
  }
  .plana {
    margin-top: 59px;
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
        color: #3c3c43;
        font-size: 16px;
      }
    }
  }
  .curriculum {
    // overflow: hidden;
    .hots {
      margin-bottom: 20px;
      width: 80px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
  }
  .card1 {
    float: left;
    // margin-right: 26px;
    height: 330px;
    width: 280px;
    // overflow: hidden;
    position: relative;
    img {
      width: 100%;
      text-align: center;
    }
    img:hover {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      border-radius: 0px 0px 8px 8px;
      box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
    }
    p {
      padding: 0;
      margin: 0;
      margin-left: 16px;
      margin-top: 16px;
    }
    .cards {
      overflow: hidden;
      float: left;
      margin-left: 16px;
      margin-top: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 12px;
      span {
        display: block;
        float: left;
        padding: 5px;
        background: rgba(250, 250, 250, 1);
        border-radius: 3px;
        border: 1px solid rgba(238, 238, 238, 1);
      }
    }
    .names {
      position: absolute;
      left: 0;
      bottom: 50px;
      margin-left: 16px;
      margin-top: 10px;
      overflow: hidden;
      img {
        float: left;
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      span {
        float: left;
        display: block;
        height: 20px;
        margin-left: 9px;
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
    }
  }
  .plana:last-child {
    margin-top: 18px;
  }
  .art {
    height: 291px;
    margin-top: 28px;
    margin-bottom: 60px;
    overflow: hidden;
    position: relative;
    .cards {
      img:nth-child(1) {
        position: absolute;
        top: 0px;
        opacity: 1;
        z-index: 999;
        width: 447px;
        height: 271px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 12px;
      }
      img:nth-child(2) {
        position: absolute;
        top: 6px;
        opacity: 0.5;
        transform: scaleX(0.97);
        z-index: 998;
        // left: 6px;
      }
      img:nth-child(3) {
        position: absolute;
        top: 12px;
        opacity: 0.189;
        transform: scaleX(0.95);
        // left: 12px;
        z-index: 997;
      }
    }
    .cards:hover {
      img:nth-child(1) {
        position: absolute;
        top: 0px;
        opacity: 1;
        z-index: 999;
        width: 447px;
        height: 271px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 12px;
      }
      img:nth-child(2) {
        position: absolute;
        top: 10px;
        opacity: 0.5;
        transform: scaleX(0.97);
        z-index: 998;
        // left: 6px;
      }
      img:nth-child(3) {
        position: absolute;
        top: 20px;
        opacity: 0.189;
        transform: scaleX(0.95);
        // left: 12px;
        z-index: 997;
      }
    }
    .words {
      width: 623px;
      height: 271px;
      margin-left: 503px !important;
      h3 {
        padding: 0;
        margin: 0;
        margin-top: 8px;
        width: 347px;
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 33px;
      }
      .words1 {
        span:nth-child(1) {
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: #4a4a4a;
          line-height: 22px;
        }
        span:nth-child(2) {
          font-size: 16px;
          font-family: PingFangSC-Regular;
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
      }
      .el-row {
        margin-top: 39px;
        .el-button {
          border: 2px solid rgba(254, 120, 101, 1);
          font-size: 18px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(254, 120, 101, 1);
          line-height: 18px;
          box-sizing: border-box;
        }
        .is-round {
          padding: 11px 15px 11px 15px;
        }
      }
    }
    .texts {
      position: relative;
      h3 {
        position: absolute;
        width: 148px;
        height: 40px;
        top: -102px;
        left: 20px;
        z-index: 9999;
        font-size: 28px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        letter-spacing: 1px;
      }
      span {
        display: block;
        padding: 8px;
        position: absolute;
        z-index: 9999;
        top: -50px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
      span:nth-child(2) {
        left: 20px;

        background: rgba(254, 120, 101, 1);
        border-radius: 3px;
        border: 1px solid rgba(254, 120, 101, 1);
      }
      span:nth-child(3) {
        left: 62px;

        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        border: 1px solid rgba(238, 238, 238, 1);
      }
      span:nth-child(4) {
        left: 138px;
        width: 68px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        border: 1px solid rgba(238, 238, 238, 1);
      }
    }
    .names {
      position: relative;

      img {
        position: absolute;
        z-index: 9999;
        left: 330px;
        top: -42px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      span {
        position: absolute;
        left: 350px;
        top: -44px;
        z-index: 999;
        float: left;
        display: block;
        margin-left: 9px;
        width: 51px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
    }
  }
}

.el-footer {
  overflow: hidden;
  width: 100%;
  height: 536px !important;
  margin: 0 auto;
  background: url("../../assets/img/bg.png");
  background-size: 100% 100%;
  line-height: 300px;
  text-align: center;
  font-size: 1.5rem;
  padding-top: 69px;
  padding-bottom: 36px;
  .link-box {
    padding-bottom: 104px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center; /* 水平居中 */
  }
  ul {
    float: left;
    width: 183px;
    line-height: normal;
    margin-right: 112px;
    li {
      text-align: left;
    }
    li:first-child {
      margin-bottom: 12px;
      a {
        font-size: 18px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    a {
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
    }
    a:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  ul:first-child {
    li:last-child {
      a {
        font-size: 14px;
      }
    }
  }
  ul:last-child {
    margin-right: 0;
  }
  p {
    //
    font-size: 18px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    // margin-top: 36px;
    // padding-bottom: 36px;
    line-height: 90px;
  }
}

.el-footer {
  overflow: hidden;
  width: 100%;
  height: 536px !important;
  margin: 0 auto;
  background: url("../../assets/img/bg.png");
  background-size: 100% 100%;
  line-height: 300px;
  text-align: center;
  font-size: 1.5rem;
  padding-top: 69px;
  padding-bottom: 36px;
  .link-box {
    padding-bottom: 104px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center; /* 水平居中 */
  }
  ul {
    float: left;
    width: 183px;
    line-height: normal;
    margin-right: 112px;
    li {
      text-align: left;
    }
    li:first-child {
      margin-bottom: 12px;
      a {
        font-size: 18px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    a {
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
    }
    a:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  ul:first-child {
    li:last-child {
      a {
        font-size: 14px;
      }
    }
  }
  ul:last-child {
    margin-right: 0;
  }
  p {
    //
    font-size: 18px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    // margin-top: 36px;
    // padding-bottom: 36px;
    line-height: 90px;
  }
}
.swiper-slide {
  width: 300px;
  padding-left: 10px;
}
.swiper-father {
  position: relative;
}
.swiper-button-prev {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -15px;
  top: 100px;
  background: url(../../assets/img/zuojiantou.svg);
  // transform: translateY(-50%)
}
.swiper-button-next {
  width: 48px;
  height: 48px;
  position: absolute;
  right: -15px;
  top: 100px;
  background: url(../../assets/img/youjiantou.svg);
}
</style>
