<!--
 * @Descripttion: 
 * @version: 
 * @Author: pengwanchong
 * @Date: 2019-09-25 16:07:36
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-10-28 11:08:15
 -->
<template>
  <div class="recEdit">
    <HomeHeader style="margin-left:18px;margin-right:18px;" />
    <creatorpersonal></creatorpersonal>
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import HomeHeader from "./homeHeader";
import creatorpersonal from "../creatorpersonal/creatorpersonal";
import UploadFile from "./uploadFile";
import SelectTem from "./selectTem";
import { ownCourseAndChannelList } from "../../service/creatorApi";

@Component({
  name: "recEdit",
  components: {
    HomeHeader,
    creatorpersonal
  }
})
export default class CreatorHome extends Vue {
  created() {
    // this.ownCourseAndChannelListFun();
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
