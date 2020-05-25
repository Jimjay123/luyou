<template>
  <div class="recEdit">
    <HomeHeader style="margin-left:18px;margin-right:18px;" />
    <notice></notice>
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import HomeHeader from "./homeHeader";

import notice from "../notice/Alls";

import { ownCourseAndChannelList } from "../../service/creatorApi";

@Component({
  name: "recEdit",
  components: {
    HomeHeader,
    notice
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
    label: "全部课程"
  }; //课程选择
  selCouList = [
    {
      val: "",
      label: "全部课程"
    },
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
  ]; //课程选择数组

  uploadFileShow = true;

  //tab切换回调方法
  @Emit tabListCb(val) {
    this.searchTab = val;
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
    } else if ("input") {
      this[name] = e.target.value;
      if (this[name].val !== e.target.value) {
        //this.setTimeFun();
      }
    }
  }
  // 首页查询课程频道
  @Emit ownCourseAndChannelListFun() {
    let data = {
      sidx: "modify_datetime",
      order: "desc"
    };
    ownCourseAndChannelList(data).then(res => {
      console.log(res);
    });
  }
  created() {
    this.ownCourseAndChannelListFun();
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
