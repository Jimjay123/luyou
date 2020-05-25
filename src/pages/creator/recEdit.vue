<template>
  <div class="recEdit">
    <HomeHeader style="margin-left:18px;margin-right:18px;" />

    <!--选择模板 start-->
    <SelectTem v-show="false" />
    <div class="delTips" v-if="showDelTips">成功移入回收站</div>
    <!--选择模板 end-->

    <!--search 部分 start -->
    <div class="search-info clearfix" style="margin-left:18px;margin-right:18px;">
      <TabList :list="tabList" :censusCount="censusCount" :tabCb="tabListCb" :tab="searchTab" />

      <div class="search-right">
        <MulSelect
          style="width:160px;height:32px;margin-right:12px"
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
      <!--课程计划 start-->
      <recCourseItem
        v-for="(item,index) in recEditList"
        :key="index"
        :options="item"
        :callBack="callBack"
      />
      <!--课程计划 end-->
    </div>
    <!-- 删除弹框 start -->
    <!-- <DelSingleDailog :cbFun="deleteCb" :show="deleteShow"></DelSingleDailog> -->
    <!-- 删除弹框 end -->
    <router-view />
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import HomeHeader from "./homeHeader";
import FolderItem from "./folderItem";
import TabList from "./tabList";
import recCourseItem from "./recCourseItem";
import MulSelect from "./mulSelect";
import SearchInput from "../teachers/searchInput";
import SelectTem from "./selectTem";
import {
  editCouOrChaName,
  delCouLogDel,
  copyCouInfoFroOther,
  ownRecentRevisionList,
  ownRecentRevisionAmount
} from "../../service/creatorApi";
// import DelSingleDailog from "./delSingleDailog";
import { tipsFail } from "../../utils/utils";

