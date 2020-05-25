<template>
  <div class="dia-bg" @click="closeFun">
    <div class="main-content" @click.stop>
      <div class="content-cli">
        <div class="top clearfix">
          <div class="left">
            <span :class="{'item':true,'active':subjectId== '1,2'}" @click="tabClick('1,2')">全部</span>
            <!-- <span :class="{'item':true,'active':subjectId==2}" @click="tabClick('1')">全部</span>
            <span :class="{'item':true,'active':subjectId==3}" @click="tabClick('2')">全部</span>-->
            <span
              v-for="(item) in majorList"
              :key="item.id"
              :class="{'item':true,'active':subjectId == item.id}"
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
            <img src="../../../assets/creator/sandTablestandard/close.svg" alt @click="closeFun" />
            <!-- <a href="javascript:;" class="close" @click="closeFun">确认</a> -->
          </div>
        </div>
        <ul class="list">
          <li
            v-for="(item,index) in creList"
            :key="index"
            :style="{'opacity':(item.courseType=='add'?'0.5':'1')}"
          >
            <img :src="item.header" title="图片" />
            <p>{{item.courseName}}</p>
            <span class="span-timer">{{item.duration}}分钟</span>
            <div class="remark-box">
              <span
                v-for="(obj,i) in item.tagNameList"
                :key="i"
                :class="{'remark':true,'authority':obj=='官方'}"
              >{{obj}}</span>
            </div>
            <div class="btn">
              <a href="javascript:;" class="see" @click="previewFun(item.courseServerUrl)">预览</a>
              <a
                v-if="item.courseType===false"
                href="javascript:;"
                class="add"
                @click="selectFun('1',index,item)"
              >添加</a>
              <a
                v-else-if="item.courseType==='add'"
                href="javascript:;"
                class="cancel"
                @click="selectFun('2',index,item)"
              >取消</a>
              <a v-else href="javascript:;" class="has">已存在</a>
            </div>
          </li>
        </ul>
        <!-- 分页插件 start-->
        <PaginationItem
          :options="{page:page,limit:limit,total:total,cb:paginCb}"
          style="margin-bottom:53px;margin-top:21px"
        ></PaginationItem>
        <!--分页插件 end -->
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
} from "../../../service/teachersApi";
import {
  universityAvailCourseList,
  OperatenewbindStandard,
  OperateStCourseData,
  OperateNewOperate
} from "../../../service/sandTableApi";
import { saveCreatorFun } from "../../../service/creator/creatorAction";
import { cloneObj, tokenFun, tipsFail, trimNumber } from "../../../utils/utils";
import { State, Action, namespace } from "vuex-class";
const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "primary",
  components: {
    SearchInput,
    PaginationItem
  }
})
export default class Primary extends Vue {
  @SandTableMod.State("PrimaryShow") PrimaryShow; //当前编辑模块的下标
  @SandTableMod.Action("PrimaryShowHandle") PrimaryShowHandle; //当前编辑模块的下标  action

  @SandTableMod.State("creList") creList; //新建竖版列表
  @SandTableMod.Action("creListHandle") creListHandle; //新建竖版列表  action修改方法

  // creator vuex
  @SandTableMod.State("creatorClassList") creatorClassList; //新建竖版列表
  @SandTableMod.Action("creatorClassListHandle") creatorClassListHandle; //新建竖版列表  action修改方法// creator vuex

  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前编辑模块的下标
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseList") courseList; //当前编辑模块的下标
  @SandTableMod.Action("courseListHandle") courseListHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseId") courseId; //当前编辑模块的下标
  @SandTableMod.Action("courseIdHandle") courseIdHandle; //当前编辑模块的下标  action

  @SandTableMod.State("bgImg") bgImg; //当前编辑模块的下标
  @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseId") courseId; //当前编辑模块的下标
  @SandTableMod.Action("courseIdHandle") courseIdHandle; //当前编辑模块的下标  action

  @SandTableMod.State("succIframe") succIframe; //当前编辑模块的下标
  @SandTableMod.Action("succIframeHandle") succIframeHandle; //当前编辑模块的下标  action

  @SandTableMod.State("editIndex") editIndex; //当前编辑模块的下标
  @SandTableMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @SandTableMod.State("couType") couType; //当前编辑模块的下标
  @SandTableMod.Action("couTypeHandle") couTypeHandle; //当前编辑模块的下标  action

  @SandTableMod.State("refId") refId; //当前编辑模块的下标
  @SandTableMod.Action("refIdHandle") refIdHandle; //当前编辑模块的下标  action

