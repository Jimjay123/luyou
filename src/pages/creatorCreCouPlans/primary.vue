<template>
  <div class="dia-bg" @click="closeFun">
    <div class="main-content" @click.stop>
      <div class="content-cli">
        <div class="top clearfix">
          <div class="left">
            <span :class="{'item':true,'active':subjectId==1}" @click="tabClick('1')">全部</span>
            <span
              v-for="(item) in majorList"
              :key="item.id"
              :class="{'item':true,'active':subjectId== item.id}"
              @click="tabClick(item.id)"
            >{{item.name}}</span>
          </div>
          <div class="right">
            <SearchInput
              class="input"
              style="width:198px;height:28px;font-size:12px"
              :value="keyName"
              :placeHolder="'请输入关键字'"
              :input="(e,type)=>inputChange(e,type,'keyName')"
            ></SearchInput>
            <a href="javascript:;" class="close" @click="closeFun">确认</a>
          </div>
        </div>
        <ul class="list">
          <li
            v-for="(item,index) in creList"
            :key="index"
            :style="{'opacity':(item.courseEditType=='add'?'0.5':'1')}"
          >
            <img :src="item.header" title="图片" />
            <p>{{item.title}}</p>
            <span class="span-timer">{{item.duration}}分钟</span>
            <div class="remark-box">
              <span
                v-for="(obj,i) in item.tagNameList"
                :key="i"
                :class="{'remark':true,'authority':obj=='官方'}"
              >{{obj}}</span>
            </div>
            <div class="btn">
              <a href="javascript:;" class="see" @click="previewFun(item)">预览</a>
              <a
                v-if="item.courseEditType===false"
                href="javascript:;"
                class="add"
                @click="selectFun('1',index)"
              >添加</a>
              <a
                v-else-if="item.courseEditType==='add'"
                href="javascript:;"
                class="cancel"
                @click="selectFun('2',index,item.courseId)"
              >取消</a>
              <a v-else href="javascript:;" class="has">已存在</a>
            </div>
          </li>
        </ul>
        <!--分页插件 start-->
        <PaginationItem
          :options="{page:page,limit:limit,total:total,cb:paginCb}"
          style="margin-bottom:53px;margin-top:21px"
        ></PaginationItem>
        <!--分页插件 end-->
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import SearchInput from "./searchInput";
import PaginationItem from "./paginationItem";
import {
  uniPurAvaCouList,
  creatorMajorList,
  courseListForChannel,
  saveCourseChannel,
  updateCourseChannel
} from "../../service/teachersApi";
import { saveCreatorFun } from "../../service/creator/creatorAction";
import { cloneObj, tokenFun, tipsFail, trimNumber } from "../../utils/utils";
import { State, Action, namespace } from "vuex-class";

const CreCouPlaStore = namespace("creCouPlans"); //原
const creatorStore = namespace("creator"); //现 已改

@Component({
  name: "primary",
  components: {
    SearchInput,
    PaginationItem
  }
})
export default class Primary extends Vue {
  @CreCouPlaStore.State("templateList") templateList; //新建竖版列表
  @CreCouPlaStore.Action("templateListHandle") templateListHandle; //新建竖版列表  action修改方法

  // creator vuex
  @creatorStore.State("creatorClassList") creatorClassList; //新建竖版列表
  @creatorStore.Action("creatorClassListHandle") creatorClassListHandle; //新建竖版列表  action修改方法// creator vuex

  @creatorStore.State("creList") creList; //新建竖版列表
  @creatorStore.Action("creListHandle") creListHandle; //新建竖版列表  action修改方法

  @Prop({ default: "1", required: false }) step;
  temIndex = ""; //竖版 下标

  page = 1; //当前页数
  limit = 6; //每页条数
  total = 12; //总条数

  subjectId = "1"; //当前tab 选中的类型 1 全部  2 社会工作
  keyType = ""; // 1标准课 2课程计划
  keyName = ""; //输入框搜索值

  list = []; //当前页数据列表
  majorList = [];

  //tab切换点击事件
  @Emit tabClick(val) {
    this.subjectId = val;
    this.paginCb(1, this.limit, {});
    if (val == "1") {
      let data = {
        page: this.page,
        limit: this.limit,
        keyTypes: "1,2"
      };
      this.uniPurAvaCouListFun(data);
    } else {
      let data = {
        page: this.page,
        limit: this.limit,
        subjectMajorId: this.subjectId,
        courseName: this.keyName,
        keyTypes: "1,2"
      };
      this.uniPurAvaCouListFun(data);
    }
  }

  //输入框搜索值改变事件
  @Emit inputChange(e, type, name) {
    if (type === "input") {
      this[name] = e.target.value;
      this.paginCb(1, this.limit);
    } else if (type === "del") {
      this[name] = "";
    } else if (type === "select") {
      this[name] = e;
    }
  }

