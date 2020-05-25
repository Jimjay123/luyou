<template>
  <div class="creator">
    <HomeHeader style="margin-left:18px;margin-right:18px;" />
    <!--<div class="folder">
      <FolderItem v-for="(item,index) in folderList" :key="index" :options="item" />
      <FolderItem :options="{title:'',id:''}" />
    </div>-->

    <!--选择模板 start-->
    <SelectTem v-show="false" />
    <!--选择模板 end-->

    <!--上传文件 start-->
    <UploadFile v-show="uploadFileShow" :cbFun="uploadFileCb" />
    <!--上传文件 end-->

    <!--search 部分 start -->
    <div class="search-info clearfix" style="margin-left:18px;margin-right:18px;">
      <TabList :list="tabList" :censusCount="censusCount" :tabCb="tabListCb" :tab="searchTab" />

      <div class="search-right">
        <MulSelect
          style="width:114px;height:32px;margin-right:12px"
          :selVal="selCou"
          :list="selCouList"
          :input="(e)=>inputChange(e,'select','selCou')"
        ></MulSelect>
        <SearchInput
          class="input"
          style="width:160px;height:32px"
          :value="searchVal"
          :placeHolder="'请输入关键字'"
          :input="(e,type)=>inputChange(e,type,'searchVal')"
        ></SearchInput>
      </div>
    </div>
    <!--search 部分 end -->
    <div class="course-list clearfix">
      <!--新建课程 start-->
      <NewCourse />
      <!--新建课程 end-->

      <!--课程计划 start-->
      <CourseItem
        v-for="(item,index) in courseList"
        :key="index"
        :options="item"
        :callBack="callBack"
      />
      <!--课程计划 end-->
    </div>
    <router-view />
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import HomeHeader from "./homeHeader";
import FolderItem from "./folderItem";
import TabList from "./tabList";
import NewCourse from "./newCourse";
import CourseItem from "./courseItem";
import MulSelect from "./mulSelect";
import SearchInput from "../teachers/searchInput";
import UploadFile from "./uploadFile";
import SelectTem from "./selectTem";
import {
  ownCourseAndChannelList,
  getCourAndChaAmount,
  editCouOrChaName,
  delCouLogDel
} from "../../service/creatorApi";
import { tipsFail } from "../../utils/utils";

@Component({
  name: "creatorHome",
  components: {
    HomeHeader,
    FolderItem,
    TabList,
    MulSelect,
    SearchInput,
    NewCourse,
    CourseItem,
    UploadFile,
    SelectTem
  }
})
export default class CreatorHome extends Vue {
  folderList = [
    {
      title: "全部创作",
      id: "1"
    },
    {
      title: "创作1",
      id: "2"
    },
    {
      title: "创作2",
      id: "3"
    },
    {
      title: "创作3",
      id: "4"
    }
  ];
  tabList = ["全部", "编辑中", "审核中", "已发布"];
  searchTab = "编辑中";
  searchVal = ""; //搜索输入框
  selCou = {
    val: "",
    label: "全部"
  }; //课程选择
  selCouList = [
    {
      val: "",
      label: "全部"
    },
    {
      val: "标准课",
      label: "标准课",
      children: [
        {
          val: "TPE课程",
          label: "TPE课程"
        },
        {
          val: "NPE课程",
          label: "NPE课程"
        },
        {
          val: "沙盘课程",
          label: "沙盘课程"
        }
      ]
    },
    {
      val: "课程频道",
      label: "课程频道"
    }
  ]; //课程选择数组
  censusCount = [0, 0, 0, 0]; //统计课程数据信息

  uploadFileShow = false;

  courseList = []; //课程列表数据
  timer = null;

  //tab切换回调方法
  @Emit tabListCb(val) {
    this.searchTab = val;
    this.getCourseListFun();
  }

  //上传文件回调方法
  @Emit uploadFileCb(type, val) {
    if (type === "hide") {
      this.uploadFileShow = val;
    }
  }

