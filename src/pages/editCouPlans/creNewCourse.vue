/**

* Created by wangxin

* @date 2019/8/12 10:24

*/
<template>
  <div class="add-course" v-if="verticalPlate(data)">
    <!--标题展示 start-->
    <div class="number chapter clearfix" v-if="!data.isEdit">
      <div class="show" @click="edit(null)">
        {{data.title}}
        <i class="icon-edit"></i>
      </div>
      <el-switch v-if="data.type=='tem'" class="switch" @change="switchChange" v-model="data.isUse"></el-switch>
      <div class="del-chapter" @click="delBtn('all')" v-else>删除该章节</div>
    </div>
    <!--标题展示 end-->

    <!--标题展示 修改 start-->
    <div class="number change-chapter clearfix" v-else>
      <div class="input" v-Clickoutside="outClick">
        <input v-model="data.title" maxlength="15" class type="text" @keyup.enter="outClick" />
      </div>
      <el-switch v-if="data.type=='tem'" class="switch" @change="switchChange" v-model="data.isUse"></el-switch>
      <div class="del-chapter" @click="delBtn('all')" v-else>删除该章节</div>
    </div>
    <!--标题展示 修改 end-->

    <div
      class="c-item"
      v-for="(item,k) in data.chapter"
      :key="k"
      v-if="coursePlate(data,item)"
      :style="{'opacity':item.isUse?'1':'0.5'}"
    >
      <div class="c-title">
        <div class="c-img" @click="Recstandard(item.courseId)">
          <img :src="item.header" alt class="bg" />
          <img src="../../assets/img/yulan.svg" alt class="yulan" />
          <span>{{k+1}}</span>
          <div class="course">
            <div class="triangle"></div>
            <p>预览课程</p>
          </div>
        </div>

        <!--小节编辑 start-->
        <div class="c-info-edit" v-if="item.isEdit">
          <textarea
            v-Clickoutside="()=>outClick1(k)"
            v-model="item.title"
            maxlength="15"
            @keyup.enter="()=>outClick1(k)"
          ></textarea>
        </div>
        <!--小节编辑 end-->

        <!--小节展示 start-->
        <div class="c-info-show" v-else @click="edit(k)">
          {{item.title}}
          <i class="icon-edit"></i>
        </div>
        <!--小节展示 end-->

        <el-switch
          v-if="item.courseStatus===1||item.courseStatus===2"
          class="switch"
          @change="(val)=>liSwiChange(val,k)"
          v-model="item.isUse"
        ></el-switch>
        <div class="del-chapter" @click="delBtn('one',k)" v-else>删除</div>
      </div>

      <div class="details mb0" @click="openFun(k,true)" v-if="!item.isOpen">
        展开
        <i class="icon-down"></i>
      </div>
      <div class="details" @click="openFun(k,false)" v-else>
        收起
        <i class="icon-up"></i>
      </div>
      <div class="info-details" v-show="item.isOpen">
        <div class="line"></div>
        <ul>
          <li v-for="(obj,i) in item.lessonList" :key="i">
            <span>{{i+1}}</span>
            {{obj.title}}
          </li>
        </ul>
      </div>
    </div>
    <NewAdd :index="index" :cbFun="addCbFunction"></NewAdd>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import NewAdd from "./newAdd";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import { couBunUpdBunCou } from "../../service/creCouPlans";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
const EditCouPlansStore = namespace("editCouPlans");
const UserinfoStore = namespace("userinfo");

@Component({
  name: "creNewCourse",
  directives: {
    Clickoutside
  },
  components: {
    NewAdd
  }
})
export default class CreNewCourse extends Vue {
  @EditCouPlansStore.State("templateList") templateList; //当前选择的群组 默认第一个群组
  @EditCouPlansStore.Action("templateListHandle") templateListHandle; //当前选择的群组  action修改方法

  @EditCouPlansStore.State("delCourse") delCourse; //被删除的--课程
  @EditCouPlansStore.Action("delCourseHandle") delCourseHandle; //被删除的--课程  action修改方法

