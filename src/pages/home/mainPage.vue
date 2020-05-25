<template>
  <div class="mainPage">
    <DialogBox
      v-on:btnCb="cbFun"
      v-bind:options="options"
    >
      <div class="clearfix">
        <pre @click="slotClick">
          窗前明月光，
          疑是地上霜。
          举头望明月，
          低头思故乡。
        </pre>
        <el-card class="box-card only">
          <h3>营销研究中的科学实验方法</h3>
          <h4>隶属于《市场营销调研实践课程》</h4>
          <p> 截止日：2019-05-01<br/>创建者：大地山河<br/>状 态：已完成<br/>群 组：群名称群名称 | 组名称</p>
        </el-card>
      </div>
    </DialogBox>
    <h2 class="block" @click="clickFun">{{`${name}${discourse[role].title},欢迎回来！`}}</h2>
    <Layout class="blockInner">
      <div slot="topLeft">{{discourse[role].topLeft}}</div>
      <div slot="topRight">
        <el-button type="text">{{discourse[role].topRightBtn0}}</el-button>
        <el-button type="text">{{discourse[role].topRightBtn1}}</el-button>
      </div>
      <div slot="center">
        <el-card class="box-card only">
          <h3>营销研究中的科学实验方法</h3>
          <h4>隶属于《市场营销调研实践课程》</h4>
          <p> 截止日：2019-05-01<br/>创建者：大地山河<br/>状 态：已完成<br/>群 组：群名称群名称 | 组名称</p>
        </el-card>
      </div>
    </Layout>
    <h2 class="block">下一步要安排什么课程？</h2>
    <ClassBlock v-for="(item,index) in cardConfigs" :key="index" :config="item"/>

    <foot/>
  </div>
</template>
<script>
  import {Component, Vue, Emit} from "vue-property-decorator";
  import Layout from "@/components/tableTriditionLayout";
  import Card from '@/components/card';
  import foot from '@/pages/index/footer';
  import ClassBlock from '@/components/classBlock';
  import {login} from '../../service/index'
  import DialogBox from '../../components/common/dialogBox'

  @Component({
    name: "mainPage",
    components: {Layout, Card, foot, ClassBlock, DialogBox}
  })
  export default class MainPage extends Vue {
    name = "Terry";
    role;
    discourse = {
      teacher: {
        title: "老师",
        topLeft: "您已安排的课程计划",
        topRightBtn0: "统计中心",
        topRightBtn1: "群组管理"
      },
      student: {
        title: "",
        topLeft: "回到上次的位置？",
        topRightBtn0: "成长分析",
        topRightBtn1: "群组"
      }
    };
    cardConfigs = [
      {title: '热门课程', desc: '*基于陆由Starry core 大数据统计，别的老师都在教什么？', cards: []},
      {title: '同行在教', desc: '*基于您的身份特征推荐', cards: []},
      {title: '个人喜好推荐', desc: '*因为教了&&&&课程/偏好设置', cards: []},
    ];
    options = {
      show: true,
    };
    couList = [];//课程列表
    //已选中课程
    selCourse = [];

    @Emit clickFun() {
      login({a: 123}).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      })
    }

    @Emit slotClick() {
      console.log('插槽点击事件触发');
      this.options={
        show: true,
        btn1Text:'按钮1',
        btn1Cb:()=>{
          console.log();
        }
      };
    }

    created() {
      this.role = !!Math.round(Math.random()) ? "teacher" : "student";
      login({a: 123}).then(res => {
        console.log(res)

        //弹框
        this.$store.dispatch('userinfo/dialogHandle', {
          show: true,//弹框显示隐藏
          type: 'fail',//弹框类型 loading全局加载中  fail失败提示信息  success成功提示信息  warning警告提示信息 message 普通提示信息
          content: '北京欢迎你--------------------------------------------------------',
          btn1Cb: () => {
            console.log('------------Tips按钮回调-------------');
            return true;
          }
        })
      }).catch(err => {
        console.log(err);
      })
    }

    //创建群点击事件
    //统计中心点击事件
    //群组管理点击事件

    //选择课程点击事件
    @Emit selClick(id) {
      let findId = this.selCourse.find((item) => {
        item == id
      });
      if (!findId) {
        this.selCourse.push(id);//添加选中课程
      }
    }

    //弹框回调方法
    @Emit cbFun(key, val) {
      console.log('--------------', this);
      console.log('item', key, val);
      this.options[key] = val;
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/style/setting.scss";

  .mainPage {
    @include relative();
    width: 100%;
    .block {
      @include setMargin();
      overflow: auto;
    }
    .blockInner {
      @include setPadding();
      display: block;
      overflow: auto;
    }
    .box-card {
      float: left;
      height: 250px;
      min-width: 220px;
      &.only {
        min-width: 100%;
      }
    }
    p.block span {
      font-size: 1.5em;
    }
  }
</style>