  //下拉选择框改变事件
  @Emit inputChange(e, type, name) {
    if (type === "select") {
      if (this[name].val !== e.val) {
        //this.groStaGroFeeBackFun(e.val)
      }
      this[name] = e;
      this.getCourseListFun();
      this.getCourAndChaAmountFun();
    } else if ("input") {
      this[name] = e.target.value;
      if (this[name].val !== e.target.value) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getCourseListFun();
          this.getCourAndChaAmountFun();
        }, 300);
      }
    }
  }

  //课程card组件 回调方法
  @Emit callBack(type, opt) {
    if (type === "del") {
      this.delCouLogDelFun(opt);
    } else if (type === "edit") {
      this.editCouOrChaNameFun(opt);
    }
  }

  //获取当前页课程数组接口
  @Emit getCourseListFun() {
    let state = null;
    let data = {
      keyName: this.searchVal
    };
    if (this.searchTab === "编辑中") {
      data.state = 0;
    } else if (this.searchTab === "审核中") {
      data.state = 1;
    } else if (this.searchTab === "已发布") {
      data.state = 2;
    }
    if (this.selCou.val === "标准课") {
      data.keyType = 1;
    } else if (this.selCou.val === "课程频道") {
      data.keyType = 2;
    } else if (this.selCou.val === "TPE课程") {
      data.courseType = 1;
    } else if (this.selCou.val === "NPE课程") {
      data.courseType = 2;
    } else if (this.selCou.val === "沙盘课程") {
      data.courseType = 3;
    }

    ownCourseAndChannelList(data).then(res => {
      if (res.code == 0) {
        this.courseList = res.page.list;
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //创作者端首页 获取用户课程统计数据
  @Emit getCourAndChaAmountFun() {
    let data = { keyName: this.searchVal };
    if (this.selCou.val === "标准课") {
      data.keyType = 1;
    } else if (this.selCou.val === "课程频道") {
      data.keyType = 2;
    } else if (this.selCou.val === "TPE课程") {
      data.courseType = 1;
    } else if (this.selCou.val === "NPE课程") {
      data.courseType = 2;
    } else if (this.selCou.val === "沙盘课程") {
      data.courseType = 3;
    }
    getCourAndChaAmount(data).then(res => {
      if (res.code == 0) {
        let data = res.data;
        this.censusCount = [
          data.totalAmount || 0,
          data.editAmount || 0,
          data.applyAmount || 0,
          data.publishAmount || 0
        ];
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //修改课程名称接口
  @Emit editCouOrChaNameFun(opt) {
    editCouOrChaName({
      keyId: opt.keyId,
      keyName: opt.keyName,
      keyType: opt.keyType
    }).then(res => {
      if (res.code == 0) {
        this.getCourseListFun();
        this.getCourAndChaAmountFun();
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //删除课程 接口
  @Emit delCouLogDelFun(opt) {
    delCouLogDel({
      keyId: opt.keyId,
      keyName: opt.keyName,
      keyType: opt.keyType
    }).then(res => {
      if (res.code == 0) {
        this.getCourseListFun();
        this.getCourAndChaAmountFun();
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    this.getCourseListFun();
    this.getCourAndChaAmountFun();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.creator {
  width: 100%;
  /*padding-left: 48px;
    padding-right: 32px;*/
  margin: 0 auto;
  background: #fff;
  .folder {
    margin-top: 27px;
  }
}

@media screen and (max-width: 1404px) {
  .creator {
    width: 858px;
  }
}

@media screen and (min-width: 1404px) and (max-width: 1690px) {
  .creator {
    width: 1144px;
  }
}

@media screen and (min-width: 1690px) and (max-width: 1976px) {
  .creator {
    width: 1430px;
  }
}

@media screen and (min-width: 1976px) and (max-width: 2262px) {
  .creator {
    width: 1716px;
  }
}

@media screen and (min-width: 2262px) and (max-width: 2548px) {
  .creator {
    width: 2002px;
  }
}

@media screen and (min-width: 2548px) and (max-width: 2834px) {
  .creator {
    width: 2288px;
  }
}

@media screen and (min-width: 2834px) {
  .creator {
    width: 98%;
  }
}

.search-info {
  margin-top: 16px;
  .search-right {
    float: right;
    .input /deep/ {
      input {
        padding: 0 27px 0 12px;
      }
      .icon-search {
        left: auto;
        right: 8px;
        top: 6px;
      }
      input::-moz-placeholder,
      textarea::-moz-placeholder {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(0, 0, 0, 0.25);
      }
      input:-ms-input-placeholder,
      textarea:-ms-input-placeholder {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(0, 0, 0, 0.25);
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }
}

.course-list {
  margin-top: 22px;
  display: flex;
  flex-flow: wrap;
}
</style>
