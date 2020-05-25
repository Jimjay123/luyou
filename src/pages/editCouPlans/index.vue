/**

* Created by wangxin

* @date 2019/8/9 19:20

*/
<template>
  <div class="list pages">
    <!--删除提示弹框 start-->
    <DelCouConfirm
      :show="show"
      :course="delCourseState.data"
      :cbFun="diaCbFun"
    ></DelCouConfirm>
    <!--删除提示弹框 end-->

    <!--离开页面 tips start-->
    <CreLeaveTips
      :cbFun="leaveCb"
      :show="leaveShow"
    ></CreLeaveTips>
    <!--离开页面 tips start-->

    <!--面包屑 start-->
    <CrumbsItem style="margin-top:22px;" :list="list" :cbFun="cruCallback" :btn="true"></CrumbsItem>
    <!--面包屑 end-->

    <el-container>
      <el-main class="main">
        <Vuescroll :ops="ops">
          <!--新建课程模板 start-->
          <div class="c-box">
            <CreNewCourse
              v-for="(item,index) in templateList"
              :key="index"
              :index="index"
              :data="item"
              :cbFun="cbFun"
              :delCallback="delCallback"
              :addCbFun="addCbFun"
            ></CreNewCourse>
            <!--新建课程模板 end-->

            <!--新建课程 start-->
            <AddCourse :addCbFun="addCbFun" :index="templateList.length"></AddCourse>
            <!--新建课程 end-->
          </div>
        </Vuescroll>
        <router-view></router-view>
        <RecallCourse v-show="delCourse.show"></RecallCourse>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {
    Component, Vue, Emit
  } from "vue-property-decorator";
  import CrumbsItem from './CrumbsItem';
  import TopHeader from './../Header/header'
  import AddCourse from './AddCourse'
  import CreLeaveTips from './creLeaveTips'
  import {cloneObj, tokenFun, tipsFail} from '../../utils/utils';
  import {couChaChaRef, couPlaSavForCouChannel,courPlaCouPlaDetail,couPlanUpdCouPlan} from '../../service/creCouPlans';
  import Clickoutside from 'element-ui/src/utils/clickoutside'
  import DelCouConfirm from '../creCouPlans/delCouConfirm';
  import CreNewCourse from './creNewCourse';
  import RecallCourse from './recallCourse';
  import Vuescroll from 'vuescroll';
  import {State, Action, namespace} from 'vuex-class';

  const EditCouPlansStore=namespace('editCouPlans');

  @Component({
    name: "creCouPlans",
    directives: {
      Clickoutside
    },
    //离开时路由守卫
    beforeRouteLeave (to, from , next) {
      if (this.leaveCheck) {
        next()
      } else {
        this.leaveShow = true; //弹出离开页面提示框
        this.leaveRouter=to.path;
        next(false)
      }
    },
    components: {
      CrumbsItem, TopHeader, AddCourse, Vuescroll, CreNewCourse, RecallCourse, DelCouConfirm,CreLeaveTips
    }
  })
  export default class CreCouPlans extends Vue {
    @EditCouPlansStore.State('templateList') templateList;//新建竖版列表
    @EditCouPlansStore.Action('templateListHandle') templateListHandle;//新建竖版列表  action修改方法

    @EditCouPlansStore.State('delCourse') delCourse;//被删除的--课程
    @EditCouPlansStore.Action('delCourseHandle') delCourseHandle;//被删除的--课程  action修改方法

    @EditCouPlansStore.State('channel') channel;//当前模板或当前新建课程信息
    @EditCouPlansStore.Action('channelHandle') channelHandle;//当前模板或当前新建课程信息  action修改方法

    @EditCouPlansStore.State('editOrAdd') editOrAdd;//新曾或编辑 课程计划 相关参数
    @EditCouPlansStore.Action('editOrAddHandle') editOrAddHandle;//新曾或编辑 课程计划 相关参数  action修改方法

    courseChannelId='';//当前 上一页带过来的 courseChannelId 模板Id

    show = false;//删除弹框显示隐藏  true 显示 false 隐藏
    addCourseType = 'editTem';//当前添加类型 addNew新建  editTem  模版新建   edit  编辑

    leaveShow=false;//页面离开弹框提示
    leaveCheck=false;//离开

    list= [
      {
        name: '新建课程频道',
        path: '/Establish',
        type: true,
      },
      {
        name: '章节编辑',
        path: '/teachers/creCouPlans',
        type: true,
      },
      {
        name: '基础设置',
        path: '',
        type: false,
      },
      {
        name: '发布',
        path: '',
        type: false,
      },
    ];//面包屑数据

    delCourseState = {};//删除待确认的课程数据

    newTemplateList = [];//删除待确认的课程新列表

    ops = {
      bar: {
        showDelay: 500,
        onlyShowBarOnScroll: false,
        keepShow: false,
        background: '#c1c1c1',
        opacity: 1,
        hoverStyle: false,
        specifyBorderRadius: false,
        minSize: false,
        size: '6px',
        disable: false,
      }
    };//滚动条设置

    //页面离开回调方法
    @Emit leaveCb(type){
      if(type==='hide'||type==='confirm'){
        this.leaveShow=false;
        this.leaveRouter='';
      }else{//离开页面
        this.leaveCheck = true; //弹出离开页面提示框
        //离开页面
        this.$router.push({
          path: this.leaveRouter?this.leaveRouter:"/Establish",
        });
      }
    }

    //竖版组件 新增 回调
    @Emit addCbFun(index){
      let query=this.$route.query;
      this.$router.replace({
        path: '/teachers/editCouPlans/editPrimary',
        query: {
          temIndex: index,
          addCourseType:query.addCourseType,
          coursePlanId:query.coursePlanId,
        }
      })
    }

    //竖版组件回调
    @Emit cbFun(index, data) {
      let templateList = this.templateList;
      templateList[index] = cloneObj(data);
      this.templateListHandle({
        templateList: cloneObj(templateList)
      })
    }

    //上一步下一步回调方法
    @Emit cruCallback(type) {
      if (type === 'pre') {
        this.leaveShow=true;//弹出离开页面提示框
      } else {//下一步提交按钮
        this.leaveCheck=true;
        let templateList = this.templateList;
        let data = {
          planId:this.channel.planId,
          planName:this.channel.planName,
          coursePlanId:this.editOrAdd.coursePlanId,
          bundleList: this.subMapFun(this.templateList),
        };
        this.nextCb(data);
      }
    }

    //处理提交数据转化
    @Emit subMapFun(data) {
      let newData = cloneObj(data);
      let list = [];
      newData.map((item) => {
        list.push({
          coursePlanBundleRelId:item.coursePlanBundleRelId,
          bundleId: item.bundleId,
          bundleName: item.title,
          delFlag:item.delFlag,
          courseList: this.getMapFun(item.chapter)
        })
      });
      return cloneObj(list);
    }

    // 提交数据处理
    @Emit getMapFun(data) {
      let newData = cloneObj(data);
      let list = [];
      newData.map((item) => {
        list.push({
          courseBundleRelId:item.courseBundleRelId,
          courseId: item.courseId,
          courseName: item.title,
          delFlag:item.delFlag,
          courseSource:item.courseSource,//
        })
      });
      return cloneObj(list);
    }

    //下一步回调方法
    @Emit nextCb(data) {
      let editOrAdd=this.editOrAdd;
      couPlanUpdCouPlan(data).then((res) => {
        if (res.code == '0') {
          //let coursePlanId=res.data.coursePlanId;
          editOrAdd.coursePlanId=data.coursePlanId;
          this.editOrAddHandle({
            editOrAdd:editOrAdd
          });
          this.$router.push({
            path: '/teachers/editCourseBase',//跳转下一步
            query:{
              coursePlanId:data.coursePlanId,
              addCourseType:'editChannel',
            }
          })
        } else {
          tipsFail(res.msg)
        }
      })
    }

    //删除回调方法
    @Emit delCallback(type, temIndex, i) {
      let templateList = cloneObj(this.templateList);
      let oldDel;
      if (type == 'all') {//删除整个章节
        if(templateList[temIndex].temType==='old'){
          templateList[temIndex].delFlag=true;// true 删除  false 新增
          oldDel=cloneObj(templateList[temIndex]);
          this.delCourseState = {
            show: true,
            index: temIndex,
            data: cloneObj(oldDel)
          };
        }else{
          oldDel = templateList.splice(temIndex, 1)[0];
          this.delCourseState = {
            show: true,
            index: temIndex,
            data: cloneObj(oldDel)
          };
        }
        this.newTemplateList = templateList;
      } else {
        if(templateList[temIndex].chapter[i].temType==='old'){
          templateList[temIndex].chapter[i].delFlag=true;// true 删除  false 新增
          if(templateList[temIndex].chapter[i].courseStatus===1){
            templateList[temIndex].chapter[i].courseStatus=2;
          }else if(templateList[temIndex].chapter[i].courseStatus===3){
            templateList[temIndex].chapter[i].courseStatus=4;
          }else if(templateList[temIndex].chapter[i].courseStatus===7){
            templateList[temIndex].chapter[i].courseStatus=8;
          }
          oldDel=cloneObj(templateList[temIndex].chapter[i]);
          this.delCourseState = {
            show: true,
            temIndex: temIndex,
            index: i,
            data: cloneObj(oldDel)
          };
        }else{
          let data = cloneObj(templateList[temIndex]);
          if (templateList[temIndex].chapter.length == 1) {//当前章节只有 一个小节 删除整个
            oldDel = templateList.splice(temIndex, 1)[0];
          } else {//当前章节有多个小节--删除其中一个小节
            oldDel = templateList[temIndex].chapter.splice(i, 1)[0];
          }
          this.delCourseState = {
            show: true,
            temIndex: temIndex,
            index: i,
            data: cloneObj(oldDel)
          };
        }
        this.newTemplateList = templateList;
      }
      this.show = true;//显示确认删除弹框
    }

    // 弹框 回调方法
    @Emit diaCbFun(type) {
      // type cancel 取消  confirm 确定
      if (type === 'confirm') {
        this.templateListHandle({
          templateList: cloneObj(this.newTemplateList),
        });
        this.delCourseHandle({
          delCourse: cloneObj(this.delCourseState)
        });
      }
      this.show = false;
      this.delCourseState = {};
      this.newTemplateList = [];
    }

    //获取当前课程模板信息  接口
    @Emit couPlaOwnCouPlaListFun() {
      if(!this.courseChannelId){
        return
      }
      couChaChaRef({
        courseChannelId: this.courseChannelId
      }).then((res) => {
        if (res.code == '0') {
          let data = res.data.bundleList;
          this.templateListHandle({
            templateList: this.handelData(data)
          });
          this.channelHandle({
            channel:{
              planId: data.channelId,
              planName:data.channelName
            },
          })
        } else {
          tipsFail(res.msg)
        }
      })
    }

    //已保存课程频道--获取课程频道信息接口
    @Emit courPlaCouPlaDetailFun(id){
      courPlaCouPlaDetail({
        coursePlanId:id
      }).then(res=>{
        if (res.code == '0') {
          let data = res.data.bundleList;
          this.templateListHandle({
            templateList: this.handelData(data)
          });
          this.channelHandle({
            channel:{
              planId: data.channelId,
              planName:data.channelName
            },
          })
        } else {
          tipsFail(res.msg)
        }
      })
    }

    //处理后端获取的数据
    @Emit handelData(data) {
      let newData = cloneObj(data);
      let list = [];
      /**
       * 一、后端获取的
       *      1、模板竖版
       *          （1）、模板自动带
       *                1）、展示的标准课      1
       *                2）、关闭的标准课      2
       *          （2）、上次新增
       *                1）、上次新增 展示     3
       *                2）、上次新增 关闭     4
       *          （3）、本次新增
       *                1）、本次新增 展示     5
       *                2）、本次新增 关闭     6
       *      2、非模板竖版
       *          （1）、上次新建 展示         7
       *          （2）、上次新建 关闭         8
       *          （3）、本次新建 展示         9
       *          （4）、本次新建 关闭         10
       *      3、本次新建的竖版
       *          （1）、本次新建 展示         11
       *          （1）、本次新建 关闭         12
       *
       * */

      newData.map((item) => {
        let obj=cloneObj(item);
        obj={
          ...obj,
          isUse: !item.delFlag,//当前模块是否可用
          isEdit: false,//当前顶部标题  是否在编辑状态  true是  false
          title: item.bundleName,//当前章节标题
          //bundleId: item.bundleId,//当前频道Id
          type: item.bundleSource===2?'tem':'add',//type类型 模板'tem' 'add'
          temType:'old',// old  标识 接口获取的  New 表示新增的
          //coursePlanBundleRelId: item.coursePlanBundleRelId,//type类型 模板'tem' 'add'
          level:'chapter',//当前的层级 chapter 章 section节
        };
        obj.chapter=this.mapFun(item);
        list.push(obj);
      });
      return cloneObj(list);
    }

    @Emit mapFun(data) {
      let list = [];
      data.courseList.map((item) => {
        let obj=cloneObj(item);
        obj={
          ...obj,
          isOpen: false,//当前模块是否展开 true展开 false 不展开
          isUse: !item.delFlag,//当前模块是否可用
          isEdit: false,//当前顶部标题  是否在编辑状态  true是  false
          header: item.popularizeImageUrl,
          //courseId: item.courseId,//课程id
          //courseBundleRelId: item.courseBundleRelId,//课程id
          title: item.courseName,//课程名称
          level:'section',//当前的层级 chapter 章 section节
          type:item.bundleSource===2?'tem':'add',//add 新增的  tem 模版自带的
          temType:'old',// old  标识 接口获取的  New 表示新增的
          //courseSource:item.courseSource,//
          //lessonList: cloneObj(item.lessonList),
        };

        let courseStatus=null;
        let isUse=true;
        if(data.bundleSource===2){//模板竖版
          if(item.courseSource===2){//模板自带的
            if(!item.delFlag){//false 展示
              courseStatus=1;
              isUse=true;
            }else{// true  删除的
              courseStatus=2;
              isUse=false;
            }
          }else if(item.courseSource===3){//上次添加
            if(!item.delFlag){//false 展示
              courseStatus=3;
            }else{// true  删除的
              courseStatus=4;
            }
          }
        }else if(data.bundleSource===3){//上次新增竖版
          if(!item.delFlag){//false 展示
            courseStatus=7;
          }else{// true  删除的
            courseStatus=8;
          }
        }
        obj.courseStatus=courseStatus;
        obj.isUse=isUse;
        list.push(obj)
      });
      return cloneObj(list);
    }

    @Emit setEditOrAdd(name){
      let query=this.$route.query;
      let editOrAdd=this.editOrAdd;
      if(query[name]){
        this[name]=query[name]||'';
        editOrAdd[name]=this[name];
        this.editOrAddHandle({
          editOrAdd:cloneObj(editOrAdd)
        });
      }else{
        this[name]=editOrAdd[name]||'';
      }
    }

    created() {
      let query=this.$route.query;

      /**
       *
       * 编辑标准课  editCourse
       * 编辑课程计划  editChannel
       *
       * */

      this.setEditOrAdd('addCourseType');
      this.setEditOrAdd('courseChannelId');

      this.setEditOrAdd('coursePlanId');
      this.courPlaCouPlaDetailFun(query.coursePlanId);//编辑课程频道--获取课程频道基本信息
    }
  }
</script>

<style lang="scss" scoped>
  .pages {
    background: #fff;
    width: 1200px;
    margin: 0 auto;
  }

  .main {
    width: auto;
    padding: 20px 0;
    height: calc(100vh - 120px);
  }

  .c-box {
    white-space: nowrap;
  }
</style>
