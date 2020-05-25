<template>
  <div class="dia-bg" @click="closeFun">
    <div class="main-content" @click.stop>
      <div class="content-cli">
        <div class="top clearfix">
          <div class="left">
            <span :class="{'item':true,'active':subjectId=='1'}" @click="tabClick('1')">全部</span>
            <span :class="{'item':true,'active':subjectId=='2'}" @click="tabClick('2')">社会工作</span>
            <!--<span :class="{'item':true,'active':keyType==='心理学'}" @click="tabClick('心理学')">心理学</span>-->
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
            v-for="(item,index) in list"
            :key="index"
            :style="{'opacity':(item.type=='add'?'0.5':'1')}"
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
              <span class="remarkDia"></span>
            </div>
            <div class="btn">
              <a href="javascript:;" class="see" @click="previewFun(item)">预览</a>
              <a
                v-if="item.type===false"
                href="javascript:;"
                class="add"
                @click="selectFun('1',index)"
              >添加</a>
              <a
                v-else-if="item.type==='add'"
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
import PaginationItem from "../group/paginationItem";
import { uniPurAvaCouList } from "../../service/teachersApi";
import { cloneObj, tokenFun, tipsFail, trimNumber } from "../../utils/utils";
import { State, Action, namespace } from "vuex-class";
const CreCouPlaStore = namespace("creCouPlans");

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

  @Prop({ default: "1", required: false }) step;
  temIndex = ""; //竖版 下标

  page = 1; //当前页数
  limit = 6; //每页条数
  total = 12; //总条数

  subjectId = "1"; //当前tab 选中的类型 1 全部  2 社会工作
  keyType = ""; // 1标准课 2课程计划
  keyName = ""; //输入框搜索值

  list = []; //当前页数据列表

  //tab切换点击事件
  @Emit tabClick(val) {
    this.subjectId = val;
    this.paginCb(1, this.limit);
  }

  //输入框搜索值改变事件
  @Emit inputChange(e, type, name) {
    console.log(e, type, name);
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
      path: "/teachers/creCouPlans",
      query: {
        addCourseType: query.addCourseType,
        courseChannelId: query.courseChannelId
      }
    });
  }

  //预览点击事件
  @Emit previewFun(data) {
    console.log(data);
    let url = data.courseServerUrl;
    let num = url.indexOf("pptPreview");
    console.log(num);
    if (num === -1) {
      //tpe
      window.open(
        window.location.href.split("#")[0] +
          "#/orther?url=" +
          encodeURIComponent(url)
      );
    } else {
      let courseId = data.courseId;
      let address = this.$route.fullPath;
      console.log(address);
      window.open(
        window.location.href.split("#")[0] +
          "#/pptPreview?" +
          "courseId=" +
          courseId +
          "&preview=2" +
          "&address=" +
          address
      );
    }
  }

  //添加取消点击事件
  @Emit selectFun(type, i, id) {
    console.log(type, i, id);
    let list = this.list;
    let templateList = this.templateList;
    console.log(list);
    console.log(templateList);
    if (type == 1) {
      //添加
      this.list[i].type = "add";
      if (this.temIndex !== null) {
        let data = cloneObj(this.list[i]);
        data.temType = "new";
        data.delFlag = false; // true 删除 false 新增
        templateList[this.temIndex].chapter.push(data);
      } else {
        this.temIndex = templateList.length;
        let data = cloneObj(this.list[i]);
        data.temType = "new";
        data.add = "add";
        templateList.push({
          isUse: true, //当前模块是否可用
          isEdit: false, //当前顶部标题  是否在编辑状态  true是  false
          title: "第" + trimNumber(this.temIndex + 1) + "章", //当前章节标题
          bundleId: "", //当前频道Id
          type: "add", //type类型 模板'tem' 'add'
          temType: "new", //new 新增 old 接口带过来的
          level: "chapter", //当前的层级 chapter 章 section节
          delFlag: false, // true 删除 false 新增
          chapter: [cloneObj(data)]
        });
      }
    } else {
      //2 取消
      this.list[i].type = false;
      if (templateList[this.temIndex].chapter.length === 1) {
        if (templateList[this.temIndex].temType === "old") {
          templateList[this.temIndex].delFlag = true; // true 删除 false 新增
        } else {
          templateList.splice(this.temIndex, 1);
          this.temIndex = null;
        }
      } else {
        let index = templateList[this.temIndex].chapter.findIndex(
          item => this.list[i].courseId === item.courseId
        );
        if (templateList[this.temIndex].chapter[index].temType === "old") {
          //表示服务端带过来的
          //templateList[this.temIndex].delFlag=true;// true 删除 false 新增
          templateList[this.temIndex].chapter[index].delFlag = true;
        } else {
          templateList[this.temIndex].chapter.splice(
            templateList[this.temIndex].chapter.findIndex(
              item => this.list[i].courseId === item.courseId
            ),
            1
          );
        }
      }
    }
    this.templateListHandle({
      templateList: cloneObj(templateList)
    });
  }

  //分页回调
  @Emit paginCb(page, limit, options = {}) {
    this.page = page;
    this.limit = limit;
    let opt = {
      page: page,
      limit: limit,

      keyTypes: "1,2", //this.keyType,//当前tab 选中的类型 1 全部  2 社会工作
      keyName: this.keyName //输入框搜索值
    };
    if (this.subjectId == 2) {
      opt.subjectMajorId = this.subjectId;
    }

    this.uniPurAvaCouListFun(opt);
  }

  //获取列表数据接口
  @Emit uniPurAvaCouListFun(data) {
    uniPurAvaCouList(data).then(res => {
      console.log(res);
      if (res.code == "0") {
        let data = res.page;
        console.log(this);
        this.list = [];
        this.total = data.totalCount;

        let pageList = res.page.list;
        let list = [];
        let chapter = [];
        console.log(chapter);
        console.log(this.temIndex);
        if (this.temIndex === 0 || this.temIndex) {
          chapter = this.templateList[this.temIndex].chapter;
          console.log(chapter);
        }
        console.log(pageList);
        pageList.map(item => {
          let obj = chapter.find(ite => ite.courseId === item.keyId) || "";
          console.log(obj);
          let type = false;
          if (obj) {
            type = obj.type;
            console.log(type);
          }
          list.push({
            isOpen: false, //当前模块是否展开 true展开 false 不展开
            isUse: true, //当前模块是否可用
            isEdit: false, //当前顶部标题  是否在编辑状态  true是  false
            header: item.popularizeImageUrl,
            courseId: item.keyId, //课程id
            title: item.keyName, //课程名称
            duration: item.duration, //课程时长
            courseServerUrl: item.courseServerUrl,
            type: type, //add 新增的  tem 模版自带的  false 未被选中
            level: "section", //当前的层级 chapter 章 section节
            tagNameList: item.tagNameList, //标签
            lessonList: cloneObj(item.lessonList)
          });
        });
        this.list = cloneObj(list);
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    this.paginCb(1, this.limit);
    this.temIndex = this.$route.query.temIndex; //获取当前竖版下标
    console.log(this.temIndex);
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
    white-space: nowrap;
    position: relative;
    .remark {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      background: rgba(250, 250, 250, 1);
      border-radius: 3px;
      border: 1px solid rgba(238, 238, 238, 1);
      padding: 2px 5px;
      margin-right: 14px;
    }
    .remarkDia {
      position: absolute;
      top: 0;
      right: 0;
      width: 23px;
      height: 22px;
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.9) 60%,
        rgba(255, 255, 255, 0) 100%
      );
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