  @UserinfoStore.Action("dialogHandle") dialogHandle; //被删除的--课程  action修改方法

  @Prop({
    required: false,
    default: function() {
      return {
        isUse: true, //当前模块是否可用
        isEdit: false, //当前顶部标题  是否在编辑状态  true是  false
        title: "第一章", //当前章节标题
        bundleId: "", //当前Id
        level: "chapter", //当前的层级 chapter 章 section节
        type: "tem", //type类型 模板'tem' 'add'
        chapter: [
          {
            isOpen: true, //当前模块是否展开 true展开 false 不展开
            isUse: true, //当前模块是否可用
            isEdit: false, //当前标题  是否在编辑状态  true是  false
            header: require("../../assets/mainNoSign/dy-big.png"),
            title: "这是一个标准课的标题超长会点点点",
            courseId: "", //
            level: "section", //当前的层级 chapter 章 section 节
            lessonList: [
              {
                id: 1,
                title: "接案"
              },
              {
                id: 2,
                title: "建立专业"
              },
              {
                id: 3,
                title: "预估"
              }
            ]
          }
        ]
      };
    }
  })
  data;

  @Prop({
    required: false
  })
  index; //当前数据的下标

  @Prop({
    required: true,
    default: null
  })
  cbFun;

  //删除回调方法
  @Prop({
    required: true,
    default: null
  })
  delCallback;

  @Prop({
    required: false,
    default: null
  })
  addCbFun;

  //新增回调方法
  @Emit addCbFunction() {
    this.addCbFun(this.index);
  }

  //竖版展示隐藏计算方法
  @Emit verticalPlate(item) {
    /**
     *
     * 1、模板竖版  关闭   数据在  展示 delFlag  true
     * 2、模板竖版  打开的 数据在  展示 delFlag  false
     * 3、上次新建竖版  删除的  数据在 不展示 delFlag  true
     * 4、上次新建竖版  打开的  数据在 展示  delFlag  false
     * 5、本次新建竖版展示的    数据在 展示   delFlag  false
     * */
    let bundleSource = item.bundleSource;
    let delFlag = item.delFlag;
    if (bundleSource === 2) {
      //模板竖版
      return true;
    } else if (bundleSource === 3) {
      //上次新建竖版
      if (delFlag) {
        //删除的
        return false;
      } else {
        //展示的
        return true;
      }
    } else {
      //本次新建竖版
      return true;
    }
  }

  //竖版内的标准课展示隐藏计算方法
  @Emit coursePlate(data, item) {
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
    //let bundleSource=data.bundleSource;
    let courseStatus = item.courseStatus;
    if (
      courseStatus === 1 ||
      courseStatus === 2 ||
      courseStatus === 3 ||
      courseStatus === 5 ||
      courseStatus === 7 ||
      courseStatus === 9 ||
      courseStatus === 11
    ) {
      return true;
    }
    /*if(bundleSource===2){//模板竖版
        if(courseSource===2){//模板自带的
          if(!item.delFlag){//false 展示
            return true;
          }else{// true  删除的
            return true;
          }
        }else if(courseSource===3){//上次添加
          if(!item.delFlag){//false 展示
            return true;
          }else{// true  删除的
            return false;
          }
        }
      }else if(bundleSource===3){//上次新增竖版
        if(!item.delFlag){//false 展示
            return true;
        }else{// true  删除的
            return false;
        }
      }else{
        if(!item.delFlag){
          return true;
        }
      }*/
  }

  @Emit Recstandard(key) {
    window.open(
      window.location.href.split("#")[0] +
        "#/Recstandard?courseId=" +
        encodeURIComponent(key)
    );
  }

  //标题编辑按钮点击事件
  @Emit edit(index) {
    let opt = cloneObj(this.data);
    if (index !== null) {
      opt.chapter[index].isEdit = true;
    } else {
      opt.isEdit = true;
    }
    this.cbFunction(this.index, opt);
  }