@Component({
  name: "recEdit",
  components: {
    HomeHeader,
    FolderItem,
    TabList,
    MulSelect,
    SearchInput,
    recCourseItem,
    SelectTem
    // DelSingleDailog
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
  searchTab = "全部";
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
        }
      ]
    },
    {
      val: "课程频道",
      label: "课程频道"
    },
    {
      val: "标准课（沙盘）",
      label: "标准课（沙盘）"
    },
    {
      val: "频道（沙盘）",
      label: "频道（沙盘）"
    }
  ]; //课程选择数组
  censusCount = [0, 0, 0, 0]; //统计课程数据信息

  uploadFileShow = true;
  recEditList = []; //
  // deleteShow = false; //删除弹框
  showDelTips = false;

  //tab切换回调方法
  @Emit tabListCb(val) {
    this.searchTab = val;
    this.getCourseListFun();
  }

  // // 删除课程调方法
  // @Emit deleteCb(type) {
  //   console.log(type);
  //   console.log("删除弹框");
  //   if (type === "hide" || type === "cancel") {
  //     //这里把confirm修改为cancel
  //     this.deleteShow = false;
  //   } else {
  //     this.deleteShow = false;
  //     // 调用接口
  //     console.log("调用接口");
  //   }
  // }

  // // 彻底删除课程
  // @Emit deepDelete(index) {
  //   // this.deleteShow = true;
  //   this.showDelTips = true;
  //   setTimeout(() => {
  //     this.showDelTips = false;
  //   }, 3000);
  //   console.log(index);
  // }

  //下拉选择框改变事件
  @Emit inputChange(e, type, name) {
    console.log(e, type, name);
    if (type === "select") {
      if (this[name].val !== e.val) {
        //this.groStaGroFeeBackFun(e.val)
      }
      this[name] = e;
      this.getCourseListFun();
      this.ownRecentRevisionAmountFun();
    } else if ("input") {
      this[name] = e.target.value;
      console.log(name);
      console.log(this[name]);
      if (this[name].val !== e.target.value) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getCourseListFun();
          this.ownRecentRevisionAmountFun();
        }, 300);
      }
      this.getCourseListFun();
      this.ownRecentRevisionListFun();
      this.ownRecentRevisionAmountFun();
    }
  }
  //课程card组件 回调方法
  @Emit callBack(type, opt) {
    console.log(type);
    if (type === "del") {
      this.showDelTips = true;
      setTimeout(() => {
        this.showDelTips = false;
      }, 3000);
      this.delCouLogDelFun(opt);
    } else if (type === "edit") {
      this.editCouOrChaNameFun(opt);
    } else if (type === "copy") {
      this.copyCouInfoFroOtherFun(opt);
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
    if (this.selCou.val === "TPE课程") {
      data.keyTypes = 1;
    } else if (this.selCou.val === "NPE课程") {
      data.keyTypes = 2;
    } else if (this.selCou.val === "课程频道") {
      data.keyTypes = 11;
    } else if (this.selCou.val === "标准课（沙盘）") {
      data.keyTypes = "0,3,4";
    } else if (this.selCou.val === "频道（沙盘）") {
      data.keyTypes = 12;
    } else if (this.selCou.val === "标准课") {
      data.keyTypes = "1,2";
    }
    ownRecentRevisionList(data).then(res => {
      if (res.code == 0) {
        this.recEditList = res.page.list.slice(0, 12);
      } else {
        tipsFail(res.msg);
      }
    });
  }
  //创作者端首页 获取用户课程统计数据
  @Emit ownRecentRevisionAmountFun() {
    let data = {
      keyName: this.searchVal
    };
    if (this.selCou.val === "TPE课程") {
      data.keyTypes = 1;
    } else if (this.selCou.val === "NPE课程") {
      data.keyTypes = 2;
    } else if (this.selCou.val === "课程频道") {
      data.keyTypes = 11;
    } else if (this.selCou.val === "标准课（沙盘）") {
      data.keyTypes = "0,3,4";
    } else if (this.selCou.val === "频道（沙盘）") {
      data.keyTypes = 12;
    } else if (this.selCou.val === "标准课") {
      data.keyTypes = "1,2";
    }
    ownRecentRevisionAmount(data).then(res => {
      console.log(res);
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
        this.ownRecentRevisionAmountFun();
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //删除课程接口
  @Emit delCouLogDelFun(opt) {
    delCouLogDel({
      keyId: opt.keyId,
      keyName: opt.keyName,
      keyType: opt.keyType
    }).then(res => {
      if (res.code == 0) {
        this.getCourseListFun();
        this.ownRecentRevisionAmountFun();
      } else {
        tipsFail(res.msg);
      }
    });
  }

  // 首页查询课程频道
  @Emit ownRecentRevisionListFun() {
    let data = {};
    ownRecentRevisionList(data).then(res => {
      console.log(res);
      if (res.code === 0) {
        this.recEditList = res.page.list;
        console.log(this.recEditList);
      }
    });
  }

  //复制课程或课程计划接口
  @Emit copyCouInfoFroOtherFun(opt) {
    copyCouInfoFroOther({
      keyId: opt.keyId,
      keyType: opt.keyType
    }).then(res => {
      if (res.code == 0) {
        this.getCourseListFun();
        this.ownRecentRevisionAmountFun();
      } else {
        tipsFail(res.msg);
      }
    });
  }
  created() {
    this.getCourseListFun();
    this.ownRecentRevisionListFun();
    this.ownRecentRevisionAmountFun();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.recEdit {
  width: 100%;
  /*padding-left: 48px;
    padding-right: 32px;*/
  margin: 0 auto;
  background: #fff;
  .delTips {
    position: fixed;
    top: 60px;
    left: calc(50% + 60px);
    padding: 0 5px;
    height: 23px;
    text-align: center;
    line-height: 23px;
    background: rgba(51, 51, 51, 0.44);
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
  }
  .folder {
    margin-top: 27px;
  }
}

@media screen and (max-width: 1404px) {
  .recEdit {
    width: 858px;
  }
}

@media screen and (min-width: 1404px) and (max-width: 1690px) {
  .recEdit {
    width: 1144px;
  }
}

@media screen and (min-width: 1690px) and (max-width: 1976px) {
  .recEdit {
    width: 1430px;
  }
}

@media screen and (min-width: 1976px) and (max-width: 2262px) {
  .recEdit {
    width: 1716px;
  }
}

@media screen and (min-width: 2262px) and (max-width: 2548px) {
  .recEdit {
    width: 2002px;
  }
}

@media screen and (min-width: 2548px) and (max-width: 2834px) {
  .recEdit {
    width: 2288px;
  }
}

@media screen and (min-width: 2834px) {
  .recEdit {
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