  //窗口关闭回调
  @Emit closeFun() {
    let query = this.$route.query;
    this.$router.replace({
      path: "/creatorCreCouPlans",
      query: {
        addCourseType: query.addCourseType,
        courseChannelId: query.courseChannelId
      }
    });
  }

  //预览点击事件
  @Emit previewFun(data) {
    console.log(data.courseServerUrl);
    let url = data.courseServerUrl;
    let num = url.indexOf("pptPreview");
    if (num === -1) {
      //tpe
      let url = data.courseServerUrl;
      window.open(
        window.location.href.split("#")[0] +
          "#/orther?url=" +
          encodeURIComponent(url)
      );
    } else {
      //npe
      let courseId = data.courseId;
      let address = this.$route.fullPath;
      console.log(address);
      window.open(
        window.location.href.split("#")[0] +
          "#/pptPreview?" +
          "courseId=" +
          courseId +
          "&preview=1" +
          "&address=" +
          address
      );

      // window.open(
      //   window.location.href.split("#")[0] +
      //     "#/orther?url=" +
      //     encodeURIComponent(url)
      // );
    }
  }

  //添加取消点击事件
  @Emit selectFun(type, i, id) {
    console.log(type, i, id);
    console.log(this.$route.query.temIndex);

    saveCreatorFun({
      item: this.creList[i],
      type,
      i,
      id,
      temIndex: this.$route.query.temIndex
    });

    /*let list = cloneObj(this.creList);
       let creatorClassList = cloneObj(this.creatorClassList);
       if (type == 1) {
         //添加
         this.creList[i].type = "add";
         if (this.temIndex !== null) {
           let data = cloneObj(this.creList[i]);
           data.temType = "new";
           data.delFlag = false; // true 删除 false 新增
           creatorClassList[this.temIndex].courseList.push(data);
         } else {
           this.temIndex = creatorClassList.length;
           let data = cloneObj(this.creList[i]);
           data.temType = "new";
           data.add = "add";
           creatorClassList.push({
             isUse: true, //当前模块是否可用
             isEdit: false, //当前顶部标题  是否在编辑状态  true是  false
             title: "第" + trimNumber(this.temIndex + 1) + "章", //当前章节标题
             bundleId: "", //当前频道Id
             level: "chapter", //当前的层级 chapter 章 section节
             delFlag: false, // true 删除 false 新增
             courseList: [cloneObj(data)]
           });
         }
       } else {
         //2 取消
         this.creList[i].type = false;
         if (creatorClassList[this.temIndex].chapter.length === 1) {
           if (creatorClassList[this.temIndex].temType === "old") {
             creatorClassList[this.temIndex].delFlag = true; // true 删除 false 新增
           } else {
             creatorClassList.splice(this.temIndex, 1);
             this.temIndex = null;
           }
         } else {
           let index = creatorClassList[this.temIndex].chapter.findIndex(
             item => this.creList[i].courseId === item.courseId
           );
           if (creatorClassList[this.temIndex].chapter[index].temType === "old") {
             //表示服务端带过来的
             //creatorClassList[this.temIndex].delFlag=true;// true 删除 false 新增
             creatorClassList[this.temIndex].chapter[index].delFlag = true;
           } else {
             creatorClassList[this.temIndex].chapter.splice(
               creatorClassList[this.temIndex].chapter.findIndex(
                 item => this.creList[i].courseId === item.courseId
               ),
               1
             );
           }
         }
       }*/
  }

  //分页回调
  @Emit paginCb(page, limit, options = {}) {
    this.page = page;
    this.limit = limit;
    if (this.subjectId == "1") {
      let opt = {
        page: page,
        limit: limit,
        courseName: this.keyName, //输入框搜索值
        keyTypes: "1,2"
      };
      this.uniPurAvaCouListFun(opt);
    } else {
      let opt = {
        page: page,
        limit: limit,
        subjectMajorId: this.subjectId, //this.keyType,//当前tab 选中的类型 1 全部  2 社会工作
        courseName: this.keyName, //输入框搜索值
        keyTypes: "1,2"
      };
      this.uniPurAvaCouListFun(opt);
    }
    // if (this.subjectId == 2) {
    //   opt.subjectMajorId = this.subjectId;
    // }
  }