  //点击.input 元素以外的其他区域
  @Emit outClick() {
    let opt = cloneObj(this.data);
    if (opt.isEdit) {
      opt.isEdit = false;
      this.cbFunction(this.index, opt);
    }
  }

  //点击小节输入框以外的区域小节输入框消失
  @Emit outClick1(index) {
    let opt = cloneObj(this.data);
    if (opt.chapter[index].isEdit) {
      opt.chapter[index].isEdit = false;
      this.cbFunction(this.index, opt);
    }
  }

  //开关点击事件
  @Emit switchChange(val) {
    let opt = cloneObj(this.data);
    opt.isUse = val;
    if (val === false) {
      opt.delFlag = true;
    } else {
      opt.delFlag = false;
    }
    let chapter = opt.chapter;
    chapter.map((item, i) => {
      item.isUse = val;
      if (val == false) {
        item.isOpen = val;
      }
      if (val === false) {
        item.delFlag = true;
      } else {
        item.delFlag = false;
      }
    });
    this.cbFunction(this.index, opt);
  }

  // 节开关 点击事件
  @Emit liSwiChange(val, i) {
    let opt = cloneObj(this.data);
    opt.chapter[i].isUse = val;
    if (val === false) {
      opt.chapter[i].delFlag = true;
    } else {
      opt.chapter[i].delFlag = false;
    }
    this.cbFunction(this.index, opt);
  }

  //节是否展开  收起展开点击事件
  @Emit openFun(i, val) {
    let opt = cloneObj(this.data);
    if (opt.chapter[i].isOpen != val) {
      opt.chapter[i].isOpen = val;
      this.cbFunction(this.index, opt);
    }
  }

  //删除按钮 点击事件
  @Emit delBtn(type, i) {
    if (typeof this.delCallback == "function") {
      this.delCallback(type, this.index, i);
    }
  }

  //当前组件 回调方法
  @Emit cbFunction(index, data) {
    if (typeof this.cbFun == "function") {
      this.cbFun(index, cloneObj(data));
    }
  }
}
</script>

<style lang="scss" scoped>
.add-course {
  display: inline-block;
  width: 338px;
  background: rgba(248, 249, 250, 1);
  min-height: calc(100vh - 160px);
  border-radius: 16px;
  margin-right: 18px;
  vertical-align: top;
}

.number {
  font-size: 16px;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  .switch {
    float: right;
  }
}

.add-course /deep/ {
  .el-switch {
    width: 26px;
    height: 16px;
    .el-switch__core {
      width: 26px;
      height: 16px;
    }
    .el-switch__core:after {
      width: 14px;
      height: 14px;
      margin-left: -1px;
      top: 0;
    }
  }
  .is-checked {
    width: 26px;
    height: 16px;
    .el-switch__core {
      width: 26px;
      height: 16px;
    }
    .el-switch__core:after {
      width: 14px;
      height: 14px;
      margin-left: -14px;
      top: 0;
    }
  }
}

/*展示状态下*/
.chapter {
  padding: 16px 24px 15px 24px;
  .show {
    float: left;
    max-width: 235px;
    cursor: pointer;
    height: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    padding-right: 27px;
    position: relative;
    &:hover .icon-edit {
      position: absolute;
      top: 1px;
      right: 0;
      width: 19px;
      height: 18px;
      background: url("../../assets/creCouPlans/edit-hover.svg") no-repeat;
      background-size: 100% auto;
      vertical-align: middle;
    }
  }
}

.del-chapter {
  float: right;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  height: 21px;
  line-height: 21px;
  cursor: pointer;
}

/*可输入状态下*/
.change-chapter {
  padding: 10px 24px 10px 8px;
  .input {
    float: left;
    width: 235px;
    height: 32px;
    input {
      width: 100%;
      height: 100%;
      line-height: 52px;
      padding: 6px 15px;
      color: #333;
      border-radius: 8px;
      border: 1px solid rgba(254, 120, 101, 0);
    }
    input:hover {
      border: 1px solid rgba(254, 120, 101, 0.2);
    }
    input:focus {
      border: 1px solid rgba(255, 163, 158, 1);
      background: #fff;
    }
    /*input 框错误提示*/
    .err {
      box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
      border: 1px solid rgba(254, 120, 101, 1);
    }
  }
  .switch {
    margin-top: 6px;
  }
  .del-chapter {
    height: 32px;
    line-height: 32px;
    cursor: pointer;
  }
}

