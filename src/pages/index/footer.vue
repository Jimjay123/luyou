<template>
  <footer class="clearfix">
    <div class="link-box clearfix">
      <ul v-for="item in list" :key="item.title">
        <li>
          <img :src="item.title" alt v-if="item.type==='img'" />
          <a href="javascript:;" v-else>{{item.title}}</a>
        </li>
        <li v-for="(jumps,index) in item.list" :key="index">
          <a href="javascript:;" v-if="jumps.url!==''" @click="jumpFun(jumps)">{{jumps.content}}</a>
          <a href="javascript:;" v-else>{{jumps.content}}</a>
        </li>
      </ul>
    </div>
    <p>
      <a href="http://beian.miit.gov.cn" target="_blank">沪ICP备19019556号-1</a>
      <br />© 2019 上海积途信息科技有限公司. All Rights Reserved.
    </p>
  </footer>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "pageFooter"
})
export default class PageFooter extends Vue {
  list = [
    {
      title: require("../../assets/mainNoSign/LOGO.png"),
      type: "img", //img 图片 text 文字内容
      list: [
        {
          content:
            "陆由（Luyouor）是上海积途信息科技有限公司旗下专业的面向高校教育的新型在线教育品牌。积途科技是中国领先的教育科技互联网公司，致力于持续提升高等教育实训和实践教学的效率。",
          url: "http://www.luyouor.com/" //跳转路径 为空不跳转
        }
      ]
    },
    {
      title: "关于",
      type: "text", //img 图片 text 文字内容
      list: [
        {
          content: "关于我们",
          url: "#/aboutsth" //跳转路径 为空不跳转
          // url: "http://www.luyouor.com/about" //跳转路径 为空不跳转
        },
        {
          content: "加入我们",
          url: "#/joinUs" //跳转路径 为空不跳转
        },
        {
          content: "应用实例",
          url: "http://www.luyouor.com/ex" //跳转路径 为空不跳转
        },
        {
          content: "新闻动态",
          url: "http://www.luyouor.com/news" //跳转路径 为空不跳转
        }
      ]
    },
    {
      title: "市场",
      type: "text", //img 图片 text 文字内容
      list: [
        {
          content: "产学研项目",
          url: "http://www.luyouor.com/listmarket/1" //跳转路径 为空不跳转
        },
        {
          content: "出版物",
          url: "http://www.luyouor.com/listmarket/2" //跳转路径 为空不跳转
        },
        {
          content: "案例大赛",
          url: "http://www.luyouor.com/listmarket/3" //跳转路径 为空不跳转
        },
        {
          content: "社工年会",
          url: "http://www.luyouor.com/listmarket/4" //跳转路径 为空不跳转
        }
      ]
    },
    {
      title: "方案",
      type: "text", //img 图片 text 文字内容
      list: [
        {
          content: "标准化实验室",
          url: "http://www.luyouor.com/dcase/1" //跳转路径 为空不跳转
        },
        {
          content: "虚拟仿真实验室",
          url: "http://www.luyouor.com/dcase/2" //跳转路径 为空不跳转
        },
        {
          content: "教研一体化实验室",
          url: "http://www.luyouor.com/dcase/3" //跳转路径 为空不跳转
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
        }
      ]
    }
  ];

  jumpFun(item) {
    if (!item.url) {
      return;
    }
    window.open(item.url);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";

footer {
  overflow: hidden;
  width: 100%;
  /*height: 520px !important;*/
  // margin: 0 auto;
  background: url("../../assets/img/bg.png");
  background-size: 100% 100%;
  // line-height: 300px;
  text-align: center;
  font-size: 1.5rem;
  padding-top: 69px;
  box-sizing: border-box;
  padding-bottom: 36px;
  .link-box {
    width: 1200px;
    height: 349px;
    margin: 0 auto;
    padding-bottom: 104px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    // display: flex;
    // justify-content: center; /* 水平居中 */
    padding-left: 0;
  }
  ul {
    float: left;
    width: 140px;
    line-height: 28px;
    margin-right: 77px;
    li {
      text-align: left;
    }
    li:first-child {
      padding-bottom: 12px;
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
    width: 183px;
    float: left;
    margin-right: 112px;
    li:last-child {
      a {
        font-size: 14px;
      }
    }
  }
  ul:last-child {
    margin-right: 0;
    // float: right;
    width: 240px;
  }
  p {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    padding-top: 36px;
    line-height: 30px;
    // background-color: pink;
    a {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>