  //获取列表数据接口
  @Emit uniPurAvaCouListFun(data) {
    //这里通过将data 换成了对象
    courseListForChannel(data).then(res => {
      console.log(res);
      if (res.code == 0) {
        let data = res.page;
        this.total = res.page.totalCount;
        let pageList = res.page.list;
        let creList = [];
        let courseList = [];
        console.log(this.temIndex);
        console.log(this.$route.query.temIndex);
        console.log(this.creatorClassList);
        let temIndex = this.$route.query.temIndex;
        if (temIndex === 0 || temIndex) {
          courseList =
            (this.creatorClassList[temIndex] &&
              this.creatorClassList[temIndex].courseList) ||
            [];
          console.log(courseList);
        }
        pageList.map(item => {
          let obj =
            courseList.find(ite => ite.courseId === item.courseId) || "";
          let type = false;
          if (obj) {
            type = "add";
          }
          creList.push({
            isOpen: false, //当前模块是否展开 true展开 false 不展开
            isUse: true, //当前模块是否可用
            isEdit: false, //当前顶部标题  是否在编辑状态  true是  false
            header: item.popularizeImageUrl,
            courseId: item.courseId, //课程id
            title: item.courseName, //课程名称
            courseName: item.courseName, //课程名称
            duration: item.duration, //课程时长
            courseServerUrl: item.courseServerUrl,
            courseEditType: type, //add 新增的  tem 模版自带的  false 未被选中
            level: "section", //当前的层级 chapter 章 section节
            tagNameList: item.tagNameList || "", //标签
            lessonList: cloneObj(item.lessonList || "")
          });
        });
        this.creListHandle({
          creList: cloneObj(creList)
        });
      } else {
        tipsFail(res.msg);
      }
    });
    //获取专业列表
    creatorMajorList().then(res => {
      if (res.code === 0) {
        this.majorList = res.list;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //初次创建新建--接口
  @Emit saveCourseChannelFun() {
    saveCourseChannel().then(res => {
      if (res.code == 0) {
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //修改接口
  @Emit updateCourseChannelFun() {
    updateCourseChannel().then(res => {});
  }

  created() {
    this.temIndex = this.$route.query.temIndex; //获取当前竖版下标
    console.log(this.$route.path);
    console.log(this.$route.query);
    console.log(this.temIndex);
    let data = {
      page: this.page,
      limit: this.limit,
      keyTypes: "1,2"
    };
    this.paginCb(1, this.limit, {});
    this.uniPurAvaCouListFun(data);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.dia-bg {
  background: rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

body .main-content {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.content-cli {
  width: 998px;
  height: 610px;
  background: rgba(255, 255, 255, 1);
  border-radius: 13px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px 28px;
}

.top {
  .left {
    float: left;
    .item {
      display: inline-block;
      padding: 7px 12px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      cursor: pointer;
      margin-right: 8px;
    }
    .active {
      background: rgba(254, 243, 241, 1);
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(254, 120, 101, 1);
    }
  }
  .right {
    float: right;
    .close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 65px;
      height: 26px;
      line-height: 26px;
      border-radius: 12px;
      border: 1px solid rgba(204, 204, 204, 0.4);
      font-size: 10px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      text-align: center;
      margin-left: 26px;
      margin-right: 19px;
    }
  }
}

.content-cli .input-btn {
  width: 165px;
  height: 23px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(217, 217, 217, 1);
}

.content-cli .span-one {
  width: 43px;
  height: 28px;
  background: rgba(254, 243, 241, 1);
  border-radius: 5px;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(254, 120, 101, 1);
  margin-left: 23px;
  margin-top: 20px;
}

.content-cli .span-three {
  width: 55px;
  height: 28px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 5px;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  margin-left: 7px;
  margin-top: 20px;
}

.content-cli .span-two {
  width: 67px;
  height: 28px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 5px;
  margin-left: 7px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
}

.content-cli .input-btn {
  width: 165px;
  height: 23px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(217, 217, 217, 1);
  margin-left: 350px;
  margin-top: 23px;
}

.content-cli .list {
}

.content-cli .list li {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 3px 0px rgba(153, 153, 153, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 10px;
}

.content-cli .list li:first-child {
  margin-top: 21px;
}

.content-cli .list li img {
  width: 67px;
  height: 40px;
  background: rgba(94, 94, 94, 0.24);
  border-radius: 3px;
}

.content-cli .list li p {
  float: left;
  display: block;
  width: 288px;
  max-height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: 18px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; //几行
}

.content-cli .list li .span-timer {
  width: 63px;
  height: 20px;
  font-weight: 400;
  font-size: 14px;
  color: #1a1a1a;
  margin-left: 91px;
}

.list {
  .remark-box {
    width: 202px;
    height: 24px;
    margin-left: 39px;
    overflow: hidden;
    padding: 0;
    padding-top: 1px;
    .remark {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      background: rgba(250, 250, 250, 1);
      border-radius: 3px;
      border: 1px solid rgba(238, 238, 238, 1);
      padding: 2px 5px;
      margin-right: 9px;
    }
    .authority {
      background: rgba(254, 243, 241, 1);
      font-size: 12px;
      font-weight: 400;
      color: rgba(254, 120, 101, 1);
    }
  }
  .btn {
    margin-left: 19px;
    a {
      display: inline-flex;
      width: 55px;
      height: 26px;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
    }
    .see {
      font-size: 12px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
    .add {
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .cancel {
      border: 1px solid rgba(204, 204, 204, 1);
      font-size: 12px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
    .has {
      background: rgba(153, 153, 153, 0.2);
      color: rgba(255, 255, 255, 1);
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>