/*每门课标题*/
.c-item {
  white-space: normal;
  background: #fff;
  padding: 13px 0 13px 16px;
  width: 322px;
  margin: 0 auto;
  margin-bottom: 8px;
  border-radius: 8px;
  .c-title {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-right: 16px;
    .c-img {
      position: relative;
      width: 67px;
      height: 40px;
      cursor: pointer;
      .bg {
        width: 67px;
        height: 40px;
        border-radius: 4px;
      }
      .yulan {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 20px;
        z-index: 22;
      }
      span {
        position: absolute;
        bottom: 0;
        left: 0;
        padding-left: 5px;
        width: 100%;
        height: 40px;
        // text-align: center;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px 4px 4px 4px;
        padding-top: 19px;
        font-size: 16px;
        color: #e6e6e6;
        font-weight: 500;
      }
      .course {
        float: left;
        width: 56px;
        height: 22px;
        background: rgba(51, 51, 51, 0.6);
        text-align: center;
        border-radius: 2px;
        margin: 4px 0 0 5px;
        position: relative;
        z-index: 21;
        cursor: pointer;
        display: none;
        .triangle {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 21;
          width: 4px;
          height: 4px;
          border-top: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid rgba(51, 51, 51, 0.6);
          border-left: 4px solid transparent;
        }
        // .gle {
        //   width: 56px;
        //   height: 4px;
        //   position: absolute;
        //   top: -4px;
        //   background-color: #fff;
        // }
        p {
          width: 56px;
          height: 22px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
      }
    }
    .c-img:hover {
      .course {
        display: block;
      }
    }
    .c-info-show {
      width: 150px;
      height: 40px;
      margin: 0 16px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      position: relative;
      cursor: pointer;
      .icon-edit {
        display: inline-block;
        width: 19px;
        height: 18px;
        background: url("../../assets/creCouPlans/edit-hover.svg") no-repeat;
        background-size: 100% auto;
        margin-left: 7px;
        vertical-align: middle;
      }
    }
    .c-info-edit {
      width: 150px;
      height: 40px;
      margin: 0 16px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      textarea {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      textarea:hover {
        border: 1px solid rgba(254, 120, 101, 0.2);
      }
      textarea:focus {
        border: 1px solid rgba(255, 163, 158, 1);
        background: #fff;
      }
      /*input 框错误提示*/
      .err {
        box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
        border: 1px solid rgba(254, 120, 101, 1);
      }
    }
  }
  .details {
    display: flex;
    justify-content: flex-end;
    text-align: right;
    padding-right: 16px;
    font-size: 12px;
    color: #999;
    margin-top: 3px;
    margin-bottom: 10px;
    cursor: pointer;
    line-height: 19px;
    i {
      display: inline-block;
      width: 19px;
      height: 19px;
    }
    .icon-down {
      background: url("../../assets/creCouPlans/icon-down.svg") no-repeat;
      background-size: 100% auto;
    }
    .icon-up {
      background: url("../../assets/creCouPlans/icon-up.svg") no-repeat;
      background-size: 100% auto;
    }
  }
  .mb0 {
    margin-bottom: 0;
  }
  .info-details {
    .line {
      height: 0;
      border-bottom: 1px dashed #e6e7eb;
    }
    ul {
      font-size: 14px;
      font-weight: 400;
      color: #999;
      li {
        line-height: 36px;
        span {
          margin-right: 10px;
        }
      }
    }
  }
}

.switch.is-checked /deep/ .el-switch__core {
  border-color: #fe7865;
  background-color: #fe7865;
}
</style>