  @SandTableMod.State("sceneThumbnailUrl") sceneThumbnailUrl; //当前编辑模块的下标
  @SandTableMod.Action("sceneThumbnailUrlHandle") sceneThumbnailUrlHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseInfo") courseInfo; //当前编辑模块的下标
  @SandTableMod.Action("courseInfoHandle") courseInfoHandle; //当前编辑模块的下标  action

  @SandTableMod.State("classType") classType; //当前编辑模块的下标
  @SandTableMod.Action("classTypeHandle") classTypeHandle; //当前编辑模块的下标  action

  @SandTableMod.State("indx") indx; //当前编辑模块的下标
  @SandTableMod.Action("indxHandle") indxHandle; //当前编辑模块的下标  action

  temIndex = ""; //竖版 下标
  page = 1; //当前页数
  limit = 6; //每页条数
  total = 12; //总条数
  subjectId = "1,2"; //当前tab 选中的类型 1 全部  2 社会工作
  keyType = ""; // 1标准课 2课程计划
  keyName = ""; //输入框搜索值
  list = []; //当前页数据列表
  majorList = [{ id: 1, name: "TPE标准课" }, { id: 2, name: "NPE标准课" }];

  couty = "";

  refCourseId = ""; //选择当前的课程的id
  //tab切换点击事件
  @Emit tabClick(val) {
    this.subjectId = val;
    this.paginCb(1, this.limit, {});
    if (val == "1,2") {
      let data = {
        page: this.page,
        limit: this.limit,
        keyTypes: this.subjectId
      };
      this.uniPurAvaCouListFun(data);
    } else {
      let data = {
        page: this.page,
        limit: this.limit,
        keyTypes: this.subjectId
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
    let PrimaryShow = false;
    this.PrimaryShowHandle({
      PrimaryShow: PrimaryShow
    });
  }
  //预览点击事件
  @Emit previewFun(url) {
    window.open(
      window.location.href.split("#")[0] +
        "#/orther?url=" +
        encodeURIComponent(url)
    );
  }
  //添加取消点击事件
  @Emit selectFun(type, i, item) {
    if (type == 1) {
      this.$router.replace({
        path: this.$route.path,
        query: {
          courseId: this.courseId,
          temIndex: i
        }
      });
      this.temIndex = this.$route.query.temIndex; //获取当前竖版下标
      let coutype = this.creList[i].couType;
      if (coutype == 1) {
        this.creList[i].couType = 3;
      } else {
        this.creList[i].couType = 4;
      }
      this.couty == this.creList[i].coutype;

      let refCourseId = this.creList[i].keyId;
      this.refIdHandle({
        refId: refCourseId
      });

      let sceneThumbnailUrl =
        "https://cloud.luyouor.com/scene/course/0/defaultScene/thumbnail.jpg";

      this.sceneThumbnailUrlHandle({
        sceneThumbnailUrl: sceneThumbnailUrl
      });

      let courseId = this.courseId;
      let cour = this.creList[i].lessonList;
      let courseList = [];
      cour.map(item => {
        courseList.push({
          isOpen: false, //当前模块是否展开 true展开 false 不展开
          isUse: true, //当前模块是否可用
          courseId: item.courseId, //课程id
          lessonName: item.title, //课程名称
          lessonSceneUrl:
            "https://cloud.luyouor.com/scene/course/0/defaultScene/", //选择课程后的场景
          lessonServerUrl: item.lessonServerUrl, //选择课程后的第三方课程
          sceneThumbnailUrl:
            "https://cloud.luyouor.com/scene/course/0/defaultScene/thumbnail.jpg", //选择课程后的缩略图
          courseName: this.creList[i].courseName, //课程名称
          courseServerUrl: this.creList[i].courseServerUrl
        });
      });

      this.courseListHandle({
        courseList: courseList
      });

      let editIndex = this.editIndex;
      let list = {
        courseId: courseId,
        courseType: this.creList[i].couType,
        refCourseId: refCourseId,
        stLessonList: courseList,
        bgImgStatus: 1,
        courseServerUrl: courseList[editIndex].lessonServerUrl,
        sceneThumbnailUrl: sceneThumbnailUrl,
        editIndex: this.editIndex
      };

      OperateNewOperate(list).then(res => {
        if (res.code === 0) {
          let courseInfo = res.data;

          this.courseInfoHandle({
            courseInfo: courseInfo
          });

          let PrimaryShow = false;

          this.PrimaryShowHandle({
            PrimaryShow: PrimaryShow
          });

          let bgImgStatus = 1;
          this.bgImgStatusHandle({
            bgImgStatus: bgImgStatus
          });

          let bgImg = "https://cloud.luyouor.com/scene/course/0/defaultScene/";

          this.bgImgHandle({
            bgImg: bgImg
          });

          let editIndex = this.editIndex;

          let succIframe = this.courseList[editIndex].lessonServerUrl;

          this.succIframeHandle({
            succIframe: succIframe
          });

          let classType = courseInfo.currentStCourseData.courseType;

          this.classTypeHandle({
            classType: classType
          });

          let indx = courseInfo.currentStCourseData.stLessonList.length;

          this.indxHandle({
            indx: indx
          });
        } else {
          tipsFail(res.msg);
        }
      });
    } else {
      let list = {
        courseId: this.courseId,
        courseType: "",
        refCourseId: "",
        stLessonList: [],
        bgImgStatus: 0,
        courseServerUrl: "",
        sceneThumbnailUrl: "",
        editIndex: this.editIndex
      };
      OperateNewOperate(list).then(res => {
        if (res.code === 0) {
          let courseInfo = res.data;

          this.courseInfoHandle({
            courseInfo: courseInfo
          });

          let courseList = {};
          courseList = {
            courseName: "",
            lessonList: []
          }; //上传文件内容
          this.courseListHandle({
            courseList: courseList
          });
          let bgImgStatus = 0;
          this.bgImgStatusHandle({
            bgImgStatus: bgImgStatus
          });
          let bgImg = "https://cloud.luyouor.com/scene/course/0/defaultScene/";

          this.bgImgHandle({
            bgImg: bgImg
          });
          let classType = 0;

          this.classTypeHandle({
            classType: classType
          });

          let indx = "";

          this.indxHandle({
            indx: indx
          });

          let PrimaryShow = false;
          this.PrimaryShowHandle({
            PrimaryShow: PrimaryShow
          });

          this.$router.replace({
            path: this.$route.path,
            query: {
              courseId: this.courseId
            }
          });

          let temIndex = this.$route.query.temIndex;
          let creList = this.creList;
          creList[i].courseType = false;
          this.creListHandle({
            creList: creList
          });
        } else {
          tipsFail(res.msg);
        }
      });
    }
  }

  //分页回调
  @Emit paginCb(page, limit, options = {}) {
    this.page = page;
    this.limit = limit;
    if (this.subjectId == "1,2") {
      let opt = {
        page: page,
        limit: limit,
        keyTypes: this.subjectId, //this.keyType,//当前tab 选中的类型 1 全部  2 社会工作
        keyName: this.keyName //输入框搜索值
      };
      this.uniPurAvaCouListFun(opt);
    } else {
      let opt = {
        page: page,
        limit: limit,
        keyTypes: this.subjectId, //this.keyType,//当前tab 选中的类型 1 全部  2 社会工作
        keyName: this.keyName //输入框搜索值
      };
      this.uniPurAvaCouListFun(opt);
    }
  }
  //获取列表数据接口
  @Emit uniPurAvaCouListFun(data) {
    //这里通过将data 换成了对象
    universityAvailCourseList(data).then(res => {
      if (res.code == 0) {
        let data = res.page;
        this.total = res.page.totalCount;
        let pageList = res.page.list;
        let creList = [];
        let courseList = [];
        let temIndex = this.$route.query.temIndex;
        pageList.map(item => {
          let cre = {
            isOpen: false, //当前模块是否展开 true展开 false 不展开
            isUse: true, //当前模块是否可用
            isEdit: false, //当前顶部标题  是否在编辑状态  true是  false
            header: item.popularizeImageUrl,
            courseId: this.courseId, //课程id
            title: item.courseName, //课程名称
            courseName: item.courseName, //课程名称
            duration: item.duration, //课程时长
            courseServerUrl: item.courseServerUrl,
            courseType: false, //add 新增的  tem 模版自带的  false 未被选中
            level: "section", //当前的层级 chapter 章 section节
            tagNameList: item.tagNameList || "", //标签
            lessonList: cloneObj(item.lessonList || ""),
            keyId: item.courseId,
            couType: item.courseType
          };

          //let obj = this.creList.find(d => d.keyId === item.courseId);
          let obj = null;
          this.creList.map(d => {
            if (d.keyId === item.courseId) {
              obj = d;
              console.log(d.keyId, item.courseId);
            }
          });
          console.log(obj);
          if (obj) {
            cre.courseType = "add";
          }
          creList.push(cre);
        });
        this.creListHandle({
          creList: cloneObj(creList)
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }
  created() {
    let data = {
      page: this.page,
      limit: this.limit,
      keyTypes: this.subjectId
    };
    // this.paginCb(1, this.limit, {});
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
  padding: 33px 28px 24px;
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
    img {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
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
