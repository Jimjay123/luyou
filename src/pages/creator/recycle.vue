<template>
  <div class="creator">
    <HomeHeader style="margin-left:18px;margin-right:18px;" />

    <!--选择模板 start-->
    <SelectTem v-show="false" />
    <!--选择模板 end-->

    <!--search 部分 start -->
    <div class="search-info clearfix" style="margin-left:18px;margin-right:18px;">
      <div class="tabList">全部（{{totalData}}）</div>
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
      <recycleCourseItem
        v-for="(item,index) in recycleList"
        :key="index"
        :cbFun="deepDelete"
        :grFun="restore"
        :options="item"
      />
      <!--课程计划 end-->
    </div>
    <router-view />

    <!-- 删除弹框  -->
    <DeleteDailog :cbFun="deleteCb" :show="deleteShow"></DeleteDailog>

    <!-- 恢复弹框 -->
    <RestoreDailog :cbFun="restoreCb" :show="restoreShow"></RestoreDailog>
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import HomeHeader from "./homeHeader";
import FolderItem from "./folderItem";
import recycleCourseItem from "./recycleCourseItem";
import MulSelect from "./mulSelect";
import SearchInput from "../teachers/searchInput";
import UploadFile from "./uploadFile";
import SelectTem from "./selectTem";
import {
  ownCourseAndChannelList,
  physicalDelete,
  recovery,
  ownCourseAndChannelTotal
} from "../../service/creatorApi";
import DeleteDailog from "./deleteDailog";
import RestoreDailog from "./restoreDailog";
import { tipsFail } from "../../utils/utils";

@Component({
  name: "creatorHome",
  components: {
    HomeHeader,
    FolderItem,
    MulSelect,
    SearchInput,
    recycleCourseItem,
    UploadFile,
    SelectTem,
    DeleteDailog,
    RestoreDailog
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
  deleteShow = false; // 删除弹框
  restoreShow = false; //恢复弹框
  recycleList = []; //回收站数据
  delType = ""; // 删除课程类型
  delId = ""; // 删除课id
  recType = ""; // 恢复课程类型
  recId = ""; // 恢复可曾id
  totalData = "";

  //上传文件回调方法
  @Emit uploadFileCb(type, val) {
    if (type === "hide") {
      this.uploadFileShow = val;
    }
  }
  // 彻底删除课程
  @Emit deepDelete(type, id) {
    this.delType = type;
    this.delId = id;
    this.deleteShow = true;
  }

  // 恢复删除课程
  @Emit restore(type, index, isShow) {
    this.recType = type;
    this.recId = index;
    if (isShow === "show") {
      this.restoreShow = true;
    } else {
      let data = {
        keyId: index,
        keyType: type
      };
      recovery(data)
        .then(res => {
          if (res.code === 0) {
            this.ownCourseAndChannelListFun();
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // 删除课程调方法
  @Emit deleteCb(type, id) {
    if (type === "hide" || type === "cancel") {
      //这里把confirm修改为cancel
      this.deleteShow = false;
    } else {
      this.deleteShow = false;
      // 调用接口
      let data = {
        keyId: this.delId,
        keyType: this.delType
      };
      physicalDelete(data)
        .then(res => {
          if (res.code === 0) {
            this.ownCourseAndChannelListFun();
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // 恢复课程调方法
  @Emit restoreCb(type) {
    if (type === "hide" || type === "cancel") {
      //这里把confirm修改为cancel
      this.restoreShow = false;
    } else {
      this.restoreShow = false;
      // 调用接口
      let data = {
        keyId: this.recId,
        keyType: this.recType
      };
      recovery(data)
        .then(res => {
          if (res.code === 0) {
            this.ownCourseAndChannelListFun();
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  //获取当前页课程数组接口
  @Emit getCourseListFun() {
    // let state = null;
    let data = {
      delFlag: 1,
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

    ownCourseAndChannelList(data)
      .then(res => {
        console.log(res);
        if (res.code == 0) {
          this.recycleList = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    ownCourseAndChannelTotal(data)
      .then(res => {
        if (res.code === 0) {
          this.totalData = res.data;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //下拉选择框改变事件
  @Emit inputChange(e, type, name) {
    if (type === "select") {
      if (this[name].val !== e.val) {
      }
      this[name] = e;
      this.getCourseListFun();
    } else if ("input") {
      this[name] = e.target.value;
      if (this[name].val !== e.target.value) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getCourseListFun();
        }, 300);
      }
    }
  }

  // 获取回收站中的课程频道信息
  @Emit ownCourseAndChannelListFun() {
    ownCourseAndChannelList({
      delFlag: 1
    })
      .then(res => {
        if (res.code === 0) {
          this.recycleList = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    ownCourseAndChannelTotal({
      delFlag: 1
    })
      .then(res => {
        if (res.code === 0) {
          this.totalData = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  created() {
    this.ownCourseAndChannelListFun();
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
  .tabList {
    // display: inline-block;
    vertical-align: middle;
    float: left;
    padding: 11px 12px 0;
    margin-right: 12px;
    font-size: 14px;
    color: #666;
    font-weight: 500;
    line-height: 20px;
  }
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
